// Configuração geral e variáveis
let todasNoticias = [];
let noticiasFiltradas = [];
let categorias = {
    'consoles': ['nintendo', 'xbox', 'playstation', 'switch', 'ps5', 'ps4', 'series x'],
    'jogos': ['game', 'jogo', 'título', 'lançamento', 'rpg', 'fps', 'mmorpg'],
    'esports': ['esports', 'competitivo', 'campeonato', 'torneio', 'pro player']
};

// Função para determinar a categoria com base no título e descrição
function determinarCategoria(noticia) {
    const textoCompleto = (noticia.titulo + ' ' + noticia.descricao).toLowerCase();
    
    for (const [categoria, palavrasChave] of Object.entries(categorias)) {
        for (const palavra of palavrasChave) {
            if (textoCompleto.includes(palavra)) {
                return categoria;
            }
        }
    }
    
    return 'outros';
}

// Função para carregar e processar notícias
async function carregarNoticias() {
    const container = document.getElementById('noticias');
    const destaque = document.getElementById('destaque');
    container.innerHTML = '<p class="loading">Carregando notícias...</p>';

    try {
        // Processar notícias do arquivo noticias.js (já carregado)
        todasNoticias = noticias.map(noticia => {
            return {
                ...noticia,
                categoria: determinarCategoria(noticia),
                imagem: gerarImagemAleatoria(noticia)
            };
        });
        
        noticiasFiltradas = [...todasNoticias];
        
        // Configurar destaque
        configurarDestaque(destaque);
        
        // Configurar filtros de fonte
        configurarFiltrosFonte();
        
        // Exibir todas as notícias
        exibirNoticias();
        
        // Configurar eventos
        configurarEventos();
        
    } catch (error) {
        container.innerHTML = '<p class="erro">Erro ao carregar notícias.</p>';
        console.error(error);
    }
}

// Gera uma URL de imagem aleatória baseada no conteúdo da notícia
function gerarImagemAleatoria(noticia) {
    const temas = ['gaming', 'videogame', 'console', 'controller', 'game'];
    const palavrasChave = noticia.titulo.split(' ').filter(p => p.length > 4);
    const termo = palavrasChave.length > 0 ? palavrasChave[0] : temas[Math.floor(Math.random() * temas.length)];
    
    return `https://source.unsplash.com/300x200/?${encodeURIComponent(termo)}`;
}

// Configura a seção de destaque com a notícia mais relevante
function configurarDestaque(destaque) {
    // Seleciona a primeira notícia como destaque (poderia ter uma lógica mais sofisticada)
    const noticiaDestaque = todasNoticias[0];
    
    destaque.innerHTML = `
        <div class="destaque-content">
            <h2>${noticiaDestaque.titulo}</h2>
            <p>${noticiaDestaque.descricao}</p>
            <a href="${noticiaDestaque.link}" target="_blank">Ler notícia completa</a>
        </div>
    `;
}

// Configura os filtros de fonte com base nas fontes disponíveis
function configurarFiltrosFonte() {
    const filtroFontes = document.getElementById('filtroFontes');
    const fontes = [...new Set(todasNoticias.map(n => n.fonte))];
    
    let html = `
        <div class="filtro-item">
            <input type="checkbox" id="fonte-todas" name="fonte-todas" checked>
            <label for="fonte-todas">Todas as fontes</label>
        </div>
    `;
    
    fontes.forEach(fonte => {
        html += `
            <div class="filtro-item">
                <input type="checkbox" id="fonte-${fonte}" name="fonte-${fonte}" checked>
                <label for="fonte-${fonte}">${fonte}</label>
            </div>
        `;
    });
    
    filtroFontes.innerHTML = html;
}

