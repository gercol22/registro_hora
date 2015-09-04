//patrones para formatear las fechas 
Date.patterns = {
    bdfechahora:"Y-m-d H:i:s",
    bdfecha:"Y-m-d",
    fechacorta: "d/m/Y",
	fechahoracorta: "d/m/Y H:i",
    fechalarga: "l, F d, Y",
    fullfechahora: "l, F d, Y g:i:s A",
    horacorta: "g:i ",
    horalarga: "g:i:s "
};
//fin patrones para formatear las fechas

function validarClave(clave)
{
	var patron = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
   	if(!patron.test(clave))
	{		
		Ext.MessageBox.alert('Error', 'La Contrase�a debe contener al menos una letra may�scula, al menos una letra min�scula, al menos un n�mero o car�cter especial, como m�nimo 8 caracteres y maximo 20 caracteres.');
		return false;
	}
   return true;
}

//--------------------------------------------------------
//	Funci�n que valida que no se incluyan comillas simples 
//	en los textos ya que da�a la consulta SQL
//--------------------------------------------------------
function trim(str)
{
	while(''+str.charAt(0)==' ')
	str=str.substring(1,str.length);
	while(''+str.charAt(str.length-1)==' ')
	str=str.substring(0,str.length-1);
	return str;
}
function ue_validarcarater(valor,caracter)
{
	val = valor.value;
	longitud = val.length;
	texto = "";
	textocompleto = "";
	for(r=0;r<=longitud;r++)
	{
		texto = valor.value.substring(r,r+1);
		if((texto != caracter)&&(texto != caracter))
		{
			textocompleto += texto;
		}	
	}
	return textocompleto;
}

function AgregarKeyPress(Obj)
{
		Ext.form.TextField.superclass.initEvents.call(Obj);
		if(Obj.validationEvent == 'keyup')
		{
			Obj.validationTask = new Ext.util.DelayedTask(Obj.validate, Obj);
			Obj.el.on('keyup', Obj.filterValidation, Obj);
		}
		else if(Obj.validationEvent !== false)
		{
			Obj.el.on(Obj.validationEvent, Obj.validate, Obj, {buffer: Obj.validationDelay});
		}
		if(Obj.selectOnFocus || Obj.emptyText)
		{
			Obj.on("focus", Obj.preFocus, Obj);
			if(Obj.emptyText)
			{
				Obj.on('blur', Obj.postBlur, Obj);
				Obj.applyEmptyText();
			}
		}
		if(Obj.maskRe || (Obj.vtype && Obj.disableKeyFilter !== true && (Obj.maskRe = Ext.form.VTypes[Obj.vtype+'Mask']))){
			Obj.el.on("keypress", Obj.filterKeys, Obj);
		}
		if(Obj.grow)
		{
			Obj.el.on("keyup", Obj.onKeyUp,  Obj, {buffer:50});
			Obj.el.on("click", Obj.autoSize,  Obj);
		}
			Obj.el.on("keyup", Obj.changeCheck, Obj);
}




/*******************************************************************
* @Función que valida un dato de acuerdo a 
* varios tipos de validación.
* @Parámetros: id: propiedad id del objeto del formulario a validar. 
* long longitud del campo, tipoVal: tipo de validación.
* @Valor de Retorno: 0 o 1 si fue correcto o no.
* @Autor: Johny Porras. 
* @Fecha de Creación: 15/05/2008
***************************************************************
* @fecha modificación: 16/05/2008  
* @Descripción: Agregar casos para validar nombres,telefono y correo.
* @autor: Gusmary Balza.                 
*********************************************************************/
function validarObjetos(id,tipoVal) 
{
	obj   = document.getElementById(id);
	arVal = tipoVal.split('|');
	for (i=0;i<arVal.length;i++)
	{
		switch(arVal[i])
		{
			case 'novacio':

				if ((trim(obj.value)=='') ||  (obj.value=='Seleccione'))
				{
					Ext.MessageBox.alert('Campos Vac&#237;os', 'Debe llenar el campo '+obj.name);
					return false;
				}
			break;
			case 'novaciodos':
				arrid=id.split('&');
				obj1 = document.getElementById(arrid[0]);
				obj2 =document.getElementById(arrid[1]);
				if((obj1.value=='' || obj1.value=='Seleccione') && (obj2.value=='' || obj2.value=='Seleccione'))
				{
					Ext.MessageBox.alert('Campos vac&#237;os', 'Debe llenar algun campo: '+obj1.name+' o '+obj1.name+' por favor');
					return false;
				}
			break;
			case 'nombre': //solo letras
				val = obj.value;
				longitud = val.length;
				validos='ABCDEFGHIJKLMN�OPQRSTUVWXYZ'+' ';
				if (longitud<3)
				{
				 	Ext.MessageBox.alert('Campo incorrecto', 'El campo '+obj.name+ ' no tiene la longitud correcta');
				 	return '0';
				}
				else
				{
				 	for(r=0;r<longitud;r++)
				 	{
			      		ch=val.charAt(r);					  
				  		if(validos.search(ch) == -1) //busca en la cadena validos el caracter ch
				  		{
				   			Ext.MessageBox.alert('Campo incorrecto', 'El campo '+obj.name+ ' debe contener s&#243;lo letras');
				   			return '0';
				  		}			
			     	}
				}
			break;
			
			case 'longexacta':
				val = obj.value;
				longitud = val.length;
				validos='ABCDEFGHIJKLMN�OPQRSTUVWXYZ'+' ';
				if ((longitud<long) || (longitud>long))
				{
				 	Ext.MessageBox.alert('Longitud incorrecta', 'El campo '+obj.name+ ' no tiene la longitud correcta');
				 	return '0';
				}
				else
				{
				 	for(r=0;r<longitud;r++)
				 	{
			      		ch=val.charAt(r);					  
				  		if (validos.search(ch) == -1) //busca en la cadena validos el caracter ch
				  		{
				   			Ext.MessageBox.alert('Campo incorrecto', 'El campo '+obj.name+ ' debe contener s&#243;lo letras');
				   			return '0';
				  		}			
			     	}
				}				
			break;
			
			case 'telefono':
				val = obj.value;	
			 	var er_tlf = /^\d{4}-\d{7}$/; //expresi�n regular para telefono con formato ejm: 0251-5555555
				if(!er_tlf.test(val))
				{
       			 	Ext.MessageBox.alert('Campo incorrecto', 'El campo '+obj.name+ ' es incorrecto');
				  	return '0';
            	}
			break;
			
			case 'vaciotelefono':
				val = obj.value;
				longitud = val.length;
				if ((longitud <= long) && longitud>0)
				{			
					var er_tlf = /^\d{4}-\d{7}$/; //expresi�n regular para telefono con formato ejm: 0251-5555555
					if (!er_tlf.test(val))
					{
						Ext.MessageBox.alert('Campo incorrecto', 'El campo '+obj.name+ ' es incorrecto');
						return '0';
					}
				}
			break;
			
			case 'email':
			   	val = obj.value;
			break;
			
			case 'vacioemail':
			   	val = obj.value;
				longitud = val.length;
				if ((longitud <= long) && longitud>0)
				{			
					var filtro=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; //expresi�n regular para emails
					if (!filtro.test(val)) //test compara la cadena val con la de la expresi�n regular
					{
						Ext.MessageBox.alert('Campos incorrectos', 'El campo '+obj.name+' es incorrecto');
						return '0';	
					}
				}
			break;
			
			case 'numero': //para solo numeros
				val = obj.value;
				longitud = val.length;
				if (longitud <= long)
				{			
					var er_numero=/^\d+$/; //expresi�n regular para solo digitos
					if (!er_numero.test(val))
					{
						Ext.MessageBox.alert('Tipo de dato incorrecto', 'El campo '+obj.name+' es incorrecto');
						return '0';	
					}
				}
				else
				{					
					Ext.MessageBox.alert('Longitud incorrecta', 'El campo '+obj.name+' no tiene la longitud correcta');
					return '0';	
				}
			break;
			
			case 'login':
				val = obj.value;
				var er_login = /^[a-zd_]{4,20}$/i; 
				if(!er_login.test(val))
				{
       			 	Ext.MessageBox.alert('Campo incorrecto', 'El campo '+obj.name+ ' es incorrecto');
				  	return '0';
            	}			
			break;
			
			case 'alfanumerico':  //solo numeros o letras, guiones y espacios
				val = obj.value;
				longitud = val.length;
				if (longitud <= long)
				{
				//	var er_validos = /^[a-zA-Z0-9\s.\-]+$/;
					validos='ABCDEFGHIJKLMN�OPQRSTUVWXYZ0123456789'+'-'+' ';

					for(r=0;r<longitud;r++)
				//	if (!er_validos.test(val))
					{
						ch=val.charAt(r);			  
						if(validos.search(ch) == -1)
						{
							Ext.MessageBox.alert('Tipo de dato incorrecto', 'El campo '+obj.name+ ' no debe contener caracteres especiales');
							return '0';
						}
					}
				}
				else
				{
					Ext.MessageBox.alert('Longitud incorrecta', 'El campo '+obj.name+' no tiene la longitud correcta');
					return '0';	
				}
		}
	}
	return '1';
}


//--------------------------------------------------------
//	Funci�n que rellena un campo con ceros a la izquierda
//--------------------------------------------------------
function ue_rellenarcampo(valor,maxlon)
{
	var total;
	var auxiliar;
	var longitud;
	var index;
	total=0;
    auxiliar=valor;
	longitud=valor.length;
	total=maxlon-longitud;
	if (total < maxlon)
	{
		for (index=0;index<total;index++)
		{
		   auxiliar="0"+auxiliar;      
		}
		valor = auxiliar;
	}
	return valor;
}

