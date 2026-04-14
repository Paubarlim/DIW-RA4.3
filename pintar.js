var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
const marge = 15; /*x: L -> R*/
const alçada = 245; /*y: UP -> Bottom*/
const diametre = 80;
const radio = diametre/2; // para poder clacular desde el centro
let color = "#000000"; /*declarar variable */
// --Mover ratón-circulo: Necesitamos borrar el canvas y redibiujasr todo + circle2 en la posicion del raton
canvas.addEventListener("mousemove", pintarRatoli);
document.addEventListener("keydown", colorRatoli);
// este evento de "keydown" solo funciona en document y no canvas
// crear funcion general que englobe el resto
    function pintarRatoli(event){
        console.log("ratoli");
        var x = event ? event.offsetX: marge*3+diametre*2+radio; // modificar variables
        var y = event ? event.offsetY: marge+alçada-radio; // solo se aplica en el circle2
        // si hay evento usa las corrdenadas del ratón, si no usa las coordenadas fijas
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
            ctx.fillStyle=color;
            ctx.beginPath(); /*x, y, radio, inicio, fin */
            ctx.arc(x, y, radio/4, 0, Math.PI*2); // variables definidas arriba
            ctx.fill();
        }
        circle1(); // llamar funciones internamente
        rectangle2(); // en orden. El últm. se sobreponen
        rectangle3(); // y desaparecen todos los posteriores
        circle2();
        rectangle1(); // 
    }
// llamar solo a la general, porque internamente, esta llama a las otras
pintarRatoli();
function colorRatoli(event){
    if (event.key == "1") color = "#000000";
    if (event.key == "2") color = "#00ffff";
    if (event.key == "0") color = "null"; // o #ffffff00
    if (event.key == " ") { // limpiar todo el canvas (300x300): esquina up-L, luego el ancho y la altura
        ctx.clearRect(0, 0, canvas.width, canvas.height); // update beofre painting con el método clearX
        pintarRatoli();
    }       
}
colorRatoli();
