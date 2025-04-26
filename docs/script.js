// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Configuração do modo escuro
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.documentElement.classList.contains('dark-mode'));
        });
    }

    // Verificar se as notícias são muito antigas (mais de 24 horas)
    const agora = new Date();
    let noticiasAtualizadas = false;
    
    if (typeof noticias !== 'undefined' && noticias.length > 0 && noticias[0].timestamp) {
        const dataMaisRecente = new Date(noticias[0].timestamp);
        const diferenca = agora - dataMaisRecente;
        const horasDesdeAtualizacao = diferenca / (1000 * 60 * 60);
        
        console.log(`Última atualização de notícias: ${horasDesdeAtualizacao.toFixed(2)} horas atrás`);
        
        // Se as notícias forem mais antigas que 24 horas, tenta buscar novas notícias
        if (horasDesdeAtualizacao > 24) {
            console.log("Notícias antigas (>24h). Tentando buscar notícias atualizadas...");
            buscarNoticiasAtualizadas();
        }
    } else {
        console.log("Não foi possível determinar a última atualização. Carregando notícias disponíveis.");
    }

    // Carrega as notícias disponíveis
    carregarNoticias();

    // Gerenciar iframe na página de jogos
    const iframe = document.querySelector('.iframe-container iframe');
    if (iframe) {
        iframe.addEventListener('error', function() {
            this.setAttribute('data-failed', 'true');
            // Substitui o iframe por uma mensagem de erro
            const container = this.parentElement;
            container.innerHTML = '<div class="erro-jogo">O jogo não pôde ser carregado. Verifique sua conexão ou tente novamente mais tarde.</div>';
        });
        
        iframe.addEventListener('load', function() {
            try {
                // Verificar se o iframe carregou corretamente
                const iframeDoc = this.contentDocument || this.contentWindow.document;
                if (!iframeDoc || iframeDoc.body.innerHTML === '') {
                    throw new Error('Iframe vazio');
                }
                console.log("Jogo carregado com sucesso!");
            } catch (e) {
                console.error("Erro ao carregar o jogo:", e);
                this.setAttribute('data-failed', 'true');
                // Substitui o iframe por uma mensagem de erro
                const container = this.parentElement;
                container.innerHTML = '<div class="erro-jogo">O jogo não pôde ser carregado. Verifique sua conexão ou tente novamente mais tarde.</div>';
            }
        });
    }
});

// Função para buscar notícias atualizadas de fontes online
function buscarNoticiasAtualizadas() {
    console.log("Buscando notícias atualizadas...");
    
    // Lista de fontes de notícias com APIs públicas ou RSS feeds
    const fontes = [
        {
            url: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.tecmundo.com.br%2Ffeed',
            fonte: 'TecMundo',
            parser: parseTecmundo
        },
        {
            url: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ffeeds.feedburner.com%2FTheHackersNews',
            fonte: 'Tech News',
            parser: parseGenerico
        }
    ];
    
    // Tentar buscar notícias de cada fonte
    const promessas = fontes.map(fonte => 
        fetch(fonte.url)
            .then(response => response.json())
            .then(data => fonte.parser(data, fonte.fonte))
            .catch(error => {
                console.error(`Erro ao buscar de ${fonte.fonte}:`, error);
                return [];
            })
    );
    
    // Combinar todas as notícias e atualizar
    Promise.all(promessas)
        .then(resultados => {
            const todasNoticias = resultados.flat();
            
            if (todasNoticias.length > 0) {
                console.log(`Encontradas ${todasNoticias.length} notícias novas.`);
                
                // Adicionar timestamp atual
                todasNoticias.forEach(noticia => {
                    noticia.timestamp = new Date().toISOString();
                });
                
                // Combinar com as notícias existentes, evitando duplicatas
                const hashsExistentes = new Set();
                if (typeof noticias !== 'undefined') {
                    noticias.forEach(n => hashsExistentes.add(n.titulo + n.link));
                }
                
                const noticiasNovas = todasNoticias.filter(
                    n => !hashsExistentes.has(n.titulo + n.link)
                );
                
                if (noticiasNovas.length > 0) {
                    console.log(`Adicionando ${noticiasNovas.length} notícias novas`);
                    window.noticias = noticiasNovas.concat(
                        typeof noticias !== 'undefined' ? noticias : []
                    );
                    
                    // Recarregar a exibição
                    carregarNoticias();
                }
            }
        });
}

