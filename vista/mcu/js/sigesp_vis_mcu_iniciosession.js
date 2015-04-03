Ext.onReady(function(){
	Ext.BLANK_IMAGE_URL = 'base/librerias/js/ext/resources/images/default/s.gif';
	
	var	Xpos=((screen.width/2)-(350/2)); 
	var	Ypos=((screen.height/2)-(200/2));
	limpiarSession();
	
	

	var plInicioSession = new Ext.FormPanel({
		height: 210,
		width: 370,
	   	title: "<H1 align='center'>Inicio de Session</H1>",
		bodyStyle:'padding:20px 20px 0',
		applyTo:'ventana_principal',
		style: 'position:relative;top:100px;left:360px', 
		items:[{
				xtype:'textfield',
				fieldLabel:'Usuario',
				labelSeparator:'',
				id:'nickusu',
				width:170
			},{
				xtype:'textfield',
				fieldLabel:'Contrase&#241;a',
				labelSeparator:'',
				inputType:'password',
				id:'conusu',
				width:170
			},{
				xtype:'button',
				text: 'Aceptar',
        		tooltip:'Iniciar sesion',
        		//iconCls:'btnaceptar',
        		style: 'margin-top:50px;position:absolute;left:100px',
        		handler: irAceptar
     		},{
     			xtype:'button',
        		text: 'Cancelar',
        		tooltip:'Cancelar inicio de sesion',
        		//iconCls:'btncancelar',
				style: 'margin-top:50px;position:absolute;left:200px',
				handler: irCancelar
       		}]
	});
		
	function irCancelar(){
		//funcion limpiar formulario
		limpiarFormulario(plInicioSession);
	}

		
	function irAceptar(){
		var objetoData ={
			'operacion': 'INICIAR_SESSION', 
			'logcon': Ext.getCmp('nickusu').getValue(),
			'passusu': b64_sha1('b2c'+Ext.getCmp('conusu').getValue())
		};
		
		var objetoDataStJson = Ext.util.JSON.encode(objetoData);		
		var parInicio = 'objetoData='+objetoDataStJson; 
		Ext.Ajax.request({
			url : 'controlador/mcu/sigesp_ctr_mcu_iniciosession.php',
			params : parInicio,
			method: 'POST',
			success: function (resultad,request){
				var datos = resultad.responseText;
				if(datos==1){
					location.href="vista/mrh/sigesp_vis_mrh_menuprincipal.html";
				}
				else{
					Ext.MessageBox.alert('Error', 'Nombre de usuario o contrase&#241;a incorrecta');
				}
			},
			failure: function (result,request) 
			{ 
				Ext.MessageBox.alert('Error', 'No se pudo iniciar sesion.'); 
			}					
		});
	}
	
});	

