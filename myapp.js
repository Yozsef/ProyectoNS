let express=require("express"); 
let path=require("path");

let directorioActual = __dirname; 
let carpetaRaiz = "webroot"; 
let directorioEstatico = path.join(directorioActual,carpetaRaiz);

let app=express( ); 
app.use (  express.static( directorioEstatico )  );

let ipservidor="0.0.0.0"; 
let puerto= 3000; 
let servidor = app.listen( puerto, ipservidor, function( ) {
console.log("El servidor esta corriendo.");
} );
