let dbconfig = require("./dbconfig");
let {MongoClient} = require("mongodb");
let ObjectId = require("mongodb").ObjectId;
let mongodb = new MongoClient ( dbconfig.connectionString);

module.exports = function(){

	this.read = async function(){

		let connection = await mongodb.connect();
        let tablaClientes = await connection.db("VentasApp2024").collection("Solicitudes")
        let Clientes = await tablaClientes.find().toArray();
        connection.close()

        return Clientes;
	}
	
	this.readById = async function(id){
	

		let connection = await mongodb.connect();
        let tablaClientes = await connection.db("VentasApp2024").collection("Solicitudes")
        let Clientes = await tablaClientes.find().toArray();
        connection.close()

		let encontrados = Clientes.filter(p => p._id == id);
		
		if(encontrados.length == 0){
			return null;
		}

		return encontrados[0];
	}
	this.deleteOne = async function(_id){

		let connection = await mongodb.connect();
		let tablaProductos = await connection.db("VentasApp2024").collection("Solicitudes");
		let respuesta = await tablaProductos.deleteOne({ _id: _id})

		connection.close();

		return respuesta;
	}
	this.create = async function(producto){

		let connection = await mongodb.connect();
        let tablaClientes = await connection.db("VentasApp2024").collection("Solicitudes")
		producto._id = new ObjectId().toString();
		let respuesta = await tablaClientes.insertOne(producto);
		connection.close();

		return respuesta
	}

	this.update = async function(solicitud){

		let connection = await mongodb.connect();
		let tablaClientes = await connection.db("VentasApp2024").collection("Solicitudes");
		let respuesta = await tablaClientes.updateOne({_id:solicitud._id},
			{$set:  {
                nombre: solicitud.nombre,
                cedula: solicitud.cedula,
                telefono: solicitud.telefono,
                correo: solicitud.correo,
                tramo: solicitud.tramo,
                Estado: solicitud.Estado
			} 
			});

		connection.close();

		return respuesta;
	}
}