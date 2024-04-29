let {Router} = require('express');
let fs = require('fs');
const crypto = require('crypto');

let VendedorModel = require("../models/VendedoresModels");


module.exports = function(app){

	let model = new VendedorModel();

    app.get("/api/listarVendedores", async function(request, response){

		// invocar el modelo
		let listaVendedores = await model.read();

		response.send(listaVendedores);
	});

	app.post("/api/agregarVendedor", async function(request, response){

		let {nombre,telefono,correo,tramo,password, cedula } = request.body;
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

		let nuevoVendedor = {
			_id: "",
			nombre: nombre,
			cedula: cedula,
			telefono: parseInt(telefono),
            correo: correo,
			tramo: tramo,
            password: encrypted
	
		};
		
		
		let resultadoInsert = await model.create(nuevoVendedor);

		let mensaje = "Vendedor no agregado";
		if(resultadoInsert.acknowledged){
			mensaje = "Vendedor guardado!!";
		}

		response.send({message: mensaje});

	});
	

	app.post("/api/loginVendedor", async function(request, response){
		try{
			// tomar datos de entrada (ya vienen sanitizados, pero mejor sanitizar aquí también)
			let tramo = request.body.tramo;
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
			let usuario =  {tramo: tramo, password: encrypted};

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


	app.post("/api/actualizarVendedores", async function(request, response){

		// recoger los datos de clientes
		// let nombre = request.body.nombre;
		let { _id, nombre,correo,telefono,password, tramo } = request.body;

		let vendedorEditado = {
			_id: _id,
            nombre: nombre,
			correo: correo,
            telefono: parseInt(telefono),
			password: password,
            tramo: tramo
			
		};

		// invocar el modelo
		let resultadoUpdate = await model.update(vendedorEditado);

		let mensaje = "Vendedor actualizado!!";
		if(resultadoUpdate == false){
			mensaje = "Vendedor NO actualizado!!";
		}

		response.send({message: mensaje});
	});

	app.delete("/api/eliminarVendedor", async function(request, response){

		// recoger los datos de producto
		// let nombre = request.body.nombre;
		let {_id} = request.body;
		
		
		// invocar el modelo
		let resultadoUpdate = await model.deleteOne(_id);

		let mensaje = "Vendedor no Eliminado";
		if(resultadoUpdate.acknowledged){
			mensaje = "Vendedor Eliminado";
		}

		response.send({message: mensaje});
	});

}