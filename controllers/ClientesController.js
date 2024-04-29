let {Router} = require('express');
let fs = require('fs');

let ClientesModel = require("../models/ClientesModel");


module.exports = function(app){

	let model = new ClientesModel();

    app.get("/api/listarClientes", async function(request, response){

		// invocar el modelo
		let listaClientes = await model.read();

		response.send(listaClientes);
	});

	app.post("/api/agregarCliente", async function(request, response){

		let { nombre,telefono,correo,password } = request.body;
		
		let nuevoCliente = {
			_id: "",
			nombre: nombre,
			telefono: parseInt(telefono),
			correo: correo,
			password: password,
	
		};
		
		let resultadoInsert = await model.create(nuevoCliente);

		let mensaje = "Cliente no agregado";
		if(resultadoInsert.acknowledged){
			mensaje = "Cliente guardado!!";
		}

		response.send({message: mensaje});

	});


	app.post("/api/actualizarclientes", async function(request, response){

		// recoger los datos de clientes
		// let nombre = request.body.nombre;
		let { _id, nombre, telefono, correo, password } = request.body;

		let clientesEditado = {
			_id: _id,
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