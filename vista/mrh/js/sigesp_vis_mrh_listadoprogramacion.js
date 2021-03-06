Ext.onReady(function(){
	Ext.BLANK_IMAGE_URL = '../../base/librerias/js/ext/resources/images/default/s.gif';
	
	function buscarContrato () {
		var myJSONObject = {"operacion":"OBT_CNT","cliente":Ext.getCmp('rifcli').getValue()};
		var ObjSon=Ext.util.JSON.encode(myJSONObject);
		var parametros ='ObjSon='+ObjSon;
		Ext.Ajax.request({
			url: '../../controlador/mrh/sigesp_ctr_mrh_listadoprogramacion.php',
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
		rutacontrolador:'../../controlador/mrh/sigesp_ctr_mrh_listadoprogramacion.php',
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
	
	//creando datastore y columnmodel para el catalogo consultores
	var reConsultor = Ext.data.Record.create([
		{name: 'logcon'},
		{name: 'nomcon'}
	]);
	
	var dsConsultor =  new Ext.data.Store({
		reader: new Ext.data.JsonReader({root: 'raiz',id: "id"},reConsultor)
	});
						
	var cmConsultor = new Ext.grid.ColumnModel([
	    {header: "C&#233;dula", width: 20, sortable: true,   dataIndex: 'logcon'},
		{header: "Nombre", width: 40, sortable: true, dataIndex: 'nomcon'}
	]);
	//fin creando datastore y columnmodel para el catalogo consultores
	
	//componente campocatalogo para el campo consultor
	var comtcConsultor = new com.gerco.vista.comCampoCatalogo({
		titvencat: 'Consultores',
		anchoformbus: 450,
		altoformbus:130,
		anchogrid: 450,
		altogrid: 350,
		anchoven: 500,
		altoven: 420,
		anchofieldset:850,
		datosgridcat: dsConsultor,
		colmodelocat: cmConsultor,
		rutacontrolador:'../../controlador/mrh/sigesp_ctr_mrh_listadoprogramacion.php',
		parametros: "ObjSon={'operacion': 'OBT_CON'}",
		arrfiltro:[{etiqueta:'C&#233;dula',id:'logcons',valor:'logcon'},
				   {etiqueta:'Nombre',id:'nomcons',valor:'nomcon'}],
		posicion:'position:absolute;left:5px;top:115px',
		tittxt:'Consultor',
		idtxt:'logcon',
		campovalue:'logcon',
		anchoetiquetatext:130,
		anchotext:130,
		anchocoltext:0.40,
		idlabel:'nomcon',
		labelvalue:'nomcon',
		anchocoletiqueta:0.53,
		anchoetiqueta:250,
		tipbus:'L',
		binding:'C',
		hiddenvalue:'',
		defaultvalue:'',
		allowblank:false,
	});
	//fin componente campocatalogo para el campo consultor
	
	//PANEL PRINCIPAL REPORTE TOTAL HORA
	var plListadoProgramacion = new Ext.FormPanel({
		title: "<H1 align='center'>Listado Programaciones</H1>",
		style: 'position:relative;top:50px;left:150px', 
		height: 340,
		width: 750,
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
	        	var myJSONObject = {"rifcli":Ext.getCmp('rifcli').getValue(),
	        						"codcon":Ext.getCmp('codcon').getValue(),
	        						"fecdes":Ext.getCmp('fecdes').getValue(),
	        						"fechas":Ext.getCmp('fechas').getValue(),
	        						"logcon":Ext.getCmp('logcon').getValue(),
	        						"nomcon":Ext.getCmp('nomcon').getValue()};
	    		var ObjSon=Ext.util.JSON.encode(myJSONObject);
	    		var pagina = "reportes/sigesp_vis_rpp_listadoprogramacion.php?ObjSon="+ObjSon;
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
		},comtcConsultor.fieldsetCatalogo]
	});
});