<?php
require_once ('../../modelo/mrh/sigesp_srv_mrh_consultor.php');
require_once ('../../base/conf/data_estatica.php');
if ($_POST['ObjSon']) {
	$objetoData = str_replace('\\','',$_POST['ObjSon']);
	$json = new Services_JSON;
	$objetoData = $json->decode($objetoData);
	
	switch ($objetoData->operacion) {
		case 'DAT_INI':
			echo generarJsonArreglo($arrRolCon);
			break;
			
		case 'INS_CON':
			$servicioConsultor = new ServicioConsultor();
			$respuesta = $servicioConsultor->insertarConsultor($objetoData);
			$resultado['mensaje'] = $servicioConsultor->mensaje;
			$resultado['valido']  = $respuesta;
			echo  json_encode(array('raiz'=>$resultado));
			unset($servicioConsultor);
			break;
			
		case 'BUS_CON':
			$servicioConsultor = new ServicioConsultor();
			$dataConsultor = $servicioConsultor->buscarConsultores();
			echo generarJson($dataConsultor);
			unset($dataConsultor);
			unset($servicioConsultor);
			break;
			
		case 'MOD_CON':
			$servicioConsultor = new ServicioConsultor();
			$respuesta = $servicioConsultor->modificarConsultor($objetoData);
			$resultado['mensaje'] = $servicioConsultor->mensaje;
			$resultado['valido']  = $respuesta;
			echo  json_encode(array('raiz'=>$resultado));
			unset($servicioConsultor);
			break;
			
		case 'ELI_CON':
			$servicioConsultor = new ServicioConsultor();
			$respuesta = $servicioConsultor->eliminarConsultor($objetoData->logcon);
			$resultado['mensaje'] = $servicioConsultor->mensaje;
			$resultado['valido']  = $respuesta;
			echo  json_encode(array('raiz'=>$resultado));
			break;
	}
	
}
?>