// Exibe as notícias filtradas na página
function exibirNoticias() {
    const container = document.getElementById('noticias');
    
    if (noticiasFiltradas.length === 0) {
        container.innerHTML = '<p class="sem-resultados">Nenhuma notícia encontrada com os filtros atuais.</p>';
        return;
    }
    
    let html = '';
    
    noticiasFiltradas.forEach(noticia => {
        html += `
            <article data-categoria="${noticia.categoria}">
                <div class="article-img">
                    <img src="${noticia.imagem}" alt="${noticia.titulo}">
                </div>
                <div class="article-content">
                    <span class="fonte-badge">${noticia.fonte}</span>
                    <h2>${noticia.titulo}</h2>
                    <p>${noticia.descricao}</p>
                    <a href="${noticia.link}" target="_blank">Ler mais</a>
                </div>
            </article>
        `;
    });
    
    container.innerHTML = html;
}

// Configura os eventos de interação do usuário
function configurarEventos() {
    // Filtro por categoria
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('nav a').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            const categoria = this.getAttribute('data-category');
            filtrarPorCategoria(categoria);
        });
    });
    
    // Filtro por fonte
    document.getElementById('fonte-todas').addEventListener('change', function() {
        const checked = this.checked;
        document.querySelectorAll('[id^="fonte-"]').forEach(checkbox => {
            checkbox.checked = checked;
        });
        aplicarFiltros();
    });
    
    document.querySelectorAll('[id^="fonte-"]:not(#fonte-todas)').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const todasChecked = Array.from(document.querySelectorAll('[id^="fonte-"]:not(#fonte-todas)')).every(c => c.checked);
            document.getElementById('fonte-todas').checked = todasChecked;
            aplicarFiltros();
        });
    });
    
    // Busca
    document.getElementById('botaoBusca').addEventListener('click', () => {
        const termo = document.getElementById('busca').value.trim().toLowerCase();
        filtrarPorTexto(termo);
    });
    
    document.getElementById('busca').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const termo = document.getElementById('busca').value.trim().toLowerCase();
            filtrarPorTexto(termo);
        }
    });
}

// Filtra notícias por categoria
function filtrarPorCategoria(categoria) {
    if (categoria === 'todos') {
        noticiasFiltradas = [...todasNoticias];
    } else {
        noticiasFiltradas = todasNoticias.filter(noticia => noticia.categoria === categoria);
    }
    
    exibirNoticias();
}

// Filtra notícias por termos de busca
function filtrarPorTexto(termo) {
    if (!termo) {
        noticiasFiltradas = [...todasNoticias];
    } else {
        noticiasFiltradas = todasNoticias.filter(noticia => 
            noticia.titulo.toLowerCase().includes(termo) || 
            noticia.descricao.toLowerCase().includes(termo)
        );
    }
    
    aplicarFiltros();
}

// Aplica todos os filtros ativos
function aplicarFiltros() {
    // Recupera o filtro de categoria atual
    const categoriaAtiva = document.querySelector('nav a.active').getAttribute('data-category');
    
    // Aplica o filtro de categoria
    let noticias = categoriaAtiva === 'todos' 
        ? [...todasNoticias] 
        : todasNoticias.filter(noticia => noticia.categoria === categoriaAtiva);
    
    // Aplica o filtro de busca
    const termo = document.getElementById('busca').value.trim().toLowerCase();
    if (termo) {
        noticias = noticias.filter(noticia => 
            noticia.titulo.toLowerCase().includes(termo) || 
            noticia.descricao.toLowerCase().includes(termo)
        );
    }
    
    // Aplica o filtro de fontes
    const fontesSelecionadas = Array.from(document.querySelectorAll('[id^="fonte-"]:not(#fonte-todas):checked')).map(
        checkbox => checkbox.id.replace('fonte-', '')
    );
    
    if (fontesSelecionadas.length > 0 && !document.getElementById('fonte-todas').checked) {
        noticias = noticias.filter(noticia => fontesSelecionadas.includes(noticia.fonte));
    }
    
    noticiasFiltradas = noticias;
    exibirNoticias();
}

// Iniciar o carregamento de notícias
carregarNoticias();