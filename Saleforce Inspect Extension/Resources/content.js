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
