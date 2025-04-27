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

REM ===== NOVA SEÇÃO: Automatização Git =====
echo %date% %time% - Iniciando processo de sincronização com Git... >> scraper.log

REM Verificar se Git está instalado
git --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo %date% %time% - ERRO: Git não está instalado ou não está no PATH. Sincronização cancelada. >> scraper.log
    echo AVISO: Git não encontrado. As alterações não foram enviadas automaticamente para o GitHub.
    goto FIM_GIT
)

REM Adicionar arquivos modificados ao Git
echo %date% %time% - Adicionando arquivos modificados ao Git... >> scraper.log
git add noticias.js noticias.json docs/noticias.js docs/noticias.json

REM Verificar se há alterações para commit
git diff --cached --quiet
if %ERRORLEVEL% EQU 0 (
    echo %date% %time% - Nenhuma alteração detectada para commit. >> scraper.log
    echo Nenhuma alteração detectada para enviar ao GitHub.
    goto FIM_GIT
)

REM Criar mensagem de commit com data e hora atual
set DATA_HORA=%date:~-4,4%-%date:~-7,2%-%date:~-10,2% %time:~0,2%:%time:~3,2%
set DATA_HORA=%DATA_HORA: =0%
echo %date% %time% - Criando commit com as alterações... >> scraper.log
git commit -m "Atualização automática de notícias: %DATA_HORA%"

REM Fazer push das alterações para o GitHub
echo %date% %time% - Enviando alterações para o GitHub... >> scraper.log
git push
if %ERRORLEVEL% EQU 0 (
    echo %date% %time% - Alterações enviadas com sucesso para o GitHub! >> scraper.log
    echo Alterações enviadas com sucesso para o GitHub!
) else (
    echo %date% %time% - ERRO: Falha ao enviar alterações para o GitHub. >> scraper.log
    echo ERRO: Falha ao enviar alterações para o GitHub. Verifique sua conexão ou credenciais.
)

:FIM_GIT
echo %date% %time% - Processo de sincronização com Git finalizado. >> scraper.log

echo Atualizacao concluida! Verifique o arquivo scraper.log para detalhes.
pause