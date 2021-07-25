document.addEventListener('DOMContentLoaded', function () {
  	$("table tr th input").on("click", function(){
  		ponervalor(this.value);
	});
});
document.addEventListener('DOMContentLoaded', function () {
  	$("table tr th .signo").on("click", function(){
  		ponervalor(this.value);
	});
});
function ponervalor(nuevo){
	var previo = document.getElementById('operacion').value;
	if (previo=="0") {previo=""}
	var numero = previo+nuevo;
	document.getElementById('operacion').value=numero;
	var previo = document.getElementById('operacion').focus();
}
function borrar(){
	var previo = document.getElementById('operacion').focus();
	var previo = document.getElementById('operacion').value;
	previo = previo.substring(0, previo.length - 1);
	if (previo=="") {previo=0}
	document.getElementById('operacion').value=previo;
	
}
function eliminar(){
	document.getElementById('operacion').value="0";	
	reset();	
}

function reset(){
	infija.length = 0;
	posfija.length = 0;
	pila.length = 0;
}

/*proceso de clcular resultado*/
var infija = [];
var posfija = [];
var pila = [];

function calcular(){
	var str = document.getElementById('operacion').value;
	var chars = str.split('');
	for (let i = 0; i < chars.length; i++) {
	    if (infija[0]==null) {
	    	infija[0]=chars[0];
	    }else{
	    	if (isSimbolo(chars[i])) {
	    		infija[infija.length]=chars[i];
	    	}
	    	else{
	    		if (isSimbolo(infija[infija.length-1])) {
	    			infija[infija.length]=chars[i];
	    		}else{
	    			infija[infija.length-1] = infija[infija.length-1]+chars[i];	
	    		}
	    	}
	    }
	}
	procesar();
	calcularResultado();	
	reset();
}
var resultado=[];
function calcularResultado(){
	for(const item of posfija){
		if (isOperador(item)) {
			empilarResultado(item);
		}else{
			desempilarResultado(item);
		}
	}	
	var ver="";
	for(const item of resultado){
		ver = ver+item;
	}
	document.getElementById('operacion').value = ver;
	console.log(resultado);
	resultado.length=0;
}
function empilarResultado(item){
	resultado.push(item);
}
function desempilarResultado(item){
	var num2 = resultado[resultado.length-1];
	resultado.length = resultado.length-1;
	var num1 = resultado[resultado.length-1];
	resultado.length = resultado.length-1;
	empilarResultado(operaciones(num1,num2,item));	
}
function operaciones(num1,num2,signo){
	var operacion;
	switch(signo){
		case "+": operacion = parseFloat(num1) + parseFloat(num2); break;
		case "-": operacion = parseFloat(num1) - parseFloat(num2); break;
		case "*": operacion = parseFloat(num1) * parseFloat(num2); break;
		case "/": operacion = parseFloat(num1) / parseFloat(num2); break;
		default: operacion="expresion incorrecta"; break;
	}
	return operacion;
}
function isSimbolo(caracter){
	var simbolo;
	switch(caracter){
		case '+': simbolo=true; break;
		case '-': simbolo=true; break;
		case '*': simbolo=true; break;
		case '/': simbolo=true; break;
		case '(': simbolo=true; break;
		case ')': simbolo=true; break;
		default: simbolo=false; break;
	}
	return simbolo;
}
function procesar(){
	for(const item of infija){
		if (item=="^") {
			alert("^");
		}
		if (isOperador(item)) {
			toPosfija(item);
		}else{
			if (item==")"){
				parentesisIzquierdo();
			}
			else{
				if (pila.length==0) {
                    Empilar(item);
                }else{
                	var ultimoPila = pila[pila.length-1];

                    if (pFuera(item)>pDentro(ultimoPila)) {
                        Empilar(item);
                    }else{
                        Desempilar();
                        Empilar(item);
                    }
                }
			}
		}
	}
	if (pila.length>0) {
        for (var i = 0; i < pila.length; i++) {
            Desempilar();
        }
    }
    console.log(posfija);
    
}
function isOperador(o){
	if (o=='+' || o=='-' || o=='*' || o=='/' || o=='^' || o=='(' || o==')') {
        return false;
    }
    else{
        return true;
    }
}
function toPosfija(toPst){
    posfija.push(toPst);
}
function parentesisIzquierdo(){
    Desempilar();

    var ultimoPila = pila[pila.length-1];

    if (ultimoPila=='(') {
        pila.length = pila.length-1;
    }else{
        parentesisIzquierdo();
    }
}
function Empilar(toPila){
    pila[pila.length] = toPila;
}
function Desempilar(){
    toPosfija(pila[pila.length-1]);
    pila.length = pila.length-1;
}
function pDentro(p){
    var prioridad=0;
    switch (p) {
        case '^':prioridad=3;break;
        case '/':prioridad=2;break;
        case '*':prioridad=2;break;
        case '-':prioridad=1;break;
        case '+':prioridad=1;break;
        case '(':prioridad=0;break;
    }
    return prioridad;
}
function pFuera(p){
    var prioridad=0;
    switch (p) {
        case '^':prioridad=4;break;
        case '/':prioridad=2;break;
        case '*':prioridad=2;break;
        case '-':prioridad=1;break;
        case '+':prioridad=1;break;
        case '(':prioridad=5;break;
    }
    return prioridad;
}