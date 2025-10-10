if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        try {
            let reg;
            reg = await navigator.serviceWorker.register('/sw.js', { type: "module" });

            console.log('Service worker registrada! 😎', reg);
            postNews();
        } catch (err) {
            console.log('😬 Service worker registro falhou: ', err);
        }
    });
}

const apiKey = '8eb23722c3604b31bf0fff853f4e8765'; 

let urlBase = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}`;
let url = `${urlBase}&q=brasil`;
const main = document.querySelector('main');
const input = document.getElementById('searchInput');
const btn = document.getElementById('searchBtn');

async function postNews() {
    const res = await fetch(url);
    const data = await res.json();
    main.innerHTML = data.articles.map(createArticle).join('\n');
}

function createArticle(article) {
    console.log(article);
    return `
        <div class="article">
            <a href="${article.url}" target="_blank">
                <img src="${article.urlToImage}" 
                     class="image" 
                     alt="${article.content}" />
                <h2>${article.title}</h2>
                <p>${article.description}</p>
            </a>
        </div>
    `;
}

btn.addEventListener('click', () => {
    let valor = input.value.trim();
    if (valor) {
        url = `${urlBase}&q=${valor}`;
        postNews();
    }
});
