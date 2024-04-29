const form = document.getElementById('paymentForm');
const tramo = document.getElementById('tramo');
const password = document.getElementById('password');
const boton = document.getElementById('submitButton')

async function login(){
	
	var datosFormulario = new FormData(form);// multipart

	var respuestaServidor = await fetch("/api/loginVendedor", { method: "post", body: datosFormulario} );
	var respuesta = await respuestaServidor.json();


	if(!respuesta.message.usuario){
		Swal.fire({
			title: "Logueo Correcto",
			text: respuesta.message,
			icon: "success",
	
		}).then(function () {
			if(respuesta.message == "Logueo incorrecto"){
				return
			}else{
				window.location = "paginaVendedor.html";
			}
			
		});
	}

}

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

const contraValid = password2 => {
	const re = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/
	return re.test(String(password2));
}

const validateInputs = () => {
    const tramoCliente = tramo.value.trim();
	const passwordCliente = password.value.trim();
    let cedulaBol = false
	let passwordBol = false;



    if (tramoCliente === '') {
		setError(tramo, 'Necesita ingresar un tramo')
	}else {
		setSuccess(tramo)
		cedulaBol = true
	}

	if(passwordCliente === ''){
		setError(password, 'La contraseña es requerida')
	}/*else if(!contraValid(passwordCliente)){
		setError(password, 'La contraseña debe tener una letra minúscula, una letra mayúscula, un número, un carácter especial y mínimo 8 dígitos.')
	}*/else{
		setSuccess(password)
        passwordBol = true;
	}

	if (passwordBol == true && cedulaBol == true) {
		return true;
	}


}

function inicializarPagina(){

	/* código para login.html*/
	try{
		

		boton.addEventListener("click", async function(e){
			e.preventDefault('submit');
			if(validateInputs() == true){
				await login();
			}
		});

	}
	catch(error){
		console.log(error);
	}
}

window.onload = function( ){
	inicializarPagina();
}