<?php
session_start();
$dirsrvdoc = '';
$dirsrvdoc = dirname(__FILE__);
$dirsrvdoc = str_replace('\\','/',$dirsrvdoc);
$dirsrvdoc = str_replace('/modelo/mrh','',$dirsrvdoc);
require_once ($dirsrvdoc.'/base/librerias/php/gerco/gerco_lib_fabricadao.php');

class ServicioImputarHora {
	private $conexionBD;
	private $daoActividad;
	private $daoModAct;
	public  $mensaje = '';
		
	public function ServicioImputarHora() {
		$this->conexionBD   = null;
		$this->daoActividad = null;
	}
	
	public function buscarActividad($rifcli, $fecact) {
		$this->conexionBD = ConexionBaseDatos::getInstanciaConexion();
		$filtroFecha = '';
		if ($fecact != '') {
			$filtroFecha = "  AND fecact = '{$fecact}' ";
		}
		$cadenaSQL = "SELECT ACT.numact, ACT.rifcli, CLI.razsoc, ACT.fecact, ACT.codcon
						FROM actividad ACT 
							INNER JOIN cliente CLI ON ACT.rifcli=CLI.rifcli 
						WHERE ACT.rifcli ILIKE '%{$rifcli}%' {$filtroFecha}
						ORDER BY 1";
		return $this->conexionBD->Execute($cadenaSQL);
	}
	
	public function buscarTarea($numact) {
		$this->conexionBD = ConexionBaseDatos::getInstanciaConexion();
		$cadenaSQL = "SELECT codmod, canhor, desact, casman, estfac
  						FROM modact
						WHERE numact='{$numact}'";
		return $this->conexionBD->Execute($cadenaSQL);
	}
		
	public function imputarActividad($arrJson) {
		$respuesta = true;
		for($j=0;$j<=count($arrJson)-1;$j++) {
			$cadenaPk = "numact = '{$arrJson[$j]->numact}'";
			$this->daoActividad = FabricaDao::CrearDAO('C', 'actividad', array(), $cadenaPk);
			if ($this->daoActividad->_saved) {
				$this->daoActividad->codcon = $arrJson[$j]->codcon;
							
				if ($this->daoActividad->modificar() === 0) {
					$this->mensaje = 'Ocurri&#243; un error al procesar las actividades';
					$respuesta = false;
					break;
				}
			}
			else {
				$this->mensaje = "La actividad {$arrJson[$j]->numact} no esta registrada en la base de datos";
				$respuesta = false;
				break;
			}
		}
		
		if ($respuesta) {
			$this->mensaje = "Las actividades fueron procesadas con exito";
		}
		
		return $respuesta;
	}
	
	public function imputarTarea($arrJson) {
		$respuesta = true;
		for($j=0;$j<=count($arrJson)-1;$j++) {
			$cadenaPk = "numact = '{$arrJson[$j]->numact}' AND codmod = '{$arrJson[$j]->codmod}'";
			$this->daoModAct = FabricaDao::CrearDAO('C', 'modact', array(), $cadenaPk);
			if ($this->daoModAct->_saved) {
				$this->daoModAct->estfac = $arrJson[$j]->estfac;
					
				if ($this->daoModAct->modificar() === 0) {
					$this->mensaje = 'Ocurri&#243; un error al procesar las tareas';
					$respuesta = false;
					break;
				}
			}
			else {
				$this->mensaje = "La tarea del modulo {$arrJson[$j]->codmod} no esta registrada en la base de datos";
				$respuesta = false;
				break;
			}
		}
	
		if ($respuesta) {
			$this->mensaje = "Las tareas fueron procesadas con exito";
		}
	
		return $respuesta;
	}
	
	public function contratoCliente($rifcli) {
		$this->conexionBD = ConexionBaseDatos::getInstanciaConexion();
		$cadenaSQL = "SELECT CON.codcon, CON.numcon,
							 (CASE WHEN CON.tipcon='C1' 
									 THEN 'Implantaci&#243;n'
									WHEN CON.tipcon='C2' 
									 THEN 'Mantenimiento'
									ELSE 'Servicios de Consultoria'
									END) AS tipcon  
						FROM contrato CON 
						WHERE CON.rifcli='{$rifcli}' 
						ORDER BY 1";
		return $this->conexionBD->Execute($cadenaSQL);
	}
	
}