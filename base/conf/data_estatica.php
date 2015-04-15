<?php
/***************DATA TIPO INCIDENCIA (SITUACION)**************************/
$arrTipInc[0]['codigo'] = 'I1';
$arrTipInc[0]['descripcion'] = 'Error Usuario (Configuraci&#243;n)';
$arrTipInc[1]['codigo'] = 'I2';
$arrTipInc[1]['descripcion'] = 'Error Usuario (Procedimiento)';
$arrTipInc[2]['codigo'] = 'I3';
$arrTipInc[2]['descripcion'] = 'Error Sistema';
$arrTipInc[3]['codigo'] = 'I4';
$arrTipInc[3]['descripcion'] = 'Error Data';
$arrTipInc[4]['codigo'] = 'I5';
$arrTipInc[4]['descripcion'] = 'Nuevo Requerimiento';
$arrTipInc[5]['codigo'] = 'I6';
$arrTipInc[5]['descripcion'] = 'Entrenamiento / Otros';

/***********************DATA TIPO ACTIVIDAD******************************/
$arrActTec[0]['codigo'] = 'T1';
$arrActTec[0]['descripcion'] = 'Desarrollo';
/*$arrActTec[1]['codigo'] = 'T2';
$arrActTec[1]['descripcion'] = 'Nuevo Desarrollo';
$arrActTec[2]['codigo'] = 'T3';
$arrActTec[2]['descripcion'] = 'Entrenamiento T&#233;cnico';
$arrActTec[3]['codigo'] = 'T4';
$arrActTec[3]['descripcion'] = 'Consultoria T&#233;cnica';
$arrActTec[4]['codigo'] = 'T5';
$arrActTec[4]['descripcion'] = 'Instalaci&#243;n';*/

$arrActFun[0]['codigo'] = 'F1';
$arrActFun[0]['descripcion'] = 'Atenci&#243;n al cliente';
$arrActFun[1]['codigo'] = 'F2';
$arrActFun[1]['descripcion'] = 'Implantaci&#243;n';
$arrActFun[2]['codigo'] = 'F3';
$arrActFun[2]['descripcion'] = 'Mantenimiento';
$arrActFun[3]['codigo'] = 'F4';
$arrActFun[3]['descripcion'] = 'Servicio de Consultoria';
$arrActFun[4]['codigo'] = 'F5';
$arrActFun[4]['descripcion'] = 'Presentaci&#243;n';

$arrActAdm[0]['codigo'] = 'T1';
$arrActAdm[0]['descripcion'] = 'Desarrollo';
/*$arrActAdm[1]['codigo'] = 'T2';
$arrActAdm[1]['descripcion'] = 'Nuevo Desarrollo';
$arrActAdm[2]['codigo'] = 'T3';
$arrActAdm[2]['descripcion'] = 'Entrenamiento T&#233;cnico';
$arrActAdm[3]['codigo'] = 'T4';
$arrActAdm[3]['descripcion'] = 'Consultoria T&#233;cnica';
$arrActAdm[4]['codigo'] = 'T5';
$arrActAdm[4]['descripcion'] = 'Instalaci&#243;n';*/
$arrActAdm[1]['codigo'] = 'F1';
$arrActAdm[1]['descripcion'] = 'Atenci&#243;n al cliente';
$arrActAdm[2]['codigo'] = 'F2';
$arrActAdm[2]['descripcion'] = 'Implantaci&#243;n';
$arrActAdm[3]['codigo'] = 'F3';
$arrActAdm[3]['descripcion'] = 'Mantenimiento';
$arrActAdm[4]['codigo'] = 'F4';
$arrActAdm[4]['descripcion'] = 'Servicio de Consultoria';
$arrActAdm[5]['codigo'] = 'F5';
$arrActAdm[5]['descripcion'] = 'Presentaci&#243;n';

