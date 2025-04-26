@echo off
REM Script para executar o scraper de notícias
echo Iniciando atualizacao de noticias...

REM Tenta executar com Python no PATH
python scraper.py

IF %ERRORLEVEL% NEQ 0 (
    echo Python padrao nao encontrado, tentando caminhos alternativos...
    
    REM Tenta com caminhos comuns do Python
    IF EXIST "C:\Python310\python.exe" (
        echo Executando com Python 3.10...
        "C:\Python310\python.exe" scraper.py
    ) ELSE IF EXIST "C:\Python39\python.exe" (
        echo Executando com Python 3.9...
        "C:\Python39\python.exe" scraper.py
    ) ELSE IF EXIST "C:\Python38\python.exe" (
        echo Executando com Python 3.8...
        "C:\Python38\python.exe" scraper.py
    ) ELSE IF EXIST "C:\Python37\python.exe" (
        echo Executando com Python 3.7...
        "C:\Python37\python.exe" scraper.py
    ) ELSE IF EXIST "C:\Users\%USERNAME%\AppData\Local\Programs\Python\Python310\python.exe" (
        echo Executando com Python 3.10 do diretorio do usuario...
        "C:\Users\%USERNAME%\AppData\Local\Programs\Python\Python310\python.exe" scraper.py
    ) ELSE IF EXIST "C:\Users\%USERNAME%\AppData\Local\Programs\Python\Python39\python.exe" (
        echo Executando com Python 3.9 do diretorio do usuario...
        "C:\Users\%USERNAME%\AppData\Local\Programs\Python\Python39\python.exe" scraper.py
    ) ELSE (
        echo Python nao encontrado automaticamente. Por favor, instale o Python ou ajuste o PATH.
    )
)

REM Verifica se o arquivo foi atualizado
echo Verificando se os arquivos foram atualizados...
echo Arquivos na pasta docs:
dir docs\noticias.js /a-d /tc

REM Script para copiar manualmente os arquivos se necessário
IF EXIST "noticias.js" (
    echo Copiando arquivos manualmente para a pasta docs...
    copy /Y noticias.js docs\noticias.js
    copy /Y noticias.json docs\noticias.json
    echo Copia manual concluida.
)

echo Processo de atualizacao finalizado.
pause