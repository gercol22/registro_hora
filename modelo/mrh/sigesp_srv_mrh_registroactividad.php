<?php
session_start();
$dirsrvdoc = '';
$dirsrvdoc = dirname(__FILE__);
$dirsrvdoc = str_replace('\\','/',$dirsrvdoc);
$dirsrvdoc = str_replace('/modelo/mrh','',$dirsrvdoc);
require_once ($dirsrvdoc.'/base/librerias/php/gerco/gerco_lib_fabricadao.php');

class ServicioRegistroActividad {
	private $conexionBD;
	private $daoActividad;
	public  $mensaje = '';
		
	public function ServicioRegistroActividad() {
		$this->conexionBD   = null;
		$this->daoActividad = null;
		$this->daoModAct    = null;
	}
	
	public function buscarProgramacion($logcon) {
		$this->conexionBD = ConexionBaseDatos::getInstanciaConexion();
		$cadenaSQL = "SELECT PRO.numpro, PRO.codcon, PRO.fecpro, PRO.tipact, CNT.rifcli, CLI.razsoc
  						FROM programacion PRO
  						INNER JOIN contrato CNT ON PRO.codcon = CNT.codcon
  						INNER JOIN cliente CLI ON CNT.rifcli = CLI.rifcli
						WHERE PRO.numpro NOT IN (SELECT numpro from actividad) 
						AND PRO.logcon = '{$logcon}' AND PRO.numpro <> '------' 
						ORDER BY 1";
		return $this->conexionBD->Execute($cadenaSQL);
	}
	
	public function buscarNumero() {
		$this->daoActividad = FabricaDao::CrearDAO('N', 'actividad');
		$numero = $this->daoActividad->buscarCodigo('numact', 6);
		unset($this->daoActividad);
		return $numero;
	}
	
	public function eliminarTareas($numact) {
		$this->conexionBD = ConexionBaseDatos::getInstanciaConexion();
		$cadenaSQL = "DELETE FROM modact WHERE numact = '{$numact}'";
		$this->conexionBD->Execute($cadenaSQL);
	}
	
	public function guardarTarea($objJson, $numact) {
		$respuesta = true;
		$this->conexionBD = ConexionBaseDatos::getInstanciaConexion();
		if ($objJson->estbdt == 'N') {
			$cadenaSQL = "INSERT INTO modact(codmod, numact, canhor, desact, desinc, tipinc, casman, estfac)
							VALUES ('{$objJson->codmod}', '{$numact}', {$objJson->canhor}, '{$objJson->desact}',
									'{$objJson->desinc}', '{$objJson->tipinc}', '{$objJson->casman}', 0)";
		}
		else {
			$cadenaSQL = "UPDATE modact 
							SET canhor={$objJson->canhor}, desact='{$objJson->desact}', desinc='{$objJson->desinc}', 
								tipinc='{$objJson->tipinc}', casman='{$objJson->casman}', codmod='{$objJson->codmod}'
							WHERE numtar={$objJson->numtar}";
		}
		
		if ($this->conexionBD->Execute($cadenaSQL) === false) {
			$respuesta = false;
		}
		
		return $respuesta;
	}
	
	public function insertarActividad($objJson) {
		$respuesta = true;
		//ConexionBaseDatos::getInstanciaConexion()->debug = true;
		$this->daoActividad = FabricaDao::CrearDAO('N', 'actividad');
		$this->daoActividad->setData($objJson);
		$this->daoActividad->logcon = $_SESSION['logcon'];
		if ($this->daoActividad->incluir(false, true, 'numact', 6)) {
			foreach ($objJson->arrModAct as $recdetalle) {
				if (!$this->guardarTarea($recdetalle, $this->daoActividad->numact)) {
					$this->mensaje = 'Ocurri&#243; un error al insertar los destalles '.$this->conexionBD->ErrorMsg();
					$this->eliminarTareas($this->daoActividad->numact);
					$this->daoActividad->eliminar();
					$respuesta = false;
					break;
				}
				unset($this->daoModAct);
			}
			
			if ($respuesta) {
				if ($this->daoActividad->errorDuplicate) {
					$this->mensaje = "La actividad se inserto con el numero: ".$this->daoActividad->numact;
				}
				else {
					$this->mensaje = "La actividad fue procesada exitosamente ";
				}
			}
		}
		else {
			$respuesta = false;
			$this->mensaje = 'Ocurrio un error al procesar la actividad '.$this->daoActividad->ErrorMsg();
		}
		unset($this->daoActividad);
		return $respuesta;
	}
	
	public function modificarActividad($objJson) {
		$respuesta = true;
		//ConexionBaseDatos::getInstanciaConexion()->debug = true;
		$cadenaPk = "numact = '{$objJson->numact}'";
		$this->daoActividad = FabricaDao::CrearDAO('C', 'actividad', array(), $cadenaPk);
		$this->daoActividad->rifcli = $objJson->rifcli;
		$this->daoActividad->numpro = $objJson->numpro;
		$this->daoActividad->tipact = $objJson->tipact;
		$this->daoActividad->fecact = $objJson->fecact;
		$this->daoActividad->estvis = $objJson->estvis;
		$this->daoActividad->rescli = utf8_decode($objJson->rescli);
		if ($this->daoActividad->modificar() != 0) {
			foreach ($objJson->arrModAct as $recdetalle) {
				if (!$this->guardarTarea($recdetalle, $this->daoActividad->numact)) {
					$this->mensaje = 'Ocurrio un error al modificar los destalles '.$this->conexionBD->ErrorMsg();
					$this->eliminarTareas($this->daoActividad->numact);
					$this->daoActividad->eliminar();
					$respuesta = false;
					break;
				}
			}
				
			if ($respuesta) {
				$this->mensaje = "La actividad fue procesada exitosamente ";
			}
		}
		else {
			$respuesta = false;
			$this->mensaje = 'Ocurrio un error al procesar la actividad '.$this->daoActividad->ErrorMsg();
		}
		unset($this->daoActividad);
		return $respuesta;
	}
	
