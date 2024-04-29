const form = document.getElementById('formulario');
const nombreProducto = document.getElementById('nombreProducto');
const precioProducto = document.getElementById('precioProducto');
const cantidadProducto = document.getElementById('cantidadProducto');
const categoriaProducto = document.getElementById('categoriaProducto');
const idProducto = document.getElementById('idProducto');
const btnGuardar = document.getElementById('btnGuardarProductos');
const titulo = document.getElementById('agregarh2')



const setError = (element, message) => {
	const inputControl = element.parentElement;
	const errorDisplay = inputControl.querySelector('.error')

	errorDisplay.innerText = message;
	inputControl.classList.add('error')
	inputControl.classList.remove('succes')
}

const setSuccess = element => {
	const inputControl = element.parentElement;
	const errorDisplay = inputControl.querySelector('.error');

	errorDisplay.innerText = '';
	inputControl.classList.add('success');
	inputControl.classList.remove('error');
}

const nombreValidacion = nombreProducto => {
	const re = /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/;
	return re.test(String(nombreProducto).toLowerCase());
}

const validateInputs = () => {
	const nombreProductoValue = nombreProducto.value.trim();
	const precioProductoValue = precioProducto.value.trim();
	const cantidadProductoValue = cantidadProducto.value.trim();
	const categoriaProductoValue = categoriaProducto.value.trim();
	let nombreBol = false;
	let precioBol = false;
	let cantidadBol = false;
	let categoriaBol = false;
	let idProductoBol = false;


	if (nombreProductoValue === '') {
		setError(nombreProducto, 'El nombre es requerido')
	} else if (!nombreValidacion(nombreProductoValue)) {
		setError(nombreProducto, 'Necesita ingresar un nombre valido')
	} else {
		setSuccess(nombreProducto)
		nombreBol = true;
	}

	if (precioProductoValue === '') {
		setError(precioProducto, 'El precio es requerido')
	} else {
		setSuccess(precioProducto)
		precioBol = true;
	}

	if (cantidadProductoValue === '') {
		setError(cantidadProducto, 'La cantidad es requerida')
	} else if (cantidadProductoValue >= 1000) {
		setError(categoriaProducto, 'No puede ingresar mas de 1000 productos')
	} else {
		setSuccess(cantidadProducto)
		cantidadBol = true
	}

	if (categoriaProductoValue === '') {
		setError(categoriaProducto, 'La categoria es requerida')
	} else if (!nombreValidacion(categoriaProductoValue)) {
		setError(categoriaProducto, 'Necesita ingresar una categoria valida')
	} else {
		setSuccess(categoriaProducto)
		categoriaBol = true;
	}

	if (nombreBol == true && precioBol == true && cantidadBol == true && categoriaBol == true) {
		return true;
	}


}
// BUSCAR PRODUCTOS

async function cargarTablaProductos() {
	try {
		var tablaProductosBody = document.querySelector(".tabla table tbody");
		var respuestaServidor = await fetch("/api/listarproductos");
		var listaProductos = await respuestaServidor.json();

		var numeroFilas = listaProductos.length; // número elementos

		tablaProductosBody.innerHTML = ""; // esto "limpia" el contenido anterior

		//for(var n = 0; n < numeroFilas; n++){
		for (var p of listaProductos) {

			var elJSONenString = JSON.stringify(p);

			var nuevaFila = `<tr>
								<td>${p._id}</td>
								<td>${p.nombre}</td>
								<td>${p.precio}</td>
								<td>${p.cantidad}</td>
								<td>${p.categoria}</td>
								<td>
									<i class="fa-solid fa-pencil">
										<span style="display: none;">${elJSONenString}</span>
									</i>
									
								</td>
								<td>
								<i class="fa-solid fa-trash">
										<span style="display: none;">${elJSONenString}</span>
								</i> 
								</td>

							</tr>`;

			tablaProductosBody.innerHTML += nuevaFila;
		}


		
		var botonesEditar = document.querySelectorAll("tbody .fa-pencil");
		var botonEliminar = document.querySelectorAll("tbody .fa-trash");

		for (var boton of botonesEditar) {
			boton.addEventListener("click", function (event) {
				var yo = event.target;
				var miSpanInterno = yo.querySelector("span");

				sessionStorage.setItem("productoEditar", miSpanInterno.innerHTML);

				document.location.href = "agregarProductos.html";
				
			});
		}
		for (var boton2 of botonEliminar) {
			boton2.addEventListener("click", function (event) {
				
				var yo = event.target;
				var miSpanInterno = yo.querySelector("span");

				sessionStorage.setItem("productoEliminar", miSpanInterno.innerHTML);
				console.log(miSpanInterno)
				document.location.href = "agregarProductos.html";
			});
		}

	}
	catch (error) {

	}
}

