<?php
$dirbaselibcon = "";
$dirbaselibcon = dirname(__FILE__);
$dirbaselibcon = str_replace("\\","/",$dirbaselibcon);
$dirbaselibcon = str_replace("/vista/mrh/reportes","",$dirbaselibcon);
require_once($dirbaselibcon."/base/librerias/php/gerco/gerco_lib_reporteezpdf.php");

/**
 * @desc clase para construir el reporte listado actividad
 * @author Ing. Gerardo Cordero
 *
 */
class reporteListadoContrato extends reporteEzpdf {

	public function __construct($top, $bottom, $left, $right, $orientacion = 'landscape') {
		parent::__construct ($top, $bottom, $left, $right, $orientacion);
	}
	
	public function detalleListadoContrato($arrCampos, $montot, $totcon, $toteje) {
		$this->obtenerObjPdf()->ezSetDy(-20);
		$la_columna=array('razsoc'=>'<b>Cliente</b>','codcon'=>'<b>Contrato</b>','feccon'=>'<b>Fecha</b>','estcon'=>'<b>Estado</b>',
						  'moncon'=>'<b>Monto</b>','canhor'=>'<b>Horas Contratadas </b>','canhoreje'=>'<b>Horas Ejecutadas</b>');
		$la_config=array('showHeadings'=>1, // Mostrar encabezados
						 'titleFontSize' => 11, //Tamaño de Letras Encabezador
						 'fontSize' => 8, // Tamaño de Letras
						 'showLines'=>1, // Mostrar Líneas
						 'shaded'=>1, // Sombra entre líneas
						 'xOrientation'=>'center', // Orientación de la tabla
						 'cols'=>array('razsoc'=>array('justification'=>'center','width'=>290),
							  		   'codcon'=>array('justification'=>'center','width'=>110),
						 			   'feccon'=>array('justification'=>'center','width'=>60),
						 			   'estcon'=>array('justification'=>'center','width'=>50),
						 			   'moncon'=>array('justification'=>'center','width'=>80),
						 		       'canhor'=>array('justification'=>'center','width'=>70),
						 			   'canhoreje'=>array('justification'=>'center','width'=>70)));
		$this->obtenerObjPdf()->ezTable($arrCampos,$la_columna,'',$la_config);
		$dataTotal[] = array('etiqueta'=>'<b>TOTALES</b>','montot'=>'<b>'.number_format($montot, 2, ',', '.').'</b>', 
							 'totcon'=>'<b>'.number_format($totcon, 1, ',', '.').'</b>','toteje'=>'<b>'.number_format($toteje, 1, ',', '.').'</b>');
		$la_columna=array('etiqueta'=>'','montot'=>'','totcon'=>'','toteje'=>'');
		$la_config=array('showHeadings'=>0, // Mostrar encabezados
						 'fontSize' => 10, // Tamaño de Letras
						 'showLines'=>1, // Mostrar Líneas
						 'shaded'=>2, // Sombra entre líneas
						 'shadeCol' =>array(0.9,0.9,0.9),
						 'shadeCol2' =>array(0.9,0.9,0.9),
						 'xOrientation'=>'center', // Orientación de la tabla
						 'cols'=>array('etiqueta'=>array('justification'=>'right','width'=>510),
									   'montot'=>array('justification'=>'center','width'=>80),
						 			   'totcon'=>array('justification'=>'center','width'=>70),
						 			   'toteje'=>array('justification'=>'center','width'=>70)));
		$this->obtenerObjPdf()->ezTable($dataTotal,$la_columna,'',$la_config);
	}
}
?>
