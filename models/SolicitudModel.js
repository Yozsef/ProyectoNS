let dbconfig = require("./dbconfig");
let { MongoClient } = require("mongodb");
let ObjectId = require("mongodb").ObjectId;
let mongodb = new MongoClient(dbconfig.connectionString);


module.exports = function () {
    this.create = async function (producto) {

        let connection = await mongodb.connect();
        let tablaProductos = await connection.db("VentasApp2024").collection("Solicitudes")
        producto._id = new ObjectId().toString();
        let respuesta = await tablaProductos.insertOne(producto);
        connection.close();
    }

}