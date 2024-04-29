let dbconfig = require("./dbconfig");
let { MongoClient } = require("mongodb");
let ObjectId = require("mongodb").ObjectId;
let mongodb = new MongoClient(dbconfig.connectionString);

module.exports = function () {

    this.read = async function () {
        let connection = await mongodb.connect();
        let tablaCarrito = await connection.db("VentasApp2024").collection("Calificar");
        let itemsInCart = await tablaCarrito.find().toArray();
        connection.close();
        return itemsInCart;
    }

    this.create = async function(producto){
        let connection = await mongodb.connect();
        let tablaProductos = await connection.db("VentasApp2024").collection("Calificar");
        producto._id = new ObjectId().toString();
        let respuesta = await tablaProductos.insertOne(producto);
        connection.close();
        return respuesta;
    }


}