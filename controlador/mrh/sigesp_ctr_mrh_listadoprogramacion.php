<?php
require_once ('../../modelo/mrh/sigesp_srv_mrh_programacion.php');
require_once ('../../modelo/mrh/sigesp_srv_mrh_consultor.php');
require_once ('../../modelo/mrh/sigesp_srv_mrh_cliente.php');
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
			
		case 'OBT_CON':
			$servicioConsultor = new ServicioConsultor();
			$dataConsultores = $servicioConsultor->buscarConsultores();
			echo generarJson($dataConsultores);
			unset($dataConsultores);
			unset($servicioConsultor);
			break;
	}
}
?>


