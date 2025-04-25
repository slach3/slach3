import requests
from bs4 import BeautifulSoup
import json
import time
from datetime import datetime
import random
import os
import logging

# Configuração de logs
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler('scraper.log', mode='a')
    ]
)

def get_user_agent():
    user_agents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36 Edg/90.0.818.66',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
    ]
    return random.choice(user_agents)

def coletar_noticias_techtudo():
    logging.info("Coletando notícias do TechTudo (Games)...")
    url = "https://www.techtudo.com.br/games/"
    headers = {'User-Agent': get_user_agent()}
    
    try:
        response = requests.get(url, headers=headers, timeout=15)
        logging.info(f"Status da resposta TechTudo: {response.status_code}")
        soup = BeautifulSoup(response.text, 'html.parser')
        noticias = []
        
        # Tentar encontrar os elementos das notícias com base na estrutura
        articles = soup.select('.feed-post')
        logging.info(f"Artigos encontrados TechTudo: {len(articles)}")
        
        for article in articles[:10]:  # Limita a 10 notícias
            try:
                link_element = article.select_one('a')
                if not link_element:
                    continue
                    
                link = link_element['href']
                if not link.startswith('http'):
                    link = 'https://www.techtudo.com.br' + link
                
                titulo_element = article.select_one('.feed-post-body-title')
                if titulo_element:
                    titulo = titulo_element.get_text(strip=True)
                else:
                    continue
                
                descricao_elem = article.select_one('.feed-post-body-resumo')
                if descricao_elem:
                    descricao = descricao_elem.get_text(strip=True)
                else:
                    descricao = "Clique para ler mais sobre esta notícia de jogos."
                
                # Tentar encontrar a imagem
                img_element = article.select_one('img')
                imagem = None
                if img_element and 'data-src' in img_element.attrs:
                    imagem = img_element['data-src']
                elif img_element and 'src' in img_element.attrs:
                    imagem = img_element['src']
                
                noticias.append({
                    'titulo': titulo,
                    'descricao': descricao,
                    'link': link,
                    'imagem': imagem,
                    'fonte': 'TechTudo'
                })
                logging.info(f"Notícia encontrada TechTudo: {titulo[:50]}...")
            except Exception as e:
                logging.error(f"Erro ao processar item do TechTudo: {e}")
        
        return noticias
    except Exception as e:
        logging.error(f"Erro ao coletar notícias do TechTudo: {e}")
        return []

def coletar_noticias_ign():
    logging.info("Coletando notícias da IGN Brasil...")
    url = "https://br.ign.com/"
    headers = {'User-Agent': get_user_agent()}
    
    try:
        response = requests.get(url, headers=headers, timeout=15)
        logging.info(f"Status da resposta IGN: {response.status_code}")
        soup = BeautifulSoup(response.text, 'html.parser')
        noticias = []
        
        articles = soup.select('article')
        logging.info(f"Artigos encontrados IGN: {len(articles)}")
        
        for article in articles[:10]:  # Limita a 10 notícias
            try:
                link_element = article.select_one('a')
                if not link_element:
                    continue
                    
                link = link_element['href']
                if not link.startswith('http'):
                    link = 'https://br.ign.com' + link
                
                titulo_element = article.select_one('h3, h2')
                if titulo_element:
                    titulo = titulo_element.get_text(strip=True)
                else:
                    continue
                
                descricao = "Clique para ler a notícia completa na IGN Brasil."
                
                # Tentar encontrar a imagem
                img_element = article.select_one('img')
                imagem = None
                if img_element and 'data-src' in img_element.attrs:
                    imagem = img_element['data-src']
                elif img_element and 'src' in img_element.attrs:
                    imagem = img_element['src']
                
                noticias.append({
                    'titulo': titulo,
                    'descricao': descricao,
                    'link': link,
                    'imagem': imagem,
                    'fonte': 'IGN Brasil'
                })
                logging.info(f"Notícia encontrada IGN: {titulo[:50]}...")
            except Exception as e:
                logging.error(f"Erro ao processar item da IGN Brasil: {e}")
        
        return noticias
    except Exception as e:
        logging.error(f"Erro ao coletar notícias da IGN Brasil: {e}")
        return []

