let {Router} = require('express');
let fs = require('fs');

let ProductosModel = require("../models/ProductosModel");


module.exports = function(app){

	let model = new ProductosModel();

    app.get("/api/listarproductos", async function(request, response){

		// invocar el modelo
		let listaProductos = await model.read();

		response.send(listaProductos);
	});

	app.post("/api/guardarproducto", async function(request, response){

		let { id, nombre, precio, cantidad, categoria } = request.body;

		let imageUrl = elToqueDelaImagen(request);
		
		let nuevoProducto = {
			_id: id,
			nombre: nombre,
			precio: parseFloat(precio),
			cantidad: parseInt(cantidad),
			categoria: categoria,
			imageUrl: imageUrl
		};
		// invocar el modelo
		let resultadoInsert = await model.create(nuevoProducto);

		let mensaje = "Producto no agregado";
		if(resultadoInsert.acknowledged){
			mensaje = "Producto guardado!!";
		}

		response.send({message: mensaje});

	});


	app.post("/api/actualizarproducto", function(request, response){

		// recoger los datos de producto
		// let nombre = request.body.nombre;
		let { _id, nombre, precio, cantidad } = request.body;
		let imageUrl = elToqueDelaImagen(request);

		let productoEditado = {
			_id: _id,
			nombre: nombre,
			precio: parseFloat(precio),
			cantidad: parseInt(cantidad),
            categoria: categoria,
			imageUrl: imageUrl
		};

		// invocar el modelo
		let resultadoUpdate = model.update(productoEditado);

		let mensaje = "Producto actualizado!!";
		if(resultadoUpdate == false){
			mensaje = "Producto NO actualizado!!";
		}

		response.send({message: mensaje});
	});

	app.post("/api/agregarAlCarrito", async function(request, response) {
        try {
            const { productId, nombre, precio, cantidad, categoria, imageUrl } = request.body;

            // Agregar el producto al carrito
            let result = await model.createCarrito({
                _id: productId,
                nombre: nombre,
                precio: parseFloat(precio),
                cantidad: parseInt(cantidad),
                categoria: categoria,
                imageUrl: imageUrl || null
            });

            if (result) {
                // Actualizar la cantidad del producto en el catálogo
                await model.actualizarCantidad(productId, cantidad);
                response.json({ message: "Producto agregado al carrito exitosamente" });
            } else {
                response.status(404).json({ message: "No se pudo agregar el producto al carrito" });
            }
        } catch (error) {
            console.error("Error al agregar el elemento al carrito:", error);
            response.status(500).json({ message: "Error interno del servidor" });
        }
    });
	app.delete("/api/eliminarproducto", async function(request, response){

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
};


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