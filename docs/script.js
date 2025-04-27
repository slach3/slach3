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
            filtrarNoticiasCategoria(categoriaAtual);
        });
    });

    // Função para filtrar notícias por categoria
    function filtrarNoticiasCategoria(categoria) {
        currentPage = 1; // Reseta para a primeira página

        if (categoria === 'todos') {
            noticiasFiltradas = [...noticias];
        } else {
            noticiasFiltradas = noticias.filter(noticia => {
                // Verificar se o objeto notícia tem a propriedade categorias
                if (noticia.categorias && Array.isArray(noticia.categorias)) {
                    // Usar o array de categorias se disponível
                    return noticia.categorias.includes(categoria);
                } else {
                    // Fazer a filtragem baseada no título, descrição e link (método antigo)
                    const titulo = noticia.titulo.toLowerCase();
                    const descricao = (noticia.descricao || '').toLowerCase();
                    const fonte = (noticia.fonte || '').toLowerCase();
                    
                    switch(categoria) {
                        case 'jogos':
                            return titulo.includes('jogo') || titulo.includes('game') || 
                                  descricao.includes('jogo') || descricao.includes('game');
                        case 'noticias':
                            return !titulo.includes('review') && !titulo.startsWith('review');
                        case 'reviews':
                            return titulo.includes('review') || titulo.startsWith('review');
                        case 'playstation':
                            return titulo.includes('playstation') || titulo.includes('ps5') || 
                                  titulo.includes('ps4') || fonte.includes('playstation') ||
                                  descricao.includes('playstation');
                        case 'xbox':
                            return titulo.includes('xbox') || fonte.includes('xbox') ||
                                  descricao.includes('xbox') || titulo.includes('microsoft');
                        case 'nintendo':
                            return titulo.includes('nintendo') || titulo.includes('switch') || 
                                  fonte.includes('nintendo') || descricao.includes('nintendo');
                        case 'pc':
                            return titulo.includes(' pc') || titulo.includes('steam') || 
                                  descricao.includes(' pc ') || titulo.includes('pc ');
                        default:
                            return true;
                    }
                }
            });
        }

        mostrarNoticias();
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
        const card = document.createElement('article');
        card.className = 'noticia-card';
        
        // Adicionar classe para a categoria 
        if (noticia.categorias && Array.isArray(noticia.categorias)) {
            noticia.categorias.forEach(categoria => {
                card.classList.add(`categoria-${categoria}`);
            });
        }
        
        const conteudo = `
            <a href="${noticia.link}" target="_blank" rel="noopener">
                <div class="noticia-img-container">
                    <img src="${noticia.imagem || 'images/fallback.png'}" alt="${noticia.titulo}" loading="lazy" 
                        onerror="this.onerror=null;this.src='images/fallback.png';">
                </div>
                <div class="noticia-info">
                    <h3>${noticia.titulo}</h3>
                    <div class="noticia-meta">
                        <span class="noticia-fonte">${noticia.fonte || 'SMB Games'}</span>
                        ${noticia.categorias ? `<span class="noticia-categorias">${noticia.categorias.join(', ')}</span>` : ''}
                    </div>
                </div>
            </a>
        `;
        
        card.innerHTML = conteudo;
        return card;
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
    filtrarNoticiasCategoria(categoriaAtual);
});