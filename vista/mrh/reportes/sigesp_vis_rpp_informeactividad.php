<?php
//require_once("../../../modelo/mrh/sigesp_srv_edoc_recibopago.php");
require_once("../../../base/librerias/php/gerco/gerco_lib_reporteezpdf.php");

$reporte = new reporteEzpdf(3, 2, 2, 2);
$reporte->encabezadoReporte('PRUEBA', 'HOLA LOLA!!!');
$reporte->imprimirReporte();