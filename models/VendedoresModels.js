let dbconfig = require("./dbconfig");
let {MongoClient} = require("mongodb");
let ObjectId = require("mongodb").ObjectId;
let mongodb = new MongoClient ( dbconfig.connectionString);

module.exports = function(){

	this.read = async function(){

		let connection = await mongodb.connect();
        let tablaVendedores = await connection.db("VentasApp2024").collection("Vendedores")
        let Vendedor = await tablaVendedores.find().toArray();
        connection.close()

        return Vendedor;
	}
	this.traerUsuarios = async function(usuario){

		let connection = await mongodb.connect(); // abrir la conexion
		let tablaUsuarios = await connection.db("VentasApp2024").collection("Vendedores");
		let respuesta = await tablaUsuarios.find( {tramo: usuario.tramo, password: usuario.password} ).toArray();
		connection.close();

		return respuesta;
	}
	
	this.readById = async function(id){
	

		let connection = await mongodb.connect();
        let tablaVendedores = await connection.db("VentasApp2024").collection("Vendedores")
        let Vendedores = await tablaVendedores.find().toArray();
        connection.close()

		let encontrados = Vendedores.filter(p => p._id == id);
		
		if(encontrados.length == 0){
			return null;
		}

		return encontrados[0];
	}
	this.deleteOne = async function(_id){

		let connection = await mongodb.connect();
		let tablaVendedores = await connection.db("VentasApp2024").collection("Vendedores");
		let respuesta = await tablaVendedores.deleteOne({ _id: _id})

		connection.close();

		return respuesta;
	}
	this.create = async function(vendedor){

		let connection = await mongodb.connect();
        let tablaVendedores = await connection.db("VentasApp2024").collection("Vendedores")
		vendedor._id = new ObjectId().toString();
		let respuesta = await tablaVendedores.insertOne(vendedor);
		connection.close();

		return respuesta
	}

	this.update = async function(vendedor){

		let connection = await mongodb.connect();
		let tablaVendedores = await connection.db("VentasApp2024").collection("Vendedores");
		let respuesta = await tablaVendedores.updateOne({_id:vendedor._id},
			{$set:  {
				nombre: vendedor.nombre,
				correo: vendedor.correo,
                telefono: vendedor.telefono,
				password: vendedor.password,
                tramo: vendedor.tramo
			} 
			});

		connection.close();

		return respuesta;
	}
}