<?php
require_once("../../../modelo/mrh/sigesp_srv_mrh_registroactividad.php");
require_once("../../../base/librerias/php/gerco/gerco_lib_reportetcpdf.php");


//RECIBIENDO PARAMETRO BUSCANDO DATA
$servicioRegistroActividad = new ServicioRegistroActividad();
$dataCabecera = $servicioRegistroActividad->reporteActividad($_GET['numact']);
$arrCabecera  = array();
if (!$dataCabecera->EOF) {
	$arrCabecera[0] = array('anchoet'=>150,'etiqueta'=>'<b>Cliente</b>','anchoval'=>450,'valor'=>$dataCabecera->fields['razsoc']);
	$arrCabecera[1] = array('anchoet'=>150,'etiqueta'=>'<b>Consultor/Desarrollador</b>','anchoval'=>450,'valor'=>$dataCabecera->fields['nomcon']);
	$arrCabecera[2] = array('anchoet'=>150,'etiqueta'=>'<b>Fecha</b>','anchoval'=>450,'valor'=>convertirFecha($dataCabecera->fields['fecact']));
	unset($dataCabecera);
	
	//DATA DETALLE 
	$dataDetalle = $servicioRegistroActividad->reporteActividadTarea($_GET['numact']);
	$total = $servicioRegistroActividad->reporteTotalHora($_GET['numact']);
	
	$objTcpdf = new reporteTcpdf(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
	// set document information
	$objTcpdf->SetCreator(PDF_CREATOR);
	$objTcpdf->SetAuthor('Gerardo Cordero');
	$objTcpdf->SetTitle('INFORME ACTIVIDAD');
	
	
	// set default header data
	$objTcpdf->SetHeaderData('', PDF_HEADER_LOGO_WIDTH, '', str_repeat(' ',50).'INFORME DIARIO');
	
	// set header and footer fonts
	$objTcpdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
	$objTcpdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));
	
	// set default monospaced font
	$objTcpdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
	
	// set margins
	$objTcpdf->SetMargins(PDF_MARGIN_LEFT, 35, PDF_MARGIN_RIGHT);
	$objTcpdf->SetHeaderMargin(PDF_MARGIN_HEADER);
	$objTcpdf->SetFooterMargin(85);
	
	// set auto page breaks
	$objTcpdf->SetAutoPageBreak(TRUE, 85);
	
	// set image scale factor
	$objTcpdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
	
	// set some language-dependent strings (optional)
	if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
		require_once(dirname(__FILE__).'/lang/eng.php');
		$objTcpdf->setLanguageArray($l);
	}
	
	// ---------------------------------------------------------
	
	// set font
	$objTcpdf->SetFont('helvetica', '', 9);
	
	// add a page
	$objTcpdf->AddPage();
	
	$arrConfig [0] = array('titulo'=>'<b>Modulo</b>','datind'=>'codmod','ancho'=>45,'alicol'=>'center','formato'=>'t');
	$arrConfig [1] = array('titulo'=>'<b>Situacion Planteada/Asignacion Recibida</b>','datind'=>'desinc','ancho'=>130,'alicol'=>'left','formato'=>'t');
	$arrConfig [2] = array('titulo'=>'<b>Servicio</b>','datind'=>'tipinc','ancho'=>110,'alicol'=>'left','formato'=>'t');
	$arrConfig [3] = array('titulo'=>'<b>Solucion/Recomendacion/Observaciones</b>','datind'=>'desact','ancho'=>295,'alicol'=>'justify','formato'=>'t');
	$arrConfig [4] = array('titulo'=>'<b>Horas</b>','datind'=>'canhor','ancho'=>50,'alicol'=>'center','formato'=>'t');
	
	$strHtmlCabecera = $objTcpdf->cabeceraGenerica($arrCabecera);
	$objTcpdf->writeHTML($strHtmlCabecera, true, false, false, false, '');
		
	$strHtmlDetalle = $objTcpdf->impTablaHtml($arrConfig, $dataDetalle, $total);
	$objTcpdf->writeHTML($strHtmlDetalle, true, false, false, false, '');
		
	$objTcpdf->Output('informe_diario.pdf', 'I');
	unset($dataDetalle);
	unset($servicioRegistroActividad);
}