def coletar_noticias_pcgamer():
    logging.info("Coletando notícias da PC Gamer...")
    url = "https://www.pcgamer.com/news/"
    headers = {'User-Agent': get_user_agent()}
    
    try:
        response = requests.get(url, headers=headers, timeout=15)
        logging.info(f"Status da resposta PC Gamer: {response.status_code}")
        soup = BeautifulSoup(response.text, 'html.parser')
        noticias = []
        
        articles = soup.select('div.listingResult')
        logging.info(f"Artigos encontrados PC Gamer: {len(articles)}")
        
        for article in articles[:10]:  # Limita a 10 notícias
            try:
                link_element = article.select_one('a.article-link')
                if not link_element:
                    continue
                    
                link = link_element['href']
                if not link.startswith('http'):
                    link = 'https://www.pcgamer.com' + link
                
                titulo_element = article.select_one('h3.article-name')
                if titulo_element:
                    titulo = titulo_element.get_text(strip=True)
                else:
                    continue
                
                descricao_elem = article.select_one('p.synopsis')
                if descricao_elem:
                    descricao = descricao_elem.get_text(strip=True)
                else:
                    descricao = "Clique para ler mais sobre esta notícia de jogos."
                
                # Tentar encontrar a imagem
                img_element = article.select_one('img')
                imagem = None
                if img_element and 'data-src' in img_element.attrs:
                    imagem = img_element['data-src']
                elif img_element and 'src' in img_element.attrs:
                    imagem = img_element['src']
                
                noticias.append({
                    'titulo': titulo,
                    'descricao': descricao,
                    'link': link,
                    'imagem': imagem,
                    'fonte': 'PC Gamer'
                })
                logging.info(f"Notícia encontrada PC Gamer: {titulo[:50]}...")
            except Exception as e:
                logging.error(f"Erro ao processar item da PC Gamer: {e}")
        
        return noticias
    except Exception as e:
        logging.error(f"Erro ao coletar notícias da PC Gamer: {e}")
        return []

def coletar_noticias_adrenaline():
    logging.info("Coletando notícias do Adrenaline...")
    url = "https://adrenaline.com.br/noticias/v/77809/games"
    headers = {'User-Agent': get_user_agent()}
    
    try:
        response = requests.get(url, headers=headers, timeout=15)
        logging.info(f"Status da resposta Adrenaline: {response.status_code}")
        soup = BeautifulSoup(response.text, 'html.parser')
        noticias = []
        
        articles = soup.select('div.card')
        logging.info(f"Artigos encontrados Adrenaline: {len(articles)}")
        
        for article in articles[:10]:  # Limita a 10 notícias
            try:
                link_element = article.select_one('a')
                if not link_element:
                    continue
                    
                link = link_element['href']
                if not link.startswith('http'):
                    link = 'https://adrenaline.com.br' + link
                
                titulo_element = article.select_one('.title')
                if titulo_element:
                    titulo = titulo_element.get_text(strip=True)
                else:
                    continue
                
                descricao_elem = article.select_one('.excerpt')
                if descricao_elem:
                    descricao = descricao_elem.get_text(strip=True)
                else:
                    descricao = "Clique para ler mais sobre esta notícia de jogos no Adrenaline."
                
                # Tentar encontrar a imagem
                img_element = article.select_one('img')
                imagem = None
                if img_element and 'data-src' in img_element.attrs:
                    imagem = img_element['data-src']
                elif img_element and 'src' in img_element.attrs:
                    imagem = img_element['src']
                
                noticias.append({
                    'titulo': titulo,
                    'descricao': descricao,
                    'link': link,
                    'imagem': imagem,
                    'fonte': 'Adrenaline'
                })
                logging.info(f"Notícia encontrada Adrenaline: {titulo[:50]}...")
            except Exception as e:
                logging.error(f"Erro ao processar item do Adrenaline: {e}")
        
        return noticias
    except Exception as e:
        logging.error(f"Erro ao coletar notícias do Adrenaline: {e}")
        return []

