<?php
require_once ('../../modelo/mrh/sigesp_srv_mrh_programacion.php');
require_once ('../../modelo/mrh/sigesp_srv_mrh_cliente.php');
require_once ('../../modelo/mrh/sigesp_srv_mrh_consultor.php');
require_once ('../../base/conf/data_estatica.php');
if ($_POST['ObjSon']) {
	$objetoData = str_replace('\\','',$_POST['ObjSon']);
	$json = new Services_JSON;
	$objetoData = $json->decode($objetoData);
	
	switch ($objetoData->operacion) {
		case 'DAT_INI':
			$servicioProgramacion = new ServicioProgramacion();
			$numero = $servicioProgramacion->buscarNumero();
			switch ($_SESSION['rolcon']) {
				case 'T':
					$dataTipAct = generarJsonArreglo($arrActTec);
					break;
				
				case 'F':
					$dataTipAct = generarJsonArreglo($arrActFun);
					break;
				
				case 'A':
					$dataTipAct = generarJsonArreglo($arrActAdm);
					break;
			}
			$dataMod = generarJsonArreglo($arrMod);
			echo $dataTipAct.'|'.$dataMod.'|'.$numero.'|'.$_SESSION['rolcon'];
			unset($dataTipAct);unset($dataMod);unset($numero);
			unset($servicioProgramacion);
			break;
		
		case 'DAT_DESACT':
			switch ($objetoData->codact) {
				case 'T1':
					$dataDesAct = generarJsonArreglo($arrDesActDes);
					break;
			
				case 'F1':
					$dataDesAct = generarJsonArreglo($arrDesActAtc);
					break;
			
				case 'F2':
					$dataDesAct = generarJsonArreglo($arrDesActImp);
					break;
				
				case 'F3':
					$dataDesAct = generarJsonArreglo($arrDesActMan);
					break;
					
				case 'F4':
					$dataDesAct = generarJsonArreglo($arrDesActSer);
					break;
					
				case 'F4':
					$dataDesAct = generarJsonArreglo($arrDesActPre);
					break;
			}
			echo $dataDesAct;
			break;
		
		case 'OBT_NUM':
			$servicioProgramacion = new ServicioProgramacion();
			echo $servicioProgramacion->buscarNumero();
			unset($servicioProgramacion);
			break;
			
		case 'OBT_CLI':
			$servicioCliente = new ServicioCliente();
			$dataCliente = $servicioCliente->buscarClientes($objetoData->rifclie, $objetoData->razsoci);
			echo generarJson($dataCliente);
			unset($dataCliente);
			unset($servicioCliente);
			break;
		
		case 'OBT_CON':
			$servicioConsultor = new ServicioConsultor();
			$dataConsultores = $servicioConsultor->buscarConsultores();
			echo generarJson($dataConsultores);
			unset($dataConsultores);
			unset($servicioConsultor);
			break;
			
		case 'OBT_CNT':
			$servicioProgramacion = new ServicioProgramacion();
			$dataContrato = $servicioProgramacion->buscarContrato($objetoData->cliente);
			$i = 0;
			$arrContrato = array();
			while (!$dataContrato->EOF) {
				$arrContrato[$i]['codigo'] = $dataContrato->fields['codcon'];
				$arrContrato[$i]['descripcion'] = $servicioProgramacion->obtenerDenCon($arrTipCon, $dataContrato->fields['tipcon'], $dataContrato->fields['codcon']);
				$i++;
				$dataContrato->MoveNext();
			}
			echo generarJsonArreglo($arrContrato);
			unset($dataContrato);
			unset($arrContrato);
			unset($servicioProgramacion);
			break;
		
		case 'INS_PRO':
			$servicioProgramacion = new ServicioProgramacion();
			$respuesta = $servicioProgramacion->insertarProgramacion($objetoData);
			$resultado['mensaje'] = $servicioProgramacion->mensaje;
			$resultado['valido']  = $respuesta;
			echo  json_encode(array('raiz'=>$resultado));
			unset($servicioProgramacion);
			break;

		case 'BUS_PRO':
			$servicioProgramacion = new ServicioProgramacion();
			$dataPro = $servicioProgramacion->buscarProgramacion($objetoData->numprogra, $objetoData->razsoc);
			echo generarJson($dataPro);
			unset($dataPro);
			unset($servicioProgramacion);
			break;
		
		case 'OBT_TAR':
			$servicioProgramacion = new ServicioProgramacion();
			$dataTar = $servicioProgramacion->buscarTareas($objetoData->numpro);
			$dataContrato = $servicioProgramacion->buscarContrato($objetoData->cliente);
			$i = 0;
			$arrContrato = array();
			while (!$dataContrato->EOF) {
				$arrContrato[$i]['codigo'] = $dataContrato->fields['codcon'];
				$arrContrato[$i]['descripcion'] = $servicioProgramacion->obtenerDenCon($arrTipCon, $dataContrato->fields['tipcon'], $dataContrato->fields['codcon']);
				$i++;
				$dataContrato->MoveNext();
			}
			echo generarJson($dataTar).'|'.generarJsonArreglo($arrContrato);
			unset($dataContrato);
			unset($arrContrato);
			unset($dataTar);
			unset($servicioRegistroActividad);
			break;
		
		case 'MOD_PRO':
			$servicioProgramacion = new ServicioProgramacion();
			$respuesta = $servicioProgramacion->modificarProgramacion($objetoData);
			$resultado['mensaje'] = $servicioProgramacion->mensaje;
			$resultado['valido']  = $respuesta;
			echo  json_encode(array('raiz'=>$resultado));
			unset($servicioProgramacion);
			break;
		
		case 'ELI_PRO':
			$servicioProgramacion = new ServicioProgramacion();
			$respuesta = $servicioProgramacion->eliminarProgramacion($objetoData->numpro);
			$resultado['mensaje'] = $servicioProgramacion->mensaje;
			$resultado['valido']  = $respuesta;
			echo  json_encode(array('raiz'=>$resultado));
			unset($servicioProgramacion);
			break;
		
		case 'ELI_TAR':
			$servicioProgramacion = new ServicioProgramacion();
			if($servicioProgramacion->eliminarTarea($objetoData->codmod, $objetoData->numpro)) {
				echo '1';
			}
			else {
				echo '0';
			}
			unset($servicioProgramacion);
			break;
	}
}
?>


