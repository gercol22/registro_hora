<?php
require_once ("gerco_lib_funciones.php");
require_once ('gerco_lib_conexion.php');

/**
 * @desc Clase encargada de crear las instacias active record de la tabla que se le indique
 *       cuenta con metodos genericos que proveen conexion a base de datos y las operciones
 *       de insercion, modificacion y consulta de datos
 * @author Ing. Gerardo Cordero
 */
class DaoGenerico extends ADOdb_Active_Record {
	
	public $errorValidacion = false;
	public $errorDuplicate  = false;
	
	/**
	 * @desc Metodo constructor de la clase establece la conexion a bd e instacia el objeto
	 *       active record de la tabla solicitada
	 * @param string $table - nombre de la tabla a instaciar con active record
	 * @author Ing. Gerardo Cordero
	 */
	function __construct($table = false) {
		try {
			ConexionBaseDatos::getInstanciaConexion();
			parent::__construct ( $table );
		} catch (Exception $e) {
			return $e;
		}
	}
	
	
	/**
	 * @desc Metodo que inicia una transaccion de base de datos
	 * @author Ing. Gerardo Cordero
	 */
	public static function iniciarTrans() {
		ConexionBaseDatos::getInstanciaConexion()->StartTrans(); 
	}
	
	/**
	 * @desc Metodo que finaliza una transaccion de base de datos
	 * @return boolean - true si el commit se realizo satisfactoriamente
	 * @author Ing. Gerardo Cordero
	 */
	public static function completarTrans($valido=true) {
		if (ConexionBaseDatos::getInstanciaConexion()->CompleteTrans($valido)) {
			return true;
		} else {
			return false;
		}
	}
	
	
	/**
	 * @desc  Este metodo invoca al metodo statico para establecer una conexion alterna
	 *        a una base de datos
	 * @param string  $servidor - ip del servidor de datos
	 * @param string  $usuario - cuenta de usuario servidor de datos
	 * @param strinf  $clave - clave cuenta de usuario servidor de datos
	 * @param string  $basedatos - nombre de la base de datos
	 * @param string  $gestor - identificador del gestor, ver documentacion adodb
	 * @param string  $puerto -  numero del puerto del servidor de datos
	 * @param boolean $flagactiverecord - true activa la capacidad active record de adodb
	 * @return conexionAlternabd - instacia de conexion alterna
	 * @author Ing. Gerardo Cordero
	 */
	public function obtenerConexionAlterna($servidor, $usuario, $clave, $basedatos, $gestor, $puerto,$flagactiverecord=false){
		return ConexionBaseDatos::conectarAlternaBD($servidor, $usuario, $clave, $basedatos, $gestor, $puerto,$flagactiverecord);
	}
	
	
	/**
	 * Enter description here ...
	 * @param unknown_type $multiusuario
	 * @param unknown_type $consecutivo
	 * @param unknown_type $validarempresa
	 * @return boolean|string
	 * @author Ing. Gerardo Cordero
	 */
	public function incluir($validaexiste=false, $multiusuario=false, $consecutivo='', $longitud=0) {
		if(!$multiusuario){
			try {
				if ($validaexiste) {
					$resultado = $this->buscarPk();
					$cantcampo = $resultado->_numOfRows;
					unset($resultado);
					if($cantcampo>0){
						unset($cantcampo);
						$this->registroExiste = true;
						return true;
					}
					else {
						return $this->Save();
					}
				}
				else {
					return $this->Save();
				}
			} 
			catch (Exception $e) {
				$this->_errorMsg = $e;
				if($this->ErrorNo()==-5 || $this->ErrorNo()==-239 || $this->ErrorNo()==1062 || $this->ErrorNo()==23505){
					$this->errorDuplicate = true;	
				}
				return false;
			}
		}
		else{
			try {
				return $this->Save();
			} 
			catch (Exception $e) {
				$this->_errorMsg = $e;
				if($this->ErrorNo()==-5 || $this->ErrorNo()==-239 || $this->ErrorNo()==1062 || $this->ErrorNo()==23505){
					$this->$consecutivo = $this->buscarCodigo($consecutivo, $longitud);
					$resultado =$this->incluir(false, true, $consecutivo, $longitud);
					if($resultado){
						$this->errorDuplicate = true;
						return true;
					}
					else{
						return false;
					}
				}
				return false;
			}
		}
	}
	