//--------------------------------------------------------
//	Funci�n que formatea un n�mero
//--------------------------------------------------------
function ue_formatonumero(fld, milSep, decSep, e)
{ 
	var sep = 0; 
    var key = ''; 
    var i = j = 0; 
    var len = len2 = 0; 
    var strCheck = '0123456789'; 
    var aux = aux2 = ''; 
    var whichCode = (window.Event) ? e.which : e.keyCode; 

	if (whichCode == 13) return true; // Enter 
	if (whichCode == 8) return true; // Return
    key = String.fromCharCode(whichCode); // Get key value from key code 
    if (strCheck.indexOf(key) == -1) return false; // Not a valid key 
    len = fld.value.length; 
    for(i = 0; i < len; i++) 
    	if ((fld.value.charAt(i) != '0') && (fld.value.charAt(i) != decSep)) break; 
    aux = ''; 
    for(; i < len; i++) 
    	if (strCheck.indexOf(fld.value.charAt(i))!=-1) aux += fld.value.charAt(i); 
    aux += key; 
    len = aux.length; 
    if (len == 0) fld.value = ''; 
    if (len == 1) fld.value = '0'+ decSep + '0' + aux; 
    if (len == 2) fld.value = '0'+ decSep + aux; 
    if (len > 2) { 
     aux2 = ''; 
     for (j = 0, i = len - 3; i >= 0; i--) { 
      if (j == 3) { 
       aux2 += milSep; 
       j = 0; 
      } 
      aux2 += aux.charAt(i); 
      j++; 
     } 
     fld.value = ''; 
     len2 = aux2.length; 
     for (i = len2 - 1; i >= 0; i--) 
     	fld.value += aux2.charAt(i); 
     fld.value += decSep + aux.substr(len - 2, len); 
    } 
    return false; 
}





 
   
   //-----------------------------------------------------
   // @Funcion que redondea un numero decimal a uno entero
   // @Autor: Johny Porras
   //----------------------------------------------------
  

   function redondear(numero)
    {
    	numero2='';
		numero=parseFloat(numero);

		numero=Math.ceil(numero*10)/10
		AuxString = numero.toString();
		if(AuxString.indexOf('.')>=0)
		{
			AuxArr=AuxString.split('.');
			if(AuxArr[1]>=5)
			{
				numero=Math.ceil(numero);
			}
			else
			{
				numero=Math.floor(numero);
			}
		}
	
			return numero;
	
	} 
   





/*********************************************************************************************************
  Funcion que valida los caracteres introducidos en una caja de texto
 *********************************************************************************************************/
function getKeyCode(e) {
	if (window.event)
       return window.event.keyCode;
    else if (e)
       return e.which;
    else
       return null;
}

function keyRestrict(e, validchars) {
	 var key='', keychar='';
	 key = getKeyCode(e);
	 if (key == null) return true;
	 keychar = String.fromCharCode(key);
	 keychar = keychar.toLowerCase();
	 validchars = validchars.toLowerCase();
	 if (validchars.indexOf(keychar) != -1)
	  return true;
	 if ( key==null || key==0 || key==8 || key==9 || key==13 || key==27 )
	  return true;
	 return false;
	}

function formatoNumericoMostrar(num,dec,thou,pnt,curr1,curr2,n1,n2) 
{
	if((isNaN(num))||(num == null) || (num == '')){num = 0}
	var x = Math.round(num * Math.pow(10,dec));
	if (x >= 0) n1=n2='';var y = (''+Math.abs(x)).split('');
	var z = y.length - dec; 
	if (z<0) z--; 
	for(var i = z; i < 0; i++) y.unshift('0'); 
	if (z<0) z = 1; 
	y.splice(z, 0, pnt); 
	if(y[0] == pnt) y.unshift('0'); 
	while (z > 3) {
		z-=3; y.splice(z,0,thou);
		}
	var r = curr1+n1+y.join('')+n2+curr2;
	
return r;
}

function ue_formato_operaciones(valor)
{
	valor=valor.toString();
	while (valor.indexOf('.')>0)
	{
		valor=valor.replace(".","");
	}
	valor=valor.replace(",",".");
	return valor;
	
}

function formatoNumericoEdicion(valor)
{
	 valor = valor.toString();
	 var cadena = valor.replace('.','','g');
	 cadena = cadena.replace(',','.');
	 
	return cadena;
}

function validarExistenciaRegistroGrid(registroEvaluar,gridDestino,claveOrigen,claveDestino,mostrarMensajeError)
{
 var existe = true;
 gridDestino.store.each(function (registroGrid){
	 if (trim(registroGrid.get(claveDestino)) == trim(registroEvaluar.get(claveOrigen)))
	 {
		 existe = false;
		 if(mostrarMensajeError)
		    {
		    	Ext.MessageBox.alert('Mensaje','El registro con codigo '+ registroEvaluar.get(claveOrigen) +' ya esta seleccionado');
		    }
		 return existe
	 }
 })
 return existe;
}

//----------------------------------------------------------------------------
//Funcion que valida si un registro existe en un store segun un arreglo de pk 
//-----------------------------------------------------------------------------
function validarExistenciaRegistroStore(registroevaluar,objstore,arrclaveorigen,arrclavedestino)
{
 var existe = true;
 objstore.each(function (registrostore){
	 var arrbandera = new Array();
	 for (var i = 0; i <arrclaveorigen.length; i++) {
	 	
	 	if (registrostore.get(arrclaveorigen[i]) == registroevaluar.get(arrclavedestino[i])) {
			arrbandera[i]=true;
		}
		else{
			arrbandera[i]=false;
		}
	 }
	 
	 var numigual=0;
	 for (var j = 0; j < arrbandera.length; j++) {
	 	if(arrbandera[j]){
			numigual++;
		}
	 }
	 
	  if (numigual==arrbandera.length){
	 	existe = false;
		return existe
	 }
 })
 return existe;
}




//--------------------------------------------------------
//Funcion que retorna la cantidad de dias entre dos fechas
//--------------------------------------------------------
function numeroDias (fecinicio,fecfin,intervalo){  
	var dias = 0;
	switch (intervalo) {
		case 'A'://suma un dia a la fecha de inicio y fin
			fecinicio  = fecinicio.add(Date.DAY, -1);
			fecfin     = fecfin.add(Date.DAY, 1);
			break;
			
		case 'S'://suma  un dia a la fecha de inicio
			fecinicio = fecinicio.add(Date.DAY, 1);
			break;
			
		case 'I'://suma  un dia a la fecha de fin
			fecfin = fecfin.add(Date.DAY, 1);
			break;
	}		
	
	var diferencia = fecfin.getTime() - fecinicio.getTime();
	dias = Math.floor(diferencia / (1000 * 60 * 60 * 24))
	dias = (parseFloat(dias));
	return dias
}


//--------------------------------------------------------
//Funcion que retorna la cantidad de meses entre dos fechas
//--------------------------------------------------------
function numeroMeses (fecdes,fechas){  
	var meses = 0;
	if((fecdes!="")&&(fechas!="")){
		var arrfecdes = fecdes.split("/");
		var arrfechas = fechas.split("/");
		if (arrfecdes.length == 3 && arrfechas.length == 3) {
			
			var fdanio = parseFloat(arrfecdes[2]);
			var fdmes  = parseFloat(arrfecdes[1]);
			var fddia  = parseFloat(arrfecdes[0]);
			var fhanio = parseFloat(arrfechas[2]);
			var fhmes  = parseFloat(arrfechas[1]);
			var fhdia  = parseFloat(arrfechas[0]);
			meses = fhanio*12 + fhmes - (fdanio*12 + fdmes);
		}
		else{
			return false;
		}
	}
	return meses;
}

//--------------------------------------------------------
//Funcion que redondea un numero a la cantidad de decimales indicada
//--------------------------------------------------------
function redondearNumero(numero, decimales) {
	var result = Math.round(numero*Math.pow(10,decimales))/Math.pow(10,decimales);
	return result;
}


//--------------------------------------------------------
//Funcion que rellena un campo con ceros a la derecha
//--------------------------------------------------------
function rellenarCampoCerosDerecha(valor,maxlon)
{
var total;
var auxiliar;
var longitud;
var index;
total=0;
auxiliar=valor;
longitud=valor.length;
total=maxlon-longitud;
if (total < maxlon)
{
	for (index=0;index<total;index++)
	{
	   auxiliar=auxiliar+'0';      
	}
	valor = auxiliar;
}
return valor;
}

//------------------------------------------------------------------
//Funcion que retorna el mes siguiente a una fecha en su primer dia
//------------------------------------------------------------------
function fechaSiguiente(fecha){
	var arrfecaux          = fecha.split("/");
	var fames              = parseInt(arrfecaux[1])+1;
	var fechasiguiente     = new Date(fames+'/'+'01/'+arrfecaux[2]);
	
	return fechasiguiente;
}


//------------------------------------------------------------------
//Funcion que verifica si un valor es numerico
//------------------------------------------------------------------
function esNumerico(variable,separadordecimal){
	if (variable != 'undefined' && variable != '') {
		var arrnumero = variable.split(separadordecimal);
		if (arrnumero.length == 2) {
			var parteentera = arrnumero[0].replace('.', '', 'g');
			var partedecimal = arrnumero[1];
			parteentera = parseInt(parteentera);
			partedecimal = parseInt(partedecimal);
			if (isNaN(parteentera )|| isNaN(partedecimal)) {
				return false;
			}
			else {
				return true;
			}
		}
		else{
			return false;
		}
	}
	else{
		return true;
	}
}

function limpiarFormulario(componente){
	if (componente.items != null) {
		arritem = componente.items;
		arritem.each(function(subcomponente){
			switch (subcomponente.getXType()) {
				case 'radiogroup':
					subcomponente.reset();
					break;
						
				case 'checkbox':
					subcomponente.reset();
					break;
				
				case 'checkboxgroup':
					subcomponente.reset();
					break;
						
				case 'hidden':
					subcomponente.reset();
					break;
						
				case 'textfield':
					subcomponente.reset();
					break;
						
				case 'textarea':
					subcomponente.reset();
			 		break;
						
				case 'combo':
					subcomponente.reset();
					break;
						
				case 'datefield':
					subcomponente.reset();
					break;
						
				case 'numberfield':
					subcomponente.reset();
			 		break;
						
				default:
					limpiarFormulario(subcomponente);
					break;
			}
		})
	}
}

