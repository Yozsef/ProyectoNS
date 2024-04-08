document.addEventListener('DOMContentLoaded', function() {
    
    function tableToArray(table) {
        var data = [];
        for (var i = 0; i < table.rows.length; i++) {
            var row = [];
            for (var j = 0; j < table.rows[i].cells.length; j++) {
                row.push(table.rows[i].cells[j].textContent);
            }
            data.push(row);
        }
        return data;
    }

   
    function agregarFila() {
        var tabla = document.getElementById('tablaReportes').getElementsByTagName('tbody')[0];
        var nuevaFila = tabla.insertRow();
        
        
        var agente = 'Nuevo Agente';
        var cliente = 'Nuevo Cliente';
        var producto = 'Nuevo Producto';
        var precio = 'Nuevo Precio';
        var estado = 'Nuevo Estado';
        
        nuevaFila.innerHTML = '<td>' + agente + '</td>' +
                              '<td>' + cliente + '</td>' +
                              '<td>' + producto + '</td>' +
                              '<td>' + precio + '</td>' +
                              '<td>' + estado + '</td>';
    }

    
    document.getElementById('exportarExcel').addEventListener('click', function() {
        // Obtener la tabla
        var tabla = document.getElementById('tablaReportes');
        
       
        var workbook = XLSX.utils.book_new();
        
       
        var data = tableToArray(tabla);
        
        l
        var sheet = XLSX.utils.aoa_to_sheet(data);
        
        
        XLSX.utils.book_append_sheet(workbook, sheet, 'Reporte');
        
        
        XLSX.writeFile(workbook, 'reporte.xlsx');
    });

   
    document.getElementById('agregarFila').addEventListener('click', agregarFila);
});



