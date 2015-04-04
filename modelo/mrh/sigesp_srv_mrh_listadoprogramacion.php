<?php
session_start();
$dirsrvdoc = '';
$dirsrvdoc = dirname(__FILE__);
$dirsrvdoc = str_replace('\\','/',$dirsrvdoc);
$dirsrvdoc = str_replace('/modelo/mrh','',$dirsrvdoc);
require_once ($dirsrvdoc.'/base/librerias/php/gerco/gerco_lib_fabricadao.php');

class ServicioListadoProgramacion {
	private $conexionBD;
	public  $mensaje = '';
		
	public function ServicioListadoProgramacion() {
		$this->conexionBD   = null;
	}
	
	public function listadoProgramacion($objFiltro) {
		$this->conexionBD = ConexionBaseDatos::getInstanciaConexion();
		$filtroSQL = '';
		
		if ($objFiltro->rifcli != '') {
			$filtroSQL = " CNT.rifcli = '{$objFiltro->rifcli}' ";
		}
		
		if ($objFiltro->codcon != '') {
			if ($filtroSQL == '') {
				$filtroSQL .= " PRO.codcon = '{$objFiltro->codcon}' ";
			}
			else {
				$filtroSQL .= " AND PRO.codcon = '{$objFiltro->codcon}' ";
			}
		}
		
		if ($objFiltro->fecdes != '' && $objFiltro->fechas != '') {
			if ($filtroSQL == '') {
				$filtroSQL .= " PRO.fecpro BETWEEN '{$objFiltro->fecdes}' AND '{$objFiltro->fechas}' ";
			}
			else {
				$filtroSQL .= " AND PRO.fecpro BETWEEN '{$objFiltro->fecdes}' AND '{$objFiltro->fechas}' ";
			}
		}
		
		if ($objFiltro->logcon != '') {
			if ($filtroSQL == '') {
				$filtroSQL .= " PRO.logcon = '{$objFiltro->logcon}' ";
			}
			else {
				$filtroSQL .= " AND PRO.logcon = '{$objFiltro->logcon}' ";
			}
		}
		
		if ($filtroSQL != '') {
			$filtroSQL = $filtroSQL.' AND ';
		}
		
		$cadenaSQL = "SELECT  PRO.numpro,PRO.fecpro, PRO.codcon, CNT.tipcon, CON.nomcon, CLI.razsoc, MOD.desact
  						FROM programacion PRO
  						INNER JOIN modpro MOD ON PRO.numpro = MOD.numpro
  						INNER JOIN contrato CNT ON PRO.codcon = CNT.codcon
  						INNER JOIN consultor CON ON PRO.logcon = CON.logcon
  						INNER JOIN cliente CLI ON CNT.rifcli = CLI.rifcli
						WHERE {$filtroSQL} PRO.numpro <> '------' ";
		return $this->conexionBD->Execute($cadenaSQL);
	}
}