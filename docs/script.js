// script.js

// Configuração do modo escuro
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.documentElement.classList.contains('dark-mode'));
});

// Função para carregar notícias
function carregarNoticias() {
    try {
        // As notícias já estão no escopo global via noticias.js
        if (!noticias) {
            throw new Error('Notícias não encontradas');
        }
        
        const container = document.getElementById('noticias');
        if (!container) {
            console.error('Elemento de notícias não encontrado');
            return;
        }
        
        // Remove skeleton loading
        container.innerHTML = '';
        
        // Cria filtros de fontes
        const fontes = [...new Set(noticias.map(noticia => noticia.fonte))];
        const filtrosContainer = document.querySelector('.filtro-fontes');
        
        if (filtrosContainer) {
            fontes.forEach(fonte => {
                const filtroItem = document.createElement('div');
                filtroItem.className = 'filtro-item';
                filtroItem.innerHTML = `
                    <label>
                        <input type="checkbox" value="${fonte}" checked>
                        ${fonte}
                    </label>
                `;
                filtrosContainer.appendChild(filtroItem);
            });
            
            // Adicionar evento para filtrar por fonte
            const checkboxes = document.querySelectorAll('.filtro-item input');
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', filtrarNoticias);
            });
        }
        
        // Exibe todas as notícias inicialmente
        exibirNoticias(noticias);
        
        // Configura busca
        const busca = document.getElementById('busca');
        const botaoBusca = document.getElementById('botaoBusca');
        
        if (busca && botaoBusca) {
            busca.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') {
                    filtrarNoticias();
                }
            });
            
            botaoBusca.addEventListener('click', filtrarNoticias);
        }
        
        // Configura navegação
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove classe ativa de todos os links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Adiciona classe ativa ao link clicado
                link.classList.add('active');
                
                // Filtra por categoria
                const categoria = link.querySelector('span').textContent.trim();
                filtrarPorCategoria(categoria);
            });
        });
        
    } catch (error) {
        console.error('Erro ao carregar notícias:', error);
        const container = document.getElementById('noticias');
        if (container) {
            container.innerHTML = '<div class="erro"><p>Erro ao carregar as notícias. Por favor, recarregue a página.</p><button onclick="window.location.reload()">Recarregar</button></div>';
        }
    }
}

function filtrarNoticias() {
    const termoBusca = document.getElementById('busca')?.value.toLowerCase() || '';
    const fontesSelecionadas = Array.from(document.querySelectorAll('.filtro-item input:checked')).map(cb => cb.value);
    
    const noticiasFiltered = noticias.filter(noticia => {
        // Usar o campo título correto
        const matchTermo = noticia.titulo.toLowerCase().includes(termoBusca);
        const matchFonte = fontesSelecionadas.includes(noticia.fonte);
        return matchTermo && matchFonte;
    });
    
    exibirNoticias(noticiasFiltered);
}

function filtrarPorCategoria(categoria) {
    if (categoria === 'Todas') {
        exibirNoticias(noticias);
        return;
    }
    
    // Para simplificar, vamos categorizar por fonte
    // Em um cenário real, você teria categorias específicas
    const categoriaLower = categoria.toLowerCase();
    let noticiasFiltered;
    
    if (categoriaLower === 'consoles') {
        noticiasFiltered = noticias.filter(noticia => 
            noticia.titulo.toLowerCase().includes('console') ||
            noticia.titulo.toLowerCase().includes('ps5') ||
            noticia.titulo.toLowerCase().includes('xbox') ||
            noticia.titulo.toLowerCase().includes('nintendo') ||
            noticia.titulo.toLowerCase().includes('switch')
        );
    } else if (categoriaLower === 'jogos') {
        noticiasFiltered = noticias.filter(noticia => 
            !noticia.titulo.toLowerCase().includes('console') &&
            !noticia.titulo.toLowerCase().includes('ps5') &&
            !noticia.titulo.toLowerCase().includes('xbox') &&
            !noticia.titulo.toLowerCase().includes('nintendo') &&
            !noticia.titulo.toLowerCase().includes('switch')
        );
    } else {
        noticiasFiltered = noticias;
    }
    
    exibirNoticias(noticiasFiltered);
}

function exibirNoticias(noticiasArray) {
    const container = document.getElementById('noticias');
    
    if (!container) return;
    
    if (noticiasArray.length === 0) {
        container.innerHTML = '<div class="erro"><p>Nenhuma notícia encontrada.</p></div>';
        return;
    }
    
    container.innerHTML = '';
    
    noticiasArray.forEach(noticia => {
        const article = document.createElement('article');
        
        article.innerHTML = `
            <a href="${noticia.link}" target="_blank" rel="noopener">
                <div class="article-img">
                    <img src="${noticia.imagem || 'images/fallback.jpg'}" alt="${noticia.titulo}" onerror="this.src='images/fallback.jpg'">
                </div>
                <div class="article-content">
                    <div class="fonte-badge">${noticia.fonte}</div>
                    <h2>${noticia.titulo}</h2>
                    <p>${noticia.descricao || ''}</p>
                </div>
            </a>
        `;
        
        container.appendChild(article);
    });
}

// Carrega notícias quando a página estiver pronta
document.addEventListener('DOMContentLoaded', carregarNoticias);