def coletar_noticias_tecmundo():
    logging.info("Coletando notícias do TecMundo (Games)...")
    url = "https://www.tecmundo.com.br/minha-serie/jogos"
    headers = {'User-Agent': get_user_agent()}
    
    try:
        response = requests.get(url, headers=headers, timeout=15)
        logging.info(f"Status da resposta TecMundo: {response.status_code}")
        soup = BeautifulSoup(response.text, 'html.parser')
        noticias = []
        
        articles = soup.select('article.tec--card')
        logging.info(f"Artigos encontrados TecMundo: {len(articles)}")
        
        for article in articles[:10]:  # Limita a 10 notícias
            try:
                link_element = article.select_one('a.tec--card__title__link')
                if not link_element:
                    continue
                    
                link = link_element['href']
                if not link.startswith('http'):
                    link = 'https://www.tecmundo.com.br' + link
                
                titulo = link_element.get_text(strip=True)
                if not titulo:
                    continue
                
                descricao_elem = article.select_one('.tec--card__description')
                if descricao_elem:
                    descricao = descricao_elem.get_text(strip=True)
                else:
                    descricao = "Clique para ler mais sobre esta notícia de jogos no TecMundo."
                
                # Tentar encontrar a imagem
                img_element = article.select_one('img')
                imagem = None
                if img_element and 'data-src' in img_element.attrs:
                    imagem = img_element['data-src']
                elif img_element and 'src' in img_element.attrs:
                    imagem = img_element['src']
                
                noticias.append({
                    'titulo': titulo,
                    'descricao': descricao,
                    'link': link,
                    'imagem': imagem,
                    'fonte': 'TecMundo'
                })
                logging.info(f"Notícia encontrada TecMundo: {titulo[:50]}...")
            except Exception as e:
                logging.error(f"Erro ao processar item do TecMundo: {e}")
        
        return noticias
    except Exception as e:
        logging.error(f"Erro ao coletar notícias do TecMundo: {e}")
        return []

def coletar_noticias_gameviciados():
    logging.info("Coletando notícias do GameViciados...")
    url = "https://www.gamevicio.com/"
    headers = {'User-Agent': get_user_agent()}
    
    try:
        response = requests.get(url, headers=headers, timeout=15)
        logging.info(f"Status da resposta GameViciados: {response.status_code}")
        soup = BeautifulSoup(response.text, 'html.parser')
        noticias = []
        
        articles = soup.select('article.item-lista')
        logging.info(f"Artigos encontrados GameViciados: {len(articles)}")
        
        for article in articles[:10]:  # Limita a 10 notícias
            try:
                link_element = article.select_one('a')
                if not link_element:
                    continue
                    
                link = link_element['href']
                if not link.startswith('http'):
                    link = 'https://www.gamevicio.com' + link
                
                titulo_element = article.select_one('h2')
                if titulo_element:
                    titulo = titulo_element.get_text(strip=True)
                else:
                    continue
                
                descricao = "Notícia sobre games do portal GameViciados."
                
                # Tentar encontrar a imagem
                img_element = article.select_one('img')
                imagem = None
                if img_element and 'data-src' in img_element.attrs:
                    imagem = img_element['data-src']
                elif img_element and 'src' in img_element.attrs:
                    imagem = img_element['src']
                
                noticias.append({
                    'titulo': titulo,
                    'descricao': descricao,
                    'link': link,
                    'imagem': imagem,
                    'fonte': 'GameViciados'
                })
                logging.info(f"Notícia encontrada GameViciados: {titulo[:50]}...")
            except Exception as e:
                logging.error(f"Erro ao processar item do GameViciados: {e}")
        
        return noticias
    except Exception as e:
        logging.error(f"Erro ao coletar notícias do GameViciados: {e}")
        return []

