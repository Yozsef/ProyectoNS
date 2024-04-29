const form = document.getElementById('formulario');
const nombre = document.getElementById('nombre');
const nombreNegocio = document.getElementById('nombreNegocio')
const cedula = document.getElementById('cedula');
const correo = document.getElementById('correo');
const numTelefono = document.getElementById('numTelefono');
const direccion = document.getElementById('direccion');
const fileUpload = document.getElementById('fileUpload');

form.addEventListener('submit', async e => {
    e.preventDefault();

    if (validateInputs()) {
        console.log('Validation passed');
        await sendDataToServer();
        console.log('send');
    }
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
    let nombreBol = false;
    let cedulaBol = false;
	let correoBol = false;
	let telefonoBol = false;
    let direccionBol = false;
    let fileBol = false;
    let nombreNegocioBol = false;
	let passwordBol = false;

    if (nombreValue === '') {
        setError(nombre, 'El nombre es requerido')
    } else if (!nombreValidacion(nombreValue)) {
        setError(nombre, 'Necesita ingresar un nombre valido')
    } else {
        setSuccess(nombre)
        nombreBol = true
    }

    if (nombreNegocioValue === '') {
        setError(nombreNegocio, 'El nombre es requerido')
    } else {
        setSuccess(nombreNegocio)
        nombreNegocioBol = true;
    }

    if (cedulaValue === ' ') {
        setError(cedula, 'La cedula es requerida')
    } else if (cedulaValue.length !== 9 && cedulaValue.length !== 11 && cedulaValue.length !== 12) {
        setError(cedula, 'La cédula debe contener 9, 11 o 12 dígitos')
    } else {
        setSuccess(cedula)
        cedulaBol = true;
    }

    if (correoValue === '') {
        setError(correo, 'Email is required')
    } else if (!isValidEmail(correoValue)) {
        setError(correo, 'Necesita ingresar un correo valido')
    } else {
        setSuccess(correo)
        correoBol = true;
    }

    if (numTelefonoValue === '') {
        setError(numTelefono, 'Necesita ingresar un telefono')
    } else if (numTelefono.length < 8 || numTelefono.length > 12) {
        setError(numTelefono, 'Ingrese un numero de telefono valido');
    } else {
        setSuccess(numTelefono)
        telefonoBol = true;
    }
    if (direccionValue === '') {
        setError(direccion, 'Necesita ingresar una direccion')
    } else {
        setSuccess(direccion)
        direccionBol = true;
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
            fileBol = true;
        }
    } 
    if(nombreBol == true && nombreNegocioBol == true && cedulaBol == true && correoBol == true && telefonoBol == true && fileBol == true && direccionBol == true){
        return true
    }

}

const sendDataToServer = async () => {
    const formData = {
        nombre: nombre.value.trim(),
        nombreNegocio: nombreNegocio.value.trim(),
        cedula: cedula.value.trim(),
        correo: correo.value.trim(),
        numTelefono: numTelefono.value.trim(),

        fileUpload: fileUpload.files[0].name
    };

    try {
        const response = await fetch('/api/agregarSolicitud', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        Swal.fire({
            title: "",
            text: data.message,
            icon: "success",
    
        }).then(function () {
            window.location = "clientes.html";
        });
    
    } catch (error) {
        console.error('Error:', error);
    }
}
