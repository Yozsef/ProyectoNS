document.addEventListener("DOMContentLoaded", function () {
    const pedidoContainer = document.getElementById("pedido-container");
    const subtotalElement = document.getElementById("subtotal");
    const impuestosElement = document.getElementById("impuestos");
    const totalElement = document.getElementById("total");

    // Function to fetch cart items from the database
    async function fetchCartItems() {
        try {
            const response = await fetch("/api/listarCarrito");
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching cart items:", error);
            return [];
        }
    }

    // Function to calculate subtotal
    function calculateSubtotal(items) {
        return items.reduce((total, item) => total + item.precio * item.cantidad, 0);
    }

    // Function to calculate taxes (You can customize this according to your needs)
    function calculateTaxes(subtotal) {
        return subtotal * 0.13; // Assuming 13% tax rate
    }

    // Function to update the displayed prices
    function updatePrices(subtotal) {
        const taxes = calculateTaxes(subtotal);
        const total = subtotal + taxes;

        subtotalElement.textContent = subtotal.toFixed(2);
        impuestosElement.textContent = taxes.toFixed(2);
        totalElement.textContent = total.toFixed(2);
    }

    // Function to display items in the cart
    function displayItemsInCart(items) {
        pedidoContainer.innerHTML = ""; // Clear previous content

        items.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("pedido");
            const total = item.cantidad * item.precio; // Calculate total price
            div.innerHTML = `
                <img src="../../../dist/imagenes/${item.nombre.toLowerCase().replace(/\s/g, '')}.jpg">
                <p>${item.nombre}</p>
                <p>Categoria: ${item.categoria}</p>
                <p>Precio: ${item.precio}₡</p>
                <p>Cantidad: ${item.cantidad}</p>
                <p>Total: ${total} </p>
            `;
            pedidoContainer.appendChild(div);
        });
    }

    // Fetch cart items from the database and update the HTML
    fetchCartItems()
        .then(items => {
            displayItemsInCart(items);
            const subtotal = calculateSubtotal(items);
            updatePrices(subtotal);
        })
        .catch(error => console.error("Error:", error));

    // Add event listener to "Completar Pedido" button
    document.getElementById("complete-order").addEventListener("click", async function (event) {
        event.preventDefault();
        const cartItems = await fetchCartItems();
        const response = await fetch("/api/guardarHistorial", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ productList: cartItems })
        });
        if (response.ok) {
            alerta(); // Show success message
        } else {
            console.error("Error placing order");
        }
    });
});

// Function to show SweetAlert
function alerta() {
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Your order has been placed!",
        showConfirmButton: false,
        timer: 3500
    });
}