def coletar_noticias_voxel():
    logging.info("Coletando notícias do Voxel...")
    url = "https://www.tecmundo.com.br/voxel"
    headers = {'User-Agent': get_user_agent()}
    
    try:
        response = requests.get(url, headers=headers, timeout=15)
        logging.info(f"Status da resposta Voxel: {response.status_code}")
        soup = BeautifulSoup(response.text, 'html.parser')
        noticias = []
        
        articles = soup.select('article.tec--card')
        logging.info(f"Artigos encontrados Voxel: {len(articles)}")
        
        for article in articles[:10]:  # Limita a 10 notícias
            try:
                link_element = article.select_one('a.tec--card__title__link')
                if not link_element:
                    continue
                    
                link = link_element['href']
                if not link.startswith('http'):
                    link = 'https://www.tecmundo.com.br' + link
                
                titulo = link_element.get_text(strip=True)
                if not titulo:
                    continue
                
                descricao_elem = article.select_one('.tec--card__description')
                if descricao_elem:
                    descricao = descricao_elem.get_text(strip=True)
                else:
                    descricao = "Notícia sobre games do portal Voxel."
                
                # Tentar encontrar a imagem
                img_element = article.select_one('img')
                imagem = None
                if img_element and 'data-src' in img_element.attrs:
                    imagem = img_element['data-src']
                elif img_element and 'src' in img_element.attrs:
                    imagem = img_element['src']
                
                noticias.append({
                    'titulo': titulo,
                    'descricao': descricao,
                    'link': link,
                    'imagem': imagem,
                    'fonte': 'Voxel'
                })
                logging.info(f"Notícia encontrada Voxel: {titulo[:50]}...")
            except Exception as e:
                logging.error(f"Erro ao processar item do Voxel: {e}")
        
        return noticias
    except Exception as e:
        logging.error(f"Erro ao coletar notícias do Voxel: {e}")
        return []

