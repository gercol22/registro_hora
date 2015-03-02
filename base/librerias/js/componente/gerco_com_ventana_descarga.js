Ext.namespace('com.gerco.vista');
com.gerco.vista.comVentanaDescarga = function(options){
	var ventanaCreada = false;
	var objdata ={
		'ruta': options.rutadescarga 
	};
	
	var objData=JSON.stringify(objdata);
	var parametros = 'objdata='+objData;
	Ext.Ajax.request({
		url : options.rutacontrolador,
		params : parametros,
		method: 'POST',
		success: function ( resultado, request ){
			var datos = resultado.responseText;
			var myObject = eval('(' + datos + ')');
			if(myObject.raiz != null){
				if(myObject.raiz[0].valido==true) {
					var record = Ext.data.Record.create([
						{name: 'archivo'},     
						{name: 'ruta'}
					]);
					
					var dsarchivos =  new Ext.data.Store({
						proxy: new Ext.data.MemoryProxy(myObject),
						reader: new Ext.data.JsonReader({root: 'raiz',id: 'id'},record),
						data: myObject			
					});
					
					function urlDescarga(value){
						var arrArchivo = value.split("|"); 
				        var myURL = '';
				        if(value !== ''){
				            myURL = '<a href="http://'+options.ipServer+'/sigesp_enomina/base/librerias/php/gerco/gerco_lib_descarga.php?tipo=abrir&archivo='+arrArchivo[1]+'&enlace='+arrArchivo[0]+'" target="_blank">Descargar</a>';
				        }
				        return myURL;
				    }
				    
				    function eliminarArchivo(){
				    	var registro = grid.getSelectionModel().getSelected();
						var arrArchivo = registro.get('ruta').split("|"); 
				        var myURL = '';
				        if(arrArchivo.length > 0){
				            myURL = "http://localhost/sigesp_enomina/base/librerias/php/gerco/gerco_lib_descarga.php?tipo=eliminar&archivo="+arrArchivo[1]+"&enlace="+arrArchivo[0];
				        }
				        window.open(myURL,"menubar=no,toolbar=no,scrollbars=yes,width=800,height=600,left=0,top=0,location=no,resizable=yes");
				        grid.store.remove(registro);
				    }
				 
					var grid = new Ext.grid.GridPanel({
						title: '',
				 		width:460,
				 		height:250,
				 		autoScroll:true,
				 		enableColumnHide: false,
				 		border:true,
				 		ds: dsarchivos,
				   		cm: new Ext.grid.ColumnModel([
				   		    {header: "Archivo", width: 70, sortable: true, dataIndex: 'archivo'},
				   		    {header: "Enlace", width: 30, sortable: true, dataIndex: 'ruta', renderer:urlDescarga}
				   		]),
				   		stripeRows: true,
				  		viewConfig: {forceFit:true},
				  		tbar:[{
				            text:'Eliminar archivo',
				            tooltip:'Agregar cuenta presupuestaria',
				            //iconCls:'agregar',
				            handler: eliminarArchivo
		       			}]
					});
					
				    if(!ventanaCreada){
				    	var ventanaDescarga = new Ext.Window({
				            title: 'Archivos para descargar',
				          	autoScroll:true,
				            closable:true,
				            closeAction: 'hide',
				            width:500,
				            height:300,
							modal:true,
				            items: [grid]
				        });
				        ventanaCreada=true;
				    }
				 	ventanaDescarga.show();		
			    }
			    else {
			    	Ext.MessageBox.alert('Error', myObject.raiz[0].mensaje);
					close();
			    }
			}
			else {
				Ext.Msg.show({
					title:'Error',
					msg: 'No se ha generado un archivo',
					buttons: Ext.Msg.OK,
					icon: Ext.MessageBox.ERROR
				});
			}
        },
        failure: function ( resultado, request) {
        	Ext.MessageBox.alert('Error', resultado.responseText); 
        }
	});	
}