function limpiarSaltoLinea(cadena){
	var cadfinal = '';
	var letra = '';
	var cod = '';
	for (j = 0; j < cadena.length; j++) {
		letra = cadena.substr(j, 1);
		cod = escape(letra);
		if (cod == '%0A') {
			letra = '\\n';
		}
		cadfinal = cadfinal + letra;
	}
	return cadfinal;
}

function colapsarArbolItems(componente){
	var cadenaid = '';
	if (componente.items != null) {
		arritem = componente.items;
		arritem.each(function(subcomponente){
			switch (subcomponente.getXType()) {
				case 'radiogroup':
					if (subcomponente.binding) {
						cadenaid = cadenaid + subcomponente.getId() + "|";
					}
					break;
						
				case 'checkbox':
					if (subcomponente.binding) {
						cadenaid = cadenaid + subcomponente.getId() + "|";
					}
					break;
				
				case 'checkboxgroup':
					if (subcomponente.binding) {
						cadenaid = cadenaid + subcomponente.getId() + "|";
					}
					break;
						
				case 'hidden':
					if (subcomponente.binding) {
						cadenaid = cadenaid + subcomponente.getId() + "|";
					}
					break;
						
				case 'textfield':
					if (subcomponente.binding) {
						cadenaid = cadenaid + subcomponente.getId() + "|";
					}
					break;
						
				case 'textarea':
					if (subcomponente.binding) {
						cadenaid = cadenaid + subcomponente.getId() + "|";
					}
			 		break;
						
				case 'combo':
					if (subcomponente.binding) {
						cadenaid = cadenaid + subcomponente.getId() + "|";
					}
					break;
						
				case 'datefield':
					if (subcomponente.binding) {
						cadenaid = cadenaid + subcomponente.getId() + "|";
					}
					break;
						
				case 'numberfield':
					if (subcomponente.binding) {
						cadenaid = cadenaid + subcomponente.getId() + "|";
					}
			 		break;
						
				default:
					cadenaid = cadenaid + colapsarArbolItems(subcomponente);
					break;
			}
		})
	}
	return cadenaid;
}

