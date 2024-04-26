window.onload = async function () {
    try {
        var tablaProductosBody = document.querySelector(".tabla");
        var respuestaServidor = await fetch("/api/listarproductos");

        var listaProductos = await respuestaServidor.json();

        tablaProductosBody.innerHTML = "";

        listaProductos.forEach(producto => {
            var nuevaFila = `
                <div id="producto">
                    <img src="${producto.imageUrl}" alt="">
                    <h4>${producto.nombre}</h4>
                    <h5>CRC ${producto.precio}</h5>
                    <h5 class="hidden-id">${producto._id}</h5>
                    
                    <button class="buyButton" onclick="agregarAlCarrito('${producto._id}')">Comprar</button>
                    </div>`;
            tablaProductosBody.innerHTML += nuevaFila;
        });
    } catch (error) {
        console.error("Error fetching products:", error);
    }

 

}

async function agregarAlCarrito(productId) {
    try {
        const response = await fetch(`/api/agregarAlCarrito`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId: productId })
        });
        const data = await response.json();
        alert(data.message); // Display success message
    } catch (error) {
        console.error("Error adding product to carrito:", error);
        alert("Error al agregar producto al carrito"); // Display error message
    }
}
