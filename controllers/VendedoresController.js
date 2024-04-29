let {Router} = require('express');
let fs = require('fs');

let VendedorModel = require("../models/VendedoresModels");


module.exports = function(app){

	let model = new VendedorModel();

    app.get("/api/listarVendedores", async function(request, response){

		// invocar el modelo
		let listaVendedores = await model.read();

		response.send(listaVendedores);
	});

	app.post("/api/agregarVendedor", async function(request, response){

		let {nombre,telefono,correo,tramo,password } = request.body;
		
		let nuevoVendedor = {
			_id: "",
			nombre: nombre,
			telefono: parseInt(telefono),
            correo: correo,
			tramo: tramo,
            password: password
	
		};
		
		let resultadoInsert = await model.create(nuevoVendedor);

		let mensaje = "Vendedor no agregado";
		if(resultadoInsert.acknowledged){
			mensaje = "Vendedor guardado!!";
		}

		response.send({message: mensaje});

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