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
	this.deleteOne = async function(_id){

		let connection = await mongodb.connect();
		let tablaProductos = await connection.db("VentasApp2024").collection("Productos");
		let respuesta = await tablaProductos.deleteOne({ _id: _id})

		connection.close();

		return respuesta;
	}
	this.create = async function(producto){

		let connection = await mongodb.connect();
        let tablaProductos = await connection.db("VentasApp2024").collection("Productos")
		producto._id = new ObjectId().toString();
		let respuesta = await tablaProductos.insertOne(producto);
		connection.close();

		return respuesta
	}

	this.update = async function(producto){

		let connection = await mongodb.connect();
		let tablaProductos = await connection.db("VentasApp2024").collection("Productos");
		let respuesta = await tablaProductos.updateOne({_id:producto._id},
			{$set:  {
				nombre: producto.nombre,
				cantidad: producto.cantidad,
				precio: producto.precio,
				categoria: producto.categoria,
				imageUrl: producto.imageUrl
			} 
			});

		connection.close();

		return respuesta;
	}
}
