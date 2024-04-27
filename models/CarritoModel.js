let dbconfig = require("./dbconfig");
let { MongoClient } = require("mongodb");
let ObjectId = require("mongodb").ObjectId;
let mongodb = new MongoClient(dbconfig.connectionString);

module.exports = function () {
    this.read = async function () {
        let connection = await mongodb.connect();
        let tablaCarrito = await connection.db("VentasApp2024").collection("Carrito");
        let itemsInCart = await tablaCarrito.find().toArray();
        connection.close();
        return itemsInCart;
    }

    this.create = async function(producto){
        let connection = await mongodb.connect();
        let tablaProductos = await connection.db("VentasApp2024").collection("Carrito");
        let respuesta = await tablaProductos.insertOne(producto);
        connection.close();
        return respuesta;
    }
    
    this.update = async function(productId, updatedFields) {
        let connection = await mongodb.connect();
        let tablaCarrito = await connection.db("VentasApp2024").collection("Carrito");
    
        try {
            // Construct the filter to find the document to update
            let filter = { _id: new ObjectId(productId) };
    
            // Construct the update operation
            let updateOperation = { $set: updatedFields };
    
            // Perform the update operation
            let updateResult = await tablaCarrito.updateOne(filter, updateOperation);
    
            connection.close();
    
            return updateResult;
        } catch (error) {
            console.error("Error updating cart item:", error);
            throw error; // Throw the error to the caller
        }
    }

    this.deleteOne = async function(_id){
        let connection = await mongodb.connect();
        let tablaProductos = await connection.db("VentasApp2024").collection("Carrito");
        let respuesta = await tablaProductos.deleteOne({ _id: _id });
        connection.close();
        return respuesta;
    }

    this.createHis = async function(producto) {
        let connection = await mongodb.connect();
        let tablaProductos = await connection.db("VentasApp2024").collection("usuarioHistorial");
        let respuesta = await tablaProductos.insertMany(producto); 
        
        return respuesta;
    }
    
    this.deleteAll = async function() {
        let connection = await mongodb.connect();
        let tablaProductos = await connection.db("VentasApp2024").collection("Carrito");
        let respuesta = await tablaProductos.deleteMany({}); 
        connection.close();
        return respuesta;
    }
    
}
