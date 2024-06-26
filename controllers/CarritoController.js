const CarritoModel = require("../models/CarritoModel");

module.exports = function (app) {
    const model = new CarritoModel();

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
            let { productId, nombre, precio, cantidad, categoria, imageUrl } = request.body;

            let producto = { 
                _id: productId,
                nombre: nombre, 
                precio: parseFloat(precio), 
                cantidad: parseInt(cantidad), 
                categoria: categoria, 
                imageUrl: imageUrl || null,
            };
            let result = await model.create(producto);

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

    app.delete("/api/eliminarProducto/:id", async function (request, response) {
        try {
            let productId = request.params.id;
    
            // Retrieve the product's details to get its quantity
            let product = await model.readById(productId);
            if (!product) {
                response.status(404).send("Producto no encontrado");
                return;
            }
    
            let cantidadEliminada = product.cantidad;
    
            // Delete the product from the cart
            let result = await model.deleteOne(productId);
    
            if (result.deletedCount > 0) {
                // Add the removed quantity back to the product's quantity
                await model.actualizarCantidad(productId, cantidadEliminada);
                response.send("Elemento eliminado exitosamente");
            } else {
                response.status(404).send("Elemento no encontrado");
            }
        } catch (error) {
            console.error("Error al eliminar el elemento del carrito:", error);
            response.status(500).send("Error interno del servidor");
        }
    });

    app.post("/api/guardarHistorial", async function (request, response) {
        try {
            const { productList } = request.body;

            // Generate a random idHistorial
            const idHistorial = generateId();

            // Add idHistorial to each product
            const productsWithHistorial = productList.map(product => ({
                ...product,
                idHistorial: idHistorial
            }));

            // Insert all products into "usuarioHistorial" collection
            const historialInsertion = await model.createHis(productsWithHistorial);

            // Delete all products from the "Carrito" collection
            const deleteResult = await model.deleteAll();

            response.json({ message: "Products stored successfully", historialInsertion, deleteResult });
        } catch (error) {
            console.error("Error storing products:", error);
            response.status(500).json({ error: "Internal server error" });
        }
    });

    // Function to generate a random idHistorial
    function generateId() {
        return Math.floor(Math.random() * 1000000); // Example: Generates a random 6-digit number
    }
};
