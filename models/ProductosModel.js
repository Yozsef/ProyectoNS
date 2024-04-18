let dbconfig = require("./dbconfig");
let {MongoClient} = require("mongodb");
let ObjectId = require("mongodb").ObjectId;
let mongodb = new MongoClient ( dbconfig.connectionString);

module.exports = function(){

	this.read = async function(){

		let connection = await mongodb.connect();
        let tablaProductos = await connection.db("VentasApp2024").collection("Productos")
        let Productos = await tablaProductos.find().toArray();
        connection.close()

        return Productos;
	}
	
	this.readById = async function(id){
	

		let connection = await mongodb.connect();
        let tablaProductos = await connection.db("VentasApp2024").collection("Productos")
        let Productos = await tablaProductos.find().toArray();
        connection.close()

		let encontrados = Productos.filter(p => p._id == id);
		
		if(encontrados.length == 0){
			return null;
		}

		return encontrados[0];
	}
	this.create = async function(producto){

		let connection = await mongodb.connect();
        let tablaProductos = await connection.db("VentasApp2024").collection("Productos")
		producto._id = new ObjectId().toString();
		let respuesta = await tablaProductos.insertOne(producto);
		connection.close();

		return respuesta
	}

	this.update = function(producto){

		// Buscar el elemento
		let productoEncontrado = null;

		for(let p of Productos){
			if(p._id == producto._id){
				productoEncontrado = p;
				break;
			}
		}
		
		// Actualizar el elemento, si existe
		if(productoEncontrado != null){
			productoEncontrado.nombre = producto.nombre;
			productoEncontrado.cantidad = producto.cantidad;
			productoEncontrado.precio = producto.precio;

			if(producto.imageUrl != ""){
				productoEncontrado.imageUrl = producto.imageUrl;
			}

			return true;
		}
		else{
			return false;
		}
	}
}