
// Imágenes 
var listaImagenes = ["aubergine", "banana", "carrots", "cherries", "dollar", "lemon", "orange", "peach", "potato", "tomato"];
var cas1 = document.getElementById("casilla1");
var cas2 = document.getElementById("casilla2");
var cas3 = document.getElementById("casilla3");


//Gestión monedas
var entradaMonedas = document.getElementById("entradaMonedas"); //input
var introducirMonedas = document.getElementById("introducirMonedas"); //button
var monedasActuales = document.getElementById("monedasActuales"); 


//NUEVA TIRADA 
function nuevaTirada () {
    //Generar 3 números aleatorios
    var random1 = Math.round(Math.random()*9);
    var random2 = Math.round(Math.random()*9);
    var random3 = Math.round(Math.random()*9); 

    //Construir src de la img
    cas1.src = "img/" + listaImagenes[random1] + ".png";
    cas2.src = "img/" + listaImagenes[random2] + ".png";
    cas3.src = "img/" + listaImagenes[random3] + ".png";
   
    //Crear un aray con los valores generados por random
    var tirada = [listaImagenes[random1], listaImagenes[random2], listaImagenes[random3]];
 
    console.log("PRUEBA" + tirada[0]);
    
    //Funcion restar moneda por tirada
    gastaUnaMoneda();
    //Pasar a la funcion "premios" el valor del array 
    premios(tirada);
}


// PREMIOS
function premios(tiradax){
    console.log(tiradax[1]);

    var cas1 = tiradax[0];
    var cas2 = tiradax[1];
    var cas3 = tiradax[2];


    //Combinaciones que incluyen "dollar"
    if(cas1 == "dollar" && cas2 == "dollar" && cas3 == "dollar" ) {
         historial("¡Has ganado 10 monedas!");
         sumaMonedas(10); 
        
        }else if ((cas1 == "dollar" && cas2 == "dollar") || 
                (cas1 == "dollar" && cas3 == "dollar") || 
                (cas2 == "dollar" && cas3 == "dollar")){
                historial("¡Has ganado 4 monedas!");
                sumaMonedas(4); 
        }else if (tiradax.includes("dollar") && (cas1 == cas2 || cas1 == cas3 || cas3 == cas2)){
            historial("¡Has ganado 3 monedas!"); 
            sumaMonedas(3);
        }else if (tiradax.includes("dollar")){
            historial("¡Has ganado 1 moneda!"); 
            sumaMonedas(1);
        }


    //Combinaciones que no incluyen "dollar"
    if(tiradax.indexOf("dollar")==-1){
        console.log(tiradax);
        if(cas1 == cas2 && cas1 == cas3 && cas2 == cas3){
            console.log("Ganas 5 monedas de hortalzas");
            historial("¡Has ganado 5 monedas!"); 
            sumaMonedas(5);
        }else if (cas1 == cas2 || cas1 == cas3 || cas2 == cas3){
            console.log("Ganas 2 monedas");
            historial("¡Has ganado 2 monedas!"); 
            sumaMonedas(2);
        }
    }   
}

//INTRODUCIR MONEDAS
function introduceMonedas(){
    var cantidadMonedas = entradaMonedas.value;
    monedasActuales.innerHTML = cantidadMonedas;

    //Agregar a historial tantas monedas como value del input
    historial("Has introducido " + cantidadMonedas + " monedas");

    //Reestablecer a 0 y deshabilitar entrada de monedas
    entradaMonedas.value = 0;
    entradaMonedas.disabled = true;
    introducirMonedas.disabled = true;
};

// PULSAR PALANCA
function pulsarPalanca(){
    if (monedasActuales.innerHTML < 1)
    {
        alert("No hay suficientes monedas para jugar. Introduce monedas.");
    } else{
        document.getElementById("palanca").src = "img/palancaDOWN.png";
        
        // Funcion tirada
        nuevaTirada();
    }
}

//SOLTAR PALANCA
function soltarPalanca(){
    document.getElementById("palanca").src = "img/palancaUP.png";
}


// RESTA 1 MONEDA 
function gastaUnaMoneda(){
    //Restar 1 moneda a monedasActuales
    --monedasActuales.innerHTML 
    //Añadir gasto a historial
    historial("Gastas 1 moneda");
}

//SUMA MONEDAS
function sumaMonedas(valor){
    monedasActuales.innerHTML = Number(monedasActuales.innerHTML) + valor;
    cambiaColor();
}
 

// HISTORIAL
function historial(texto){
    var newOl = document.createElement("OL");
    var textNode = document.createTextNode(texto);
    newOl.appendChild(textNode);
    var list = document.getElementById("historial");
    list.insertBefore(newOl, list.childNodes[0]);
}

// CAMBIA COLOR LINEA HISTORIAL
function cambiaColor(){
    var lineaGanar = document.getElementsByTagName("ol")[0];
    lineaGanar.classList.add("linea-ganar");
}

 

//SACAR MONEDAS
function salir(){
    //Pasar monedas actuales a entrada de monedas
    entradaMonedas.value = monedasActuales.innerHTML;

    alert("¡Enhorabuena! Has conseguido un total de: " + entradaMonedas.value + " MONEDAS");
    historial("---Fin de la partida---");
    //Vaciar contador monedasActuales
    monedasActuales.innerHTML = 0;
    //Habilitar input y button
    entradaMonedas.disabled = false;
    introducirMonedas.disabled = false;
}

document.getElementById("introducirMonedas").addEventListener("click", introduceMonedas);
document.getElementsByClassName("palanca")[0].addEventListener("mousedown", pulsarPalanca);
document.getElementsByClassName("palanca")[0].addEventListener("mouseup", soltarPalanca);
document.getElementById("salir").addEventListener("click", salir);
 