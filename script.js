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
    // URLs de imagens diretas de CDN (mais confiáveis)
    const imagens = [
        'https://res.cloudinary.com/dxsvrosfj/image/upload/v1638121611/games/console_game_a7bqxp.jpg',
        'https://res.cloudinary.com/dxsvrosfj/image/upload/v1638121611/games/controller_vnjzhj.jpg',
        'https://res.cloudinary.com/dxsvrosfj/image/upload/v1638121613/games/game_screen_vcjj2i.jpg',
        'https://res.cloudinary.com/dxsvrosfj/image/upload/v1638121612/games/gaming_pc_ibjsxo.jpg',
        'https://res.cloudinary.com/dxsvrosfj/image/upload/v1638121612/games/rpg_game_xwpwl9.jpg',
        'https://res.cloudinary.com/dxsvrosfj/image/upload/v1638121613/games/fps_game_thzbgk.jpg',
        'https://res.cloudinary.com/dxsvrosfj/image/upload/v1638121613/games/gamer_k3t8tf.jpg',
        'https://res.cloudinary.com/dxsvrosfj/image/upload/v1638121612/games/card_game_fk8tbh.jpg'
    ];
    
    // Garantir que sempre retorne pelo menos uma imagem padrão
    // se por algum motivo a lógica abaixo falhar
    let imagemIndex = 0;
    
    try {
        // Categoria determina a imagem (para ser mais previsível)
        const categoria = determinarCategoria(noticia);
        const tituloLower = (noticia.titulo || '').toLowerCase();
        
        switch(categoria) {
            case 'consoles':
                imagemIndex = (tituloLower.includes('nintendo') || 
                        tituloLower.includes('switch')) ? 0 : 1;
                break;
            case 'jogos':
                imagemIndex = (tituloLower.includes('rpg') || 
                        tituloLower.includes('role')) ? 4 : 2;
                break;
            case 'esports':
                imagemIndex = 6;
                break;
            default:
                // Número aleatório para outras categorias
                imagemIndex = Math.floor(Math.random() * imagens.length);
        }
    } catch (e) {
        console.error('Erro ao determinar imagem:', e);
    }
    
    return imagens[imagemIndex];
}

// Função para exibir as notícias filtradas na página
function exibirNoticias() {
    const container = document.getElementById('noticias');
    
    if (noticiasFiltradas.length === 0) {
        container.innerHTML = '<p class="sem-resultados">Nenhuma notícia encontrada com os filtros atuais.</p>';
        return;
    }
    
    let html = '';
    
    noticiasFiltradas.forEach(noticia => {
        // Verifica se o link é um exemplo fictício e substitui por um comportamento alternativo
        const linkOriginal = noticia.link;
        const isLinkFicticio = linkOriginal.includes('exemplo.com');
        const linkFinal = isLinkFicticio ? 'javascript:void(0)' : linkOriginal;
        const linkTarget = isLinkFicticio ? '' : 'target="_blank"';
        const linkOnclick = isLinkFicticio ? `onclick="abrirDetalhes('${encodeURIComponent(JSON.stringify(noticia))}')"` : '';
        
        // Trata a fonte indefinida
        const fonte = noticia.fonte || 'GameNews';
        
        html += `
            <article data-categoria="${noticia.categoria}">
                <div class="article-img">
                    <img src="${noticia.imagem}" alt="${noticia.titulo}" onerror="this.src='https://res.cloudinary.com/dxsvrosfj/image/upload/v1638121613/games/game_screen_vcjj2i.jpg'">
                </div>
                <div class="article-content">
                    <span class="fonte-badge">${fonte}</span>
                    <h2>${noticia.titulo}</h2>
                    <p>${noticia.descricao}</p>
                    <a href="${linkFinal}" ${linkTarget} ${linkOnclick}>Ler mais</a>
                </div>
            </article>
        `;
    });
    
    container.innerHTML = html;
}

// Função para abrir uma página de detalhes
function abrirDetalhes(noticiaJSON) {
    const noticia = JSON.parse(decodeURIComponent(noticiaJSON));
    
    // Cria um modal ou página simples para mostrar os detalhes
    const modal = document.createElement('div');
    modal.className = 'modal-detalhes';
    
    // Trata a fonte indefinida
    const fonte = noticia.fonte || 'GameNews';
    
    // Usa a imagem já definida ou uma imagem padrão
    const imagem = noticia.imagem || 'https://res.cloudinary.com/dxsvrosfj/image/upload/v1638121613/games/game_screen_vcjj2i.jpg';
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="fechar-modal">&times;</span>
            <h2>${noticia.titulo}</h2>
            <p class="fonte-data">Fonte: ${fonte} | Data: 25 de abril de 2025</p>
            <div class="modal-img">
                <img src="${imagem}" alt="${noticia.titulo}" onerror="this.src='https://res.cloudinary.com/dxsvrosfj/image/upload/v1638121613/games/game_screen_vcjj2i.jpg'">
            </div>
            <div class="modal-texto">
                <p>${noticia.descricao}</p>
                <p>Esta é uma notícia fictícia criada para demonstração. Em um site real, aqui estaria o conteúdo completo da notícia.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Adiciona evento para fechar o modal
    modal.querySelector('.fechar-modal').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    // Fecha o modal ao clicar fora dele
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
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

// Configurar filtros de fonte com base nas fontes disponíveis
function configurarFiltrosFonte() {
    const filtroFontes = document.getElementById('filtroFontes');
    // Extrai fontes, trata valores undefined substituindo por 'GameNews'
    const fontes = [...new Set(todasNoticias.map(n => n.fonte || 'GameNews'))];
    
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

// Configurar destaque também precisa ser atualizado para lidar com links fictícios
function configurarDestaque(destaque) {
    // Seleciona a primeira notícia como destaque
    const noticiaDestaque = todasNoticias[0];
    
    // Verifica se o link é fictício
    const linkOriginal = noticiaDestaque.link;
    const isLinkFicticio = linkOriginal.includes('exemplo.com');
    const linkFinal = isLinkFicticio ? 'javascript:void(0)' : linkOriginal;
    const linkTarget = isLinkFicticio ? '' : 'target="_blank"';
    const linkOnclick = isLinkFicticio ? `onclick="abrirDetalhes('${encodeURIComponent(JSON.stringify(noticiaDestaque))}')"` : '';
    
    // Trata a fonte indefinida
    const fonte = noticiaDestaque.fonte || 'GameNews';
    
    destaque.innerHTML = `
        <div class="destaque-content">
            <h2>${noticiaDestaque.titulo}</h2>
            <p>${noticiaDestaque.descricao}</p>
            <a href="${linkFinal}" ${linkTarget} ${linkOnclick}>Ler notícia completa</a>
        </div>
    `;
}

// Iniciar o carregamento de notícias
carregarNoticias();