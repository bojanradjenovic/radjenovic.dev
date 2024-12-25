const toggleSerbianButton = document.getElementById('toggleSerbian');
async function redirectByLocation() {
    try {
        const response = await fetch('https://ipwhois.app/json/');
        const data = await response.json();
        const country = data.country_code;
        const redirectCountries = ['RS', 'ME', 'HR', 'BA'];
        if (redirectCountries.includes(country)){
            window.location.href = "/projekti";
            localStorage.setItem('language', 'serbian');
        }
        else {
            localStorage.setItem('language', 'english');
        }

    }

    catch(error){
        console.error('Error fetching geolocation:', error);
    }
}
if(!localStorage.getItem('language')){
    redirectByLocation();
}
if(localStorage.getItem('language') === 'serbian'){
    window.location.href = '/projekti';
}

toggleSerbianButton.addEventListener('click', () => {
    localStorage.setItem('language', 'serbian');
    window.location.href = '/projekti';
}
);