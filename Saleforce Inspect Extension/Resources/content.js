const PREFIX = "SF Inspect";
const DARK_MODE_STYLE_ID = 'salesforce-inspect-dark-mode-style';

// Nuevas constantes para el panel del inspector
const INSPECTOR_PANEL_WIDTH = 300; // Ancho del panel del inspector
const INSPECTOR_HANDLE_WIDTH = 20; // Ancho del handle clicable
const INSPECTOR_PANEL_ID = 'salesforce-inspector-panel';
const INSPECTOR_HANDLE_ID = 'salesforce-inspector-panel-handle';

// Variable global para el estado de visibilidad del panel del inspector
let isInspectorPanelOpen = false;

function print(messge) {
    console.log(PREFIX + ": ", messge);
}

function error(message) {
    console.error(PREFIX + ": ", messge);
}

print('Loaded content.js');

/**
 * Extrae posibles IDs de objetos de Salesforce del DOM.
 * Busca secuencias de 15 o 18 caracteres alfanuméricos en atributos comunes
 * (id, class, href, value, name, data-id, data-record-id) y en el textContent de los elementos.
 *
 * @returns {Array<string>} Un array de IDs de Salesforce únicos encontrados.
 */
function extractSalesforceObjectIds() {
    // Expresión regular para IDs de Salesforce: 15 o 18 caracteres alfanuméricos
    // (letras mayúsculas, minúsculas y números).
    const salesforceIdRegex = /[A-Z0-9]{15,18}/g;
    const foundIds = new Set(); // Usamos un Set para almacenar IDs únicos

    // Selecciona todos los elementos del documento
    const allElements = document.querySelectorAll('*');

    allElements.forEach(element => {
        // Atributos HTML comunes donde se pueden encontrar IDs de Salesforce
        const attributesToScan = [
            'id', 'class', 'href', 'value', 'name',
            'data-id', 'data-record-id', 'data-item-id' // Atributos de datos que suelen contener IDs
        ];

        // Revisa cada atributo del elemento
        attributesToScan.forEach(attr => {
            const attrValue = element.getAttribute(attr);
            if (attrValue) {
                // Busca coincidencias en el valor del atributo
                let matches = attrValue.match(salesforceIdRegex);
                if (matches) {
                    matches.forEach(id => foundIds.add(id));
                }
            }
        });

        // Revisa el contenido de texto del elemento
        if (element.textContent) {
            let matches = element.textContent.match(salesforceIdRegex);
            if (matches) {
                matches.forEach(id => foundIds.add(id));
            }
        }
    });

    // Convierte el Set a un Array antes de retornarlo
    return Array.from(foundIds);
}

function parseLocation(href) {
    try {
        let matches = href.match(/\/([a-zA-Z0-9]+)\/([a-zA-Z0-9]{15,18})\/view$/);
        
        if (matches == null) {
            error('No found Salesorce SObjet and Id on URL...');
            return null;
        }
        
        return {
            sObjet: matches[1],
            id: matches[2]
        }
    } catch(err) {
        error(err);
    }
    
    return null;
}

