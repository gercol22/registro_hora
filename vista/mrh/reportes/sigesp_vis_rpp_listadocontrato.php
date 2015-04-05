<?php
require_once("../../../modelo/mrh/sigesp_srv_mrh_listadocontrato.php");
require_once ('../../../base/conf/data_estatica.php');
require_once("sigesp_vis_clas_listadocontrato.php");


$objetoData = str_replace('\\','',$_GET['ObjSon']);
$json = new Services_JSON;
$objetoData = $json->decode($objetoData);

//RECIBIENDO PARAMETRO BUSCANDO DATA
$servicioListadoContrato = new ServicioListadoContrato();
$dataReporte = $servicioListadoContrato->listadoContrato($objetoData);
$arrCabecera  = array();
if (!$dataReporte->EOF) {
	$reporte = new reporteListadoContrato(4, 3, 2, 2);
	if ($objetoData->rifcli != '') {
		$arrCabecera[] = array('etiqueta'=>'<b>Cliente</b>','valor'=>$dataReporte->fields['razsoc']);
	}
	else {
		$arrCabecera[] = array('etiqueta'=>'<b>Cliente</b>','valor'=>'TODOS LOS CLIENTES');
	}
	
	if ($objetoData->tipcon != '') {
		$denCon = $reporte->obtenerDenominacion($arrTipCon, $objetoData->tipcon);
		$arrCabecera[] = array('etiqueta'=>'<b>Tipo Contrato</b>','valor'=>$denCon);
	}
	
	if ($objetoData->estcon != '') {
		$denEst = $reporte->obtenerDenominacion($arrEstCon, $objetoData->estcon);
		$arrCabecera[] = array('etiqueta'=>'<b>Estado</b>','valor'=>$denEst);
	}
	
	if ($objetoData->fecdes != '' && $objetoData->fechas != '') {
		$fechaDesde = $reporte->formatoFecha($objetoData->fecdes);
		$fechaHasta = $reporte->formatoFecha($objetoData->fechas);
		$arrCabecera[] = array('etiqueta'=>'<b>Rango de Fecha</b>','valor'=>'desde '.$fechaDesde.' al '.$fechaHasta);
	}
	
	if ($objetoData->hordes != '' && $objetoData->horhas != '') {
		$arrCabecera[] = array('etiqueta'=>'<b>Cant. de Horas Ejecutadas</b>','valor'=>'mayor a '.$objetoData->hordes.' y menor a '.$objetoData->horhas);
	}
	
	$totcon = 0;
	$toteje = 0;
	$arrDataDetalle = array();
	while (!$dataReporte->EOF) {
		$totcon += $dataReporte->fields['canhor'];
		$toteje += $dataReporte->fields['canhoreje'];
		$denEst = $reporte->obtenerDenominacion($arrEstCon, $dataReporte->fields['estcon']);
		$contrato = $reporte->obtenerDenCon($arrTipCon, $dataReporte->fields['tipcon'], $dataReporte->fields['codcon']);
		$arrDataDetalle[] = array('razsoc'=>$dataReporte->fields['razsoc'],'codcon'=>$contrato,'feccon'=>$reporte->formatoFecha($dataReporte->fields['feccon']),
				     			  'canhor'=>$dataReporte->fields['canhor'],'canhoreje'=>$dataReporte->fields['canhoreje'],'estcon'=>$denEst);
		
		$dataReporte->MoveNext();
	}
	unset($dataReporte);
	
	//CONSTRUYENDO REPORTE
	$reporte->encabezadoFechaReporte('LISTADO DE CONTRATOS', 'landscape');
	$reporte->cabeceraEstandar($arrCabecera);
	$reporte->detalleListadoContrato($arrDataDetalle, $totcon, $toteje);
	$reporte->imprimirReporte();
}