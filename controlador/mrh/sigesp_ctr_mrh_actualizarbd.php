<?php
require_once ('../../modelo/mrh/sigesp_srv_mrh_actualizarbd.php');
if ($_POST['ObjSon']) {
	$objetoData = str_replace('\\','',$_POST['ObjSon']);
	$json = new Services_JSON;
	$objetoData = $json->decode($objetoData);
	
	switch ($objetoData->operacion) {
		case 'ACT_BD':
			$servicioActualizarBD = new ServicioActualizarBD();
			$respuesta = $servicioActualizarBD->actualizarBD();
			$resultado['mensaje'] = $servicioActualizarBD->mensaje;
			$resultado['valido']  = $respuesta;
			echo  json_encode(array('raiz'=>$resultado));
			unset($servicioActualizarBD);
			break;
	}
}
?>


