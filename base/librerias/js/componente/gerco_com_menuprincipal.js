/***********************************************************************************
* @Archivo JavaScript que incluye un componentes que construye un campo de texto con 
* un catalgo asociado que llena dicho campo  
* @fecha de creacion: 21/08/2009
* @autor: Ing. Gerardo Cordero
************************************************************************************
* @fecha modificacion:
* @descripcion:
* @autor:
***********************************************************************************/
Ext.namespace('com.gerco.vista');
com.gerco.vista.comMenuPrincipal = function(options){
	
	this.arbol = new Ext.tree.TreePanel({
		id:'menuarbol',
		title:'Usuario',
		height:600,
        width:250,
		applyTo:'menu_principal',
		tbar:[{
            text:'Salir',
            tooltip:'Salir del sistema',
            iconCls:'menulogout',
            id:'salir',
			handler: function(){
					   //FUNCION CERRAR EL SISTEMA
					}
        }],
        singleExpand: false,
		useArrows: true,
		rootVisible: false,
		dataUrl:options.dataArbolUrl,
		root: new Ext.tree.AsyncTreeNode({
			expanded  :true
		}),
		listeners: {
			click : {
				scope  : this,
          		fn     : function( n, e ) {
          			if(n.leaf){
          				var parcialUrl = n.attributes.url;
          				location.href = 'vista'+parcialUrl;
          			}
          		}
			}
		}
	});
	
	this.setUsuario = function (){
		var datosUsuario = arguments[0].responseText;
		if(datosUsuario != 1) {
			var nomusu = 'Usuario : '+datosUsuario;
			this.arbol.setTitle(nomusu);
		}
		else {
			location.href = 'http://localhost/php_framework/';
		}
	}
	
	this.buscarDataUsuario = function(){
		var objetoData ={
			'operacion': 'DATA_SESSION'
		};
			
		var objetoDataStJson = Ext.util.JSON.encode(objetoData);		
		var parInicio = 'objetoData='+objetoDataStJson; 
		Ext.Ajax.request({
			url : options.dataUsuarioUrl,
			params : parInicio,
			method: 'POST',
			success: this.setUsuario.createDelegate(this, arguments, 2)		
		});
	}
	
}

