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
	//fin creando datastore y columnmodel para el catalogo programacion
	
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
		rutacontrolador:'../../controlador/mrh/sigesp_ctr_mrh_imputarhora.php',
		parametros: "ObjSon={'operacion': 'OBT_CLI'",
		arrfiltro:[{etiqueta:'RIF',id:'rifclie',valor:'rifcli'},
				   {etiqueta:'Raz&#243;n Social',id:'razsoci',valor:'razsoc'}],
		posicion:'position:absolute;left:5px;top:10px',
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
		allowblank:false
	});
	//fin componente campocatalogo para el campo cliente
	
	 //combo Imputable
    var Tipo = [['SI', 1], ['NO', 0]]
    var storeTipo = new Ext.data.SimpleStore({
    	fields: ['etiqueta', 'valor'],
        data: Tipo
    });
    
    var cmbImputable = new Ext.form.ComboBox({
    	store: storeTipo,
        editable: false,
        displayField: 'etiqueta',
        valueField: 'valor',
        typeAhead: true,
        triggerAction: 'all',
        mode: 'local'
    })
    //fin combo Imputable
    
    function mostrarImputable(imp) {
    	if (imp==1) {
			return 'SI';
		}
		else if (imp=='0') {
			return 'NO';	
		}
	}
	
    function catalogoContrato(regActividad) {
    	//registro contrato
    	var reContrato = Ext.data.Record.create([
    	    {name: 'codcon'},
    	    {name: 'numcon'},
    	    {name: 'tipcon'}
    	]);
    	
    	var dsContrato =  new Ext.data.Store({
    		reader: new Ext.data.JsonReader({root: 'raiz',id: "id"},reContrato)
    	});
    	
    	var myJSONObject = {"operacion":"BUS_CON", "cliente":regActividad.get('rifcli')};
		var ObjSon = Ext.util.JSON.encode(myJSONObject);
		var parametros ='ObjSon='+ObjSon;
		Ext.Ajax.request({
			url: '../../controlador/mrh/sigesp_ctr_mrh_imputarhora.php',
			params: parametros,
			method: 'POST',
			success: function ( result, request ) {
				var datos = result.responseText;
				var objData = eval('(' + datos + ')');
				dsContrato.loadData(objData);
			},
			failure: function ( result, request) { 
					Ext.MessageBox.alert('Error', 'Error de comunicacion con el servidor'); 
			}
		});
    	
    	//Grid de catalogo contratos
    	var gridContrato = new Ext.grid.GridPanel({
    		width:480,
    	    height:170,
    	    ds: dsContrato,
           	cm: new Ext.grid.ColumnModel([
                {header: "C&#243;digo", width: 15, sortable: true, dataIndex: 'codcon'},
                {header: "N&#250;mero", width: 30, setEditable: true, sortable: true, dataIndex: 'numcon'},
                {header: "Tipo", width: 50, setEditable: true, sortable: true, dataIndex: 'tipcon'}
            ]),
           	sm: new Ext.grid.CheckboxSelectionModel({}),
    		viewConfig: {forceFit:true},
            columnLines: true
        });
    	
    	gridContrato.on({
    		'celldblclick': {
    			fn: function () {
    				var regContrato = gridContrato.getSelectionModel().getSelected();
                	regActividad.set('codcon',regContrato.get('codcon'));
                	gridContrato.destroy();
                	venContrato.destroy();
    			}
    		}
    	});
    	
    	//Ventana de catalogo contratos
    	var venContrato = new Ext.Window({
    		title: "<H1 align='center'>Contratos</H1>",
		    width:500,
            height:250,
            modal: true,
            closable:false,
            plain: false,
            items:[gridContrato],
            buttons: [{
            	text:'Aceptar',  
                handler: function() {
                	var regContrato = gridContrato.getSelectionModel().getSelected();
                	regActividad.set('codcon',regContrato.get('codcon'));
                	gridContrato.destroy();
                	venContrato.destroy();                      
                }
            },{
            	text: 'Salir',
                handler: function() {
                	gridContrato.destroy();
                	venContrato.destroy();
                }
            }]
    	});
    	venContrato.show();
    }
    
	//registro y store de la grid de actividades
	reActividad = Ext.data.Record.create([
	    {name: 'numact'},
	    {name: 'rifcli'},
	    {name: 'razsoc'},
	    {name: 'fecact'},
	    {name: 'canhor'},
	    {name: 'codcon'},
	    {name: 'estfac'}
	]);
	
	var dsActividad =  new Ext.data.Store({
		reader: new Ext.data.JsonReader({root: 'raiz',id: "id"},reActividad)
	});
	
	//Grid de tareas por modulo
	var gridActividades = new Ext.grid.EditorGridPanel({
		title: "<H1 align='center'>Actividades</H1>",
		width:750,
	    height:230,
	    frame:true,
	    style: 'position:absolute;left:15px;top:100px',
	    ds: dsActividad,
       	cm: new Ext.grid.ColumnModel([
            {header: "Actividad", width: 20, sortable: true, dataIndex: 'numact'},
            {header: "Cliente", width: 60, sortable: true, dataIndex: 'razsoc'},
            {header: "Fecha", width: 20, setEditable: true, sortable: true, dataIndex: 'fecact'},
            {header: "Cant. Horas", width: 20, setEditable: true, sortable: true, dataIndex: 'canhor'},
            {header: "Contrato", width: 20, setEditable: true, sortable: true, dataIndex: 'codcon',editor:new Ext.form.TextField({autoCreate: {tag: 'input', type: 'text', size: '15', autocomplete: 'off', maxlength: '4'}})},
            {header: "Imputable", width: 20, setEditable: true, sortable: true, dataIndex: 'estfac',editor:cmbImputable,renderer:mostrarImputable}
        ]),
       	sm: new Ext.grid.CheckboxSelectionModel({}),
		viewConfig: {forceFit:true},
        columnLines: true
    });
	
	gridActividades.on('cellclick', function(grid, rowIndex, columnIndex, e) {
		var record = grid.getStore().getAt(rowIndex);
		var campo  = grid.getColumnModel().getDataIndex(columnIndex);
		if(campo == 'codcon') {
			catalogoContrato(record);
		}
	});
	
	//PANEL PRINCIPAL IMPUTAR HORA
	var plImputarHora = new Ext.FormPanel({
		title: "<H1 align='center'>Imputar Hora</H1>",
		style: 'position:relative;top:10px;left:100px', 
		height: 440,
		width: 815,
	   	applyTo:'formulario',
	   	frame: true,
	   	tbar:[{
	   		text:'Limpiar',
            tooltip:'Limpia el formulario y la grid para una nueva busqueda',
            iconCls:'barralimpiar',
            handler: function() {
            	limpiarFormulario(plImputarHora);
            	gridActividades.store.commitChanges();
            	gridActividades.store.removeAll();
			}
  		},{
  			text:'Buscar',
	        tooltip:'Le permite buscar las actividades que desea procesar',
	        iconCls:'barrabuscar',
	        handler: function() {
	        	var myJSONObject = {"operacion":"BUS_ACT",
								    "cliente":Ext.getCmp('rifcli').getValue(),
								    "fecha":Ext.getCmp('fecact').getValue()};
				var ObjSon=Ext.util.JSON.encode(myJSONObject);
				var parametros ='ObjSon='+ObjSon;
				Ext.Ajax.request({
					url: '../../controlador/mrh/sigesp_ctr_mrh_imputarhora.php',
					params: parametros,
					method: 'POST',
					success: function ( result, request ) {
						var datos = result.responseText;
						var objDataAct = eval('(' + datos + ')');
						gridActividades.store.loadData(objDataAct);
					},
					failure: function ( result, request){ 
							Ext.MessageBox.alert('Error', 'Error de comunicacion con el servidor'); 
					}
				});
	        }
  		},{
  			text:'Procesar',
	        tooltip:'Procesa las actividades actualizadas en pantalla',
	        iconCls:'barraprocesar',
	        handler: function() {
	        	var dataAct = gridActividades.store.getModifiedRecords();
	        	if(dataAct.length > 0) {
		        	var cadenaJson = "{'operacion':'PRO_IMP','data':[";
		        	for (var i = 0; i <= dataAct.length - 1; i++) {
		        		if (i == 0) {
		        			cadenaJson += "{'numact':'"+dataAct[i].get('numact')+"','codcon':'"+dataAct[i].get('codcon')+"','estfac':'"+dataAct[i].get('estfac')+"'}";
						} 
		        		else {
		        			cadenaJson += ",{'numact':'"+dataAct[i].get('numact')+"','codcon':'"+dataAct[i].get('codcon')+"','estfac':'"+dataAct[i].get('estfac')+"'}";
		        		}
		        	}
		        	cadenaJson += "]}";
		        	var parametros ='ObjSon='+cadenaJson;
		        	Ext.Ajax.request({
    	        		url: '../../controlador/mrh/sigesp_ctr_mrh_imputarhora.php',
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
    							gridActividades.store.commitChanges();
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
	        	else {
	        		Ext.Msg.show({
						title:'Mensaje',
						msg: 'No hay actividades modificadas para procesar',
						buttons: Ext.Msg.OK,
						icon: Ext.MessageBox.WARNING
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
		},comtcCliente.fieldsetCatalogo,
		{
			layout: "column",
			defaults: {border: false},
			style: 'position:absolute;left:15px;top:55px',
			items: [{
				layout: "form",
				border: false,
				labelWidth: 130,
				items: [{
					xtype:"datefield",
    				fieldLabel:"Fecha",
					labelSeparator :'',
    				width:100,
					id:"fecact",
					readOnly: true,
					binding:true,
					hiddenvalue:'',
					defaultvalue:'',
					allowBlank:false,
				}]
			}]
		},gridActividades]
	});
});