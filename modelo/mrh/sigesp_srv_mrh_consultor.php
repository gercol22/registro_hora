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
		$cadenaSQL = "SELECT logcon, nomcon
						FROM consultor 
						WHERE logcon <> '----------'";
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
}