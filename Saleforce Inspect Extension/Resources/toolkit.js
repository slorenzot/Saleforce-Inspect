//
//  toolkit.js
//  Saleforce Inspect
//
//  Created by Soulberto Lorenzo on 27/10/25.
//


class UIHelper {
    addSanboxHeader() {
        if (isSandbox()) {
            try {
                // Crear el elemento de encabezado
                const sandboxHeader = document.createElement('div');
                sandboxHeader.id = 'sandbox-warning-header';
                sandboxHeader.textContent = 'PÁGINA EN CONSTRUCCIÓN';

                // Aplicar estilos para posicionamiento, texto y el fondo de barras inclinadas
                Object.assign(sandboxHeader.style, {
                    position: 'fixed', // Para que permanezca visible al hacer scroll
                    top: '0',
                    left: '0',
                    width: '100%',
                    backgroundColor: '#FFFACD', // Un color de fondo suave, como el amarillo claro
                    backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,.3) 0, rgba(255,255,255,.3) 10px, transparent 10px, transparent 20px)',
                    backgroundSize: '40px 40px', // Tamaño del patrón de las barras
                    padding: '10px 0',
                    textAlign: 'center',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#696969', // Color de texto oscuro
                    zIndex: '99999', // Asegura que esté por encima de otros elementos
                    borderBottom: '2px solid #D3D3D3', // Un borde inferior
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)' // Sombra sutil
                });

                // Insertar el encabezado al principio del body
                document.body.prepend(sandboxHeader);
                
                print("Added sandbox header...");
            } catch(err) {
                error(err);
            }
        }
    }
}

print('Loaded toolkit.js');

