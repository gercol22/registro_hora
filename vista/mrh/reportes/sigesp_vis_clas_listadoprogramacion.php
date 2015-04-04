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
class reporteListadoProgramacion extends reporteEzpdf {

	public function __construct($top, $bottom, $left, $right, $orientacion = 'landscape') {
		parent::__construct ($top, $bottom, $left, $right, $orientacion);
	}
	
	public function detalleListadoProgramacion($arrCampos) {
		$this->obtenerObjPdf()->ezSetDy(-20);
		$la_columna=array('fecpro'=>'<b>Fecha</b>','razsoc'=>'<b>Cliente</b>','nomcon'=>'<b>Consultor</b>','desact'=>'<b>Descripción</b>');
		$la_config=array('showHeadings'=>1, // Mostrar encabezados
						 'titleFontSize' => 11, //Tamaño de Letras Encabezado
						 'fontSize' => 8, // Tamaño de Letras
						 'showLines'=>1, // Mostrar Líneas
						 'shaded'=>1, // Sombra entre líneas
						 'xOrientation'=>'center', // Orientación de la tabla
						 'cols'=>array('fecpro'=>array('justification'=>'center','width'=>55),
						 			   'razsoc'=>array('justification'=>'center','width'=>220),
							  		   'nomcon'=>array('justification'=>'center','width'=>150),
						 			   'desact'=>array('justification'=>'center','width'=>250)));
		$this->obtenerObjPdf()->ezTable($arrCampos,$la_columna,'',$la_config);
		
	}
}
?>
