const form = document.getElementById('formulario');
const nombre = document.getElementById('nombre');
const username = document.getElementById('usuario');
const correo = document.getElementById('correo');
const telefono = document.getElementById('telefono');
const password = document.getElementById('password');
const password2 = document.getElementById('password-repeat');
const password3 = document.getElementById('password-confirmation');
const boton = document.getElementById('boton')


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
	const usernameValue = username.value.trim();
	const nombreValue = nombre.value.trim();
	const emailValue = correo.value.trim();
	const telefonoValue = telefono.value.trim();
	const passwordValue = password.value.trim();
	const password2Value = password2.value.trim();
	const password3Value = password3.value.trim();

	if(nombreValue === ''){
		setError(nombre, 'El nombre es requerido')
	}else if(!nombreValidacion(nombreValue)){
		setError(nombre, 'Necesita ingresar un nombre valido')
	}else{
		setSuccess(nombre)
	}

	if(usernameValue === ''){
		setError(username, 'El usuario es requerido')
	}else if(usernameValue.length < 9 || usernameValue.length > 12){
		setError(username, 'Ingrese un usuario correcto')
	}else{
		setSuccess(username)
	}

	if(emailValue === ''){
		setError(correo, 'Email is required')
	}else if(!isValidEmail(emailValue)){
		setError(correo, 'Necesita ingresar un correo valido')
	}else{
		setSuccess(correo)
	}

	if(telefonoValue === ''){
		setError(telefono, 'Necesita ingresar un telefono')
	}else if(telefonoValue.length < 8 || telefonoValue.length > 12){
		setError(telefono, 'Ingrese un numero de telefono valido');
	}else{
		setSuccess(telefono)
	}

	if(passwordValue === ''){
		setError(password, 'La contraseña es requerida')
	}else if(passwordValue !== 'holamundo123'){
		setError(password, 'La contraseña que ingreso esta incorrecta');
	}else{
		setSuccess(password)
	}

	if(password2Value === ''){
		setError(password2, 'La nueva contraseña es requerida')
	}else if(!contraValid(password2Value)){
		setError(password2, 'La contraseña debe tener una letra minúscula, una letra mayúscula, un número, un carácter especial y mínimo 8 dígitos.')
	}else{
		setSuccess(password2)
	}

	if(password3Value === ''){
		setError(password3, 'Por favor confirme su contraseña')
	}else if(password2Value !== password3Value){
		setError(password3, 'Las contraseñas no coinciden')
	}else{
		setSuccess(password3)
	}

}
