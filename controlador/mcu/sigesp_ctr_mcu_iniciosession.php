<?php
session_start();
require_once ('../../modelo/mcu/sigesp_srv_mcu_adminusuario.php');
if ($_POST['objetoData']) {
	$objetoData = str_replace('\\','',$_POST['objetoData']);
	$objetoData = json_decode($objetoData);	
	switch ($objetoData->operacion) {
		case 'INICIAR_SESSION':
			$servicioAdminUsuario = new ServicioAdminUsuario();
			$flagUsuario = $servicioAdminUsuario->validarUsuario($objetoData->logcon, $objetoData->passusu);
			if ($flagUsuario) {
				echo '1';
			}
			else {
				echo '0';
			} 
			break;
		
		case 'DEL_SESSION':
			session_destroy();
			break;
	}
}	
?>


