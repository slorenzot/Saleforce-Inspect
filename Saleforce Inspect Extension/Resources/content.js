const PREFIX = "SF Inspect:";

function print(messge) {
    console.log(PREFIX + " " + messge);
}

print('Loaded content.js');

const DARK_MODE_STYLE_ID = 'salesforce-inspect-dark-mode-style';

function applyDarkMode() {
    let styleElement = document.getElementById(DARK_MODE_STYLE_ID);

    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = DARK_MODE_STYLE_ID;
        document.head.appendChild(styleElement);
    }
    // Puedes refinar estos estilos para un modo oscuro más personalizado
    // Este es un ejemplo simple que invierte colores.
    styleElement.textContent = `
        html {
            filter: invert(1) hue-rotate(180deg);
            background-color: #333; /* Fondo para evitar blanco puro al invertir */
        }
        body {
            background-color: #333;
        }
        img, video, picture {
            filter: invert(1) hue-rotate(180deg);
        }
        /* Si hay elementos que no quieres invertir, añádelos aquí. Ej: */
        #salesforce-inspect-footer { /* NUEVO: Asegura que el footer no sea invertido */
            filter: none;
        }
    `;
    
    print("Applied dark mode...");
}

function removeDarkMode() {
    let styleElement = document.getElementById(DARK_MODE_STYLE_ID);

    if (styleElement) {
        styleElement.remove();
    }
}

// Function to add the footer
function addApplicationFooter() {
    // Check if a footer already exists to prevent duplicates
    if (document.getElementById('salesforce-inspect-footer')) {
        print("Footer alredy added to the page...");
        return;
    }

    const footer = document.createElement('div');
    footer.id = 'salesforce-inspect-footer';
    // Add an SVG icon along with the text
    // CORRECCIÓN: Usa browser.runtime.getURL para obtener la ruta correcta del recurso de la extensión.
    const iconUrl = browser.runtime.getURL("images/moon-icon.svg");

    // NUEVO: Asume que el icono SVG es originalmente blanco y aplica 'invert(1)' para hacerlo oscuro (negro)
    // para que coincida con el color de la fuente (#222) y sea visible sobre un fondo blanco.
    // El filtro global 'img' del modo oscuro ya no lo afectará gracias a la regla añadida en applyDarkMode.
    const iconStyle = "vertical-align: middle; margin-right: 5px; height: 1em; filter: invert(1);";

    footer.innerHTML = `
        <img src="${iconUrl}" style="${iconStyle}">
        Salesforce Inspect (dark mode)
    `;
    // Basic inline styles for the footer
    footer.style.position = 'fixed';
    footer.style.bottom = '0';
    footer.style.left = '0';
    footer.style.width = '100%';
    footer.style.backgroundColor = '#fff';
    footer.style.color = '#222';
    footer.style.textAlign = 'center';
    //footer.style.margin = '10px 0;
    footer.style.padding = '10px 0';
    footer.style.zIndex = '99999'; // Ensure it's on top of most content
    footer.style.fontSize = '14px';
    footer.style.fontFamily = 'sans-serif';

    document.body.appendChild(footer);

    // Optional: Adjust body padding to prevent content from being hidden behind the footer
    // You might need to refine this based on the actual footer height and page layout.
    document.body.style.paddingBottom = (footer.offsetHeight + 10) + 'px';
    
    print("Applied extension footer...");
}

function removeApplicationFooter() {
    let element = document.getElementById('salesforce-inspect-footer');
    // Check if a footer already exists to prevent duplicates
    if (!element) {
        print("Footer not found on the page...");
        return;
    }

    element.remove();
    
    print("Removed extension footer...");
}

// Add the footer when the page has fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addApplicationFooter);
} else {
    addApplicationFooter();
    applyDarkMode();
}

// Al cargarse el content script, verificar el estado del modo oscuro y aplicarlo
browser.storage.local.get('darkModeEnabled').then((result) => {
    if (result.darkModeEnabled) {
        applyDarkMode();
    }
});

// Escuchar mensajes del popup o background script
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    print("Received request: " + request);
//    if (request.type === "TOGGLE_DARK_MODE") {
//        applyDarkMode();
//        sendResponse({ status: "Modo oscuro aplicado" });
//    }
    //applyDarkMode();
    // Si la request es del tipo PAGE_INFO, responder
    if (request.type === "PAGE_INFO") {
         sendResponse({ status: "PAGE_INFO recibido", pageTitle: document.title, pageUrl: window.location.href });
    }
    // Es importante retornar true si vas a enviar sendResponse de forma asíncrona
    return true; 
});

// Los siguientes mensajes son de prueba y se pueden mantener o remover
browser.runtime.sendMessage({ greeting: "hello" }).then((response) => {
    print("Received response: " + response);
});

const pageTitle = document.title;

browser.runtime.sendMessage({ type: "PAGE_INFO", title: pageTitle, url: window.location.href })
    .then((response) => {
        print("Respuesta de la extensión: " + response);
    })
    .catch((error) => {
        print("SF DevTools: Error al enviar mensaje a la extensión: " + error);
    });

