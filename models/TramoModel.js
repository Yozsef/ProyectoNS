let dbconfig = require("./dbconfig");
let {MongoClient} = require("mongodb");
let ObjectId = require("mongodb").ObjectId;
let mongodb = new MongoClient ( dbconfig.connectionString);

module.exports = function(){

	this.read = async function(){

		let connection = await mongodb.connect();
        let tablaTramo = await connection.db("VentasApp2024").collection("Tramos")
        let Tramo = await tablaTramo.find().toArray();
        connection.close()

        return Tramo;
	}
	
	this.readById = async function(id){
	

		let connection = await mongodb.connect();
        let tablaTramos = await connection.db("VentasApp2024").collection("Tramos")
        let Tramos = await tablaTramos.find().toArray();
        connection.close()

		let encontrados = Tramos.filter(p => p._id == id);
		
		if(encontrados.length == 0){
			return null;
		}

		return encontrados[0];
	}
	this.deleteOne = async function(_id){

		let connection = await mongodb.connect();
		let tablaTramos = await connection.db("VentasApp2024").collection("Tramos");
		let respuesta = await tablaTramos.deleteOne({ _id: _id})

		connection.close();

		return respuesta;
	}
	this.create = async function(vendedor){

		let connection = await mongodb.connect();
        let tablaTramo = await connection.db("VentasApp2024").collection("Tramos")
		vendedor._id = new ObjectId().toString();
		let respuesta = await tablaTramo.insertOne(vendedor);
		connection.close();

		return respuesta
	}

	this.update = async function(tramo){

		let connection = await mongodb.connect();
		let tablaTramo = await connection.db("VentasApp2024").collection("Tramos");
		let respuesta = await tablaTramo.updateOne({_id:tramo._id},
			{$set:  {
				nombre: tramo.nombre,
				vendedor: tramo.vendedor,
			} 
			});

		connection.close();

		return respuesta;
	}
}