/*********************************************************************************************
* @Funcion: getItems
* @Descripcion: funcion que construye una cadena con formato json extrayendo el valor
* de cada componente de un formpanel para que esto ocurra el componente(texfield,numberfield
* datefield,etc), debe tener la propiedad binding:true.
* @Parametros: 
* - componente: el panel de donde se obtendran los items. 
* - evento:el tipo de operacion que se desee ejecutar(incluir,eliminar,modificar).
* - nivel:su valor siempre debe ser 0 ya que este establece el nivel inicial
* - tipomanejo:este indicara si se quiere obtener una cadena formato json sencilla que solo 
* contenga el valor de la operacion y de los componentes del formapanel o en su defecto que
* construya una cadenajson adaptada para el uso del daogenericoplus en el controlador
* (N = normal,A = Adaptado para genericoPlus).
* @Retorna: cadena de caracteres en formato json.
* @Autor: Ing. Gerardo Cordero. 
* @Fecha de Creacion: 27/11/2009
**********************************************************************************************
* @fecha modificacion:   
* @Descripcion: 
* @autor:                  
*********************************************************************/
function getItems(formulario,evento,tipomanejo,arrtablas,arrcampostablas){
	var cadenajson  = '';
	var cadenaid    = '';
	var arrid			 = null;
	var i                = 0
	var numitem		     = 0;
	var banderarequerido = false;
	
 	
	if (tipomanejo == 'N') {
		cadenaid = colapsarArbolItems(formulario);
		arrid = cadenaid.split("|");
		numitem = arrid.length - 2;
			
		cadenajson = "{'operacion':'" + evento + "','codmenu':"+codmenu+",";
		while (i <= numitem && !banderarequerido) {
			var cadena    	   = null;
			var formcomponente = null;
			formcomponente = formulario.findById(arrid[i]);
			switch (formcomponente.getXType()) {
				case 'hidden':
					cadena = formcomponente.getValue();
					if (cadena != null) {
						if (esNumerico(cadena, ',')) {
							cadenajson = cadenajson + "'" + formcomponente.getId() + "':" + ue_formato_operaciones(cadena);
							if (i != numitem) {
								cadenajson = cadenajson + ",";
							}
						}
						else {
							cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
							if (i != numitem) {
								cadenajson = cadenajson + ",";
							}
						}
					}
					else {
						cadena = formcomponente.defaultvalue;
						if (esNumerico(cadena, ',')) {
							cadenajson = cadenajson + "'" + formcomponente.getId() + "':" + ue_formato_operaciones(cadena);
							if (i != numitem) {
								cadenajson = cadenajson + ","
							}
						}
						else {
							cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
							if (i != numitem) {
								cadenajson = cadenajson + ",";
							}
						}
					}
					break;
					
				case 'textfield':
					if (formcomponente.hiddenvalue == '') {
						cadena = formcomponente.getValue();
						cadena = limpiarSaltoLinea(cadena);
						if (cadena != null && cadena !='') {
							if (esNumerico(cadena, ',')) {
								cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + ue_formato_operaciones(cadena) + "'";
								if (i != numitem) {
									cadenajson = cadenajson + ",";
								}
							}
							else {
								cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
								if (i != numitem) {
									cadenajson = cadenajson + ",";
								}
							}
						}
						else {
							if (!formcomponente.allowBlank) {
								Ext.MessageBox.alert('Advertencia', 'Debe llenar el campo ' + formcomponente.fieldLabel);
								banderarequerido = true;
							}
							else {
								cadena = formcomponente.defaultvalue
								if (esNumerico(cadena, ',')) {
									cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + ue_formato_operaciones(cadena) + "'";
									if (i != numitem) {
										cadenajson = cadenajson + ",";
									}
								}
								else {
									cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
									if (i != numitem) {
										cadenajson = cadenajson + ",";
									}
								}
							}
						}
					}
					else {
						cadena = formcomponente.hiddenvalue;
						if (esNumerico(cadena, ',')) {
							cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + ue_formato_operaciones(cadena) + "'";
							if (i != numitem) {
								cadenajson = cadenajson + ",";
							}
						}
						else {
							cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
							if (i != numitem) {
								cadenajson = cadenajson + ",";
							}
						}
					}
					break;
					
				case 'textarea':
					if (formcomponente.hiddenvalue == '') {
						cadena = formcomponente.getValue();
						cadena = limpiarSaltoLinea(cadena);
						if (cadena != null && cadena !='') {
							if (esNumerico(cadena, ',')) {
								cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + ue_formato_operaciones(cadena) + "'";
								if (i != numitem) {
									cadenajson = cadenajson + ",";
								}
							}
							else {
								cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
								if (i != numitem) {
									cadenajson = cadenajson + ",";
								}
							}
						}
						else {
							if (!formcomponente.allowBlank) {
								Ext.MessageBox.alert('Advertencia', 'Debe llenar el campo ' + formcomponente.fieldLabel);
								banderarequerido = true;
							}
							else {
								cadena = formcomponente.defaultvalue
								if (esNumerico(cadena, ',')) {
									cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + ue_formato_operaciones(cadena) + "'";
									if (i != numitem) {
										cadenajson = cadenajson + ",";
									}
								}
								else {
									cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
									if (i != numitem) {
										cadenajson = cadenajson + ",";
									}
								}
							}
						}
					}
					else {
						cadena = formcomponente.hiddenvalue;
						if (esNumerico(cadena, ',')) {
							cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + ue_formato_operaciones(cadena) + "'";
							if (i != numitem) {
								cadenajson = cadenajson + ",";
							}
						}
						else {
							cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
							if (i != numitem) {
								cadenajson = cadenajson + ",";
							}
						}
					}
					break;
					
				case 'datefield':
					if (formcomponente.getValue() != '') {
						cadena = formcomponente.getValue().format(Date.patterns.bdfecha);
					}
					else {
						if (!formcomponente.allowBlank) {
							Ext.MessageBox.alert('Advertencia', 'Debe llenar el campo ' + formcomponente.fieldLabel);
							banderarequerido = true;
						}
						else {
							cadena = formcomponente.defaultvalue;
						}
					}
					
					if (formcomponente.hiddenvalue == '') {
						cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
						if (i != numitem) {
							cadenajson = cadenajson + ",";
						}
					}
					else {
						cadena = formcomponente.hiddenvalue;
						cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
						if (i != numitem) {
							cadenajson = cadenajson + ",";
						}
					}
					break;
					
				case 'numberfield':
					cadena = formcomponente.getValue();
					if (cadena == '') {
						if (!formcomponente.allowBlank) {
							Ext.MessageBox.alert('Advertencia', 'Debe llenar el campo ' + formcomponente.fieldLabel);
							banderarequerido = true;
						}
						else {
							cadena = formcomponente.defaultvalue;
						}
					}
					
					if (formcomponente.hiddenvalue == '') {
						cadenajson = cadenajson + "'" + formcomponente.getId() + "':" + cadena;
						if (i != numitem) {
							cadenajson = cadenajson + ",";
						}
					}
					else {
						cadena = formcomponente.hiddenvalue;
						cadenajson = cadenajson + "'" + formcomponente.getId() + "':" + cadena;
						if (i != numitem) {
							cadenajson = cadenajson + ",";
						}
					}
					break;
					
				case 'radiogroup':
					for (var j = 0; j < formcomponente.items.length; j++) {
						if (formcomponente.items.items[j].checked) {
							cadena = formcomponente.items.items[j].inputValue;
							break;
						}
					}
					
					if (cadena != null) {
						if (typeof(cadena) == 'number') {
							cadenajson = cadenajson + "'" + formcomponente.getId() + "':" + cadena;
							if (i != numitem) {
								cadenajson = cadenajson + ",";
							}
						}
						else {
							cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
							if (i != numitem) {
								cadenajson = cadenajson + ",";
							}
						}
					}
					else {
						if (!formcomponente.allowBlank) {
							Ext.MessageBox.alert('Advertencia', 'Debe Seleccionar una opcion del campo ' + formcomponente.fieldLabel);
							banderarequerido = true;
						}
						else {
							if (typeof(formcomponente.defaultvalue) == 'number'){
								cadenajson = cadenajson + "'" + formcomponente.getId() + "':" + formcomponente.defaultvalue;
							}
							else{
								cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + formcomponente.defaultvalue+"'";
							}
							
							if (i != numitem) {
								cadenajson = cadenajson + ",";
							}
						}
					}
					break;
				
				case 'checkboxgroup':
					for (var j = 0; j < formcomponente.items.length; j++) {
						if (formcomponente.items.items[j].checked) {
							cadena = cadena + formcomponente.items.items[j].inputValue+"|";
						}
					}
					
					if (cadena != null) {
						cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
						if (i != numitem) {
								cadenajson = cadenajson + ",";
						}
					}
					else{
						if (!formcomponente.allowBlank) {
							Ext.MessageBox.alert('Advertencia', 'Debe Seleccionar una opcion del campo ' + formcomponente.fieldLabel);
							banderarequerido = true;
						}
						else {
							if (typeof(formcomponente.defaultvalue) == 'number'){
								cadenajson = cadenajson + "'" + formcomponente.getId() + "':" + formcomponente.defaultvalue;
							}
							else{
								cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + formcomponente.defaultvalue+"'";
							}
							
							if (i != numitem) {
								cadenajson = cadenajson + ",";
							}
						}
					}
					break;
					
				case 'checkbox':
					if (formcomponente.checked) {
						cadena = formcomponente.inputValue;
					}
					else {
						cadena = formcomponente.defaultvalue;
					}
					
					if (typeof(cadena) == 'number') {
						cadenajson = cadenajson + "'" + formcomponente.getId() + "':" + cadena;
						if (i != numitem) {
							cadenajson = cadenajson + ",";
						}
					}
					else {
						cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
						if (i != numitem) {
							cadenajson = cadenajson + ",";
						}
					}
					break;
					
				case 'combo':
					if (formcomponente.valor != null) {
						cadena = formcomponente.valor;
					}
					else {
						cadena = formcomponente.getValue();
					}
					
					if (cadena != null) {
						if (typeof(cadena) == 'number') {
							cadenajson = cadenajson + "'" + formcomponente.getId() + "':" + cadena;
							if (i != numitem) {
								cadenajson = cadenajson + ",";
							}
						}
						else {
							cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
							if (i != numitem) {
								cadenajson = cadenajson + ",";
							}
						}
					}
					else {
						if (!formcomponente.allowBlank) {
							Ext.MessageBox.alert('Advertencia', 'Debe Seleccionar una opcion del campo ' + formcomponente.fieldLabel);
							banderarequerido = true;
						}
						else {
							cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + formcomponente.defaultvalue + "'";
							if (i != numitem) {
								cadenajson = cadenajson + ",";
							}
						}
					}
					break;
			}
			i++;
		}
		if(!banderarequerido){
			cadenajson = cadenajson + "}";
		}
	}
	else if (tipomanejo == 'A') {
			cadenaid = colapsarArbolItems(formulario);
			arrid = cadenaid.split("|");
			numitem = arrid.length - 2;
			
			cadenajson = "{'operacion':'" + evento + "','codmenu':"+codmenu+",'datoscabecera':[{";
			while (i <= numitem && !banderarequerido) {
				var formcomponente = null
				formcomponente = formulario.findById(arrid[i]);
				switch (formcomponente.getXType()) {
					case 'hidden':
						cadena = formcomponente.getValue();
						if (cadena != null && cadena !='') {
							if (esNumerico(cadena, ',')) {
								cadenajson = cadenajson + "'" + formcomponente.getId() + "':" + ue_formato_operaciones(cadena);
								if (i != numitem) {
									cadenajson = cadenajson + ",";
								}
							}
							else {
								cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
								if (i != numitem) {
									cadenajson = cadenajson + ",";
								}
							}
						}
						else {
							cadena = formcomponente.defaultvalue;
							if (esNumerico(cadena, ',')) {
								cadenajson = cadenajson + "'" + formcomponente.getId() + "':" + ue_formato_operaciones(cadena);
								if (i != numitem) {
									cadenajson = cadenajson + ","
								}
							}
							else {
								cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
								if (i != numitem) {
									cadenajson = cadenajson + ",";
								}
							}
						}
						break;
						
					case 'textfield':
						if (formcomponente.hiddenvalue == '') {
							cadena = formcomponente.getValue();
							cadena = limpiarSaltoLinea(cadena);
							if (cadena != null && cadena !='') {
								if (esNumerico(cadena, ',')) {
									cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + ue_formato_operaciones(cadena) + "'";
									if (i != numitem) {
										cadenajson = cadenajson + ",";
									}
								}
								else {
									cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
									if (i != numitem) {
										cadenajson = cadenajson + ",";
									}
								}
							}
							else {
								if (!formcomponente.allowBlank) {
									Ext.MessageBox.alert('Advertencia', 'Debe llenar el campo ' + formcomponente.fieldLabel);
									banderarequerido = true;
								}
								else {
									cadena = formcomponente.defaultvalue
									if (esNumerico(cadena, ',')) {
										cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + ue_formato_operaciones(cadena) + "'";
										if (i != numitem) {
											cadenajson = cadenajson + ",";
										}
									}
									else {
										cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
										if (i != numitem) {
											cadenajson = cadenajson + ",";
										}
									}
								}
							}
						}
						else {
							cadena = formcomponente.hiddenvalue;
							if (esNumerico(cadena, ',')) {
								cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + ue_formato_operaciones(cadena) + "'";
								if (i != numitem) {
									cadenajson = cadenajson + ",";
								}
							}
							else {
								cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
								if (i != numitem) {
									cadenajson = cadenajson + ",";
								}
							}
						}
						break;
						
					case 'textarea':
						if (formcomponente.hiddenvalue == '') {
							cadena = formcomponente.getValue();
							cadena = limpiarSaltoLinea(cadena);
							if (cadena != null && cadena !='') {
								if (esNumerico(cadena, ',')) {
									cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + ue_formato_operaciones(cadena) + "'";
									if (i != numitem) {
										cadenajson = cadenajson + ",";
									}
								}
								else {
									cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
									if (i != numitem) {
										cadenajson = cadenajson + ",";
									}
								}
							}
							else {
								if (!formcomponente.allowBlank) {
									Ext.MessageBox.alert('Advertencia', 'Debe llenar el campo ' + formcomponente.fieldLabel);
									banderarequerido = true;
								}
								else {
									cadena = formcomponente.defaultvalue
									if (esNumerico(cadena, ',')) {
										cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + ue_formato_operaciones(cadena) + "'";
										if (i != numitem) {
											cadenajson = cadenajson + ",";
										}
									}
									else {
										cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
										if (i != numitem) {
											cadenajson = cadenajson + ",";
										}
									}
								}
							}
						}
						else {
							cadena = formcomponente.hiddenvalue;
							if (esNumerico(cadena, ',')) {
								cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + ue_formato_operaciones(cadena) + "'";
								if (i != numitem) {
									cadenajson = cadenajson + ",";
								}
							}
							else {
								cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
								if (i != numitem) {
									cadenajson = cadenajson + ",";
								}
							}
						}
						break;
						
					case 'datefield':
						if (formcomponente.getValue() != '') {
							cadena = formcomponente.getValue().format(Date.patterns.bdfecha);
						}
						else {
							if (!formcomponente.allowBlank) {
								Ext.MessageBox.alert('Advertencia', 'Debe llenar el campo ' + formcomponente.fieldLabel);
								banderarequerido = true;
							}
							else {
								cadena = formcomponente.defaultvalue;
							}
						}
							
						if (formcomponente.hiddenvalue == '') {
							cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
							if (i != numitem) {
								cadenajson = cadenajson + ",";
							}
						}
						else {
							cadena = formcomponente.hiddenvalue;
							cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
							if (i != numitem) {
								cadenajson = cadenajson + ",";
							}
						}
						break;
						
					case 'numberfield':
						cadena = formcomponente.getValue();
						if (cadena == '') {
							if (!formcomponente.allowBlank) {
								Ext.MessageBox.alert('Advertencia', 'Debe llenar el campo ' + formcomponente.fieldLabel);
								banderarequerido = true;
							}
							else {
								cadena = formcomponente.defaultvalue;
							}
						}
							
						if (formcomponente.hiddenvalue == '') {
							cadenajson = cadenajson + "'" + formcomponente.getId() + "':" + cadena;
							if (i != numitem) {
								cadenajson = cadenajson + ",";
							}
						}
						else {
							cadena = formcomponente.hiddenvalue;
							cadenajson = cadenajson + "'" + formcomponente.getId() + "':" + cadena;
							if (i != numitem) {
								cadenajson = cadenajson + ",";
							}
						}
						break;
						
					case 'radiogroup':
						for (var j = 0; j < formcomponente.items.length; j++) {
							if (formcomponente.items.items[j].checked) {
								cadena = formcomponente.items.items[j].inputValue;
								break;
							}
						}
						
						if (cadena != null) {
							if (typeof(cadena) == 'number') {
								cadenajson = cadenajson + "'" + formcomponente.getId() + "':" + cadena;
								if (i != numitem) {
									cadenajson = cadenajson + ",";
								}
							}
							else {
								cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
								if (i != numitem) {
									cadenajson = cadenajson + ",";
								}
							}
						}
						else{
							if (!formcomponente.allowBlank) {
								Ext.MessageBox.alert('Advertencia', 'Debe Seleccionar una opcion del campo ' + formcomponente.fieldLabel);
								banderarequerido = true;
							}
							else {
								cadenajson = cadenajson + "'" + formcomponente.getId() + "':" + formcomponente.defaultvalue;
								if (i == numitem) {
									cadenajson = cadenajson + ",";
								}
							}
						}
						break;
					
					case 'checkboxgroup':
						for (var j = 0; j < formcomponente.items.length; j++) {
							if (formcomponente.items.items[j].checked) {
								cadena = formcomponente.items.items[j].inputValue;
								break;
							}
						}
						
						if (cadena != null) {
							if (typeof(cadena) == 'number') {
								cadenajson = cadenajson + "'" + formcomponente.getId() + "':" + cadena;
								if (i != numitem) {
									cadenajson = cadenajson + ",";
								}
							}
							else {
								cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
								if (i != numitem) {
									cadenajson = cadenajson + ",";
								}
							}
						}
						else{
							if (!formcomponente.allowBlank) {
								Ext.MessageBox.alert('Advertencia', 'Debe Seleccionar una opcion del campo ' + formcomponente.fieldLabel);
								banderarequerido = true;
							}
							else {
								cadenajson = cadenajson + "'" + formcomponente.getId() + "':" + formcomponente.defaultvalue;
								if (i != numitem) {
									cadenajson = cadenajson + ",";
								}
							}
						}
						break;
						
					case 'checkbox':
						if (formcomponente.checked) {
							cadena = formcomponente.inputValue;
						}
						else {
							cadena = formcomponente.defaultvalue;
						}
								
						if (typeof(cadena) == 'number') {
							cadenajson = cadenajson + "'" + formcomponente.getId() + "':" + cadena;
							if (i != numitem) {
								cadenajson = cadenajson + ",";
							}
						}
						else {
							cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
							if (i != numitem) {
								cadenajson = cadenajson + ",";
							}
						}
						break;
						
					case 'combo':
						if (formcomponente.valor != null) {
							cadena = subcomponente.valor;
						}
						else {
							cadena = formcomponente.getValue();
						}
								
						if (cadena != null) {
							if (typeof(cadena) == 'number') {
								cadenajson = cadenajson + "'" + formcomponente.getId() + "':" + cadena;
								if (i != numitem) {
									cadenajson = cadenajson + ","
								}
							}
							else {
								cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
								if (i != numitem) {
									cadenajson = cadenajson + ","
								}
							}
						}
						else {
							if (!formcomponente.allowBlank) {
								Ext.MessageBox.alert('Advertencia', 'Debe Seleccionar una opcion del campo ' + formcomponente.fieldLabel);
								banderarequerido = true;
							}
							else{
								cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + formcomponente.defaultvalue + "'";
								if (i != numitem) {
									cadenajson = cadenajson + ",";
								}
							}
						}		
						break;
				}
				i++;
			}
			
			cadenajson = cadenajson + "}]";
			var x = 0;
			for (var i = 0; i < arrtablas.length; i++) {
				var nomtabla = arrtablas[i].nomtabla;
				var comstore = arrtablas[i].comstore;
				var numcampo = arrtablas[i].numcampo;
				var arrclave = arrtablas[i].arrclave;
				var cadarrcampo = "[";
				for (var j = 0; j < numcampo; j++) {
					if (j == 0) {
						cadarrcampo = cadarrcampo + "{'nomcampo':'" + arrcampostablas[x].nomcampo + "','tipocampo':'" + arrcampostablas[x].tipocampo + "','formato':'" + arrcampostablas[x].formato + "'}";
					}
					else {
						cadarrcampo = cadarrcampo + ",{'nomcampo':'" + arrcampostablas[x].nomcampo + "','tipocampo':'" + arrcampostablas[x].tipocampo + "','formato':'" + arrcampostablas[x].formato + "'}";
					}
					x++;
				}
				cadarrcampo = cadarrcampo + "]";
				var arrcampo = Ext.util.JSON.decode(cadarrcampo);
				
				
				cadenajson = cadenajson + ",'" + nomtabla + "':[";
				for (var k = 0; k <= comstore.getCount() - 1; k++) {
					if (k == 0) {
						cadenajson = cadenajson + "{"
					}
					else {
						cadenajson = cadenajson + ",{"
					}
					for (var h = 0; h < arrclave.length; h++) {
						if (h == 0) {
							cadenajson = cadenajson + "'" + arrclave[h] + "':'" + Ext.getCmp(arrclave[h]).getValue() + "'";
						}
						else {
							cadenajson = cadenajson + ",'" + arrclave[h] + "':'" + Ext.getCmp(arrclave[h]).getValue() + "'";
						}
					}
					
					for (var l = 0; l <= arrcampo.length - 1; l++) {
						if (l == arrcampo.length - 1) {
							switch (arrcampo[l].tipocampo) {
								case 'texto':
									cadenajson = cadenajson + ",'" + arrcampo[l].nomcampo + "':'" + comstore.getAt(k).get(arrcampo[l].nomcampo) + "'}";
									break;
								case 'numerico':
									var formatonumerico = 0;
									if (arrcampo[l].formato) {
										formatonumerico = ue_formato_operaciones(comstore.getAt(k).get(arrcampo[l].nomcampo));
									}
									else {
										formatonumerico = redondearNumero(comstore.getAt(k).get(arrcampo[l].nomcampo), 2)
									}
									cadenajson = cadenajson + ",'" + arrcampo[l].nomcampo + "':" + formatonumerico + "}";
									break;
								case 'fecha':
									if (arrcampo[l].formato) {
										var arrfecdes = comstore.getAt(k).get(arrcampo[l].nomcampo).split("/");
										var valorfecha   =  new Date(arrfecdes[1]+'/'+arrfecdes[0]+'/'+arrfecdes[2]);
										cadenajson = cadenajson + ",'" + arrcampo[l].nomcampo + "':'" + fechaformato + "'}";
									}
									else {
										cadenajson = cadenajson + ",'" + arrcampo[l].nomcampo + "':'" + comstore.getAt(k).get(arrcampo[l].nomcampo) + "'}";
									}
									break;
							}
						}
						else {
							switch (arrcampo[l].tipocampo) {
								case 'texto':
									cadenajson = cadenajson + ",'" + arrcampo[l].nomcampo + "':'" + comstore.getAt(k).get(arrcampo[l].nomcampo) + "'";
									break;
								case 'numerico':
									var formatonumerico = 0;
									if (arrcampo[l].formato) {
										formatonumerico = ue_formato_operaciones(comstore.getAt(k).get(arrcampo[l].nomcampo));
									}
									else {
										formatonumerico = redondearNumero(comstore.getAt(k).get(arrcampo[l].nomcampo), 2)
									}
									cadenajson = cadenajson + ",'" + arrcampo[l].nomcampo + "':" + formatonumerico + "";
									break;
								case 'fecha':
									if (arrcampo[l].formato) {
										var arrfecdes = comstore.getAt(k).get(arrcampo[l].nomcampo).split("/");
										var valorfecha   =  new Date(arrfecdes[1]+'/'+arrfecdes[0]+'/'+arrfecdes[2]);
										var fechaformato = valorfecha.format(Date.patterns.bdfecha);
										cadenajson = cadenajson + ",'" + arrcampo[l].nomcampo + "':'" + fechaformato + "'";
									}
									else {
										cadenajson = cadenajson + ",'" + arrcampo[l].nomcampo + "':'" + comstore.getAt(k).get(arrcampo[l].nomcampo) + "'";
									}
									break;
							}
						}
					}
				}
				
				if (i == arrtablas.length - 1) {
					cadenajson = cadenajson + "]}";
				}
				else {
					cadenajson = cadenajson + "]";
				}
			}
		}	
	return cadenajson;
}

