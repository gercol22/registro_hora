<?php
require_once("../../../modelo/mrh/sigesp_srv_mrh_listadoactividad.php");
require_once ('../../../base/conf/data_estatica.php');
require_once("sigesp_vis_clas_listadoactividad.php");


$objetoData = str_replace('\\','',$_GET['ObjSon']);
$json = new Services_JSON;
$objetoData = $json->decode($objetoData);

//RECIBIENDO PARAMETRO BUSCANDO DATA
$servicioListadoActividad = new ServicioListadoActividad();
$dataReporte = $servicioListadoActividad->listadoActividad($objetoData);
$arrCabecera  = array();
if (!$dataReporte->EOF) {
	$reporte = new reporteListadoActividad(4, 3, 2, 2);
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
		$arrCabecera[] = array('etiqueta'=>'<b>Módulo</b>','valor'=>$denMod);
	}
	
	if ($objetoData->tipinc != '') {
		$denTipInc = $reporte->obtenerDenominacion($arrTipInc, $objetoData->tipinc);
		$arrCabecera[] = array('etiqueta'=>'<b>Tipo Situación</b>','valor'=>$denTipInc);
	}
	
	$total = 0;
	$arrDataDetalle = array();
	while (!$dataReporte->EOF) {
		$total += $dataReporte->fields['canhor'];
		$contrato = $reporte->obtenerDenCon($arrTipCon, $dataReporte->fields['tipcon'], $dataReporte->fields['numcon']);
		$arrDataDetalle[] = array('razsoc'=>$dataReporte->fields['razsoc'],'nomcon'=>$dataReporte->fields['nomcon'],'codcon'=>$contrato,
				   				  'fecact'=>$reporte->formatoFecha($dataReporte->fields['fecact']),
				     			  'casman'=>$dataReporte->fields['casman'],'desact'=>wordwrap($dataReporte->fields['desact'],60),
								  'canhor'=>$dataReporte->fields['canhor']);
		
		$dataReporte->MoveNext();
	}
	unset($dataReporte);
	
	//CONSTRUYENDO REPORTE
	$reporte->encabezadoFechaReporte('LISTADO DE ACTIVIDADES EJECUTADAS', 'landscape');
	$reporte->cabeceraEstandar($arrCabecera);
	$reporte->detalleListadoActividad($arrDataDetalle,$total);
	$reporte->imprimirReporte();
}
else {
	echo '<script language=JavaScript>';
	echo "alert('No hay nada que Reportar');";
	echo 'close();';
	echo '</script>';
}