/***********************************************************************************
* @Archivo JavaScript que incluye un componente que construye una grid con un catalogo 
* asociado para insertar la data en dicho grid  
* @fecha de creacion: 19/08/2009
* @autor: Ing. Gerardo Cordero
************************************************************************************
* @fecha modificacion:
* @descripcion:
* @autor:
***********************************************************************************/
Ext.namespace('com.gerco.vista');

com.gerco.vista.comListaFormulario = function(options) {
	this.registroVacio = options.registroVacio;
	if(options.guardarEliminados) {
		this.dataStoreEliminados = 	 new Ext.data.Store({
			reader: new Ext.data.JsonReader({root: 'raiz',id: "id"},options.rgeliminar)
		});
	}
	this.fnOnAceptar = options.fnOnAceptar;
		
	//Creando formulario de entrada de datos
	this.formDataIn = options.formDataIn
	//Fin creando formulario de entrada de datos
		
	//Eventos de la ventana catalogo
	this.cerrarVentana = function(){
		this.venDataIn.hide();
	}
	
	this.mostrarVentana = function(){
		this.venDataIn.show();
	}
	
	this.setDataGrid = function(){
		this.dataGrid.getStore().insert(0,this.registroVacio);
		for (var i = 0; i < options.arrConfVal.length; i++) {
			this.registroVacio.set(options.arrConfVal[i].campo, Ext.getCmp(options.arrConfVal[i].idtxt).getValue());
		}
		
		if(options.onAceptar){
			this.fnOnAceptar();
		}
		
		this.venDataIn.hide();
		limpiarFormulario(this.formDataIn);
	}
	//Fin de los eventos de la ventana catalogo
	
		
	//Creando la instacia de la window para la ventana del formulario
	this.venDataIn = new Ext.Window({
		title: options.titven,
		autoScroll:true,
    	width:options.anchoven,
    	height:options.altoven,
    	modal: true,
    	closable:false,
    	plain: false,
		items:[this.formDataIn],
		buttons: [{
			text:'Aceptar',  
		    handler: this.setDataGrid.createDelegate(this)
		},{
			text: 'Salir',
			handler:this.cerrarVentana.createDelegate(this)
		}]
	});
	//Fin creando la instacia de la window para la ventana del formulario
	
	//Creando funcion para la eliminacion de registros de la grid
	this.eliminarRegistro = function (){
		var arregloregistros = this.dataGrid.getSelectionModel().getSelections();
		if (arregloregistros.length >0){
			for (var i = arregloregistros.length - 1; i >= 0; i--){
				this.dataGrid.getStore().remove(arregloregistros[i]);
				if(arregloregistros[i].get('registrocat')!='1' && options.guardarEliminados){
					this.dataStoreEliminados.add(arregloregistros[i]);
				}
			};
		}
	}
	
	//Fin creando funcion para la eliminacion de registros de la grid
	
	//Creando grid de datos que se llenara con el catalgo
	this.dataGrid =new Ext.grid.GridPanel({
		id: options.idgrid,
		width:options.ancho,
        height:options.alto,
       	style:options.posicion,
        title:options.titgrid,
	    ds: options.datosgrid,
       	cm: options.colmodelo,
       	sm: options.selmodelo,
        frame:true,
       	viewConfig: {forceFit:true},
        columnLines: true,
        tbar:[{
        	text:'Agregar',
            tooltip:'Agregar un registro',
            iconCls:'agregar',
            id:'agregar',
			handler: this.mostrarVentana.createDelegate(this)
        }, '-', {
            text:'Eliminar',
            tooltip:'Eliminar un registro',
            iconCls:'remover',
            id:'remover',
			handler: this.eliminarRegistro.createDelegate(this)
		}]
	});
	//Fin creando grid de datos que se llenara con el catalgo
}