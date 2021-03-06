<?php
require_once("../../../modelo/mrh/sigesp_srv_mrh_totalhora.php");
require_once ('../../../base/conf/data_estatica.php');
require_once("sigesp_vis_clas_totalhora.php");


$objetoData = str_replace('\\','',$_GET['ObjSon']);
$json = new Services_JSON;
$objetoData = $json->decode($objetoData);

//RECIBIENDO PARAMETRO BUSCANDO DATA
$servicioTotalHora = new ServicioTotalHora();
$dataReporte = $servicioTotalHora->totalHoras($objetoData);
$arrCabecera  = array();
if (!$dataReporte->EOF) {
	$reporte = new reporteTotalHora(4, 3, 2, 2, 'portrait');
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
	
	
	if ($objetoData->tipact != '') {
		$denAct = $reporte->obtenerDenominacion($arrActAdm, $objetoData->tipact);
		$arrCabecera[] = array('etiqueta'=>'<b>Tipo Actividad</b>','valor'=>$denAct);
	}
	
	if ($objetoData->codmod != '') {
		$denMod = $reporte->obtenerDenominacion($arrMod, $objetoData->codmod);
		$arrCabecera[] = array('etiqueta'=>'<b>M�dulo</b>','valor'=>$denMod);
	}
	
	if ($objetoData->tipinc != '') {
		$denTipInc = $reporte->obtenerDenominacion($arrTipInc, $objetoData->tipinc);
		$arrCabecera[] = array('etiqueta'=>'<b>Tipo Situaci�n</b>','valor'=>$denTipInc);
	}
	
	$total = 0;
	$arrDataDetalle = array();
	while (!$dataReporte->EOF) {
		$total += $dataReporte->fields['canhor'];
		$contrato = $reporte->obtenerDenCon($arrTipCon, $dataReporte->fields['tipcon'], $dataReporte->fields['codcon']);
		$arrDataDetalle[] = array('razsoc'=>$dataReporte->fields['razsoc'],'codcon'=>$contrato,'canhor'=>$dataReporte->fields['canhor']);
		
		$dataReporte->MoveNext();
	}
	unset($dataReporte);
	
	//CONSTRUYENDO REPORTE
	$reporte->encabezadoFechaReporte('REPORTE TOTAL HORAS');
	$reporte->cabeceraTotalHora($arrCabecera);
	$reporte->detalleTotalHora($arrDataDetalle,$total);
	$reporte->imprimirReporte();
}