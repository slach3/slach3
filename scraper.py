import requests
from bs4 import BeautifulSoup
import json
import time
from datetime import datetime, timedelta
import random
import os
import logging
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry
from concurrent.futures import ThreadPoolExecutor, as_completed
import hashlib

# Configuração de logs em português
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler('scraper.log', mode='a', encoding='utf-8')
    ]
)

CACHE_FILE = 'cache/noticias_cache.json'
CACHE_DURATION = timedelta(minutes=30)  # Cache reduzido para 30 minutos
MAX_RETRIES = 3
TIMEOUT = 30  # Aumentado para 30 segundos

def criar_sessao():
    """Cria uma sessão HTTP com retry automático"""
    session = requests.Session()
    retry_strategy = Retry(
        total=MAX_RETRIES,
        backoff_factor=1,
        status_forcelist=[500, 502, 503, 504],
    )
    adapter = HTTPAdapter(max_retries=retry_strategy)
    session.mount("http://", adapter)
    session.mount("https://", adapter)
    return session

def gerar_hash_noticia(noticia):
    """Gera um identificador único para cada notícia baseado no título e link"""
    conteudo = f"{noticia['titulo']}{noticia['link']}".encode('utf-8')
    return hashlib.md5(conteudo).hexdigest()

def carregar_cache():
    """Carrega notícias do cache se ainda estiverem válidas"""
    try:
        if not os.path.exists('cache'):
            os.makedirs('cache')
            logging.info("Diretório de cache criado")
        if os.path.exists(CACHE_FILE):
            with open(CACHE_FILE, 'r', encoding='utf-8') as f:
                cache = json.load(f)
                if datetime.fromisoformat(cache['timestamp']) + CACHE_DURATION > datetime.now():
                    logging.info("Usando notícias em cache")
                    return cache['noticias']
                else:
                    logging.info("Cache expirado, buscando novas notícias")
    except Exception as e:
        logging.error(f"Erro ao carregar cache: {str(e)}")
    return None

def salvar_cache(noticias):
    """Salva as notícias em cache com timestamp"""
    try:
        cache = {
            'timestamp': datetime.now().isoformat(),
            'noticias': noticias
        }
        with open(CACHE_FILE, 'w', encoding='utf-8') as f:
            json.dump(cache, f, ensure_ascii=False, indent=4)
        logging.info("Cache atualizado com sucesso")
    except Exception as e:
        logging.error(f"Erro ao salvar cache: {str(e)}")

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

def processar_fonte(coletor, session):
    try:
        return coletor(session)
    except Exception as e:
        logging.error(f"Erro ao processar {coletor.__name__}: {e}")
        return []

def coletar_noticias_techtudo(session):
    logging.info("Coletando notícias do TechTudo (Games)...")
    url = "https://www.techtudo.com.br/games/"
    headers = {'User-Agent': get_user_agent()}
    
    try:
        response = session.get(url, headers=headers, timeout=TIMEOUT)
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

def coletar_noticias_ign(session):
    logging.info("Coletando notícias da IGN Brasil...")
    url = "https://br.ign.com/"
    headers = {'User-Agent': get_user_agent()}
    
    try:
        response = session.get(url, headers=headers, timeout=TIMEOUT)
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

def coletar_noticias_pcgamer(session):
    logging.info("Coletando notícias da PC Gamer...")
    url = "https://www.pcgamer.com/news/"
    headers = {'User-Agent': get_user_agent()}
    
    try:
        response = session.get(url, headers=headers, timeout=TIMEOUT)
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

def coletar_noticias_adrenaline(session):
    logging.info("Coletando notícias do Adrenaline...")
    url = "https://adrenaline.com.br/noticias/v/77809/games"
    headers = {'User-Agent': get_user_agent()}
    
    try:
        response = session.get(url, headers=headers, timeout=TIMEOUT)
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

