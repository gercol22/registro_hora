<?php
require_once ('../../modelo/mrh/sigesp_srv_mrh_registroactividad.php');
require_once ('../../modelo/mrh/sigesp_srv_mrh_cliente.php');
require_once ('../../modelo/mrh/sigesp_srv_mrh_consultor.php');
require_once ('../../base/conf/data_estatica.php');
if ($_POST['ObjSon']) {
	$objetoData = str_replace('\\','',$_POST['ObjSon']);
	$json = new Services_JSON;
	$objetoData = $json->decode($objetoData);
	
	switch ($objetoData->operacion) {
		case 'DAT_INI':
			$servicioRegistroActividad = new ServicioRegistroActividad();
			$numero = $servicioRegistroActividad->buscarNumero();
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
			$dataMod    = generarJsonArreglo($arrMod);
			$dataTipInc = generarJsonArreglo($arrTipInc);
			echo $dataTipAct.'|'.$dataTipInc.'|'.$dataMod.'|'.$numero.'|'.$_SESSION['rolcon'].'|';
			unset($dataTipAct);unset($dataTipInc);unset($dataMod);unset($numero);
			unset($servicioRegistroActividad);
			break;
			
		case 'OBT_CLI':
			$servicioCliente = new ServicioCliente();
			$dataCliente = $servicioCliente->buscarClientes($objetoData->rifclie, $objetoData->razsoci);
			echo generarJson($dataCliente);
			unset($dataCliente);
			unset($servicioCliente);
			break;
			
		case 'OBT_PRO':
			$servicioRegistroActividad = new ServicioRegistroActividad();
			$dataProg = $servicioRegistroActividad->buscarProgramacion($_SESSION['logcon']);
			echo generarJson($dataProg);
			unset($dataProg);
			unset($servicioRegistroActividad);
			break;
			
		case 'OBT_NUM':
			$servicioRegistroActividad = new ServicioRegistroActividad();
			echo  $servicioRegistroActividad->buscarNumero();
			unset($servicioRegistroActividad);
			break;
			
		case 'BUS_ACT':
			$servicioRegistroActividad = new ServicioRegistroActividad();
			$dataAct = $servicioRegistroActividad->buscarActividad($_SESSION['logcon'], $objetoData->numactiv, $objetoData->razsocial, 
																   $objetoData->fecactivi, $objetoData->consultor);
			echo generarJson($dataAct);
			unset($dataAct);
			unset($servicioRegistroActividad);
			break;
		
		case 'OBT_TAR':
			$servicioRegistroActividad = new ServicioRegistroActividad();
			$dataTar = $servicioRegistroActividad->buscarTareas($objetoData->numact);
			echo generarJson($dataTar);
			unset($dataTar);
			unset($servicioRegistroActividad);
			break;
		
		case 'INS_ACT':
			$servicioRegistroActividad = new ServicioRegistroActividad();
			$respuesta = $servicioRegistroActividad->insertarActividad($objetoData);
			$resultado['mensaje'] = $servicioRegistroActividad->mensaje;
			$resultado['valido']  = $respuesta;
			echo  json_encode(array('raiz'=>$resultado));
			unset($servicioRegistroActividad);
			break;
		
		case 'MOD_ACT':
			$servicioRegistroActividad = new ServicioRegistroActividad();
			$respuesta = $servicioRegistroActividad->modificarActividad($objetoData);
			$resultado['mensaje'] = $servicioRegistroActividad->mensaje;
			$resultado['valido']  = $respuesta;
			echo  json_encode(array('raiz'=>$resultado));
			unset($servicioRegistroActividad);
			break;
		
		case 'ELI_TAR':
			$servicioRegistroActividad = new ServicioRegistroActividad();
			if($servicioRegistroActividad->eliminarTarea($objetoData->codmod, $objetoData->numact)) {
				echo '1';
			}
			else {
				echo '0';
			}
			unset($servicioRegistroActividad);
			break;
			
		case 'ELI_ACT':
			$servicioRegistroActividad = new ServicioRegistroActividad();
			if($servicioRegistroActividad->eliminarActividad($objetoData->numact)) {
				echo '1';
			}
			else {
				echo '0';
			}
			unset($servicioRegistroActividad);
			break;
			
		case 'TAR_PRO':
			$servicioRegistroActividad = new ServicioRegistroActividad();
			$dataTar = $servicioRegistroActividad->buscarTareasProgramadas($objetoData->numpro);
			echo generarJson($dataTar);
			unset($dataTar);
			unset($servicioRegistroActividad);
			break;
			
		case 'BUS_CON':
			$servicioConsultor = new ServicioConsultor();
			$dataConsultor = $servicioConsultor->buscarConsultores();
			echo generarJson($dataConsultor);
			unset($dataConsultor);
			unset($servicioConsultor);
			break;
	}
	
}
?>


