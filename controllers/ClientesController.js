let {Router} = require('express');
let fs = require('fs');
const crypto = require('crypto');

let ClientesModel = require("../models/ClientesModel");


module.exports = function(app){

	let model = new ClientesModel();

    app.get("/api/listarClientes", async function(request, response){

		// invocar el modelo
		let listaClientes = await model.read();

		response.send(listaClientes);
	});

	app.post("/api/agregarCliente", async function(request, response){

		let { nombre,telefono,cedula, correo,password } = request.body;

			// encriptar contraseña, para guardarla encriptada en la BD
			// llave de encriptación
			const key = 'mysecretkey';
			// algoritmo de encriptación
			const algorithm = 'aes-256-cbc'; // puede desencriptar también
			
			// crear un objeto de cifrado con el algoritmo y llave definidas
			const cipher = crypto.createCipher(algorithm, key);

			// encriptar la contraseña que está en texto plano
			let encrypted = cipher.update(  password  , 'utf8', 'hex');
			encrypted += cipher.final('hex');

			// prueba de desarrollador
			console.log(encrypted);	
		
		let nuevoCliente = {
			_id: "",
			nombre: nombre,
			cedula: cedula,
			telefono: parseInt(telefono),
			correo: correo,
			password: encrypted,
	
		};
		
		let resultadoInsert = await model.create(nuevoCliente);

		let mensaje = "Cliente no agregado";
		if(resultadoInsert.acknowledged){
			mensaje = "Cliente guardado!!";
		}

		response.send({message: mensaje});

	});

	app.post("/api/loginClientes", async function(request, response){
		try{
			// tomar datos de entrada (ya vienen sanitizados, pero mejor sanitizar aquí también)
			let cedula = request.body.cedula;
			let password = request.body.password;
			// sanitizar aquí ...


			// encriptar contraseña, para compararla con la encriptada de la BD
			// llave de encriptación
			const key = 'mysecretkey';
			// algoritmo de encriptación
			const algorithm = 'aes-256-cbc'; // puede desencriptar también
			
			// crear un objeto de cifrado con el algoritmo y llave definidas
			const cipher = crypto.createCipher(algorithm, key);

			// encriptar la contraseña que está en texto plano
			let encrypted = cipher.update(  password  , 'utf8', 'hex');
			encrypted += cipher.final('hex');

			// prueba de desarrollador
			console.log(encrypted);


			
			// invocar el modelo
			let usuario =  {cedula: cedula, password: encrypted};

			let listaUsuarios = await model.traerUsuarios(usuario);
			
			// Autenticar
			usuario = listaUsuarios; // filtrará desde Mongo
			if(usuario.length > 0){
				usuario = usuario[0]; // tomamos el único elemento de la lista


					
					response.send( 
						{ message: "Logueo Correcto"
						}
					);
				}else{
				response.send( { message: "Logueo incorrecto" } );
				
			}
		}
		catch(error){
		}
	});


	app.post("/api/actualizarclientes", async function(request, response){

		// recoger los datos de clientes
		// let nombre = request.body.nombre;
		let { _id, nombre,cedula, telefono, correo, password } = request.body;

		let clientesEditado = {
			_id: _id,
			cedula: cedula,
			nombre: nombre,
			telefono: parseInt(telefono),
			correo: correo,
			password: password
			
		};

		// invocar el modelo
		let resultadoUpdate = await model.update(clientesEditado);

		let mensaje = "Producto actualizado!!";
		if(resultadoUpdate == false){
			mensaje = "Producto NO actualizado!!";
		}

		response.send({message: mensaje});
	});

	app.delete("/api/eliminarCliente", async function(request, response){

		// recoger los datos de producto
		// let nombre = request.body.nombre;
		let {_id} = request.body;
		
		
		// invocar el modelo
		let resultadoUpdate = await model.deleteOne(_id);

		let mensaje = "No Eliminado";
		if(resultadoUpdate.acknowledged){
			mensaje = "Eliminado";
		}

		response.send({message: mensaje});
	});

}


function elToqueDelaImagen(request){
	//console.log(request.files);
	//let archivo = request.files[0];
	let [ archivo ] = request.files;

	if(archivo == undefined){
		return "";
	}

	let extension = archivo.originalname.split(".");
	extension = extension[extension.length - 1];

	let imageUrl = `../dist/imagenes/${archivo.filename}.${extension}`;

	let viejaRuta = `${archivo.destination}${archivo.filename}`;
	let nuevaRuta = `webroot/${imageUrl}`;

	fs.rename(viejaRuta, nuevaRuta, function (err) {
		if (err){ 
			return "";
		}
		else{
			return imageUrl;
		}
	});

	return imageUrl;
}