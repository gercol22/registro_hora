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
		anchofieldset:780,
		datosgridcat: dsCliente,
		colmodelocat: cmCliente,
		rutacontrolador:'../../controlador/mrh/sigesp_ctr_mrh_listadocontrato.php',
		parametros: "ObjSon={'operacion': 'OBT_CLI'",
		arrfiltro:[{etiqueta:'RIF',id:'rifclie',valor:'rifcli'},
				   {etiqueta:'Raz&#243;n Social',id:'razsoci',valor:'razsoc'}],
		posicion:'position:absolute;left:5px;top:10px',
		tittxt:'Cliente',
		idtxt:'rifcli',
		campovalue:'rifcli',
		anchoetiquetatext:130,
		anchotext:90,
		anchocoltext:0.30,
		idlabel:'razsoc',
		labelvalue:'razsoc',
		anchocoletiqueta:0.63,
		anchoetiqueta:400,
		tipbus:'P',
		allowblank:true
	});
	//fin componente campocatalogo para el campo cliente
	
	//combo campo orden
    var campOrden = [['Cliente', 'CL'], 
                     ['Fecha', 'FE'],
                     ['Tipo Contrato', 'TC'],
                     ['Estado', 'ES']];
    var stCampOrden = new Ext.data.SimpleStore({
        fields: ['etiqueta', 'valor'],
        data: campOrden
    });
    
    var cmbOrden = new Ext.form.ComboBox({
        store: stCampOrden,
        editable: false,
        displayField: 'etiqueta',
        valueField: 'valor',
        labelSeparator: '',
		fieldLabel:'Ordenar por',
        id: 'camord',
        typeAhead: true,
        forceSelection: true,
        triggerAction: 'all',
        mode: 'local'
    })
    //fin combo campo orden
	
	//combo contratante
	var reContratante = Ext.data.Record.create([
	    {name: 'codigo'},    
	    {name: 'descripcion'}
	]);
	                               	                               	                                  	
	var dsContratante =  new Ext.data.Store({
	    reader: new Ext.data.JsonReader({root: 'raiz',id: "id"},reContratante)
	});
	
	var cmbContratante = new Ext.form.ComboBox({
		store: dsContratante,
		labelSeparator: '',
		fieldLabel:'Contratante',
		displayField:'descripcion',
		valueField:'codigo',
        id:'contra',
        forceSelection: true,  
        typeAhead: true,
        mode: 'local',
        binding:true,
        editable: false,
        width:150,
        triggerAction: 'all',
        allowBlank:false
	});
	//fin combo contratante
	
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
        triggerAction: 'all'
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
        triggerAction: 'all'
	});
	//fin combo estado contrato
	
	//OBETENIEDO LA DATA INICIAL...
	var myJSONObject = {"operacion":"DAT_INI"};
	var ObjSon=Ext.util.JSON.encode(myJSONObject);
	var parametros ='ObjSon='+ObjSon;
	Ext.Ajax.request({
		url: '../../controlador/mrh/sigesp_ctr_mrh_listadocontrato.php',
		params: parametros,
		method: 'POST',
		success: function ( result, request ) {
			var datos = result.responseText;
			var datos = datos.split("|");
			var objDataTip = eval('(' + datos[0] + ')');
			var objDataEst = eval('(' + datos[1] + ')');
			var objDataCont = eval('(' + datos[2] + ')');
			dsTipCon.loadData(objDataTip);
			dsEstado.loadData(objDataEst);
			dsContratante.loadData(objDataCont);
		},
		failure: function ( result, request){ 
				Ext.MessageBox.alert('Error', 'Error de comunicacion con el servidor'); 
		}
	});
		
	//PANEL PRINCIPAL REPORTE TOTAL HORA
	var plListadoProgramacion = new Ext.FormPanel({
		title: "<H1 align='center'>Listado Contratos</H1>",
		style: 'position:relative;top:50px;left:150px', 
		height: 380,
		width: 800,
	   	applyTo:'formulario',
	   	frame: true,
	   	tbar:[{
	   		text:'Limpiar',
            tooltip:'Limpia el formulario para una nueva busqueda',
            iconCls:'barralimpiar',
            handler: function() {
            	limpiarFormulario(plListadoProgramacion);
            	
			}
  		},{
  			text:'Emitir',
	        tooltip:'Emite archivo pdf con reporte total horas',
	        iconCls:'barrapdf',
	        handler: function() {
	        	var esthorimp = 0;
	        	var monconimp = 0;
	        	if(Ext.getCmp('esthorimp').getValue()){
	        		esthorimp = 1;
	        	}
	        		        	
	        	if(Ext.getCmp('monconimp').getValue()){
	        		monconimp = 1;
	        	}
	        	
	        	var myJSONObject = {"rifcli":Ext.getCmp('rifcli').getValue(),
	        						"tipcon":Ext.getCmp('tipcon').getValue(),
	        						"estcon":Ext.getCmp('estcon').getValue(),
	        						"fecdes":Ext.getCmp('fecdes').getValue(),
	        						"fechas":Ext.getCmp('fechas').getValue(),
	        						"hordes":Ext.getCmp('canhorma').getValue(),
	        						"horhas":Ext.getCmp('canhorme').getValue(),
	        						"contra":Ext.getCmp('contra').getValue(),
	        						"camord":Ext.getCmp('camord').getValue(),
	        						"monconimp":monconimp,
	        						"esthorimp":esthorimp};
	    		var ObjSon=Ext.util.JSON.encode(myJSONObject);
	    		var pagina = "reportes/sigesp_vis_rpp_listadocontrato.php?ObjSon="+ObjSon;
	        	window.open(pagina,"Reporte","menubar=no,toolbar=no,scrollbars=yes,width=800,height=600,left=0,top=0,location=no,resizable=yes");
	        }
  		},{
  			text:'Salir',
	        tooltip:'Le permite volver al menu principal',
	        iconCls:'barrasalir',
	        handler: function() {
	        	parent.location.href="sigesp_vis_mrh_menuprincipal.html";
	        }
  		}],
		items:[comtcCliente.fieldsetCatalogo, {
			layout: "column",
			defaults: {border: false},
			style: 'position:absolute;left:15px;top:55px',
			items: [{
				width: 350,
				layout: "form",
				border: false,
				labelWidth: 130,
				items: [cmbTipCon]
			},{
				width: 350,
				layout: "form",
				border: false,
				labelWidth: 130,
				style: 'padding-left:25px',
				items: [cmbEstado]
			}]
		},{
			layout: "column",
			defaults: {border: false},
			style: 'position:absolute;left:15px;top:90px',
			items: [{
				width: 350,
				layout: "form",
				border: false,
				labelWidth: 130,
				items: [{
					xtype:"datefield",
    				fieldLabel:"Fecha desde",
					labelSeparator :'',
    				width:100,
					id:"fecdes",
					readOnly: true,
					binding:true,
					endDateField: 'fechas',
					vtype: 'daterange',
					hiddenvalue:'',
					defaultvalue:'',
					allowBlank:false,
				}]
			},{
				width: 350,
				layout: "form",
				border: false,
				labelWidth: 130,
				style: 'padding-left:25px',
				items: [{
					xtype:"datefield",
    				fieldLabel:"Fecha hasta",
					labelSeparator :'',
    				width:100,
					id:"fechas",
					readOnly: true,
					startDateField: 'fecdes',
					vtype: 'daterange',
					binding:true,
					hiddenvalue:'',
					defaultvalue:'',
					allowBlank:false,
				}]
			}]
		},{
			layout: "column",
			defaults: {border: false},
			style: 'position:absolute;left:15px;top:125px',
			items: [{
				width: 350,
				layout: "form",
				border: false,
				labelWidth: 130,
				items: [{
					xtype:'numberfield',
					fieldLabel:'Cant. Horas mayor a',
					id:'canhorma',
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
				width: 350,
				layout: "form",
				border: false,
				labelWidth: 130,
				style: 'padding-left:25px',
				items: [{
					xtype:'numberfield',
					fieldLabel:'Cant. Horas menor a',
					id:'canhorme',
					width:50,
					decimalPrecision : 2,
					decimalSeparator : ',',
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
			style: 'position:absolute;left:15px;top:160px',
			items: [{
				width: 350,
				layout: "form",
				border: false,
				labelWidth: 130,
				items: [cmbContratante]
			},{
				width: 350,
				layout: "form",
				border: false,
				labelWidth: 130,
				style: 'padding-left:25px',
				items: [{
		            xtype: "checkbox",
		            fieldLabel: "Imprimir monto",
		            labelSeparator: '',
		            id: 'monconimp'
		        }]
			}]
		},{
			layout: "column",
			defaults: {border: false},
			style: 'position:absolute;left:15px;top:195px',
			items: [{
				layout: "form",
				border: false,
				labelWidth: 130,
				items: [{
		            xtype: "checkbox",
		            fieldLabel: "Contar horas no imputadas",
		            labelSeparator: '',
		            id: 'esthorimp'
		        }]
			}]
		},{
			layout: "column",
			defaults: {border: false},
			style: 'position:absolute;left:15px;top:240px',
			items: [{
				layout: "form",
				border: false,
				labelWidth: 130,
				items: [cmbOrden]
			}]
		}]
	});
});