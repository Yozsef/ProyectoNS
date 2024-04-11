const form = document.getElementById('formulario');
const nombreProducto = document.getElementById('nombreProducto');
const precioProducto = document.getElementById('precioProducto');
const cantidadProducto = document.getElementById('cantidadProducto');
const categoriaProducto = document.getElementById('categoriaProducto');
const idProducto = document.getElementById('idProducto');
const agregarBtn = document.getElementById('agregarBtn')
const buscarBtn = document.getElementById('agregarBtn')

//VALUES



// VALIDACION CAMPOS
form.addEventListener('submit', e => {
	e.preventDefault();
	

});
agregarBtn.addEventListener('click', e => {
	validateInputs();
	agregarProductos(productos());
})

buscarBtn.addEventListener('click', e => {

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


	if (nombreProductoValue === '') {
		setError(nombreProducto, 'El nombre es requerido')
	} else if (!nombreValidacion(nombreProductoValue)) {
		setError(nombreProducto, 'Necesita ingresar un nombre valido')
	} else {
		setSuccess(nombreProducto)
	}

	if (precioProductoValue === '') {
		setError(precioProducto, 'El precio es requerido')
	} else {
		setSuccess(precioProducto)
		
	}

	if (cantidadProductoValue === '') {
		setError(cantidadProducto, 'La cantidad es requerida')
	} else if (cantidadProductoValue >= 1000) {
		setError(categoriaProducto, 'No puede ingresar mas de 1000 productos')
	} else {
		setSuccess(cantidadProducto)
		
	}

	if (categoriaProductoValue === '') {
		setError(categoriaProducto, 'La categoria es requerida')
	} else if (!nombreValidacion(categoriaProductoValue)) {
		setError(categoriaProducto, 'Necesita ingresar una categoria valida')
	} else {
		setSuccess(categoriaProducto)
	}

	if (idProductoValue === '') {
		setError(idProducto, 'El ID es requerido')
	} else {
		setSuccess(idProducto)
	}


}



const productos = () => {
	
}

// MOSTRAR INFORMACION CAMPOS
const agregarProductos = () => {
	const nombreProductoValue = nombreProducto.value.trim();
	const precioProductoValue = precioProducto.value.trim();
	const cantidadProductoValue = cantidadProducto.value.trim();
	const categoriaProductoValue = categoriaProducto.value.trim();
	const idProductoValue = idProducto.value.trim();


	let tblDatos = document.getElementById('tableBody');
	var row = document.createElement("tr")

	var idCell = document.createElement("td");
	idCell.textContent = idProductoValue;
	row.appendChild(idCell)

	var nombreCell = document.createElement("td");
	nombreCell.textContent = nombreProductoValue;
	row.appendChild(nombreCell)

	var precioCell = document.createElement("td");
	precioCell.textContent = precioProductoValue;
	row.appendChild(precioCell)

	var cantidadCell = document.createElement("td");
	cantidadCell.textContent = cantidadProductoValue;
	row.appendChild(cantidadCell)

	var categoriaCell = document.createElement("td");
	categoriaCell.textContent = cantidadProductoValue;
	row.appendChild(categoriaCell)

	tableBody.appendChild(row);
}


// BUSCAR PRODUCTOS
const buscarProducto = () => {
	const idProductoValue = idProducto.value.trim();
	
	
}