	/**
	 * Enter description here ...
	 * @param unknown_type $validaexiste
	 * @return Ambigous <boolean, unknown>|number
	 * @author Ing. Gerardo Cordero
	 */
	public function modificar($validaexiste = false) {
		if(!$validaexiste){
			$this->setDataNull();
			try {
				return $this->Replace ();
			} 
			catch (Exception $e) {
				$this->_errorMsg = $e;
				return 0;
			}
		}
		else{
			try {
				$resultado = $this->buscarPk();
				$cantcampo = $resultado->_numOfRows;
				unset($resultado);
				if($cantcampo>0){
					unset($cantcampo);
					return 1;
				}
				else {
					$this->setDataNull();
					return $this->Replace ();
				}
			} 
			catch (Exception $e) {
				$this->_errorMsg = $e;
				return 0;
			}
		}
	}
	
	/**
	 * Enter description here ...
	 * @return boolean
	 * @author Ing. Gerardo Cordero
	 */
	public function eliminar() {
		try {
			return $this->Delete ();
		} catch (Exception $e) {
			$this->_errorMsg = $e;
			return false;
		}
	}
	
	/**
	 * Enter description here ...
	 * @param json $ObJson
	 * @author Ing. Gerardo Cordero
	 */
	public function setData($ObJson) {
		$arratributos = $this->GetAttributeNames();
		foreach ( $arratributos as $IndiceDAO ) {
			foreach ( $ObJson as $IndiceJson => $valorJson ) {
				if ($IndiceJson == $IndiceDAO) {
					$this->$IndiceJson = utf8_decode ( trim($valorJson) );
				}
			}
		}
	}
	
	
	/**
	 * @author Ing. Gerardo Cordero
	 */
	public function setDataNull() {
		$arratributos = $this->GetAttributeNames();
		foreach ( $arratributos as $IndiceDAO ) {
			if ($this->$IndiceDAO === null || $this->$IndiceDAO === '') {
				$this->$IndiceDAO = null;
			}
		}
	}
	
	
	
	/**
	 * Enter description here ...
	 * @author Ing. Gerardo Cordero
	 */
	public function buscarPk(){
		$restriccion = array();
		$arrpk       = $this->obtenerArregloPk();
		$arrcampos   = $this->getAttributeNames();
		$cantcampo   = count($arrpk);
		$cantpk      = 0;
		foreach ($arrpk as $campopk =>$indicepk) {
			$cantpk++;
			foreach ($arrcampos as $regcampo => $indicecampo) {
				if($indicepk==$indicecampo){
					if($cantcampo==$cantpk){
						$restriccion[$cantpk][0] = $indicepk;
                    	$restriccion[$cantpk][1] = '=';
                    	$restriccion[$cantpk][2] = $this->$indicepk;
                    	$restriccion[$cantpk][3] = 2;
					}else{
						$restriccion[$cantpk][0] = $indicepk;
                    	$restriccion[$cantpk][1] = '=';
                    	$restriccion[$cantpk][2] = $this->$indicepk;
                    	$restriccion[$cantpk][3] = 0;
					}
				}
			}
		}
		
		return $this->buscarCampoRestriccion($restriccion);
	}
	
	
	
	/**
	 * Enter description here ...
	 * @param unknown_type $campoorden
	 * @param unknown_type $tipoorden
	 * @return null
	 * @author Ing. Gerardo Cordero
	 */
	public function buscarTodos($campoorden="",$tipoorden=0) {
		$cadena='';
		
		if($campoorden != '')
		{
			$cadena .= ' ORDER BY '.$campoorden;
			
			switch($tipoorden)
			{
				case 1: 
					$cadena = $cadena.' ASC';
					break;
						
				case 2: 
					$cadena = $cadena.' DESC';
					break;
						
				default: 
					$cadena = $cadena.' ASC';
			}
		}
		
		return ConexionBaseDatos::$conexionbd->Execute ( "select * from {$this->_table} ".$cadena );
	}
	
	/**
	 * Enter description here ...
	 * @param unknown_type $campo
	 * @param unknown_type $valor
	 * @return Ambigous <boolean, unknown>
	 * @author Ing. Gerardo Cordero
	 */
	public function buscarCampo($campo, $valor) {
		return $this->Find ( "{$campo} like  '%{$valor}%' " );
	}

