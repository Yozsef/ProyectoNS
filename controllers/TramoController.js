let {Router} = require('express');
let fs = require('fs');

let TramoModel = require("../models/TramoModel");


module.exports = function(app){

	let model = new TramoModel();

    app.get("/api/listarTramos", async function(request, response){

		// invocar el modelo
		let listaTramos = await model.read();

		response.send(listaTramos);
	});

	app.post("/api/agregarTramo", async function(request, response){

		let {nombre,vendedor } = request.body;
        let imageUrl = elToqueDelaImagen(request);
		
		let nuevoTramo = {
			_id: "",
			nombre: nombre,
			vendedor: vendedor,
            imageUrl: imageUrl
		};
		
		let resultadoInsert = await model.create(nuevoTramo);

		let mensaje = "Tramo no agregado";
		if(resultadoInsert.acknowledged){
			mensaje = "Tramo guardado!!";
		}

		response.send({message: mensaje});

	});


	app.post("/api/actualizarTramo", async function(request, response){

		// recoger los datos de clientes
		// let nombre = request.body.nombre;
		let { _id, nombre,vendedor } = request.body;
        let imageUrl = elToqueDelaImagen(request);

		let tramoEditado = {
			_id: _id,
            nombre: nombre,
			vendedor: vendedor,
            imageUrl: imageUrl
			
		};

		// invocar el modelo
		let resultadoUpdate = await model.update(tramoEditado);

		let mensaje = "Tramo actualizado!!";
		if(resultadoUpdate == false){
			mensaje = "Tramo NO actualizado!!";
		}

		response.send({message: mensaje});
	});

	app.delete("/api/eliminarTramo", async function(request, response){

		// recoger los datos de producto
		// let nombre = request.body.nombre;
		let {_id} = request.body;
		
		
		// invocar el modelo
		let resultadoUpdate = await model.deleteOne(_id);

		let mensaje = "Tramo no Eliminado";
		if(resultadoUpdate.acknowledged){
			mensaje = "Tramo Eliminado";
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

	let imageUrl = `/dist/imagenes/${archivo.filename}.${extension}`;

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