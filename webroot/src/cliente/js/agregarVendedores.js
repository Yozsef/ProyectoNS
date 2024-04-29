const boton = document.getElementById('btnGuardarProductos')

async function recoger_datos2(){
    try {
		var tablaVendedor = document.querySelector(".tabla table tbody");
		var respuestaServidor = await fetch("/api/listarVendedores");
		var listaVendedor = await respuestaServidor.json();
        var numeroFilas = listaVendedor.length

		tablaVendedor.innerHTML = ""; // esto "limpia" el contenido anterior
      for(var vendedor of listaVendedor){
        var elJSONenString = JSON.stringify(vendedor);
        var nuevaFila = `<tr>
                    <td>${vendedor._id}</td>
                    <td>${vendedor.nombre}</td>
					<td>${vendedor.cedula}</td>
                    <td>${vendedor.correo}</td>
                    <td>${vendedor.telefono}</td>
                    <td>${vendedor.password}</td>
                    <td>${vendedor.tramo}</td>
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
        tablaVendedor.innerHTML += nuevaFila
      }

      var botonesEditar = document.querySelectorAll("tbody .fa-pencil");
      var botonEliminar = document.querySelectorAll("tbody .fa-trash");

		for (var boton of botonesEditar) {
			boton.addEventListener("click", function (event) {

				var yo = event.target;
				var miSpanInterno = yo.querySelector("span");

				sessionStorage.setItem("vendedorEditar", miSpanInterno.innerHTML);
                
				document.location.href = "agregarVendedor.html";
				//titulo.value = "Editar Productos"
			});
		}
        for (var boton2 of botonEliminar) {
			boton2.addEventListener("click", function (event) {
				
				var yo = event.target;
				var miSpanInterno = yo.querySelector("span");

				sessionStorage.setItem("vendedorEliminar", miSpanInterno.innerHTML);
				console.log(miSpanInterno)
				document.location.href = "agregarVendedor.html";
			});
		}
    }
    
    catch(error){

    }

}


async function enviarFormulario() {
	//alert("Formulario enviado!!");

	var formulario = document.querySelector(".contenedor-productos form");
    console.log(formulario)
    let metodo = true;
	var datosFormulario = new FormData(formulario);// multipart

	var url = "?";
	var productoSession = sessionStorage.getItem("vendedorEditar");
    var productoSessionEliminar = sessionStorage.getItem("vendedorEliminar")
	if (productoSession != null) {
		url = "/api/actualizarVendedores";
		console.log('actualizar')
	}else if(productoSessionEliminar != null){
		url = "/api/eliminarVendedor";
		metodo = false;
    }
	else {
		url = "/api/agregarVendedor";
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
		title: "Vendedores",
		text: respuesta.message,
		icon: "success",

	}).then(function () {
		window.location = "vendedores.html";
	});

}

function validarEdicion() {

	var productoSession = sessionStorage.getItem("vendedorEditar");
	var formulario = document.querySelector(".contenedor-productos form");
	var inputId = formulario.querySelector("input[name='_id']");
	var inputNombre = formulario.querySelector("input[name='nombre']");
	var inputCedula = formulario.querySelector("input[name='cedula']");
	var inputTelefono = formulario.querySelector("input[name='telefono']");
    var inputCorreo = formulario.querySelector("input[name='correo']");
	var inputPassword = formulario.querySelector("input[name='password']");
    var inputTramo = formulario.querySelector("input[name='tramo']");
	

	if (productoSession != null) { // EDITAR

		var vendedorEditar = JSON.parse(productoSession);

		inputId.value = vendedorEditar._id;
		inputNombre.value = vendedorEditar.nombre;
		inputCedula.value = vendedorEditar.cedula;
		inputCorreo.value = vendedorEditar.correo;
        inputTelefono.value = vendedorEditar.telefono;
		inputPassword.value = vendedorEditar.password;
        inputTramo.value = vendedorEditar.tramo;
		

	}
}
function validarEliminar() {

	var productoSession = sessionStorage.getItem("vendedorEliminar");
	var formulario = document.querySelector(".contenedor-productos form");
	var inputId = formulario.querySelector("input[name='_id']");
	var inputNombre = formulario.querySelector("input[name='nombre']");
	var inputCedula = formulario.querySelector("input[name='cedula']");
	var inputTelefono = formulario.querySelector("input[name='telefono']");
    var inputCorreo = formulario.querySelector("input[name='correo']");
	var inputPassword = formulario.querySelector("input[name='password']");
    var inputTramo = formulario.querySelector("input[name='tramo']");


	if (productoSession != null) { // EDITAR

		var vendedorEliminar = JSON.parse(productoSession);

		inputId.value = vendedorEliminar._id;
		inputNombre.value = vendedorEliminar.nombre;
		inputCedula.value = vendedorEliminar.cedula;
		inputCorreo.value = vendedorEliminar.correo;
        inputTelefono.value = vendedorEliminar.telefono;
		inputPassword.value = vendedorEliminar.password;
        inputTramo.value = vendedorEliminar.tramo;

	}
}

function irAgregar(){
	sessionStorage.clear();
	location.href='agregarVendedor.html'
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
