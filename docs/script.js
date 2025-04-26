document.addEventListener('DOMContentLoaded', () => {
    configurarModoEscuro();
    
    if (!noticias || noticias.length === 0) {
        mostrarErro("Não foi possível carregar as notícias. Tente novamente mais tarde.");
        return;
    }

    mostrarLoadingSkeleton();
    setTimeout(() => {
        renderizarNoticias();
        configurarFiltros();
        configurarBusca();
    }, 500);
});

function configurarModoEscuro() {
    const toggle = document.getElementById('darkModeToggle');
    const icon = toggle.querySelector('i');
    
    const isDark = document.documentElement.classList.contains('dark-mode');
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    
    toggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark-mode');
        const isDark = document.documentElement.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    });
}

function mostrarLoadingSkeleton() {
    const container = document.getElementById('noticias');
    const skeletonHTML = Array(6).fill(`
        <div class="loading-skeleton">
            <div class="skeleton-card">
                <div class="skeleton-img"></div>
                <div class="skeleton-content">
                    <div class="skeleton-badge"></div>
                    <div class="skeleton-title"></div>
                    <div class="skeleton-text"></div>
                </div>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = skeletonHTML;
}

function renderizarNoticias(noticiasFiltradas = null) {
    const container = document.getElementById('noticias');
    const noticiasParaMostrar = noticiasFiltradas || noticias;
    
    if (noticiasParaMostrar.length === 0) {
        container.innerHTML = '<p class="sem-resultados">Nenhuma notícia encontrada com os filtros selecionados.</p>';
        return;
    }
    
    container.innerHTML = noticiasParaMostrar.map(noticia => `
        <article>
            <div class="article-img">
                <img src="${noticia.imagem}" alt="${noticia.titulo}" loading="lazy" 
                     onerror="this.onerror=null; this.src='images/fallback.html';">
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
    `).join('');

    // Adiciona animação de fade-in aos cards
    document.querySelectorAll('article').forEach((article, index) => {
        article.style.opacity = '0';
        article.style.animation = `fadeIn 0.3s ease forwards ${index * 0.1}s`;
    });
}

function configurarFiltros() {
    const fontes = [...new Set(noticias.map(n => n.fonte))];
    const container = document.querySelector('.filtro-fontes');
    
    container.innerHTML = fontes.map(fonte => `
        <div class="filtro-item">
            <label>
                <input type="checkbox" value="${fonte}" checked>
                <i class="far fa-${fonte === 'PC Gamer' ? 'keyboard' : 
                                  fonte === 'IGN Brasil' ? 'newspaper' : 
                                  fonte === 'TecMundo' ? 'microchip' : 
                                  'globe'}" style="margin-right: 8px;"></i>
                ${fonte}
            </label>
        </div>
    `).join('');
    
    document.querySelectorAll('.filtro-item input').forEach(checkbox => {
        checkbox.addEventListener('change', aplicarFiltros);
    });
}

function configurarBusca() {
    const busca = document.getElementById('busca');
    const botaoBusca = document.getElementById('botaoBusca');
    
    let timeoutId;
    
    busca.addEventListener('input', () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(aplicarFiltros, 300);
    });
    
    botaoBusca.addEventListener('click', aplicarFiltros);
    
    busca.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            aplicarFiltros();
        }
    });
}

function aplicarFiltros() {
    const fontesSelecionadas = Array.from(
        document.querySelectorAll('.filtro-item input:checked')
    ).map(checkbox => checkbox.value);
    
    const termoBusca = document.getElementById('busca').value.toLowerCase();
    
    const noticiasFiltradas = noticias.filter(noticia => {
        const matchFonte = fontesSelecionadas.includes(noticia.fonte);
        const matchBusca = !termoBusca || 
            noticia.titulo.toLowerCase().includes(termoBusca) || 
            noticia.descricao.toLowerCase().includes(termoBusca);
        
        return matchFonte && matchBusca;
    });
    
    renderizarNoticias(noticiasFiltradas);
}

function mostrarErro(mensagem) {
    const container = document.getElementById('noticias');
    container.innerHTML = `<p class="erro">${mensagem}</p>`;
}