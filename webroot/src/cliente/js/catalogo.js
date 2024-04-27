window.onload = async function () {
    try {
        const tablaProductosBody = document.querySelector(".tabla");
        const response = await fetch("/api/listarproductos");
        const listaProductos = await response.json();

        tablaProductosBody.innerHTML = "";

        listaProductos.forEach(producto => {
            const nuevaFila = `
                <div id="producto">
                    <img src="${producto.imageUrl}">
                    <h4>${producto.nombre}</h4>
                    <h5>CRC ${producto.precio}</h5>
                    <h5>Cantidad ${producto.cantidad}</h5>
                    <input type="number" id="quantity_${producto._id}" placeholder="Cantidad" min="1" max="${producto.cantidad}" value="1">
                    <button class="buyButton" data-product='${JSON.stringify(producto)}'>Comprar</button>
                </div>`;
            tablaProductosBody.innerHTML += nuevaFila;
        });

        // Agregar manejadores de eventos a los botones de compra
        const buyButtons = document.querySelectorAll(".buyButton");
        buyButtons.forEach(button => {
            button.addEventListener("click", agregarAlCarrito);
        });
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

async function agregarAlCarrito(event) {
    try {
        const button = event.target;
        const producto = JSON.parse(button.getAttribute("data-product"));
        const quantityInput = document.getElementById(`quantity_${producto._id}`);
        const quantity = parseInt(quantityInput.value);
        
        const response = await fetch("/api/agregarAlCarrito", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                productId: producto._id,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: quantity,
                categoria: producto.categoria,
                imageUrl: producto.imageUrl
            })
        });
        const data = await response.json();
        Swal.fire({
            title: 'Producto Agregado',
            text: data.message,
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            location.reload(); 
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
