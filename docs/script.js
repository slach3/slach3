// script.js

// Configuração do modo escuro
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.documentElement.classList.contains('dark-mode'));
});

// Função para carregar notícias
async function carregarNoticias() {
    try {
        const response = await fetch('noticias.json');
        if (!response.ok) throw new Error('Failed to fetch news');
        const noticias = await response.json();
        
        const container = document.querySelector('.news-container');
        if (!container) {
            console.error('News container not found');
            return;
        }
        
        container.innerHTML = '';
        
        noticias.forEach(noticia => {
            const newsCard = createNewsCard(noticia);
            container.appendChild(newsCard);
        });
    } catch (error) {
        console.error('Error loading news:', error);
        const container = document.querySelector('.news-container');
        if (container) {
            container.innerHTML = '<div class="error-message">Erro ao carregar notícias. Por favor, tente novamente mais tarde.</div>';
        }
    }
}

function createNewsCard(noticia) {
    const article = document.createElement('article');
    article.className = 'news-card';
    
    article.innerHTML = `
        <a href="${noticia.link}" target="_blank" rel="noopener">
            <img src="${noticia.image || 'images/fallback.jpg'}" alt="${noticia.title}" onerror="this.src='images/fallback.jpg'">
            <div class="news-content">
                <h3>${noticia.title}</h3>
                <p class="source">${noticia.source}</p>
            </div>
        </a>
    `;
    
    return article;
}

// Load news when the page is ready
document.addEventListener('DOMContentLoaded', carregarNoticias);