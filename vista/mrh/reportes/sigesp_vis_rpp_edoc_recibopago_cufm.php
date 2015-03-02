<?php
session_start();   
header("Pragma: public");
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
header("Cache-Control: private",false);

//TODO validacion de seguridad

	
//--------------------------------------------------------------------------------------------------------------------------------
	function uf_print_encabezado_pagina($as_titulo,$as_desnom,$as_periodo,&$io_pdf)
	{
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//       Function: uf_print_encabezado_pagina1
		//		   Access: private 
		//	    Arguments: as_titulo // Título del Reporte
		//	    		   as_desnom // Descripción de la nómina
		//	    		   as_periodo // Descripción del período
		//	    		   io_pdf // Instancia de objeto pdf
		//    Description: función que imprime los encabezados por página
		//	   Creado Por: Ing. Yesenia Moreno
		// Fecha Creación: 05/05/2006 
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		$io_encabezado=$io_pdf->openObject();
		$io_pdf->saveState();
		$io_pdf->addJpegFromFile('../../../base/imagenes/logo.jpg',50,720,95,70); // Agregar Logo
		$li_tm=$io_pdf->getTextWidth(11,$as_titulo);
		$tm=306-($li_tm/2);
		$io_pdf->addText($tm,730,11,$as_titulo); // Agregar el título
		$li_tm=$io_pdf->getTextWidth(9,$as_periodo);
		$tm=306-($li_tm/2);
		$io_pdf->addText($tm,720,9,$as_periodo); // Agregar el título
		$li_tm=$io_pdf->getTextWidth(9,$as_desnom);
		$tm=306-($li_tm/2);
		$io_pdf->addText($tm,705,9,$as_desnom); // Agregar el título
		$io_pdf->restoreState();
		$io_pdf->closeObject();
		$io_pdf->addObject($io_encabezado,'all');
		$io_pdf->stopObject($io_encabezado); // Detener el objeto pie de página
	}// end function uf_print_encabezado_pagina1
	//--------------------------------------------------------------------------------------------------------------------------------

	
	
	//--------------------------------------------------------------------------------------------------------------------------------
	function uf_print_cabecera($as_cedper,$as_nomper,$as_descar,&$io_cabecera,&$io_pdf)
	{
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//       Function: uf_print_cabecera1
		//		   Access: private 
		//	    Arguments: as_cedper // Cédula del personal
		//	    		   as_nomper // Nombre del personal
		//	    		   as_descar // Decripción del cargo
		//	    		   io_cabecera // objeto cabecera
		//	    		   io_pdf // Objeto PDF
		//    Description: función que imprime la cabecera por personal
		//	   Creado Por: Ing. Yesenia Moreno
		// Fecha Creación: 05/05/2006 
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		$io_pdf->saveState();
		$io_pdf->addText(40,695,'10','______________________________________________________________________________________________');
		$io_pdf->ezSetDy(-11);
		$la_data=array(array('nombre'=>'Apellidos y Nombres:', 'cedula'=>'Cédula:', 'cargo'=>'Cargo:'));
		$la_columna=array('nombre'=>'','cedula'=>'','cargo'=>'');
		$la_config=array('showHeadings'=>0, // Mostrar encabezados
						 'xPos'=>315,
						 'fontSize' => 8, // Tamaño de Letras
						 'showLines'=>0, // Mostrar Líneas
						 'shaded'=>0, // Sombra entre líneas
						 'width'=>550, // Ancho de la tabla
						 'maxWidth'=>550, // Ancho Máximo de la tabla
						 'xOrientation'=>'center', // Orientación de la tabla
						 'cols'=>array('nombre'=>array('justification'=>'left','width'=>200), // Justificación y ancho de la columna
						 			   'cedula'=>array('justification'=>'center','width'=>70), // Justificación y ancho de la columna
						 			   'cargo'=>array('justification'=>'left','width'=>280))); // Justificación y ancho de la columna
		$io_pdf->ezTable($la_data,$la_columna,'',$la_config);	
		$io_pdf->addText(40,684,'10','______________________________________________________________________________________________');
		$la_data=array(array('nombre'=>$as_nomper, 'cedula'=>$as_cedper, 'cargo'=>substr($as_descar,0,100)));
		$la_columna=array('nombre'=>'','cedula'=>'','cargo'=>'');
		$la_config=array('showHeadings'=>0, // Mostrar encabezados
						 'xPos'=>315,
						 'fontSize' => 7, // Tamaño de Letras
						 'showLines'=>0, // Mostrar Líneas
						 'shaded'=>0, // Sombra entre líneas
						 'width'=>550, // Ancho de la tabla
						 'maxWidth'=>550, // Ancho Máximo de la tabla
						 'xOrientation'=>'center', // Orientación de la tabla
						 'rowGap'=>0.5,
						 'cols'=>array('nombre'=>array('justification'=>'left','width'=>200), // Justificación y ancho de la columna
						 			   'cedula'=>array('justification'=>'center','width'=>70), // Justificación y ancho de la columna
						 			   'cargo'=>array('justification'=>'left','width'=>280))); // Justificación y ancho de la columna
		$io_pdf->ezTable($la_data,$la_columna,'',$la_config);	
		$io_pdf->addText(40,646,'10','______________________________________________________________________________________________');
		$io_pdf->ezSetY(648);
		$la_data=array(array('denomasig'=>'<b>DENOMINACIÓN</b>', 'valorasig'=>'<b>ASIGNACIÓN</b>', 'denomdedu'=>'<b>DENOMINACIÓN</b>','valordedu'=>'<b>DEDUCCIÓN</b>'));
		$la_columna=array('denomasig'=>'<b>DENOMINACIÓN</b>',
						  'valorasig'=>'<b>ASIGNACIÓN</b>',
						  'denomdedu'=>'<b>DENOMINACIÓN</b>',
						  'valordedu'=>'<b>DEDUCCIÓN</b>');
		$la_config=array('showHeadings'=>0, // Mostrar encabezados
						 'fontSize' => 8, // Tamaño de Letras
						 'titleFontSize' => 7,  // Tamaño de Letras de los títulos
						 'showLines'=>0, // Mostrar Líneas
						 'shaded'=>0, // Sombra entre líneas
						 'width'=>500, // Ancho de la tabla
						 'maxWidth'=>500, // Ancho Máximo de la tabla
						 'xOrientation'=>'center', // Orientación de la tabla
						 'cols'=>array('denomasig'=>array('justification'=>'center','width'=>150), // Justificación y ancho de la columna
						 			   'valorasig'=>array('justification'=>'right','width'=>100), // Justificación y ancho de la columna
						 			   'denomdedu'=>array('justification'=>'center','width'=>150), // Justificación y ancho de la columna
						 			   'valordedu'=>array('justification'=>'right','width'=>100))); // Justificación y ancho de la columna
		$io_pdf->ezTable($la_data,$la_columna,'',$la_config);
		$io_pdf->addText(40,636,'10','______________________________________________________________________________________________');
		$io_pdf->restoreState();
		$io_pdf->closeObject();
		$io_pdf->addObject($io_cabecera,'all');
	}// end function uf_print_cabecera
	//--------------------------------------------------------------------------------------------------------------------------------

	//--------------------------------------------------------------------------------------------------------------------------------
	function uf_print_detalle($la_data,&$io_pdf)
	{
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//       Function: uf_print_detalle
		//		   Access: private 
		//	    Arguments: la_data // arreglo de información
		//	   			   io_pdf // Objeto PDF
		//    Description: función que imprime el detalle por personal
		//	   Creado Por: Ing. Yesenia Moreno
		// Fecha Creación: 05/05/2006 
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		$io_pdf->ezSetDy(-10);
		$la_columna=array('denomasig'=>'',
						  'valorasig'=>'',
						  'denomdedu'=>'',
						  'valordedu'=>'');
		$la_config=array('showHeadings'=>0, // Mostrar encabezados
						 'fontSize' => 7, // Tamaño de Letras
						 'titleFontSize' => 7,  // Tamaño de Letras de los títulos
						 'showLines'=>0, // Mostrar Líneas
						 'shaded'=>0, // Sombra entre líneas
						 'width'=>500, // Ancho de la tabla
						 'maxWidth'=>500, // Ancho Máximo de la tabla
						 'xOrientation'=>'center', // Orientación de la tabla
						 'cols'=>array('denomasig'=>array('justification'=>'left','width'=>150), // Justificación y ancho de la columna
						 			   'valorasig'=>array('justification'=>'right','width'=>100), // Justificación y ancho de la columna
						 			   'denomdedu'=>array('justification'=>'left','width'=>150), // Justificación y ancho de la columna
						 			   'valordedu'=>array('justification'=>'right','width'=>100))); // Justificación y ancho de la columna
		$io_pdf->ezTable($la_data,$la_columna,'',$la_config);
	}// end function uf_print_detalle
	//--------------------------------------------------------------------------------------------------------------------------------

	//--------------------------------------------------------------------------------------------------------------------------------
	function uf_print_pie_cabecera($ai_toting,$ai_totded,$ai_totnet,$as_codcueban,&$io_pdf)
	{
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//       Function: uf_print_pie_cabecera1
		//		   Access: private 
		//	    Arguments: ai_toting // Total Ingresos
		//	   			   ai_totded // Total Deducciones
		//	   			   ai_totnet // Total Neto
		//	   			   as_codcueban // Codigo cuenta bancaria
		//	    		   io_pdf // Instancia de objeto pdf
		//    Description: función que imprime el fin de la cabecera por personal
		//	   Creado Por: Ing. Yesenia Moreno
		// Fecha Creación: 05/05/2006 
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
				
		$io_piepagina=$io_pdf->openObject(); // Creamos el objeto pie de página
		$io_pdf->saveState();
		$io_pdf->addText(200,145,'10','------------------------------------------------------------------------------------------------------------');
		$io_pdf->ezSety(150);
		$la_data=array(array('denomasig'=>'<b>Total Ingresos '.$ls_bolivares.'</b>', 'valorasig'=>$ai_toting, 'denomdedu'=>'<b>Total Deducciones '.$ls_bolivares.'</b>','valordedu'=>$ai_totded));
		$la_columna=array('denomasig'=>'<b>DENOMINACIÓN</b>',
						  'valorasig'=>'<b>ASIGNACIÓN</b>',
						  'denomdedu'=>'<b>DENOMINACIÓN</b>',
						  'valordedu'=>'<b>DEDUCCIÓN</b>');
		$la_config=array('showHeadings'=>0, // Mostrar encabezados
						 'fontSize' => 9, // Tamaño de Letras
						 'titleFontSize' => 7,  // Tamaño de Letras de los títulos
						 'showLines'=>0, // Mostrar Líneas
						 'shaded'=>0, // Sombra entre líneas
						 'width'=>500, // Ancho de la tabla
						 'maxWidth'=>500, // Ancho Máximo de la tabla
						 'xOrientation'=>'center', // Orientación de la tabla
						 'cols'=>array('denomasig'=>array('justification'=>'center','width'=>150), // Justificación y ancho de la columna
						 			   'valorasig'=>array('justification'=>'right','width'=>100), // Justificación y ancho de la columna
						 			   'denomdedu'=>array('justification'=>'center','width'=>150), // Justificación y ancho de la columna
						 			   'valordedu'=>array('justification'=>'right','width'=>100))); // Justificación y ancho de la columna
		$io_pdf->ezTable($la_data,$la_columna,'',$la_config);
		$io_pdf->addText(40,132,'10','------------------------------------------------------------------------------------------------------------------------------------------------------------');
		$la_data=array(array('cuenta'=>'', 'neto'=>'<b>Neto Cobrado '.$ls_bolivares.':</b>  '.$ai_totnet));
		$la_columna=array('cuenta'=>'',
						  'neto'=>'');
		$la_config=array('showHeadings'=>0, // Mostrar encabezados
						 'fontSize' => 9, // Tamaño de Letras
						 'titleFontSize' => 7,  // Tamaño de Letras de los títulos
						 'showLines'=>0, // Mostrar Líneas
						 'shaded'=>0, // Sombra entre líneas
						 'width'=>500, // Ancho de la tabla
						 'maxWidth'=>500, // Ancho Máximo de la tabla
						 'xOrientation'=>'center', // Orientación de la tabla
						 'cols'=>array('cuenta'=>array('justification'=>'left','width'=>250), // Justificación y ancho de la columna
						 			   'neto'=>array('justification'=>'right','width'=>250))); // Justificación y ancho de la columna
		$io_pdf->ezTable($la_data,$la_columna,'',$la_config);
		$io_pdf->addText(40,118,'10','------------------------------------------------------------------------------------------------------------------------------------------------------------');
		$io_pdf->restoreState();
		$io_pdf->closeObject();
		$io_pdf->addObject($io_piepagina,'all');
		$io_pdf->stopObject($io_piepagina); // Detener el objeto pie de página
	}// end function uf_print_pie_cabecera
	//--------------------------------------------------------------------------------------------------------------------------------

	
