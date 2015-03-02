<?php
function generarJson($datos,$formatoFecha=true,$formatoNumero=true) {
	$j=0;
	$arRegistros = '';

   	while((!$datos->EOF) && (is_object($datos))) {
		$i=0;
    	foreach ($datos->fields as $Propiedad=>$valor) {
     		if (!is_numeric($Propiedad)) {
				$campo = $datos->FetchField($i);
				$tipo =  $datos->MetaType($campo->type);
				if ($formatoFecha) {
					if ($tipo == 'D' || $tipo == 'T') {
						$valor = convertirFecha($valor);
					}
				}
								
				if ($tipo=='N' && $formatoNumero) {
					$valor = number_format($valor,2,',','.');
				}
				$Propiedad = strtolower($Propiedad);
      			$arRegistros[$j][$Propiedad] = utf8_encode($valor);

     		}
			$i++;
    	}
    	$datos->MoveNext();
		$j++;
   	}
	
   //aqui se pasa el arreglo de arreglos a un objeto json
   	$textJso = array('raiz'=>$arRegistros);
   	$textJson = json_encode($textJso);
	$textJson = utf8_encode(html_entity_decode($textJson));

   	return $textJson;
}

function generarJsonFila($fila) {
	$strJson = '';
	foreach ($fila as $campo=>$valor){
		if ($strJson=='') {
			$strJson .= '{"'.$campo.'":"'.utf8_encode($valor).'"';
		}
		else {
			$strJson .= ',"'.$campo.'":"'.utf8_encode($valor).'"';
		}
	}
	$strJson .= '}';
	
	return json_decode($strJson);
}

function generarJsonArreglo($arreglo) {
	
	$textJso = array('raiz'=>$arreglo);
   	$textJson = json_encode($textJso);
	$textJson = utf8_encode(html_entity_decode($textJson));

   	return $textJson;
}

function generarArrayArbol($arrchimodgss){

	$arrtree= array();

	if(count($arrchimodgss)>0){
		$arrmodpri = array ("id"       => "seguridad",
				"text"     => "M&#243;dulo Administracion",
				//"iconCls"  => "modprincipal",
				"expanded" =>false,
				"children" =>$arrchimodgss);
		array_push($arrtree,$arrmodpri);
	}

	/*if(count($arrchimodaux)>0){
		$arrmodaux = array ("id"       => "2",
				"text"     => "M&#243;dulos Auxiliares",
				"iconCls"  => "modauxiliar",
				"expanded" =>false,
				"children" =>$arrchimodaux);
		array_push($arrtree,$arrmodaux);
	}

	if(count($arrchimodper)>0){
		$arrmodper = array ("id"       => "3",
				"text"     => "M&#243;dulos Personal",
				"iconCls"  => "modpersonal",
				"expanded" =>false,
				"children" =>$arrchimodper);
		array_push($arrtree,$arrmodper);
	}*/

	return $arrtree;
}

function generarDataArbol($arrdata){
	$i=0;
	while(!$arrdata->EOF){
		switch ($arrdata->fields['tipfun']) {
			case '1':
				$arrchimodgss[$i]["id"]=$arrdata->fields['codfun'];
				$arrchimodgss[$i]["text"]=utf8_encode($arrdata->fields['denfun']);
				$arrchimodgss[$i]["leaf"]=true;
				$arrchimodgss[$i]["url"]=$arrdata->fields['urlfun'];
				$i++;
				break;
					
			/*case '2':
				$arrchimodaux[$j]["id"]=$arrdata->fields['codsis'];
				$arrchimodaux[$j]["text"]=utf8_encode($arrdata->fields['nomsis']);
				$arrchimodaux[$j]["leaf"]=true;
				$arrchimodaux[$j]["url"]=$arrdata->fields['accsis'];
				$j++;
				break;*/
		}
		$arrdata->MoveNext();
	}
	$arrdata->close();
	$arrtree=generarArrayArbol($arrchimodgss);
	return json_encode($arrtree);
}