	/**
	 * Enter description here ...
	 * @param unknown_type $restricciones
	 * @param unknown_type $banderatabla
	 * @param unknown_type $tabla
	 * @author Ing. Gerardo Cordero
	 */
	public function buscarDataRestriccion($restricciones,$banderatabla=false,$tabla='') {
		$modelo = "";
		
		//$conexionbd->debug=true; //Descomentar para que retorne el sql que se esta ejecutando
		foreach ( $restricciones as $restriccion ) {
			$campo = $restriccion [0];
			$evaluador = $restriccion [1];
			$valor = $restriccion [2];
			$andor = $restriccion [3];
						
			if($evaluador == 'ORDER BY'){
				$modelo .= $evaluador . " " . $campo . "  " . $valor;				
			}else{
				$modelo .= $campo . " " . $evaluador . " '" . $valor . "'";	
			}
			
			if ($andor == 0) {
				$modelo .= " AND ";
			} elseif ($andor == 1) {
				$modelo .= " OR ";
			} elseif ($andor == 2) {
				$modelo .= " ";
			}
		}
        if(!$banderatabla){
        	return $resultado = ConexionBaseDatos::$conexionbd->Execute ( "select * from {$this->_table} where " . $modelo );	
        }
		else{
			return $resultado = ConexionBaseDatos::$conexionbd->Execute ( "select * from {$tabla} where " . $modelo );
		}
		
	}
	
	/**
	 * Enter description here ...
	 * @param unknown_type $codigo
	 * @param unknown_type $validarempresa
	 * @return number
	 * @author Ing. Gerardo Cordero
	 */
	public function buscarCodigo($codigo, $longitud=0, $arrFiltro=array()) {
		$numSiguiente = 0;
		$filtro = '';
		if (!empty($arrFiltro)) {
			foreach ($arrFiltro as $campo => $valor) {
				if ($filtro == '') {
					$filtro .= " WHERE {$campo} = {$valor}";
				}
				else {
					$filtro .= " AND {$campo} = {$valor}";
				}
			}
		}
		
		$cadenaSQL = "SELECT {$codigo}  as codigo
						FROM {$this->_table}
						{$filtro}
						ORDER BY {$codigo} DESC LIMIT 1";
		
		$resultado = ConexionBaseDatos::getInstanciaConexion()->Execute ($cadenaSQL);
		if ($resultado->fields ['codigo'] == '') {
			$numSiguiente = agregarUno(0,$longitud);
		}
		else {
			$numSiguiente = agregarUno($resultado->fields ['codigo'],$longitud);
		}
		
		unset($resultado);
		return $numSiguiente;
	}
	
	/**
	 * Enter description here ...
	 * @param unknown_type $cadenasql
	 * @author Ing. Gerardo Cordero
	 */
	public function ejecutarSql($cadenasql) {
		return $resultado = ConexionBaseDatos::$conexionbd->Execute ( $cadenasql );
	}
	
	/**
	 * Enter description here ...
	 * @author Ing. Gerardo Cordero
	 */
	public function obtenerArregloPk() {
		return ConexionBaseDatos::$conexionbd->MetaPrimaryKeys ($this->_table);
	}
	

