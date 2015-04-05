<?php
session_start();
$dirsrvdoc = '';
$dirsrvdoc = dirname(__FILE__);
$dirsrvdoc = str_replace('\\','/',$dirsrvdoc);
$dirsrvdoc = str_replace('/modelo/mrh','',$dirsrvdoc);
require_once ($dirsrvdoc.'/base/librerias/php/gerco/gerco_lib_fabricadao.php');

class ServicioListadoContrato {
	private $conexionBD;
	public  $mensaje = '';
		
	public function ServicioListadoContrato() {
		$this->conexionBD   = null;
	}
	
	public function listadoContrato($objFiltro) {
		$this->conexionBD = ConexionBaseDatos::getInstanciaConexion();
		$filtroSQL = '';
		
		if ($objFiltro->rifcli != '') {
			$filtroSQL = " CON.rifcli = '{$objFiltro->rifcli}' ";
		}
		
		if ($objFiltro->tipcon != '') {
			if ($filtroSQL == '') {
				$filtroSQL .= " CON.tipcon = '{$objFiltro->tipcon}' ";
			}
			else {
				$filtroSQL .= " AND CON.tipcon = '{$objFiltro->tipcon}' ";
			}
		}
		
		if ($objFiltro->estcon != '') {
			if ($filtroSQL == '') {
				$filtroSQL .= " CON.estcon = '{$objFiltro->estcon}' ";
			}
			else {
				$filtroSQL .= " AND CON.estcon = '{$objFiltro->estcon}' ";
			}
		}
		
		if ($objFiltro->fecdes != '' && $objFiltro->fechas != '') {
			if ($filtroSQL == '') {
				$filtroSQL .= " CON.feccon BETWEEN '{$objFiltro->fecdes}' AND '{$objFiltro->fechas}' ";
			}
			else {
				$filtroSQL .= " AND CON.feccon BETWEEN '{$objFiltro->fecdes}' AND '{$objFiltro->fechas}' ";
			}
		}
		
		$filtroSUM = '';
		if ($objFiltro->hordes != '' && $objFiltro->horhas != '') {
			$filtroSUM .= " HAVING SUM(MOD.canhor) BETWEEN {$objFiltro->hordes} AND {$objFiltro->horhas} ";
		}
		
		if ($filtroSQL != '') {
			$filtroSQL = $filtroSQL.' AND ';
		}
		
		$cadenaSQL = "SELECT CLI.razsoc, CON.codcon, CON.tipcon, CON.feccon, CON.canhor, CON.estcon, COALESCE(SUM(MOD.canhor), 0) AS canhoreje
  						FROM contrato CON
  						LEFT OUTER JOIN actividad ACT ON CON.codcon=ACT.codcon
  						LEFT OUTER JOIN modact MOD ON ACT.numact=MOD.numact
  						INNER JOIN cliente CLI ON CON.rifcli=CLI.rifcli
  						WHERE {$filtroSQL} CON.codcon <> '----'
  						GROUP BY 1,2,3,4,5,6 {$filtroSUM}";
		return $this->conexionBD->Execute($cadenaSQL);
	}
}