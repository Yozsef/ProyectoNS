const form = document.getElementById('formulario');
const nombreProducto = document.getElementById('nombreProducto');
const precioProducto = document.getElementById('precioProducto');
const cantidadProducto = document.getElementById('cantidadProducto');
const categoriaProducto = document.getElementById('categoriaProducto');
const idProducto = document.getElementById('idProducto');


form.addEventListener('submit', e => {
	e.preventDefault();

	validateInputs();
});

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
	const precioProductoValue  = precioProducto.value.trim();
	const cantidadProductoValue  = cantidadProducto.value.trim();
	const categoriaProductoValue  = categoriaProducto.value.trim();
	const idProductoValue  = idProducto.value.trim();

	if(nombreProductoValue === ''){
		setError(nombreProducto, 'El nombre es requerido')
	}else if(!nombreValidacion(nombreProductoValue)){
		setError(nombreProducto, 'Necesita ingresar un nombre valido')
	}else{
		setSuccess(nombreProducto)
	}

    if(precioProductoValue === ''){
		setError(precioProducto, 'El precio es requerido')
	}else{
		setSuccess(precioProducto)
	}

    if(cantidadProductoValue === ''){
		setError(cantidadProducto, 'La cantidad es requerida')
	}else{
		setSuccess(cantidadProducto)
	}

    if(categoriaProductoValue === ''){
		setError(categoriaProducto, 'La categoria es requerida')
	}else if(!nombreValidacion(categoriaProductoValue)){
		setError(categoriaProducto, 'Necesita ingresar un nombre valido')
	}else{
		setSuccess(categoriaProducto)
	}

    if(idProductoValue === ''){
		setError(idProducto, 'La cantidad es requerida')
	}else{
		setSuccess(idProducto)
	}





}