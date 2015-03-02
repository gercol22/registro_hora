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
}