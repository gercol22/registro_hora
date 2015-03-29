<?php
$dirbaselibcon = "";
$dirbaselibcon = dirname(__FILE__);
$dirbaselibcon = str_replace("\\","/",$dirbaselibcon);
$dirbaselibcon = str_replace("gerco","",$dirbaselibcon);
require_once($dirbaselibcon."/ezpdf/class.ezpdf.php");

/**
 * @desc clase para construir reportes 
 * @author Ing. Gerardo Cordero
 *
 */
class reporteEzpdf{
	private $objPDF = null;
	
	public function reporteEzpdf($top, $bottom, $left, $right, $orientacion = 'portrait') {
		$this->objPDF = new Cezpdf('LETTER',$orientacion); // Instancia de la clase PDF
		$this->objPDF->selectFont('../../../base/librerias/php/ezpdf/fonts/Helvetica.afm'); // Seleccionamos el tipo de letra
		$this->objPDF->ezSetCmMargins($top,$bottom,$left,$right); // Configuración de los margenes en centímetros
	}
	
	public function obtenerObjPdf () {
		return $this->objPDF;
	}

	public function encabezadoPieReporte($as_titulo) {
		//ABRIENDO OBJETO
		$io_encabezado=$this->objPDF->openObject();
		$this->objPDF->saveState();
		$this->objPDF->setStrokeColor(0,0,0);
		//TITULO E IMAGEN
		$this->objPDF->addJpegFromFile('../../../base/imagenes/logo_sigesp.jpg',100,530,95,70); // Agregar Logo
		$li_tm=$this->objPDF->getTextWidth(11,$as_titulo);
		$tm=406-($li_tm/2);
		$this->objPDF->addText($tm,550,14,$as_titulo); // Agregar el título
		
		//CUADRO DE FIRMAS
		$this->objPDF->addText(140,170,9,'Por');
		$this->objPDF->Rectangle(120,60,250,100);
		$this->objPDF->addText(150,140,9,'Firma del Consultor/Desarrollador');
		$this->objPDF->line(120,130,370,130);

		$this->objPDF->addText(400,170,9,'Por el cliente');
		$this->objPDF->Rectangle(390,60,310,100);
		$this->objPDF->addText(400,140,9,'Nombre y Apellido');
		$this->objPDF->line(390,125,700,125);
		$this->objPDF->addText(400,105,9,'Firma');
		$this->objPDF->line(390,95,700,95);
		$this->objPDF->addText(400,70,9,'Sello');
		
		//CERRANDO OBJETO PARA QUE SE REPITA EN CADA HOJA
		$this->objPDF->restoreState();
		$this->objPDF->closeObject();
		$this->objPDF->addObject($io_encabezado,'all');
		$this->objPDF->stopObject($io_encabezado); // Detener el objeto pie de página
	}
	
	public function encabezadoFechaReporte($as_titulo) {
		//ABRIENDO OBJETO
		$io_encabezado=$this->objPDF->openObject();
		$this->objPDF->saveState();
		$this->objPDF->setStrokeColor(0,0,0);
		//TITULO E IMAGEN
		$this->objPDF->addJpegFromFile('../../../base/imagenes/logo_sigesp.jpg',25,703,95,70); // Agregar Logo
		$li_tm=$this->objPDF->getTextWidth(11,$as_titulo);
		$tm=296-($li_tm/2);
		$this->objPDF->addText($tm,730,14,$as_titulo); // Agregar el título
		$this->objPDF->addText(510,760,7,date("d/m/Y")); // Agregar la Fecha
		//CERRANDO OBJETO PARA QUE SE REPITA EN CADA HOJA
		$this->objPDF->restoreState();
		$this->objPDF->closeObject();
		$this->objPDF->addObject($io_encabezado,'all');
		$this->objPDF->stopObject($io_encabezado); // Detener el objeto pie de página
	}
	
	public function imprimirReporte() {
		$this->objPDF->ezStopPageNumbers(1,1); // Detenemos la impresión de los números de página
		$this->objPDF->ezStream(); // Mostramos el reporte;
	}
	
	public function formatoFecha($fecha) {
		$fecha = new DateTime($fecha);
		return $fecha->format('d/m/Y');
	}
	
	public function obtenerDenCon($arrTipCon, $tipcon, $codcon) {
		foreach ($arrTipCon as $regTipcon) {
			if ($regTipcon['codigo'] == $tipcon) {
				$descripcion = str_replace('&#243;', 'ó', $regTipcon['descripcion']);
				return $codcon." - ".$descripcion;
			}
		}
	}
	
	public function obtenerDenominacion($arrEsta, $codigo) {
		foreach ($arrEsta as $registro) {
			if ($registro['codigo'] == $codigo) {
				$descripcion = str_replace('&#243;', 'ó', $registro['descripcion']);
				return $descripcion;
			}
		}
	}
}
?>
