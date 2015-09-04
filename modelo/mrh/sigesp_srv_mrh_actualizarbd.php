<?php
session_start();
$dirsrvdoc = '';
$dirsrvdoc = dirname(__FILE__);
$dirsrvdoc = str_replace('\\','/',$dirsrvdoc);
$dirsrvdoc = str_replace('/modelo/mrh','',$dirsrvdoc);
require_once ($dirsrvdoc.'/base/librerias/php/gerco/gerco_lib_fabricadao.php');

class ServicioActualizarBD {
	private $conexionBD;
	private $arrConfBD;
	public  $mensaje = '';
		
	public function ServicioActualizarBD() {
		$dirconf  = '';
		$dirconf  = dirname(__FILE__);
		$dirconf  = str_replace('\\','/',$dirconf);
		$dirconf  = str_replace('/modelo/mrh','',$dirconf);
		$this->arrConfBD = parse_ini_file($dirconf.'/base/conf/conf_conexion.ini');
		$this->conexionBD  = null;
		
	}
	
	public function existeCampo($tabla, $campo) {
		$existe = false;
		$this->conexionBD = ConexionBaseDatos::getInstanciaConexion();
		if ($this->arrConfBD['GEST_DB'] == "MYSQLT") {
			$cadenaSQL = "SELECT COLUMN_NAME 
							FROM INFORMATION_SCHEMA.COLUMNS 
							WHERE TABLE_SCHEMA='{$this->arrConfBD['NOMB_DB']}' 
							  AND UPPER(TABLE_NAME)=UPPER('{$tabla}') 
							  AND UPPER(COLUMN_NAME)=UPPER('{$campo}')";
		}
		elseif ($this->arrConfBD['GEST_DB'] == "POSTGRES") {
			$cadenaSQL = "SELECT COLUMN_NAME 
							FROM INFORMATION_SCHEMA.COLUMNS 
							WHERE table_catalog='{$this->arrConfBD['NOMB_DB']}' 
							  AND UPPER(table_name)=UPPER('".$as_tabla."') 
							  AND UPPER(column_name)=UPPER('".$as_columna."')";
		}
		$rsData = $this->conexionBD->Execute($cadenaSQL);
		if ($rsData->_numOfRows > 0) {
			$existe = true;
		}
		unset($rsData);
		
		return $existe;
	}
	
	public function actualizarBD() {
		$valido = true;
		//$this->conexionBD = ConexionBaseDatos::getInstanciaConexion();
		
		//cambio a estructura tabla detalle de actividad (tareas)
		if (!$this->existeCampo('modact', 'numtar')) {
			if ($this->arrConfBD['GEST_DB'] == "MYSQLT") {
				$cadenaSQL = "ALTER TABLE modact 
								DROP PRIMARY KEY,
								ADD COLUMN numtar serial,
								ADD CONSTRAINT pk_modact PRIMARY KEY (numtar);";
			}
			elseif ($this->arrConfBD['GEST_DB'] == "POSTGRES") {
				$cadenaSQL = "ALTER TABLE modact DROP CONSTRAINT pk_modact;
						  	  ALTER TABLE modact ADD COLUMN numtar serial;
                          	  ALTER TABLE modact ADD CONSTRAINT pk_modact PRIMARY KEY (numtar);";
			}
			$respuesta = $this->conexionBD->Execute($cadenaSQL);
			if ($respuesta === false) {
				$valido = false;
				$this->mensaje = $this->conexionBD->ErrorMsg();
			}
		}
		
		return $valido;
	}
}