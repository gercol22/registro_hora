Ext.onReady(function(){
	Ext.BLANK_IMAGE_URL = '../../base/librerias/js/ext/resources/images/default/s.gif';
	
	function buscarTarPro() {
		var myJSONObject = {"operacion":"TAR_PRO","numpro":Ext.getCmp('numpro').getValue()};
		var ObjSon=Ext.util.JSON.encode(myJSONObject);
		var parametros ='ObjSon='+ObjSon;
		Ext.Ajax.request({
			url: '../../controlador/mrh/sigesp_ctr_mrh_registroactividad.php',
			params: parametros,
			method: 'POST',
			success: function ( result, request ) {
				var datos = result.responseText;
				var objData = eval('(' + datos + ')');
				gridTareas.store.loadData(objData);
				calcularTotal();
			},
			failure: function ( result, request){ 
					Ext.MessageBox.alert('Error', 'Error de comunicacion con el servidor'); 
			}
		});
	}
	
	//creando datastore y columnmodel para el catalogo programacion
	var reProgramacion = Ext.data.Record.create([
		{name: 'numpro'},
		{name: 'fecpro'},
		{name: 'rifcli'},
		{name: 'razsoc'},
		{name: 'tipact'},
		{name: 'codcon'}
	]);
	
	var dsProgramacion =  new Ext.data.Store({
		reader: new Ext.data.JsonReader({root: 'raiz',id: "id"},reProgramacion)
	});
						
	var cmProgramacion = new Ext.grid.ColumnModel([
	    {header: "N&#250mero", width: 20, sortable: true,   dataIndex: 'numpro'},
		{header: "Fecha", width: 40, sortable: true, dataIndex: 'fecpro'},
		{header: "Cliente", width: 40, sortable: true, dataIndex: 'razsoc'}
	]);
	//fin creando datastore y columnmodel para el catalogo programacion
	
	//componente campocatalogo para el campo programacion
	var comtcProgramacion = new com.gerco.vista.comCampoCatalogo({
		titvencat: 'Programaci&#243;n de Actividades',
		anchoformbus: 450,
		altoformbus:130,
		anchogrid: 450,
		altogrid: 350,
		anchoven: 500,
		altoven: 420,
		anchofieldset:850,
		datosgridcat: dsProgramacion,
		colmodelocat: cmProgramacion,
		rutacontrolador:'../../controlador/mrh/sigesp_ctr_mrh_registroactividad.php',
		parametros: "ObjSon={'operacion': 'OBT_PRO'}",
		arrfiltro:[{etiqueta:'N&#250mero',id:'numprog',valor:'numpro'},
				   {etiqueta:'Cliente',id:'razonsoc',valor:'razsoc'}],
		posicion:'position:absolute;left:5px;top:30px',
		tittxt:'Programaci&#243;n',
		idtxt:'numpro',
		campovalue:'numpro',
		anchoetiquetatext:130,
		anchotext:130,
		anchocoltext:0.40,
		idlabel:'desporgra',
		labelvalue:'desprog',
		anchocoletiqueta:0.53,
		anchoetiqueta:250,
		tipbus:'L',
		binding:'C',
		hiddenvalue:'',
		defaultvalue:'------',
		allowblank:true,
		datosadicionales: 1,
		camposoadicionales : [{tipo:'cadena',id:'tipact'},{tipo:'cadena',id:'rifcli'},{tipo:'cadena',id:'razsoc'},{tipo:'cadena',id:'codcon'}],
		onAceptar: true,
		fnOnAceptar: buscarTarPro
	});
	//fin componente campocatalogo para el campo programacion
	
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
	
	//componente campocatalogo para el campo programacion
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
		rutacontrolador:'../../controlador/mrh/sigesp_ctr_mrh_registroactividad.php',
		parametros: "ObjSon={'operacion': 'OBT_CLI'",
		arrfiltro:[{etiqueta:'RIF',id:'rifclie',valor:'rifcli'},
				   {etiqueta:'Raz&#243;n Social',id:'razsoci',valor:'razsoc'}],
		posicion:'position:absolute;left:5px;top:65px',
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
		allowblank:false,
	});
	//fin componente campocatalogo para el campo programacion
	
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
		displayField:'descripcion',
		valueField:'codigo',
        id:'codmod',
        listWidth : 200,
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
	
	//Etiqueta tipo situacion
	function tipoSituacion(codigo) {
		switch (codigo) {
			case 'I1':
				return 'Error Usuario (Configuraci&#243;n)';
				break;
				
			case 'I2':
				return 'Error Usuario (Procedimiento)';
				break;
				
			case 'I3':
				return 'Error Sistema';
				break;
				
			case 'I4':
				return 'Error Data';
				break;
				
			case 'I5':
				return 'Nuevo Requerimiento';
				break;
			
			case 'I6':
				return 'Entrenamiento / Otros';
				break;
		}
	}
	
	//registro y store de la grid de tareas
	reTarea = Ext.data.Record.create([
	    {name: 'codmod'},    
	    {name: 'canhor'},
	    {name: 'desact'},
	    {name: 'casman'},
	    {name: 'desinc'},
	    {name: 'tipinc'},
	    {name: 'estbdt'}
	]);
	
	var dsTarea =  new Ext.data.Store({
		reader: new Ext.data.JsonReader({root: 'raiz',id: "id"},reTarea)
	});
	
	//Grid de tareas por modulo
	var gridTareas = new Ext.grid.EditorGridPanel({
		title: "<H1 align='center'>Tareas Realizadas</H1>",
		width:800,
	    height:150,
	    frame:true,
	    style: 'position:absolute;left:15px;top:210px',
	    ds: dsTarea,
       	cm: new Ext.grid.ColumnModel([
            {header: "M&#243;dulo", width: 20, sortable: true, dataIndex: 'codmod',editor : cmbModulo},
            {header: "Situaci&#243;n Planteada / Asignaci&#243;n", width: 40, sortable: true, dataIndex: 'desinc',editor : new Ext.form.TextArea()},
            {header: "Tipo Situaci&#243;n", width: 40, sortable: true, dataIndex: 'tipinc',editor : cmbTipInc, renderer :tipoSituacion},
            {header: "Descripci&#243;n", width: 60, sortable: true, dataIndex: 'desact',editor : new Ext.form.TextArea()},
            {header: "Caso mantis", width: 20, setEditable: true, sortable: true, dataIndex: 'casman',editor : new Ext.form.NumberField({allowBlank : true,decimalPrecision : 2,decimalSeparator : ','})},
            {header: "Cant. Horas", width: 20, setEditable: true, sortable: true, dataIndex: 'canhor',editor : new Ext.form.NumberField({allowBlank : true,decimalPrecision : 2,decimalSeparator : ','})}
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
					'desinc':'',
					'tipinc':'',
					'canhor':'0',
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
            handler: function() {
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
		                			var myJSONObject = {"operacion":"ELI_TAR","codmod":regEliminar.get('codmod'),"numact":Ext.getCmp('numact').getValue()};
		                			var ObjSon=Ext.util.JSON.encode(myJSONObject);
		                			var parametros ='ObjSon='+ObjSon;
		                			Ext.Ajax.request({
		                				url: '../../controlador/mrh/sigesp_ctr_mrh_registroactividad.php',
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
			var valor = String(registrostore.get('canhor')).replace(',','.');
			totalHora = totalHora + parseFloat(valor);
		});
		Ext.getCmp('tothor').setValue(totalHora);
	}
	
	gridTareas.on('afteredit', function(Obj) {
		if (Obj.value != '' && Obj.field == 'canhor') {
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
	var rolcon = '';
	var myJSONObject = {"operacion":"DAT_INI"};
	var ObjSon=Ext.util.JSON.encode(myJSONObject);
	var parametros ='ObjSon='+ObjSon;
	Ext.Ajax.request({
		url: '../../controlador/mrh/sigesp_ctr_mrh_registroactividad.php',
		params: parametros,
		method: 'POST',
		success: function ( result, request ) {
			var datos = result.responseText;
			var datos = datos.split("|");;
			var objDataAct = eval('(' + datos[0] + ')');
			var objDataTip = eval('(' + datos[1] + ')');
			var objDataMod = eval('(' + datos[2] + ')');
			dsTipoActividad.loadData(objDataAct);
			dsModulo.loadData(objDataMod);
			dsTipInc.loadData(objDataTip);
			Ext.getCmp('numact').setValue(datos[3]);
			rolcon = datos[4];
		},
		failure: function ( result, request){ 
				Ext.MessageBox.alert('Error', 'Error de comunicacion con el servidor'); 
		}
	});
	
	//PANEL PRINCIPAL REGISTRO DE ACTIVIDADES
	var plActividad = new Ext.FormPanel({
		title: "<H1 align='center'>Registro de Actividades</H1>",
		style: 'position:relative;top:10px;left:100px', 
		height: 460,
		width: 850,
	   	applyTo:'formulario',
	   	frame: true,
	   	//bodyStyle:'padding:15px 15px 0',
	   	tbar:[{
	   		text:'Nuevo',
            tooltip:'Registrar nueva actividad',
            iconCls:'barralimpiar',
            handler: function() {
            	nuevaActividad();
			}
  		},{
  			text:'Guardar',
	        tooltip:'Inserta o modifica una actividad',
	        iconCls:'barraguardar',
	        handler: function() {
	        	try {
	        		if(Ext.getCmp('estfac').getValue() != '1') {
		        		var strJsonActividad = getJsonFormulario(plActividad);
		        		var dataTarea = gridTareas.getStore(); 
			        	if(dataTarea.getCount() > 0) {
				        	var arrCampos = [{etiqueta:'M&#243;dulo', campo:'codmod', tipo:'s', requerido: true},
				        	                 {etiqueta:'Situaci&#243;n Planteada / Asignaci&#243;n', campo:'desinc', tipo:'s', requerido: true},
				        	                 {etiqueta:'Tipo Situaci&#243;n', campo:'tipinc', tipo:'s', requerido: true},
				        	                 {etiqueta:'Descripci&#243;n', campo:'desact', tipo:'s', requerido: true},
				        	                 {etiqueta:'Descripci&#243;n', campo:'desact', tipo:'s', requerido: true},
				        					 {etiqueta:'Caso mantis', campo:'casman', tipo:'s', requerido: false},
				        					 {etiqueta:'Cant. Horas', campo:'canhor', tipo:'n', requerido: true}];
				        	var strJsonGrid = getJsonGrid(dataTarea, arrCampos);
				        	if(strJsonGrid != false) {
				        		var operacion = '';
				        		if (Ext.getCmp('catalogo').getValue() == '0') {
				        			operacion = 'INS_ACT';
				        		}
				        		else {
				        			operacion = 'MOD_ACT';
				        		}
				        		var strJsonActTar = "{'operacion':'"+operacion+"',"+strJsonActividad+",'arrModAct':"+strJsonGrid+"}";
					        	var objjson = Ext.util.JSON.decode(strJsonActTar);
				        		if (typeof(objjson) == 'object') {
				        			var parametros ='ObjSon='+strJsonActTar;
				    	        	Ext.Ajax.request({
				    	        		url: '../../controlador/mrh/sigesp_ctr_mrh_registroactividad.php',
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
				    							nuevaActividad();
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
	        		else {
	        			Ext.Msg.show({
    						title:'Mensaje',
    						msg: 'Esta actividad fue maracada para facturar no puede ser modificada',
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
	        tooltip:'Le permite buscar una actividad',
	        iconCls:'barrabuscar',
	        handler: function() {
	        	nuevaActividad();
	        	function cargarTareas() {
	        		var myJSONObject = {"operacion":"OBT_TAR",
	        							"numact":Ext.getCmp('numact').getValue()};
	        		var ObjSon=Ext.util.JSON.encode(myJSONObject);
	        		var parametros ='ObjSon='+ObjSon;
	        		Ext.Ajax.request({
	        			url: '../../controlador/mrh/sigesp_ctr_mrh_registroactividad.php',
	        			params: parametros,
	        			method: 'POST',
	        			success: function ( result, request ) {
	        				var datos = result.responseText;
	        				var objDataAct = eval('(' + datos + ')');
	        				gridTareas.store.loadData(objDataAct);
	        				calcularTotal();
	        				Ext.getCmp('catalogo').setValue('1');
	        			},
	        			failure: function ( result, request){ 
	        					Ext.MessageBox.alert('Error', 'Error de comunicacion con el servidor'); 
	        			}
	        		});
	        	}
	        	
	        	var reActividad = Ext.data.Record.create([
	        		{name: 'numact'},
	        		{name: 'numpro'},
	        		{name: 'rifcli'},
	        		{name: 'razsoc'},
	        		{name: 'tipact'},
	        		{name: 'fecact'},
	        		{name: 'estvis'},
	        		{name: 'rescli'},
	        		{name: 'estfac'}
	        	]);
	        	
	        	var dsActividad =  new Ext.data.Store({
	        		reader: new Ext.data.JsonReader({root: 'raiz',id: "id"},reActividad)
	        	});
	        						
	        	var cmActividad = new Ext.grid.ColumnModel([
	                {header: "N&#250;mero", width: 20, sortable: true,   dataIndex: 'numact'},
	                {header: "Fecha", width: 40, sortable: true, dataIndex: 'fecact'},
	                {header: "Cliente", width: 40, sortable: true, dataIndex: 'razsoc'}
	            ]);
	        	
	        	
	        	var comCatActividad = new com.gerco.vista.comCatalogo({
	        		titvencat: 'Catalogo de Actividades',
	        		anchoformbus: 450,
	        		altoformbus:130,
	        		anchogrid: 450,
	        		altogrid: 400,
	        		anchoven: 500,
	        		altoven: 400,
	        		datosgridcat: dsActividad,
	        		colmodelocat: cmActividad,
	        		arrfiltro:[{etiqueta:'N&#250;mero',id:'numactiv',valor:'numact'},
	        				   {etiqueta:'Cliente',id:'razsocial',valor:'razsoc'}],
	        		rutacontrolador:'../../controlador/mrh/sigesp_ctr_mrh_registroactividad.php',
	        		parametros: "ObjSon={'operacion': 'BUS_ACT'",
	        		tipbus:'P',
	        		setdatastyle:'F',
	        		formulario:plActividad,
	        		onAceptar:true,
	        		fnOnAceptar: cargarTareas
	        	});
	        	
	        	comCatActividad.mostrarVentana();
	        }
  		},{
  			text:'Imprimir',
	        tooltip:'Imprimir informe de actividad',
	        iconCls:'barraimprimir',
	        handler: function() {
	        	var numact = Ext.getCmp('numact').getValue();
	        	var pagina = "reportes/sigesp_vis_rpp_informeactividad.php?numact="+numact;
	        	window.open(pagina,"Reporte","menubar=no,toolbar=no,scrollbars=yes,width=800,height=600,left=0,top=0,location=no,resizable=yes");
	        }
  		},{
  			text:'Eliminar',
	        tooltip:'Eliminar actividad',
	        iconCls:'barraeliminar',
	        handler: function() {
	        	Ext.Msg.show({
	        		title:'Confirmar',
	     		   	msg: 'Desea eliminar este registro?',
	     		   	buttons: Ext.Msg.YESNO,
	     		   	icon: Ext.MessageBox.QUESTION,
	     		   	fn: function(btn) {
	     		   		if (btn == 'yes') {
	     		   			if(rolcon == 'A') {
		    		        	if(Ext.getCmp('estfac').getValue() != '1') {
		    			        	var myJSONObject = {"operacion":"ELI_ACT", "numact":Ext.getCmp('numact').getValue()};
		    						var ObjSon=Ext.util.JSON.encode(myJSONObject);
		    						var parametros ='ObjSon='+ObjSon;
		    						Ext.Ajax.request({
		    							url: '../../controlador/mrh/sigesp_ctr_mrh_registroactividad.php',
		    							params: parametros,
		    							method: 'POST',
		    							success: function ( result, request ) {
		    								var respuesta = result.responseText;
		    		    					if (respuesta == 1) {
		    		    						Ext.Msg.show({
		    			    						title:'Mensaje',
		    			    						msg: 'La actividad fue eliminada exitosamente',
		    			    						buttons: Ext.Msg.OK,
		    			    						icon: Ext.MessageBox.INFO
		    			    					});
		    									nuevaActividad();
		    								}
		    								else {
		    									Ext.Msg.show({
		    			    						title:'Mensaje',
		    			    						msg: 'Ocurrio un error al tratar de eliminar la actividad',
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
		    							msg: 'Esta actividad fue maracada para facturar no puede ser eliminada',
		    							buttons: Ext.Msg.OK,
		    							icon: Ext.MessageBox.WARNING
		    						});
		    	        		}
		    	        	}
		    	        	else {
		    	        		Ext.Msg.show({
		    						title:'Mensaje',
		    						msg: 'Debe ser administrador para eliminar una actividad',
		    						buttons: Ext.Msg.OK,
		    						icon: Ext.MessageBox.WARNING
		    					});
		    	        	}
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
			xtype: 'hidden',
			id: 'estfac',
			value:'0'
		},{
			xtype: 'hidden',
			id: 'codcon',
			value:'----',
			binding:true
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
					id:'numact',
					width:150,
					labelSeparator:'',
					binding:true,
					hiddenvalue:'',
					defaultvalue:'',
					allowBlank:false
				}]
			}]
		},comtcProgramacion.fieldsetCatalogo,
		comtcCliente.fieldsetCatalogo,
		{
			layout: "column",
			defaults: {border: false},
			style: 'position:absolute;left:15px;top:110px',
			items: [{
				width: 400,
				layout: "form",
				border: false,
				labelWidth: 130,
				items: [cmbTipoActividad]
			},{
				width: 400,
				layout: "form",
				border: false,
				labelWidth: 100,
				style: 'padding-left:15px',
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
		},{
			layout: "column",
			defaults: {border: false},
			style: 'position:absolute;left:15px;top:140px',
			items: [{
				layout: "form",
				border: false,
				labelWidth: 130,
				items: [{
		            xtype: "checkbox",
		            fieldLabel: "Visita",
		            labelSeparator: '',
		            id: 'estvis',
		           	inputValue: '1',
		           	defaultValue: '0',
		           	binding:true,
		           	listeners: {
						'check': function(obj, value) {
							if(value){
								Ext.getCmp('rescli').enable();
							}
							else {
								Ext.getCmp('rescli').reset();
								Ext.getCmp('rescli').disable();
							}
						}
		           	}
		        }]
			}]
		},{
			layout: "column",
			defaults: {border: false},
			style: 'position:absolute;left:15px;top:170px',
			items: [{
				layout: "form",
				border: false,
				labelWidth: 130,
				items: [{
					xtype: 'textfield',
					fieldLabel: 'Responsable Cliente',
					labelSeparator :'',
					id: 'rescli',
					width: 400,
					binding:true,
					hiddenvalue:'',
					defaultvalue:'',
					allowBlank:true,
					disabled:true
				}]
			}]
		},gridTareas,
		{
			layout: "column",
			defaults: {border: false},
			style: 'position:absolute;left:650px;top:370px',
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
	
	function nuevaActividad() {
		limpiarFormulario(plActividad);
    	var myJSONObject = {"operacion":"OBT_NUM"};
    	var ObjSon=Ext.util.JSON.encode(myJSONObject);
    	var parametros ='ObjSon='+ObjSon;
    	Ext.Ajax.request({
    		url: '../../controlador/mrh/sigesp_ctr_mrh_registroactividad.php',
    		params: parametros,
    		method: 'POST',
    		success: function ( result, request ) {
    			var numero = result.responseText;
    			Ext.getCmp('numact').setValue(numero);
    			gridTareas.store.removeAll();
    			Ext.getCmp('rescli').disable();
    		},
    		failure: function ( result, request){ 
    				Ext.MessageBox.alert('Error', 'Error de comunicacion con el servidor'); 
    		}
    	});
	}
});