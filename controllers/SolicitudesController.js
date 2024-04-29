let {Router} = require('express');
let fs = require('fs');

let SolicitudesModel = require("../models/SolicitudesModel");


module.exports = function(app){

	let model = new SolicitudesModel();

    app.get("/api/listarSolicitudes", async function(request, response){

		// invocar el modelo
		let listaSolicitudes = await model.read();

		response.send(listaSolicitudes);
	});

	app.post("/api/agregarSolicitud", async function(request, response){

		let {nombre, numTelefono, correo, nombreNegocio, fileUpload, cedula } = request.body;
		
		let nuevoSolicitud = {
			_id: "",
			nombre: nombre,
			NombreNegocio: nombreNegocio,
			cedula: cedula,
			Correo: correo,
			Telefono: parseInt(numTelefono),
			fileUpload:fileUpload,
			Estado: "EnEspera"
        };
		
		let resultadoInsert = await model.create(nuevoSolicitud);

		let mensaje = "Solicitud no agregado";
		if(resultadoInsert.acknowledged){
			mensaje = "Solicitud enviada!!";
		}

		response.send({message: mensaje});

	});


	app.post("/api/actualizarSolicitud", async function(request, response){

		// recoger los datos de clientes
		// let nombre = request.body.nombre;
		let { _id, nombre,cedula,telefono,correo,tramo, estado } = request.body;

        let solicitudEditada = {
            _id:_id,
            nombre: nombre,
            cedula: parseInt(cedula),
            telefono: parseInt(telefono),
            correo: correo,
            tramo: tramo,
            Estado: estado
        };

		// invocar el modelo
		let resultadoUpdate = await model.update(solicitudEditada);

		let mensaje = "Solicitud actualizado!!";
		if(resultadoUpdate == false){
			mensaje = "Solicitud NO actualizado!!";
		}

		response.send({message: mensaje});
	});

	app.delete("/api/eliminarSolicitud", async function(request, response){

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

