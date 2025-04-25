// Atualizado em: 2025-04-25 23:52:08
const noticias = [
    {
        "titulo": "Quem será o próximo Papa? ChatGPT aponta cardeal italiano como favorito",
        "descricao": "Clique para ler mais sobre esta notícia de jogos no TecMundo.",
        "link": "https://www.tecmundo.com.br/software/404114-quem-sera-o-proximo-papa-chatgpt-aponta-cardeal-italiano-como-favorito.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/23/23104835408144.jpg?ims=220x127",
        "fonte": "TecMundo"
    },
    {
        "titulo": "Próximo do anúncio do acesso antecipado, Subnautica 2 recebe seu primeiro vídeo de bastidores",
        "descricao": "Clique para ler a notícia completa na IGN Brasil.",
        "link": "https://br.ign.com/subnautica-2/139452/news/proximo-do-anuncio-do-acesso-antecipado-subnautica-2-recebe-seu-primeiro-video-de-bastidores",
        "imagem": "https://sm.ign.com/t/ign_br/screenshot/default/fotojet_b782.280.jpg",
        "fonte": "IGN Brasil"
    },
    {
        "titulo": "A Windows 11 update revealed a 2-decade old bug in GTA: San Andreas that yeets CJ at '1.087 quadrillion light years' into the stratosphere",
        "descricao": "NewsAw shee-it, here we go again…",
        "link": "https://www.pcgamer.com/games/grand-theft-auto/a-windows-11-update-revealed-a-2-decade-old-bug-in-gta-san-andreas-that-yeets-cj-1-087-quadrillion-light-years-into-the-stratosphere/",
        "imagem": "https://cdn.mos.cms.futurecdn.net/kAueyJKk2En6JAadafRViH.jpg",
        "fonte": "PC Gamer"
    },
    {
        "titulo": "Switch 2 mais caro que PS5 no Brasil, Oblivion Remastered no Game Pass e mais! Veja as principais notícias de games da semana",
        "descricao": "Notícia sobre games do portal Voxel.",
        "link": "https://www.tecmundo.com.br/voxel/501246-switch-2-mais-caro-que-ps5-no-brasil-oblivion-remastered-no-game-pass-e-mais-veja-as-principais-noticias-de-games-da-semana.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/24/24203133819005.jpg?ims=96x88",
        "fonte": "Voxel"
    },
    {
        "titulo": "Lost Records: Bloom & Rage é como uma festa que acabou cedo demais | Review",
        "descricao": "Clique para ler a notícia completa na IGN Brasil.",
        "link": "https://br.ign.com/lost-records-bloom-and-rage-tape-2/139360/review/lost-records-bloom-rage-e-como-uma-festa-que-acabou-cedo-demais",
        "imagem": "https://sm.ign.com/t/ign_br/slotter/6/61129/61129_c4mh.800.jpg",
        "fonte": "IGN Brasil"
    },
    {
        "titulo": "Clair Obscur: Expedition 33 – Um novo clássico forjado na beleza do fim | Review",
        "descricao": "Clique para ler a notícia completa na IGN Brasil.",
        "link": "https://br.ign.com/clair-obscur-expedition-33/139278/review/clair-obscur-expedition-33-um-novo-classico-forjado-na-beleza-do-fim-review",
        "imagem": "https://sm.ign.com/t/ign_br/slotter/6/61021/61021_3kyp.800.jpg",
        "fonte": "IGN Brasil"
    },
    {
        "titulo": "OpenAI lança Deep Research mais leve no ChatGPT",
        "descricao": "Clique para ler mais sobre esta notícia de jogos no TecMundo.",
        "link": "https://www.tecmundo.com.br/software/404163-openai-lanca-deep-research-mais-leve-no-chatgpt.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/01/01090541316009.jpg?ims=220x127",
        "fonte": "TecMundo"
    },
    {
        "titulo": "WhatsApp ganha modo 'Privacidade Avançada' para conversas; saiba como funciona",
        "descricao": "Clique para ler mais sobre esta notícia de jogos no TecMundo.",
        "link": "https://www.tecmundo.com.br/internet/404172-whatsapp-ganha-modo-privacidade-avancada-para-conversas-saiba-como-funciona.htm",
        "imagem": "https://tm.ibxk.com.br/2025/03/28/28132609560200.jpg?ims=220x127",
        "fonte": "TecMundo"
    },
    {
        "titulo": "Maior página de pirataria de jogos do Brasil é derrubada, mas criadores querem voltar",
        "descricao": "Notícia sobre games do portal Voxel.",
        "link": "https://www.tecmundo.com.br/voxel/501199-maior-pagina-de-pirataria-de-jogos-do-brasil-e-derrubada-mas-criadores-querem-voltar-exclusivo.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/17/17184536585806.jpg?ims=328x189",
        "fonte": "Voxel"
    },
    {
        "titulo": "EA's Skate reboot is always online, and you know what that means",
        "descricao": "newsThe promised \"living, breathing massively multiplayer skateboarding sandbox\" sounds great, but what happens when the servers go offline?",
        "link": "https://www.pcgamer.com/games/sports/eas-skate-reboot-is-always-online-and-you-know-what-that-means/",
        "imagem": "https://cdn.mos.cms.futurecdn.net/jsxQXYJpvNWs3rgUHKLMSn.jpg",
        "fonte": "PC Gamer"
    },
    {
        "titulo": "Epic Games libera dois jogos grátis no Android por tempo limitado! Resgate agora",
        "descricao": "Notícia sobre games do portal Voxel.",
        "link": "https://www.tecmundo.com.br/voxel/501245-epic-games-libera-dois-jogos-gratis-no-android-por-tempo-limitado-resgate-agora.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/24/24192438758015.jpg?ims=96x88",
        "fonte": "Voxel"
    },
    {
        "titulo": "Elder Scrolls IV Oblivion Remastered é lançado e chega direto ao Game Pass!",
        "descricao": "Notícia sobre games do portal Voxel.",
        "link": "https://www.tecmundo.com.br/voxel/501214-elder-scrolls-iv-oblivion-remastered-e-lancado-e-chega-direto-ao-game-pass-veja-preco-e-gameplay.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/22/22172825532004.jpg?ims=328x189",
        "fonte": "Voxel"
    },
    {
        "titulo": "Mario Kart World: Veja gameplay, personagens confirmados e preço do game",
        "descricao": "Notícia sobre games do portal Voxel.",
        "link": "https://www.tecmundo.com.br/voxel/501191-mario-kart-world-veja-gameplay-personagens-confirmados-e-preco-do-game.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/17/17112839690088.jpg?ims=328x189",
        "fonte": "Voxel"
    },
    {
        "titulo": "Hideo Kojima escolheu Margaret Qualley para papel em Death Stranding após assistir a comercial bizarro estrelado pela atriz",
        "descricao": "Clique para ler a notícia completa na IGN Brasil.",
        "link": "https://br.ign.com/death-stranding-2/139402/news/hideo-kojima-escolheu-margaret-qualley-para-papel-em-death-stranding-apos-assistir-a-comercial-bizar",
        "imagem": "https://sm.ign.com/t/ign_br/news/h/hideo-koji/hideo-kojima-cast-margaret-qualley-in-death-stranding-after_9x5v.320.jpg",
        "fonte": "IGN Brasil"
    },
    {
        "titulo": "Modders somehow cranked out a VR mod for Oblivion Remastered mere hours after its surprise launch",
        "descricao": "newsIt's like you're really there, stabbing the rats.",
        "link": "https://www.pcgamer.com/games/the-elder-scrolls/modders-somehow-cranked-out-a-vr-mod-for-oblivion-remastered-mere-hours-after-its-surprise-launch/",
        "imagem": "https://cdn.mos.cms.futurecdn.net/TX2HhYnf5Um9mSMqHVvC9C.jpg",
        "fonte": "PC Gamer"
    },
    {
        "titulo": "\"Como Black Mirror, só que muito melhor\": até o criador de famosa série da Netflix está com inveja deste sucesso de ficção científica",
        "descricao": "Clique para ler a notícia completa na IGN Brasil.",
        "link": "https://br.ign.com/black-mirror/139458/feature/como-black-mirror-so-que-muito-melhor-ate-o-criador-de-famosa-serie-da-netflix-esta-com-inveja-deste",
        "imagem": "https://sm.ign.com/t/ign_br/photo/default/netflix-polygon-charlie-434-v1-1742922080093_xf1t.280.jpg",
        "fonte": "IGN Brasil"
    },
    {
        "titulo": "Nexus Mods decides to allow an Oblivion Remastered mod that changes 'body type' options to male/female, declares it's not 'a battleground for broad...",
        "descricao": "newsThe mod was deleted multiple times before Nexus Mods threw in the towel.",
        "link": "https://www.pcgamer.com/games/rpg/nexus-mods-decides-to-allow-an-oblivion-remastered-mod-that-changes-body-type-options-to-male-female-declares-its-not-a-battleground-for-broader-cultural-or-political-debates/",
        "imagem": "https://cdn.mos.cms.futurecdn.net/tisfbWABPY98fexDSQ3oyS.jpg",
        "fonte": "PC Gamer"
    },
    {
        "titulo": "The new shooter from the former 4A Ukraine studio was supposed to launch today, but instead it got a last-second delay and nobody knows for how long",
        "descricao": "newsA closed beta test earlier this month was also delayed, and apparently did not go very well.",
        "link": "https://www.pcgamer.com/games/fps/the-new-shooter-from-the-former-4a-ukraine-studio-was-supposed-to-launch-today-but-instead-it-got-a-last-second-delay-and-nobody-knows-for-how-long/",
        "imagem": "https://cdn.mos.cms.futurecdn.net/ghiEutr5dRygPTXzfy9v76.jpg",
        "fonte": "PC Gamer"
    },
    {
        "titulo": "Hackers podiam colocar anúncios falsos no Instagram de brasileiros",
        "descricao": "Clique para ler mais sobre esta notícia de jogos no TecMundo.",
        "link": "https://www.tecmundo.com.br/seguranca/404121-hackers-podiam-colocar-anuncios-falsos-no-instagram-de-brasileiros.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/23/23141806941049.jpg?ims=220x127",
        "fonte": "TecMundo"
    },
    {
        "titulo": "YouTube Music vai compartilhar letras e trará estabilizador de volume",
        "descricao": "Clique para ler mais sobre esta notícia de jogos no TecMundo.",
        "link": "https://www.tecmundo.com.br/software/404129-youtube-music-vai-compartilhar-letras-e-trara-estabilizador-de-volume.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/23/23181642789011.jpg?ims=220x127",
        "fonte": "TecMundo"
    },
    {
        "titulo": "Nuuvem Select de Easter Egg Game Festival traz promoção de 2 jogos por um preço especial",
        "descricao": "Notícia sobre games do portal Voxel.",
        "link": "https://www.tecmundo.com.br/voxel/501249-nuuvem-select-de-easter-egg-game-festival-traz-promocao-de-2-jogos-por-um-preco-especial.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/25/25121939814119.jpg?ims=96x88",
        "fonte": "Voxel"
    },
    {
        "titulo": "Em comemorações do Alien Day de 2025, clássico game de terror ficará grátis para jogar no Xbox",
        "descricao": "Clique para ler a notícia completa na IGN Brasil.",
        "link": "https://br.ign.com/alien-isolation/139364/news/em-comemoracoes-do-alien-day-de-2025-classico-game-de-terror-ficara-gratis-para-jogar-no-xbox",
        "imagem": "https://sm.ign.com/t/ign_br/screenshot/default/blob_y8kd.320.jpg",
        "fonte": "IGN Brasil"
    },
    {
        "titulo": "Nintendo revela preço e data de lançamento do Switch 2 no Brasil",
        "descricao": "Clique para ler a notícia completa na IGN Brasil.",
        "link": "https://br.ign.com/nintendo-switch-2/139291/news/nintendo-revela-preco-e-data-de-lancamento-do-switch-2-no-brasil",
        "imagem": "https://sm.ign.com/t/ign_br/slotter/6/61019/61019_fmx4.800.jpg",
        "fonte": "IGN Brasil"
    },
    {
        "titulo": "Fatal Fury: City of the Wolves é o mehor jogo da SNK desde The King of Fighters XIII | Review",
        "descricao": "Clique para ler a notícia completa na IGN Brasil.",
        "link": "https://br.ign.com/fatal-fury-city-of-the-wolves/139123/review/apoiado-em-otima-gameplay-fatal-fury-city-of-the-wolves-e-o-mehor-jogo-da-snk-desde-the-king-of-figh",
        "imagem": "https://sm.ign.com/t/ign_br/slotter/6/61131/61131_qfvs.800.jpg",
        "fonte": "IGN Brasil"
    },
    {
        "titulo": "The Elder Scrolls IV Oblivion Remastered pede 32 GB de RAM no PC!",
        "descricao": "Notícia sobre games do portal Voxel.",
        "link": "https://www.tecmundo.com.br/voxel/501218-the-elder-scrolls-iv-oblivion-remastered-pede-32-gb-de-ram-no-pc-veja-requisitos-da-steam.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/22/22172738568003.jpg?ims=328x189",
        "fonte": "Voxel"
    },
    {
        "titulo": "We can finally play 2006's flip phone-exclusive Monster Hunter port thanks to the tireless work of game preservationists and fan translators",
        "descricao": "NewsWhat a beautiful world we'd lost.",
        "link": "https://www.pcgamer.com/games/action/we-can-finally-play-2006s-flip-phone-exclusive-monster-hunter-port-thanks-to-the-tireless-work-of-game-preservationists-and-fan-translators/",
        "imagem": "https://cdn.mos.cms.futurecdn.net/Dq9FAtmgjp2wwfUhDQaiBG.jpg",
        "fonte": "PC Gamer"
    },
    {
        "titulo": "Powercolor Radeon RX 9070 GRE pictured which means the new AMD GPU is probably arriving sooner than we expected but it may be restricted to China",
        "descricao": "newsAs ever, its appeal will be all about pricing.",
        "link": "https://www.pcgamer.com/hardware/graphics-cards/powercolor-radeon-rx-9070-gre-pictured-which-means-the-new-amd-gpu-is-probably-arriving-sooner-than-we-expected-but-it-may-be-restricted-to-china/",
        "imagem": "https://cdn.mos.cms.futurecdn.net/jVctBW3Qbke8dYpgX6tktJ.jpg",
        "fonte": "PC Gamer"
    },
    {
        "titulo": "Clair Obscur: Expedition 33 supera Blue Prince e se torna jogo mais bem avaliado de 2025 no Metacritic",
        "descricao": "Clique para ler a notícia completa na IGN Brasil.",
        "link": "https://br.ign.com/clair-obscur-expedition-33/139419/news/clair-obscur-expedition-33-supera-blue-prince-e-se-torna-jogo-mais-bem-avaliado-de-2025-no-metacriti",
        "imagem": "https://sm.ign.com/t/ign_br/screenshot/default/clair-obscur_kymh.320.jpg",
        "fonte": "IGN Brasil"
    },
    {
        "titulo": "Portugal agora é 'Guiana Brasileira'? Entenda a 'colonização reversa' que viralizou no TikTok",
        "descricao": "Clique para ler mais sobre esta notícia de jogos no TecMundo.",
        "link": "https://www.tecmundo.com.br/internet/404180-portugal-agora-e-guiana-brasileira-entenda-a-colonizacao-reversa-que-viralizou-no-tiktok.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/25/25145911960353.jpg?ims=220x127",
        "fonte": "TecMundo"
    },
    {
        "titulo": "Japão testa navio equipado com arma de canhão eletromagnético; conheça o JS Asuka",
        "descricao": "Clique para ler mais sobre esta notícia de jogos no TecMundo.",
        "link": "https://www.tecmundo.com.br/seguranca/404162-japao-testa-navio-equipado-com-arma-de-canhao-eletromagnetico-conheca-o-js-asuka.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/25/25095503743003.jpg?ims=220x127",
        "fonte": "TecMundo"
    }
];