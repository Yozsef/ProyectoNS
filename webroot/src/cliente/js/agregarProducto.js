const form = document.getElementById('formulario');
const nombreProducto = document.getElementById('nombreProducto');
const precioProducto = document.getElementById('precioProducto');
const cantidadProducto = document.getElementById('cantidadProducto');
const categoriaProducto = document.getElementById('categoriaProducto');
const idProducto = document.getElementById('idProducto');




form.addEventListener('submit', e => {
    e.preventDefault();
    
    if(validateInputs() == true){
        inicializarPagina();
        console.log('hola')
    }
    
})

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
	const idProductoValue = idProducto.value.trim();
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

	if (idProductoValue === '') {
		setError(idProducto, 'El ID es requerido')
	} else {
		setSuccess(idProducto)
        idProductoBol = true;
	}
    if(nombreBol == true && precioBol == true && cantidadBol == true && categoriaBol == true && idProductoBol == true){
        return true;
    }


}



async function enviarFormulario(){
	//alert("Formulario enviado!!");

	var formulario = document.querySelector(".contenedor-productos form");
	
	var datosFormulario = new FormData(formulario);// multipart

	var url = "?";
	var productoSession = sessionStorage.getItem("productoEditar");
	if(productoSession != null){
		url = "/api/actualizarproducto";
	}
	else{
		url = "/api/guardarproducto";
	}
	
	var respuestaServidor = await fetch(url, {method: "post", body: datosFormulario});
	var respuesta = await respuestaServidor.json();
	

    console.log("funciono")
    /*
	Swal.fire({
		title: "Productos",
		text: respuesta.message,
		icon: "success"
	});
    */
}
function validarEdicion(){
	var productoSession = sessionStorage.getItem("productoEditar");
		
	var formulario = document.querySelector(".contenedor-productos form");
	var inputId = formulario.querySelector("input[name='_id']");
	var inputNombre = formulario.querySelector("input[name='nombre']");
	var inputPrecio = formulario.querySelector("input[name='precio']");
	var inputCantidad = formulario.querySelector("input[name='cantidad']");
    var inputCategoria = formulario.querySelector("input[name='categoria']");

	var imageUrlPreview = formulario.querySelector("img.imageUrlPreview");
	//var inputImageUrl = formulario.querySelector("input[name='imageUrl']");
	
	
	if(productoSession != null){ // EDITAR
	
		var productoEditar = JSON.parse(productoSession);
		
		inputId.value = productoEditar._id;
		inputNombre.value = productoEditar.nombre;
		inputPrecio.value = productoEditar.precio;
		inputCantidad.value = productoEditar.cantidad;
        inputCategoria.value = productoEditar.categoria;

		imageUrlPreview.src = productoEditar.imageUrl;
		
	}
}

function inicializarPagina(){
    
	/* código para formularioproductos.html*/
	try{

		enviarFormulario();

		var inputImageUrl = document.querySelector(".contenedor-productos input[type='file']");
		var imageUrlPreview = document.querySelector(".imageUrlPreview");

		inputImageUrl.addEventListener("change", function(evt){
			const [file] = inputImageUrl.files;
			if(file){
				imageUrlPreview.src = URL.createObjectURL(file);
			}
		});

		validarEdicion();
	}
	catch(error){ }

	/* código para tablaproductos.html*/

}