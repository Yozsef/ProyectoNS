let express=require("express"); 
let path=require("path");
let multer = require( "multer" );

let directorioActual = __dirname; 
let carpetaRaiz = "webroot"; 
let directorioEstatico = path.join(directorioActual,carpetaRaiz);

let app=express( ); 
app.use (  express.static( directorioEstatico )  );

app.use( express.json() );
app.use( express.urlencoded() );
app.use(multer({ dest: `${carpetaRaiz}/uploads/` }).any());

require("./controllers/ProductosController")(app);
require("./controllers/CarritoController")(app);
require("./controllers/SolicitudController")(app);

let ipservidor="0.0.0.0"; 
let puerto= 3000; 
let servidor = app.listen( puerto, ipservidor, function( ) {
console.log("El servidor esta corriendo en http://localhost:" + puerto + "/");
} );

