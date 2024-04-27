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

    this.readById = async function(id){
	

		let connection = await mongodb.connect();
        let tablaProductos = await connection.db("VentasApp2024").collection("Carrito")
        let Productos = await tablaProductos.find().toArray();

		let encontrados = Productos.filter(p => p._id == id);
		
		if(encontrados.length == 0){
			return null;
		}

		return encontrados[0];
	}

    this.createCarrito = async function(producto){
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
      
        return respuesta;
    }

    this.actualizarCantidad = async function(idProducto, cantidad) {
		try {
			let connection = await mongodb.connect();
			let tablaProductos = await connection.db("VentasApp2024").collection("Productos");
			let respuesta = await tablaProductos.updateOne({ _id: idProducto }, { $inc: { cantidad: +cantidad } });
			connection.close();
			return respuesta;
		} catch (error) {
			console.error("Error al actualizar la cantidad del producto:", error);
			throw error;
		}
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
