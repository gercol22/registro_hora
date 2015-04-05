<?php
require_once ('../../modelo/mrh/sigesp_srv_mrh_contrato.php');
require_once ('../../modelo/mrh/sigesp_srv_mrh_cliente.php');
require_once ('../../base/conf/data_estatica.php');
if ($_POST['ObjSon']) {
	$objetoData = str_replace('\\','',$_POST['ObjSon']);
	$json = new Services_JSON;
	$objetoData = $json->decode($objetoData);
	
	switch ($objetoData->operacion) {
		case 'DAT_INI':
			$dataTipCon = generarJsonArreglo($arrTipCon);
			$dataEstCon = generarJsonArreglo($arrEstCon);
			echo $dataTipCon.'|'.$dataEstCon.'|';
			unset($dataTipCon);unset($dataEstCon);
			break;
			
		case 'OBT_CLI':
			$servicioCliente = new ServicioCliente();
			$dataCliente = $servicioCliente->buscarClientes($objetoData->rifclie, $objetoData->razsoci);
			echo generarJson($dataCliente);
			unset($dataCliente);
			unset($servicioCliente);
			break;
	}
	
}
?>