function convertirFecha($fecha) {
	$fechamostrar='';
	$pos  = strpos($fecha,'-');
	$pos2 = strpos($fecha,'/');
	if (($pos==4) || ($pos2==4)) {
		$fechamostrar=(substr($fecha,8,2).'/'.substr($fecha,5,2).'/'.substr($fecha,0,4));
	}
	elseif(($pos==2)||($pos2==2)) {
		$fechamostrar=$fecha;
	}
	return $fechamostrar;
}


function convertirFechaBd($fecha) {
	if (trim($fecha)=='') {
		$fecha='1900-01-01';
	}
	
	$fechabd   = '';
	$posicion  = strpos($fecha,'/');
	$posicion2 = strpos($fecha,'-');
	if (($posicion==2) || ($posicion2==2)) {
		$fechabd = (substr($fecha,6,4).'-'.substr($fecha,3,2).'-'.substr($fecha,0,2));
	}
	elseif (($posicion==4) || ($posicion2==4)) {
		$fechabd = str_replace('/','-',$fecha);
	}
	return $fechabd;
}


function compararFecha($fecdesde,$fechasta) {
	$fechavalida = false;
	$fecdesdeaux = convertirFechaBd($fecdesde);
	$fechastaaux = convertirFechaBd($fechasta);

	if (($fecdesdeaux=="")||($fechastaaux=="")) {
		$fechavalida = false;
	}
	else {
		$anodesde = substr($fecdesdeaux,0,4);
		$mesdesde = substr($fecdesdeaux,5,2);
		$diadesde = substr($fecdesdeaux,8,2);
		$anohasta = substr($fechastaaux,0,4);
		$meshasta = substr($fechastaaux,5,2);
		$diahasta = substr($fechastaaux,8,2);

		if($anodesde < $anohasta) {
			$fechavalida = true;
		}
		elseif ($anodesde==$anohasta) {
			if ($mesdesde < $meshasta) {
				$fechavalida = true;
			}
			elseif ($mesdesde==$meshasta) {
				if ($diadesde <= $diahasta) {
					$fechavalida=true;
				}
			}
		}
	}
	return $fechavalida;
}


function ultimoDiaMes ($mes, $anio) {
	$dia=28;
	while (checkdate($mes, ($dia + 1),$anio)) {
	   $dia++;
	}
	$fecha=$anio.'-'.$mes.'-'.$dia;
	return $fecha;
}

function sumarDias ($fecha, $ndias) {
	if ($ndias > 0) {
		$dia=substr($fecha,8,2);
		$mes=substr($fecha,5,2);
		$anio=substr($fecha,0,4);
		$ultimo_dia=date("d",mktime(0, 0, 0,$mes+1,0,$anio));
		$dias_adelanto=$ndias;
		$siguiente=$dia+$dias_adelanto;
		if ($ultimo_dia < $siguiente) {
			$dia_final=$siguiente-$ultimo_dia;
			$mes++;
			if($ndias=='365') {
				$dia_final=$dia;
			}
			if($mes=='13') {
				$anio++;
				$mes='01';
			}
			$fecha_final=$anio.'-'.str_pad($mes,2,"0",0).'-'.str_pad($dia_final,2,"0",0);
		}
		else {
			$fecha_final=$anio.'-'.str_pad($mes,2,"0",0).'-'.str_pad($siguiente,2,"0",0);
		}
		$dia=substr($fecha_final,8,2);
		$mes=substr($fecha_final,5,2);
		$anio=substr($fecha_final,0,4);
		while(checkdate($mes,$dia,$anio)==false) {
		   $dia=$dia-1;
		   break;
		}
		$fecha_final=$anio.'-'.$mes.'-'.$dia;
	}
	else {
		$fecha_final=convertirFechaBd($fecha);
	}
	return $fecha_final;
}

function agregarUno($codigo, $cantidad=0) {
	$suma = intval($codigo) + 1;
    return str_pad(intval($suma), $cantidad, '0', STR_PAD_LEFT);
}

function formatoNumericoBd($monto,$tipo=0) {
	$valor = '';
	$resultado=0;
	$valor = str_replace('.','',$monto);
	$valor = str_replace(',','.',$valor);
 	if($tipo == 0) {
  		$resultado = intval($valor);
 	}
 	elseif($tipo == 1){
  		$resultado = floatval($valor); 
 	}
 
 	return $resultado;
}

?>