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
                    <h5>Cantidad ${producto.cantidad}</h5>
                    <h5 class="hidden-id">${producto._id}</h5>

                    <input type="number" id="quantity_${producto._id}" placeholder="Cantidad" min="1" max="${producto.cantidad}" value="1" onchange="validateQuantity(this, ${producto.cantidad})">
                    <br>
                    <button class="buyButton" onclick="agregarAlCarrito('${producto._id}','${producto.nombre}', ${producto.precio}, ${producto.cantidad}, '${producto.categoria}', '${producto.imageUrl}')">Comprar</button>
                </div>`;
            tablaProductosBody.innerHTML += nuevaFila;
        });
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

function validateQuantity(input, maxQuantity) {
    if (parseInt(input.value) > maxQuantity) {
        input.value = maxQuantity;
    }
}

async function agregarAlCarrito(productId, nombre, precio, cantidad, categoria, imageUrl) {
    try {
        const quantityInput = document.getElementById(`quantity_${productId}`);
        const quantity = parseInt(quantityInput.value);
        
        const response = await fetch(`/api/agregarAlCarrito`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                productId: productId,
                nombre: nombre,
                precio: parseFloat(precio),
                cantidad: quantity,
                categoria: categoria,
                imageUrl: imageUrl
            })
        });
        const data = await response.json();
        Swal.fire({
            title: 'Producto Agregado',
            text: data.message,
            icon: 'success',
            confirmButtonText: 'OK'
        });
    } catch (error) {
        console.error("Error adding product to carrito:", error);
        Swal.fire({
            title: 'Error',
            text: 'Error al agregar producto al carrito',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}
