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
