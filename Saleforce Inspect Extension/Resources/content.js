const PREFIX = "SF Inspect";
const DARK_MODE_STYLE_ID = 'salesforce-inspect-dark-mode-style';

// Nuevas constantes para el panel del inspector
const INSPECTOR_PANEL_WIDTH = 420; // Ancho del panel del inspector
const INSPECTOR_HANDLE_WIDTH = 24; // Ancho del handle clicable
const INSPECTOR_PANEL_ID = 'salesforce-inspector-panel';
const INSPECTOR_HANDLE_ID = 'salesforce-inspector-panel-handle';

const MOON_ICON = `<svg  style="height: 1em; margin-right: 5px;" class="svg-icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M524.8 938.666667h-4.266667a439.893333 439.893333 0 0 1-313.173333-134.4 446.293333 446.293333 0 0 1-11.093333-597.333334 432.213333 432.213333 0 0 1 170.666666-116.906666 42.666667 42.666667 0 0 1 45.226667 9.386666 42.666667 42.666667 0 0 1 10.24 42.666667 358.4 358.4 0 0 0 82.773333 375.893333 361.386667 361.386667 0 0 0 376.746667 82.773334 42.666667 42.666667 0 0 1 54.186667 55.04A433.493333 433.493333 0 0 1 836.266667 810.666667a438.613333 438.613333 0 0 1-311.466667 128z" /></svg>`;

const LEFT_ARROW_ICON = `<svg style="transform: rotate(-180deg);" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="8" height="16" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 298 511.93"><path fill-rule="nonzero" d="M70.77 499.85c-16.24 16.17-42.53 16.09-58.69-.15-16.17-16.25-16.09-42.54.15-58.7l185.5-185.03L12.23 70.93c-16.24-16.16-16.32-42.45-.15-58.7 16.16-16.24 42.45-16.32 58.69-.15l215.15 214.61c16.17 16.25 16.09 42.54-.15 58.7l-215 214.46z"/></svg>`;
const RIGHT_ARROW_ICON = `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="8" height="16" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 298 511.93"><path fill-rule="nonzero" d="M70.77 499.85c-16.24 16.17-42.53 16.09-58.69-.15-16.17-16.25-16.09-42.54.15-58.7l185.5-185.03L12.23 70.93c-16.24-16.16-16.32-42.45-.15-58.7 16.16-16.24 42.45-16.32 58.69-.15l215.15 214.61c16.17 16.25 16.09 42.54-.15 58.7l-215 214.46z"/></svg>`