function limpiarCadenaRegistro(cadenaregistro){
	var valor = cadenaregistro.toString();
	valor = valor.replace('|@@@|','+');
	var palnueva='';
	for(j=0;j<valor.length;j++){
		letra = valor.substr(j,1);
		if(letra=='|'){
			letra = unescape('%0A');
		}
		palnueva=palnueva+letra;	
	}
	
	return palnueva;
}


function setDataFrom(componente,registro){
	
	if (componente.items != null) {
		arritem = componente.items;
		arritem.each(function(subcomponente){
			var valor = null;
			switch (subcomponente.getXType()) {
				case 'radiogroup':
					if (typeof(registro.get(subcomponente.getId())) != 'undefined') {
						valor = limpiarCadenaRegistro(registro.get(subcomponente.getId()));
						for (var j = 0; j < subcomponente.items.length; j++) {
							if (valor == subcomponente.items.items[j].inputValue) {
								subcomponente.items.items[j].setValue(true);
								break;
							}
						}
					}
					break;
						
				case 'checkbox':
					if (typeof(registro.get(subcomponente.getId())) != 'undefined') {
						valor = limpiarCadenaRegistro(registro.get(subcomponente.getId()));
						if (valor == subcomponente.inputValue) {
							subcomponente.setValue(true);
						}
					}
					break;
				
				case 'checkboxgroup':
					if (typeof(registro.get(subcomponente.getId())) != 'undefined') {
						valor = limpiarCadenaRegistro(registro.get(subcomponente.getId()));
						for (var j = 0; j < subcomponente.items.length; j++) {
							if (valor == subcomponente.items.items[j].inputValue) {
								subcomponente.items.items[j].setValue(true);
								break;
							}
						}
					}
					break;
						
				case 'hidden':
					if (typeof(registro.get(subcomponente.getId())) != 'undefined') {
						subcomponente.setValue(registro.get(subcomponente.getId()));
						
					}
					break;
						
				case 'textfield':
					if (typeof(registro.get(subcomponente.getId())) != 'undefined') {
						valor = limpiarCadenaRegistro(registro.get(subcomponente.getId()));
						
						if (subcomponente.formatonumerico) {
							subcomponente.setValue(formatoNumericoMostrar(valor, 2, '.', ',', '', '', '-', ''));
						}
						else {
							
							subcomponente.setValue(valor);
						}
					}
					break;
						
				case 'textarea':
					if (typeof(registro.get(subcomponente.getId())) != 'undefined') {
						valor = limpiarCadenaRegistro(registro.get(subcomponente.getId()));
						subcomponente.setValue(valor);
					}
			 		break;
						
				case 'combo':
					if (typeof(registro.get(subcomponente.getId())) != 'undefined') {
						subcomponente.setValue(registro.get(subcomponente.getId()));
					}
					break;
						
				case 'datefield':
					if (typeof(registro.get(subcomponente.getId())) != 'undefined') {
						subcomponente.setValue(registro.get(subcomponente.getId()));
					}
					break;
						
				case 'numberfield':
					if (typeof(registro.get(subcomponente.getId())) != 'undefined') {
						subcomponente.setValue(registro.get(subcomponente.getId()));
					}
			 		break;
						
				default:
					setDataFrom(subcomponente,registro);
					break;
			}
		});
	}
}

