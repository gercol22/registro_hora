<?php
$dirbaselibcon = "";
$dirbaselibcon = dirname(__FILE__);
$dirbaselibcon = str_replace("\\","/",$dirbaselibcon);
$dirbaselibcon = str_replace("/gerco","",$dirbaselibcon);
require_once($dirbaselibcon."/adodb/adodb.inc.php");
require_once($dirbaselibcon."/adodb/adodb-active-record.inc.php");
require_once($dirbaselibcon."/adodb/adodb-exceptions.inc.php");


/**
 * @desc clase que maneja la conexion a base de datos
 * @author Ing. Gerardo Cordero
 *
 */
abstract class ConexionBaseDatos{
	private static $conexionbd = null;
	private static $conexionAlternabd = null;
	
	/**
 	 * @desc Metodo que crea la instacia de conexion a base de datos siguiendo 
 	 *       el patron singleton ya que solo se crea una instacia unica. Este metodo
 	 *       es estatico por tanto puede ser invocado sin necesidad de instaciar la clase
 	 *       que lo contiene
     * @author Ing. Gerardo Cordero
     * @return conexionbd - Instancia unica de conexion a base de datos
     */
	public static function getInstanciaConexion(){
		
		if (self::$conexionbd==null) {
			$dirbaselibcon = "";
			$dirbaselibcon = dirname(__FILE__);
			$dirbaselibcon = str_replace("\\","/",$dirbaselibcon);
			$dirbaselibcon = str_replace("/librerias/php/gerco","",$dirbaselibcon);
			$arrConfi = parse_ini_file($dirbaselibcon.'/conf/conf_conexion.ini');
			try {
				$hostdb = $arrConfi['HOST_DB'].':'.$arrConfi['PORT_DB'];
				self::$conexionbd = &ADONewConnection($arrConfi['GEST_DB']);
				self::$conexionbd->PConnect($hostdb,$arrConfi['LOGG_DB'],$arrConfi['PASS_DB'],$arrConfi['NOMB_DB']);
				if (self::$conexionbd != false){
					self::$conexionbd->SetFetchMode(ADODB_FETCH_ASSOC);
					ADOdb_Active_Record::SetDatabaseAdapter(self::$conexionbd);
					$ADODB_ASSOC_CASE = 0;
					$ADODB_FORCE_IGNORE = 0;
				}
			} 
			catch (Exception $e) {
				return false;
			}
		}
		
		return self::$conexionbd;
	}
	
	
	
	/**
 	 * @desc Metodo que crea una instacia de conexion alterna a base de datos siguiendo 
 	 *       el patron singleton ya que solo se crea una instacia unica. Este metodo
 	 *       es estatico por tanto puede ser invocado sin necesidad de instaciar la clase
 	 *       que lo contiene
     * @author Ing. Gerardo Cordero
     * @return conexionAlternabd - Instancia unica de conexion a base de datos
     */
	public static function getConexionAlternaBD() { 
		if (self::$conexionAlternabd==null) {
			$dirbaselibcon = "";
			$dirbaselibcon = dirname(__FILE__);
			$dirbaselibcon = str_replace("\\","/",$dirbaselibcon);
			$dirbaselibcon = str_replace("/librerias/php/gerco","",$dirbaselibcon);
			$arrConfi = parse_ini_file($dirbaselibcon.'/conf/conf_conexion.ini');
			try{
				$host=$arrConfi['HOST_DBALT'].':'.$arrConfi['PORT_DBALT'];
				self::$conexionAlternabd = &ADONewConnection($arrConfi['GEST_DBALT']);
				self::$conexionAlternabd->Connect($host, $arrConfi['LOGG_DBALT'], $arrConfi['PASS_DBALT'], $arrConfi['NOMB_DBALT']);
				if(self::$conexionAlternabd != false){
					self::$conexionAlternabd->SetFetchMode(ADODB_FETCH_ASSOC);
					if($flagactiverecord){
						ADOdb_Active_Record::SetDatabaseAdapter(self::$conexionAlternabd);
					}
				}
			}
			catch (exception $e) {
				return false;
			}
		}
		
		return self::$conexionAlternabd;
	}
}

?>