def coletar_noticias_tecmundo(session):
    logging.info("Coletando notícias do TecMundo (Games)...")
    url = "https://www.tecmundo.com.br/minha-serie/jogos"
    headers = {'User-Agent': get_user_agent()}
    
    try:
        response = session.get(url, headers=headers, timeout=TIMEOUT)
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

def coletar_noticias_gameviciados(session):
    logging.info("Coletando notícias do GameViciados...")
    url = "https://www.gamevicio.com/"
    headers = {'User-Agent': get_user_agent()}
    
    try:
        response = session.get(url, headers=headers, timeout=TIMEOUT)
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

def coletar_noticias_voxel(session):
    logging.info("Coletando notícias do Voxel...")
    url = "https://www.tecmundo.com.br/voxel"
    headers = {'User-Agent': get_user_agent()}
    
    try:
        response = session.get(url, headers=headers, timeout=TIMEOUT)
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
    
    # Tenta usar o cache primeiro
    noticias_cache = carregar_cache()
    if noticias_cache:
        return salvar_arquivos_noticias(noticias_cache)

    session = criar_sessao()
    todas_noticias = []
    noticias_hash = set()  # Para evitar duplicatas

    # Coleta paralela de fontes
    with ThreadPoolExecutor(max_workers=3) as executor:
        futures = []
        for coletor in [
            coletar_noticias_techtudo,
            coletar_noticias_ign,
            coletar_noticias_pcgamer,
            coletar_noticias_adrenaline,
            coletar_noticias_tecmundo,
            coletar_noticias_gameviciados,
            coletar_noticias_voxel
        ]:
            futures.append(executor.submit(processar_fonte, coletor, session))
        
        for future in as_completed(futures):
            noticias = future.result()
            for noticia in noticias:
                noticia_hash = gerar_hash_noticia(noticia)
                if noticia_hash not in noticias_hash:
                    noticias_hash.add(noticia_hash)
                    todas_noticias.append(noticia)

    # Tratamento para notícias faltantes
    if len(todas_noticias) <= 1:
        logging.warning("Usando notícias de fallback devido à falha na coleta")
        todas_noticias = gerar_noticias_fallback()

    # Processamento final
    noticias_processadas = processar_noticias(todas_noticias)
    
    # Salva no cache
    salvar_cache(noticias_processadas)
    
    # Salva os arquivos
    salvar_arquivos_noticias(noticias_processadas)

def gerar_noticias_fallback():
    return [
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

def processar_noticias(noticias):
    """Processa e limpa as notícias coletadas"""
    processadas = []
    
    for noticia in noticias:
        # Limpa e valida os dados
        if not noticia.get('titulo') or not noticia.get('link'):
            continue
            
        # Limita o tamanho do título
        if len(noticia['titulo']) > 150:
            noticia['titulo'] = noticia['titulo'][:147] + '...'
        
        # Garante que todos os campos necessários existem
        noticia['descricao'] = noticia.get('descricao', 'Clique para ler mais...')
        noticia['imagem'] = noticia.get('imagem') or 'images/fallback.html'
        noticia['fonte'] = noticia.get('fonte', 'GameNews')
        
        processadas.append(noticia)
    
    # Limita o número total e embaralha
    random.shuffle(processadas)
    return processadas[:30]

def salvar_arquivos_noticias(noticias):
    """Salva as notícias nos arquivos JSON e JS"""
    try:
        # Salva JSON
        with open('noticias.json', 'w', encoding='utf-8') as f:
            json.dump(noticias, f, ensure_ascii=False, indent=4)
        
        # Salva JavaScript
        with open('noticias.js', 'w', encoding='utf-8') as f:
            f.write(f"// Atualizado em: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
            f.write("const noticias = ")
            f.write(json.dumps(noticias, ensure_ascii=False, indent=4))
            f.write(";")
        
        logging.info("Arquivos noticias.json e noticias.js gerados com sucesso!")
    except Exception as e:
        logging.error(f"Erro ao salvar arquivos: {e}")
        raise

if __name__ == "__main__":
    coletar_e_salvar_noticias()