/*******************************************************************************
 *                           FUNCIONES PARA VALIDACION DE TECLAS
 *******************************************************************************/


////////Evitar el Actualizar   ////////////////
var msg = 'That functionality is restricted.';
var asciiBack       = 8;
var asciiTab        = 9;
var asciiSHIFT      = 16;
var asciiCTRL       = 17;
var asciiALT        = 18;
var asciiHome       = 36;
var asciiLeftArrow  = 37;
var asciiRightArrow = 39;
var asciiMS         = 92;
var asciiView       = 93;
var asciiF1         = 112;
var asciiF2         = 113;
var asciiF3         = 114;
var asciiF4         = 115;
var asciiF5         = 116;
var asciiF6         = 117;
var asciiF11        = 122;
var asciiF12        = 123;
var asciiF11        = 122;

if(document.all)
{ //ie 
	document.onkeydown = onKeyPress;
}
else if (document.layers || document.getElementById)
{ //NS and mozilla 
	document.onkeypress = onKeyPress;
}

function onKeyPress(evt) 
{
	window.status = '';
	var oEvent = (window.event) ? window.event : evt;

	var nKeyCode =  oEvent.keyCode ? oEvent.keyCode : oEvent.which ? oEvent.which :	void 0;
	var bIsFunctionKey = false;

	if(oEvent.charCode == null || oEvent.charCode == 0)
	{ 
		bIsFunctionKey = (nKeyCode >= asciiF2 && nKeyCode <= asciiF12) 
		|| 
		(nKeyCode == asciiALT || nKeyCode == asciiMS || nKeyCode == asciiView || nKeyCode == asciiHome || nKeyCode == asciiBack)
	}

//	convertir la tecla en un caracter para hacer mas entendible el codigo
	var sChar = String.fromCharCode(nKeyCode).toUpperCase();

	var oTarget = (oEvent.target) ? oEvent.target : oEvent.srcElement;
	var sTag = oTarget.tagName.toLowerCase();
	var sTagType = oTarget.getAttribute("type");

	var bAltPressed = (oEvent.altKey) ? oEvent.altKey : oEvent.modifiers & 1 > 0;
	var bShiftPressed = (oEvent.shiftKey) ? oEvent.shiftKey : oEvent.modifiers & 4 > 0;
	var bCtrlPressed = (oEvent.ctrlKey) ? oEvent.ctrlKey : oEvent.modifiers & 2 > 0;
	var bMetaPressed = (oEvent.metaKey) ? oEvent.metaKey : oEvent.modifiers & 8 > 0;

	var bRet = true; 

	if(sTagType != null){sTagType = sTagType.toLowerCase();}

	if  (sTag == "textarea" || (sTag == "input" && (sTagType == "text" || sTagType == "password")) && 
			(
					nKeyCode == asciiBack || nKeyCode == asciiSHIFT || nKeyCode == asciiHome || bShiftPressed || 
					(bCtrlPressed && (nKeyCode == asciiLeftArrow || nKeyCode == asciiRightArrow)))
	)
	{
		return true;
	}
	else if(bAltPressed && (nKeyCode == asciiLeftArrow || nKeyCode == asciiRightArrow))
	{ // block alt + left or right arrow
		bRet = false;
	}
	else if(bCtrlPressed && (sChar == 'A' || sChar == 'C' || sChar == 'V' || sChar == 'X' || sChar == 'R'))
	{ // ALLOW cut, copy and paste, and SELECT ALL
		bRet = false;
	}
	else if(bShiftPressed && nKeyCode == asciiTab)
	{//allow shift + tab
		bRet = false;
	}
	else if(bIsFunctionKey)
	{ // Capture and stop these keys
		bRet = false;
	}
	else if(bCtrlPressed || bShiftPressed || bAltPressed)
	{ //block  ALL other sequences, includes CTRL+O, CTRL+P, CTRL+N, etc....
		bRet = false;
	}

	if(!bRet)
	{
		try
		{
			oEvent.returnValue = false;
			oEvent.cancelBubble = true;

			if(document.all)
			{ //IE
				oEvent.keyCode = 0;
			}
			else
			{ //NS
				oEvent.preventDefault();
				oEvent.stopPropagation();
			}
			window.status = msg; 
		}
		catch(ex)
		{
			//alert(ex);
		}
	}

	return bRet;
}


////////Evitar el ATRAS   ////////////////
if (history.forward(1)){location.replace(history.forward(1))}


////////Evitar el click derecho   ////////////////
var message = "";
function clickIE()
{ 
	if (document.all)
	{ 
		(message); 
		return false; 
	} 
} 
function clickNS(e)
{ 
	if (document.layers || (document.getElementById && !document.all))
	{ 
		if (e.which == 2 || e.which == 3)
		{ 
			(message); 
			return false; 
		} 
	} 
} 
if (document.layers)
{ 
	document.captureEvents(Event.MOUSEDOWN); 
	document.onmousedown = clickNS; 
} 
else 
{ 
	document.onmouseup = clickNS; 
	document.oncontextmenu = clickIE; 
} 


document.oncontextmenu = new Function("return false")
document.onkeydown = function(){  
	if(window.event && window.event.keyCode == 116){ 
		window.event.keyCode = 505;  
	} 
	if(window.event && window.event.keyCode == 505){  
		return false;     
	}  
}  
////////////////////////////////////////////////////////////

	
Ext.apply(Ext.form.VTypes, {
    daterange : function(val, field) {
        var date = field.parseDate(val);

        if(!date){
            return;
        }
        if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
            var start = Ext.getCmp(field.startDateField);
            start.setMaxValue(date);
            start.validate();
            this.dateRangeMax = date;
        } 
        else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
            var end = Ext.getCmp(field.endDateField);
            end.setMinValue(date);
            end.validate();
            this.dateRangeMin = date;
        }
       
        return true;
    }
});

//funcion usada para dar formto a las fechas en una grid
function formatoFechaGrid(fecha){
	if (fecha != '') {
		var fechanoguion = fecha.replace('-', '/', 'g');
		var objfecha = new Date(fechanoguion);
		return objfecha.format(Date.patterns.fechacorta);
	}
}
//fin funcion usada para dar formto a las fechas en una grid

//funcion usada para dar formto a las fechas con hora en una grid
function formatoFechaHoraGrid(fecha){
	if (fecha != '') {
		var fechanoguion = fecha.replace('-', '/', 'g');
		var objfecha = new Date(fechanoguion);
		return objfecha.format(Date.patterns.fechahoracorta);
	}
}
//fin funcion usada para dar formto a las fechas con hora en una grid

//funcion usada para dar formto a las montos en una grid
function formatoMontoGrid(monto){
	return formatoNumericoMostrar(monto,2,'.',',','','','-','');
}
//fin funcion usada para dar formto a las montos en una grid

//funcion usada para deshabilitar componentes
function deshabilitarComponentes(formulario,arrcampos,estatus){
	var componente = null;
	for (var i = 0; i <= arrcampos.length - 1; i++){
		componente = formulario.findById(arrcampos[i]);
		if(estatus){
			componente.enable();
		}
		else{
			componente.disable();
		}
		
	};
	
}
//fin funcion usada para deshabilitar componentes

//funcion obtiene fecha actual
function obtenerFechaActual() {
	var date = new Date();
	var dia = date.getDate();
	var mes = date.getMonth()+1;
	var anio = date.getFullYear();
	if (mes < 10)
	{
		mes="0"+mes;
	}
	if (dia < 10)
	{
		dia="0"+dia;
	}

	return dia+"/"+mes+"/"+anio;
}

//funcion creada para clonar un objeto Extjs
function cloneObject(o) {
    if(!o || 'object' !== typeof o) {
        return o;
    }
    if('function' === typeof o.clone) {
        return o.clone();
    }
    var c = '[object Array]' === Object.prototype.toString.call(o) ? [] : {};
    var p, v;
    for(p in o) {
        if(o.hasOwnProperty(p)) {
            v = o[p];
            if(v && 'object' === typeof v) {
                c[p] = cloneObject(v);
            }
            else {
                c[p] = v;
            }
        }
    }
    return c;
};
//fin funcion creada para clonar un objeto Extjs

//funcion para validar el rif
function validarRif(campo){
	var regExPattern = /[JGVE]-[0-9]/
	if(!campo.value.match(regExPattern)){
		Ext.MessageBox.alert('Advertencia', 'El formato del RIF es incorrecto');
	}
}

function loadScript(url, callback) {
	var script = document.createElement('script');
 
	if (script.readyState) { // IE
		script.onreadystatechange = function () {
			if (script.readyState === 'loaded' || script.readyState === 'complete') {
				script.onreadystatechange = null;
				callback();
			}
		};
	} 
	else { // Others
		script.onload = function() {
			callback();
		};
	}
 
	script.src = url;
	document.getElementsByTagName('head')[0].appendChild(script);
}

