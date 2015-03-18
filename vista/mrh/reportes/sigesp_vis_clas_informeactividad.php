<?php
$dirbaselibcon = "";
$dirbaselibcon = dirname(__FILE__);
$dirbaselibcon = str_replace("\\","/",$dirbaselibcon);
$dirbaselibcon = str_replace("/vista/mrh/reportes","",$dirbaselibcon);
require_once($dirbaselibcon."/base/librerias/php/gerco/gerco_lib_reporteezpdf.php");

/**
 * @desc clase para construir el informe de actividad 
 * @author Ing. Gerardo Cordero
 *
 */
class reporteInformeActividad extends reporteEzpdf {

	public function __construct($top, $bottom, $left, $right, $orientacion = 'landscape') {
		parent::__construct ($top, $bottom, $left, $right, $orientacion);
	}
	
	public function cabeceraActividad($arrCampos, $fecha) {
		$la_columna=array('etiqueta'=>'','valor'=>'');
		$la_config=array('showHeadings'=>0, // Mostrar encabezados
						 'fontSize' => 8, // Tama�o de Letras
						 'showLines'=>1, // Mostrar L�neas
						 'shaded'=>2, // Sombra entre l�neas
						 'shadeCol' =>array(0.9,0.9,0.9),
						 'shadeCol2' =>array(0.9,0.9,0.9),
						 'width'=>385, // Ancho de la tabla
						 'maxWidth'=>385, // Ancho M�ximo de la tabla
						 'xOrientation'=>'center', // Orientaci�n de la tabla
						 'cols'=>array('etiqueta'=>array('justification'=>'left','width'=>105), 
							  		   'valor'=>array('justification'=>'left','width'=>280)));
		$this->obtenerObjPdf()->ezTable($arrCampos,$la_columna,'',$la_config);
		$this->obtenerObjPdf()->addText(610,470,9,'Fecha: '.$this->formatoFecha($fecha)); // Agregar el t�tulo
	}
	
	public function detalleActividad($arrCampos, $total) {
		$this->obtenerObjPdf()->ezSetDy(-20);
		$la_columna=array('codmod'=>'<b>Modulo</b>','rescli'=>'<b>Solicitante</b>','desinc'=>'<b>Situacion Planteada/Asignacion Recibida</b>',
						  'tipinc'=>'<b>Tipo de Problema</b>','desact'=>'<b>Solucion/Recomendacion/Observaciones</b>','canhor'=>'<b>Cant. Horas</b>');
		$la_config=array('showHeadings'=>1, // Mostrar encabezados
						 'titleFontSize' => 11, //Tama�o de Letras Encabezado
						 'fontSize' => 8, // Tama�o de Letras
						 'showLines'=>1, // Mostrar L�neas
						 'shaded'=>1, // Sombra entre l�neas
						 'width'=>610, // Ancho de la tabla
						 'maxWidth'=>610, // Ancho M�ximo de la tabla
						 'xOrientation'=>'center', // Orientaci�n de la tabla
						 'cols'=>array('codmod'=>array('justification'=>'center','width'=>50),
							  		   'rescli'=>array('justification'=>'left','width'=>80),
							  		   'desinc'=>array('justification'=>'left','width'=>150),
						      		   'tipinc'=>array('justification'=>'left','width'=>80),
							  		   'desact'=>array('justification'=>'left','width'=>200),
							  		   'canhor'=>array('justification'=>'center','width'=>50)));
		$this->obtenerObjPdf()->ezTable($arrCampos,$la_columna,'',$la_config);
		$dataTotal[] = array('etiqueta'=>'<b>TOTAL</b>','valor'=>'<b>'.number_format($total, 1, ',', '.').'</b>');
		$la_columna=array('etiqueta'=>'','valor'=>'');
		$la_config=array('showHeadings'=>0, // Mostrar encabezados
						 'fontSize' => 10, // Tama�o de Letras
						 'showLines'=>1, // Mostrar L�neas
						 'shaded'=>2, // Sombra entre l�neas
						 'shadeCol' =>array(0.9,0.9,0.9),
						 'shadeCol2' =>array(0.9,0.9,0.9),
						 'width'=>610, // Ancho de la tabla
						 'maxWidth'=>610, // Ancho M�ximo de la tabla
						 'xOrientation'=>'center', // Orientaci�n de la tabla
						 'cols'=>array('etiqueta'=>array('justification'=>'right','width'=>560),
									   'valor'=>array('justification'=>'center','width'=>50)));
		$this->obtenerObjPdf()->ezTable($dataTotal,$la_columna,'',$la_config);
	}
}
?>
