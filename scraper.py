import requests
from bs4 import BeautifulSoup
import json
import time
from datetime import datetime
import random

def get_user_agent():
    user_agents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15'
    ]
    return random.choice(user_agents)

def coletar_noticias_ign():
    print("Coletando notícias da IGN Brasil...")
    url = "https://br.ign.com/video-games"
    headers = {'User-Agent': get_user_agent()}
    
    try:
        response = requests.get(url, headers=headers)
        soup = BeautifulSoup(response.text, 'html.parser')
        noticias = []
        
        articles = soup.select('article.article')
        for article in articles[:10]:  # Limita a 10 notícias
            try:
                link_element = article.select_one('a.item-body')
                if not link_element:
                    continue
                    
                link = link_element['href']
                if not link.startswith('http'):
                    link = 'https://br.ign.com' + link
                
                titulo = article.select_one('h3').get_text(strip=True)
                descricao = article.select_one('p.item-description')
                if descricao:
                    descricao = descricao.get_text(strip=True)
                else:
                    descricao = "Clique para ler mais sobre esta notícia."
                
                noticias.append({
                    'titulo': titulo,
                    'descricao': descricao,
                    'link': link,
                    'fonte': 'IGN Brasil'
                })
            except Exception as e:
                print(f"Erro ao processar item da IGN: {e}")
        
        return noticias
    except Exception as e:
        print(f"Erro ao coletar notícias da IGN: {e}")
        return []

def coletar_noticias_adrenaline():
    print("Coletando notícias do Adrenaline...")
    url = "https://adrenaline.com.br/noticias/games"
    headers = {'User-Agent': get_user_agent()}
    
    try:
        response = requests.get(url, headers=headers)
        soup = BeautifulSoup(response.text, 'html.parser')
        noticias = []
        
        articles = soup.select('article.news-item')
        for article in articles[:10]:  # Limita a 10 notícias
            try:
                link_element = article.select_one('a.news-item__link')
                if not link_element:
                    continue
                    
                link = link_element['href']
                if not link.startswith('http'):
                    link = 'https://adrenaline.com.br' + link
                
                titulo = article.select_one('h2.news-item__title').get_text(strip=True)
                descricao_elem = article.select_one('p.news-item__description')
                if descricao_elem:
                    descricao = descricao_elem.get_text(strip=True)
                else:
                    descricao = "Clique para ler mais sobre esta notícia."
                
                noticias.append({
                    'titulo': titulo,
                    'descricao': descricao,
                    'link': link,
                    'fonte': 'Adrenaline'
                })
            except Exception as e:
                print(f"Erro ao processar item do Adrenaline: {e}")
        
        return noticias
    except Exception as e:
        print(f"Erro ao coletar notícias do Adrenaline: {e}")
        return []

def coletar_e_salvar_noticias():
    print(f"Iniciando coleta de notícias em {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    todas_noticias = []
    
    # Coleta de fontes diferentes
    todas_noticias.extend(coletar_noticias_ign())
    time.sleep(2)  # Pausa para não sobrecarregar os servidores
    todas_noticias.extend(coletar_noticias_adrenaline())
    
    # Se não conseguir coletar notícias, usa exemplos
    if not todas_noticias:
        print("Não foi possível coletar notícias, usando exemplos.")
        todas_noticias = [
            {
                "titulo": "GTA VI recebe data oficial de lançamento e novo trailer",
                "descricao": "Rockstar Games anuncia que Grand Theft Auto VI chega em outubro de 2025 para PS5 e Xbox Series X|S, com versão para PC prevista para 2026.",
                "link": "https://exemplo.com/gta6",
                "fonte": "Exemplo"
            },
            {
                "titulo": "Nintendo revela novo console sucessor do Switch",
                "descricao": "O esperado 'Switch 2' foi finalmente apresentado com gráficos em 4K e retrocompatibilidade com jogos do Switch original.",
                "link": "https://exemplo.com/switch2",
                "fonte": "Exemplo"
            }
        ]
    
    # Gera arquivo JSON
    with open('noticias.json', 'w', encoding='utf-8') as f:
        json.dump(todas_noticias, f, ensure_ascii=False, indent=4)
    
    # Gera arquivo JavaScript
    with open('noticias.js', 'w', encoding='utf-8') as f:
        f.write(f"// Atualizado em: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write("const noticias = ")
        f.write(json.dumps(todas_noticias, ensure_ascii=False, indent=4))
        f.write(";")
    
    print(f"Coleta finalizada. Total de {len(todas_noticias)} notícias coletadas.")

if __name__ == "__main__":
    coletar_e_salvar_noticias()