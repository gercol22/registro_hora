Ext.onReady(function(){
	Ext.BLANK_IMAGE_URL = '../../base/librerias/js/ext/resources/images/default/s.gif';
	//PANEL PRINCIPAL CLIENTES
	var plCliente = new Ext.FormPanel({
		title: "<H1 align='center'>Cliente</H1>",
		style: 'position:relative;top:10px;left:100px', 
		height: 460,
		width: 815,
	   	applyTo:'formulario',
	   	frame: true,
	   	tbar:[{
	   		text:'Nuevo',
            tooltip:'Registrar nuevo cliente',
            iconCls:'barralimpiar',
            handler: function() {
            	//TODO NUEVO CLIENTE
            	limpiarFormulario(plCliente);
			}
  		},{
  			text:'Guardar',
	        tooltip:'Inserta o modifica un cliente',
	        iconCls:'barraguardar',
	        handler: function() {
	        	try {
        			var strJsonCliente = getJsonFormulario(plCliente);
        			var operacion = '';
	        		if (Ext.getCmp('catalogo').getValue() == '0') {
	        			operacion = 'INS_CLI';
	        		}
	        		else {
	        			operacion = 'MOD_CLI';
	        		}
	        		var strJsonActTar = "{'operacion':'"+operacion+"',"+strJsonCliente+"}";
		        	var objjson = Ext.util.JSON.decode(strJsonActTar);
	        		if (typeof(objjson) == 'object') {
	        			var parametros ='ObjSon='+strJsonActTar;
	    	        	Ext.Ajax.request({
	    	        		url: '../../controlador/mrh/sigesp_ctr_mrh_cliente.php',
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
	    							limpiarFormulario(plCliente);
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
	        	}
	        	catch(e){
	        		//no imprimo excepcion
	        		//alert(e);
	        	}	
	        }
  		},{
  			text:'Buscar',
	        tooltip:'Le permite buscar un cliente',
	        iconCls:'barrabuscar',
	        handler: function() {
	        	limpiarFormulario(plCliente);
	        	
	        	var reCliente = Ext.data.Record.create([
	        		{name: 'rifcli'},
	        		{name: 'razsoc'},
	        		{name: 'dircli'},
	        		{name: 'punref'},
	        		{name: 'telcli'},
	        		{name: 'conpag'},
	        		{name: 'emaconpag'},
	        		{name: 'consis'},
	        		{name: 'emaconsis'}
	        	]);
	        	
	        	var dsCliente =  new Ext.data.Store({
	        		reader: new Ext.data.JsonReader({root: 'raiz',id: "id"},reCliente)
	        	});
	        						
	        	var cmCliente = new Ext.grid.ColumnModel([
	                {header: "RIF", width: 20, sortable: true,   dataIndex: 'rifcli'},
	                {header: "Raz&#243;n Social", width: 40, sortable: true, dataIndex: 'razsoc'}
	            ]);
	        	
	        	
	        	var comCatCliente = new com.gerco.vista.comCatalogo({
	        		titvencat: 'Catalogo de Clientes',
	        		anchoformbus: 450,
	        		altoformbus:130,
	        		anchogrid: 450,
	        		altogrid: 400,
	        		anchoven: 500,
	        		altoven: 400,
	        		datosgridcat: dsCliente,
	        		colmodelocat: cmCliente,
	        		arrfiltro:[{etiqueta:'RIF',id:'rifcliente',valor:'numpro'},
	        				   {etiqueta:'Raz&#243;n Social',id:'razsocial',valor:'razsoc'}],
	        		rutacontrolador:'../../controlador/mrh/sigesp_ctr_mrh_cliente.php',
	        		parametros: "ObjSon={'operacion': 'BUS_CLI'",
	        		tipbus:'P',
	        		setdatastyle:'F',
	        		formulario:plCliente
	        	});
	        	
	        	comCatCliente.mostrarVentana();
	        	Ext.getCmp('catalogo').setValue('1');
	        }
  		},{
  			text:'Eliminar',
	        tooltip:'Eliminar cliente',
	        iconCls:'barraeliminar',
	        handler: function() {
	        	Ext.Msg.show({
	        		title:'Confirmar',
	     		   	msg: 'Desea eliminar este registro?',
	     		   	buttons: Ext.Msg.YESNO,
	     		   	icon: Ext.MessageBox.QUESTION,
	     		   	fn: function(btn) {
	     		   		if (btn == 'yes') {
		     		   		var myJSONObject = {"operacion":"ELI_CLI", "rifcli":Ext.getCmp('rifcli').getValue()};
		    				var ObjSon=Ext.util.JSON.encode(myJSONObject);
		    				var parametros ='ObjSon='+ObjSon;
		    				Ext.Ajax.request({
		    					url: '../../controlador/mrh/sigesp_ctr_mrh_cliente.php',
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
		    							limpiarFormulario(plCliente);;
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
	     		   	}
	        	});
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
			style: 'position:absolute;left:15px;top:10px',
			items: [{
				layout: "form",
				border: false,
				labelWidth: 130,
				items: [{
					xtype:'textfield',
					fieldLabel:'RIF',
					id:'rifcli',
					width:150,
					labelSeparator:'',
					binding:true,
					hiddenvalue:'',
					defaultvalue:'',
					allowBlank:false,
					autoCreate: {tag: 'input', type: 'text', size: '15', autocomplete: 'off', maxlength: '10'},
					listeners:{
						'blur' : function(campo){
							var regExPattern = /^[JGVE]\d{9}$/
							if (!campo.getValue().match(regExPattern)){
								Ext.Msg.show({
									title:'Advertencia',
									msg: 'El formato del RIF es incorrecto, use [JGVE][999999999]',
									buttons: Ext.Msg.OK,
									icon: Ext.MessageBox.WARNING
								});
								campo.setValue('');
							}
						}
					}
				}]
			}]
		},{
			layout: "column",
			defaults: {border: false},
			style: 'position:absolute;left:15px;top:40px',
			items: [{
				layout: "form",
				border: false,
				labelWidth: 130,
				items: [{
					xtype:'textfield',
					fieldLabel:'Raz&#243;n Social',
					id:'razsoc',
					width:500,
					autoCreate: {tag: 'input', type: 'text', autocomplete: 'off', maxlength: '255'},
					labelSeparator:'',
					binding:true,
					hiddenvalue:'',
					defaultvalue:'',
					allowBlank:false
				}]
			}]
		},{
			layout: "column",
			defaults: {border: false},
			style: 'position:absolute;left:15px;top:70px',
			items: [{
				layout: "form",
				border: false,
				labelWidth: 130,
				items: [{
					xtype: 'textarea',
					labelSeparator :'',
					fieldLabel: 'Direcci&#243;n',
					id: 'dircli',
					width: 530,
					height: 40,
					binding:true,
					hiddenvalue:'',
					defaultvalue:'',
					allowBlank:true,
					autoCreate: {tag: 'textarea', type: 'text', size: '100', onkeypress: "return keyRestrict(event,'abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.;,!@%&/\()�?�-+*[]{}');"},
				}]
			}]
		},{
			layout: "column",
			defaults: {border: false},
			style: 'position:absolute;left:15px;top:120px',
			items: [{
				layout: "form",
				border: false,
				labelWidth: 130,
				items: [{
					xtype:'textfield',
					fieldLabel:'Punto de Referencia',
					id:'punref',
					width:425,
					autoCreate: {tag: 'input', type: 'text', autocomplete: 'off', maxlength: '255'},
					labelSeparator:'',
					binding:true,
					hiddenvalue:'',
					defaultvalue:'',
					allowBlank:true
				}]
			}]
		},{
			layout: "column",
			defaults: {border: false},
			style: 'position:absolute;left:15px;top:150px',
			items: [{
				layout: "form",
				border: false,
				labelWidth: 130,
				items: [{
					xtype:'textfield',
					fieldLabel:'Tel&#233;fono',
					id:'telcli',
					width:150,
					autoCreate: {tag: 'input', type: 'text', size: '20', autocomplete: 'off', maxlength: '20'},
					labelSeparator:'',
					binding:true,
					hiddenvalue:'',
					defaultvalue:'',
					allowBlank:false
				}]
			}]
		},{
			xtype:"fieldset", 
		    title:'Persona Contacto Dpto. Administraci&#243;n (Pagos)',
		    style: 'position:absolute;left:10px;top:190px',
		    border:true,
		    width: 650,
		    height: 90,
		    items: [{
				xtype:'textfield',
				fieldLabel:'Nombre',
				id:'conpag',
				width:150,
				width:425,
				autoCreate: {tag: 'input', type: 'text', autocomplete: 'off', maxlength: '255'},
				labelSeparator:'',
				binding:true,
				hiddenvalue:'',
				defaultvalue:'',
				allowBlank:false
			},{
				xtype:'textfield',
				fieldLabel:'Email',
				id:'emaconpag',
				width:150,
				width:350,
				autoCreate: {tag: 'input', type: 'text', autocomplete: 'off', maxlength: '255'},
				labelSeparator:'',
				binding:true,
				hiddenvalue:'',
				defaultvalue:'',
				allowBlank:false,
				listeners:{
					'blur' : function(campo){
						var regExEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
						if (!campo.getValue().match(regExEmail)){
							Ext.Msg.show({
								title:'Advertencia',
								msg: 'El formato del email no es valido',
								buttons: Ext.Msg.OK,
								icon: Ext.MessageBox.WARNING
							});
							campo.setValue('');
						}
					}
				}
			}]
		},{
			xtype:"fieldset", 
		    title:'Persona Contacto Dpto. Sistemas',
		    style: 'position:absolute;left:10px;top:300px',
		    border:true,
		    width: 650,
		    height: 90,
		    items: [{
				xtype:'textfield',
				fieldLabel:'Nombre',
				id:'consis',
				width:150,
				width:425,
				autoCreate: {tag: 'input', type: 'text', autocomplete: 'off', maxlength: '255'},
				labelSeparator:'',
				binding:true,
				hiddenvalue:'',
				defaultvalue:'',
				allowBlank:true
			},{
				xtype:'textfield',
				fieldLabel:'Email',
				id:'emaconsis',
				width:150,
				width:350,
				autoCreate: {tag: 'input', type: 'text', autocomplete: 'off', maxlength: '255'},
				labelSeparator:'',
				binding:true,
				hiddenvalue:'',
				defaultvalue:'',
				allowBlank:true,
				listeners:{
					'blur' : function(campo){
						var regExEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
						if (!campo.getValue().match(regExEmail)){
							Ext.Msg.show({
								title:'Advertencia',
								msg: 'El formato del email no es valido',
								buttons: Ext.Msg.OK,
								icon: Ext.MessageBox.WARNING
							});
							campo.setValue('');
						}
					}
				}
			}]
		}]
	});
});