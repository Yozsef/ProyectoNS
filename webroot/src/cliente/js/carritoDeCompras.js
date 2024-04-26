window.onload = async function () {
    try {
        const carritoIzquierda = document.getElementById("carrito-izquierda");
        const informacionPrecio = document.getElementById("informacion-precio");

        // Fetch product data from the server
        const response = await fetch("/api/listarCarrito");
        const productos = await response.json();

        // Fetch and render details for each product
        const productosDetails = await Promise.all(productos.map(async producto => {
            // Fetch product details by ID
            const response = await fetch(`/api/listarproducto/${producto._id}`);
            const productDetails = await response.json();

            // Merge product details with existing product data
            return { ...producto, ...productDetails };
        }));

        // Render products in the left cart section
        productosDetails.forEach(producto => {
            const productoHTML = `
                <h2>${producto.vendedor}</h2>
                <div class="carrito-info-producto">
                    <img src="${producto.imageUrl}">
                    <div class="nom-prec">
                        <p>${producto.nombre}</p>
                        <p>Precio: ${producto.precio}₡</p>
                    </div>
                    <div class="eliminar-agregar">
                        <div class="iconos">
                            <a href=""><img src="../../../dist/imagenes/plus.png"></a>
                            <p>${producto.cantidad}</p>
                            <a href=""><img src="../../../dist/imagenes/basurero.png"></a>
                        </div>
                    </div>
                </div>
            `;
            carritoIzquierda.innerHTML += productoHTML;
        });

        // Calculate total based on product data
        const subtotal = productosDetails.reduce((acc, cur) => acc + (cur.precio * cur.cantidad), 0);
        const impuestos = 0.13 * subtotal; // Assuming 13% taxes
        const servicio = 1500; // Sample service charge
        const total = subtotal + impuestos + servicio;

        // Render total in the right cart section
        informacionPrecio.innerHTML = `
            <div class="precios">
                <p>Subtotal</p>
                <p>${subtotal}₡</p>
            </div>
            <div class="precios">
                <p>Impuestos</p>
                <p>${impuestos}₡</p>
            </div>
            <div class="precios">
                <p>Servicio</p>
                <p>${servicio}₡</p>
            </div>
            <div class="precios">
                <p>Total</p>
                <p>${total}₡</p>
            </div>
        `;
    } catch (error) {
        console.error("Error fetching products or calculating total:", error);
        alert("Error fetching products or calculating total. Please try again later.");
    }
}
