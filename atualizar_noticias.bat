@echo off
REM Script para executar o scraper de notícias
echo %date% %time% - Iniciando atualizacao de noticias... >> scraper.log

REM Criar backup antes de atualizar
set BACKUP_FOLDER=backup_%date:~-4,4%-%date:~-7,2%-%date:~-10,2%_%time:~0,2%-%time:~3,2%-%time:~6,2%
set BACKUP_FOLDER=%BACKUP_FOLDER: =0%
if not exist "%BACKUP_FOLDER%.zip" (
    echo Criando backup... >> scraper.log
    powershell -Command "Compress-Archive -Path 'noticias.js', 'noticias.json', 'docs\noticias.js', 'docs\noticias.json' -DestinationPath '%BACKUP_FOLDER%.zip' -Force"
)

REM Tenta executar com Python no PATH
python scraper.py
set PYTHON_SUCCESS=%ERRORLEVEL%

IF %PYTHON_SUCCESS% NEQ 0 (
    echo %date% %time% - Python padrao nao encontrado, tentando caminhos alternativos... >> scraper.log
    
    REM Tenta com caminhos comuns do Python
    IF EXIST "C:\Python310\python.exe" (
        echo %date% %time% - Executando com Python 3.10... >> scraper.log
        "C:\Python310\python.exe" scraper.py
        set PYTHON_SUCCESS=%ERRORLEVEL%
    ) ELSE IF EXIST "C:\Python39\python.exe" (
        echo %date% %time% - Executando com Python 3.9... >> scraper.log
        "C:\Python39\python.exe" scraper.py
        set PYTHON_SUCCESS=%ERRORLEVEL%
    ) ELSE IF EXIST "C:\Python38\python.exe" (
        echo %date% %time% - Executando com Python 3.8... >> scraper.log
        "C:\Python38\python.exe" scraper.py
        set PYTHON_SUCCESS=%ERRORLEVEL%
    ) ELSE IF EXIST "C:\Python37\python.exe" (
        echo %date% %time% - Executando com Python 3.7... >> scraper.log
        "C:\Python37\python.exe" scraper.py
        set PYTHON_SUCCESS=%ERRORLEVEL%
    ) ELSE IF EXIST "C:\Users\%USERNAME%\AppData\Local\Programs\Python\Python310\python.exe" (
        echo %date% %time% - Executando com Python 3.10 do diretorio do usuario... >> scraper.log
        "C:\Users\%USERNAME%\AppData\Local\Programs\Python\Python310\python.exe" scraper.py
        set PYTHON_SUCCESS=%ERRORLEVEL%
    ) ELSE IF EXIST "C:\Users\%USERNAME%\AppData\Local\Programs\Python\Python39\python.exe" (
        echo %date% %time% - Executando com Python 3.9 do diretorio do usuario... >> scraper.log
        "C:\Users\%USERNAME%\AppData\Local\Programs\Python\Python39\python.exe" scraper.py
        set PYTHON_SUCCESS=%ERRORLEVEL%
    ) ELSE (
        echo %date% %time% - Python nao encontrado automaticamente. Por favor, instale o Python ou ajuste o PATH. >> scraper.log
        set PYTHON_SUCCESS=1
    )
)

REM Verifica se o Python foi executado com sucesso
IF %PYTHON_SUCCESS% EQU 0 (
    echo %date% %time% - Scraper executado com sucesso >> scraper.log
) ELSE (
    echo %date% %time% - ERRO: Falha ao executar o scraper >> scraper.log
)

REM Sempre copiar os arquivos para a pasta docs se existirem
echo %date% %time% - Verificando arquivos para copiar para a pasta docs... >> scraper.log

REM Verificar se o diretório docs existe
if not exist "docs" mkdir docs

REM Sempre copiar os arquivos atualizados para a pasta docs
if exist "noticias.js" (
    echo %date% %time% - Copiando noticias.js para a pasta docs... >> scraper.log
    copy /Y noticias.js docs\noticias.js
    echo %date% %time% - Data do arquivo original: >> scraper.log
    dir "noticias.js" /tc >> scraper.log
    echo %date% %time% - Data do arquivo copiado: >> scraper.log
    dir "docs\noticias.js" /tc >> scraper.log
)

if exist "noticias.json" (
    echo %date% %time% - Copiando noticias.json para a pasta docs... >> scraper.log
    copy /Y noticias.json docs\noticias.json
    echo %date% %time% - Data do arquivo original: >> scraper.log
    dir "noticias.json" /tc >> scraper.log
    echo %date% %time% - Data do arquivo copiado: >> scraper.log
    dir "docs\noticias.json" /tc >> scraper.log
)

echo %date% %time% - Processo de atualizacao finalizado. >> scraper.log
echo Atualizacao concluida! Verifique o arquivo scraper.log para detalhes.
pause