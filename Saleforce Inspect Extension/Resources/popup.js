console.log('Loaded popup.js');

const signInButton = document.getElementById("sign_in_button");
const darkModeToggle = document.getElementById("darkModeToggle"); // Referencia al nuevo switch

if (signInButton) {
    signInButton.addEventListener('click', function() {
        alert('Hello from SigIn button!');
    });
} else {
    console.error("El botón con ID 'sign_in_button' no fue encontrado.");
}

// Lógica para el Modo Oscuro
if (darkModeToggle) {
    // Cargar el estado guardado al iniciar el popup
    browser.storage.local.get('darkModeEnabled').then((result) => {
        darkModeToggle.checked = result.darkModeEnabled || false;
    });

    // Escuchar cambios en el switch
    darkModeToggle.addEventListener('change', () => {
        const isEnabled = darkModeToggle.checked;
        // Guardar la preferencia en el almacenamiento local
        browser.storage.local.set({ darkModeEnabled: isEnabled }).then(() => {
            console.log(`Modo Oscuro guardado: ${isEnabled}`);
        });

        // Enviar un mensaje a las pestañas activas para aplicar/remover el modo oscuro
        // Nota: Esto solo enviará el mensaje a las pestañas activas. Para aplicarlo a las pestañas
        // que se abran después, content.js deberá leer la preferencia al cargarse.
        browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
            tabs.forEach((tab) => {
                browser.tabs.sendMessage(tab.id, {
                    type: "TOGGLE_DARK_MODE",
                    enabled: isEnabled
                }).catch(error => {
                    console.error("Error al enviar mensaje TOGGLE_DARK_MODE: ", error);
                });
                // Recargar la pestaña para aplicar los cambios de estilo si es necesario
                browser.tabs.reload(tab.id);
            });
        });
    });
} else {
    console.error("El switch con ID 'darkModeToggle' no fue encontrado.");
}
