let dbconfig = require("./dbconfig");
let {MongoClient} = require("mongodb");
let ObjectId = require("mongodb").ObjectId;
let mongodb = new MongoClient ( dbconfig.connectionString);

module.exports = function(){

	this.read = async function(){

		let connection = await mongodb.connect();
        let tablaClientes = await connection.db("VentasApp2024").collection("Clientes")
        let Clientes = await tablaClientes.find().toArray();
        connection.close()

        return Clientes;
	}
	this.traerUsuarios = async function(usuario){

		let connection = await mongodb.connect(); // abrir la conexion
		let tablaUsuarios = await connection.db("VentasApp2024").collection("Clientes");
		let respuesta = await tablaUsuarios.find( {cedula: usuario.cedula, password: usuario.password} ).toArray();
		connection.close();

		return respuesta;
	}
	
	this.readById = async function(id){
	

		let connection = await mongodb.connect();
        let tablaClientes = await connection.db("VentasApp2024").collection("Clientes")
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
		let tablaProductos = await connection.db("VentasApp2024").collection("Clientes");
		let respuesta = await tablaProductos.deleteOne({ _id: _id})

		connection.close();

		return respuesta;
	}
	this.create = async function(producto){

		let connection = await mongodb.connect();
        let tablaClientes = await connection.db("VentasApp2024").collection("Clientes")
		producto._id = new ObjectId().toString();
		let respuesta = await tablaClientes.insertOne(producto);
		connection.close();

		return respuesta
	}

	this.update = async function(cliente){

		let connection = await mongodb.connect();
		let tablaClientes = await connection.db("VentasApp2024").collection("Clientes");
		let respuesta = await tablaClientes.updateOne({_id:cliente._id},
			{$set:  {
				nombre: cliente.nombre,
				telefono: cliente.telefono,
				correo: cliente.correo,
				password: cliente.password
			} 
			});

		connection.close();

		return respuesta;
	}
}