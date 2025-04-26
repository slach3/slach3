import requests
from bs4 import BeautifulSoup
import json
import time
from datetime import datetime, timedelta, timezone
import pytz  # Adicionando pytz para lidar com fusos horários
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

def get_brasilia_datetime():
    """Retorna a data e hora atual no fuso horário de Brasília"""
    now = datetime.now(pytz.timezone('America/Sao_Paulo'))
    # Usar o ano atual do sistema (2025)
    return now.strftime("%Y-%m-%dT%H:%M:%S")

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
                # Verificando a validade do cache usando o fuso horário de Brasília
                cache_time = datetime.fromisoformat(cache['timestamp'].replace('Z', '+00:00'))
                now = datetime.now(pytz.timezone('America/Sao_Paulo'))
                if cache_time + CACHE_DURATION > now.replace(tzinfo=None):
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
            'timestamp': get_brasilia_datetime(),
            'noticias': noticias
        }
        with open(CACHE_FILE, 'w', encoding='utf-8') as f:
            json.dump(cache, f, ensure_ascii=False, indent=4)
        logging.info("Cache atualizado com sucesso")
    except Exception as e:
        logging.error(f"Erro ao salvar cache: {str(e)}")

def get_user_agent():
    user_agents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/113.0',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Safari/605.1.15',
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.48',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 16_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Mobile/15E148 Safari/604.1'
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
    headers = {
        'User-Agent': get_user_agent(),
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3',
        'Referer': 'https://www.google.com/'
    }
    
    try:
        response = session.get(url, headers=headers, timeout=TIMEOUT)
        logging.info(f"Status da resposta TechTudo: {response.status_code}")
        soup = BeautifulSoup(response.text, 'html.parser')
        noticias = []
        
        # Tentativas múltiplas de seletores (TechTudo atualiza frequentemente sua estrutura)
        articles = soup.select('.feed-post') or soup.select('div.bastian-feed-item') or soup.select('article') or soup.select('.bastian-page article')
        logging.info(f"Artigos encontrados TechTudo: {len(articles)}")
        
        for article in articles[:10]:  # Limita a 10 notícias
            try:
                link_element = article.select_one('a')
                if not link_element:
                    continue
                    
                link = link_element['href']
                if not link.startswith('http'):
                    link = 'https://www.techtudo.com.br' + link
                
                # Múltiplas tentativas para encontrar o título
                titulo_element = (article.select_one('.feed-post-body-title') or 
                                 article.select_one('.bastian-feed-item-title') or 
                                 article.select_one('h2') or 
                                 article.select_one('h3'))
                if titulo_element:
                    titulo = titulo_element.get_text(strip=True)
                else:
                    continue
                
                # Múltiplas tentativas para encontrar a descrição
                descricao_elem = (article.select_one('.feed-post-body-resumo') or 
                                 article.select_one('.bastian-feed-item-description') or
                                 article.select_one('p'))
                if descricao_elem:
                    descricao = descricao_elem.get_text(strip=True)
                else:
                    descricao = "Clique para ler mais sobre esta notícia de jogos."
                
                # Tentar encontrar a imagem com múltiplas tentativas
                img_element = article.select_one('img')
                imagem = None
                if img_element:
                    for attr in ['data-src', 'src', 'data-original', 'data-lazy-src']:
                        if attr in img_element.attrs:
                            imagem = img_element[attr]
                            break
                
                noticias.append({
                    'titulo': titulo,
                    'descricao': descricao,
                    'link': link,
                    'imagem': imagem,
                    'fonte': 'TechTudo',
                    'data': datetime.now().strftime("%Y-%m-%d")
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

def processar_noticias(todas_noticias):
    """Processa as notícias coletadas, adiciona timestamp e remove duplicatas"""
    # Deduplica notícias (às vezes diferentes sites reportam a mesma notícia)
    noticias_unicas = {}
    timestamp_atual = get_brasilia_datetime()
    
    for noticia in todas_noticias:
        # Garantir que todas as notícias tenham um timestamp atual no fuso horário de Brasília
        noticia['timestamp'] = timestamp_atual
        
        hash_noticia = gerar_hash_noticia(noticia)
        if hash_noticia not in noticias_unicas:
            noticias_unicas[hash_noticia] = noticia
    
    return list(noticias_unicas.values())

def main():
    try:
        logging.info("Iniciando coleta de notícias...")
        
        # Verificar se já temos notícias em cache válidas
        noticias_cache = carregar_cache()
        if noticias_cache:
            logging.info(f"Usando {len(noticias_cache)} notícias do cache")
            
            # Atualizar o timestamp das notícias em cache para o atual
            timestamp_atual = get_brasilia_datetime()
            for noticia in noticias_cache:
                noticia['timestamp'] = timestamp_atual
                
            noticias = noticias_cache
        else:
            # Iniciar coleta de notícias de todas as fontes
            session = criar_sessao()
            
            coletores = [
                coletar_noticias_techtudo,
                coletar_noticias_ign,
                coletar_noticias_pcgamer,
                coletar_noticias_adrenaline,
                coletar_noticias_tecmundo,
                coletar_noticias_gameviciados,
                coletar_noticias_voxel
            ]
            
            todas_noticias = []
            with ThreadPoolExecutor(max_workers=len(coletores)) as executor:
                futures = {executor.submit(processar_fonte, coletor, session): coletor.__name__ for coletor in coletores}
                
                for future in as_completed(futures):
                    coletor_nome = futures[future]
                    try:
                        resultado = future.result()
                        todas_noticias.extend(resultado)
                        logging.info(f"{coletor_nome} retornou {len(resultado)} notícias")
                    except Exception as e:
                        logging.error(f"Erro ao processar resultados de {coletor_nome}: {e}")
            
            # Processar as notícias coletadas
            noticias = processar_noticias(todas_noticias)
            
            # Salvar no cache para futuras requisições
            salvar_cache(noticias)
            logging.info(f"Total de {len(noticias)} notícias únicas coletadas")
        
        # Salvar para o site
        noticias_js = f"const noticias = {json.dumps(noticias, ensure_ascii=False, indent=2)};"
        
        with open('noticias.json', 'w', encoding='utf-8') as f:
            json.dump(noticias, f, ensure_ascii=False, indent=2)
            logging.info("Arquivo noticias.json salvo com sucesso")
        
        with open('noticias.js', 'w', encoding='utf-8') as f:
            f.write(noticias_js)
            logging.info("Arquivo noticias.js salvo com sucesso")
        
        # Copiar para a pasta docs (para GitHub Pages)
        try:
            docs_dir = 'docs'
            if not os.path.exists(docs_dir):
                os.makedirs(docs_dir)
                logging.info("Diretório docs criado")
            
            with open(os.path.join(docs_dir, 'noticias.json'), 'w', encoding='utf-8') as f:
                json.dump(noticias, f, ensure_ascii=False, indent=2)
                logging.info("Arquivo docs/noticias.json salvo com sucesso")
            
            with open(os.path.join(docs_dir, 'noticias.js'), 'w', encoding='utf-8') as f:
                f.write(noticias_js)
                logging.info("Arquivo docs/noticias.js salvo com sucesso")
        except Exception as e:
            logging.error(f"Erro ao copiar arquivos para pasta docs: {e}")
            
        logging.info("Processo de coleta de notícias concluído com sucesso")
        
    except Exception as e:
        logging.error(f"Erro geral no processo de coleta: {e}")
        raise

if __name__ == "__main__":
    main()