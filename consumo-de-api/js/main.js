if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        try {
            let reg;
            reg = await navigator.serviceWorker.register('/sw.js', { type: "module" });
            console.log('Service worker registrada! 😎', reg);
            postCountries();
        } catch (err) {
            console.log('😬 Service worker registro falhou: ', err);
        }
    });
}

let urlBase = `https://restcountries.com/v3.1/region/america`;
let url = urlBase; 
const main = document.querySelector('main');
const input = document.getElementById('searchInput');
const btn = document.getElementById('searchBtn');


async function postCountries() {
    const res = await fetch(url);
    const data = await res.json();
    main.innerHTML = data.map(createCountry).join('\n');
}


function createCountry(country) {
    return `
        <div class="article">
            <img src="${country.flags?.png}" class="image" alt="Bandeira de ${country.name.common}">
            <h2>País: ${country.name.common}</h2>
            <p>Capital: ${country.capital ? country.capital[0] : 'Não disponível'}</p>
        </div>
    `;
}


btn.addEventListener('click', () => {
    let valor = input.value.trim();
    if (valor) {
        url = `https://restcountries.com/v3.1/name/${valor}`;
        postCountries();
    } 
});
