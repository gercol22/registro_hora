<?php
require_once ('../../modelo/mrh/sigesp_srv_mrh_cliente.php');
if ($_POST['ObjSon']) {
	$objetoData = str_replace('\\','',$_POST['ObjSon']);
	$json = new Services_JSON;
	$objetoData = $json->decode($objetoData);
	
	switch ($objetoData->operacion) {
		case 'BUS_CLI':
			$servicioCliente = new ServicioCliente();
			$dataCliente = $servicioCliente->buscarClienteCat($objetoData->rifcliente, $objetoData->razsocial);
			echo generarJson($dataCliente);
			unset($dataCliente);
			unset($servicioCliente);
			break;
			
		case 'INS_CLI':
			$servicioCliente = new ServicioCliente();
			$respuesta = $servicioCliente->insertarCliente($objetoData);
			$resultado['mensaje'] = $servicioCliente->mensaje;
			$resultado['valido']  = $respuesta;
			echo  json_encode(array('raiz'=>$resultado));
			unset($servicioCliente);
			break;
			
		case 'MOD_CLI':
			$servicioCliente = new ServicioCliente();
			$respuesta = $servicioCliente->modificarCliente($objetoData);
			$resultado['mensaje'] = $servicioCliente->mensaje;
			$resultado['valido']  = $respuesta;
			echo  json_encode(array('raiz'=>$resultado));
			unset($servicioCliente);
			break;
		
		case 'ELI_CLI':
			$servicioCliente = new ServicioCliente();
			$respuesta = $servicioCliente->eliminarCliente($objetoData->rifcli);
			$resultado['mensaje'] = $servicioCliente->mensaje;
			$resultado['valido']  = $respuesta;
			echo  json_encode(array('raiz'=>$resultado));
			break;
	}
	
}
?>


