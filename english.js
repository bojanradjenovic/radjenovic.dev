const toggleEnglishButton = document.getElementById('toggleEnglish');
const pages = {
    '/projekti/': '/projects/',
    '/kontakt/': '/contact/',
    '/sr/': '/'
}
async function redirectByLocation() {
    try {
      const response = await fetch('https://ipwhois.app/json/');
      const data = await response.json();
      const country = data.country_code; 
      const redirectCountries = ['RS', 'ME', 'HR', 'BA']; 
      if (!redirectCountries.includes(country)) {
        window.location.pathname = pages[window.location.pathname];
        localStorage.setItem('language', 'english');
      } else {
        localStorage.setItem('language', 'serbian');
      }
    } catch (error) {
      console.error('Error fetching geolocation:', error);
    }
  }
if(!localStorage.getItem('language')){
    redirectByLocation();
}

if(localStorage.getItem('language') === 'english'){
    window.location.pathname = pages[window.location.pathname];
}

toggleEnglishButton.addEventListener('click', () => {
    localStorage.setItem('language', 'english');
    window.location.pathname = pages[window.location.pathname];
});