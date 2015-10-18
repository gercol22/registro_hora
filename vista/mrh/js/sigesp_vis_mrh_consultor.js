Ext.onReady(function(){
	Ext.BLANK_IMAGE_URL = '../../base/librerias/js/ext/resources/images/default/s.gif';
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
	
	//OBETENIEDO LA DATA INICIAL...
	var myJSONObject = {"operacion":"DAT_INI"};
	var ObjSon=Ext.util.JSON.encode(myJSONObject);
	var parametros ='ObjSon='+ObjSon;
	Ext.Ajax.request({
		url: '../../controlador/mrh/sigesp_ctr_mrh_consultor.php',
		params: parametros,
		method: 'POST',
		success: function ( result, request ) {
			var datos = result.responseText;
			var objData = eval('(' + datos + ')');
			dsRol.loadData(objData);
		},
		failure: function ( result, request){ 
				Ext.MessageBox.alert('Error', 'Error de comunicacion con el servidor'); 
		}
	});
	
	//PANEL PRINCIPAL CONSULTORES
   	var plConsultor = new Ext.FormPanel({
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
            	limpiarFormulario(plConsultor);
			}
  		},{
  			text:'Guardar',
	        tooltip:'Inserta o modifica consultores',
	        iconCls:'barraguardar',
	        handler: function() {
	        	var logcon = Ext.getCmp('logcon').getValue();
	        	var nomcon = Ext.getCmp('nomcon').getValue();
	        	var rolcon = Ext.getCmp('rolcon').getValue();
	        	var claveNueva = Ext.getCmp('clavenue').getValue();
	        	var claveNuevaRep = Ext.getCmp('clavenuerep').getValue();
	        	var objetoData = null;
	        	var operacion  = '';
        		if (Ext.getCmp('catalogo').getValue() == '0') {
        			operacion = 'INS_CON';
        		}
        		else {
        			operacion = 'MOD_CON';
        		}
	        		        	
	        	if(logcon!='') {
	        		if(nomcon!='') {
	        			if(rolcon!='') {
		        			if(claveNueva!='' && claveNuevaRep!='' ) {
		        				if(claveNueva == claveNuevaRep) {
		        					objetoData = {
		        	    	        	'operacion': operacion,
		        	    	        	'logcon': logcon,
		        	    	        	'nomcon': nomcon,
		        	    	        	'rolcon': rolcon,
		        	    	        	'pascon': b64_sha1('b2c'+claveNueva)
		        	    	        };
		        	        	}
		        	        	else {
		        	        		Ext.Msg.show({
		        						title:'Mensaje',
		        						msg: 'Las claves insertadas no son iguales',
		        						buttons: Ext.Msg.OK,
		        						icon: Ext.MessageBox.ERROR
		        					});
		        	        		return false;
		        	        	}
				        	}
		        			else {
		        				objetoData = {
	        	    	        	'operacion': operacion,
	        	    	        	'logcon': logcon,
	        	    	        	'nomcon': nomcon,
	        	    	        	'rolcon': rolcon,
	        	    	        	'pascon': ''
	        	    	        };
		        			}
		        			
		        			var ObjSon=Ext.util.JSON.encode(objetoData);
                           	var parametros ='ObjSon='+ObjSon;
                           	Ext.Ajax.request({
                           		url: '../../controlador/mrh/sigesp_ctr_mrh_consultor.php',
                           		params: parametros,
                           		method: 'POST',
                           		success: function ( result, request ) {
                           			var respuesta = result.responseText;
    	    						var datajson = eval('(' + respuesta + ')');
    	    						if(datajson.raiz.valido==true){
    	    							Ext.Msg.show({
    	    	    						title:'Mensaje',
    	    	    						msg: datajson.raiz.mensaje,
    	    	    						buttons: Ext.Msg.OK,
    	    	    						icon: Ext.MessageBox.INFO
    	    	    					});
    	    							limpiarFormulario(plConsultor);
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
	    						msg: 'Debe indicar el nombre completo del consultor',
	    						buttons: Ext.Msg.OK,
	    						icon: Ext.MessageBox.ERROR
	    					});
	    	        	}
		        	}
	        		else {
    	        		Ext.Msg.show({
    						title:'Mensaje',
    						msg: 'Debe indicar el nombre completo del consultor',
    						buttons: Ext.Msg.OK,
    						icon: Ext.MessageBox.ERROR
    					});
    	        	}
	        	}
	        	else {
	        		Ext.Msg.show({
						title:'Mensaje',
						msg: 'Debe asignarle un login al consultor',
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
	        	limpiarFormulario(plConsultor);
	        	
	        	function macarCatalogo() {
	        		Ext.getCmp('catalogo').setValue('1');
	        	}
	        	
	        	var reConsultor = Ext.data.Record.create([
	        	    {name: 'logcon'},
	        	    {name: 'nomcon'},
	        	    {name: 'rolcon'}
	        	]);
	        	                       	
               	var dsConsultor =  new Ext.data.Store({
               		reader: new Ext.data.JsonReader({root: 'raiz',id: "id"},reConsultor)
               	});
               						
               	var cmConsultor = new Ext.grid.ColumnModel([
                    {header: "Login", width: 20, sortable: true, dataIndex: 'logcon'},
                    {header: "Nombre", width: 60, sortable: true, dataIndex: 'nomcon'}
                ]);
               	//fin creando datastore y columnmodel para el catalogo de agencias
               	
               	var comCatConsultor = new com.gerco.vista.comCatalogo({
               		titvencat: 'Catalogo de Consultores',
               		anchoformbus: 450,
               		altoformbus:130,
               		anchogrid: 450,
               		altogrid: 400,
               		anchoven: 500,
               		altoven: 430,
               		datosgridcat: dsConsultor,
               		colmodelocat: cmConsultor,
               		arrfiltro:[{etiqueta:'Login',id:'logusu',valor:'logcon',tipo:'texto'},
               				   {etiqueta:'Nombre',id:'nousu',valor:'nomcon',tipo:'texto'}],
               		rutacontrolador:'../../controlador/mrh/sigesp_ctr_mrh_consultor.php',
               		parametros: 'ObjSon='+Ext.util.JSON.encode({'operacion': 'BUS_CON'}),
               		tipbus:'L',
               		setdatastyle:'F',
               		formulario:plConsultor,
               		onAceptar:true,
	        		fnOnAceptar: macarCatalogo
               	});
               	
               	comCatConsultor.mostrarVentana();
	        }
  		},{
  			text:'Eliminar',
	        tooltip:'Eliminar un consultor',
	        iconCls:'barraeliminar',
	        handler: function() {
	        	var logcon = Ext.getCmp('logcon').getValue();
	        	if(logcon!='') {
	        		var objetoData = {
	        	    	'operacion': 'ELI_CON',
	        	    	'logcon': logcon
	        	    };
	        		
	        		var ObjSon=Ext.util.JSON.encode(objetoData);
                   	var parametros ='ObjSon='+ObjSon;
                   	Ext.Ajax.request({
                   		url: '../../controlador/mrh/sigesp_ctr_mrh_consultor.php',
                   		params: parametros,
                   		method: 'POST',
                   		success: function ( result, request ) {
                   			var respuesta = result.responseText;
    						var datajson = eval('(' + respuesta + ')');
    						if(datajson.raiz.valido==true){
    							Ext.Msg.show({
    	    						title:'Mensaje',
    	    						msg: datajson.raiz.mensaje,
    	    						buttons: Ext.Msg.OK,
    	    						icon: Ext.MessageBox.INFO
    	    					});
    							limpiarFormulario(plConsultor);
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
						msg: 'Debe seleccionar un consultor a eliminar',
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
			xtype: 'hidden',
			id: 'catalogo',
			value:'0'
		},{
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