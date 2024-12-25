const toggleEnglishButton = document.getElementById('toggleEnglish');
async function redirectByLocation(){
    try{
        const response = await fetch('https://ipwhois.app/json');
        const data = await response.json();
        const country = data.country_code;
        const redirectCountries = ['RS', 'ME', 'HR', 'BA'];
        if(!redirectCountries.includes(country)){
            window.location.href = "/projects";
            localStorage.setItem('language', 'english');
        } else {
            localStorage.setItem('language', 'serbian');
        }
    } catch (error){
        console.error('Error fetching geolocation:', error);
    }
}
if(!localStorage.getItem('language')){
    redirectByLocation();
}

if(localStorage.getItem('language') === 'english'){
    window.location.href = '/projects';
}

toggleEnglishButton.addEventListener('click', () => {
    localStorage.setItem('language', 'english');
    window.location.href = '/projects';
});
