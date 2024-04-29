const form = document.getElementById('paymentForm');
const nombre = document.getElementById('nombre');
const cedula = document.getElementById('cedula');
const correo = document.getElementById('correo');
const telefono = document.getElementById('telefono');
const password = document.getElementById('password');
const boton = document.getElementById('submitButton')



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

const nombreValidacion = nombre => {
	const re = /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/;
	return re.test(String(nombre).toLowerCase());
}

const isValidEmail = correo => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(correo).toLowerCase());
}
const contraValid = password2 => {
	const re = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/
	return re.test(String(password2));
}

const validateInputs = () => {
	const nombreCliente = nombre.value.trim();
    const cedulaCliente = cedula.value.trim();
	const correoCliente = correo.value.trim();
	const telefonoCliente = telefono.value.trim();
	const passwordCliente = password.value.trim();
	let nombreBol = false;
    let cedulaBol = false;
	let correoBol = false;
	let telefonoBol = false;
	let passwordBol = false;


	if (nombreCliente === '') {
		setError(nombre, 'El nombre es requerido')
	} else if (!nombreValidacion(nombreCliente)) {
		setError(nombre, 'Necesita ingresar un nombre valido')
	} else {
		setSuccess(nombre)
		nombreBol = true;
	}

    if (cedulaCliente === '') {
		setError(cedula, 'Necesita ingresar una cedula')
	} else if (cedulaCliente.length < 9 || cedulaCliente.length > 9) {
		setError(cedula, 'Ingrese un numero de cedula valido')
	} else {
		setSuccess(cedula)
		cedulaBol = true
	}

	if(correoCliente === ''){
		setError(correo, 'El correo es requerido')
	}else if(!isValidEmail(correoCliente)){
		setError(correo, 'Necesita ingresar un correo valido')
	}else{
		setSuccess(correo)
        correoBol = true;
	}

	if (telefonoCliente === '') {
		setError(telefono, 'Necesita ingresar un telefono')
	} else if (telefonoCliente.length < 8 || telefonoCliente.length > 12) {
		setError(telefono, 'Ingrese un numero de telefono valido')
	} else {
		setSuccess(telefono)
		telefonoBol = true
	}

	if(passwordCliente === ''){
		setError(password, 'La contraseña es requerida')
	}else if(!contraValid(passwordCliente)){
		setError(password, 'La contraseña debe tener una letra minúscula, una letra mayúscula, un número, un carácter especial y mínimo 8 dígitos.')
	}else{
		setSuccess(password)
        passwordBol = true;
	}

	if (nombreBol == true && correoBol == true && telefonoBol == true && passwordBol == true && cedulaBol == true) {
		return true;
	}


}


async function enviarFormulario() {
	//alert("Formulario enviado!!");

	var datosFormulario = new FormData(form);// multipart

	var url = "/api/agregarCliente";

	var respuestaServidor = await fetch(url, { method: "post", body: datosFormulario });
	var respuesta = await respuestaServidor.json();



	console.log("funciono")

	Swal.fire({
		title: "Productos",
		text: respuesta.message,
		icon: "success",

	}).then(function () {
		//window.location = "paginaVendedor.html";
	});

}












function inicializarPagina() {

	/* código para formularioproductos.html*/
	try {

		boton.addEventListener('click', e => {
			e.preventDefault('submit')
			if (validateInputs() == true) {
                console.log('hola')
				enviarFormulario();
				
			}
		})
		
		
	}
	catch (error) { 

    }


}

window.onload = function () {
	inicializarPagina();
	
}