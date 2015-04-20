<?php
session_start();
$dirsrvdoc = '';
$dirsrvdoc = dirname(__FILE__);
$dirsrvdoc = str_replace('\\','/',$dirsrvdoc);
$dirsrvdoc = str_replace('/modelo/mrh','',$dirsrvdoc);
require_once ($dirsrvdoc.'/base/librerias/php/gerco/gerco_lib_fabricadao.php');

class ServicioContrato {
	private $conexionBD;
	private $daoContrato;
	public  $mensaje = '';
		
	public function ServicioContrato() {
		$this->conexionBD  = null;
		$this->daoContrato = null;
	}
	
	public function buscarNumero() {
		$this->daoContrato = FabricaDao::CrearDAO('N', 'contrato');
		$numero = $this->daoContrato->buscarCodigo('codcon', 4);
		unset($this->daoContrato);
		return $numero;
	}
	
	public function eliminarNotas($codcon) {
		$this->conexionBD = ConexionBaseDatos::getInstanciaConexion();
		$cadenaSQL = "DELETE FROM nota WHERE codcon = '{$codcon}'";
		$this->conexionBD->Execute($cadenaSQL);
	}
	
	public function insertarContrato($objJson) {
		$this->conexionBD = ConexionBaseDatos::getInstanciaConexion();
		$respuesta = true;
		$this->daoContrato = FabricaDao::CrearDAO('N', 'contrato');
		$this->daoContrato->setData($objJson);
		if ($this->daoContrato->incluir(false, true, 'codcon', 4)) {
			foreach ($objJson->arrNota as $recdetalle) {
				$cadenaSQL = "INSERT INTO nota(codcon, fecnot, desnot)
    							VALUES ('{$this->daoContrato->codcon}', '{$recdetalle->fecnot}', '{$recdetalle->desnot}')";
				if ($this->conexionBD->Execute($cadenaSQL) === false) {
					$this->mensaje = 'Ocurri&#243; un error al insertar los destalles ';
					$this->eliminarNotas($this->daoContrato->codcon);
					$this->daoContrato->eliminar();
					$respuesta = false;
					break;
				}
			}
	
			if ($respuesta) {
				if ($this->daoContrato->errorDuplicate) {
					$this->mensaje = "El contrato se inserto con el numero: ".$this->daoContrato->codcon;
				}
				else {
					$this->mensaje = "El contrato se inserto exitosamente ";
				}
			}
		}
		else {
			$respuesta = false;
			$this->mensaje = 'Ocurri&#243; un error al insertar el contrato '.$this->daoContrato->ErrorMsg();
		}
		unset($this->daoContrato);
		return $respuesta;
	}
	
	
	
	public function buscarContrato($codcon, $razsoc,  $numcon) {
		$this->conexionBD = ConexionBaseDatos::getInstanciaConexion();
		$cadenaSQL = "SELECT CNT.*, CLI.razsoc
						FROM contrato CNT
						INNER JOIN cliente CLI ON CNT.rifcli = CLI.rifcli
						WHERE CNT.codcon ILIKE '%{$codcon}%' AND CLI.razsoc ILIKE '%{$codcon}%' 
						AND CNT.numcon ILIKE '%{$numcon}%'
						AND CNT.codcon <> '----' 
						ORDER BY codcon";
		return $this->conexionBD->Execute($cadenaSQL);
	}
	
	public function buscarNotas($codcon) {
		$this->conexionBD = ConexionBaseDatos::getInstanciaConexion();
		$cadenaSQL = "SELECT *, CAST('S' AS char) AS estbdt FROM nota WHERE codcon = '{$codcon}'";
		return $this->conexionBD->Execute($cadenaSQL);
	}
	
	public function modificarContrato($objJson) {
		$this->conexionBD = ConexionBaseDatos::getInstanciaConexion();
		$respuesta = true;
		$cadenaPk = "codcon = '{$objJson->codcon}'";
		$this->daoContrato = FabricaDao::CrearDAO('C', 'contrato', array(), $cadenaPk);
		$this->daoContrato->rifcli = $objJson->rifcli;
		$this->daoContrato->numcon = $objJson->numcon;
		$this->daoContrato->feccon = $objJson->feccon;
		$this->daoContrato->tipcon = $objJson->tipcon;
		$this->daoContrato->canhor = $objJson->canhor;
		$this->daoContrato->fecini = $objJson->fecini;
		$this->daoContrato->fecfinest = $objJson->fecfinest;
		$this->daoContrato->contra = $objJson->contra;
		$this->daoContrato->moncon = $objJson->moncon;
		if ($this->daoContrato->modificar() != 0) {
			foreach ($objJson->arrNota as $recdetalle) {
				if ($recdetalle->estbdt == 'N') {
					$cadenaSQL = "INSERT INTO nota(codcon, fecnot, desnot)
										VALUES ('{$this->daoContrato->codcon}', '{$recdetalle->fecnot}', '{$recdetalle->desnot}')";
				}
				else if ($recdetalle->estbdt == 'S') {
					$cadenaSQL = "UPDATE nota SET fecnot='{$recdetalle->fecnot}', desnot='{$recdetalle->desnot}' 
									WHERE numnot='{$recdetalle->numnot}' AND codcon='{$this->daoContrato->codcon}'";
				}
				
				if ($this->conexionBD->Execute($cadenaSQL) === false) {
					$this->mensaje = 'Ocurri&#243; un error al modificar los destalles ';
					$this->eliminarTareas($this->daoContrato->codcon);
					$this->daoContrato->eliminar();
					$respuesta = false;
					break;
				}
			}
	
			if ($respuesta) {
				$this->mensaje = "El contrato fue actualizado exitosamente ";
			}
		}
		else {
			$respuesta = false;
			$this->mensaje = 'Ocurri&#243; un error al actualizar el contrato '.$this->daoContrato->ErrorMsg();
		}
		unset($this->daoContrato);
		return $respuesta;
	}
	
	public function validarContPro($codcon) {
		$respuesta =  true;
		$this->conexionBD = ConexionBaseDatos::getInstanciaConexion();
		$cadenaSQL = "SELECT codcon FROM programacion WHERE codcon = '{$codcon}'";
		$data = $this->conexionBD->Execute($cadenaSQL);
		if ($data->_numOfRows > 0) {
			$respuesta = false;
		}
		unset($data);
	
		return $respuesta;
	}
	
	public function eliminarContrato($codcon) {
		$respuesta =  true;
		//ConexionBaseDatos::getInstanciaConexion()->debug = true;
		if ($this->validarContPro($codcon)) {
			$cadenaPk = "codcon = '{$codcon}'";
			$this->daoContrato = FabricaDao::CrearDAO('C', 'contrato', array(), $cadenaPk);
			if ($this->daoContrato->_saved) {
				$this->eliminarNotas($codcon);
				$respuesta = $this->daoContrato->eliminar();
				if (!$respuesta) {
					$this->mensaje = 'Ocurri&#243; un error al eliminar el contranto '.$this->daoContrato->ErrorMsg();
				}
				else {
					$this->mensaje = 'El contrato fue eliminada con exito!';
				}
			}
		}
		else {
			$respuesta = false;
			$this->mensaje = 'El contrato esta asociado a una programacici&#243;n, no puede ser eliminado';
		}
	
		return $respuesta;
	}
	
	public function eliminarNota($codcon, $numnot) {
		$this->conexionBD = ConexionBaseDatos::getInstanciaConexion();
		$cadenaSQL = "DELETE FROM nota WHERE codcon = '{$codcon}' AND numnot = '{$numnot}'";
		return $this->conexionBD->Execute($cadenaSQL);
	}
}