	public function buscarActividad($logcon, $numact, $razsoc, $fecact, $logconfiltro) {
		$this->conexionBD = ConexionBaseDatos::getInstanciaConexion();
		$filtroUSU = '';
		if($_SESSION['rolcon'] != 'A'){
			$filtroUSU = " CON.logcon = '{$logcon}' AND ";			
		}
		else {
			if (!empty($logconfiltro)) {
				$filtroUSU = " CON.logcon = '{$logconfiltro}' AND ";
			}
		}
		
		$filtroFecha = '';
		if (!empty($fecact)) {
			$filtroFecha = " AND ACT.fecact = '{$fecact}' ";
		}
		
		$cadenaSQL = "SELECT ACT.numact, ACT.numpro, ACT.rifcli, CLI.razsoc, ACT.tipact, ACT.fecact, ACT.estvis, ACT.rescli, CON.nomcon,
							 COALESCE((SELECT MOD.estfac 
           								FROM modact MOD 
           								WHERE MOD.numact=ACT.numact AND MOD.estfac=1 LIMIT 1),0) AS estfac,
           					 COALESCE((SELECT SUM(MOD.canhor) 
           								FROM modact MOD 
           								WHERE MOD.numact=ACT.numact 
           								GROUP BY numact),0) AS tothor				
						FROM actividad ACT
						INNER JOIN cliente CLI ON ACT.rifcli = CLI.rifcli
						INNER JOIN consultor CON ON ACT.logcon = CON.logcon 
						WHERE {$filtroUSU} ACT.numact ILIKE '%{$numact}%' AND CLI.razsoc ILIKE '%{$razsoc}%' {$filtroFecha}
						ORDER BY 1";
		return $this->conexionBD->Execute($cadenaSQL);
	}
	
	public function buscarTareas($numact) {
		$this->conexionBD = ConexionBaseDatos::getInstanciaConexion();
		$cadenaSQL = "SELECT *, CAST('S' AS char) AS estbdt
						FROM modact
						WHERE numact = '{$numact}'";
		return $this->conexionBD->Execute($cadenaSQL);
	}
	
	public function buscarTareasProgramadas($numpro) {
		$this->conexionBD = ConexionBaseDatos::getInstanciaConexion();
		$cadenaSQL = "SELECT codmod, desact AS desinc, casman, canhorest AS canhor, CAST('S' AS char) AS estbdt
						FROM modpro
						WHERE numpro = '{$numpro}'";
		return $this->conexionBD->Execute($cadenaSQL);
	}
	
	public function eliminarActividad($numact) {
		$respuesta =  true;
		$cadenaPk = "numact = '{$numact}'";
		$this->daoActividad = FabricaDao::CrearDAO('C', 'actividad', array(), $cadenaPk);
		if ($this->daoActividad->_saved) {
			$this->eliminarTareas($numact);
			$respuesta = $this->daoActividad->eliminar();
		}
		return $respuesta;
	}
	
	public function eliminarTarea($codmod, $numact) {
		$respuesta = true;
		$cadenaPkDt = "codmod = '{$codmod}' AND numact = '{$numact}'";
		$this->daoModAct = FabricaDao::CrearDAO('C', 'modact', array(), $cadenaPkDt);
		if ($this->daoModAct->_saved) {
			$respuesta = $this->daoModAct->eliminar();
		}
		return $respuesta;
	}
	
	public function reporteActividad($numact) {
		$this->conexionBD = ConexionBaseDatos::getInstanciaConexion();
		$cadenaSQL = "SELECT CLI.razsoc, CON.nomcon, ACT.fecact , ACT.rescli
						FROM actividad ACT
							INNER JOIN cliente CLI ON ACT.rifcli = CLI.rifcli
							INNER JOIN consultor CON ON ACT.logcon = CON.logcon
						WHERE ACT.numact='{$numact}'";
		return $this->conexionBD->Execute($cadenaSQL);
	}
	
	public function reporteActividadTarea($numact) {
		$this->conexionBD = ConexionBaseDatos::getInstanciaConexion();
		$cadenaSQL = "SELECT codmod, desinc, desact, canhor,
		                      (CASE WHEN MOD.tipinc='I1' 
									 THEN 'Error Usuario (Configuración)'
									WHEN MOD.tipinc='I2' 
									 THEN 'Error Usuario (Procedimiento)'
									WHEN MOD.tipinc='I3' 
									 THEN 'Error Sistema'
									WHEN MOD.tipinc='I4' 
									 THEN 'Error Data'
									WHEN MOD.tipinc='I5' 
									 THEN 'Nuevo Requerimiento'   
									ELSE 'Entrenamiento / Otros'
									END) AS tipinc
						FROM modact MOD 
						WHERE MOD.numact = '{$numact}'";
		return $this->conexionBD->Execute($cadenaSQL);
	}
	
	public function reporteTotalHora($numact) {
		$total = 0;
		$this->conexionBD = ConexionBaseDatos::getInstanciaConexion();
		$cadenaSQL = "SELECT SUM (canhor) AS total
						FROM modact WHERE numact = '{$numact}'";
		$dataTotal = $this->conexionBD->Execute($cadenaSQL);
		if (!$dataTotal->EOF) {
			$total = $dataTotal->fields['total'];
		}
		
		return $total;
	}
}