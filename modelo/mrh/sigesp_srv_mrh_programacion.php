<?php
session_start();
$dirsrvdoc = '';
$dirsrvdoc = dirname(__FILE__);
$dirsrvdoc = str_replace('\\','/',$dirsrvdoc);
$dirsrvdoc = str_replace('/modelo/mrh','',$dirsrvdoc);
require_once ($dirsrvdoc.'/base/librerias/php/gerco/gerco_lib_fabricadao.php');

class ServicioProgramacion {
	private $conexionBD;
	private $daoProgramacion;
	private $daoModPro;
	public  $mensaje = '';
		
	public function ServicioProgramacion() {
		$this->conexionBD      = null;
		$this->daoProgramacion = null;
		$this->daoModPro       = null;
	}
	
	public function buscarNumero() {
		$this->daoProgramacion = FabricaDao::CrearDAO('N', 'programacion');
		$numero = $this->daoProgramacion->buscarCodigo('numpro', 6);
		unset($this->daoProgramacion);
		return $numero;
	}
	
	public function buscarContrato($rifcli) {
		$this->conexionBD = ConexionBaseDatos::getInstanciaConexion();
		$cadenaSQL = "SELECT codcon, tipcon
						FROM contrato
						WHERE rifcli = '{$rifcli}'";
		return $this->conexionBD->Execute($cadenaSQL);
	}
	
	public function obtenerDenCon($arrTipCon, $tipcon, $codcon) {
		foreach ($arrTipCon as $regTipcon) {
			if ($regTipcon['codigo'] == $tipcon) {
				return $codcon." - ".$regTipcon['descripcion'];
			}
		}
	}
	
	public function buscarProgramacion($numpro, $razsoc) {
		$this->conexionBD = ConexionBaseDatos::getInstanciaConexion();
		$cadenaSQL = "SELECT PRO.numpro, PRO.logcon, PRO.codcon, PRO.fecpro, PRO.tipact, CNT.tipcon, CON.nomcon, CNT.rifcli, CLI.razsoc
  						FROM programacion PRO
  						INNER JOIN contrato CNT ON PRO.codcon = CNT.codcon
  						INNER JOIN consultor CON ON PRO.logcon = CON.logcon
  						INNER JOIN cliente CLI ON CNT.rifcli = CLI.rifcli
						WHERE PRO.numpro ILIKE '%{$numpro}%' AND CLI.razsoc ILIKE '%{$razsoc}%'
		       			AND PRO.numpro <> '------' ORDER BY 1";
		return $this->conexionBD->Execute($cadenaSQL);
	}
	
	public function buscarTareas($numpro) {
		$this->conexionBD = ConexionBaseDatos::getInstanciaConexion();
		$cadenaSQL = "SELECT *, CAST('S' AS char) AS estbdt FROM modpro WHERE numpro = '{$numpro}'";
		return $this->conexionBD->Execute($cadenaSQL);
	}
	
	public function eliminarTareas($numpro) {
		$this->conexionBD = ConexionBaseDatos::getInstanciaConexion();
		$cadenaSQL = "DELETE FROM modpro WHERE numpro = '{$numpro}'";
		$this->conexionBD->Execute($cadenaSQL);
	}
	
	public function insertarProgramacion($objJson) {
		$respuesta = true;
		//ConexionBaseDatos::getInstanciaConexion()->debug = true;
		$this->daoProgramacion = FabricaDao::CrearDAO('N', 'programacion');
		$this->daoProgramacion->setData($objJson);
		if ($this->daoProgramacion->incluir(false, true, 'numpro', 6)) {
			foreach ($objJson->arrModPro as $recdetalle) {
				$this->daoModPro = FabricaDao::CrearDAO('N', 'modpro');
				$this->daoModPro->setData($recdetalle);
				$this->daoModPro->numpro = $this->daoProgramacion->numpro;
				if (!$this->daoModPro->incluir()) {
					$this->mensaje = 'Ocurri&#243; un error al insertar los destalles '.$this->daoModPro->ErrorMsg();
					$this->eliminarTareas($this->daoProgramacion->numpro);
					$this->daoProgramacion->eliminar();
					$respuesta = false;
					break;
				}
				unset($this->daoModPro);
			}
				
			if ($respuesta) {
				if ($this->daoProgramacion->errorDuplicate) {
					$this->mensaje = "La programaci&#243;n se inserto con el numero: ".$this->daoProgramacion->numpro;
				}
				else {
					$this->mensaje = "La programaci&#243;n fue procesada exitosamente ";
				}
			}
		}
		else {
			$respuesta = false;
			$this->mensaje = 'Ocurri&#243; un error al procesar la programaci&#243;n '.$this->daoProgramacion->ErrorMsg();
		}
		unset($this->daoProgramacion);
		return $respuesta;
	}
	
