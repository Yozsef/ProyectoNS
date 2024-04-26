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


    this.create = async function (producto) {
        // Establish a connection to the MongoDB database
        let connection = await mongodb.connect();
        
        // Access the "Productos" collection in the "VentasApp2024" database
        let tablaProductos = await connection.db("VentasApp2024").collection("Productos");
    
        // Generate a new ObjectId for the product
        producto._id = new ObjectId().toString();
    
        // Insert the product into the "Productos" collection
        let respuesta = await tablaProductos.insertOne(producto);
        
        // Close the database connection
        connection.close();
    
        // Return the response from the insert operation
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
            console.error("Error update al carrito:", error);
            throw error; // Throw the error to the caller
        }
    }


}