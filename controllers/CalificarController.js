const CalificarModel = require("../models/CalificarModel");

module.exports = function (app) {
    const model = new CalificarModel();
    
    app.get("/api/listarCalificar", async function (request, response) {
        try {
            let listaCalificar = await model.read();
            response.send(listaCalificar);
        } catch (error) {
            console.error("Error al obtener los elementos del Calificar:", error);
            response.status(500).send("Error interno del servidor");
        }
    });

    app.post("/api/agregarAlCalificar", async function (request, response) {
        try {
            let { productId, coment, rating, imageUrl } = request.body;

            let producto = { 
                _id: productId,
                estrella: coment, 
                coment: rating, 
                imageUrl: imageUrl || null,
            };
            let result = await model.create(producto);

            if (result) {
                response.json({ message: "Producto agregado al Calificar exitosamente" });
            } else {
                response.status(404).json({ message: "No se pudo agregar el producto al Calificar" });
            }
        } catch (error) {
            console.error("Error al agregar el elemento al Calificar:", error);
            response.status(500).json({ message: "Error interno del servidor" });
        }
    });
}