function replaceAll( text, busca, reemplaza ){
	while (text.toString().indexOf(busca) != -1) {
		text = text.toString().replace(busca,reemplaza);
	}
		
	return text;
}

function getJsonFormulario(formulario){
	var cadenajson  = '';
	var cadenaid    = '';
	var arrid			 = null;
	var i                = 0
	var numitem		     = 0;
	var banderarequerido = false;
	
 	cadenaid = colapsarArbolItems(formulario);
	arrid = cadenaid.split("|");
	numitem = arrid.length - 2;
		
	while (i <= numitem && !banderarequerido) {
		var cadena    	   = null;
		var formcomponente = null;
		formcomponente = formulario.findById(arrid[i]);
		switch (formcomponente.getXType()) {
			case 'hidden':
				cadena = formcomponente.getValue();
				cadena = limpiarSaltoLinea(cadena);
				if (cadena != null && cadena !='') {
					if (esNumerico(cadena, ',')) {
						cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + ue_formato_operaciones(cadena) + "'";
						if (i != numitem) {
							cadenajson = cadenajson + ",";
						}
					}
					else {
						cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
						if (i != numitem) {
							cadenajson = cadenajson + ",";
						}
					}
				}
				else {
					cadena = formcomponente.defaultvalue
					if (esNumerico(cadena, ',')) {
						cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + ue_formato_operaciones(cadena) + "'";
						if (i != numitem) {
							cadenajson = cadenajson + ",";
						}
					}
					else {
						cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
						if (i != numitem) {
							cadenajson = cadenajson + ",";
						}
					}
				}
				break;
				
			case 'textfield':
				if (formcomponente.hiddenvalue == '') {
					cadena = formcomponente.getValue();
					cadena = limpiarSaltoLinea(cadena);
					if (cadena != null && cadena !='') {
						if (esNumerico(cadena, ',')) {
							cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + ue_formato_operaciones(cadena) + "'";
							if (i != numitem) {
								cadenajson = cadenajson + ",";
							}
						}
						else {
							cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
							if (i != numitem) {
								cadenajson = cadenajson + ",";
							}
						}
					}
					else {
						if (!formcomponente.allowBlank) {
							Ext.Msg.show({
								title:'Advertencia',
								msg: 'Debe llenar el campo ' + formcomponente.fieldLabel,
								buttons: Ext.Msg.OK,
								icon: Ext.MessageBox.WARNING
							});
							cadenajson = cadenajson + "ERroR CAmPo ReQUEriDO ,,,,,,*****}{";
							banderarequerido = true;
						}
						else {
							cadena = formcomponente.defaultvalue
							if (esNumerico(cadena, ',')) {
								cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + ue_formato_operaciones(cadena) + "'";
								if (i != numitem) {
									cadenajson = cadenajson + ",";
								}
							}
							else {
								cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
								if (i != numitem) {
									cadenajson = cadenajson + ",";
								}
							}
						}
					}
				}
				else {
					cadena = formcomponente.hiddenvalue;
					if (esNumerico(cadena, ',')) {
						cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + ue_formato_operaciones(cadena) + "'";
						if (i != numitem) {
							cadenajson = cadenajson + ",";
						}
					}
					else {
						cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
						if (i != numitem) {
							cadenajson = cadenajson + ",";
						}
					}
				}
				break;
				
			case 'textarea':
				if (formcomponente.hiddenvalue == '') {
					cadena = formcomponente.getValue();
					cadena = limpiarSaltoLinea(cadena);
					if (cadena != null && cadena !='') {
						if (esNumerico(cadena, ',')) {
							cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + ue_formato_operaciones(cadena) + "'";
							if (i != numitem) {
								cadenajson = cadenajson + ",";
							}
						}
						else {
							cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
							if (i != numitem) {
								cadenajson = cadenajson + ",";
							}
						}
					}
					else {
						if (!formcomponente.allowBlank) {
							Ext.Msg.show({
								title:'Advertencia',
								msg: 'Debe llenar el campo ' + formcomponente.fieldLabel,
								buttons: Ext.Msg.OK,
								icon: Ext.MessageBox.WARNING
							});
							cadenajson = cadenajson + "ERroR CAmPo ReQUEriDO ,,,,,,*****}{";
							banderarequerido = true;
						}
						else {
							cadena = formcomponente.defaultvalue
							if (esNumerico(cadena, ',')) {
								cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + ue_formato_operaciones(cadena) + "'";
								if (i != numitem) {
									cadenajson = cadenajson + ",";
								}
							}
							else {
								cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
								if (i != numitem) {
									cadenajson = cadenajson + ",";
								}
							}
						}
					}
				}
				else {
					cadena = formcomponente.hiddenvalue;
					if (esNumerico(cadena, ',')) {
						cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + ue_formato_operaciones(cadena) + "'";
						if (i != numitem) {
							cadenajson = cadenajson + ",";
						}
					}
					else {
						cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
						if (i != numitem) {
							cadenajson = cadenajson + ",";
						}
					}
				}
				break;
				
			case 'datefield':
				if (formcomponente.getValue() != '') {
					cadena = formcomponente.getValue().format(Date.patterns.bdfecha);
				}
				else {
					if (!formcomponente.allowBlank) {
						Ext.Msg.show({
							title:'Advertencia',
							msg: 'Debe llenar el campo ' + formcomponente.fieldLabel,
							buttons: Ext.Msg.OK,
							icon: Ext.MessageBox.WARNING
						});
						cadenajson = cadenajson + "ERroR CAmPo ReQUEriDO ,,,,,,*****}{";
						banderarequerido = true;
					}
					else {
						cadena = formcomponente.defaultvalue;
					}
				}
				
				if (formcomponente.hiddenvalue == '') {
					cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
					if (i != numitem) {
						cadenajson = cadenajson + ",";
					}
				}
				else {
					cadena = formcomponente.hiddenvalue;
					cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
					if (i != numitem) {
						cadenajson = cadenajson + ",";
					}
				}
				break;
				
			case 'numberfield':
				cadena = formcomponente.getValue();
				if (cadena == '') {
					if (!formcomponente.allowBlank) {
						Ext.Msg.show({
							title:'Advertencia',
							msg: 'Debe llenar el campo ' + formcomponente.fieldLabel,
							buttons: Ext.Msg.OK,
							icon: Ext.MessageBox.WARNING
						});
						cadenajson = cadenajson + "ERroR CAmPo ReQUEriDO ,,,,,,*****}{";
						banderarequerido = true;
					}
					else {
						cadena = formcomponente.defaultvalue;
					}
				}
				
				if (formcomponente.hiddenvalue == '') {
					cadenajson = cadenajson + "'" + formcomponente.getId() + "':" + cadena;
					if (i != numitem) {
						cadenajson = cadenajson + ",";
					}
				}
				else {
					cadena = formcomponente.hiddenvalue;
					cadenajson = cadenajson + "'" + formcomponente.getId() + "':" + cadena;
					if (i != numitem) {
						cadenajson = cadenajson + ",";
					}
				}
				break;
				
			case 'radiogroup':
				for (var j = 0; j < formcomponente.items.length; j++) {
					if (formcomponente.items.items[j].checked) {
						cadena = formcomponente.items.items[j].inputValue;
						break;
					}
				}
				
				if (cadena != null) {
					if (typeof(cadena) == 'number') {
						cadenajson = cadenajson + "'" + formcomponente.getId() + "':" + cadena;
						if (i != numitem) {
							cadenajson = cadenajson + ",";
						}
					}
					else {
						cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
						if (i != numitem) {
							cadenajson = cadenajson + ",";
						}
					}
				}
				else {
					if (!formcomponente.allowBlank) {
						Ext.Msg.show({
							title:'Advertencia',
							msg: 'Debe llenar el campo ' + formcomponente.fieldLabel,
							buttons: Ext.Msg.OK,
							icon: Ext.MessageBox.WARNING
						});
						cadenajson = cadenajson + "ERroR CAmPo ReQUEriDO ,,,,,,*****}{";
						banderarequerido = true;
					}
					else {
						if (typeof(formcomponente.defaultvalue) == 'number'){
							cadenajson = cadenajson + "'" + formcomponente.getId() + "':" + formcomponente.defaultvalue;
						}
						else{
							cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + formcomponente.defaultvalue+"'";
						}
						
						if (i != numitem) {
							cadenajson = cadenajson + ",";
						}
					}
				}
				break;
			
			case 'checkboxgroup':
				for (var j = 0; j < formcomponente.items.length; j++) {
					if (formcomponente.items.items[j].checked) {
						cadena = cadena + formcomponente.items.items[j].inputValue+"|";
					}
				}
				
				if (cadena != null) {
					cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
					if (i != numitem) {
							cadenajson = cadenajson + ",";
					}
				}
				else{
					if (!formcomponente.allowBlank) {
						Ext.Msg.show({
							title:'Advertencia',
							msg: 'Debe llenar el campo ' + formcomponente.fieldLabel,
							buttons: Ext.Msg.OK,
							icon: Ext.MessageBox.WARNING
						});
						cadenajson = cadenajson + "ERroR CAmPo ReQUEriDO ,,,,,,*****}{";
						banderarequerido = true;
					}
					else {
						if (typeof(formcomponente.defaultvalue) == 'number'){
							cadenajson = cadenajson + "'" + formcomponente.getId() + "':" + formcomponente.defaultvalue;
						}
						else{
							cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + formcomponente.defaultvalue+"'";
						}
						
						if (i != numitem) {
							cadenajson = cadenajson + ",";
						}
					}
				}
				break;
				
			case 'checkbox':
				if (formcomponente.checked) {
					cadena = formcomponente.inputValue;
				}
				else {
					cadena = formcomponente.defaultValue;
				}
				
				if (typeof(cadena) == 'number') {
					cadenajson = cadenajson + "'" + formcomponente.getId() + "':" + cadena;
					if (i != numitem) {
						cadenajson = cadenajson + ",";
					}
				}
				else {
					cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
					if (i != numitem) {
						cadenajson = cadenajson + ",";
					}
				}
				break;
				
			case 'combo':
				cadena = formcomponente.getValue();
				if (cadena != null && cadena!='') {
					if (typeof(cadena) == 'number') {
						cadenajson = cadenajson + "'" + formcomponente.getId() + "':" + cadena;
						if (i != numitem) {
							cadenajson = cadenajson + ",";
						}
					}
					else {
						cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + cadena + "'";
						if (i != numitem) {
							cadenajson = cadenajson + ",";
						}
					}
				}
				else {
					if (!formcomponente.allowBlank) {
						Ext.Msg.show({
							title:'Advertencia',
							msg: 'Debe llenar el campo ' + formcomponente.fieldLabel,
							buttons: Ext.Msg.OK,
							icon: Ext.MessageBox.WARNING
						});
						cadenajson = cadenajson + "ERroR CAmPo ReQUEriDO ,,,,,,*****}{";
						banderarequerido = true;
					}
					else {
						cadenajson = cadenajson + "'" + formcomponente.getId() + "':'" + formcomponente.defaultvalue + "'";
						if (i != numitem) {
							cadenajson = cadenajson + ",";
						}
					}
				}
				break;
		}
		i++;
	}
	
	cadenajson = replaceAll(cadenajson,"&","");	
	return cadenajson;
}

