<?php
session_start();
$dirsrvdoc = '';
$dirsrvdoc = dirname(__FILE__);
$dirsrvdoc = str_replace('\\','/',$dirsrvdoc);
$dirsrvdoc = str_replace('/modelo/mrh','',$dirsrvdoc);
require_once ($dirsrvdoc.'/base/librerias/php/gerco/gerco_lib_fabricadao.php');

class ServicioTotalHora {
	private $conexionBD;
	public  $mensaje = '';
		
	public function ServicioTotalHora() {
		$this->conexionBD   = null;
	}
	
	public function totalHoras($objFiltro) {
		$this->conexionBD = ConexionBaseDatos::getInstanciaConexion();
		$filtroSQL = '';
		
		if ($objFiltro->rifcli != '') {
			$filtroSQL = " ACT.rifcli = '{$objFiltro->rifcli}' ";
		}
		
		if ($objFiltro->codcon != '') {
			if ($filtroSQL == '') {
				$filtroSQL .= " ACT.codcon = '{$objFiltro->codcon}' ";
			}
			else {
				$filtroSQL .= " AND ACT.codcon = '{$objFiltro->codcon}' ";
			}
		}
		
		if ($objFiltro->fecdes != '' && $objFiltro->fechas != '') {
			if ($filtroSQL == '') {
				$filtroSQL .= " ACT.fecact BETWEEN '{$objFiltro->fecdes}' AND '{$objFiltro->fechas}' ";
			}
			else {
				$filtroSQL .= " AND ACT.fecact BETWEEN '{$objFiltro->fecdes}' AND '{$objFiltro->fechas}' ";
			}
		}
		
		if ($objFiltro->tipact != '') {
			if ($filtroSQL == '') {
				$filtroSQL .= " ACT.tipact = '{$objFiltro->tipact}' ";
			}
			else {
				$filtroSQL .= " AND ACT.tipact = '{$objFiltro->tipact}' ";
			}
		}
		
		if ($objFiltro->codmod != '') {
			if ($filtroSQL == '') {
				$filtroSQL .= " MOD.codmod = '{$objFiltro->codmod}' ";
			}
			else {
				$filtroSQL .= " AND MOD.codmod = '{$objFiltro->codmod}' ";
			}
		}
		
		if ($objFiltro->tipinc != '') {
			if ($filtroSQL == '') {
				$filtroSQL .= " MOD.tipinc = '{$objFiltro->tipinc}' ";
			}
			else {
				$filtroSQL .= " AND MOD.tipinc = '{$objFiltro->tipinc}' ";
			}
		}
		
		if ($objFiltro->esthorimp == 0) {
			if ($filtroSQL == '') {
				$filtroSQL .= " MOD.estfac = 1 ";
			}
			else {
				$filtroSQL .= " AND MOD.estfac = 1 ";
			}
		}
		
		
		if ($filtroSQL != '') {
			$filtroSQL = ' WHERE '.$filtroSQL;
		}
		
		$cadenaSQL = "SELECT CLI.razsoc, ACT.codcon, CON.tipcon, SUM(MOD.canhor) AS canhor
  						FROM actividad ACT
							INNER JOIN cliente CLI ON ACT.rifcli=CLI.rifcli
							INNER JOIN modact MOD ON ACT.numact=MOD.numact
							INNER JOIN contrato CON ON ACT.codcon=CON.codcon
						{$filtroSQL}
  						GROUP BY 1,2,3";
		return $this->conexionBD->Execute($cadenaSQL);
	}
}