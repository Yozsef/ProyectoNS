document.getElementById("paymentForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    var cardNumber = document.getElementById("cardNumber").value;
    var expiryDate = document.getElementById("expiryDate").value;
    var securityCode = document.getElementById("securityCode").value;
    var cardHolderName = document.getElementById("cardHolderName").value;
    var isValid = true;

    // Validación del número de tarjeta (solo números y longitud de 16 dígitos)
    if (!/^\d{16}$/.test(cardNumber)) {
        document.getElementById("cardNumberError").innerText = "El número de tarjeta debe contener exactamente 16 dígitos";
        isValid = false;
    } else {
        document.getElementById("cardNumberError").innerText = "";
    }

    // Validación de la fecha de expiración (formato MM/YY)
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
        document.getElementById("expiryDateError").innerText = "La fecha de expiración debe tener el formato MM/YY";
        isValid = false;
    } else {
        document.getElementById("expiryDateError").innerText = "";
    }

    // Validación del código de seguridad (3 dígitos)
    if (!/^\d{3}$/.test(securityCode)) {
        document.getElementById("securityCodeError").innerText = "El código de seguridad debe tener exactamente 3 dígitos";
        isValid = false;
    } else {
        document.getElementById("securityCodeError").innerText = "";
    }

    // Validación del nombre en la tarjeta (no vacío)
    if (cardHolderName.trim() === "") {
        document.getElementById("cardHolderNameError").innerText = "Por favor, introduce el nombre en la tarjeta";
        isValid = false;
    } else {
        document.getElementById("cardHolderNameError").innerText = "";
    }

    if (isValid) {
        // Display success message
        document.getElementById("successMessage").style.display = "block";

        // Optionally, you can reset the form
        document.getElementById("paymentForm").reset();
    }
});
