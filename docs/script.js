// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Configuração do modo escuro (mantido para funcionalidade básica)
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.documentElement.classList.contains('dark-mode'));
        });
    }

    // Verificar modo escuro salvo
    if (localStorage.getItem('darkMode') === 'true') {
        document.documentElement.classList.add('dark-mode');
    }

    // Referência ao contêiner de notícias
    const noticiasContainer = document.getElementById('noticias');
    
    // Variáveis para paginação
    let itemsPerPage = 12;
    let currentPage = 1;
    let noticiasFiltradas = [...noticias];
    
    // Verificar se há parâmetros na URL para filtrar categoria
    const urlParams = new URLSearchParams(window.location.search);
    let categoriaAtual = urlParams.get('categoria') || 'todos';
    
    // Inicializar os botões de categoria
    const botoesCategorias = document.querySelectorAll('.categoria-nav button');
    botoesCategorias.forEach(botao => {
        // Ativar o botão da categoria atual com base no parâmetro da URL
        if (botao.getAttribute('data-categoria') === categoriaAtual) {
            botao.classList.add('active');
        } else {
            botao.classList.remove('active');
        }
        
        botao.addEventListener('click', () => {
            // Remove a classe ativa de todos os botões
            botoesCategorias.forEach(b => b.classList.remove('active'));
            // Adiciona a classe ativa ao botão clicado
            botao.classList.add('active');
            // Obtém a categoria selecionada
            categoriaAtual = botao.getAttribute('data-categoria');
            
            // Atualiza a URL com o parâmetro de categoria
            const newUrl = new URL(window.location.href);
            if (categoriaAtual !== 'todos') {
                newUrl.searchParams.set('categoria', categoriaAtual);
            } else {
                newUrl.searchParams.delete('categoria');
            }
            
            // Atualiza a URL sem recarregar a página
            window.history.pushState({}, '', newUrl);
            
            // Filtra e exibe as notícias
            filtrarPorCategoria(categoriaAtual);
        });
    });

    // Função para filtrar notícias por categoria
    function filtrarPorCategoria(categoria) {
        const container = document.getElementById('noticias-container');
        if (!container) return;
        
        // Animar a transição
        container.style.opacity = '0';
        
        setTimeout(() => {
            container.innerHTML = '';
            
            if (categoria === 'todas') {
                carregarNoticias(noticias);
            } else {
                const noticiasFiltradas = noticias.filter(noticia => {
                    if (noticia.categorias && Array.isArray(noticia.categorias)) {
                        return noticia.categorias.includes(categoria.toLowerCase());
                    }
                    // Fallback para categorização baseada em texto (legado)
                    return (
                        noticia.titulo.toLowerCase().includes(categoria.toLowerCase()) ||
                        (noticia.descricao && noticia.descricao.toLowerCase().includes(categoria.toLowerCase()))
                    );
                });
                
                carregarNoticias(noticiasFiltradas);
                
                // Atualizar o contador de notícias
                const contador = document.querySelector('.contador-noticias');
                if (contador) {
                    contador.textContent = `${noticiasFiltradas.length} notícias encontradas na categoria "${categoria}"`;
                }
            }
            
            // Restaurar a opacidade após carregar o conteúdo
            container.style.opacity = '1';
            
            // Atualizar classe ativa nos botões de categoria
            document.querySelectorAll('.categoria-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.categoria === categoria);
            });
            
            // Salvar a categoria atual no sessionStorage
            sessionStorage.setItem('categoriaAtual', categoria);
        }, 300); // Tempo suficiente para a animação de fade out
    }

    // Função para mostrar as notícias
    function mostrarNoticias() {
        // Limpar o contêiner de notícias
        if (noticiasContainer) {
            noticiasContainer.innerHTML = '';

            // Adicionar mensagem se não houver notícias
            if (noticiasFiltradas.length === 0) {
                const mensagem = document.createElement('div');
                mensagem.className = 'sem-noticias';
                mensagem.textContent = 'Nenhuma notícia encontrada para esta categoria.';
                noticiasContainer.appendChild(mensagem);
                
                // Ocultar botão "carregar mais"
                const loadMoreButton = document.getElementById('load-more');
                if (loadMoreButton) {
                    loadMoreButton.style.display = 'none';
                }
                return;
            }

            // Calcular o índice inicial e final para a página atual
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            
            // Obter as notícias para a página atual
            const noticiasAtuais = noticiasFiltradas.slice(startIndex, endIndex);

            // Criar os cards de notícias
            noticiasAtuais.forEach(noticia => {
                const card = criarCardNoticia(noticia);
                noticiasContainer.appendChild(card);
            });

            // Verificar se deve mostrar botão "carregar mais"
            const loadMoreButton = document.getElementById('load-more');
            if (loadMoreButton) {
                if (endIndex < noticiasFiltradas.length) {
                    loadMoreButton.style.display = 'flex';
                } else {
                    loadMoreButton.style.display = 'none';
                }
            }
        }
    }

    // Função para criar um card de notícia
    function criarCardNoticia(noticia) {
        // Adicionar classe para a categoria 
        if (noticia.categorias && Array.isArray(noticia.categorias)) {
            noticia.categorias.forEach(categoria => {
                card.classList.add(`categoria-${categoria}`);
            });
        }
        
        // Criar badges de categoria para exibição visual
        let categoryBadges = '';
        if (noticia.categorias && Array.isArray(noticia.categorias)) {
            // Pegamos até 2 categorias principais para exibir como badges
            const mainCategories = noticia.categorias.filter(cat => 
                ['jogos', 'pc', 'playstation', 'xbox', 'nintendo', 'reviews'].includes(cat)).slice(0, 2);
            
            if (mainCategories.length > 0) {
                categoryBadges = '<div class="category-badges">' + 
                    mainCategories.map(cat => `<span class="badge-${cat}">${cat}</span>`).join('') + 
                    '</div>';
            }
        }
        
        const cardHtml = `
        <div class="noticia-card" data-categorias='${JSON.stringify(noticia.categorias || [])}'>
            <div class="noticia-imagem">
                <a href="${noticia.link}" target="_blank" rel="noopener noreferrer">
                    <img src="${noticia.imagem}" alt="${noticia.titulo}" loading="lazy" onerror="this.src='images/fallback.png'">
                </a>
            </div>
            <div class="noticia-info">
                <h3>${noticia.titulo}</h3>
                <div class="noticia-meta">
                    <span class="noticia-fonte">${noticia.fonte || 'SMB Games'}</span>
                    ${noticia.timestamp ? `<span class="noticia-timestamp" title="${formatTimestamp(noticia.timestamp)}">${timeAgo(noticia.timestamp)}</span>` : ''}
                </div>
            </div>
        </div>
        `;
        
        card.innerHTML = cardHtml;
        return card;
    }
    
    // Função para formatar a data completa (para o título/tooltip)
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString('pt-BR', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Função para exibir tempo relativo (2 horas atrás, etc)
function timeAgo(timestamp) {
    const now = new Date();
    const date = new Date(timestamp);
    const secondsAgo = Math.floor((now - date) / 1000);
    
    // Verificar se a data é válida
    if (isNaN(secondsAgo) || secondsAgo < 0) {
        return '';
    }
    
    // Intervalos de tempo em segundos
    const intervals = {
        ano: 31536000,
        mês: 2592000,
        semana: 604800,
        dia: 86400,
        hora: 3600,
        minuto: 60
    };
    
    // Versões plurais
    const plurals = {
        ano: 'anos',
        mês: 'meses',
        semana: 'semanas',
        dia: 'dias',
        hora: 'horas',
        minuto: 'minutos'
    };
    
    // Encontrar o intervalo mais adequado
    for (const [unit, seconds] of Object.entries(intervals)) {
        const interval = Math.floor(secondsAgo / seconds);
        if (interval >= 1) {
            const plural = interval > 1 ? plurals[unit] : unit;
            return `${interval} ${plural} atrás`;
        }
    }
    
    return 'agora mesmo';
}

    // Adicionar evento ao botão "carregar mais"
    const loadMoreBtn = document.querySelector('.load-more-button');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            currentPage++;
            mostrarNoticias();
        });
    }

    // Inicializar a exibição de notícias com a categoria da URL
    filtrarPorCategoria(categoriaAtual);
});