<?php
require_once("../../../modelo/mrh/sigesp_srv_mrh_listadoprogramacion.php");
require_once ('../../../base/conf/data_estatica.php');
require_once("sigesp_vis_clas_listadoprogramacion.php");


$objetoData = str_replace('\\','',$_GET['ObjSon']);
$json = new Services_JSON;
$objetoData = $json->decode($objetoData);

//RECIBIENDO PARAMETRO BUSCANDO DATA
$servicioListadoProgramacion = new ServicioListadoProgramacion();
$dataReporte = $servicioListadoProgramacion->listadoProgramacion($objetoData);
$arrCabecera  = array();
if (!$dataReporte->EOF) {
	$reporte = new reporteListadoProgramacion(4, 3, 2, 2);
	if ($objetoData->rifcli != '') {
		$arrCabecera[] = array('etiqueta'=>'<b>Cliente</b>','valor'=>$dataReporte->fields['razsoc']);
	}
	else {
		$arrCabecera[] = array('etiqueta'=>'<b>Cliente</b>','valor'=>'TODOS LOS CLIENTES');
	}
	
	if ($objetoData->codcon != '') {
		$contrato = $reporte->obtenerDenCon($arrTipCon, $dataReporte->fields['tipcon'], $dataReporte->fields['codcon']);
		$arrCabecera[] = array('etiqueta'=>'<b>Contrato</b>','valor'=>$contrato);
	}
	else {
		$arrCabecera[] = array('etiqueta'=>'<b>Contrato</b>','valor'=>'TODOS LOS CONTRATOS');
	}
	
	if ($objetoData->fecdes != '' && $objetoData->fechas != '') {
		$fechaDesde = $reporte->formatoFecha($objetoData->fecdes);
		$fechaHasta = $reporte->formatoFecha($objetoData->fechas);
		$arrCabecera[] = array('etiqueta'=>'<b>Rango de Fecha</b>','valor'=>'desde '.$fechaDesde.' al '.$fechaHasta);
	}
	
	
	if ($objetoData->logcon != '') {
		$arrCabecera[] = array('etiqueta'=>'<b>Consultor</b>','valor'=>$objetoData->nomcon);
	}
	
	$total = 0;
	$arrDataDetalle = array();
	while (!$dataReporte->EOF) {
		//$contrato = $reporte->obtenerDenCon($arrTipCon, $dataReporte->fields['tipcon'], $dataReporte->fields['codcon']);
		$arrDataDetalle[] = array('fecpro'=>$reporte->formatoFecha($dataReporte->fields['fecpro']),'razsoc'=>$dataReporte->fields['razsoc'],
				     			  'nomcon'=>$dataReporte->fields['nomcon'],'desact'=>$dataReporte->fields['desact']);
		
		$dataReporte->MoveNext();
	}
	unset($dataReporte);
	
	//CONSTRUYENDO REPORTE
	$reporte->encabezadoFechaReporte('LISTADO DE PROGRAMACIONES', 'landscape');
	$reporte->cabeceraEstandar($arrCabecera);
	$reporte->detalleListadoProgramacion($arrDataDetalle);
	$reporte->imprimirReporte();
}