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
    
    if (!noticiasFiltradas || noticiasFiltradas.length === 0) {
        container.innerHTML = `
            <div class="sem-resultados">
                <p>Nenhuma notícia encontrada nesta categoria.</p>
            </div>
        `;
        return;
    }

    if (categoria === 'jogos') {
        // Layout para a página de jogos com o jogo em destaque e notícias na lateral
        container.innerHTML = `
            <div class="games-container">
                <div class="game-area">
                    <h2>Planetary Terraformer</h2>
                    <div class="game-frame">
                        <iframe src="https://www.crazygames.com.br/embed/planetary-terraformer" style="width: 100%; height: 100%;" frameborder="0" allow="gamepad *;"></iframe>
                    </div>
                </div>
            </div>
            <aside class="news-sidebar">
                ${noticiasFiltradas.map(noticia => `
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
                `).join('')}
            </aside>`;
    } else {
        // Layout padrão para outras categorias (grid)
        container.innerHTML = `
            <div class="noticias-grid">
                ${noticiasFiltradas.map(noticia => `
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
                `).join('')}
            </div>`;
    }

    // Adiciona animação de fade-in
    document.querySelectorAll('article').forEach((article, index) => {
        article.style.opacity = '0';
        article.style.animation = `fadeIn 0.3s ease forwards ${index * 0.1}s`;
    });
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