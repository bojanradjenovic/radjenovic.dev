const toggleButton = document.getElementById('toggleDarkMode');
const contacttext = document.getElementById('contact-text');
const body = document.body;
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

// Load the user's preference from localStorage or the browser's default
if (localStorage.getItem('dark-mode') === 'enabled' || (prefersDarkScheme && !localStorage.getItem('dark-mode'))) {
    localStorage.setItem('dark-mode', 'enabled');
    body.classList.add('dark-mode');
    contacttext.classList.remove('text-dark');
    contacttext.classList.add('text-white');
    toggleButton.textContent = '🌙';
}

// Toggle dark mode and save preference
toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled');
        toggleButton.textContent = '🌙';
        contacttext.classList.remove('text-dark');
        contacttext.classList.add('text-white');
    } else {
        localStorage.setItem('dark-mode', 'disabled');
        toggleButton.textContent = '☀️';
        contacttext.classList.remove('text-white');
        contacttext.classList.add('text-dark');
    }
});
document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    // Hide previous messages
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';
    
    fetch('https://siteapi.boki.hackclub.app/contact',{
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if(data.success){
            successMessage.style.display = 'block';
            document.getElementById('contact-form').reset();
        } else{
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'An error occurred: ' + data.message;}
    })
    .catch((error) => {
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'An error occurred. Please try again later';
 });
    
});