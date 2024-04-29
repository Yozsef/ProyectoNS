const form = document.getElementById('paymentForm');
const usuario = document.getElementById('usuario');
const password = document.getElementById('password');
const boton = document.getElementById('submitButton')

boton.addEventListener('click', e =>{
    e.preventDefault();
    if(validateInputs()){
        valirdarCampos()
    }

    
})

function valirdarCampos(){
    if(usuario.value == "Administrador12" && password.value == "123"){
        Swal.fire({
            title: "Logueo correcto",
            text: "Logue conrrecto",
            icon: "success",
    
        }).then(function () {
            window.location = "admin.html";
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
    const usuarioAdmin = usuario.value.trim();
	const passwordCliente = password.value.trim();
    let cedulaBol = false
	let passwordBol = false;



    if (usuarioAdmin === '') {
		setError(usuario, 'Necesita ingresar un usuario')
	}else {
		setSuccess(usuario)
		cedulaBol = true
	}

	if(passwordCliente === ''){
		setError(password, 'La contraseña es requerida')
	}else{
		setSuccess(password)
        passwordBol = true;
	}

	if (passwordBol == true && cedulaBol == true) {
		return true;
	}


}