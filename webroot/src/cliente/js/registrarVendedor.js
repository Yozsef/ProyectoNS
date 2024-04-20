const form = document.getElementById('formulario');
const nombre = document.getElementById('nombre');
const nombreNegocio = document.getElementById('nombreNegocio')
const cedula = document.getElementById('cedula');
const correo = document.getElementById('correo');
const numTelefono = document.getElementById('numTelefono');
const direccion = document.getElementById('direccion');
const fileUpload = document.getElementById('fileUpload');

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

const isValidEmail = correo => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(correo).toLowerCase());
}

const isPDFFile = fileName => {
    const pdfRegex = /\.(pdf)$/i; // Regular expression for PDF files
    return pdfRegex.test(fileName);
};

const validateInputs = () => {
    const nombreValue = nombre.value.trim();
    const cedulaValue = cedula.value.trim();
    const correoValue = correo.value.trim();
    const numTelefonoValue = numTelefono.value.trim();
    const direccionValue = direccion.value.trim();
    const fileUploadValue = fileUpload.value.trim();
    const nombreNegocioValue = nombreNegocio.value.trim();

    if (nombreValue === '') {
        setError(nombre, 'El nombre es requerido')
    } else if (!nombreValidacion(nombreValue)) {
        setError(nombre, 'Necesita ingresar un nombre valido')
    } else {
        setSuccess(nombre)
    }

    if (nombreNegocioValue === '') {
        setError(nombreNegocio, 'El nombre es requerido')
    } else if (!nombreValidacion(nnombreNegocioValueombreValue)) {
        setError(nombreNegocio, 'Necesita ingresar un nombre valido')
    } else {
        setSuccess(nombreNegocio)
    }


    if (cedulaValue === ' ') {
        setError(cedula, 'La cedula es requerida')
    } else if (cedulaValue.length !== 9  && cedulaValue.length !== 11 &&cedulaValue.length !== 12) {
        setError(cedula, 'La cédula debe contener 9, 11 o 12 dígitos')
    } else {
        setSuccess(cedula)
    }

    if (correoValue === '') {
        setError(correo, 'Email is required')
    } else if (!isValidEmail(correoValue)) {
        setError(correo, 'Necesita ingresar un correo valido')
    } else {
        setSuccess(correo)
    }

    if (numTelefonoValue === '') {
        setError(numTelefono, 'Necesita ingresar un telefono')
    } else if (numTelefono.length < 8 || numTelefono.length > 12 ) {
        setError(numTelefono, 'Ingrese un numero de telefono valido');
    } else {
        setSuccess(numTelefono)
    }
    if (direccionValue === '') {
        setError(direccion, 'Necesita ingresar una direccion')
    } else {
        setSuccess(direccion)
    }

    if (fileUpload.files.length === 0) {
        setError(fileUpload, 'Debe subir un archivo');
    } else {
        const fileName = fileUpload.files[0].name;
        const fileNameElement = document.getElementById('file-name');
        fileNameElement.textContent = fileName;
        const allowedExtensions = /\.(pdf)$/i;
        if (!allowedExtensions.test(fileName)) {
            setError(fileUpload, 'Solo se permiten archivos PDF');
        } else {
            setSuccess(fileUpload);
        }
    }

}
