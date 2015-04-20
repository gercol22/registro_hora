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
			$servicioContrato = new ServicioContrato();
			$numero     = $servicioContrato->buscarNumero();
			$dataTipCon = generarJsonArreglo($arrTipCon);
			$dataEstCon = generarJsonArreglo($arrEstCon);
			$dataContra = generarJsonArreglo($arrContra);
			echo $dataTipCon.'|'.$dataEstCon.'|'.$dataContra.'|'.$numero;
			unset($dataTipCon);unset($dataEstCon);unset($dataContra);unset($numero);
			unset($servicioContrato);
			break;
			
		case 'OBT_NUM':
			$servicioContrato = new ServicioContrato();
			echo $servicioContrato->buscarNumero();
			unset($servicioContrato);
			break;
			
		case 'OBT_CLI':
			$servicioCliente = new ServicioCliente();
			$dataCliente = $servicioCliente->buscarClientes($objetoData->rifclie, $objetoData->razsoci);
			echo generarJson($dataCliente);
			unset($dataCliente);
			unset($servicioCliente);
			break;
			
		case 'INS_CON':
			$servicioContrato = new ServicioContrato();
			$respuesta = $servicioContrato->insertarContrato($objetoData);
			$resultado['mensaje'] = $servicioContrato->mensaje;
			$resultado['valido']  = $respuesta;
			echo  json_encode(array('raiz'=>$resultado));
			unset($servicioContrato);
			break;

		case 'BUS_CON':
			$servicioContrato = new ServicioContrato();
			$dataContrato = $servicioContrato->buscarContrato($objetoData->codcontrato, $objetoData->razsocial, $objetoData->numcontrato);
			echo generarJson($dataContrato);
			unset($dataContrato);
			unset($servicioCliente);
			break;
			
		case 'OBT_NOT':
			$servicioContrato = new ServicioContrato();
			$dataNotas  = $servicioContrato->buscarNotas($objetoData->codcon);
			echo generarJson($dataNotas);
			unset($dataNotas);
			unset($servicioContrato);
			break;
			
		case 'MOD_CON':
			$servicioContrato = new ServicioContrato();
			$respuesta = $servicioContrato->modificarContrato($objetoData);
			$resultado['mensaje'] = $servicioContrato->mensaje;
			$resultado['valido']  = $respuesta;
			echo  json_encode(array('raiz'=>$resultado));
			unset($servicioContrato);
			break;
		
		case 'ELI_CON':
			$servicioContrato = new ServicioContrato();
			$respuesta = $servicioContrato->eliminarContrato($objetoData->codcon);
			$resultado['mensaje'] = $servicioContrato->mensaje;
			$resultado['valido']  = $respuesta;
			echo  json_encode(array('raiz'=>$resultado));
			unset($servicioContrato);
			break;
			
		case 'ELI_NOT':
			$servicioContrato = new ServicioContrato();
			if($servicioContrato->eliminarNota($objetoData->codcon, $objetoData->numnot) === false) {
				echo '0';
			}
			else {
				echo '1';
			}
			unset($servicioContrato);
			break;
	}
	
}
?>


