var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
const marge = 15; /*x: L -> R*/
const alçada = 245; /*y: UP -> Bottom*/
const diametre = 80;
const radio = diametre/2; // para poder clacular desde el centro
let color = "#000000"; /*declarar variable */
// --Mover ratón-circulo: Necesitamos borrar el canvas y redibiujasr todo + circle2 en la posicion del raton
// crear funcion general que englobe el resto
function pintarRatoli(event){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    function circle1(){
        ctx.strokeStyle="#00ADEF";
        ctx.beginPath(); /*porque la x e y se calculan desde el centro, ahora es 40px + 15px */
        ctx.arc(marge + radio, marge + radio, radio, 0, Math.PI*2);
        ctx.stroke(); /*x, y, radio, inicio, fin */
    }
    function rectangle1(){
        ctx.strokeStyle="#000000";
        ctx.beginPath(); /*x, y: esquina UP-L. Ancho, Alto */
        ctx.rect(marge, marge*2+diametre, diametre, alçada-(marge+diametre));
        ctx.stroke(); /*15, 80px, 15px*/
    }
    function rectangle2(){
        ctx.strokeStyle="#000000";
        ctx.beginPath(); /*x, y: esquina UP-L. Ancho, Alto */
        ctx.rect(marge*2+diametre, marge, diametre, alçada);
        ctx.stroke(); /*15, 80px, 15px*/
    }
    function rectangle3(){
        ctx.strokeStyle="#000000";
        ctx.beginPath(); /*x, y: esquina UP-L. Ancho, Alto */
        ctx.rect(marge*3+diametre*2, marge, diametre, alçada-(marge+diametre));
        ctx.stroke(); /*15, 80px, 15px*/
    }
    function circle2(){
        // añadir propiedades del evento (mueve coordenadas x,y con el ratón)
        ctx.strokeStyle="#00ADEF";
        ctx.beginPath(); /*x, y, radio, inicio, fin */
        ctx.arc(marge*3 + diametre*2 + radio, marge*2 + radio + alçada-(marge+diametre), radio, 0, Math.PI*2); // variables definidas arriba
        ctx.stroke();
    }
    circle1(); // llamar funciones internamente
    rectangle1(); // en orden. El últm. se sobreponen
    rectangle2(); // y desaparecen todos los posteriores
    rectangle3(); //
    circle2();
}// llamar solo a la general, porque internamente, esta llama a las otras
/*ejecutar eventos en la función eMouse: */
canvas.addEventListener("mousemove", function(eMouse) { /*asociamos evento con una función*/
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(eMouse.offsetX, eMouse.offsetY, radio/4, 0, Math.PI*2);
    ctx.fill();
});

// Funciones para el teclado
// este evento de "keydown" solo funciona en document y no canvas
document.addEventListener("keydown", function(event) {
    if (event.key == "1") color = "#000000";
    if (event.key == "2") color = "#00ffff";
    if (event.key == "0") color = "#FFF"; // o "#ffffff00"
    if (event.key == " ") { // limpiar todo el canvas (300x300): esquina up-L, luego el ancho y la altura
        pintarRatoli(); // redibujar el logo después de limpiar
    }
});
pintarRatoli(); // dibujar logo al inicio
