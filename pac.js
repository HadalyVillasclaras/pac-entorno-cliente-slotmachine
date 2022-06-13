
// Imágenes 
var listaImagenes = ["aubergine", "banana", "carrots", "cherries", "dollar", "lemon", "orange", "peach", "potato", "tomato"];
var img1 = document.getElementById("imagen1");
var img2 = document.getElementById("imagen2");
var img3 = document.getElementById("imagen3");


//Monedas
var entradaMonedas = document.getElementById("entradaMonedas"); //input
var introducirMonedas = document.getElementById("introducirMonedas"); //button
var monedasActuales = document.getElementById("monedasActuales"); 



function nuevaTirada () {
    //Generar 3 números aleatorios
    var random1 = Math.round(Math.random()*9);
    var random2 = Math.round(Math.random()*9);
    var random3 = Math.round(Math.random()*9); 

    img1.src = "img/" + listaImagenes[random1] + ".png";
    img2.src = "img/" + listaImagenes[random2] + ".png";
    img3.src = "img/" + listaImagenes[random3] + ".png";
   
    var tirada = [listaImagenes[random1], listaImagenes[random2], listaImagenes[random3]];
    
    gastaUnaMoneda();
    premios(tirada);
}


// PREMIOS
function premios(tiradax){
    console.log(tiradax);

    var img1 = tiradax[0];
    var img2 = tiradax[1];
    var img3 = tiradax[2];


    if(img1 == "dollar" && img2 == "dollar" && img3 == "dollar" ) {
         historial("¡Has ganado 10 monedas!");
         sumaMonedas(10);
        }else if ((img1 == "dollar" && img2 == "dollar") || 
                (img1 == "dollar" && img3 == "dollar") || 
                (img2 == "dollar" && img3 == "dollar")){
                historial("¡Has ganado 4 monedas!");
                sumaMonedas(4); 
        }else if (tiradax.includes("dollar") && (img1 == img2 || img1 == img3 || img3 == img2)){
            historial("¡Has ganado 3 monedas!"); 
            sumaMonedas(3);
        }else if (tiradax.includes("dollar")){
            historial("¡Has ganado 1 moneda!"); 
            sumaMonedas(1);
        }


    if(tiradax.indexOf("dollar")==-1){
        if(img1 == img2 && img1 == img3 && img2 == img3){
            historial("¡Has ganado 5 monedas!"); 
            sumaMonedas(5);
        }else if (img1 == img2 || img1 == img3 || img2 == img3){
            historial("¡Has ganado 2 monedas!"); 
            sumaMonedas(2);
        }
    }   
}


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



function soltarPalanca(){
    document.getElementById("palanca").src = "img/palancaUP.png";
}



function gastaUnaMoneda(){
    //Restar 1 moneda a monedasActuales
    --monedasActuales.innerHTML 
    //Añadir gasto a historial
    historial("Gastas 1 moneda");
}



function sumaMonedas(valor){
    monedasActuales.innerHTML = Number(monedasActuales.innerHTML) + valor;
    //Función para cambiar el color de las líneas de premios
    cambiaColor();
}
 



function historial(texto){
    var newOl = document.createElement("OL");
    var textNode = document.createTextNode(texto);
    newOl.appendChild(textNode);
    var list = document.getElementById("historial");
    list.insertBefore(newOl, list.childNodes[0]);
}



function cambiaColor(){
    var lineaGanar = document.getElementsByTagName("ol")[0];
    lineaGanar.classList.add("linea-ganar");
}

 

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
 
