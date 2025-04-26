// Verifica se o script de notícias foi carregado
if (typeof noticias === 'undefined') {
    console.error('Erro: O arquivo de notícias não foi carregado corretamente.');
    document.getElementById('noticias').innerHTML = `
        <div class="erro">
            <p>Não foi possível carregar as notícias. Por favor, recarregue a página.</p>
            <button onclick="window.location.reload()">Recarregar</button>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    // Inicia o modo escuro e carrega a categoria salva
    configurarModoEscuro();
    const categoriaAtual = localStorage.getItem('categoria') || 'todas';

    // Configura a navegação
    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
        // Remove listeners antigos para evitar duplicação
        const novoLink = link.cloneNode(true);
        link.parentNode.replaceChild(novoLink, link);

        // Pega o texto da categoria do span dentro do link
        const categoria = novoLink.querySelector('span').textContent.toLowerCase();
        
        // Marca o link ativo se for a categoria atual
        if (categoria === categoriaAtual) {
            novoLink.classList.add('active');
        }

        // Adiciona o evento de clique
        novoLink.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Clicou em:', categoria); // Debug

            // Remove active de todos os links
            links.forEach(l => l.classList.remove('active'));
            
            // Adiciona active ao link clicado
            novoLink.classList.add('active');
            
            // Salva a categoria
            localStorage.setItem('categoria', categoria);
            
            // Filtra as notícias
            filtrarPorCategoria(categoria);
        });
    });

    // Carrega as notícias iniciais
    filtrarPorCategoria(categoriaAtual);
});

function filtrarPorCategoria(categoria) {
    console.log('Filtrando por categoria:', categoria); // Debug

    if (!window.noticias || !Array.isArray(window.noticias)) {
        console.error('Erro: noticias não está definido ou não é um array');
        return;
    }

    const noticiasFiltradas = noticias.filter(noticia => {
        if (categoria === 'todas') {
            return true;
        }

        const categoriaNoticia = determinarCategoria(noticia);
        console.log('Notícia:', noticia.titulo, '| Categoria:', categoriaNoticia); // Debug
        return categoriaNoticia === categoria;
    });

    console.log('Total de notícias filtradas:', noticiasFiltradas.length); // Debug
    renderizarNoticias(noticiasFiltradas);
}

function determinarCategoria(noticia) {
    const texto = (noticia.titulo + ' ' + noticia.descricao).toLowerCase();
    
    // Palavras-chave para cada categoria
    const palavrasConsoles = [
        'xbox', 'playstation', 'ps5', 'ps4', 'nintendo', 'switch', 'console',
        'controle', 'dualsense', 'portable', 'portátil', 'steam deck'
    ];
    
    const palavrasEsports = [
        'esport', 'e-sport', 'campeonato', 'torneio', 'competição', 'competicao',
        'time', 'equipe', 'league of legends', 'cs:go', 'valorant'
    ];
    
    // Verifica cada categoria
    if (palavrasConsoles.some(palavra => texto.includes(palavra))) {
        return 'consoles';
    }
    
    if (palavrasEsports.some(palavra => texto.includes(palavra))) {
        return 'esports';
    }
    
    return 'jogos';
}

function renderizarNoticias(noticiasFiltradas) {
    const container = document.getElementById('noticias');
    
    if (!noticiasFiltradas || noticiasFiltradas.length === 0) {
        container.innerHTML = `
            <div class="sem-resultados">
                <p>Nenhuma notícia encontrada nesta categoria.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = noticiasFiltradas.map(noticia => `
        <article>
            <div class="article-img">
                <img src="${noticia.imagem}" alt="${noticia.titulo}" loading="lazy" 
                     onerror="this.onerror=null; this.src='images/fallback.png';">
            </div>
            <div class="article-content">
                <div class="article-header">
                    <span class="fonte-badge">${noticia.fonte}</span>
                    <span class="categoria-badge">
                        <i class="fas fa-${determinarCategoria(noticia) === 'consoles' ? 'tv' : 
                                         determinarCategoria(noticia) === 'esports' ? 'trophy' : 'gamepad'}"></i>
                        ${determinarCategoria(noticia)}
                    </span>
                </div>
                <h2>${noticia.titulo}</h2>
                <p>${noticia.descricao}</p>
                <a href="${noticia.link}" target="_blank" class="ler-mais">
                    Ler mais 
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </article>
    `).join('');

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