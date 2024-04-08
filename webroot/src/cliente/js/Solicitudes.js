document.addEventListener('DOMContentLoaded', function() {
    const completadoCheckbox = document.getElementById('completadoCheckbox');
    const canceladoCheckbox = document.getElementById('canceladoCheckbox');
    const enProcesoCheckbox = document.getElementById('enProcesoCheckbox');
    const filtrarButton = document.getElementById('filtrarButton');

    filtrarButton.addEventListener('click', function() {
        if (!completadoCheckbox.checked && !canceladoCheckbox.checked && !enProcesoCheckbox.checked) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor, marque al menos una casilla para filtrar.'
            });
        } else {
            filtrarSolicitudes();
        }
    });

    function filtrarSolicitudes() {
        const solicitudes = document.querySelectorAll('.page-content table tbody tr');

        solicitudes.forEach(function(solicitud) {
            const estado = solicitud.cells[0].textContent.trim(); // Obtener el estado de la solicitud y limpiar los espacios en blanco
            const mostrar = 
                (completadoCheckbox.checked && estado === 'Completado') ||
                (canceladoCheckbox.checked && estado === 'Cancelado') ||
                (enProcesoCheckbox.checked && estado === 'En Proceso');

            solicitud.style.display = mostrar ? '' : 'none';
        });
    }
});
;





















