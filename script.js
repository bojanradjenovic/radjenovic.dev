const toggleButton = document.getElementById('toggleDarkMode');
const iconLinks = document.querySelectorAll('.d-flex a');
const body = document.body;
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
// Load the user's preference from localStorage or the browser's default
if (localStorage.getItem('dark-mode') === 'enabled' || (prefersDarkScheme && !localStorage.getItem('dark-mode'))) {
    localStorage.setItem('dark-mode', 'enabled');
    body.classList.add('dark-mode');
    toggleButton.textContent = '🌙';
    iconLinks.forEach(icon => {
    icon.classList.remove('text-dark');
    icon.classList.add('text-white');
});
}

// Toggle dark mode and save preference
toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled');
        toggleButton.textContent = '🌙';
        iconLinks.forEach(icon => {
          icon.classList.remove('text-dark');
          icon.classList.add('text-white');
});
    } else {
        localStorage.setItem('dark-mode', 'disabled');
        toggleButton.textContent = '☀️';
        iconLinks.forEach(icon => {
          icon.classList.remove('text-white');
          icon.classList.add('text-dark');
});
       
    }
});