<?php
require_once ('gerco_lib_config.php');
require_once ('gerco_lib_daogenerico.php');
require_once ('Json.php');
//require_once ("sigesp_lib_daogenericoplus.php");
//require_once ("sigesp_lib_daoregistroevento.php");

abstract class FabricaDao{
	
	public static function CrearDAO($tipodao,$tabla=null,$arrtabla=null,$strPk=null) {
		$objeto = null;
		
		switch ($tipodao) {
			//tipo dao normal(una tabla)
			case 'N':
				$objeto = new DaoGenerico($tabla);
				break;
			
			/*/tipo dao plus (cabecera - detalle)
			case 'P':
				$objeto = new DaoGenericoPlus($tabla,$arrtabla);
				break;
			
			//tipo dao log de transacciones
			case 'L':
				$objeto = new daoRegistroEvento('sss_registro_eventos');
				break;
			
			//tipo dao log de fallas	
			case 'F':
				$objeto = new daoRegistroEvento('sss_registro_fallas');
				break;*/

			//tipo dao normal(una tabla - cargada con datos)	
			case 'C':
				$objeto = new DaoGenerico($tabla);
				$objeto->load($strPk);				
				break;
		}
		
		return $objeto;
	}
	
}
?>