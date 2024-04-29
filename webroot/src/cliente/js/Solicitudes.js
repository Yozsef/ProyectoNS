const boton = document.getElementById('btnGuardarProductos')

async function recoger_datos2(){
    try {
		var tablaSolicitudes = document.querySelector(".tabla table tbody");
		var respuestaServidor = await fetch("/api/listarSolicitudes");
		var listaSolicitudes = await respuestaServidor.json();

		var numeroFilas = listaSolicitudes.length; // número elementos

		tablaSolicitudes.innerHTML = ""; // esto "limpia" el contenido anterior
      for(var solicitudes of listaSolicitudes){
        var elJSONenString = JSON.stringify(solicitudes);
        var nuevaFila = `<tr>
                    <td>${solicitudes._id}</td>
                    <td>${solicitudes.nombre}</td>
                    <td>${solicitudes.cedula}</td>
                    <td>${solicitudes.Telefono}</td>
                    <td>${solicitudes.Correo}</td>
                    <td>${solicitudes.NombreNegocio}</td>
                    <td>${solicitudes.Estado}</td>
                    <td>
                        <i class="fa-solid fa-pencil">
                            <span style="display:none;">${elJSONenString}</span>
                        </i>
                    </td> 
                    <td>
						<i class="fa-solid fa-trash">
							<span style="display: none;">${elJSONenString}</span>
					    </i> 
                    </td>
                </tr>`
		tablaSolicitudes.innerHTML += nuevaFila;
      }

      var botonesEditar = document.querySelectorAll("tbody .fa-pencil");
      var botonEliminar = document.querySelectorAll("tbody .fa-trash");

		for (var boton of botonesEditar) {
			boton.addEventListener("click", function (event) {

				var yo = event.target;
				var miSpanInterno = yo.querySelector("span");

				sessionStorage.setItem("solicitudEditar", miSpanInterno.innerHTML);
                
				document.location.href = "agregarSolicitud.html";
				//titulo.value = "Editar Productos"
			});
		}
        for (var boton2 of botonEliminar) {
			boton2.addEventListener("click", function (event) {
				
				var yo = event.target;
				var miSpanInterno = yo.querySelector("span");

				sessionStorage.setItem("solicitudEliminar", miSpanInterno.innerHTML);
				console.log(miSpanInterno)
				document.location.href = "agregarSolicitud.html";
			});
		}
    }
    
    catch(error){

    }

}


async function enviarFormulario() {
	//alert("Formulario enviado!!");

	var formulario = document.querySelector(".contenedor-productos form");
    let metodo = true;
	var datosFormulario = new FormData(formulario);// multipart

	var url = "?";
	var productoSession = sessionStorage.getItem("solicitudEditar");
    var productoSessionEliminar = sessionStorage.getItem("solicitudEliminar")
	if (productoSession != null) {
		url = "/api/actualizarSolicitud";
		console.log('actualizar')
	}else if(productoSessionEliminar != null){
		url = "/api/eliminarSolicitud";
		metodo = false;
    }

	if(metodo == true){
		var respuestaServidor = await fetch(url, { method: "post", body: datosFormulario });
		var respuesta = await respuestaServidor.json();
	}else{
		var respuestaServidor = await fetch(url, { method: "delete", body: datosFormulario });
		var respuesta = await respuestaServidor.json();
	}


	console.log("funciono")

	Swal.fire({
		title: "Solicitud",
		text: respuesta.message,
		icon: "success",

	}).then(function () {
		window.location = "solicitudes.html";
	});

}

function validarEdicion() {

	var productoSession = sessionStorage.getItem("solicitudEditar");
	var formulario = document.querySelector(".contenedor-productos form");
	var inputId = formulario.querySelector("input[name='_id']");
	var inputNombre = formulario.querySelector("input[name='nombre']");
    var inputCedula = formulario.querySelector("input[name='cedula']");
	var inputCorreo = formulario.querySelector("input[name='correo']");
	var inputTelefono = formulario.querySelector("input[name='telefono']");
	var inputTramo = formulario.querySelector("input[name='tramo']");
    var inputEstado = formulario.querySelector("input[name='estado']");

	

	if (productoSession != null) { // EDITAR

		var solicitudEditar = JSON.parse(productoSession);

		inputId.value = solicitudEditar._id;
		inputNombre.value = solicitudEditar.nombre;
        inputCedula.value = solicitudEditar.cedula;
		inputTelefono.value = solicitudEditar.telefono;
        inputCorreo.value = solicitudEditar.correo;
		inputTramo.value = solicitudEditar.tramo;
        inputEstado.value = solicitudEditar.Estado;
        
		

	}
}
function validarEliminar() {

	var productoSession = sessionStorage.getItem("solicitudEliminar");
	var formulario = document.querySelector(".contenedor-productos form");
	var inputId = formulario.querySelector("input[name='_id']");
	var inputNombre = formulario.querySelector("input[name='nombre']");
    var inputCedula = formulario.querySelector("input[name='cedula']");
	var inputCorreo = formulario.querySelector("input[name='correo']");
	var inputTelefono = formulario.querySelector("input[name='telefono']");
	var inputTramo = formulario.querySelector("input[name='tramo']");
    var inputEstado = formulario.querySelector("input[name='estado']");


	if (productoSession != null) { // EDITAR

		var solicitudEliminar = JSON.parse(productoSession);

		inputId.value = solicitudEliminar._id;
		inputNombre.value = solicitudEliminar.nombre;
        inputCedula.value = solicitudEliminar.cedula;
		inputTelefono.value = solicitudEliminar.telefono;
        inputCorreo.value = solicitudEliminar.correo;
		inputTramo.value = solicitudEliminar.tramo;
        inputEstado.value = solicitudEliminar.Estado;
	}
}

function irAgregar(){
	sessionStorage.clear();
	location.href='agregarSolicitud.html'
}
function inicializarpagina(){
    try{
        
        
        boton.addEventListener('click', function(e){
            e.preventDefault('submit')
            enviarFormulario()
        })

        validarEliminar()
        validarEdicion() 
        
    }catch(error){}
    try{
        recoger_datos2()
    }catch(error){}
}

window.onload = function( ){
    inicializarpagina()
}