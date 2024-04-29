const boton = document.getElementById('btnGuardarProductos')

async function recoger_datos2(){
    try {
		var tablaClientes = document.querySelector(".tabla table tbody");
		var respuestaServidor = await fetch("/api/listarClientes");
		var listaClientes = await respuestaServidor.json();

		var numeroFilas = listaClientes.length; // número elementos

		tablaClientes.innerHTML = ""; // esto "limpia" el contenido anterior
      for(var cliente of listaClientes){
        var elJSONenString = JSON.stringify(cliente);
        var nuevaFila = `<tr>
                    <td>${cliente._id}</td>
                    <td>${cliente.nombre}</td>
                    <td>${cliente.telefono}</td>
                    <td>${cliente.correo}</td>
                    <td>${cliente.password}</td>
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
		tablaClientes.innerHTML += nuevaFila;
      }

      var botonesEditar = document.querySelectorAll("tbody .fa-pencil");
      var botonEliminar = document.querySelectorAll("tbody .fa-trash");

		for (var boton of botonesEditar) {
			boton.addEventListener("click", function (event) {

				var yo = event.target;
				var miSpanInterno = yo.querySelector("span");

				sessionStorage.setItem("productoEditar", miSpanInterno.innerHTML);
                
				document.location.href = "agregarCliente.html";
				//titulo.value = "Editar Productos"
			});
		}
        for (var boton2 of botonEliminar) {
			boton2.addEventListener("click", function (event) {
				
				var yo = event.target;
				var miSpanInterno = yo.querySelector("span");

				sessionStorage.setItem("productoEliminar", miSpanInterno.innerHTML);
				console.log(miSpanInterno)
				document.location.href = "agregarCliente.html";
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
	var productoSession = sessionStorage.getItem("productoEditar");
    var productoSessionEliminar = sessionStorage.getItem("productoEliminar")
	if (productoSession != null) {
		url = "/api/actualizarclientes";
		console.log('actualizar')
	}else if(productoSessionEliminar != null){
		url = "/api/eliminarCliente";
		metodo = false;
    }
	else {
		url = "/api/agregarCliente";
		console.log('guardar')
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
		title: "Productos",
		text: respuesta.message,
		icon: "success",

	}).then(function () {
		window.location = "clientes.html";
	});

}

function validarEdicion() {

	var productoSession = sessionStorage.getItem("productoEditar");
	var formulario = document.querySelector(".contenedor-productos form");
	var inputId = formulario.querySelector("input[name='_id']");
	var inputNombre = formulario.querySelector("input[name='nombre']");
	var inputCorreo = formulario.querySelector("input[name='correo']");
	var inputTelefono = formulario.querySelector("input[name='telefono']");
	var inputPassword = formulario.querySelector("input[name='password']");

	

	if (productoSession != null) { // EDITAR

		var productoEditar = JSON.parse(productoSession);

		inputId.value = productoEditar._id;
		inputNombre.value = productoEditar.nombre;
		inputTelefono.value = productoEditar.telefono;
        inputCorreo.value = productoEditar.correo;
		inputPassword.value = productoEditar.password;
		

	}
}
function validarEliminar() {

	var productoSession = sessionStorage.getItem("productoEliminar");
	var formulario = document.querySelector(".contenedor-productos form");
	var inputId = formulario.querySelector("input[name='_id']");
	var inputNombre = formulario.querySelector("input[name='nombre']");
	var inputCorreo = formulario.querySelector("input[name='correo']");
	var inputTelefono = formulario.querySelector("input[name='telefono']");
	var inputPassword = formulario.querySelector("input[name='password']");


	if (productoSession != null) { // EDITAR

		var productoEliminar = JSON.parse(productoSession);

        inputId.value = productoEliminar._id;
		inputNombre.value = productoEliminar.nombre;
		inputTelefono.value = productoEliminar.telefono;
        inputCorreo.value = productoEliminar.correo;
		inputPassword.value = productoEliminar.password;

	}
}

function irAgregar(){
	sessionStorage.clear();
	location.href='agregarCliente.html'
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

