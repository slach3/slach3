import requests
from bs4 import BeautifulSoup
import json

def coletar_noticias():
    urls = [
        "https://www.ign.com/articles",  # IGN
        "https://www.gamespot.com/news/",  # GameSpot
    ]

    noticias = []

    for url in urls:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')

        if "ign.com" in url:
            for item in soup.select('.article-title'):  # Ajuste para o seletor correto
                titulo = item.get_text(strip=True)
                link = item.find('a')['href']
                noticias.append({
                    'titulo': titulo,
                    'descricao': "Notícia do site IGN.",
                    'link': link
                })

        elif "gamespot.com" in url:
            for item in soup.select('.news-item'):  # Ajuste para o seletor correto
                titulo = item.select_one('.news-title').get_text(strip=True)
                descricao = item.select_one('.news-deck').get_text(strip=True)
                link = item.find('a')['href']
                noticias.append({
                    'titulo': titulo,
                    'descricao': descricao,
                    'link': link
                })

    with open('noticias.json', 'w', encoding='utf-8') as f:
        json.dump(noticias, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    coletar_noticias()