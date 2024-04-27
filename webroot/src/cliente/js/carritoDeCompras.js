window.onload = async function () {
    try {
        const carritoIzquierda = document.getElementById("carrito-izquierda");
        const informacionPrecio = document.getElementById("informacion-precio");

        // Function to delete an item from the cart
        async function deleteItem(productId) {
            try {
                const response = await fetch(`/api/eliminarProducto/${productId}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    location.reload(); // Reload the page after successful deletion
                } else {
                    console.error("Error deleting item:", response.statusText);
                    alert("Error deleting item. Please try again later.");
                }
            } catch (error) {
                console.error("Error deleting item:", error);
                alert("Error deleting item. Please try again later.");
            }
        }
        

        // Fetch cart items from the server
        const response = await fetch("/api/listarCarrito");
        const cartItems = await response.json();

        // Iterate through each item in the cart
        cartItems.forEach(item => {
            // Create HTML elements for each item
            const itemElement = document.createElement("div");
            itemElement.classList.add("carrito-info-producto");
            itemElement.innerHTML = `
                <div class="carrito-info-producto">
                    <img src="${item.imageUrl}">
                    <div class="nom-prec">
                        <p>${item.nombre}</p>
                        <p>Precio: ${item.precio}₡</p>
                    </div>
                    <div class="eliminar-agregar">
                        <div class="iconos">
                            <a href="#" class="trash-btn" data-product-id="${item._id}"><img src="../../../dist/imagenes/basurero.png"></a>
                            <p>${item.cantidad}</p>
                        </div>
                    </div>
                </div>
            `;
            // Append the item HTML to the left cart section
            carritoIzquierda.appendChild(itemElement);

            // Add event listener to trash icon
            const trashBtn = itemElement.querySelector(".trash-btn");
            trashBtn.addEventListener("click", (event) => {
                event.preventDefault();
                const productId = event.currentTarget.dataset.productId;
                deleteItem(productId);
            });
        });

        // Calculate total price of all items in the cart
        const subtotal = cartItems.reduce((acc, cur) => acc + (cur.precio * cur.cantidad), 0);
        const impuestos = 0.13 * subtotal; // Assuming 13% taxes
        const servicio = 1500; // Sample service charge
        const total = subtotal + impuestos + servicio;

        // Create HTML for total prices
        const totalPriceHTML = `
            <div class="precios">
                <p>Subtotal</p>
                <p>₡${subtotal}</p>
            </div>
            <div class="precios">
                <p>Impuestos</p>
                <p>₡${impuestos}</p>
            </div>
            <div class="precios">
                <p>Servicio</p>
                <p>₡${servicio}</p>
            </div>
            <div class="precios">
                <p>Total</p>
                <p>₡${total}</p>
            </div>
        `;
        // Append total price HTML to the right cart section
        informacionPrecio.innerHTML = totalPriceHTML;
    } catch (error) {
        console.error("Error fetching cart items or calculating total:", error);
        alert("Error fetching cart items or calculating total. Please try again later.");
    }
}