/***********************DATA TIPO CONTRATO*******************************/
$arrTipCon[0]['codigo'] = 'C1';
$arrTipCon[0]['descripcion'] = 'Implantaci&#243;n';
$arrTipCon[1]['codigo'] = 'C2';
$arrTipCon[1]['descripcion'] = 'Mantenimiento';
$arrTipCon[2]['codigo'] = 'C3';
$arrTipCon[2]['descripcion'] = 'Servicios de Consultoria';

/***********************ESTADO CONTRATO*******************************/
$arrEstCon[0]['codigo'] = 'I';
$arrEstCon[0]['descripcion'] = 'Por Iniciar';
$arrEstCon[1]['codigo'] = 'C';
$arrEstCon[1]['descripcion'] = 'En curso';
$arrEstCon[2]['codigo'] = 'P';
$arrEstCon[2]['descripcion'] = 'Paralizado';
$arrEstCon[3]['codigo'] = 'F';
$arrEstCon[3]['descripcion'] = 'Finalizado';

/***********************ROL CONSULTOR*******************************/
$arrRolCon[0]['codigo'] = 'T';
$arrRolCon[0]['descripcion'] = 'Consultor Tecnico';
$arrRolCon[1]['codigo'] = 'F';
$arrRolCon[1]['descripcion'] = 'Consultor Funcional';
$arrRolCon[2]['codigo'] = 'A';
$arrRolCon[2]['descripcion'] = 'Administrador';
$arrRolCon[3]['codigo'] = 'B';
$arrRolCon[3]['descripcion'] = 'Asistente administrativo';

/***********************DATA MODULO**************************************/
$arrMod[0]['codigo'] = 'SAF';
$arrMod[0]['descripcion'] = 'Activos Fijos';
$arrMod[1]['codigo'] = 'APR';
$arrMod[1]['descripcion'] = 'Apertura';
$arrMod[2]['codigo'] = 'SCB';
$arrMod[2]['descripcion'] = 'Banco';
$arrMod[3]['codigo'] = 'SOC';
$arrMod[3]['descripcion'] = 'Compras';
$arrMod[4]['codigo'] = 'CFG';
$arrMod[4]['descripcion'] = 'Configuraci&#243;n';
$arrMod[5]['codigo'] = 'SCF';
$arrMod[5]['descripcion'] = 'Contabilidad Fiscal';
$arrMod[6]['codigo'] = 'SCV';
$arrMod[6]['descripcion'] = 'Control de Viaticos';
$arrMod[7]['codigo'] = 'CXP';
$arrMod[7]['descripcion'] = 'Cuentas por Pagar';
$arrMod[8]['codigo'] = 'SFP';
$arrMod[8]['descripcion'] = 'Formulaci&#243;nn de Presupuesto';
$arrMod[9]['codigo'] = 'MIS';
$arrMod[9]['descripcion'] = 'Integrador';
$arrMod[10]['codigo'] = 'SIV';
$arrMod[10]['descripcion'] = 'Inventario';
$arrMod[11]['codigo'] = 'SNO';
$arrMod[11]['descripcion'] = 'Nomina';
$arrMod[12]['codigo'] = 'SOB';
$arrMod[12]['descripcion'] = 'Obras';
$arrMod[13]['codigo'] = 'SPG';
$arrMod[13]['descripcion'] = 'Presupuesto de Gastos';
$arrMod[14]['codigo'] = 'SPI';
$arrMod[14]['descripcion'] = 'Presupuesto de Ingresos';
$arrMod[15]['codigo'] = 'RPC';
$arrMod[15]['descripcion'] = 'Proveedores y Beneficiarios';
$arrMod[16]['codigo'] = 'SRH';
$arrMod[16]['descripcion'] = 'Recursos Humanos';
$arrMod[17]['codigo'] = 'SSS';
$arrMod[17]['descripcion'] = 'Seguridad';
$arrMod[18]['codigo'] = 'SEP';
$arrMod[18]['descripcion'] = 'Solicitud de Ejecuci&#243;n Presupuestaria';
$arrMod[19]['codigo'] = 'NAP';
$arrMod[19]['descripcion'] = 'No Aplica';


