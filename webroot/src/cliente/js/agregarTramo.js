const boton = document.getElementById('btnGuardarProductos')

async function recoger_datos2(){
    try {
		var tablaTramo = document.querySelector(".tabla table tbody");
		var respuestaServidor = await fetch("/api/listarTramos");
		var listaTramo = await respuestaServidor.json();
        var numeroFilas = listaTramo.length

		tablaTramo.innerHTML = ""; // esto "limpia" el contenido anterior
      for(var tramo of listaTramo){
        var elJSONenString = JSON.stringify(tramo);
        var nuevaFila = `<tr>
                    <td>${tramo._id}</td>
                    <td>${tramo.nombre}</td>
                    <td>${tramo.vendedor}</td>
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
        tablaTramo.innerHTML += nuevaFila
      }

      var botonesEditar = document.querySelectorAll("tbody .fa-pencil");
      var botonEliminar = document.querySelectorAll("tbody .fa-trash");

		for (var boton of botonesEditar) {
			boton.addEventListener("click", function (event) {

				var yo = event.target;
				var miSpanInterno = yo.querySelector("span");

				sessionStorage.setItem("tramoEditar", miSpanInterno.innerHTML);
                
                console.log(miSpanInterno)
				document.location.href = "agregarTramo.html";
				//titulo.value = "Editar Productos"
			});
		}
        for (var boton2 of botonEliminar) {
			boton2.addEventListener("click", function (event) {
				
				var yo = event.target;
				var miSpanInterno = yo.querySelector("span");

				sessionStorage.setItem("tramoEliminar", miSpanInterno.innerHTML);
				console.log(miSpanInterno)
				document.location.href = "agregarTramo.html";
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
	var productoSession = sessionStorage.getItem("tramoEditar");
    var productoSessionEliminar = sessionStorage.getItem("tramoEliminar")
	if (productoSession != null) {
		url = "/api/actualizarTramo";
		console.log('actualizar')
	}else if(productoSessionEliminar != null){
		url = "/api/eliminarTramo";
		metodo = false;
    }
	else {
		url = "/api/agregarTramo";
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
		title: "Tramos",
		text: respuesta.message,
		icon: "success",

	}).then(function () {
		window.location = "tramos.html";
	});

}

function validarEdicion() {

	var productoSession = sessionStorage.getItem("tramoEditar");
	var formulario = document.querySelector(".contenedor-productos form");
	var inputId = formulario.querySelector("input[name='_id']");
	var inputNombre = formulario.querySelector("input[name='nombre']");
	var inputVendedor = formulario.querySelector("input[name='vendedor']");

    var imageUrlPreview = formulario.querySelector("img.imageUrlPreview");
	var inputImageUrl = formulario.querySelector("input[name='imageUrl']");

	if (productoSession != null) { // EDITAR

		var tramoEditar = JSON.parse(productoSession);

		inputId.value = tramoEditar._id;
		inputNombre.value = tramoEditar.nombre;
		inputVendedor.value = tramoEditar.vendedor;
        imageUrlPreview.src = tramoEditar.imageUrl;

	}
}
function validarEliminar() {

	var productoSession = sessionStorage.getItem("tramoEliminar");
	var formulario = document.querySelector(".contenedor-productos form");
	var inputId = formulario.querySelector("input[name='_id']");
	var inputNombre = formulario.querySelector("input[name='nombre']");
	var inputVendedor = formulario.querySelector("input[name='vendedor']");

    var imageUrlPreview = formulario.querySelector("img.imageUrlPreview");
	var inputImageUrl = formulario.querySelector("input[name='imageUrl']");


	if (productoSession != null) { // EDITAR

		var tramoEliminar = JSON.parse(productoSession);

		inputId.value = tramoEliminar._id;
		inputNombre.value = tramoEliminar.nombre;
		inputVendedor.value = tramoEliminar.vendedor;
        imageUrlPreview.src = tramoEliminar.imageUrl;

	}
}

function irAgregar(){
	sessionStorage.clear();
	location.href='agregarTramo.html'
}
function inicializarpagina(){
    try{
        
        
        boton.addEventListener('click', function(e){
            e.preventDefault('submit')
            enviarFormulario()
        })

        var inputImageUrl = document.querySelector(".contenedor-productos input[type='file']");
		var imageUrlPreview = document.querySelector(".imageUrlPreview");

		inputImageUrl.addEventListener("change", function (evt) {
			const [file] = inputImageUrl.files;
			if (file) {
				imageUrlPreview.src = URL.createObjectURL(file);
			}
		});

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