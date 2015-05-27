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
class reporteListadoActividad extends reporteEzpdf {

	public function __construct($top, $bottom, $left, $right, $orientacion = 'landscape') {
		parent::__construct ($top, $bottom, $left, $right, $orientacion);
	}
	
	public function detalleListadoActividad($arrCampos, $total) {
		$this->obtenerObjPdf()->ezSetDy(-20);
		$la_columna=array('razsoc'=>'<b>Cliente</b>','nomcon'=>'<b>Consultor</b>','codcon'=>'<b>Contrato</b>','fecact'=>'<b>Fecha</b>',
				  		  'casman'=>'<b># Caso </b>','desact'=>'<b>Descripcion</b>','canhor'=>'<b>Horas</b>');
		$la_config=array('showHeadings'=>1, // Mostrar encabezados
						 'titleFontSize' => 11, //Tamaño de Letras Encabezado
						 'fontSize' => 8, // Tamaño de Letras
						 'gridlines'=> EZ_GRIDLINE_DEFAULT,
						 'shaded'=>1, // Sombra entre líneas
						 'xOrientation'=>'center', // Orientación de la tabla
						 'alignHeadings' => 'center',
						 'colGap' => 5 ,
						 'cols'=>array('razsoc'=>array('justification'=>'center','width'=>180),
						 			   'nomcon'=>array('justification'=>'center','width'=>100),
						 			   'codcon'=>array('justification'=>'center','width'=>110),
						 		       'fecact'=>array('justification'=>'center','width'=>55),
						 		       'casman'=>array('justification'=>'center','width'=>50),
						 			   'desact'=>array('justification'=>'left','width'=>230),
							  		   'canhor'=>array('justification'=>'center','width'=>45)));
		$this->obtenerObjPdf()->ezTable($arrCampos,$la_columna,'',$la_config);
		$dataTotal[] = array('etiqueta'=>'<b>TOTAL HORAS</b>','valor'=>'<b>'.number_format($total, 1, ',', '.').'</b>');
		$la_columna=array('etiqueta'=>'','valor'=>'');
		$la_config=array('showHeadings'=>0, // Mostrar encabezados
						 'fontSize' => 9, // Tamaño de Letras
						 'showLines'=>1, // Mostrar Líneas
						 'shaded'=>2, // Sombra entre líneas
						 'shadeCol' =>array(0.9,0.9,0.9),
						 'shadeCol2' =>array(0.9,0.9,0.9),
						 'xOrientation'=>'center', // Orientación de la tabla
						 'cols'=>array('etiqueta'=>array('justification'=>'right','width'=>725),
									   'valor'=>array('justification'=>'center','width'=>45)));
		$this->obtenerObjPdf()->ezTable($dataTotal,$la_columna,'',$la_config);
	}
}
?>
