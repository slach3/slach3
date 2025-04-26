// script.js

document.addEventListener('DOMContentLoaded', () => {
    inicializarSite();
});

function inicializarSite() {
    // Verifica se as notícias foram carregadas
    if (typeof noticias === 'undefined' || !noticias) {
        console.error('Erro: Notícias não carregadas');
        mostrarErro();
        return;
    }

    // Configura o modo escuro
    configurarModoEscuro();

    // Configura navegação
    configurarNavegacao();

    // Carrega notícias iniciais
    const categoriaAtual = localStorage.getItem('categoria') || 'todas';
    filtrarPorCategoria(categoriaAtual);
}

function configurarNavegacao() {
    const links = document.querySelectorAll('nav a');
    const categoriaAtual = localStorage.getItem('categoria') || 'todas';

    links.forEach(link => {
        const categoria = link.querySelector('span').textContent.toLowerCase();
        
        // Marca o link ativo inicial
        if (categoria === categoriaAtual) {
            link.classList.add('active');
        }

        // Adiciona evento de clique
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active de todos os links
            links.forEach(l => l.classList.remove('active'));
            
            // Adiciona active ao link clicado
            link.classList.add('active');
            
            // Filtra as notícias
            localStorage.setItem('categoria', categoria);
            filtrarPorCategoria(categoria);
        });
    });
}

function mostrarErro() {
    document.getElementById('noticias').innerHTML = `
        <div class="erro">
            <p>Erro ao carregar as notícias. Por favor, recarregue a página.</p>
            <button onclick="window.location.reload()">Recarregar</button>
        </div>
    `;
}

function filtrarPorCategoria(categoria) {
    const container = document.getElementById('noticias');
    const main = document.querySelector('main');
    
    // Mostra loading
    container.innerHTML = `
        <div class="loading">
            <p>Carregando notícias...</p>
        </div>
    `;

    // Ajusta o layout baseado na categoria
    if (categoria === 'jogos') {
        main.classList.add('games-layout');
    } else {
        main.classList.remove('games-layout');
    }

    // Filtra as notícias
    const noticiasFiltradas = noticias.filter(noticia => {
        if (categoria === 'todas') return true;
        return determinarCategoria(noticia) === categoria;
    });

    // Renderiza as notícias filtradas
    setTimeout(() => {
        renderizarNoticias(noticiasFiltradas, categoria);
    }, 100);
}

function determinarCategoria(noticia) {
    const texto = (noticia.titulo + ' ' + noticia.descricao).toLowerCase();
    
    // Palavras-chave para cada categoria
    const palavrasConsoles = [
        'xbox', 'playstation', 'ps5', 'ps4', 'nintendo', 'switch', 'console',
        'controle', 'dualsense', 'portable', 'portátil', 'steam deck'
    ];
    
    // Verifica categoria
    if (palavrasConsoles.some(palavra => texto.includes(palavra))) {
        return 'consoles';
    }
    
    return 'jogos';
}

function isWithinLastDays(timestamp, days) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= days;
}

function renderizarNoticias(noticiasFiltradas, categoria) {
    const container = document.getElementById('noticias');
    const mainElement = document.querySelector('main');
    
    if (!noticiasFiltradas || noticiasFiltradas.length === 0) {
        container.innerHTML = `
            <div class="sem-resultados">
                <p>Nenhuma notícia encontrada nesta categoria.</p>
            </div>
        `;
        return;
    }

    if (categoria === 'jogos') {
        mainElement.classList.add('games-layout');
        container.innerHTML = `
            <div class="game-area">
                <div class="game-frame">
                    <h2>Planetary Terraformer</h2>
                    <iframe src="https://www.crazygames.com.br/embed/planetary-terraformer" 
                            style="width: 100%; height: 500px;" 
                            frameborder="0" 
                            allow="gamepad *;">
                    </iframe>
                    <a href="https://www.crazygames.com" class="save-progress-button">Jogue Na CrazyGames Para Salvar Seu Progresso</a>
                    <div class="more-games">
                        <span class="crazygames-icon"></span>
                        <span>Mais jogos em </span>
                        <a href="https://www.crazygames.com">CrazyGames.com</a>
                    </div>
                </div>
            </div>
            <aside class="news-sidebar">
                ${noticiasFiltradas.map(noticia => criarCardNoticia(noticia)).join('')}
            </aside>
        `;
    } else {
        mainElement.classList.remove('games-layout');
        container.innerHTML = `
            <div class="noticias-grid">
                ${noticiasFiltradas.map(noticia => criarCardNoticia(noticia)).join('')}
            </div>
        `;
    }
}

function criarCardNoticia(noticia) {
    return `
        <article>
            <div class="article-img">
                <img src="${noticia.imagem}" alt="${noticia.titulo}" loading="lazy" 
                     onerror="this.onerror=null; this.src='images/fallback.png';">
            </div>
            <div class="article-content">
                <span class="fonte-badge">${noticia.fonte}</span>
                <h2>${noticia.titulo}</h2>
                <p>${noticia.descricao}</p>
                <a href="${noticia.link}" target="_blank" class="ler-mais">
                    Ler mais 
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </article>
    `;
}

function configurarModoEscuro() {
    const toggle = document.getElementById('darkModeToggle');
    const icon = toggle.querySelector('i');
    
    // Verifica se o modo escuro está ativo
    const isDark = document.documentElement.classList.contains('dark-mode');
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    
    // Adiciona evento de clique
    toggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark-mode');
        const isDark = document.documentElement.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    });
}