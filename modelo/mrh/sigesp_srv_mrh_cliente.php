<?php
session_start();
$dirsrvdoc = '';
$dirsrvdoc = dirname(__FILE__);
$dirsrvdoc = str_replace('\\','/',$dirsrvdoc);
$dirsrvdoc = str_replace('/modelo/mrh','',$dirsrvdoc);
require_once ($dirsrvdoc.'/base/librerias/php/gerco/gerco_lib_fabricadao.php');

class ServicioCliente {
	private $conexionBD;
	private $daoCliente;
	public  $mensaje = '';
		
	public function ServicioCliente() {
		$this->conexionBD   = null;
		$this->daoCliente = null;
	}
	
	public function buscarClientes($rifcli, $razsoc) {
		$this->conexionBD = ConexionBaseDatos::getInstanciaConexion();
		$cadenaSQL = "SELECT rifcli, razsoc
						FROM cliente 
						WHERE (rifcli ILIKE '%{$rifcli}%' OR razsoc ILIKE '%{$razsoc}%')
						AND rifcli <> '----------'";
		return $this->conexionBD->Execute($cadenaSQL);
	}
	
	public function buscarClienteCat($rifcli, $razsoc) {
		$this->conexionBD = ConexionBaseDatos::getInstanciaConexion();
		$cadenaSQL = "SELECT *
						FROM cliente
						WHERE (rifcli ILIKE '%{$rifcli}%' OR razsoc ILIKE '%{$razsoc}%')
						AND rifcli <> '----------'";
		return $this->conexionBD->Execute($cadenaSQL);
	}
	
	public function existeCliente($rifcli) {
		$existe = false;
		$this->conexionBD = ConexionBaseDatos::getInstanciaConexion();
		$cadenaSQL = "SELECT rifcli FROM cliente WHERE rifcli='{$rifcli}'";
		$dataCliente = $this->conexionBD->Execute($cadenaSQL);
		if ($dataCliente->_numOfRows > 0) {
			$existe = true;
		}
		
		unset($dataCliente);
		return $existe;
	}
	
	public function insertarCliente($objJson) {
		$respuesta = true;
		if (!$this->existeCliente($objJson->rifcli)) {
			$this->daoCliente = FabricaDao::CrearDAO('N', 'cliente');
			$this->daoCliente->setData($objJson);
			if (!$this->daoCliente->incluir()) {
				$respuesta = false;
				$this->mensaje = 'Ocurri&#243; un error al insertar el cliente';
			}
			else {
				$this->mensaje = 'El cliente se inserto correctamente';
			}
		}
		else {
			$respuesta = false;
			$this->mensaje = 'Este cliente ya existe, verifique que el RIF sea correcto';
		}
		
		return $respuesta;
	}
	
	public function modificarCliente($objJson) {
		$respuesta = true;
		$cadenaPk = "rifcli = '{$objJson->rifcli}'";
		$this->daoCliente = FabricaDao::CrearDAO('C', 'cliente', array(), $cadenaPk);
		if ($this->daoCliente->_saved) {
			$this->daoCliente->razsoc    = $objJson->razsoc;
			$this->daoCliente->dircli    = utf8_decode($objJson->dircli);
			$this->daoCliente->punref    = utf8_decode($objJson->punref);
			$this->daoCliente->telcli    = $objJson->telcli;
			$this->daoCliente->conpag    = utf8_decode($objJson->conpag);
			$this->daoCliente->telpag    = $objJson->telpag;
			$this->daoCliente->emaconpag = utf8_decode($objJson->emaconpag);
			$this->daoCliente->consis    = $objJson->consis;
			$this->daoCliente->telsis    = $objJson->telsis;
			$this->daoCliente->emaconsis = $objJson->emaconsis;
			if ($this->daoCliente->modificar() != 0) {
				$this->mensaje = 'El cliente fue actualizado correctamente';
			}
			else {
				$this->mensaje = 'Ocurri&#243; un error al actualizar el cliente';
				$respuesta = false;
			}
		}
		return $respuesta;
	}
	
	public function tieneContrato($rifcli) {
		$existe = false;
		$this->conexionBD = ConexionBaseDatos::getInstanciaConexion();
		$cadenaSQL = "SELECT rifcli FROM contrato WHERE rifcli='{$rifcli}'";
		$data = $this->conexionBD->Execute($cadenaSQL);
		if ($data->_numOfRows > 0) {
			$existe = true;
		}
		
		unset($data);
		return $existe;
	}
	
	public function tieneActividad($rifcli) {
		$existe = false;
		$this->conexionBD = ConexionBaseDatos::getInstanciaConexion();
		$cadenaSQL = "SELECT rifcli FROM actividad WHERE rifcli='{$rifcli}'";
		$data = $this->conexionBD->Execute($cadenaSQL);
		if ($data->_numOfRows > 0) {
			$existe = true;
		}
	
		unset($data);
		return $existe;
	}
	public function eliminarCliente($rifcli) {
		$respuesta = true;
		if (!$this->tieneContrato($rifcli)) {
			if (!$this->tieneActividad($rifcli)) {
				$cadenaPk = "rifcli = '{$rifcli}'";
				$this->daoCliente = FabricaDao::CrearDAO('C', 'cliente', array(), $cadenaPk);
				if ($this->daoCliente->_saved) {
					if ($this->daoCliente->eliminar()) {
						$respuesta = true;
						$this->mensaje = 'El cliente fue eliminado';
					}
					else {
						$respuesta = false;
						$this->mensaje = 'Ocurri&#243; un error al eliminar el cliente';
					}
				}
				else {
					$this->mensaje = 'El cliente no existe';
				}
			}
			else {
				$respuesta = false;
				$this->mensaje = 'El cliente tiene actividades registradas, no puede ser eliminado';
			}
		}
		else {
			$respuesta = false;
			$this->mensaje = 'El cliente tiene un contrato asociado, no puede ser eliminado'; 
		}
		
		return $respuesta;
	}
}