async function enviarFormulario() {
	//alert("Formulario enviado!!");

	var formulario = document.querySelector(".contenedor-productos2 form");
	let metodo = true;
	var datosFormulario = new FormData(formulario);// multipart

	var url = "?";
	var productoSession = sessionStorage.getItem("productoEditar");
	var productoSessionEliminar = sessionStorage.getItem("productoEliminar")
	if (productoSession != null) {
		url = "/api/actualizarproducto";
		console.log('actualizar')
		
	}else if(productoSessionEliminar != null){
		url = "/api/eliminarproducto";
		metodo = false;
	}else {
		url = "/api/guardarproducto";
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
		window.location = "paginaVendedor.html";
	});

}
function validarEdicion() {

	var productoSession = sessionStorage.getItem("productoEditar");
	var formulario = document.querySelector(".contenedor-productos2 form");
	var inputId = formulario.querySelector("input[name='_id']");
	var inputNombre = formulario.querySelector("input[name='nombre']");
	var inputPrecio = formulario.querySelector("input[name='precio']");
	var inputCantidad = formulario.querySelector("input[name='cantidad']");
	var inputCategoria = formulario.querySelector("input[name='categoria']");

	var imageUrlPreview = formulario.querySelector("img.imageUrlPreview");
	var inputImageUrl = formulario.querySelector("input[name='imageUrl']");

	if (productoSession != null) { // EDITAR

		var productoEditar = JSON.parse(productoSession);

		inputId.value = productoEditar._id;
		inputNombre.value = productoEditar.nombre;
		inputPrecio.value = productoEditar.precio;
		inputCantidad.value = productoEditar.cantidad;
		inputCategoria.value = productoEditar.categoria;
		imageUrlPreview.src = productoEditar.imageUrl;

	}
}
function validarEliminar() {

	var productoSession = sessionStorage.getItem("productoEliminar");
	var formulario = document.querySelector(".contenedor-productos2 form");
	var inputId = formulario.querySelector("input[name='_id']");
	var inputNombre = formulario.querySelector("input[name='nombre']");
	var inputPrecio = formulario.querySelector("input[name='precio']");
	var inputCantidad = formulario.querySelector("input[name='cantidad']");
	var inputCategoria = formulario.querySelector("input[name='categoria']");

	var imageUrlPreview = formulario.querySelector("img.imageUrlPreview");
	var inputImageUrl = formulario.querySelector("input[name='imageUrl']");

	if (productoSession != null) { // EDITAR

		var productoEliminar = JSON.parse(productoSession);

		inputId.value = productoEliminar._id;
		inputNombre.value = productoEliminar.nombre;
		inputPrecio.value = productoEliminar.precio;
		inputCantidad.value = productoEliminar.cantidad;
		inputCategoria.value = productoEliminar.categoria;
		imageUrlPreview.src = productoEliminar.imageUrl;

	}
}
function irAgregar(){
	sessionStorage.clear();
	location.href='agregarProductos.html'
	titulo.textContent = "Agregar Productos";
}

function inicializarPagina() {

	/* código para formularioproductos.html*/
	try {

		btnGuardar.addEventListener('click', e => {
			
			e.preventDefault('submit')
			if (validateInputs() == true) {
				enviarFormulario();
				console.log('hola')
			}
		})

		
		var inputImageUrl = document.querySelector(".contenedor-productos2 input[type='file']");
		var imageUrlPreview = document.querySelector(".imageUrlPreview");

		inputImageUrl.addEventListener("change", function (evt) {
			const [file] = inputImageUrl.files;
			if (file) {
				imageUrlPreview.src = URL.createObjectURL(file);
			}
		});
		
		
		validarEdicion();
		validarEliminar();
	}
	catch (error) { }
	try {
		cargarTablaProductos();
	}
	catch (error) { }
	/* código para tablaproductos.html*/

}

window.onload = function () {
	inicializarPagina();
	
}