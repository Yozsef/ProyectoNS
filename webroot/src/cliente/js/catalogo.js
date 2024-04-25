window.onload = async function () {
    try {
        var tablaProductosBody = document.querySelector(".tabla");
        var respuestaServidor = await fetch("/api/listarproductos");
        var listaProductos = await respuestaServidor.json();

        tablaProductosBody.innerHTML = ""; // Clear existing content

        listaProductos.forEach(producto => {
            var nuevaFila = `
                <div id="producto">
                    <img src="${producto.imageUrl}" alt="">
                    <h4>${producto.nombre}</h4>
                    <h5>CRC ${producto.precio}</h5>
                    <button class="buyButton">Buy Now</button>
                </div>`;
            tablaProductosBody.innerHTML += nuevaFila;
        });
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}
