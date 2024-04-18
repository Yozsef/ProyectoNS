const form = document.getElementById('formulario');
const nombreProducto = document.getElementById('nombreProducto');
const precioProducto = document.getElementById('precioProducto');
const cantidadProducto = document.getElementById('cantidadProducto');
const categoriaProducto = document.getElementById('categoriaProducto');
const idProducto = document.getElementById('idProducto');
const buscarBtn = document.getElementById('buscarBtn');


// BUSCAR PRODUCTOS

async function cargarTablaProductos(){
	try{
		
		var tablaProductosBody = document.querySelector(".tabla table tbody");
		var respuestaServidor = await fetch("/api/listarproductos");
		var listaProductos = await respuestaServidor.json();
					
		var numeroFilas = listaProductos.length; // número elementos
		
		tablaProductosBody.innerHTML = ""; // esto "limpia" el contenido anterior
		
		//for(var n = 0; n < numeroFilas; n++){
		for(var p of listaProductos){
		
			var elJSONenString = JSON.stringify(p); 
		
			var nuevaFila = `<tr>
								<td>${p._id}</td>
								<td>${p.nombre}</td>
								<td>${p.precio}</td>
								<td>${p.cantidad}</td>
								<td>${p.categoria}</td>
								<td>
									<i class="fa-solid fa-pencil">
										<a><span style="display: none;">${elJSONenString}</span></a>
									</i>
								</td>
							</tr>`;
		
			tablaProductosBody.innerHTML += nuevaFila;
		}
		
		celdaContadorFilas.innerHTML = `Filas: ${numeroFilas}`;
		
		/*
		var botonesEditar = document.querySelectorAll(".contenedorTabla .fa-pencil");

		for(var boton of botonesEditar){
			boton.addEventListener("click", function(event){
			
				var yo = event.target;
				var miSpanInterno = yo.querySelector("span");
				
				sessionStorage.setItem("productoEditar", miSpanInterno.innerHTML);
				
				document.location.href = "/productos/configuracion/formularioproductos.html";
			});
		}
		*/
	}
	catch(error){

	}
}

window.onload = function( ){
	cargarTablaProductos();
}