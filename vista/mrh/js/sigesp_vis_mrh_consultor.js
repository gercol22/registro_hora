Ext.onReady(function(){
	
	//combo rol
	var reRol = Ext.data.Record.create([
	    {name: 'codigo'},    
	    {name: 'descripcion'}
	]);
	                               	                               	                                  	
	var dsRol =  new Ext.data.Store({
	    reader: new Ext.data.JsonReader({root: 'raiz',id: "id"},reRol)
	});
	
	var cmbRol = new Ext.form.ComboBox({
		store: dsRol,
		labelSeparator: '',
		fieldLabel:'Rol',
		displayField:'descripcion',
		valueField:'codigo',
        id:'rolcon',
        forceSelection: true,  
        typeAhead: true,
        mode: 'local',
        binding:true,
        editable: false,
        width:150,
        triggerAction: 'all',
        allowBlank:false
	});
	//fin combo rol
	
	//PANEL PRINCIPAL CONSULTORES
   	var plUsuario = new Ext.FormPanel({
		title: "<H1 align='center'>Consultores</H1>",
		style: 'position:absolute;top:70px;left:250px', 
		height: 300,
		width: 500,
	   	applyTo:'formulario',
	   	frame: true,
	   	bodyStyle:'padding:15px 15px 0',
	   	tbar:[{
	   		text:'Nuevo',
            tooltip:'Reiniciar el formulario',
            iconCls:'barralimpiar',
            handler: function() {
            	limpiarFormulario(plUsuario);
			}
  		},{
  			text:'Guardar',
	        tooltip:'Inserta o modifica consultores',
	        iconCls:'barraguardar',
	        handler: function() {
	        	var logcon = Ext.getCmp('logcon').getValue();
	        	var nomcon = Ext.getCmp('nomcon').getValue();
	        	var admusu = Ext.getCmp('admusu').getValue();
	        	var claveNueva = Ext.getCmp('clavenue').getValue();
	        	var claveNuevaRep = Ext.getCmp('clavenuerep').getValue();
	        	if(admusu){
	        		admusu = 1;
	        	}
	        	else {
	        		admusu = 0;
	        	}
	        	
	        	if(logcon!='') {
	        		if(nomcon!='') {
	        			if(claveNueva!='' && claveNueva!='' ) {
	        				if(claveNueva == claveNuevaRep) {
	        	        		var objetoData = {
	        	    	        	'operacion': 'GUARDAR_USUARIO',
	        	    	        	'logcon': logcon,
	        	    	        	'nomcon': nomcon,
	        	    	        	'admusu': admusu,
	        	    	        	'clausu': b64_sha1('b2c'+claveNueva)
	        	    	        };
	        	        		
	        	        		var ObjSon=Ext.util.JSON.encode(objetoData);
	                           	var parametros ='ObjSon='+ObjSon;
	                           	Ext.Ajax.request({
	                           		url: '../../controlador/documentos/sigesp_ctr_edoc_adminusuario.php',
	                           		params: parametros,
	                           		method: 'POST',
	                           		success: function ( result, request ) {
	                           			var respuesta = result.responseText;
	                           			var mensaje = '';
	                           			var icon = '';
	        							if(respuesta == 1){
	        								var mensaje = 'El usuario fue actualizado';
	        								var icon = Ext.MessageBox.INFO;
	        							}
	        							else if (respuesta == 2){
	        								var mensaje = 'El usuario fue insertado';
	        								var icon = Ext.MessageBox.INFO;
	        							}
	        							else if (respuesta == 0){
	        								var mensaje = 'Ocurrio un error';
	        								var icon = Ext.MessageBox.ERROR;
	        							}
	        							Ext.Msg.show({
            	    						title:'Mensaje',
            	    						msg: mensaje,
            	    						buttons: Ext.Msg.OK,
            	    						icon: icon
            	    					});
	        							limpiarFormulario(plUsuario);
	                           		},
	                           		failure: function ( result, request){ 
	                           			Ext.Msg.show({
	        	    						title:'Mensaje',
	        	    						msg: 'Se perdio comunicacion con el servidor, contacte al administrador del sistema',
	        	    						buttons: Ext.Msg.OK,
	        	    						icon: Ext.MessageBox.ERROR
	        	    					}); 
	                           		}
	                           	});
	        	        	}
	        	        	else {
	        	        		Ext.Msg.show({
	        						title:'Mensaje',
	        						msg: 'Las claves insertadas no son iguales',
	        						buttons: Ext.Msg.OK,
	        						icon: Ext.MessageBox.ERROR
	        					});
	        	        	}
			        	}
	        			else {
	        				var objetoData = {
        	    	        	'operacion': 'GUARDAR_USUARIO',
        	    	        	'logcon': logcon,
        	    	        	'nomcon': nomcon,
        	    	        	'admusu': admusu,
        	    	        	'clausu': ''
        	    	        };
        	        		
        	        		var ObjSon=Ext.util.JSON.encode(objetoData);
                           	var parametros ='ObjSon='+ObjSon;
                           	Ext.Ajax.request({
                           		url: '../../controlador/documentos/sigesp_ctr_edoc_adminusuario.php',
                           		params: parametros,
                           		method: 'POST',
                           		success: function ( result, request ) {
                           			var respuesta = result.responseText;
                           			var mensaje = '';
                           			var icon = '';
        							if(respuesta == 1){
        								var mensaje = 'El usuario fue actualizado';
        								var icon = Ext.MessageBox.INFO;
        							}
        							else if (respuesta == 2){
        								var mensaje = 'El usuario fue insertado';
        								var icon = Ext.MessageBox.INFO;
        							}
        							else if (respuesta == 0){
        								var mensaje = 'Ocurrio un error';
        								var icon = Ext.MessageBox.ERROR;
        							}
        							Ext.Msg.show({
        	    						title:'Mensaje',
        	    						msg: mensaje,
        	    						buttons: Ext.Msg.OK,
        	    						icon: icon
        	    					});
        							limpiarFormulario(plUsuario);
                           		},
                           		failure: function ( result, request){ 
                           			Ext.Msg.show({
        	    						title:'Mensaje',
        	    						msg: 'Se perdio comunicacion con el servidor, contacte al administrador del sistema',
        	    						buttons: Ext.Msg.OK,
        	    						icon: Ext.MessageBox.ERROR
        	    					}); 
                           		}
                           	});
        	        	}
		        	}
	        		else {
    	        		Ext.Msg.show({
    						title:'Mensaje',
    						msg: 'Debe indicar el nombre completo del usuario',
    						buttons: Ext.Msg.OK,
    						icon: Ext.MessageBox.ERROR
    					});
    	        	}
	        	}
	        	else {
	        		Ext.Msg.show({
						title:'Mensaje',
						msg: 'Debe asignarle un login al usuario',
						buttons: Ext.Msg.OK,
						icon: Ext.MessageBox.ERROR
					});
	        	}
	        }
  		},{
  			text:'Buscar',
	        tooltip:'Le permite buscar un consultor',
	        iconCls:'barrabuscar',
	        handler: function() {
	        	limpiarFormulario(plUsuario);
	        	var reUsuario = Ext.data.Record.create([
	        	    {name: 'logcon'},
	        	    {name: 'nomcon'},
	        	    {name: 'admusu'}
	        	]);
	        	                       	
               	var dsUsuario =  new Ext.data.Store({
               		reader: new Ext.data.JsonReader({root: 'raiz',id: "id"},reUsuario)
               	});
               						
               	var cmUsuario = new Ext.grid.ColumnModel([
                    {header: "Login", width: 20, sortable: true, dataIndex: 'logcon'},
                    {header: "Nombre", width: 60, sortable: true, dataIndex: 'nomcon'}
                ]);
               	//fin creando datastore y columnmodel para el catalogo de agencias
               	
               	var comCatUsuario = new com.gerco.vista.comCatalogo({
               		titvencat: 'Catalogo de Usuarios',
               		anchoformbus: 450,
               		altoformbus:130,
               		anchogrid: 450,
               		altogrid: 400,
               		anchoven: 500,
               		altoven: 430,
               		datosgridcat: dsUsuario,
               		colmodelocat: cmUsuario,
               		arrfiltro:[{etiqueta:'Login',id:'logusu',valor:'logcon'},
               				   {etiqueta:'Nombre',id:'nousu',valor:'nomcon'}],
               		rutacontrolador:'../../controlador/documentos/sigesp_ctr_edoc_adminusuario.php',
               		parametros: 'ObjSon='+Ext.util.JSON.encode({'operacion': 'BUSCAR_USUARIO'}),
               		tipbus:'L',
               		setdatastyle:'F',
               		formulario:plUsuario
               	});
               	
               	comCatUsuario.mostrarVentana();
	        }
  		},{
  			text:'Eliminar',
	        tooltip:'Eliminar un consultor',
	        iconCls:'barraeliminar',
	        handler: function() {
	        	var logcon = Ext.getCmp('logcon').getValue();
	        	var nomcon = Ext.getCmp('nomcon').getValue();
	        	if(logcon!='' && nomcon!='') {
	        		var objetoData = {
	        	    	'operacion': 'ELIMINAR_USUARIO',
	        	    	'logcon': logcon,
	        	    	'nomcon': nomcon,
	        	    };
	        		
	        		var ObjSon=Ext.util.JSON.encode(objetoData);
                   	var parametros ='ObjSon='+ObjSon;
                   	Ext.Ajax.request({
                   		url: '../../controlador/documentos/sigesp_ctr_edoc_adminusuario.php',
                   		params: parametros,
                   		method: 'POST',
                   		success: function ( result, request ) {
                   			var respuesta = result.responseText;
                   			var mensaje = '';
                   			var icon = '';
							if(respuesta == 1){
								var mensaje = 'El usuario fue eliminado';
								var icon = Ext.MessageBox.INFO;
							}
							else if (respuesta == 0){
								var mensaje = 'Ocurrio un error';
								var icon = Ext.MessageBox.ERROR;
							}
							Ext.Msg.show({
	    						title:'Mensaje',
	    						msg: mensaje,
	    						buttons: Ext.Msg.OK,
	    						icon: icon
	    					});
							limpiarFormulario(plUsuario);
                   		},
                   		failure: function ( result, request){ 
                   			Ext.Msg.show({
	    						title:'Mensaje',
	    						msg: 'Se perdio comunicacion con el servidor, contacte al administrador del sistema',
	    						buttons: Ext.Msg.OK,
	    						icon: Ext.MessageBox.ERROR
	    					}); 
                   		}
                   	});
	        	}
	        	else {
	        		Ext.Msg.show({
						title:'Mensaje',
						msg: 'Debe seleccionar un usuario registrado para su eliminacion',
						buttons: Ext.Msg.OK,
						icon: Ext.MessageBox.INFO
					});
	        	}
	        }
  		},{
  			text:'Salir',
	        tooltip:'Le permite volver al menu principal',
	        iconCls:'barrasalir',
	        handler: function() {
	        	parent.location.href="sigesp_vis_mrh_menuprincipal.html";
	        }
  		}],
		items:[{
			layout: "column",
			defaults: {border: false},
			items: [{
				layout: "form",
				border: false,
				labelWidth: 100,
				items: [{
					xtype:'textfield',
					fieldLabel:'Login',
					id:'logcon',
					width:150,
					labelSeparator:''
				}]
			}]
		},{
			layout: "column",
			defaults: {border: false},
			items: [{
				layout: "form",
				border: false,
				labelWidth: 100,
				items: [{
					xtype:'textfield',
					fieldLabel:'Nombre completo',
					id:'nomcon',
					width:300,
					labelSeparator:''
				}]
			}]
		},cmbRol,
		{
			layout: "column",
			defaults: {border: false},
			items: [{
				layout: "form",
				border: false,
				labelWidth: 100,
				items: [{
					xtype:"fieldset",
					title:'Asignar clave',
					border:true,
					width: 450,
					height: 100,
					items: [{
						xtype:'textfield',
						fieldLabel:'Clave',
						id:'clavenue',
						inputType:'password',
						width:150,
						labelSeparator:''
					},{
						xtype:'textfield',
						fieldLabel:'Repita clave',
						id:'clavenuerep',
						inputType:'password',
						width:150,
						labelSeparator:''
					}]
				}]
			}]
		}]
	});
	//FIN PANEL PRINCIPAL DE CAMBIO DE CLAVE
});