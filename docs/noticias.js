// Atualizado em: 2025-04-26 06:42:59
const noticias = [
    {
        "titulo": "Lost Records: Bloom & Rage é como uma festa que acabou cedo demais | Review",
        "descricao": "Clique para ler a notícia completa na IGN Brasil.",
        "link": "https://br.ign.com/lost-records-bloom-and-rage-tape-2/139360/review/lost-records-bloom-rage-e-como-uma-festa-que-acabou-cedo-demais",
        "imagem": "https://sm.ign.com/t/ign_br/slotter/6/61129/61129_c4mh.800.jpg",
        "fonte": "IGN Brasil",
        "timestamp": "2025-04-26T06:42:59.395614"
    },
    {
        "titulo": "Clair Obscur: Expedition 33 – Um novo clássico forjado na beleza do fim | Review",
        "descricao": "Clique para ler a notícia completa na IGN Brasil.",
        "link": "https://br.ign.com/clair-obscur-expedition-33/139278/review/clair-obscur-expedition-33-um-novo-classico-forjado-na-beleza-do-fim-review",
        "imagem": "https://sm.ign.com/t/ign_br/slotter/6/61021/61021_3kyp.800.jpg",
        "fonte": "IGN Brasil",
        "timestamp": "2025-04-26T06:42:59.395614"
    },
    {
        "titulo": "Fatal Fury: City of the Wolves é o mehor jogo da SNK desde The King of Fighters XIII | Review",
        "descricao": "Clique para ler a notícia completa na IGN Brasil.",
        "link": "https://br.ign.com/fatal-fury-city-of-the-wolves/139123/review/apoiado-em-otima-gameplay-fatal-fury-city-of-the-wolves-e-o-mehor-jogo-da-snk-desde-the-king-of-figh",
        "imagem": "https://sm.ign.com/t/ign_br/slotter/6/61131/61131_qfvs.800.jpg",
        "fonte": "IGN Brasil",
        "timestamp": "2025-04-26T06:42:59.395614"
    },
    {
        "titulo": "Nintendo revela preço e data de lançamento do Switch 2 no Brasil",
        "descricao": "Clique para ler a notícia completa na IGN Brasil.",
        "link": "https://br.ign.com/nintendo-switch-2/139291/news/nintendo-revela-preco-e-data-de-lancamento-do-switch-2-no-brasil",
        "imagem": "https://sm.ign.com/t/ign_br/slotter/6/61019/61019_fmx4.800.jpg",
        "fonte": "IGN Brasil",
        "timestamp": "2025-04-26T06:42:59.395614"
    },
    {
        "titulo": "\"Sempre esteve na nossa lista\", diretor e produtor de remaster de Onimusha 2 revelam que trazer clássico da Capcom para plataformas atuais era sonh...",
        "descricao": "Clique para ler a notícia completa na IGN Brasil.",
        "link": "https://br.ign.com/onimusha-2-samurais-destiny/139451/news/sempre-esteve-na-nossa-lista-interna-de-projetos-diretor-e-produtor-de-remaster-de-onimusha-2-revela",
        "imagem": "https://sm.ign.com/t/ign_br/screenshot/default/onimusha-2_7gma.320.jpg",
        "fonte": "IGN Brasil",
        "timestamp": "2025-04-26T06:42:59.395614"
    },
    {
        "titulo": "Clair Obscur: Expedition 33 supera Blue Prince e se torna jogo mais bem avaliado de 2025 no Metacritic",
        "descricao": "Clique para ler a notícia completa na IGN Brasil.",
        "link": "https://br.ign.com/clair-obscur-expedition-33/139419/news/clair-obscur-expedition-33-supera-blue-prince-e-se-torna-jogo-mais-bem-avaliado-de-2025-no-metacriti",
        "imagem": "https://sm.ign.com/t/ign_br/screenshot/default/clair-obscur_kymh.320.jpg",
        "fonte": "IGN Brasil",
        "timestamp": "2025-04-26T06:42:59.395614"
    },
    {
        "titulo": "Dune: Awakening terá beta aberto extenso no início de março",
        "descricao": "Clique para ler a notícia completa na IGN Brasil.",
        "link": "https://br.ign.com/dune-awakening/139415/news/dune-awakening-tera-beta-aberto-entre-9-e-12-de-maio",
        "imagem": "https://sm.ign.com/t/ign_br/screenshot/default/da-desertvista_jqhf.320.jpg",
        "fonte": "IGN Brasil",
        "timestamp": "2025-04-26T06:42:59.395614"
    },
    {
        "titulo": "Hideo Kojima escolheu Margaret Qualley para papel em Death Stranding após assistir a comercial bizarro estrelado pela atriz",
        "descricao": "Clique para ler a notícia completa na IGN Brasil.",
        "link": "https://br.ign.com/death-stranding-2/139402/news/hideo-kojima-escolheu-margaret-qualley-para-papel-em-death-stranding-apos-assistir-a-comercial-bizar",
        "imagem": "https://sm.ign.com/t/ign_br/news/h/hideo-koji/hideo-kojima-cast-margaret-qualley-in-death-stranding-after_9x5v.320.jpg",
        "fonte": "IGN Brasil",
        "timestamp": "2025-04-26T06:42:59.395614"
    },
    {
        "titulo": "Vai uma dose de nostalgia? Console Nintendo Wii em oferta no Mercado Livre",
        "descricao": "Clique para ler a notícia completa na IGN Brasil.",
        "link": "https://br.ign.com/descontos/139465/news/vai-uma-dose-de-nostalgia-console-nintendo-wii-em-oferta-no-mercado-livre",
        "imagem": "https://sm.ign.com/t/ign_br/screenshot/default/wii-header_n1jp.280.jpg",
        "fonte": "IGN Brasil",
        "timestamp": "2025-04-26T06:42:59.395614"
    },
    {
        "titulo": "Smart TV LG 4K 55\" Nanocell: leve entretenimento imersivo para sua casa!",
        "descricao": "Clique para ler a notícia completa na IGN Brasil.",
        "link": "https://br.ign.com/descontos/139464/news/smart-tv-lg-4k-55-nanocell-leve-entretenimento-imersivo-para-sua-casa",
        "imagem": "https://sm.ign.com/t/ign_br/screenshot/default/unnamed-3_bvrq.280.jpg",
        "fonte": "IGN Brasil",
        "timestamp": "2025-04-26T06:42:59.395614"
    },
    {
        "titulo": "OpenAI lança Deep Research mais leve no ChatGPT",
        "descricao": "Clique para ler mais sobre esta notícia de jogos no TecMundo.",
        "link": "https://www.tecmundo.com.br/software/404163-openai-lanca-deep-research-mais-leve-no-chatgpt.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/01/01090541316009.jpg?ims=220x127",
        "fonte": "TecMundo",
        "timestamp": "2025-04-26T06:42:59.395614"
    },
    {
        "titulo": "YouTube Music vai compartilhar letras e trará estabilizador de volume",
        "descricao": "Clique para ler mais sobre esta notícia de jogos no TecMundo.",
        "link": "https://www.tecmundo.com.br/software/404129-youtube-music-vai-compartilhar-letras-e-trara-estabilizador-de-volume.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/23/23181642789011.jpg?ims=220x127",
        "fonte": "TecMundo",
        "timestamp": "2025-04-26T06:42:59.395614"
    },
    {
        "titulo": "WPS Office: Como essa alternativa gratuita está conquistando usuários após o aumento de preço do Microsoft 365",
        "descricao": "Clique para ler mais sobre esta notícia de jogos no TecMundo.",
        "link": "https://www.tecmundo.com.br/software/404131-wps-office-como-essa-alternativa-gratuita-esta-conquistando-usuarios-apos-o-aumento-de-preco-do-microsoft-365.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/23/23195959876040.jpg?ims=220x127",
        "fonte": "TecMundo",
        "timestamp": "2025-04-26T06:42:59.395614"
    },
    {
        "titulo": "Quem será o próximo Papa? ChatGPT aponta cardeal italiano como favorito",
        "descricao": "Clique para ler mais sobre esta notícia de jogos no TecMundo.",
        "link": "https://www.tecmundo.com.br/software/404114-quem-sera-o-proximo-papa-chatgpt-aponta-cardeal-italiano-como-favorito.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/23/23104835408144.jpg?ims=220x127",
        "fonte": "TecMundo",
        "timestamp": "2025-04-26T06:42:59.395614"
    },
    {
        "titulo": "Novo vírus Android clona cartão de crédito remotamente via celular",
        "descricao": "Clique para ler mais sobre esta notícia de jogos no TecMundo.",
        "link": "https://www.tecmundo.com.br/seguranca/404174-novo-virus-android-clona-cartao-de-credito-remotamente-via-celular.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/25/25134717236228.jpg?ims=220x127",
        "fonte": "TecMundo",
        "timestamp": "2025-04-26T06:42:59.395614"
    },
    {
        "titulo": "Japão testa navio equipado com arma de canhão eletromagnético; conheça o JS Asuka",
        "descricao": "Clique para ler mais sobre esta notícia de jogos no TecMundo.",
        "link": "https://www.tecmundo.com.br/seguranca/404162-japao-testa-navio-equipado-com-arma-de-canhao-eletromagnetico-conheca-o-js-asuka.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/25/25095503743003.jpg?ims=220x127",
        "fonte": "TecMundo",
        "timestamp": "2025-04-26T06:42:59.395614"
    },
    {
        "titulo": "Guerra dos drones: Reino Unido proíbe exportação de controles de videogame para a Rússia",
        "descricao": "Clique para ler mais sobre esta notícia de jogos no TecMundo.",
        "link": "https://www.tecmundo.com.br/seguranca/404156-guerra-dos-drones-reino-unido-proibe-exportacao-de-controles-de-videogame-para-a-russia.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/24/24181642361038.jpg?ims=220x127",
        "fonte": "TecMundo",
        "timestamp": "2025-04-26T06:42:59.395614"
    },
    {
        "titulo": "Hackers podiam colocar anúncios falsos no Instagram de brasileiros",
        "descricao": "Clique para ler mais sobre esta notícia de jogos no TecMundo.",
        "link": "https://www.tecmundo.com.br/seguranca/404121-hackers-podiam-colocar-anuncios-falsos-no-instagram-de-brasileiros.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/23/23141806941049.jpg?ims=220x127",
        "fonte": "TecMundo",
        "timestamp": "2025-04-26T06:42:59.395614"
    },
    {
        "titulo": "Portugal agora é 'Guiana Brasileira'? Entenda a 'colonização reversa' que viralizou no TikTok",
        "descricao": "Clique para ler mais sobre esta notícia de jogos no TecMundo.",
        "link": "https://www.tecmundo.com.br/internet/404180-portugal-agora-e-guiana-brasileira-entenda-a-colonizacao-reversa-que-viralizou-no-tiktok.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/25/25145911960353.jpg?ims=220x127",
        "fonte": "TecMundo",
        "timestamp": "2025-04-26T06:42:59.395614"
    },
    {
        "titulo": "WhatsApp ganha modo 'Privacidade Avançada' para conversas; saiba como funciona",
        "descricao": "Clique para ler mais sobre esta notícia de jogos no TecMundo.",
        "link": "https://www.tecmundo.com.br/internet/404172-whatsapp-ganha-modo-privacidade-avancada-para-conversas-saiba-como-funciona.htm",
        "imagem": "https://tm.ibxk.com.br/2025/03/28/28132609560200.jpg?ims=220x127",
        "fonte": "TecMundo",
        "timestamp": "2025-04-26T06:42:59.395614"
    },
    {
        "titulo": "Elder Scrolls IV Oblivion Remastered é lançado e chega direto ao Game Pass!",
        "descricao": "Notícia sobre games do portal Voxel.",
        "link": "https://www.tecmundo.com.br/voxel/501214-elder-scrolls-iv-oblivion-remastered-e-lancado-e-chega-direto-ao-game-pass-veja-preco-e-gameplay.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/22/22172825532004.jpg?ims=328x189",
        "fonte": "Voxel",
        "timestamp": "2025-04-26T06:42:59.395614"
    },
    {
        "titulo": "The Elder Scrolls IV Oblivion Remastered pede 32 GB de RAM no PC!",
        "descricao": "Notícia sobre games do portal Voxel.",
        "link": "https://www.tecmundo.com.br/voxel/501218-the-elder-scrolls-iv-oblivion-remastered-pede-32-gb-de-ram-no-pc-veja-requisitos-da-steam.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/22/22172738568003.jpg?ims=328x189",
        "fonte": "Voxel",
        "timestamp": "2025-04-26T06:42:59.395614"
    },
    {
        "titulo": "Maior página de pirataria de jogos do Brasil é derrubada, mas criadores querem voltar",
        "descricao": "Notícia sobre games do portal Voxel.",
        "link": "https://www.tecmundo.com.br/voxel/501199-maior-pagina-de-pirataria-de-jogos-do-brasil-e-derrubada-mas-criadores-querem-voltar-exclusivo.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/17/17184536585806.jpg?ims=328x189",
        "fonte": "Voxel",
        "timestamp": "2025-04-26T06:42:59.395614"
    },
    {
        "titulo": "Steam recebe 5 jogos grátis nesta semana! Veja lista e resgate",
        "descricao": "Notícia sobre games do portal Voxel.",
        "link": "https://www.tecmundo.com.br/voxel/501183-steam-recebe-5-jogos-gratis-nesta-semana-veja-lista-e-resgate.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/17/17134630301366.jpg?ims=328x189",
        "fonte": "Voxel",
        "timestamp": "2025-04-26T06:42:59.395614"
    },
    {
        "titulo": "Mario Kart World: Veja gameplay, personagens confirmados e preço do game",
        "descricao": "Notícia sobre games do portal Voxel.",
        "link": "https://www.tecmundo.com.br/voxel/501191-mario-kart-world-veja-gameplay-personagens-confirmados-e-preco-do-game.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/17/17112839690088.jpg?ims=328x189",
        "fonte": "Voxel",
        "timestamp": "2025-04-26T06:42:59.395614"
    },
    {
        "titulo": "Homem de 58 anos é condenado a dois anos de prisão por piratear Nintendo Switch! Entenda o caso",
        "descricao": "Notícia sobre games do portal Voxel.",
        "link": "https://www.tecmundo.com.br/voxel/501178-homem-de-58-anos-e-condenado-a-dois-anos-de-prisao-por-piratear-nintendo-switch-entenda-o-caso.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/16/16111056857221.jpg?ims=328x189",
        "fonte": "Voxel",
        "timestamp": "2025-04-26T06:42:59.395614"
    },
    {
        "titulo": "Nintendo Switch tem ofertas com até 90% OFF na eShop",
        "descricao": "Notícia sobre games do portal Voxel.",
        "link": "https://www.tecmundo.com.br/voxel/501253-nintendo-switch-tem-ofertas-com-ate-90-off-na-eshop.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/25/25174636974018.jpg?ims=96x88",
        "fonte": "Voxel",
        "timestamp": "2025-04-26T06:42:59.395614"
    },
    {
        "titulo": "Epic Games libera dois jogos grátis no Android por tempo limitado! Resgate agora",
        "descricao": "Notícia sobre games do portal Voxel.",
        "link": "https://www.tecmundo.com.br/voxel/501245-epic-games-libera-dois-jogos-gratis-no-android-por-tempo-limitado-resgate-agora.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/24/24192438758015.jpg?ims=96x88",
        "fonte": "Voxel",
        "timestamp": "2025-04-26T06:42:59.395614"
    },
    {
        "titulo": "Nuuvem Select de Easter Egg Game Festival traz promoção de 2 jogos por um preço especial",
        "descricao": "Notícia sobre games do portal Voxel.",
        "link": "https://www.tecmundo.com.br/voxel/501249-nuuvem-select-de-easter-egg-game-festival-traz-promocao-de-2-jogos-por-um-preco-especial.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/25/25121939814119.jpg?ims=96x88",
        "fonte": "Voxel",
        "timestamp": "2025-04-26T06:42:59.395614"
    },
    {
        "titulo": "Switch 2 mais caro que PS5 no Brasil, Oblivion Remastered no Game Pass e mais! Veja as principais notícias de games da semana",
        "descricao": "Notícia sobre games do portal Voxel.",
        "link": "https://www.tecmundo.com.br/voxel/501246-switch-2-mais-caro-que-ps5-no-brasil-oblivion-remastered-no-game-pass-e-mais-veja-as-principais-noticias-de-games-da-semana.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/24/24203133819005.jpg?ims=96x88",
        "fonte": "Voxel",
        "timestamp": "2025-04-26T06:42:59.395614"
    }
];