const MAXIMIZE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
    <style type="text/css">
        .st0{fill:#212121;}
    </style>
    <g>
        <path class="st0" d="M270.17,0l214.94,0.04l3.44,0.39l2.49,0.56l2.96,0.98l2.54,1.15l1.81,1.01l1.78,1.18l1.82,1.42l1.8,1.66   l2.69,3.12l2.04,3.16l1.52,3.21l1.01,3l0.44,1.85l0.26,1.49l0.31,4.22v213.46c0,15.71-12.74,28.45-28.45,28.45   c-14.59,0-26.61-10.98-28.26-25.13l-0.19-3.32l-0.01-144.79l-358,357.97l144.72,0.01c14.59,0,26.61,10.98,28.25,25.13l0.19,3.32   c0,14.59-10.98,26.61-25.13,28.26l-3.32,0.19l-215.08-0.05l-2.72-0.29l-2.18-0.43l-2.2-0.62l-1.96-0.72l-2.56-1.2l-2.55-1.53   l-2.6-1.98l0.92,0.76l-4.74-4.71l-1.45-2l-1.1-1.81l-0.94-1.83l-0.96-2.32l-0.71-2.26l-0.67-3.18l-0.21-1.74l-0.11-2.54V270.09   c0-15.71,12.74-28.45,28.45-28.45c14.59,0,26.61,10.98,28.26,25.13l0.19,3.32v144.75L414.86,56.89H270.17   c-14.59,0-26.61-10.98-28.26-25.13l-0.19-3.32C241.72,12.74,254.46,0,270.17,0z"/>
    </g>
    </svg>`;

const NEW_WINDOW_ICON = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
    <style type="text/css">
        .st0{fill-rule:evenodd;clip-rule:evenodd;fill:#1D1D1D;}
    </style>
    <g>
        <path class="st0" d="M455.11,455.11H56.89V56.89H256V0H56.89C25.31,0,0,25.61,0,56.89v398.22C0,486.39,25.31,512,56.89,512h398.22   c31.28,0,56.89-25.61,56.89-56.89V256h-56.89V455.11z M312.89,0v56.89H415L135.39,336.5l40.11,40.11L455.11,97v102.11H512V0H312.89   z"/>
    </g>
    </svg>`;

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
            sObject: matches[1],
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
            ${MOON_ICON} 
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
    //applyDarkMode();
    
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

class InspectorPanel {
    // Contiene una referencia al nodo padre del panel
    #parentNode = null;
    // Variable global para el estado de visibilidad del panel del inspector
    isInspectorPanelOpen = false;
    
    // Function to toggle the panel visibility
    toggle() {
        const inspectorPanel = document.getElementById(INSPECTOR_PANEL_ID);
        const panelHandle = document.getElementById(INSPECTOR_HANDLE_ID);

        if (!inspectorPanel || !panelHandle) {
            error("Inspector panel or handle not found for toggling.");
            return;
        }

        const handleArrow = panelHandle.querySelector('span');

        if (this.isInspectorPanelOpen) {
            // Cierra el panel
            inspectorPanel.style.right = `-${INSPECTOR_PANEL_WIDTH}px`;
            panelHandle.style.right = '0'; // El handle permanece en el borde derecho
            if (handleArrow) {
                handleArrow.innerHTML = LEFT_ARROW_ICON; // Flecha apunta a la izquierda para abrir
            }
        } else {
            // Abre el panel
            inspectorPanel.style.right = '0';
            panelHandle.style.right = `${INSPECTOR_PANEL_WIDTH}px`; // El handle se mueve con el panel
            if (handleArrow) {
                handleArrow.innerHTML = RIGHT_ARROW_ICON; // Flecha apunta a la derecha para cerrar
            }
        }
        this.isInspectorPanelOpen = !this.isInspectorPanelOpen;
    }
    
    render() {
        try {
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
    //        header.style.backgroundColor: '#f0f0f0';
            header.style.color = '#333'; // Color de texto
            inspectorPanel.appendChild(header);
            
    //        const sObject = parseLocation(document.location.href);
            
            // /lightning/r/SURAClaimExposure__c/a8MO9000003YrEfMAK/view
            const currentUrl = document.location.href;
            
            const currentObjectAPIName = 'SURAClaimExposure__c';
            const currentObjectId = 'a8MO9000003YrEfMAK';
            const pageObjectEditor = `/lightning/r/${currentObjectAPIName}/${currentObjectId}/view`;
            const pageLayoutEditor = `/visualEditor/appBuilder.app?id=flexipage__default_rec_L&recordId=a8MO9000003YrEfMAK&cloneable=true&retUrl=${currentUrl}`;
            // Contenido del cuerpo del panel
            const bodyContent = document.createElement('div');
            bodyContent.textContent = 'Instance URL:' + document.location.href;
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
            handleArrow.innerHTML = LEFT_ARROW_ICON; // Flecha inicial apuntando a la izquierda (para abrir)
            handleArrow.style.position = 'absolute';
            handleArrow.style.top = '50%';
            handleArrow.style.left = '50%';
            handleArrow.style.transform = 'translate(-50%, -50%)';
            handleArrow.style.color = '#555';
            handleArrow.style.fontSize = '18px';
            panelHandle.appendChild(handleArrow);

            // 3. Añade ambos elementos al cuerpo del documento
            this.#parentNode.appendChild(inspectorPanel);
            this.#parentNode.appendChild(panelHandle);

            const self = this;
            // 4. Agrega el event listener al handle
            panelHandle.addEventListener('click', function(event) {
                print("Toggle Inspector Panel");
                self.toggle();
            });
            
            print("Added floating Inspector Panel and Handler...");
        } catch(err) {
            error(error);
        }
    }
    
    inject(container) {
        this.#parentNode = container;
        
        this.render();
    }
}

// Add a method to create the floating inspector panel
function createInspectorPanel() {
    new InspectorPanel().inject(document.body);
}

if (document.readyState === "loading") {
    print("Ready State = Loading");

    onLoadingStarted();
}

if (document.readyState === "interactive") {
    print("Ready State = Interactive");

    onInteractiveLoaded();
}


document.onreadystatechange = () => {
    switch(document.readyState) {
        case "complete":
            print("Ready State = Complete");

            onContentLoaded();
            break;
    }
};

browser.storage.local.set({'darkModeEnabled': true});

// Al cargarse el content script, verificar el estado del modo oscuro y aplicarlo
browser.storage.local.get('darkModeEnabled').then((result) => {
    print(result.darkModeEnabled == true ?? false);
    if (result.darkModeEnabled) {
        applyDarkMode();
    }
});

// Escuchar mensajes del popup o background script
/*
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
*/

// Los siguientes mensajes son de prueba y se pueden mantener o remover
/*browser.runtime.sendMessage({ greeting: "hello" }).then((response) => {
    print("Received response: " + response);
});*/

const pageTitle = document.title;

browser.runtime.sendMessage({ type: "PAGE_INFO", title: pageTitle, url: window.location.href })
    .then((response) => {
        print("Respuesta de la extensión: " + response);
    })
    .catch((error) => {
        print("SF DevTools: Error al enviar mensaje a la extensión: " + error);
    });