// Parsers para diferentes fontes
function parseTecmundo(data, fonte) {
    if (!data.items || !Array.isArray(data.items)) return [];
    
    return data.items.slice(0, 10).map(item => ({
        titulo: item.title,
        descricao: item.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
        link: item.link,
        imagem: item.thumbnail || 'images/fallback.html',
        fonte: fonte,
        timestamp: new Date().toISOString()
    }));
}

function parseGenerico(data, fonte) {
    if (!data.items || !Array.isArray(data.items)) return [];
    
    return data.items.slice(0, 10).map(item => ({
        titulo: item.title,
        descricao: item.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
        link: item.link,
        imagem: item.thumbnail || item.enclosure?.link || 'images/fallback.html',
        fonte: fonte,
        timestamp: new Date().toISOString()
    }));
}

// Função para carregar notícias
function carregarNoticias() {
    try {
        // Verificar se noticias está definido
        if (typeof noticias === 'undefined' || !noticias) {
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
        const filtrosContainer = document.querySelector('.filtro-fontes');
        
        if (filtrosContainer) {
            filtrosContainer.innerHTML = ''; // Limpa filtros existentes
            const fontes = [...new Set(noticias.map(noticia => noticia.fonte))];
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
                const linkSpan = link.querySelector('span');
                if (linkSpan) {
                    const linkCategoria = linkSpan.textContent.trim().toLowerCase();
                    if (linkCategoria === categoriaParam.toLowerCase()) {
                        // Remove classe ativa de todos os links
                        navLinks.forEach(l => l.classList.remove('active'));
                        // Adiciona classe ativa ao link correspondente
                        link.classList.add('active');
                    }
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
        
    } catch (error) {
        console.error('Erro ao carregar notícias:', error);
        const container = document.getElementById('noticias');
        if (container) {
            container.innerHTML = '<div class="erro"><p>Erro ao carregar as notícias. Por favor, recarregue a página.</p><button onclick="window.location.reload()">Recarregar</button></div>';
        }
    }
}

// Função para obter parâmetros da URL
function getParameterByName(name) {
    const url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Função para filtrar notícias por categoria
function filtrarPorCategoria(categoria) {
    if (!categoria) return;
    
    console.log(`Filtrando por categoria: ${categoria}`);
    
    // Converter categoria para minúsculas para comparação
    const categoriaBusca = categoria.toLowerCase();
    
    // Filtrar notícias que correspondem à categoria
    let noticiasFiltradas = noticias.filter(noticia => {
        // Procurar categoria no título, descrição ou fonte
        const titulo = noticia.titulo.toLowerCase();
        const descricao = noticia.descricao ? noticia.descricao.toLowerCase() : '';
        const fonte = noticia.fonte ? noticia.fonte.toLowerCase() : '';
        
        // Mapeamento de categorias específicas para termos de busca
        const termosBusca = {
            'consoles': ['playstation', 'xbox', 'nintendo', 'switch', 'ps5', 'ps4', 'console', 'wii', 'games'],
            'jogos': ['game', 'jogo', 'games', 'gaming', 'playstation', 'xbox', 'nintendo'],
            'hardware': ['cpu', 'processador', 'gpu', 'placa de vídeo', 'ram', 'memória', 'hardware', 'pc', 'computador'],
            'software': ['app', 'aplicativo', 'software', 'programa', 'windows', 'macos', 'linux', 'android', 'ios']
        };
        
        // Se a categoria tiver termos específicos, verifica se algum deles está presente
        if (termosBusca[categoriaBusca]) {
            return termosBusca[categoriaBusca].some(termo => 
                titulo.includes(termo) || descricao.includes(termo)
            );
        }
        
        // Caso padrão: verifica se a categoria está presente diretamente
        return titulo.includes(categoriaBusca) || 
               descricao.includes(categoriaBusca) || 
               fonte.includes(categoriaBusca);
    });
    
    // Se não houver resultados, exibe mensagem
    if (noticiasFiltradas.length === 0) {
        console.log(`Nenhuma notícia encontrada para categoria: ${categoria}`);
        const container = document.getElementById('noticias');
        if (container) {
            container.innerHTML = `
                <div class="sem-resultados">
                    <h3>Nenhuma notícia encontrada para: ${categoria}</h3>
                    <p>Tente uma categoria diferente ou volte mais tarde.</p>
                    <button onclick="window.location.href='index.html'">Ver todas as notícias</button>
                </div>
            `;
        }
        return;
    }
    
    // Exibe as notícias filtradas
    exibirNoticias(noticiasFiltradas);
}

// Função para filtrar notícias (combinando busca e filtros)
function filtrarNoticias() {
    // Obter texto de busca
    const textoBusca = document.getElementById('busca')?.value.toLowerCase() || '';
    
    // Obter fontes selecionadas
    const fontesSelecionadas = Array.from(
        document.querySelectorAll('.filtro-item input:checked')
    ).map(input => input.value);
    
    // Filtra as notícias
    let noticiasFiltradas = noticias.filter(noticia => {
        // Filtrar por fonte
        if (fontesSelecionadas.length > 0 && noticia.fonte) {
            if (!fontesSelecionadas.includes(noticia.fonte)) {
                return false;
            }
        }
        
        // Filtrar por texto de busca
        if (textoBusca) {
            const titulo = noticia.titulo.toLowerCase();
            const descricao = noticia.descricao ? noticia.descricao.toLowerCase() : '';
            
            return titulo.includes(textoBusca) || descricao.includes(textoBusca);
        }
        
        return true;
    });
    
    // Exibe as notícias filtradas
    exibirNoticias(noticiasFiltradas);
}

// Função para exibir notícias no DOM
function exibirNoticias(noticiasList) {
    const container = document.getElementById('noticias');
    if (!container) return;
    
    // Limpa o container
    container.innerHTML = '';
    
    // Se não houver notícias, exibe mensagem
    if (noticiasList.length === 0) {
        container.innerHTML = `
            <div class="sem-resultados">
                <h3>Nenhuma notícia encontrada</h3>
                <p>Tente outros termos de busca ou filtros.</p>
            </div>
        `;
        return;
    }
    
    // Exibe cada notícia
    noticiasList.forEach(noticia => {
        const noticiaEl = document.createElement('div');
        noticiaEl.className = 'noticia card';
        
        // Formatar data se disponível
        let dataFormatada = '';
        if (noticia.timestamp) {
            const data = new Date(noticia.timestamp);
            dataFormatada = `${data.toLocaleDateString()} ${data.toLocaleTimeString()}`;
        }
        
        noticiaEl.innerHTML = `
            <div class="imagem-container">
                <img src="${noticia.imagem || 'images/fallback.html'}" 
                     alt="${noticia.titulo}" 
                     onerror="this.src='images/fallback.html'">
            </div>
            <div class="conteudo">
                <h3><a href="${noticia.link}" target="_blank">${noticia.titulo}</a></h3>
                <p>${noticia.descricao || ''}</p>
                <div class="meta">
                    ${noticia.fonte ? `<span class="fonte">${noticia.fonte}</span>` : ''}
                    ${dataFormatada ? `<span class="data">${dataFormatada}</span>` : ''}
                </div>
            </div>
        `;
        
        container.appendChild(noticiaEl);
    });
}