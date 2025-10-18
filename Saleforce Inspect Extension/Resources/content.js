console.log('Loaded content.js');

// Function to add the footer
function addApplicationFooter() {
    // Check if a footer already exists to prevent duplicates
    if (document.getElementById('salesforce-inspect-footer')) {
        return;
    }

    const footer = document.createElement('div');
    footer.id = 'salesforce-inspect-footer';
    footer.textContent = 'Salesforce Inspect';
    // Basic inline styles for the footer
    footer.style.position = 'fixed';
    footer.style.bottom = '0';
    footer.style.left = '0';
    footer.style.width = '100%';
    footer.style.backgroundColor = '#222'; // Dark background
    footer.style.color = '#fff'; // White text
    footer.style.textAlign = 'center';
    footer.style.padding = '10px 0';
    footer.style.zIndex = '99999'; // Ensure it's on top of most content
    footer.style.fontSize = '14px';
    footer.style.fontFamily = 'sans-serif';

    document.body.appendChild(footer);

    // Optional: Adjust body padding to prevent content from being hidden behind the footer
    // You might need to refine this based on the actual footer height and page layout.
    document.body.style.paddingBottom = (footer.offsetHeight + 10) + 'px';
}

// Add the footer when the page has fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addApplicationFooter);
} else {
    addApplicationFooter();
}

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
