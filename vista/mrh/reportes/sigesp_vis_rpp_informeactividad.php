<?php
require_once("../../../modelo/mrh/sigesp_srv_mrh_registroactividad.php");
require_once("sigesp_vis_clas_informeactividad.php");

//RECIBIENDO PARAMETRO BUSCANDO DATA
$servicioRegistroActividad = new ServicioRegistroActividad();
$dataCabecera = $servicioRegistroActividad->reporteActividad($_GET['numact']);
$arrCabecera  = array();
if (!$dataCabecera->EOF) {
	$arrCabecera[] = array('etiqueta'=>'<b>Cliente</b>','valor'=>$dataCabecera->fields['razsoc']);
	$arrCabecera[] = array('etiqueta'=>'<b>Consultor/Desarrollador</b>','valor'=>$dataCabecera->fields['nomcon']);
	$fecha = $dataCabecera->fields['fecact'];
	unset($dataCabecera);
	
	//DATA DETALLE 
	$dataDetalle = $servicioRegistroActividad->reporteActividadTarea($_GET['numact']);
	$arrDataDetalle = $dataDetalle->GetArray();
	$total = $servicioRegistroActividad->reporteTotalHora($_GET['numact']);
	unset($dataDetalle);
	unset($servicioRegistroActividad);
	
	//CONSTRUYENDO REPORTE
	$reporte = new reporteInformeActividad(4.5, 3, 2, 2);
	$reporte->encabezadoPieReporte('INFORME DIARIO');
	$reporte->cabeceraActividad($arrCabecera,$fecha);
	$reporte->detalleActividad($arrDataDetalle,$total);
	$reporte->imprimirReporte();
}