//--------------------------------------------------  Parámetros para Filtar el Reporte  -----------------------------------------
$codnom  = $_GET["codnom"];
$codperi = $_GET["codperi"];
$fecdes  = $_GET["fecdes"];
$fechas  = $_GET["fechas"];

//--------------------------------------------------------------------------------------------------------------------------------	
	
//----------------------------------------------------  Parámetros del encabezado  -----------------------------------------------
$ls_titulo="<b>COMPROBANTE DE PAGO</b>";
$ls_periodo="Periodo: <b>".$codperi."</b> del <b>".$fecdes."</b> al <b>".$fechas."</b>";
//--------------------------------------------------------------------------------------------------------------------------------

	
//BUSCAR DATA CABECERA
require_once("../../../modelo/documentos/sigesp_srv_edoc_recibopago.php");
$servicioReciboPago = new ServicioReciboPago();

$dataCabecera = $servicioReciboPago->buscarDataCabecera($_SESSION['codper'], $codnom, $codperi);
if($dataCabecera->EOF) {
	print("<script language=JavaScript>");
	print(" alert('No hay nada que Reportar');"); 
	print(" close();");
	print("</script>");
}
else {
	require_once("../../../base/librerias/php/ezpdf/class.ezpdf.php");//libreria ezpdf
	$io_pdf=new Cezpdf('LETTER','portrait'); // Instancia de la clase PDF
	$io_pdf->selectFont('../../../base/librerias/php/ezpdf/fonts/Helvetica.afm'); // Seleccionamos el tipo de letra
	$io_pdf->ezSetCmMargins(3,1,1,2); // Configuración de los margenes en centímetros
	
	uf_print_encabezado_pagina($ls_titulo,$_GET["desnom"],$ls_periodo,$io_pdf);
	$cedper = $dataCabecera->fields["cedper"];
	$nomper = $dataCabecera->fields["apeper"].", ".$dataCabecera->fields["nomper"];
	$descar = $dataCabecera->fields["descar"];
	$cueban = $dataCabecera->fields["codcueban"];
	
	//IMPRIMIENDO CABECERA
	uf_print_cabecera($cedper,$nomper,$descar,$io_cabecera,$io_pdf);
	unset($dataCabecera);
	$totalIng = 0;
	$totalDed = 0;
	$i=0;
	// Obtenemos el detalle del reporte
	$dataDetalle = $servicioReciboPago->buscarDataDetalle($_SESSION['codper'], $codnom, $codperi);
	while(!$dataDetalle->EOF) {
		$nomcon = $dataDetalle->fields["nomcon"];
		$valsal = abs($dataDetalle->fields["valsal"]);
		$tipsal = trim($dataDetalle->fields["tipsal"]);
		if(($tipsal=="A") || ($tipsal=="V1") || ($tipsal=="V2") || ($tipsal=="R")) {
			if ($tipsal!="R"){								
				$totalIng = $totalIng + $valsal;
			}							
			$valsal= number_format($valsal, 2, ',', '.');
			$la_data[$i]=array('denomasig'=>$nomcon,'valorasig'=>$valsal.'  ','denomdedu'=>'','valordedu'=>'');
		}
		else {
			$totalDed = $totalDed + $valsal;
			$valsal= number_format($valsal, 2, ',', '.');
			$la_data[$i]=array('denomasig'=>'','valorasig'=>'','denomdedu'=>$nomcon,'valordedu'=>$valsal.'  ');
		}
		
		$i++;
		$dataDetalle->MoveNext();
	}
	unset($dataDetalle);
	//IMPRIMIENDO DETALLE
	//var_dump($la_data);
	uf_print_detalle($la_data,$io_pdf);  
	
	//IMPRIMIENDO PIE DE PAGINA
	$li_totnet=$totalIng -$totalDed;
	$li_toting=number_format($totalIng, 2, ',', '.');;
	$li_totded=number_format($totalDed, 2, ',', '.');;
	$li_totnet=number_format($li_totnet, 2, ',', '.');;
	uf_print_pie_cabecera($li_toting,$li_totded,$li_totnet,$cueban,$io_pdf); 
	
	
		
	$io_pdf->ezStopPageNumbers(1,1); // Detenemos la impresión de los números de página
	$io_pdf->ezStream(); // Mostramos el reporte
	unset($io_pdf);
}

?> 