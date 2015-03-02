<?php
session_start();
$dirsrvseg = '';
$dirsrvseg = dirname(__FILE__);
$dirsrvseg = str_replace('\\','/',$dirsrvseg);
$dirsrvseg = str_replace('/modelo/mcu','',$dirsrvseg);
require_once ($dirsrvseg.'/base/librerias/php/gerco/gerco_lib_fabricadao.php');

class ServicioAdminUsuario {
	private $daoUsuario;
	private $conexionBD;
	public $mensaje;
			
	public function ServicioAdminUsuario() {
		$this->mensaje = '';
		$this->daoUsuario = null;
		$this->conexionBD = null;
	}
	
	public function validarUsuario($logcon, $passusuario) {
		$usuarioValido = false;
		$cadenaPk = "logcon = '{$logcon}' AND pascon = '{$passusuario}' AND estcon = '1'";
		$this->daoUsuario = FabricaDao::CrearDAO('C', 'consultor', array(), $cadenaPk);
		if ($this->daoUsuario->logcon != null){
			$usuarioValido = true;
			$_SESSION['logg_fm']  = true;
			$_SESSION['logcon']   = $this->daoUsuario->logcon;
			$_SESSION['nomcon']   = $this->daoUsuario->nomcon;
			$_SESSION['rolcon']   = $this->daoUsuario->rolcon;
		}
		
		unset($this->daoUsuario);
		return $usuarioValido;
	}
	
	public function cambiarClave($cedper, $passant, $passnue) {
		$cambioValido = true;
		$this->conexionBD = ConexionBaseDatos::getInstanciaConexion();
		
		$cadenaPk = "cedper = '{$cedper}' AND passusuario = '{$passant}'";
		$this->daoUsuario = FabricaDao::CrearDAO('C', 'sno_personal', array(), $cadenaPk);
		if ($this->daoUsuario->cedper != null){
			$cadenaSQL = "UPDATE sno_personal SET passusuario = '{$passnue}' WHERE cedper = '{$cedper}'";
			$resultado = $this->conexionBD->Execute($cadenaSQL);
			if(!$resultado){
				$cambioValido = false;
				$this->mensaje = 'Ocurrio un error modificando la clave';
			}
		}
		else {
			$cambioValido = false;
			$this->mensaje = 'La clave anterior no es correcta';
		}
	
		unset($this->daoUsuario);
		return $cambioValido;
	}
	
	public function buscarUsuario($cedper, $nomper, $apeper) {
		$this->conexionBD = ConexionBaseDatos::getInstanciaConexion();
		$nombre = $this->conexionBD->Concat('apeper',"', '",'nomper');
		$cadenaSQL = "SELECT cedper, {$nombre} AS nombre, apeper, nomper, usuest, estadmin 
						FROM sno_personal 
						WHERE cedper like '%{$cedper}%' 
		                  AND nomper like '%{$nomper}%' 
						  AND nomper like '%{$apeper}%'";
		return $this->conexionBD->Execute($cadenaSQL);
	}
	
	public function actualizarUsuario($cedper, $usuest, $estadmin, $passusu) {
		$this->conexionBD = ConexionBaseDatos::getInstanciaConexion();
		$clausu = '';
		if ($passusu!=''){
			$clausu = ", passusuario = '{$passusu}' ";
		}
		
		$cadenaSQL = "UPDATE sno_personal 
						 SET usuest='{$usuest}', estadmin='{$estadmin}' {$clausu}
					   WHERE cedper='{$cedper}'";
		return $this->conexionBD->Execute($cadenaSQL);
	}
}