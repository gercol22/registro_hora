Ext.onReady(function(){
	Ext.BLANK_IMAGE_URL = '../../base/librerias/js/ext/resources/images/default/s.gif';
	
	function buscarContrato () {
		var myJSONObject = {"operacion":"OBT_CNT","cliente":Ext.getCmp('rifcli').getValue()};
		var ObjSon=Ext.util.JSON.encode(myJSONObject);
		var parametros ='ObjSon='+ObjSon;
		Ext.Ajax.request({
			url: '../../controlador/mrh/sigesp_ctr_mrh_totalhora.php',
			params: parametros,
			method: 'POST',
			success: function ( result, request ) {
				var datos = result.responseText;
				var objDataCnt = eval('(' + datos + ')');
				dsContrato.removeAll();
				dsContrato.loadData(objDataCnt);
			},
			failure: function ( result, request){ 
					Ext.MessageBox.alert('Error', 'Error de comunicacion con el servidor'); 
			}
		});
	}
	
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
		rutacontrolador:'../../controlador/mrh/sigesp_ctr_mrh_totalhora.php',
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
		allowblank:true,
		onAceptar:true,
		fnOnAceptar:buscarContrato
	});
	//fin componente campocatalogo para el campo cliente
	
	//combo contrato
	var reContrato = Ext.data.Record.create([
	    {name: 'codigo'},    
	    {name: 'descripcion'}
	]);
	                               	                               	                                  	
	var dsContrato =  new Ext.data.Store({
	    reader: new Ext.data.JsonReader({root: 'raiz',id: "id"},reContrato)
	});
	
	var cmbContrato = new Ext.form.ComboBox({
		store: dsContrato,
		labelSeparator: '',
		fieldLabel:'Contrato',
		displayField:'descripcion',
		valueField:'codigo',
        id:'codcon',
        forceSelection: true,  
        typeAhead: true,
        mode: 'local',
        binding:true,
        editable: false,
        width:200,
        triggerAction: 'all',
        allowBlank:false
	});
	//fin combo contrato
	
	//combo tipo actividad
	var reTipoActividad = Ext.data.Record.create([
	    {name: 'codigo'},    
	    {name: 'descripcion'}
	]);
	                               	                               	                                  	
	var dsTipoActividad =  new Ext.data.Store({
	    reader: new Ext.data.JsonReader({root: 'raiz',id: "id"},reTipoActividad)
	});
	
	var cmbTipoActividad = new Ext.form.ComboBox({
		store: dsTipoActividad,
		labelSeparator: '',
		fieldLabel:'Tipo Actividad',
		displayField:'descripcion',
		valueField:'codigo',
        id:'tipact',
        forceSelection: true,  
        typeAhead: true,
        mode: 'local',
        binding:true,
        editable: false,
        width:200,
        triggerAction: 'all',
        allowBlank:false
	});
	//fin combo tipo actividad
	
	//combo modulo
	var reModulo = Ext.data.Record.create([
	    {name: 'codigo'},    
	    {name: 'descripcion'}
	]);
	                               	                               	                                  	
	var dsModulo =  new Ext.data.Store({
	    reader: new Ext.data.JsonReader({root: 'raiz',id: "id"},reModulo)
	});
	
	var cmbModulo = new Ext.form.ComboBox({
		store: dsModulo,
		labelSeparator: '',
		fieldLabel:'Modulo',
		displayField:'descripcion',
		valueField:'codigo',
        id:'codmod',
        forceSelection: true,  
        typeAhead: true,
        mode: 'local',
        binding:true,
        editable: false,
        triggerAction: 'all'
	});
	//fin combo modulo
	
	//combo tipo situacion
	var reTipInc = Ext.data.Record.create([
	    {name: 'codigo'},    
	    {name: 'descripcion'}
	]);
	                               	                               	                                  	
	var dsTipInc =  new Ext.data.Store({
	    reader: new Ext.data.JsonReader({root: 'raiz',id: "id"},reTipInc)
	});
	
	var cmbTipInc = new Ext.form.ComboBox({
		store: dsTipInc,
		labelSeparator: '',
		fieldLabel:'Tipo Situacion',
		displayField:'descripcion',
		valueField:'codigo',
        id:'tipinc',
        forceSelection: true,  
        typeAhead: true,
        mode: 'local',
        listWidth : 200,
        binding:true,
        editable: false,
        triggerAction: 'all'
	});
	//fin combo tipo situacion
	
	//OBETENIEDO LA DATA INICIAL...
	var myJSONObject = {"operacion":"DAT_INI"};
	var ObjSon=Ext.util.JSON.encode(myJSONObject);
	var parametros ='ObjSon='+ObjSon;
	Ext.Ajax.request({
		url: '../../controlador/mrh/sigesp_ctr_mrh_totalhora.php',
		params: parametros,
		method: 'POST',
		success: function ( result, request ) {
			var datos = result.responseText;
			var datos = datos.split("|");;
			var objDataAct = eval('(' + datos[0] + ')');
			var objDataMod = eval('(' + datos[1] + ')');
			var objDataTip = eval('(' + datos[2] + ')');
			dsTipoActividad.loadData(objDataAct);
			dsModulo.loadData(objDataMod);
			dsTipInc.loadData(objDataTip);
		},
		failure: function ( result, request){ 
			Ext.MessageBox.alert('Error', 'Error de comunicacion con el servidor'); 
		}
	});
	
	//PANEL PRINCIPAL REPORTE TOTAL HORA
	var plTotalHora = new Ext.FormPanel({
		title: "<H1 align='center'>Reporte Total Hora</H1>",
		style: 'position:relative;top:50px;left:150px', 
		height: 340,
		width: 750,
	   	applyTo:'formulario',
	   	frame: true,
	   	tbar:[{
	   		text:'Limpiar',
            tooltip:'Limpia el formulario y la grid para una nueva busqueda',
            iconCls:'barralimpiar',
            handler: function() {
            	limpiarFormulario(plTotalHora);
            	
			}
  		},{
  			text:'Emitir',
	        tooltip:'Emite archivo pdf con reporte total horas',
	        iconCls:'barrapdf',
	        handler: function() {
	        	var esthorimp = 0;
	        	if(Ext.getCmp('esthorimp').getValue()){
	        		esthorimp = 1;
	        	}
	        	var myJSONObject = {"rifcli":Ext.getCmp('rifcli').getValue(),
	        						"codcon":Ext.getCmp('codcon').getValue(),
	        						"fecdes":Ext.getCmp('fecdes').getValue(),
	        						"fechas":Ext.getCmp('fechas').getValue(),
	        						"tipact":Ext.getCmp('tipact').getValue(),
	        						"codmod":Ext.getCmp('codmod').getValue(),
	        						"tipinc":Ext.getCmp('tipinc').getValue(),
	        						"esthorimp":esthorimp};
	    		var ObjSon=Ext.util.JSON.encode(myJSONObject);
	    		var pagina = "reportes/sigesp_vis_rpp_totalhora.php?ObjSon="+ObjSon;
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
				layout: "form",
				border: false,
				labelWidth: 130,
				items: [cmbContrato]
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
				items: [cmbTipoActividad]
			},{
				width: 350,
				layout: "form",
				border: false,
				labelWidth: 130,
				style: 'padding-left:25px',
				items: [cmbModulo]				
			}]
		},{
			layout: "column",
			defaults: {border: false},
			style: 'position:absolute;left:15px;top:160px',
			items: [{
				layout: "form",
				border: false,
				labelWidth: 130,
				items: [cmbTipInc]
			}]
		},{
			layout: "column",
			defaults: {border: false},
			style: 'position:absolute;left:15px;top:200px',
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
		}]
	});
});