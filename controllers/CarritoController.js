let {Router} = require('express');
let fs = require('fs');

let CarritoModel = require("../models/CarritoModel");


module.exports = function(app){

	let model = new CarritoModel();

    app.get("/api/listarCarrito", async function (request, response) {
        try {
            let listaCarrito = await model.read();
            response.send(listaCarrito);
        } catch (error) {
            console.error("Error al obtener los elementos del carrito:", error);
            response.status(500).send("Error interno del servidor");
        }
    });

    app.post("/api/agregarAlCarrito", async function (request, response) {
        try {
            let { nombre, precio, cantidad, categoria, imageUrl, idCliente, idVendedor } = request.body;
    
            let producto = { 
                nombre: nombre, 
                precio: parseFloat(precio), 
                cantidad: parseInt(cantidad), 
                categoria: categoria, 
                imageUrl: imageUrl || null,
                idCliente: idCliente || null,
                idVendedor: idVendedor || null
             };
            let result = await model.create(producto);
            
            // Check if product was successfully created and send appropriate response
            if (result) {
                response.json({ message: "Producto agregado al carrito exitosamente" });
            } else {
                response.status(404).json({ message: "No se pudo agregar el producto al carrito" });
            }
        } catch (error) {
            console.error("Error al agregar el elemento al carrito:", error);
            response.status(500).json({ message: "Error interno del servidor" });
        }
    });
    
    app.put("/api/actualizarCarrito/:id", async function (request, response) {
        try {
            let productId = request.params.id;
            let updatedFields = request.body;
            let result = await model.update(productId, updatedFields);
            if (result) {
                response.send("Elemento actualizado exitosamente");
            } else {
                response.status(404).send("Elemento no encontrado");
            }
        } catch (error) {
            console.error("Error al actualizar el elemento del carrito:", error);
            response.status(500).send("Error interno del servidor");
        }
    });




}



