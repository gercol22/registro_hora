Ext.onReady(function(){
	Ext.BLANK_IMAGE_URL = '../../base/librerias/js/ext/resources/images/default/s.gif';
	
	function buscarContrato () {
		var myJSONObject = {"operacion":"OBT_CNT","cliente":Ext.getCmp('rifcli').getValue()};
		var ObjSon=Ext.util.JSON.encode(myJSONObject);
		var parametros ='ObjSon='+ObjSon;
		Ext.Ajax.request({
			url: '../../controlador/mrh/sigesp_ctr_mrh_programacion.php',
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
		rutacontrolador:'../../controlador/mrh/sigesp_ctr_mrh_programacion.php',
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
		allowblank:false,
		onAceptar:true,
		fnOnAceptar:buscarContrato
	});
	//fin componente campocatalogo para el campo cliente
	
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
		rutacontrolador:'../../controlador/mrh/sigesp_ctr_mrh_programacion.php',
		parametros: "ObjSon={'operacion': 'OBT_CON'}",
		arrfiltro:[{etiqueta:'C&#233;dula',id:'logcons',valor:'logcon'},
				   {etiqueta:'Nombre',id:'nomcons',valor:'nomcon'}],
		posicion:'position:absolute;left:5px;top:100px',
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
	
	function dataDesAct() {
		var myJSONObject = {"operacion":"DAT_DESACT","codact":Ext.getCmp('tipact').getValue()};
		var ObjSon=Ext.util.JSON.encode(myJSONObject);
		var parametros ='ObjSon='+ObjSon;
		Ext.Ajax.request({
			url: '../../controlador/mrh/sigesp_ctr_mrh_programacion.php',
			params: parametros,
			method: 'POST',
			success: function ( result, request ) {
				var datos = result.responseText;
				var objDataAct = eval('(' + datos + ')');
				dsDesAct.loadData(objDataAct);
			},
			failure: function ( result, request){ 
					Ext.MessageBox.alert('Error', 'Error de comunicacion con el servidor'); 
			}
		});
	}
	
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
        listeners: {
        	'select': function() {
        		dataDesAct();        		            			
			}
		},
        allowBlank:false
	});
	//fin combo tipo actividad
	
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
		displayField:'descripcion',
		valueField:'codigo',
        id:'codmod',
        listWidth : 250,
        forceSelection: true,  
        typeAhead: true,
        mode: 'local',
        binding:true,
        editable: false,
        triggerAction: 'all'
	});
	//fin combo modulo
	
	//combo descripcion tarea
	var reDesAct = Ext.data.Record.create([
	   {name: 'descripcion'}
	]);
	                               	                               	                                  	
	var dsDesAct =  new Ext.data.Store({
	    reader: new Ext.data.JsonReader({root: 'raiz',id: "id"},reModulo)
	});
	
	var cmbDesAct = new Ext.form.ComboBox({
		store: dsDesAct,
		labelSeparator: '',
		displayField:'descripcion',
		valueField:'descripcion',
        id:'codmod',
        listWidth : 250,
        forceSelection: true,  
        typeAhead: true,
        mode: 'local',
        binding:true,
        editable: false,
        width:280,
        triggerAction: 'all'
	});
	//fin combo descripcion tarea
	
	//registro y store de la grid de tareas
	reTarea = Ext.data.Record.create([
	    {name: 'codmod'},    
	    {name: 'canhorest'},
	    {name: 'desact'},
	    {name: 'casman'},
	    {name: 'estbdt'}
	]);
	
	var dsTarea =  new Ext.data.Store({
		reader: new Ext.data.JsonReader({root: 'raiz',id: "id"},reTarea)
	});
	
	//Grid de tareas por modulo
	var gridTareas = new Ext.grid.EditorGridPanel({
		title: "<H1 align='center'>Tareas Asignadas</H1>",
		width:750,
	    height:150,
	    frame:true,
	    style: 'position:absolute;left:15px;top:190px',
	    ds: dsTarea,
       	cm: new Ext.grid.ColumnModel([
            {header: "M&#243;dulo", width: 20, sortable: true, dataIndex: 'codmod',editor : cmbModulo},
            {header: "Descripci&#243;n", width: 60, sortable: true, dataIndex: 'desact',editor : cmbDesAct},
            {header: "Caso mantis", width: 20, setEditable: true, sortable: true, dataIndex: 'casman',editor : new Ext.form.NumberField({allowBlank : true,decimalPrecision : 2,decimalSeparator : ','})},
            {header: "Cant. Horas", width: 20, setEditable: true, sortable: true, dataIndex: 'canhorest',editor : new Ext.form.NumberField({allowBlank : true,decimalPrecision : 2,decimalSeparator : ','})}
        ]),
       	sm: new Ext.grid.CheckboxSelectionModel({}),
		viewConfig: {forceFit:true},
        columnLines: true,
        tbar:[{
            text:'Agregar tarea',
            tooltip:'Agregar tareas realizadas por modulo ',
            iconCls:'barraagregar',
            handler: function(){
            	var tarea = new reTarea({
					'codmod':'',
					'canhorest':'0',
					'desact':'',
					'casman':'',
					'estbdt':'N'
				});
            	gridTareas.store.add(tarea);
            }
        }, '-', {
            text:'Eliminar tarea',
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
		     		   		var regEliminar = gridTareas.getSelectionModel().getSelected();
		                	if(gridTareas.store.getCount() > 1){
		                		if(regEliminar.get('estbdt') == 'N') {
		                			gridTareas.store.remove(regEliminar);
		                			calcularTotal();
		                		}
		                		else {
		                			var myJSONObject = {"operacion":"ELI_TAR","codmod":regEliminar.get('codmod'),"numpro":Ext.getCmp('numpro').getValue()};
		                			var ObjSon=Ext.util.JSON.encode(myJSONObject);
		                			var parametros ='ObjSon='+ObjSon;
		                			Ext.Ajax.request({
		                				url: '../../controlador/mrh/sigesp_ctr_mrh_programacion.php',
		                				params: parametros,
		                				method: 'POST',
		                				success: function ( result, request ) {
		                					var respuesta = result.responseText;
		                					if (respuesta == 1) {
		                						gridTareas.store.remove(regEliminar);
		                						calcularTotal();
		                					}
		                					else {
		                						Ext.Msg.show({
		    	    	    						title:'Mensaje',
		    	    	    						msg: 'Ocurrio un error al tratar de eliminar la tarea',
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
	
	function calcularTotal() {
		var totalHora = 0;
		gridTareas.store.each(function (registrostore) {
			var valor = String(registrostore.get('canhorest')).replace(',','.');
			totalHora = totalHora + parseFloat(valor);
		});
		Ext.getCmp('tothor').setValue(totalHora);
	}
	
	gridTareas.on('afteredit', function(Obj) {
		if (Obj.value != '' && Obj.field == 'canhorest') {
			calcularTotal();
		}
	});
	
	gridTareas.on('cellclick', function(grid, rowIndex, columnIndex, e) {
		var record = grid.getStore().getAt(rowIndex);
		var campo  = grid.getColumnModel().getDataIndex(columnIndex);
		var codmod = record.get('codmod');
		var estbdt = record.get('estbdt');
		
		if(campo == 'codmod') {
			if(codmod != '' && estbdt == 'S') {
				Ext.Msg.show({
					title:'Mensaje',
					msg: 'El modulo no puede ser modificado si desea cambiarlo elimine la tarea e inserte una con el nuevo modulo',
					buttons: Ext.Msg.OK,
					icon: Ext.MessageBox.WARNING
				});
			}
			
			return false;
		}
	});
	 
	
	//OBETENIEDO LA DATA INICIAL...
	var myJSONObject = {"operacion":"DAT_INI"};
	var ObjSon=Ext.util.JSON.encode(myJSONObject);
	var parametros ='ObjSon='+ObjSon;
	Ext.Ajax.request({
		url: '../../controlador/mrh/sigesp_ctr_mrh_programacion.php',
		params: parametros,
		method: 'POST',
		success: function ( result, request ) {
			var datos = result.responseText;
			var datos = datos.split("|");
			var objDataAct = eval('(' + datos[0] + ')');
			var objDataMod = eval('(' + datos[1] + ')');
	        dsTipoActividad.loadData(objDataAct);
			dsModulo.loadData(objDataMod);
			Ext.getCmp('numpro').setValue(datos[2]);
		},
		failure: function ( result, request){ 
				Ext.MessageBox.alert('Error', 'Error de comunicacion con el servidor'); 
		}
	});
	
	//PANEL PRINCIPAL PROGRAMACION DE ACTIVIDADES
	var plProgramacion = new Ext.FormPanel({
		title: "<H1 align='center'>Programaci&#243;n de Actividades</H1>",
		style: 'position:relative;top:10px;left:100px', 
		height: 440,
		width: 815,
	   	applyTo:'formulario',
	   	frame: true,
	   	tbar:[{
	   		text:'Nuevo',
            tooltip:'Registrar nueva programaci&#243;n',
            iconCls:'barralimpiar',
            handler: function() {
            	nuevaProgramacion();
			}
  		},{
  			text:'Guardar',
	        tooltip:'Inserta o modifica una programaci&#243;n',
	        iconCls:'barraguardar',
	        handler: function() {
	        	try {
        			var strJsonProgramacion = getJsonFormulario(plProgramacion);
	        		var dataTarea = gridTareas.getStore(); 
		        	if(dataTarea.getCount() > 0) {
			        	var arrCampos = [{etiqueta:'M&#243;dulo', campo:'codmod', tipo:'s', requerido: true},
			        	                 {etiqueta:'Descripci&#243;n', campo:'desact', tipo:'s', requerido: true},
			        					 {etiqueta:'Caso mantis', campo:'casman', tipo:'s', requerido: false},
			        					 {etiqueta:'Cant. Horas', campo:'canhorest', tipo:'n', requerido: true}];
			        	var strJsonGrid = getJsonGrid(dataTarea, arrCampos);
			        	if(strJsonGrid != false) {
			        		var operacion = '';
			        		if (Ext.getCmp('catalogo').getValue() == '0') {
			        			operacion = 'INS_PRO';
			        		}
			        		else {
			        			operacion = 'MOD_PRO';
			        		}
			        		var strJsonActTar = "{'operacion':'"+operacion+"',"+strJsonProgramacion+",'arrModPro':"+strJsonGrid+"}";
				        	var objjson = Ext.util.JSON.decode(strJsonActTar);
			        		if (typeof(objjson) == 'object') {
			        			var parametros ='ObjSon='+strJsonActTar;
			    	        	Ext.Ajax.request({
			    	        		url: '../../controlador/mrh/sigesp_ctr_mrh_programacion.php',
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
			    							nuevaProgramacion();
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
		        	else {
	        			Ext.Msg.show({
    						title:'Mensaje',
    						msg: 'Debe agregar al menos una tarea',
    						buttons: Ext.Msg.OK,
    						icon: Ext.MessageBox.WARNING
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
	        tooltip:'Le permite buscar una programaci&#243;n',
	        iconCls:'barrabuscar',
	        handler: function() {
	        	nuevaProgramacion();
	        	function cargarTareas() {
	        		var myJSONObject = {"operacion":"OBT_TAR",
	        							"numpro":Ext.getCmp('numpro').getValue(),
	        							"cliente":Ext.getCmp('rifcli').getValue()};
	        		var ObjSon=Ext.util.JSON.encode(myJSONObject);
	        		var parametros ='ObjSon='+ObjSon;
	        		Ext.Ajax.request({
	        			url: '../../controlador/mrh/sigesp_ctr_mrh_programacion.php',
	        			params: parametros,
	        			method: 'POST',
	        			success: function ( result, request ) {
	        				var datos = result.responseText;
	        				var datos = datos.split("|");
	        				var objDataAct = eval('(' + datos[0] + ')');
	        				var objDataCon = eval('(' + datos[1] + ')');
	        				gridTareas.store.loadData(objDataAct);
	        				dsContrato.loadData(objDataCon);
	        				Ext.getCmp('codcon').setValue(Ext.getCmp('codcon').getValue());
	        				calcularTotal();
	        				Ext.getCmp('catalogo').setValue('1');
	        			},
	        			failure: function ( result, request){ 
	        					Ext.MessageBox.alert('Error', 'Error de comunicacion con el servidor'); 
	        			}
	        		});
	        	}
	        	
	        	var reProgramacion = Ext.data.Record.create([
	        		{name: 'numpro'},
	        		{name: 'rifcli'},
	        		{name: 'razsoc'},
	        		{name: 'logcon'},
	        		{name: 'nomcon'},
	        		{name: 'codcon'},
	        		{name: 'tipcon'},
	        		{name: 'tipact'},
	        		{name: 'fecpro'}
	        	]);
	        	
	        	var dsProgramacion =  new Ext.data.Store({
	        		reader: new Ext.data.JsonReader({root: 'raiz',id: "id"},reProgramacion)
	        	});
	        						
	        	var cmProgramacion = new Ext.grid.ColumnModel([
	                {header: "N&#250;mero", width: 20, sortable: true,   dataIndex: 'numpro'},
	                {header: "Fecha", width: 40, sortable: true, dataIndex: 'fecpro'},
	                {header: "Cliente", width: 40, sortable: true, dataIndex: 'razsoc'}
	            ]);
	        	
	        	
	        	var comCatProgramacion = new com.gerco.vista.comCatalogo({
	        		titvencat: 'Catalogo de Programaci&#243;n de Actividades',
	        		anchoformbus: 450,
	        		altoformbus:130,
	        		anchogrid: 450,
	        		altogrid: 400,
	        		anchoven: 500,
	        		altoven: 400,
	        		datosgridcat: dsProgramacion,
	        		colmodelocat: cmProgramacion,
	        		arrfiltro:[{etiqueta:'N&#250;mero',id:'numprogra',valor:'numpro'},
	        				   {etiqueta:'Cliente',id:'razsocial',valor:'razsoc'}],
	        		rutacontrolador:'../../controlador/mrh/sigesp_ctr_mrh_programacion.php',
	        		parametros: "ObjSon={'operacion': 'BUS_PRO'",
	        		tipbus:'P',
	        		setdatastyle:'F',
	        		formulario:plProgramacion,
	        		onAceptar:true,
	        		fnOnAceptar: cargarTareas
	        	});
	        	
	        	comCatProgramacion.mostrarVentana();
	        }
  		},{
  			text:'Eliminar',
	        tooltip:'Eliminar programaci&#243;n',
	        iconCls:'barraeliminar',
	        handler: function() {
	        	Ext.Msg.show({
	        		title:'Confirmar',
	     		   	msg: 'Desea eliminar este registro?',
	     		   	buttons: Ext.Msg.YESNO,
	     		   	icon: Ext.MessageBox.QUESTION,
	     		   	fn: function(btn) {
	     		   		if (btn == 'yes') {
		     		   		var myJSONObject = {"operacion":"ELI_PRO", "numpro":Ext.getCmp('numpro').getValue()};
		    				var ObjSon=Ext.util.JSON.encode(myJSONObject);
		    				var parametros ='ObjSon='+ObjSon;
		    				Ext.Ajax.request({
		    					url: '../../controlador/mrh/sigesp_ctr_mrh_programacion.php',
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
		    							nuevaProgramacion();
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
					fieldLabel:'N&#250;mero',
					style:'font-weight: bold; border:none;background:#f1f1f1',
					id:'numpro',
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
				layout: "form",
				border: false,
				labelWidth: 130,
				items: [cmbContrato]
			}]
		},comtcConsultor.fieldsetCatalogo,
		{
			layout: "column",
			defaults: {border: false},
			style: 'position:absolute;left:15px;top:145px',
			items: [{
				width: 350,
				layout: "form",
				border: false,
				labelWidth: 130,
				items: [cmbTipoActividad]
			},{
				width: 250,
				layout: "form",
				border: false,
				labelWidth: 100,
				style: 'padding-left:15px',
				items: [{
					xtype:"datefield",
    				fieldLabel:"Fecha",
					labelSeparator :'',
    				width:100,
					id:"fecpro",
					readOnly: true,
					binding:true,
					hiddenvalue:'',
					defaultvalue:'',
					allowBlank:false,
				}]
			}]
		},gridTareas,
		{
			layout: "column",
			defaults: {border: false},
			style: 'position:absolute;left:550px;top:340px',
			items: [{
				layout: "form",
				border: false,
				labelWidth: 90,
				items: [{
					xtype:'textfield',
					fieldLabel:'Total Horas',
					style:'font-weight: bold; border:none;background:#f1f1f1',
					id:'tothor',
					value:'0',
					width:150,
					labelSeparator:'',
				}]
			}]
		}]
	});
	
	function nuevaProgramacion() {
		limpiarFormulario(plProgramacion);
    	var myJSONObject = {"operacion":"OBT_NUM"};
    	var ObjSon=Ext.util.JSON.encode(myJSONObject);
    	var parametros ='ObjSon='+ObjSon;
    	Ext.Ajax.request({
    		url: '../../controlador/mrh/sigesp_ctr_mrh_programacion.php',
    		params: parametros,
    		method: 'POST',
    		success: function ( result, request ) {
    			var numero = result.responseText;
    			Ext.getCmp('numpro').setValue(numero);
    			gridTareas.store.removeAll();
    		},
    		failure: function ( result, request){ 
    				Ext.MessageBox.alert('Error', 'Error de comunicacion con el servidor'); 
    		}
    	});
	}
});