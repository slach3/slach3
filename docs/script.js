// script.js

// Configuração do modo escuro
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.documentElement.classList.contains('dark-mode'));
});

// Função para obter parâmetros da URL
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

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
        
        // Verificar se há parâmetro de categoria na URL
        const categoriaParam = getParameterByName('categoria');
        if (categoriaParam) {
            // Ativar o link da categoria correspondente
            const navLinks = document.querySelectorAll('nav a');
            navLinks.forEach(link => {
                const linkCategoria = link.querySelector('span').textContent.trim().toLowerCase();
                if (linkCategoria === categoriaParam.toLowerCase()) {
                    // Remove classe ativa de todos os links
                    navLinks.forEach(l => l.classList.remove('active'));
                    // Adiciona classe ativa ao link correspondente
                    link.classList.add('active');
                }
            });
            
            // Filtrar por categoria
            filtrarPorCategoria(categoriaParam);
        } else {
            // Exibe todas as notícias inicialmente
            exibirNoticias(noticias);
        }
        
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
        
        // Configura navegação na página principal (não usamos no jogos.html)
        const isIndexPage = window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/');
        
        if (isIndexPage) {
            const navLinks = document.querySelectorAll('nav a');
            navLinks.forEach(link => {
                if (link.getAttribute('href').startsWith('index.html?categoria=')) {
                    link.addEventListener('click', (e) => {
                        // Não precisamos prevenir o comportamento padrão pois queremos navegar
                        
                        // Apenas para links que são categorias na mesma página
                        const categoria = link.querySelector('span').textContent.trim();
                        console.log(`Navegando para categoria: ${categoria}`);
                    });
                }
            });
        }
        
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
                    <img src="${noticia.imagem || '#'}" alt="${noticia.titulo}" 
                         onerror="this.onerror=null; this.style.background='#41BCDB'; this.style.display='flex'; this.style.justifyContent='center'; this.style.alignItems='center'; this.src='data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'white\'%3e%3cpath d=\'M13 13h-2V7h2v6zm0 4h-2v-2h2v2z\'/%3e%3c/svg%3e';">
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