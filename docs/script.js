// script.js

// Configuração do modo escuro
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.documentElement.classList.contains('dark-mode'));
});

// Função para carregar notícias
async function carregarNoticias() {
    const noticiasDiv = document.getElementById('noticias');
    
    try {
        // Se estamos na página de jogos, mostrar apenas notícias relacionadas a jogos
        const isGamePage = window.location.pathname.includes('jogos.html');
        let noticiasParaMostrar = noticias;
        
        if (isGamePage) {
            noticiasParaMostrar = noticias.filter(noticia => 
                noticia.categoria.toLowerCase().includes('jogo') || 
                noticia.titulo.toLowerCase().includes('jogo') ||
                noticia.titulo.toLowerCase().includes('game')
            ).slice(0, 5); // Limita a 5 notícias na página de jogos
        }

        noticiasDiv.innerHTML = noticiasParaMostrar.map(noticia => `
            <article class="noticia-card">
                <div class="noticia-imagem">
                    <img src="${noticia.imagem}" alt="${noticia.titulo}" loading="lazy">
                </div>
                <div class="noticia-conteudo">
                    <span class="fonte-badge">${noticia.fonte}</span>
                    <h2>${noticia.titulo}</h2>
                    <p>${noticia.descricao}</p>
                    <a href="${noticia.link}" target="_blank" rel="noopener noreferrer">Ler mais</a>
                </div>
            </article>
        `).join('');
    } catch (erro) {
        console.error('Erro ao carregar notícias:', erro);
        noticiasDiv.innerHTML = `
            <div class="erro">
                <p>Erro ao carregar as notícias. Por favor, recarregue a página.</p>
                <button onclick="window.location.reload()">Recarregar</button>
            </div>
        `;
    }
}

// Carregar notícias quando o documento estiver pronto
if (document.getElementById('noticias')) {
    carregarNoticias();
}