async function carregarNoticias() {
    const container = document.getElementById('noticias');
    container.innerHTML = '<p>Carregando notícias...</p>';

    try {
        container.innerHTML = '';
        noticias.forEach(noticia => {
            const article = document.createElement('article');
            article.innerHTML = `
                <h2>${noticia.titulo}</h2>
                <p>${noticia.descricao}</p>
                <a href="${noticia.link}" target="_blank">Leia mais</a>
            `;
            container.appendChild(article);
        });
    } catch (error) {
        container.innerHTML = '<p>Erro ao carregar notícias.</p>';
        console.error(error);
    }
}

carregarNoticias();