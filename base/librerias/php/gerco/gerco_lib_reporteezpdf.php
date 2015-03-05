<?php
$dirbaselibcon = "";
$dirbaselibcon = dirname(__FILE__);
$dirbaselibcon = str_replace("\\","/",$dirbaselibcon);
$dirbaselibcon = str_replace("/gerco","",$dirbaselibcon);
require_once($dirbaselibcon."/ezpdf/class.ezpdf.php");

/**
 * @desc clase para construir reportes 
 * @author Ing. Gerardo Cordero
 *
 */
class reporteEzpdf{
	private $objPDF = null;
	
	public function reporteEzpdf($top,$bottom,$left,$right) {
		$this->objPDF = new Cezpdf('LETTER','portrait'); // Instancia de la clase PDF
		$this->objPDF->selectFont('../../../base/librerias/php/ezpdf/fonts/Helvetica.afm'); // Seleccionamos el tipo de letra
		$this->objPDF->ezSetCmMargins($top,$bottom,$left,$right); // Configuración de los margenes en centímetros
	}

	public function encabezadoReporte($as_titulo, $as_desnom) {
		$io_encabezado=$this->objPDF->openObject();
		$this->objPDF->saveState();
		//$this->objPDF->addJpegFromFile('../../../base/imagenes/logo.jpg',50,720,95,70); // Agregar Logo
		$li_tm=$this->objPDF->getTextWidth(11,$as_titulo);
		$tm=306-($li_tm/2);
		$this->objPDF->addText($tm,730,11,$as_titulo); // Agregar el título
		$li_tm=$this->objPDF->getTextWidth(9,$as_desnom);
		$tm=306-($li_tm/2);
		$this->objPDF->addText($tm,705,9,$as_desnom); // Agregar el título
		$this->objPDF->restoreState();
		$this->objPDF->closeObject();
		$this->objPDF->addObject($io_encabezado,'all');
		$this->objPDF->stopObject($io_encabezado); // Detener el objeto pie de página
	}
	
	public function cabeceraReporte($arrCampos){
		$la_columna=array('etiqueta'=>'','valor'=>'');
		$la_config=array('showHeadings'=>0, // Mostrar encabezados
				'xPos'=>315,
				'fontSize' => 8, // Tamaño de Letras
				'showLines'=>0, // Mostrar Líneas
				'shaded'=>0, // Sombra entre líneas
				'width'=>550, // Ancho de la tabla
				'maxWidth'=>550, // Ancho Máximo de la tabla
				'xOrientation'=>'center', // Orientación de la tabla
				'cols'=>array('etiqueta'=>array('justification'=>'left','width'=>200), 
							  'valor'=>array('justification'=>'center','width'=>200)));
		$this->objPDF->ezTable($arrCampos,$la_columna,'',$la_config);
	}
	
	public function imprimirReporte() {
		$this->objPDF->ezStopPageNumbers(1,1); // Detenemos la impresión de los números de página
		$this->objPDF->ezStream(); // Mostramos el reporte;
	}
}
?>
