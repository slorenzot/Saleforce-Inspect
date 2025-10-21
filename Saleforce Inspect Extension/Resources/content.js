console.log('Loaded content.js');

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);
});

browser.runtime.sendMessage({ greeting: "hello" }).then((response) => {
    console.log("Received response: ", response);
});

const pageTitle = document.title;

browser.runtime.sendMessage({ type: "PAGE_INFO", title: pageTitle, url: window.location.href })
    .then((response) => {
        console.log("Respuesta de la extensión: ", response);
    })
    .catch((error) => {
        console.error("Error al enviar mensaje a la extensión: ", error);
    });

// Add a method to divide the page into two panels
function createInspectorPanel() {
    // Create the container for the panels
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.margin = '0';
    container.style.padding = '0';

    // Create the left panel
    const leftPanel = document.createElement('div');
    leftPanel.style.flex = '1';
    leftPanel.style.overflow = 'auto';
    
    // Move the current body content into the left panel
    while (document.body.firstChild) {
        leftPanel.appendChild(document.body.firstChild);
    }

    // Create the right panel
    const rightPanel = document.createElement('div');
    rightPanel.style.width = '20%';
    rightPanel.style.backgroundColor = '#f4f4f4';
    rightPanel.style.display = 'flex';
    rightPanel.style.flexDirection = 'column';
    rightPanel.style.alignItems = 'center';
    rightPanel.style.borderLeft = '1px solid #ccc';

    // Add a header to the inspector panel
    const header = document.createElement('h2');
    header.textContent = 'Inspector';
    header.style.margin = '10px 0';
    rightPanel.appendChild(header);

    // Append the panels to the container
    container.appendChild(leftPanel);
    container.appendChild(rightPanel);

    // Replace the document body with the container
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.appendChild(container);
}

// Call the function to create the inspector panel
createInspectorPanel();