console.log('Loaded popup.js');

const signInButton = document.getElementById("sign_in_button");

if (signInButton) {
    signInButton.addEventListener('click', function() {
        alert('Hello from SigIn button!');
    });
} else {
    console.error("El botón con ID 'sign_in_button' no fue encontrado.");
}
