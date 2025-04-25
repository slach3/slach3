# GameNews - Portal de Notícias de Jogos

Um portal que agrega automaticamente as últimas notícias do mundo dos jogos eletrônicos de várias fontes confiáveis.

## Funcionalidades

- Agregação automática de notícias de jogos de várias fontes (IGN Brasil, PC Gamer, TechTudo, etc.)
- Categorização inteligente das notícias por temas (consoles, jogos, esports)
- Interface responsiva e amigável
- Sistema de filtros por fonte e categoria
- Atualização automática de conteúdo a cada 5 minutos

## Sistema de Atualização Automática

Este site utiliza GitHub Actions para buscar e atualizar notícias automaticamente a cada 5 minutos. O sistema:

1. Coleta notícias de múltiplas fontes confiáveis
2. Filtra e organiza as notícias
3. Atualiza o repositório automaticamente quando encontra novas notícias
4. Publica as alterações no GitHub Pages

Todas essas operações acontecem sem necessidade de intervenção manual, garantindo conteúdo sempre atualizado.

## Tecnologias Utilizadas

- HTML5, CSS3 e JavaScript para frontend
- Python com BeautifulSoup para web scraping
- GitHub Actions para automação
- GitHub Pages para hospedagem

## Como Funciona

O sistema utiliza um script Python (`scraper.py`) que faz web scraping de sites confiáveis de notícias de jogos. As notícias coletadas são salvas em arquivos JSON e JavaScript que são consumidos pelo frontend da aplicação.

Um workflow do GitHub Actions executa este script periodicamente, garantindo que o conteúdo esteja sempre atualizado.