	public function modificarProgramacion($objJson) {
		$respuesta = true;
		//ConexionBaseDatos::getInstanciaConexion()->debug = true;
		$cadenaPk = "numpro = '{$objJson->numpro}'";
		$this->daoProgramacion = FabricaDao::CrearDAO('C', 'programacion', array(), $cadenaPk);
		$this->daoProgramacion->logcon = $objJson->logcon;
		$this->daoProgramacion->codcon = $objJson->codcon;
		$this->daoProgramacion->fecpro = $objJson->fecpro;
		$this->daoProgramacion->tipact = $objJson->tipact;
		if ($this->daoProgramacion->modificar() != 0) {
			foreach ($objJson->arrModPro as $recdetalle) {
				$cadenaPkDt = "codmod = '{$recdetalle->codmod}' AND numpro = '{$this->daoProgramacion->numpro}'";
				$this->daoModPro = FabricaDao::CrearDAO('C', 'modpro', array(), $cadenaPkDt);
				if (!$this->daoModPro->_saved) {
					$this->daoModPro->setData($recdetalle);
					$this->daoModPro->numpro = $this->daoProgramacion->numpro;
				}
				else {
					$this->daoModPro->desact    = utf8_decode($recdetalle->desact);
					$this->daoModPro->canhorest = $recdetalle->canhorest;
					$this->daoModPro->casman    = $recdetalle->casman;
				}
	
				if ($this->daoModPro->modificar() == 0) {
					$this->mensaje = 'Ocurri&#243; un error al modificar los destalles '.$this->daoModPro->ErrorMsg();
					$this->eliminarTareas($this->daoProgramacion->numpro);
					$this->daoProgramacion->eliminar();
					$respuesta = false;
					break;
				}
				unset($this->daoModPro);
			}
	
			if ($respuesta) {
				$this->mensaje = "La programaci&#243;n fue procesada exitosamente ";
			}
		}
		else {
			$respuesta = false;
			$this->mensaje = 'Ocurri&#243; un error al procesar la programaci&#243;n '.$this->daoProgramacion->ErrorMsg();
		}
		unset($this->daoProgramacion);
		return $respuesta;
	}
	
	public function validarProgProc($numpro) {
		$respuesta =  true;
		$this->conexionBD = ConexionBaseDatos::getInstanciaConexion();
		$cadenaSQL = "SELECT numpro FROM actividad WHERE numpro = '{$numpro}'";
		$data = $this->conexionBD->Execute($cadenaSQL);
		if ($data->_numOfRows > 0) {
			$respuesta = false;
		}
		unset($data);
		
		return $respuesta;
	}
	
	public function eliminarProgramacion($numpro) {
		$respuesta =  true;
		if ($this->validarProgProc($numpro)) {
			$cadenaPk = "numpro = '{$numpro}'";
			$this->daoProgramacion = FabricaDao::CrearDAO('C', 'programacion', array(), $cadenaPk);
			if ($this->daoProgramacion->_saved) {
				$this->eliminarTareas($numpro);
				$respuesta = $this->daoProgramacion->eliminar();
				if (!$respuesta) {
					$this->mensaje = 'Ocurri&#243; un error al eliminar la programaci&#243;n, '.$this->daoProgramacion->ErrorMsg();
				}
				else {
					$this->mensaje = 'La programaci&#243;n fue eliminada con exito!';
				}
			}
		}
		else {
			$respuesta = false;
			$this->mensaje = 'La programacici&#243;n esta asociada a una actividad, no puede ser eliminada';
		}
		
		return $respuesta;
	}
	
	public function eliminarTarea($codmod, $numpro) {
		$respuesta = true;
		$cadenaPkDt = "codmod = '{$codmod}' AND numpro = '{$numpro}'";
		$this->daoModPro = FabricaDao::CrearDAO('C', 'modpro', array(), $cadenaPkDt);
		if ($this->daoModPro->_saved) {
			$respuesta = $this->daoModPro->eliminar();
		}
		return $respuesta;
	}
}