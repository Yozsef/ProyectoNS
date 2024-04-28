const { Router } = require('express');
const fs = require('fs');


const SolicitudModel = require("../models/SolicitudModel");

const { ObjectId } = require("mongodb"); // Import ObjectId from MongoDB

module.exports = function (app) {
    const model = new SolicitudModel();

    app.post("/api/guardarSolicitud", async function (request, response) {
        try {
            // Extracting data from the request body
            let { nombre, numTelefono, correo, nombreNegocio, fileUpload, cedula } = request.body;

            // Generate a new ObjectId for _id field
            let nuevoSolicitud = {
                _id: new ObjectId(),
                nombre: nombre,
                NombreNegocio: nombreNegocio,
                cedula: cedula,
                Correo: correo,
                Telefono: parseInt(numTelefono),
                fileUpload:fileUpload,
                Estado: "EnEspera"
            };

            // Invoking the model to insert the new solicitud
            let resultadoInsert = await model.create(nuevoSolicitud);

            let mensaje = "Solicitud no agregada";
            if (resultadoInsert.acknowledged) {
                mensaje = "Solicitud guardada!!";
            }

            // Sending response back to the client
            response.send({ message: mensaje });
        } catch (error) {
            console.error('Error:', error);
            response.status(500).send({ message: "Error al guardar la solicitud" });
        }
    });
};