def coletar_e_salvar_noticias():
    logging.info(f"===== Iniciando coleta de notícias em {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} =====")
    
    todas_noticias = []
    
    # Coleta de fontes diferentes com tratamento de erros específico para cada fonte
    try:
        todas_noticias.extend(coletar_noticias_techtudo())
        time.sleep(2)  # Pausa para não sobrecarregar os servidores
    except Exception as e:
        logging.error(f"Falha completa no processamento do TechTudo: {e}")
    
    try:
        todas_noticias.extend(coletar_noticias_ign())
        time.sleep(2)  # Pausa para não sobrecarregar os servidores
    except Exception as e:
        logging.error(f"Falha completa no processamento da IGN Brasil: {e}")
    
    try:
        todas_noticias.extend(coletar_noticias_pcgamer())
        time.sleep(2)  # Pausa para não sobrecarregar os servidores
    except Exception as e:
        logging.error(f"Falha completa no processamento da PC Gamer: {e}")
    
    try:
        todas_noticias.extend(coletar_noticias_adrenaline())
        time.sleep(2)  # Pausa para não sobrecarregar os servidores
    except Exception as e:
        logging.error(f"Falha completa no processamento do Adrenaline: {e}")
    
    try:
        todas_noticias.extend(coletar_noticias_tecmundo())
        time.sleep(2)  # Pausa para não sobrecarregar os servidores
    except Exception as e:
        logging.error(f"Falha completa no processamento do TecMundo: {e}")
        
    try:
        todas_noticias.extend(coletar_noticias_gameviciados())
        time.sleep(2)  # Pausa para não sobrecarregar os servidores
    except Exception as e:
        logging.error(f"Falha completa no processamento do GameViciados: {e}")
        
    try:
        todas_noticias.extend(coletar_noticias_voxel())
    except Exception as e:
        logging.error(f"Falha completa no processamento do Voxel: {e}")
    
    # Tratamento para imagens faltantes e duplicados
    noticias_filtradas = []
    titulos_adicionados = set()
    
    for noticia in todas_noticias:
        # Limita títulos a 150 caracteres para evitar problemas de exibição
        if len(noticia['titulo']) > 150:
            noticia['titulo'] = noticia['titulo'][:147] + '...'
            
        # Evita notícias duplicadas (baseado no título)
        titulo_simplificado = noticia['titulo'].lower()[:50]
        if titulo_simplificado in titulos_adicionados:
            continue
        
        titulos_adicionados.add(titulo_simplificado)
        
        # Define imagem padrão se não tiver
        if not noticia.get('imagem'):
            noticia['imagem'] = 'images/fallback.html'
        
        noticias_filtradas.append(noticia)
    
    # Se não conseguir coletar notícias, usa exemplos
    if len(noticias_filtradas) <= 1:
        logging.warning("Não foi possível coletar notícias suficientes, usando exemplos.")
        noticias_filtradas = [
            {
                "titulo": "GTA VI recebe data oficial de lançamento e novo trailer",
                "descricao": "Rockstar Games anuncia que Grand Theft Auto VI chega em outubro de 2025 para PS5 e Xbox Series X|S, com versão para PC prevista para 2026.",
                "link": "https://exemplo.com/gta6",
                "imagem": "images/fallback.html",
                "fonte": "GameNews"
            },
            {
                "titulo": "Nintendo revela novo console sucessor do Switch",
                "descricao": "O esperado 'Switch 2' foi finalmente apresentado com gráficos em 4K e retrocompatibilidade com jogos do Switch original.",
                "link": "https://exemplo.com/switch2",
                "imagem": "images/fallback.html",
                "fonte": "GameNews"
            },
            {
                "titulo": "Elden Ring: Shadow of the Erdtree recebe nota máxima em análises",
                "descricao": "A expansão do jogo do ano de 2022 está sendo aclamada como uma das melhores DLCs de todos os tempos.",
                "link": "https://exemplo.com/eldenring-dlc",
                "imagem": "images/fallback.html",
                "fonte": "GameNews"
            },
            {
                "titulo": "Microsoft anuncia aquisição de mais um estúdio de jogos",
                "descricao": "Após Activision Blizzard, a gigante de tecnologia continua expandindo seu portfólio para o Xbox Game Pass.",
                "link": "https://exemplo.com/microsoft-aquisicao",
                "imagem": "images/fallback.html",
                "fonte": "GameNews"
            },
            {
                "titulo": "Novo jogo da série God of War é anunciado para PS5",
                "descricao": "Sony confirma que Kratos retornará em uma nova aventura, dando continuidade à saga nórdica iniciada em 2018.",
                "link": "https://exemplo.com/god-of-war",
                "imagem": "images/fallback.html",
                "fonte": "GameNews"
            }
        ]
    
    # Embaralha as notícias para criar mais variedade visual
    random.shuffle(noticias_filtradas)
    
    # Limita o número total de notícias para 30 para não sobrecarregar a página
    if len(noticias_filtradas) > 30:
        noticias_filtradas = noticias_filtradas[:30]
    
    logging.info(f"Total de notícias coletadas após filtragem: {len(noticias_filtradas)}")
    
    # Gera arquivo JSON
    with open('noticias.json', 'w', encoding='utf-8') as f:
        json.dump(noticias_filtradas, f, ensure_ascii=False, indent=4)
    
    # Gera arquivo JavaScript
    with open('noticias.js', 'w', encoding='utf-8') as f:
        f.write(f"// Atualizado em: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write("const noticias = ")
        f.write(json.dumps(noticias_filtradas, ensure_ascii=False, indent=4))
        f.write(";")
    
    logging.info(f"Arquivos noticias.json e noticias.js gerados com sucesso!")
    logging.info(f"===== Coleta finalizada em {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} =====\n")

if __name__ == "__main__":
    coletar_e_salvar_noticias()