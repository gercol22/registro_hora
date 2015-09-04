Ext.onReady(function(){
	Ext.BLANK_IMAGE_URL = '../../base/librerias/js/ext/resources/images/default/s.gif';
		
	//PANEL PRINCIPAL CONSULTORES
   	var plMantenimiento = new Ext.FormPanel({
		title: "<H1 align='center'>Mantenimiento Base de Datos</H1>",
		style: 'position:absolute;top:70px;left:300px', 
		height: 200,
		width: 300,
	   	applyTo:'formulario',
	   	frame: true,
	   	bodyStyle:'padding:15px 15px 0',
	   	items:[{
			xtype:'button',
			style: 'position:absolute;left:100px;top:60px',
			text:'Actualizar BD',
			id:'actbd',
			handler: function() {
				var myJSONObject = {"operacion":"ACT_BD"};
				var ObjSon=Ext.util.JSON.encode(myJSONObject);
				var parametros ='ObjSon='+ObjSon;
				Ext.Ajax.request({
					url: '../../controlador/mrh/sigesp_ctr_mrh_actualizarbd.php',
					params: parametros,
					method: 'POST',
					success: function ( result, request ) {
						var respuesta = result.responseText;
						var datajson = eval('(' + respuesta + ')');
						if(datajson.raiz.valido==true){
							Ext.Msg.show({
	    						title:'Mensaje',
	    						msg: 'La base de datos fue actualizada con exito',
	    						buttons: Ext.Msg.OK,
	    						icon: Ext.MessageBox.INFO
	    					});
						}
						else {
							Ext.Msg.show({
	    						title:'Mensaje',
	    						msg: datajson.raiz.mensaje,
	    						buttons: Ext.Msg.OK,
	    						icon: Ext.MessageBox.ERROR
	    					});
						}
					},
					failure: function ( result, request){ 
							Ext.MessageBox.alert('Error', 'Error de comunicacion con el servidor'); 
					}
				});
			}
	   	}]
	});
	
});