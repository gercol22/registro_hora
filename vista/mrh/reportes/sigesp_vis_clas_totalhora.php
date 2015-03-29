<?php
$dirbaselibcon = "";
$dirbaselibcon = dirname(__FILE__);
$dirbaselibcon = str_replace("\\","/",$dirbaselibcon);
$dirbaselibcon = str_replace("/vista/mrh/reportes","",$dirbaselibcon);
require_once($dirbaselibcon."/base/librerias/php/gerco/gerco_lib_reporteezpdf.php");

/**
 * @desc clase para construir el reporte total horas
 * @author Ing. Gerardo Cordero
 *
 */
class reporteTotalHora extends reporteEzpdf {

	public function __construct($top, $bottom, $left, $right, $orientacion = 'landscape') {
		parent::__construct ($top, $bottom, $left, $right, $orientacion);
	}
	
	public function cabeceraTotalHora($arrCampos) {
		$la_columna=array('etiqueta'=>'','valor'=>'');
		$la_config=array('showHeadings'=>0, // Mostrar encabezados
						 'fontSize' => 8, // Tamaño de Letras
						 'showLines'=>1, // Mostrar Líneas
						 'shaded'=>2, // Sombra entre líneas
						 'shadeCol' =>array(0.9,0.9,0.9),
						 'shadeCol2' =>array(0.9,0.9,0.9),
						 'width'=>385, // Ancho de la tabla
						 'maxWidth'=>385, // Ancho Máximo de la tabla
						 'xOrientation'=>'center', // Orientación de la tabla
						 'cols'=>array('etiqueta'=>array('justification'=>'left','width'=>105), 
							  		   'valor'=>array('justification'=>'left','width'=>280)));
		$this->obtenerObjPdf()->ezTable($arrCampos,$la_columna,'',$la_config);
	}
	
	public function detalleTotalHora($arrCampos, $total) {
		$this->obtenerObjPdf()->ezSetDy(-20);
		$la_columna=array('razsoc'=>'<b>Cliente</b>','codcon'=>'<b>Contrato</b>','canhor'=>'<b>Cant. Horas</b>');
		$la_config=array('showHeadings'=>1, // Mostrar encabezados
						 'titleFontSize' => 11, //Tamaño de Letras Encabezado
						 'fontSize' => 8, // Tamaño de Letras
						 'showLines'=>1, // Mostrar Líneas
						 'shaded'=>1, // Sombra entre líneas
						 'width'=>500, // Ancho de la tabla
						 'maxWidth'=>500, // Ancho Máximo de la tabla
						 'xOrientation'=>'center', // Orientación de la tabla
						 'cols'=>array('razsoc'=>array('justification'=>'center','width'=>250),
							  		   'codcon'=>array('justification'=>'center','width'=>150),
							  		   'canhor'=>array('justification'=>'center','width'=>100)));
		$this->obtenerObjPdf()->ezTable($arrCampos,$la_columna,'',$la_config);
		$dataTotal[] = array('etiqueta'=>'<b>TOTAL</b>','valor'=>'<b>'.number_format($total, 1, ',', '.').'</b>');
		$la_columna=array('etiqueta'=>'','valor'=>'');
		$la_config=array('showHeadings'=>0, // Mostrar encabezados
						 'fontSize' => 10, // Tamaño de Letras
						 'showLines'=>1, // Mostrar Líneas
						 'shaded'=>2, // Sombra entre líneas
						 'shadeCol' =>array(0.9,0.9,0.9),
						 'shadeCol2' =>array(0.9,0.9,0.9),
						 'width'=>500, // Ancho de la tabla
						 'maxWidth'=>500, // Ancho Máximo de la tabla
						 'xOrientation'=>'center', // Orientación de la tabla
						 'cols'=>array('etiqueta'=>array('justification'=>'right','width'=>400),
									   'valor'=>array('justification'=>'center','width'=>100)));
		$this->obtenerObjPdf()->ezTable($dataTotal,$la_columna,'',$la_config);
	}
}
?>
