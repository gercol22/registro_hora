Ext.onReady(function(){
	Ext.BLANK_IMAGE_URL = '../../base/librerias/js/ext/resources/images/default/s.gif';
	
	//creando datastore y columnmodel para el catalogo clientes
	var reCliente = Ext.data.Record.create([
		{name: 'rifcli'},
		{name: 'razsoc'}
	]);
	
	var dsCliente =  new Ext.data.Store({
		reader: new Ext.data.JsonReader({root: 'raiz',id: "id"},reCliente)
	});
						
	var cmCliente = new Ext.grid.ColumnModel([
	    {header: "RIF", width: 20, sortable: true,   dataIndex: 'rifcli'},
		{header: "Raz&#243;n Social", width: 40, sortable: true, dataIndex: 'razsoc'}
	]);
	//fin creando datastore y columnmodel para el catalogo clientes
	
	//componente campocatalogo para el campo cliente
	var comtcCliente = new com.gerco.vista.comCampoCatalogo({
		titvencat: 'Clientes',
		anchoformbus: 450,
		altoformbus:130,
		anchogrid: 450,
		altogrid: 350,
		anchoven: 500,
		altoven: 420,
		anchofieldset:850,
		datosgridcat: dsCliente,
		colmodelocat: cmCliente,
		rutacontrolador:'../../controlador/mrh/sigesp_ctr_mrh_contrato.php',
		parametros: "ObjSon={'operacion': 'OBT_CLI'",
		arrfiltro:[{etiqueta:'RIF',id:'rifclie',valor:'rifcli'},
				   {etiqueta:'Raz&#243;n Social',id:'razsoci',valor:'razsoc'}],
		posicion:'position:absolute;left:5px;top:30px',
		tittxt:'Cliente',
		idtxt:'rifcli',
		campovalue:'rifcli',
		anchoetiquetatext:130,
		anchotext:130,
		anchocoltext:0.40,
		idlabel:'razsoc',
		labelvalue:'razsoc',
		anchocoletiqueta:0.53,
		anchoetiqueta:250,
		tipbus:'P',
		binding:'C',
		hiddenvalue:'',
		defaultvalue:'',
		allowblank:false
	});
	//fin componente campocatalogo para el campo cliente
	
	//combo tipo contrato
	var reTipCon = Ext.data.Record.create([
	    {name: 'codigo'},    
	    {name: 'descripcion'}
	]);
	                               	                               	                                  	
	var dsTipCon =  new Ext.data.Store({
	    reader: new Ext.data.JsonReader({root: 'raiz',id: "id"},reTipCon)
	});
	
	var cmbTipCon = new Ext.form.ComboBox({
		store: dsTipCon,
		labelSeparator: '',
		fieldLabel:'Tipo Contrato',
		displayField:'descripcion',
		valueField:'codigo',
        id:'tipcon',
        forceSelection: true,  
        typeAhead: true,
        mode: 'local',
        binding:true,
        editable: false,
        width:200,
        triggerAction: 'all',
        allowBlank:false
	});
	//fin combo tipo contrato
	
	//combo estado contrato
	var reEstado = Ext.data.Record.create([
	    {name: 'codigo'},    
	    {name: 'descripcion'}
	]);
	                               	                               	                                  	
	var dsEstado =  new Ext.data.Store({
	    reader: new Ext.data.JsonReader({root: 'raiz',id: "id"},reEstado)
	});
	
	var cmbEstado = new Ext.form.ComboBox({
		store: dsEstado,
		labelSeparator: '',
		fieldLabel:'Estado',
		displayField:'descripcion',
		valueField:'codigo',
        id:'estcon',
        forceSelection: true,  
        typeAhead: true,
        mode: 'local',
        binding:true,
        editable: false,
        width:150,
        triggerAction: 'all',
        allowBlank:false
	});
	//fin combo estado contrato
	
	//registro y store de la grid de tareas
	reNota = Ext.data.Record.create([
	    {name: 'numnot'},
	    {name: 'fecnot'},
	    {name: 'desnot'},
	    {name: 'estbdt'}
	]);
	
	var dsNota =  new Ext.data.Store({
		reader: new Ext.data.JsonReader({root: 'raiz',id: "id"},reNota)
	});
	
	//Grid de tareas por modulo
	var gridNotas = new Ext.grid.EditorGridPanel({
		title: "<H1 align='center'>Notas</H1>",
		width:600,
	    height:150,
	    frame:true,
	    style: 'position:absolute;left:60px;top:220px',
	    ds: dsNota,
       	cm: new Ext.grid.ColumnModel([
            {header: "Fecha", width: 20, sortable: true, dataIndex: 'fecnot',editor : new Ext.form.TextField({readOnly :true})},
            {header: "Descripci&#243;n", width: 60, sortable: true, dataIndex: 'desnot',editor : new Ext.form.TextArea()}
        ]),
       	sm: new Ext.grid.CheckboxSelectionModel({}),
		viewConfig: {forceFit:true},
        columnLines: true,
        tbar:[{
            text:'Agregar nota',
            tooltip:'Agregar tareas realizadas por modulo ',
            iconCls:'barraagregar',
            handler: function(){
            	var hoy = new Date();
            	var tarea = new reNota({
					'numnot':'',
					'fecnot':hoy.format('d/m/Y'),
					'desnot':'',
					'estbdt':'N'
				});
            	gridNotas.store.add(tarea);
            }
        }, '-', {
            text:'Eliminar nota',
            tooltip:'Eliminar tareas realizadas por modulo ',
            iconCls:'barraquitar',
            handler: function(){
            	Ext.Msg.show({
	        		title:'Confirmar',
	     		   	msg: 'Desea eliminar este registro?',
	     		   	buttons: Ext.Msg.YESNO,
	     		   	icon: Ext.MessageBox.QUESTION,
	     		   	fn: function(btn) {
	     		   		if (btn == 'yes') {
		     		   		var regEliminar = gridNotas.getSelectionModel().getSelected();
		                	if(gridNotas.store.getCount() > 1){
		                		if(regEliminar.get('estbdt') == 'N') {
		                			gridNotas.store.remove(regEliminar);
		                		}
		                		else {
		                			var myJSONObject = {"operacion":"ELI_NOT","numnot":regEliminar.get('numnot'),"codcon":Ext.getCmp('codcon').getValue()};
		                			var ObjSon=Ext.util.JSON.encode(myJSONObject);
		                			var parametros ='ObjSon='+ObjSon;
		                			Ext.Ajax.request({
		                				url: '../../controlador/mrh/sigesp_ctr_mrh_contrato.php',
		                				params: parametros,
		                				method: 'POST',
		                				success: function ( result, request ) {
		                					var respuesta = result.responseText;
		                					if (respuesta == 1) {
		                						gridNotas.store.remove(regEliminar);
		                					}
		                					else {
		                						Ext.Msg.show({
		    	    	    						title:'Mensaje',
		    	    	    						msg: 'Ocurrio un error al tratar de eliminar la nota',
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
		                	else {
		                		Ext.Msg.show({
		    						title:'Mensaje',
		    						msg: 'La actividad debe contener al menos una tarea realizada',
		    						buttons: Ext.Msg.OK,
		    						icon: Ext.MessageBox.WARNING
		    					});
		                	}
	     		   		}
	     		   	}
            	});
            } 		
        }]
    });
	
	//OBETENIEDO LA DATA INICIAL...
	var myJSONObject = {"operacion":"DAT_INI"};
	var ObjSon=Ext.util.JSON.encode(myJSONObject);
	var parametros ='ObjSon='+ObjSon;
	Ext.Ajax.request({
		url: '../../controlador/mrh/sigesp_ctr_mrh_contrato.php',
		params: parametros,
		method: 'POST',
		success: function ( result, request ) {
			var datos = result.responseText;
			var datos = datos.split("|");
			var objDataTip = eval('(' + datos[0] + ')');
			var objDataEst = eval('(' + datos[1] + ')');
			dsTipCon.loadData(objDataTip);
			dsEstado.loadData(objDataEst);
			Ext.getCmp('codcon').setValue(datos[2]);
		},
		failure: function ( result, request){ 
				Ext.MessageBox.alert('Error', 'Error de comunicacion con el servidor'); 
		}
	});
	
	//PANEL PRINCIPAL CONTRATO
	var plContrato = new Ext.FormPanel({
		title: "<H1 align='center'>Contrato</H1>",
		style: 'position:relative;top:10px;left:150px', 
		height: 450,
		width: 750,
	   	applyTo:'formulario',
	   	frame: true,
	   	/******************************** BARRA HERRAMIENTA ********************************************/
	   	tbar:[{
	   		text:'Nuevo',
            tooltip:'Registrar un nuevo contrato',
            iconCls:'barralimpiar',
            handler: function() {
            	nuevoContrato();
			}
  		},{
  			text:'Guardar',
	        tooltip:'Inserta o modifica un contrato',
	        iconCls:'barraguardar',
	        handler: function() {
	        	try {
        			var strJsonContrato = getJsonFormulario(plContrato);
	        		var dataTarea = gridNotas.getStore(); 
		        	var arrCampos = [{etiqueta:'Numero', campo:'numnot', tipo:'s', requerido: false},
		        	                 {etiqueta:'Fecha', campo:'fecnot', tipo:'f', requerido: true},
		        	                 {etiqueta:'Descripci&#243;n', campo:'desnot', tipo:'s', requerido: true},
		        	                 {etiqueta:'estbdt', campo:'estbdt', tipo:'s', requerido: false}];
		        	var strJsonGrid = getJsonGrid(dataTarea, arrCampos);
		        	if(strJsonGrid != false) {
		        		var operacion = '';
		        		if (Ext.getCmp('catalogo').getValue() == '0') {
		        			operacion = 'INS_CON';
		        		}
		        		else {
		        			operacion = 'MOD_CON';
		        		}
		        		var strJsonConNot = "{'operacion':'"+operacion+"',"+strJsonContrato+",'arrNota':"+strJsonGrid+"}";
			        	var objjson = Ext.util.JSON.decode(strJsonConNot);
		        		if (typeof(objjson) == 'object') {
		        			var parametros ='ObjSon='+strJsonConNot;
		    	        	Ext.Ajax.request({
		    	        		url: '../../controlador/mrh/sigesp_ctr_mrh_contrato.php',
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
		    							nuevoContrato();
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
			    }
	        	catch(e){
	        		//no imprimo excepcion
	        		//alert(e);
	        	}	
	        }
  		},{
  			text:'Buscar',
	        tooltip:'Le permite buscar un contrato',
	        iconCls:'barrabuscar',
	        handler: function() {
	        	nuevoContrato();
	        	function cargarNotas() {
	        		var myJSONObject = {"operacion":"OBT_NOT",
	        							"codcon":Ext.getCmp('codcon').getValue()};
	        		var ObjSon=Ext.util.JSON.encode(myJSONObject);
	        		var parametros ='ObjSon='+ObjSon;
	        		Ext.Ajax.request({
	        			url: '../../controlador/mrh/sigesp_ctr_mrh_contrato.php',
	        			params: parametros,
	        			method: 'POST',
	        			success: function ( result, request ) {
	        				var datos = result.responseText;
	        				var objDataNot = eval('(' + datos + ')');
	        				gridNotas.store.loadData(objDataNot);
	        				Ext.getCmp('catalogo').setValue('1');
	        			},
	        			failure: function ( result, request){ 
	        					Ext.MessageBox.alert('Error', 'Error de comunicacion con el servidor'); 
	        			}
	        		});
	        	}
	        	
	        	var reContrato = Ext.data.Record.create([
	        		{name: 'codcon'},
	        		{name: 'rifcli'},
	        		{name: 'razsoc'},
	        		{name: 'tipcon'},
	        		{name: 'feccon'},
	        		{name: 'canhor'},
	        		{name: 'fecini'},
	        		{name: 'fecfinest'},
	        		{name: 'estcon'},
	        		{name: 'numcon'}
	        	]);
	        	
	        	var dsContrato =  new Ext.data.Store({
	        		reader: new Ext.data.JsonReader({root: 'raiz',id: "id"},reContrato)
	        	});
	        						
	        	var cmContrato = new Ext.grid.ColumnModel([
	                {header: "N&#250;mero", width: 20, sortable: true,   dataIndex: 'codcon'},
	                {header: "Cliente", width: 40, sortable: true, dataIndex: 'razsoc'},
	                {header: "N&#250;mero Documento", width: 40, sortable: true,   dataIndex: 'numcon'},
	            ]);
	        	
	        	
	        	var comCatContrato = new com.gerco.vista.comCatalogo({
	        		titvencat: 'Catalogo de Contratos',
	        		anchoformbus: 450,
	        		altoformbus:130,
	        		anchogrid: 450,
	        		altogrid: 400,
	        		anchoven: 500,
	        		altoven: 400,
	        		datosgridcat: dsContrato,
	        		colmodelocat: cmContrato,
	        		arrfiltro:[{etiqueta:'N&#250;mero',id:'codcontrato',valor:'codcon'},
	        				   {etiqueta:'Cliente',id:'razsocial',valor:'razsoc'},
	        				   {etiqueta:'N&#250;mero Documento',id:'numcontrato',valor:'numcon'}],
	        		rutacontrolador:'../../controlador/mrh/sigesp_ctr_mrh_contrato.php',
	        		parametros: "ObjSon={'operacion': 'BUS_CON'",
	        		tipbus:'P',
	        		setdatastyle:'F',
	        		formulario:plContrato,
	        		onAceptar:true,
	        		fnOnAceptar: cargarNotas
	        	});
	        	
	        	comCatContrato.mostrarVentana();
	        }
  		},{
  			text:'Eliminar',
	        tooltip:'Eliminar contrato',
	        iconCls:'barraeliminar',
	        handler: function() {
	        	Ext.Msg.show({
	        		title:'Confirmar',
	     		   	msg: 'Desea eliminar este registro?',
	     		   	buttons: Ext.Msg.YESNO,
	     		   	icon: Ext.MessageBox.QUESTION,
	     		   	fn: function(btn) {
	     		   		if (btn == 'yes') {
		     		   		var myJSONObject = {"operacion":"ELI_CON", "codcon":Ext.getCmp('codcon').getValue()};
		    				var ObjSon=Ext.util.JSON.encode(myJSONObject);
		    				var parametros ='ObjSon='+ObjSon;
		    				Ext.Ajax.request({
		    					url: '../../controlador/mrh/sigesp_ctr_mrh_contrato.php',
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
		    							nuevoContrato();
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
  		/******************************** ITEMS FORMULARIO ********************************************/
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
					fieldLabel:'N&#250;mero',
					style:'font-weight: bold; border:none;background:#f1f1f1',
					id:'codcon',
					width:150,
					labelSeparator:'',
					binding:true,
					hiddenvalue:'',
					defaultvalue:'',
					allowBlank:false
				}]
			}]
		},comtcCliente.fieldsetCatalogo,
		{
			layout: "column",
			defaults: {border: false},
			style: 'position:absolute;left:15px;top:75px',
			items: [{
				width: 350,
				layout: "form",
				border: false,
				labelWidth: 130,
				items: [cmbTipCon]
			},{
				width: 250,
				layout: "form",
				border: false,
				labelWidth: 130,
				style: 'padding-left:15px',
				items: [{
					xtype:"datefield",
    				fieldLabel:"Fecha",
					labelSeparator :'',
    				width:100,
					id:"feccon",
					readOnly: true,
					binding:true,
					hiddenvalue:'',
					defaultvalue:'',
					allowBlank:false,
				}]
			}]
		},{
			layout: "column",
			defaults: {border: false},
			style: 'position:absolute;left:15px;top:110px',
			items: [{
				width: 350,
				layout: "form",
				border: false,
				labelWidth: 130,
				items: [{
					xtype:'numberfield',
					fieldLabel:'Cantidad Horas',
					id:'canhor',
					width:50,
					decimalPrecision : 2,
					decimalSeparator : ',',
					labelSeparator:'',
					binding:true,
					hiddenvalue:'',
					defaultvalue:'',
					allowBlank:false
				}]
			},{
				width: 250,
				layout: "form",
				border: false,
				labelWidth: 130,
				style: 'padding-left:15px',
				items: [{
					xtype:"datefield",
    				fieldLabel:"Fecha Inicio",
					labelSeparator :'',
    				width:100,
					id:"fecini",
					readOnly: true,
					binding:true,
					hiddenvalue:'',
					defaultvalue:'2000-01-01',
					allowBlank:true,
				}]
			}]
		},{
			layout: "column",
			defaults: {border: false},
			style: 'position:absolute;left:15px;top:145px',
			items: [{
				width: 350,
				layout: "form",
				border: false,
				labelWidth: 130,
				items: [cmbEstado]
			},{
				width: 350,
				layout: "form",
				border: false,
				labelWidth: 130,
				style: 'padding-left:15px',
				items: [{
					xtype:"datefield",
    				fieldLabel:"Fecha Fin Estimada",
					labelSeparator :'',
    				width:100,
					id:"fecfinest",
					readOnly: true,
					binding:true,
					hiddenvalue:'',
					defaultvalue:'2000-01-01',
					allowBlank:true,
				}]
			}]
		},{
			layout: "column",
			defaults: {border: false},
			style: 'position:absolute;left:15px;top:180px',
			items: [{
				layout: "form",
				border: false,
				labelWidth: 130,
				items: [{
					xtype:'textfield',
					fieldLabel:'N&#250;mero Documento',
					id:'numcon',
					width:200,
					labelSeparator:'',
					binding:true,
					hiddenvalue:'',
					defaultvalue:'',
					allowBlank:true
				}]
			}]
		},gridNotas]
	});
	
	function nuevoContrato() {
		limpiarFormulario(plContrato);
    	var myJSONObject = {"operacion":"OBT_NUM"};
    	var ObjSon=Ext.util.JSON.encode(myJSONObject);
    	var parametros ='ObjSon='+ObjSon;
    	Ext.Ajax.request({
    		url: '../../controlador/mrh/sigesp_ctr_mrh_contrato.php',
    		params: parametros,
    		method: 'POST',
    		success: function ( result, request ) {
    			var numero = result.responseText;
    			Ext.getCmp('codcon').setValue(numero);
    			gridNotas.store.removeAll();
    		},
    		failure: function ( result, request){ 
    				Ext.MessageBox.alert('Error', 'Error de comunicacion con el servidor'); 
    		}
    	});
	}
});