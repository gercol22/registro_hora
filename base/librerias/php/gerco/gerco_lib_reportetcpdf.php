<?php
$dirbaselibcon = "";
$dirbaselibcon = dirname(__FILE__);
$dirbaselibcon = str_replace("\\","/",$dirbaselibcon);
$dirbaselibcon = str_replace("gerco","",$dirbaselibcon);
require_once($dirbaselibcon."/tcpdf/tcpdf.php");
require_once($dirbaselibcon."/gerco/gerco_lib_funciones.php");

/**
 * @desc clase para construir reportes 
 * @author Ing. Gerardo Cordero
 *
 */
class reporteTcpdf extends TCPDF{
	
	public function cabeceraGenerica($arrData){
		$strHtml = '<table border="1" cellpadding="1" cellspacing="0">';
		$numFila = count($arrData);
		for ($i = 0; $i < $numFila; $i++) {
			$strHtml .= '<tr>
							<td width="'.$arrData[$i]['anchoet'].'" align="left">'.utf8_encode($arrData[$i]['etiqueta']).'</td>
							<td width="'.$arrData[$i]['anchoval'].'" align="left">'.utf8_encode($arrData[$i]['valor']).'</td>		
						 </tr>';
		}
		$strHtml .= '</table>';
		
		return $strHtml;
	}
	
	public function impTablaHtml($arrConfig, $data, $total) {
		/*
		 * $arrConfig [] = array('titulo'=>'titulo','datind'=>'campo','ancho'=>00,'bordetit'=>'LR'|1,
		 * 						 'bordecol'=>'LR'|1,'alicol'=>'L|R|C','formato'=>'n|f|t')
		 */
		
		$strHtml = '<table border="1" cellpadding="1" cellspacing="0">';
		// Titulo
		$strHtml .= '<tr>';
		$num_titulo = count($arrConfig);
		for($i = 0; $i < $num_titulo; ++$i) {
			$strHtml .= '<td width="'.$arrConfig[$i]['ancho'].'" align="center">'.$arrConfig[$i]['titulo'].'</td>';
		}
		$strHtml .= '</tr>';
		// Data
		while (!$data->EOF) {
			$strHtml .= '<tr>';
			for($x = 0; $x < $num_titulo; ++$x) {
				$valorCampo = $data->fields[$arrConfig[$x]['datind']];
				if ($arrConfig[$x]['formato'] == 'n' ) {
					$valorCampo = number_format($valorCampo, 2, ',', '.');
				}
				elseif ($arrConfig[$x]['formato'] == 'f' ){
					$valorCampo = convertirFecha($valorCampo);
				}
				$strHtml .= '<td width="'.$arrConfig[$x]['ancho'].'" align="'.$arrConfig[$x]['alicol'].'">'.utf8_encode($valorCampo).'</td>';
			}
			$strHtml .= '</tr>';
			$data->MoveNext();
		}
		$numcol  = $num_titulo-1;
		$strHtml .= '<tr>
						<td align="rigth" colspan="'.$numcol.'"><b>TOTAL</b></td>
						<td width="'.$arrConfig[$numcol]['ancho'].'" align="center"><b>'.$total.'</b></td>		
					 </tr>';
		$strHtml .= '</table>';
		unset($data);
		
		return $strHtml;
	}
	
	public function impTabla($arrConfig, $data) {
		$this->SetLineWidth(0.3);
		$this->SetFont('', 'B');
		// Header
		$totAncho = 0;
		$numCabecera = count($arrConfig);
		for($i = 0; $i < $numCabecera; ++$i) {
			$conf = $arrConfig[$i];
			$this->MultiCell($conf['ancho'], 7, $conf['titulo'], 1, 'J', 0, 0, '', '', true, 0, false, true, 0);
			$totAncho = $totAncho + $conf['ancho'];
		}
		$this->Ln();
		// Color and font restoration
		$this->SetFont('');
		// Data
		while (!$data->EOF) {
			for($x = 0; $x < $numCabecera; ++$x) {
				$valorCampo = $data->fields[$arrConfig[$x]['datind']];
				if ($arrConfig[$x]['formato'] == 'n' ) {
					$valorCampo = number_format($valorCampo, 2, ',', '.');
				}
				elseif ($arrConfig[$x]['formato'] == 'f' ){
					$valorCampo = convertirFecha($valorCampo);
				}
				//$this->getStringHeight($w, $txt);
				$this->MultiCell($arrConfig[$x]['ancho'], 6, utf8_encode($valorCampo), 1, 'J', 0, 0, '', '', true, 0, false, true, 0);
			}
			$this->Ln();
			$data->MoveNext();
		}
		//$this->Cell($totAncho, 0, '', 'T');*/
	}
	
	public function Footer() {
		$this->SetY(-65);
		$strHtml = '<table cellspacing="0" cellpadding="1" border="1">
					    <tr>
					        <td>El proveedor</td>
					        <td>Por el cliente</td>
						</tr>
					    <tr>
						   <td rowspan="3"  align="center" >Firma del Consultor/Desarrollador</td>
					       <td height="30">Nombre y Apellido</td>
					    </tr>
						<tr>
					       <td height="50">Firma</td>
					    </tr>
						<tr>
					       <td height="80">Sello</td>
					    </tr>	
					</table>';
		$this->writeHTML($strHtml, true, false, false, false, '');
		// Set font
		$this->SetFont('helvetica', 'I', 8);
		// Page number
		$this->Cell(0, 10, 'Pagina '.$this->getAliasNumPage().'/'.$this->getAliasNbPages(), 0, false, 'R', 0, '', 0, false, 'T', 'M');
	}
}
?>
