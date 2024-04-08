const Swal = require('sweetalert2')

const realizarCompra = document.querySelectorAll("#,btn")
console.log('hola')
const alerta = realizarCompra => {
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
}
realizarCompra.addEventListener('click', e => {
    e.preventDefault();

    
})