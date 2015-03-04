<?php
session_start();
$dirsrvdoc = '';
$dirsrvdoc = dirname(__FILE__);
$dirsrvdoc = str_replace('\\','/',$dirsrvdoc);
$dirsrvdoc = str_replace('/modelo/mrh','',$dirsrvdoc);
require_once ($dirsrvdoc.'/base/librerias/php/gerco/gerco_lib_fabricadao.php');

class ServicioConsultor {
	private $conexionBD;
	private $daoConsultor;
	public  $mensaje = '';
		
	public function ServicioConsultor() {
		$this->conexionBD   = null;
		$this->daoConsultor = null;
	}
	
	public function buscarConsultores() {
		$this->conexionBD = ConexionBaseDatos::getInstanciaConexion();
		$cadenaSQL = "SELECT logcon, nomcon, rolcon
						FROM consultor 
						WHERE logcon <> '--------------------' AND estcon = 1";
		return $this->conexionBD->Execute($cadenaSQL);
	}
	
	
	
	public function existeConsultor($logcon) {
		$existe = false;
		$this->conexionBD = ConexionBaseDatos::getInstanciaConexion();
		$cadenaSQL = "SELECT logcon FROM consultor WHERE logcon='{$logcon}'";
		$dataConsultor = $this->conexionBD->Execute($cadenaSQL);
		if ($dataConsultor->_numOfRows > 0) {
			$existe = true;
		}
		
		unset($dataConsultor);
		return $existe;
	}
	
	public function insertarConsultor($objJson) {
		$respuesta = true;
		if (!$this->existeConsultor($objJson->logcon)) {
			$this->daoConsultor = FabricaDao::CrearDAO('N', 'consultor');
			$this->daoConsultor->setData($objJson);
			$this->daoConsultor->estcon = 1;
			if ($this->daoConsultor->pascon == '') {
				$this->daoConsultor->pascon = '8VmGYlyiib3njrLrkKQVpYoDysA';
			}
			if (!$this->daoConsultor->incluir()) {
				$respuesta = false;
				$this->mensaje = 'Ocurri&#243; un error al insertar al consultor';
			}
			else {
				$this->mensaje = 'El consultor se inserto correctamente';
			}
		}
		else {
			$respuesta = false;
			$this->mensaje = 'Este consultor ya existe, verifique el login utilizado';
		}
	
		return $respuesta;
	}
	
	public function modificarConsultor($objJson) {
		$respuesta = true;
		$cadenaPk = "logcon = '{$objJson->logcon}'";
		$this->daoConsultor = FabricaDao::CrearDAO('C', 'consultor', array(), $cadenaPk);
		if ($this->daoConsultor->_saved) {
			$this->daoConsultor->nomcon    = $objJson->nomcon;
			$this->daoConsultor->rolcon    = $objJson->rolcon;
			if ($objJson->pascon != '') {
				$this->daoConsultor->pascon = $objJson->pascon;
			}
			
			if ($this->daoConsultor->modificar() != 0) {
				$this->mensaje = 'El consultor fue actualizado correctamente';
			}
			else {
				$this->mensaje = 'Ocurri&#243; un error al actualizar el consultor';
				$respuesta = false;
			}
		}
		return $respuesta;
	}
	
	public function eliminarConsultor($logcon) {
		$respuesta = true;
		$cadenaPk = "logcon = '{$logcon}'";
		$this->daoConsultor = FabricaDao::CrearDAO('C', 'consultor', array(), $cadenaPk);
		if ($this->daoConsultor->_saved) {
			$this->daoConsultor->estcon    = 0;
							
			if ($this->daoConsultor->modificar() != 0) {
				$this->mensaje = 'El consultor fue eliminado';
			}
			else {
				$this->mensaje = 'Ocurri&#243; un error al eliminar el consultor';
				$respuesta = false;
			}
		}
		return $respuesta;
	}
}