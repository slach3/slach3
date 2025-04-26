// Configuração inicial
document.addEventListener('DOMContentLoaded', () => {
    // Configurar modo escuro
    configurarModoEscuro();

    // Verificar se temos notícias
    if (!noticias || noticias.length === 0) {
        mostrarErro("Erro ao carregar notícias. Tente novamente mais tarde.");
        return;
    }

    // Renderizar as notícias com efeito de carregamento
    mostrarLoadingSkeleton();
    setTimeout(() => {
        renderizarNoticias();
        configurarFiltrosFonte();
        configurarBusca();
        configurarFiltrosCategoria();
    }, 500);
});

// Função para configurar modo escuro
function configurarModoEscuro() {
    const toggle = document.getElementById('darkModeToggle');
    const icon = toggle.querySelector('i');

    // Verificar preferência salva ou do sistema
    const prefereDark = localStorage.getItem('darkMode') === 'true' || 
                       window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    document.documentElement.classList.toggle('dark-mode', prefereDark);
    icon.className = prefereDark ? 'fas fa-sun' : 'fas fa-moon';

    // Adicionar listener para o botão
    toggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark-mode');
        const isDark = document.documentElement.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    });
}

// Função para mostrar skeleton loading
function mostrarLoadingSkeleton() {
    const container = document.getElementById('noticias');
    const skeletonHTML = Array(6).fill(`
        <article class="skeleton-card">
            <div class="article-img skeleton"></div>
            <div class="article-content">
                <div class="skeleton" style="width: 100px; height: 24px; margin-bottom: 8px;"></div>
                <div class="skeleton" style="width: 100%; height: 20px; margin-bottom: 8px;"></div>
                <div class="skeleton" style="width: 80%; height: 20px;"></div>
            </div>
        </article>
    `).join('');
    
    container.innerHTML = skeletonHTML;
}

// Função para renderizar notícias com lazy loading
function renderizarNoticias(noticiasFiltradas = null) {
    const container = document.getElementById('noticias');
    const noticiasParaMostrar = noticiasFiltradas || noticias;
    
    container.innerHTML = '';
    
    if (noticiasParaMostrar.length === 0) {
        container.innerHTML = '<p class="sem-resultados fade-in">Nenhuma notícia encontrada com os filtros selecionados.</p>';
        return;
    }

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('fade-in');
                    observer.unobserve(img);
                }
            });
        },
        { rootMargin: '50px 0px' }
    );
    
    noticiasParaMostrar.forEach(noticia => {
        const article = document.createElement('article');
        article.className = 'fade-in';
        
        article.innerHTML = `
            <div class="article-img">
                <img data-src="${noticia.imagem}" alt="${noticia.titulo}" 
                     loading="lazy"
                     onerror="this.onerror=null; this.src='images/fallback.html';">
            </div>
            <div class="article-content">
                <span class="fonte-badge">${noticia.fonte}</span>
                <h2>${noticia.titulo}</h2>
                <p>${noticia.descricao}</p>
                <a href="${noticia.link}" target="_blank" class="ler-mais">Ler mais</a>
            </div>
        `;
        
        container.appendChild(article);
        
        // Observar imagem para lazy loading
        const img = article.querySelector('img');
        observer.observe(img);
    });
}

// Função para configurar filtros de fonte com animação
function configurarFiltrosFonte() {
    const filtroFontes = document.getElementById('filtroFontes');
    const fontes = [...new Set(noticias.map(noticia => noticia.fonte))];
    
    fontes.forEach((fonte, index) => {
        const filtroItem = document.createElement('div');
        filtroItem.className = 'filtro-item fade-in';
        filtroItem.style.animationDelay = `${index * 0.1}s`;
        
        filtroItem.innerHTML = `
            <input type="checkbox" id="fonte-${fonte.replace(/\s+/g, '-').toLowerCase()}" 
                   name="fonte" value="${fonte}" checked>
            <label for="fonte-${fonte.replace(/\s+/g, '-').toLowerCase()}">${fonte}</label>
        `;
        
        filtroFontes.appendChild(filtroItem);
    });
    
    document.querySelectorAll('input[name="fonte"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            aplicarFiltrosComAnimacao();
        });
    });
}

// Função para aplicar filtros com animação
function aplicarFiltrosComAnimacao() {
    const container = document.getElementById('noticias');
    container.style.opacity = '0';
    
    setTimeout(() => {
        aplicarFiltros();
        container.style.opacity = '1';
    }, 300);
}

// Função para configurar busca
function configurarBusca() {
    const busca = document.getElementById('busca');
    const botaoBusca = document.getElementById('botaoBusca');
    
    // Buscar ao clicar no botão
    botaoBusca.addEventListener('click', () => {
        aplicarFiltros();
    });
    
    // Buscar ao pressionar Enter
    busca.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            aplicarFiltros();
        }
    });
}

// Função para configurar filtros de categoria
function configurarFiltrosCategoria() {
    const links = document.querySelectorAll('nav a');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remover classe active de todos os links
            links.forEach(l => l.classList.remove('active'));
            
            // Adicionar classe active ao link clicado
            link.classList.add('active');
            
            // Aplicar filtro por categoria
            aplicarFiltros();
        });
    });
}

// Função para aplicar todos os filtros
function aplicarFiltros() {
    // Obter fontes selecionadas
    const fontesSelecionadas = Array.from(
        document.querySelectorAll('input[name="fonte"]:checked')
    ).map(checkbox => checkbox.value);
    
    // Obter texto de busca
    const textoBusca = document.getElementById('busca').value.toLowerCase();
    
    // Obter categoria selecionada
    const categoriaSelecionada = document.querySelector('nav a.active').getAttribute('data-category');
    
    // Filtrar notícias por fonte
    let noticiasFiltradas = noticias.filter(noticia => 
        fontesSelecionadas.includes(noticia.fonte)
    );
    
    // Filtrar por texto de busca
    if (textoBusca) {
        noticiasFiltradas = noticiasFiltradas.filter(noticia => 
            noticia.titulo.toLowerCase().includes(textoBusca) || 
            noticia.descricao.toLowerCase().includes(textoBusca)
        );
    }
    
    // Filtrar por categoria (lógica simplificada)
    if (categoriaSelecionada !== 'todos') {
        noticiasFiltradas = noticiasFiltradas.filter(noticia => {
            const categoriasMapeadas = {
                'consoles': ['nintendo', 'playstation', 'xbox', 'switch', 'console'],
                'jogos': ['game', 'jogo', 'rpg', 'review', 'fps', 'remastered'],
                'esports': ['esports', 'tournament', 'competition', 'league', 'championship']
            };
            
            const keywords = categoriasMapeadas[categoriaSelecionada] || [];
            return keywords.some(keyword => 
                noticia.titulo.toLowerCase().includes(keyword) || 
                noticia.descricao.toLowerCase().includes(keyword)
            );
        });
    }
    
    // Renderizar notícias filtradas
    renderizarNoticias(noticiasFiltradas);
}

// Função para mostrar mensagem de erro
function mostrarErro(mensagem) {
    const container = document.getElementById('noticias');
    container.innerHTML = `<p class="erro">${mensagem}</p>`;
}