	/**
	 * @param unknown_type $campo
	 * @param unknown_type $valor
	 * @param unknown_type $arrtablaignorar
	 * @param unknown_type $obtenerModulo
	 * @return boolean
	 */
	public function validarRelacionesPlus($campo,$valor,$arrtablaignorar = null,$obtenerModulo = false){
		$existerelacion = false;
		$modulos='';

		switch ($_SESSION["ls_gestor"]) {
			case 'MYSQLT':
				if($arrtablaignorar!=null){
					foreach ($arrtablaignorar as $tabla => $nomtabla) {
						$filtrotablas .= " AND TABLE_NAME<>'{$nomtabla}' ";
					}
				}

				$cadenaSql ="SELECT DISTINCT TABLE_NAME AS table_name,column_name
				FROM INFORMATION_SCHEMA.COLUMNS
				WHERE TABLE_SCHEMA='{$_SESSION['ls_database']}' AND
				(column_name='{$campo}') AND
				TABLE_NAME<>'{$this->_table}'".$filtrotablas;

				break;
					
			case 'POSTGRES':
				if($arrtablaignorar!=null){
					foreach ($arrtablaignorar as $tabla => $nomtabla) {
						$filtrotablas .= " AND table_name<>'{$nomtabla}' ";
					}
				}
				$cadenaSql = "SELECT DISTINCT table_name
				FROM INFORMATION_SCHEMA.COLUMNS
				WHERE table_catalog='{$_SESSION['ls_database']}' AND
				(column_name='{$campo}') AND
				table_name<>'{$this->_table}'".$filtrotablas;
				break;
		}
		$resultado = ConexionBaseDatos::$conexionbd->Execute($cadenaSql);
		while (!$resultado->EOF) {
			$tabla = $resultado->fields['table_name'];
			$arrpk = ConexionBaseDatos::$conexionbd->MetaPrimaryKeys($tabla);
			if ($arrpk!==false) {
				if (in_array('codemp',$arrpk)){
					if(isset($this->codemp)){
						$cadenaFiltro = " codemp = '{$this->codemp}' AND
						{$campo} = '{$valor}'";
					}
					else{
						$cadenaFiltro = " codemp = '0001' AND
						{$campo} = '{$valor}'";
					}
						
				}
				else{
					$cadenaFiltro = " {$campo} = '{$valor}'";
				}
			}
			else{
				$cadenaFiltro = " {$campo} = '{$valor}'";
			}
				
			$cadenaSql = "SELECT {$campo}
			FROM {$tabla}
			WHERE ".$cadenaFiltro;
			$datacampo = ConexionBaseDatos::$conexionbd->Execute($cadenaSql);
			if($datacampo->_numOfRows > 0){
				if($obtenerModulo){
					$modulo = $this->obtenerModulo(substr($tabla, 0,3));
					if($modulo != ''){
						if (strlen($modulos)>strlen($modulo)) {
							if(substr_compare($modulos, $modulo, -strlen($modulo), strlen($modulo))!=0){
								if ($modulos=='') {
									$modulos .= $modulo;
								}
								else {
									$modulos .= ', '.$modulo;
								}

							}
						}
						else {
							if ($modulos=='') {
								$modulos .= $modulo;
							}
							else {
								$modulos .= ', '.$modulo;
							}
						}

					}
					$existerelacion = $modulos;
				}
				else {
					$existerelacion = true;
					break;
				}
			}

			$resultado->MoveNext();
		}

		if ($existerelacion=='') {
			$existerelacion=false;
		}

		return $existerelacion;
	}
	
		
	/**
	 * Enter description here ...
	 * @param unknown_type $restricciones
	 * @param unknown_type $banderatabla
	 * @param unknown_type $tabla
	 * @author Ing. Gerardo Cordero
	 */
	public function borrarDataRestriccion($restricciones,$banderatabla=false,$tabla='') {
		$modelo = "";
				
		foreach ( $restricciones as $restriccion ) {
			$campo = $restriccion [0];
			$evaluador = $restriccion [1];
			$valor = $restriccion [2];
			$andor = $restriccion [3];
						
			$modelo .= $campo . " " . $evaluador . " '" . $valor . "'";	
			
			if ($andor == 0) {
				$modelo .= " AND ";
			} elseif ($andor == 1) {
				$modelo .= " OR ";
			} elseif ($andor == 2) {
				$modelo .= " ";
			}
		}
		
        if(!$banderatabla){
        	return $resultado = ConexionBaseDatos::$conexionbd->Execute ( "delete from {$this->_table} where " . $modelo );
				
        }
		else{
			$resultado = ConexionBaseDatos::$conexionbd->Execute ( "delete from {$tabla} where " . $modelo );
		}
		
	}
	
	/**
	 * @param unknown_type $tabdetalle
	 */
	public function deleteDetalle($tabdetalle){
		$restriccion = array();
		$arrpk       = $this->obtenerArregloPk();
		$arrcampos   = $this->getAttributeNames();
		$cantcampo   = count($arrpk);
		$cantpk      = 0;
		foreach ($arrpk as $campopk =>$indicepk) {
			$cantpk++;
			foreach ($arrcampos as $regcampo => $indicecampo) {
				if($indicepk==$indicecampo){
					if($cantcampo==$cantpk){
						$restriccion[$cantpk][0] = $indicepk;
                    	$restriccion[$cantpk][1] = '=';
                    	$restriccion[$cantpk][2] = $this->$indicepk;
                    	$restriccion[$cantpk][3] = 2;
					}else{
						$restriccion[$cantpk][0] = $indicepk;
                    	$restriccion[$cantpk][1] = '=';
                    	$restriccion[$cantpk][2] = $this->$indicepk;
                    	$restriccion[$cantpk][3] = 0;
					}
				}
			}
		}
		
		return $this->borrarCampoRestriccion($restriccion,true,$tabdetalle);
		
	}
}
?>