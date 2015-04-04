Ext.onReady(function(){
	Ext.QuickTips.init();
	Ext.BLANK_IMAGE_URL = '../../base/librerias/js/ext/resources/images/default/s.gif';
	//definicion de opciones del menu sigesp
	var menuRegistroHoras = new Ext.menu.Menu({
		id: 'mainMenu'
	});
	
	var salir = new  Ext.menu.Item({
		text: 'Salir',
		id:'salir',
	   	iconCls: 'menusalir',
		hrefTarget: '_parent',
		href:'../../index.html' 
	});
	
	var regAct = new  Ext.menu.Item({
		text: 'Registro Actividades',
		id:'regAct',
       	iconCls: 'menuproceso',
       	href: 'sigesp_vis_mrh_registroactividad.html'
	});
	
	var proAct = new  Ext.menu.Item({
		text: 'Programaci&#243;n',
		id:'proAct',
       	iconCls: 'menuproceso',
       	href: 'sigesp_vis_mrh_programacion.html'
	});
	
	var impHor = new  Ext.menu.Item({
		text: 'Imputar Horas',
		id:'impHor',
       	iconCls: 'menuproceso',
       	href: 'sigesp_vis_mrh_imputarhora.html'
	});
	
	menuRegistroHoras.addItem(salir);
	
	
	//Definiciones
	var menuDefinicion = new Ext.menu.Menu({
		id: 'men_def'
	});
	
	var cliente = new  Ext.menu.Item({
		text: 'Cliente',
		id:'cliente',
       	iconCls: 'menudefinicion',
       	href: 'sigesp_vis_mrh_cliente.html'
	});
	
	var contrato = new  Ext.menu.Item({
		text: 'Contrato',
		id:'contrato',
       	iconCls: 'menudefinicion',
       	href: 'sigesp_vis_mrh_contrato.html'
	});
	
	var consultor = new  Ext.menu.Item({
		text: 'Consultor',
		id:'consultor',
       	iconCls: 'menudefinicion',
       	href: 'sigesp_vis_mrh_consultor.html'
	});
	
	//Reportes
	var menuReporte = new Ext.menu.Menu({
		id: 'men_rep'
	});
	
	var totalHora = new  Ext.menu.Item({
		text: 'Total Horas',
		id:'totHor',
       	iconCls: 'menureporte',
       	href: 'sigesp_vis_mrh_totalhora.html'
	});
	
	var listadoActividad = new  Ext.menu.Item({
		text: 'Listado de Actividades',
		id:'lisAct',
       	iconCls: 'menureporte',
       	href: 'sigesp_vis_mrh_listadoactividad.html'
	});
	
	var listadoProgramacion = new  Ext.menu.Item({
		text: 'Listado de Programaciones',
		id:'lisPro',
       	iconCls: 'menureporte',
       	href: 'sigesp_vis_mrh_listadoprogramacion.html'
	});
	
	var listadoContrato = new  Ext.menu.Item({
		text: 'Listado de Contratos',
		id:'lisCon',
       	iconCls: 'menureporte',
       	href: 'sigesp_vis_mrh_listadocontrato.html'
	});
	
	var listadoCliente = new  Ext.menu.Item({
		text: 'Listado de Cliente',
		id:'lisCli',
       	iconCls: 'menureporte',
       	href: 'sigesp_vis_mrh_listadohora.html'
	});
	
	
		
	// Tool Bar que va a obtener las Opciones de Menu
	var barramenu = new Ext.Toolbar();
	
	barramenu.render('menu_principal');
	barramenu.add({
		text:'Registro Horas',
        iconCls: 'menuprincipal', 
        menu: menuRegistroHoras
    });
	
	var myJSONObject = {'operacion': 'VALIDAR_SESSION'};
		
	var ObjSon = Ext.util.JSON.encode(myJSONObject);
	var parametros = 'objetoData='+ObjSon; 
	Ext.Ajax.request({
		url : '../../controlador/mcu/sigesp_ctr_mcu_menuprincipal.php',
		params : parametros,
		method: 'POST',
		success: function ( resultado, request) {
			var datos  = resultado.responseText;
			var	resultado = datos.split("|");
			if(resultado[0] == '1') {
				if(resultado[1] == 'A') {
					//PROCESOS
					menuRegistroHoras.addItem(regAct);
					menuRegistroHoras.addItem(proAct);
					menuRegistroHoras.addItem(impHor);
					//DEFINICIONES
					menuDefinicion.addItem(cliente);
					menuDefinicion.addItem(contrato);
					menuDefinicion.addItem(consultor);
					menuRegistroHoras.add({
						text:'Definiciones',
				        iconCls: 'menuprincipal', 
				        menu: menuDefinicion
				    });
					//REPORTES
					menuReporte.addItem(totalHora);
					menuReporte.addItem(listadoActividad);
					menuReporte.addItem(listadoProgramacion);
					menuReporte.addItem(listadoContrato);
					menuReporte.addItem(listadoCliente);
					menuRegistroHoras.add({
						text:'Reportes',
				        iconCls: 'menuprincipal', 
				        menu: menuReporte
				    });
				}
				else if (resultado[1] == 'B') {
					menuDefinicion.addItem(cliente);
					menuDefinicion.addItem(contrato);
					menuRegistroHoras.add({
						text:'Definiciones',
				        iconCls: 'menuprincipal', 
				        menu: menuDefinicion
				    });
				}
				else if (resultado[1] == 'T' ||  resultado[1] == 'F') {
					menuRegistroHoras.addItem(regAct);
				}
			}
			else {
				location.href="../../index.html";
			}
			
			itemNomCon = new  Ext.menu.Item({
				text: resultado[2],
				iconCls: 'menuusuarios'
		       	
			});
			barramenu.add(itemNomCon);
		},
		failure: function (resultado,request){ 
			Ext.MessageBox.alert('Error', request); 
		}
	});
	
});