function validarSession() {
	var objetoData ={
		'operacion': 'VAL_SESSION', 
	};
		
	var objetoDataStJson = Ext.util.JSON.encode(objetoData);		
	var parInicio = 'objetoData='+objetoDataStJson; 
   	Ext.Ajax.request({
   		url: '../../controlador/mcu/sigesp_ctr_mcu_iniciosession.php',
   		params: parInicio,
   		method: 'POST',
   		success: function ( result, request ) {
   			var respuesta = result.responseText;
   			if (respuesta == 0){
   				location.href="../../index.html";
			}
		},
   		failure: function ( result, request) {
   			Ext.Msg.hide();
   			Ext.Msg.show({
				title:'Mensaje',
				msg: 'Se perdio comunicacion con el servidor, contacte al administrador del sistema',
				buttons: Ext.Msg.OK,
				icon: Ext.MessageBox.ERROR
			}); 
   		}
   	});
}

function limpiarSession() {
	var objetoData ={
		'operacion': 'DEL_SESSION', 
	};
		
	var objetoDataStJson = Ext.util.JSON.encode(objetoData);		
	var parInicio = 'objetoData='+objetoDataStJson; 
   	Ext.Ajax.request({
   		url: 'controlador/mcu/sigesp_ctr_mcu_iniciosession.php',
   		params: parInicio,
   		method: 'POST',
   		success: function ( result, request ) {
   			
		},
   		failure: function ( result, request) {
   			Ext.Msg.hide();
   			Ext.Msg.show({
				title:'Mensaje',
				msg: 'Se perdio comunicacion con el servidor, contacte al administrador del sistema',
				buttons: Ext.Msg.OK,
				icon: Ext.MessageBox.ERROR
			}); 
   		}
   	});
}


function AgregarKeyPress(Obj)
{
		Ext.form.TextField.superclass.initEvents.call(Obj);
		if(Obj.validationEvent == 'keyup')
		{
			Obj.validationTask = new Ext.util.DelayedTask(Obj.validate, Obj);
			Obj.el.on('keyup', Obj.filterValidation, Obj);
		}
		else if(Obj.validationEvent !== false)
		{
			Obj.el.on(Obj.validationEvent, Obj.validate, Obj, {buffer: Obj.validationDelay});
		}
		if(Obj.selectOnFocus || Obj.emptyText)
		{
			Obj.on("focus", Obj.preFocus, Obj);
			if(Obj.emptyText)
			{
				Obj.on('blur', Obj.postBlur, Obj);
				Obj.applyEmptyText();
			}
		}
		if(Obj.maskRe || (Obj.vtype && Obj.disableKeyFilter !== true && (Obj.maskRe = Ext.form.VTypes[Obj.vtype+'Mask']))){
			Obj.el.on("keypress", Obj.filterKeys, Obj);
		}
		if(Obj.grow)
		{
			Obj.el.on("keyup", Obj.onKeyUp,  Obj, {buffer:50});
			Obj.el.on("click", Obj.autoSize,  Obj);
		}
			Obj.el.on("keyup", Obj.changeCheck, Obj);
}

function getJsonGrid(store, arrCampos) {
	var valorCampo = '';
	var arrfecdes  = '';
	var valorfecha = '';
	var fechaformato ='';
	var cadenajson = "[";
	var x = 0;
	for (var i = 0; i <= store.getCount() - 1; i++) {
		x = i+1;
		if (i == 0) {
			cadenajson = cadenajson + "{";
			for(var j = 0; j <= arrCampos.length - 1; j++) {
				valorCampo = store.getAt(i).get(arrCampos[j].campo);
				if (valorCampo == '' && arrCampos[j].requerido) {
					Ext.Msg.show({
						title:'Mensaje',
						msg: 'El campo '+arrCampos[j].etiqueta+' de la fila '+x+' no puede estar vacio' ,
						buttons: Ext.Msg.OK,
						icon: Ext.MessageBox. WARNING
					});
					return false;					
				}
				
				if (j == 0) {
					if(arrCampos[j].tipo == 'n'){
						valorCampo = String(valorCampo).replace(',','.');
						if(valorCampo != ''){
							cadenajson = cadenajson + "'"+arrCampos[j].campo+"':"+valorCampo;
						}
						else {
							cadenajson = cadenajson + "'"+arrCampos[j].campo+"': 0";
						}
					}
					else if(arrCampos[j].tipo == 'f'){
						arrfecdes = valorCampo.split("/");
						valorfecha   =  new Date(arrfecdes[1]+'/'+arrfecdes[0]+'/'+arrfecdes[2]);
						fechaformato = valorfecha.format(Date.patterns.bdfecha);
						cadenajson = cadenajson + "'"+arrCampos[j].campo+"':'"+fechaformato+"'";
					}
					else {
						valorCampo = limpiarSaltoLinea(valorCampo);
						cadenajson = cadenajson + "'"+arrCampos[j].campo+"':'"+valorCampo+"'";
					}
				}
				else {
					if(arrCampos[j].tipo == 'n'){
						valorCampo = String(valorCampo).replace(',','.');
						if(valorCampo != ''){
							cadenajson = cadenajson + ",'"+arrCampos[j].campo+"':"+valorCampo;
						}
						else {
							cadenajson = cadenajson + ",'"+arrCampos[j].campo+"': 0";
						}
					}
					else if(arrCampos[j].tipo == 'f'){
						arrfecdes = valorCampo.split("/");
						valorfecha   =  new Date(arrfecdes[1]+'/'+arrfecdes[0]+'/'+arrfecdes[2]);
						fechaformato = valorfecha.format(Date.patterns.bdfecha);
						cadenajson = cadenajson + ",'"+arrCampos[j].campo+"':'"+fechaformato+"'";
					}
					else {
						valorCampo = limpiarSaltoLinea(valorCampo);
						cadenajson = cadenajson + ",'"+arrCampos[j].campo+"':'"+valorCampo+"'";
					}
				}
			}
			cadenajson = cadenajson + "}";							
		}
		else {
			cadenajson = cadenajson + ",{";
			for(var j = 0; j <= arrCampos.length - 1; j++) {
				valorCampo = store.getAt(i).get(arrCampos[j].campo);
				if (valorCampo == '' && arrCampos[j].requerido) {
					Ext.Msg.show({
						title:'Mensaje',
						msg: 'El campo '+arrCampos[j].etiqueta+' de la fila '+x+' no puede estar vacio' ,
						buttons: Ext.Msg.OK,
						icon: Ext.MessageBox. WARNING
					});
					return false;					
				}
				
				if (j == 0) {
					if(arrCampos[j].tipo == 'n'){
						valorCampo = String(valorCampo).replace(',','.');
						if(valorCampo != ''){
							cadenajson = cadenajson + "'"+arrCampos[j].campo+"':"+valorCampo;
						}
						else {
							cadenajson = cadenajson + "'"+arrCampos[j].campo+"': 0";
						}
					}
					else if(arrCampos[j].tipo == 'f'){
						arrfecdes = valorCampo.split("/");
						valorfecha   =  new Date(arrfecdes[1]+'/'+arrfecdes[0]+'/'+arrfecdes[2]);
						fechaformato = valorfecha.format(Date.patterns.bdfecha);
						cadenajson = cadenajson + "'"+arrCampos[j].campo+"':'"+fechaformato+"'";
					}
					else {
						valorCampo = limpiarSaltoLinea(valorCampo);
						cadenajson = cadenajson + "'"+arrCampos[j].campo+"':'"+valorCampo+"'";
					}
				}
				else {
					if(arrCampos[j].tipo == 'n'){
						valorCampo = String(valorCampo).replace(',','.');
						if(valorCampo != ''){
							cadenajson = cadenajson + ",'"+arrCampos[j].campo+"':"+valorCampo;
						}
						else {
							cadenajson = cadenajson + ",'"+arrCampos[j].campo+"': 0";
						}
					}
					else if(arrCampos[j].tipo == 'f'){
						arrfecdes = valorCampo.split("/");
						valorfecha   =  new Date(arrfecdes[1]+'/'+arrfecdes[0]+'/'+arrfecdes[2]);
						fechaformato = valorfecha.format(Date.patterns.bdfecha);
						cadenajson = cadenajson + ",'"+arrCampos[j].campo+"':'"+fechaformato+"'";
					}
					else {
						valorCampo = limpiarSaltoLinea(valorCampo);
						cadenajson = cadenajson + ",'"+arrCampos[j].campo+"':'"+valorCampo+"'";
					}
				}
			}
			cadenajson = cadenajson + "}";
		}
	}
	cadenajson = cadenajson + "]";
	
	return cadenajson; 
}