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
	
	public function detalleListadoContrato($arrCampos, $totcon, $toteje) {
		$this->obtenerObjPdf()->ezSetDy(-20);
		$la_columna=array('razsoc'=>'<b>Cliente</b>','codcon'=>'<b>Contrato</b>','feccon'=>'<b>Fecha</b>','canhor'=>'<b>Horas Contratadas </b>',
				          'canhoreje'=>'<b>Horas Ejecutadas</b>','estcon'=>'<b>Estado</b>');
		$la_config=array('showHeadings'=>1, // Mostrar encabezados
						 'titleFontSize' => 11, //Tamaño de Letras Encabezador
						 'fontSize' => 8, // Tamaño de Letras
						 'showLines'=>1, // Mostrar Líneas
						 'shaded'=>1, // Sombra entre líneas
						 'xOrientation'=>'center', // Orientación de la tabla
						 'cols'=>array('razsoc'=>array('justification'=>'center','width'=>250),
							  		   'codcon'=>array('justification'=>'center','width'=>110),
						 		       'feccon'=>array('justification'=>'center','width'=>60),
						 		       'canhor'=>array('justification'=>'center','width'=>90),
						 			   'canhoreje'=>array('justification'=>'center','width'=>90),
							  		   'estcon'=>array('justification'=>'center','width'=>70)));
		$this->obtenerObjPdf()->ezTable($arrCampos,$la_columna,'',$la_config);
		$this->obtenerObjPdf()->ezSetDy(-10);
		$dataTotal[] = array('etitotcon'=>'<b>TOTAL HORAS CONTRATADAS</b>','valtotcon'=>'<b>'.number_format($totcon, 1, ',', '.').'</b>',
							 'etitoteje'=>'<b>TOTAL HORAS EJECUTADAS</b>','valtoteje'=>'<b>'.number_format($toteje, 1, ',', '.').'</b>');
		$la_columna=array('etitotcon'=>'','valtotcon'=>'','etitoteje'=>'','valtoteje'=>'');
		$la_config=array('showHeadings'=>0, // Mostrar encabezados
						 'fontSize' => 10, // Tamaño de Letras
						 'showLines'=>1, // Mostrar Líneas
						 'shaded'=>2, // Sombra entre líneas
						 'shadeCol' =>array(0.9,0.9,0.9),
						 'shadeCol2' =>array(0.9,0.9,0.9),
						 'xOrientation'=>'center', // Orientación de la tabla
						 'cols'=>array('etitotcon'=>array('justification'=>'right','width'=>200),
									   'valtotcon'=>array('justification'=>'center','width'=>85),
						 			   'etitoteje'=>array('justification'=>'right','width'=>200),
						 			   'valtoteje'=>array('justification'=>'center','width'=>85)));
		$this->obtenerObjPdf()->ezTable($dataTotal,$la_columna,'',$la_config);
	}
}
?>