function isDarkModeEnabled() {
    return document.getElementById(DARK_MODE_STYLE_ID) != null;
}

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
            background-color: #F1F1F1; /* Fondo para evitar blanco puro al invertir */
        }
        body {
            background-color: #F1F1F1;
        }
        img, video, picture {
            filter: invert(1) hue-rotate(180deg);
        }
        /* Asegura que el footer, el panel inspector y su handle no sean invertidos */
        #salesforce-inspect-footer,
        #${INSPECTOR_PANEL_ID},
        #${INSPECTOR_PANEL_ID} *,
        #${INSPECTOR_HANDLE_ID},
        #${INSPECTOR_HANDLE_ID} * {
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
    // const iconUrl = browser.runtime.getURL("images/moon-icon.svg");

    const darkModeTag = `<div style="display: flex; justify-content: center; vertical-align: middle; margin-left: 15px;">
            <svg  style="height: 1em; margin-right: 5px;" class="svg-icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M524.8 938.666667h-4.266667a439.893333 439.893333 0 0 1-313.173333-134.4 446.293333 446.293333 0 0 1-11.093333-597.333334 432.213333 432.213333 0 0 1 170.666666-116.906666 42.666667 42.666667 0 0 1 45.226667 9.386666 42.666667 42.666667 0 0 1 10.24 42.666667 358.4 358.4 0 0 0 82.773333 375.893333 361.386667 361.386667 0 0 0 376.746667 82.773334 42.666667 42.666667 0 0 1 54.186667 55.04A433.493333 433.493333 0 0 1 836.266667 810.666667a438.613333 438.613333 0 0 1-311.466667 128z" /></svg>
            Dark Mode
        </div>`;

    footer.innerHTML = `
    <div style="display: flex; justify-content: center; vertical-align: middle;">
        Salesforce Inspect
        ` + (isDarkModeEnabled() ? darkModeTag : '') + `
    </div>
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
    footer.style.zIndex = '998'; // Asegura que esté por debajo del inspector
    footer.style.fontSize = '14px';
    footer.style.fontFamily = 'sans-serif';
    footer.style.boxSizing = 'border-box'; // Para asegurar que el padding no afecte el ancho.

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

function analyzeSalesforceBundle() {
    print(document);

    //applyDarkMode();
}

function onLoadingStarted() {
    //applyDarkMode();
    
    // TODO:
}

function onInteractiveLoaded() {
    applyDarkMode();
    
    // TODO:
}

// Variable para almacenar la última URL conocida y evitar logs duplicados.
var lastKnownUrl = '';

/**
 * Maneja el cambio de URL y muestra un mensaje.
 * También puede usarse para re-ejecutar lógica de la extensión si es necesario.
 */
function onHandleUrlChange() {
    try {
        const currentUrl = window.location.href;

        if (lastKnownUrl == '') {
            lastKnownUrl = window.location.href;
            
            print("Starting URL monitoring at " + lastKnownUrl);
        } else if (currentUrl !== lastKnownUrl) {
            print(`URL changed to ${currentUrl}`);
            
            lastKnownUrl = currentUrl;
            
            try {
                const matches = parseLocation(currentUrl);
                
                if (matches == null) {
                    print("Not found Salesforce ID in the URL");
                    
                    return false
                }
                
                print(matches[1] + "=" + matches[2]);
            } catch(err) {
                error(err);
            }
            // Aquí podrías agregar cualquier lógica que necesites que se ejecute cuando la URL cambie,
            // por ejemplo, volver a extraer IDs de Salesforce o ajustar el footer si se pierde.
            // removeApplicationFooter();
            // addApplicationFooter();
            // analyzeSalesforceBundle(); // Esto incluye applyDarkMode()
        }
        
       
    } catch(err) {
        print(err);
        
        return false;
    }
    
    return true;
}

function startUrlMonitoring() {
//    onHandleUrlChange();

    // Agrega listeners para cambios de URL tradicionales (historial del navegador y cambios de hash)
    window.addEventListener('popstate', onHandleUrlChange);
    window.addEventListener('hashchange', onHandleUrlChange);

    // Para aplicaciones de una sola página (SPAs) que cambian la URL sin recargar la página
    // y sin usar los eventos popstate/hashchange, a menudo actualizan el título del documento.
    // Usaremos un MutationObserver para detectar cambios en el elemento <title>.
    const titleElement = document.querySelector('head > title');
    
    if (titleElement) {
        const titleObserver = new MutationObserver(function(mutations) {
            try {
                // Si el contenido del título cambia, es una buena indicación de que la URL podría haber cambiado.
                print("...");
                onHandleUrlChange();
            } catch(err) {
                print(err);
            }
        });
        // Observa cambios en los nodos hijos (contenido de texto) del elemento <title>
        titleObserver.observe(titleElement, { childList: true });
    } else {
        print("No se encontró el elemento <title> para el MutationObserver.");
    }
}

function onContentLoaded(event) {
    startUrlMonitoring();
    
    analyzeSalesforceBundle();
    
    // Call the function to create the inspector panel
    createInspectorPanel(); // CORREGIDO: Ya no necesita document.body
    addApplicationFooter();

//     print('Iniciando búsqueda de IDs de Salesforce...');
//     const salesforceIds = extractSalesforceObjectIds();
//     if (salesforceIds.length > 0) {
//         print('IDs de Salesforce encontrados:');
//         salesforceIds.forEach(id => print('- ' + id));
//     } else {
//         print('No se encontraron IDs de Salesforce en el DOM.');
//     }
}

// Function to toggle the panel visibility
function toggleInspectorPanel() {
    const inspectorPanel = document.getElementById(INSPECTOR_PANEL_ID);
    const panelHandle = document.getElementById(INSPECTOR_HANDLE_ID);

    if (!inspectorPanel || !panelHandle) {
        error("Inspector panel or handle not found for toggling.");
        return;
    }

    const handleArrow = panelHandle.querySelector('span');

    if (isInspectorPanelOpen) {
        // Cierra el panel
        inspectorPanel.style.right = `-${INSPECTOR_PANEL_WIDTH}px`;
        panelHandle.style.right = '0'; // El handle permanece en el borde derecho
        if (handleArrow) {
            handleArrow.innerHTML = '&#9664;'; // Flecha apunta a la izquierda para abrir
        }
    } else {
        // Abre el panel
        inspectorPanel.style.right = '0';
        panelHandle.style.right = `${INSPECTOR_PANEL_WIDTH}px`; // El handle se mueve con el panel
        if (handleArrow) {
            handleArrow.innerHTML = '&#9654;'; // Flecha apunta a la derecha para cerrar
        }
    }
    isInspectorPanelOpen = !isInspectorPanelOpen;
}

// Add a method to create the floating inspector panel
function createInspectorPanel() {
    // Check if inspector panel already exists to prevent duplicates
    if (document.getElementById(INSPECTOR_PANEL_ID)) {
        print("Inspector panel already added to the page.");
        return;
    }

    // 1. Crea el panel principal del inspector
    const inspectorPanel = document.createElement('div');
    inspectorPanel.id = INSPECTOR_PANEL_ID;
    inspectorPanel.style.position = 'fixed'; // Hazlo flotante
    inspectorPanel.style.top = '0';
    inspectorPanel.style.right = `-${INSPECTOR_PANEL_WIDTH}px`; // Inicialmente oculto fuera de la pantalla
    inspectorPanel.style.width = `${INSPECTOR_PANEL_WIDTH}px`;
    inspectorPanel.style.height = '100vh'; // Toma la altura completa de la ventana
    inspectorPanel.style.backgroundColor = '#f0f0f0'; // Fondo gris claro
    inspectorPanel.style.display = 'flex';
    inspectorPanel.style.flexDirection = 'column';
    inspectorPanel.style.alignItems = 'center';
    inspectorPanel.style.boxSizing = 'border-box'; // Asegura que el padding/border no afecte el ancho
    inspectorPanel.style.padding = '10px';
    inspectorPanel.style.zIndex = '1000'; // Mayor z-index para estar por encima de todo
    inspectorPanel.style.transition = 'right 0.3s ease-in-out'; // Transición suave

    // Agrega un encabezado al panel
    const header = document.createElement('h1');
    header.textContent = 'Inspector';
    header.style.margin = '10px 0';
    header.style.color = '#333'; // Color de texto
    inspectorPanel.appendChild(header);
    
    // Contenido del cuerpo del panel
    const bodyContent = document.createElement('div');
    bodyContent.textContent = 'Aquí irá el contenido del panel...';
    bodyContent.style.width = '100%';
    bodyContent.style.flexGrow = '1';
    bodyContent.style.overflowY = 'auto'; // Si el contenido es largo, se puede desplazar
    inspectorPanel.appendChild(bodyContent);

    // 2. Crea el "handle" (mango) para el panel del inspector
    const panelHandle = document.createElement('div');
    panelHandle.id = INSPECTOR_HANDLE_ID;
    panelHandle.style.position = 'fixed';
    panelHandle.style.top = '0';
    panelHandle.style.right = '0'; // El handle se mantiene en el borde derecho
    panelHandle.style.width = `${INSPECTOR_HANDLE_WIDTH}px`;
    panelHandle.style.height = '100vh';
    panelHandle.style.backgroundColor = '#f0f0f0'; // Coincide con el fondo del panel
    panelHandle.style.borderLeft = '1px solid #ccc'; // El borde izquierdo solicitado
    panelHandle.style.cursor = 'pointer'; // Indica que es clicable
    panelHandle.style.zIndex = '999'; // Por encima del footer, pero debajo del panel principal
    panelHandle.style.transition = 'right 0.3s ease-in-out'; // Para que se mueva con el panel

    // Agrega un indicador visual (flecha) al handle
    const handleArrow = document.createElement('span');
    handleArrow.innerHTML = '&#9664;'; // Flecha inicial apuntando a la izquierda (para abrir)
    handleArrow.style.position = 'absolute';
    handleArrow.style.top = '50%';
    handleArrow.style.left = '50%';
    handleArrow.style.transform = 'translate(-50%, -50%)';
    handleArrow.style.color = '#555';
    handleArrow.style.fontSize = '18px';
    panelHandle.appendChild(handleArrow);

    // 3. Añade ambos elementos al cuerpo del documento
    document.body.appendChild(inspectorPanel);
    document.body.appendChild(panelHandle);

    // 4. Agrega el event listener al handle
    panelHandle.addEventListener('click', toggleInspectorPanel);
    
    print("Added floating Inspector Panel and Handle...");
}

if (document.readyState === "loading") {
    print("Ready State = Loading");

    onLoadingStarted();
}

if (document.readyState === "interactive") {
    print("Redy State = Interactive");

    onInteractiveLoaded();
}


document.onreadystatechange = () => {
    switch(document.readyState) {
        case "complete":
            print("Redy State = Complete");

            onContentLoaded();
            break;
    }
};


// Al cargarse el content script, verificar el estado del modo oscuro y aplicarlo
browser.storage.local.get('darkModeEnabled').then((result) => {
    print(result);
    if (result.darkModeEnabled) {
        applyDarkMode();
    }
});

// Escuchar mensajes del popup o background script
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    print("Received request: " + request);
    if (request.type === "TOGGLE_DARK_MODE") {
        if (isDarkModeEnabled()) {
            removeDarkMode();
        } else {
            applyDarkMode();
        }
        sendResponse({ status: "Modo oscuro toggled" });
    }
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

