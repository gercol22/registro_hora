<?php
require_once ('../../modelo/mrh/sigesp_srv_mrh_cliente.php');
require_once ('../../modelo/mrh/sigesp_srv_mrh_imputarhora.php');
require_once ('../../base/conf/data_estatica.php');
if ($_POST['ObjSon']) {
	$objetoData = str_replace('\\','',$_POST['ObjSon']);
	$json = new Services_JSON;
	$objetoData = $json->decode($objetoData);
	
	switch ($objetoData->operacion) {
		case 'OBT_CLI':
			$servicioCliente = new ServicioCliente();
			$dataCliente = $servicioCliente->buscarClientes($objetoData->rifclie, $objetoData->razsoci);
			echo generarJson($dataCliente);
			unset($dataCliente);
			unset($servicioCliente);
			break;
		
		case 'BUS_ACT':
			$servicioImputarHora = new ServicioImputarHora();
			$dataActividad = $servicioImputarHora->buscarActividad($objetoData->cliente, $objetoData->fecha);
			echo generarJson($dataActividad);
			unset($dataActividad);
			unset($servicioImputarHora);
			break;
			
		case 'BUS_CON':
			$servicioImputarHora = new ServicioImputarHora();
			$dataContrato = $servicioImputarHora->contratoCliente($objetoData->cliente);
			echo generarJson($dataContrato);
			unset($dataContrato);
			unset($servicioImputarHora);
			break;
			
		case 'PRO_IMP':
			$servicioImputarHora = new ServicioImputarHora();
			$respuesta = $servicioImputarHora->imputarActividad($objetoData->data);
			$resultado['mensaje'] = $servicioImputarHora->mensaje;
			$resultado['valido']  = $respuesta;
			echo  json_encode(array('raiz'=>$resultado));
			unset($servicioImputarHora);
			break;
	}
}
?>


