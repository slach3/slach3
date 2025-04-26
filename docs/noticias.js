// Atualizado em: 2025-04-26 04:14:56
const noticias = [
    {
        "titulo": "Dune: Awakening terá beta aberto extenso no início de março",
        "descricao": "Clique para ler a notícia completa na IGN Brasil.",
        "link": "https://br.ign.com/dune-awakening/139415/news/dune-awakening-tera-beta-aberto-entre-9-e-12-de-maio",
        "imagem": "https://sm.ign.com/t/ign_br/screenshot/default/da-desertvista_jqhf.320.jpg",
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
        "titulo": "Steam recebe 7 jogos grátis nesta semana! Veja lista e resgate",
        "descricao": "Clique para ler mais sobre esta notícia de jogos no TecMundo.",
        "link": "https://www.tecmundo.com.br/voxel/501222-steam-recebe-7-jogos-gratis-nesta-semana-veja-lista-e-resgate.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/23/23174404810036.jpg?ims=96x88",
        "fonte": "TecMundo"
    },
    {
        "titulo": "PlayStation tem jogos para PS4 e PS5 com até 90% OFF; aproveite!",
        "descricao": "Clique para ler mais sobre esta notícia de jogos no TecMundo.",
        "link": "https://www.tecmundo.com.br/voxel/501244-playstation-tem-jogos-para-ps4-e-ps5-com-ate-90-off-aproveite.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/24/24175303321005.jpg?ims=96x88",
        "fonte": "TecMundo"
    },
    {
        "titulo": "A Windows 11 update revealed a 2-decade old bug in GTA: San Andreas that yeets CJ at '1.087 quadrillion light years' into the stratosphere",
        "descricao": "NewsAw shee-it, here we go again…",
        "link": "https://www.pcgamer.com/games/grand-theft-auto/a-windows-11-update-revealed-a-2-decade-old-bug-in-gta-san-andreas-that-yeets-cj-1-087-quadrillion-light-years-into-the-stratosphere/",
        "imagem": "https://cdn.mos.cms.futurecdn.net/kAueyJKk2En6JAadafRViH.jpg",
        "fonte": "PC Gamer"
    },
    {
        "titulo": "Nintendo revela preço e data de lançamento do Switch 2 no Brasil",
        "descricao": "Clique para ler a notícia completa na IGN Brasil.",
        "link": "https://br.ign.com/nintendo-switch-2/139291/news/nintendo-revela-preco-e-data-de-lancamento-do-switch-2-no-brasil",
        "imagem": "https://sm.ign.com/t/ign_br/slotter/6/61019/61019_fmx4.800.jpg",
        "fonte": "IGN Brasil"
    },
    {
        "titulo": "Vai uma dose de nostalgia? Console Nintendo Wii em oferta no Mercado Livre",
        "descricao": "Clique para ler a notícia completa na IGN Brasil.",
        "link": "https://br.ign.com/descontos/139465/news/vai-uma-dose-de-nostalgia-console-nintendo-wii-em-oferta-no-mercado-livre",
        "imagem": "https://sm.ign.com/t/ign_br/screenshot/default/wii-header_n1jp.280.jpg",
        "fonte": "IGN Brasil"
    },
    {
        "titulo": "Hideo Kojima escolheu Margaret Qualley para papel em Death Stranding após assistir a comercial bizarro estrelado pela atriz",
        "descricao": "Clique para ler a notícia completa na IGN Brasil.",
        "link": "https://br.ign.com/death-stranding-2/139402/news/hideo-kojima-escolheu-margaret-qualley-para-papel-em-death-stranding-apos-assistir-a-comercial-bizar",
        "imagem": "https://sm.ign.com/t/ign_br/news/h/hideo-koji/hideo-kojima-cast-margaret-qualley-in-death-stranding-after_9x5v.320.jpg",
        "fonte": "IGN Brasil"
    },
    {
        "titulo": "Fallout creator laments the loss of the game's earliest development materials: 'I had that in digital form and was ordered to destroy it'",
        "descricao": "News\"The amount of stuff that's been lost about Fallout and its early development saddens me,\" Tim Cain says.",
        "link": "https://www.pcgamer.com/games/fallout/fallout-creator-laments-the-loss-of-the-games-earliest-development-materials-i-had-that-in-digital-form-and-was-ordered-to-destroy-it/",
        "imagem": "https://cdn.mos.cms.futurecdn.net/MgNn2HsHWpppaKvUTVxpEP.jpg",
        "fonte": "PC Gamer"
    },
    {
        "titulo": "Nuuvem Select de Easter Egg Game Festival traz promoção de 2 jogos por um preço especial",
        "descricao": "Clique para ler mais sobre esta notícia de jogos no TecMundo.",
        "link": "https://www.tecmundo.com.br/voxel/501249-nuuvem-select-de-easter-egg-game-festival-traz-promocao-de-2-jogos-por-um-preco-especial.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/25/25121939814119.jpg?ims=96x88",
        "fonte": "TecMundo"
    },
    {
        "titulo": "Prime Gaming recebe última lista com os jogos gratuitos de abril! Veja como resgatar",
        "descricao": "Clique para ler mais sobre esta notícia de jogos no TecMundo.",
        "link": "https://www.tecmundo.com.br/voxel/501230-prime-gaming-recebe-ultima-lista-com-os-jogos-gratuitos-de-abril-veja-como-resgatar.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/23/23183152611035.jpg?ims=96x88",
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
        "titulo": "Lost Records: Bloom & Rage é como uma festa que acabou cedo demais | Review",
        "descricao": "Clique para ler a notícia completa na IGN Brasil.",
        "link": "https://br.ign.com/lost-records-bloom-and-rage-tape-2/139360/review/lost-records-bloom-rage-e-como-uma-festa-que-acabou-cedo-demais",
        "imagem": "https://sm.ign.com/t/ign_br/slotter/6/61129/61129_c4mh.800.jpg",
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
        "titulo": "Clair Obscur: Expedition 33 – Um novo clássico forjado na beleza do fim | Review",
        "descricao": "Clique para ler a notícia completa na IGN Brasil.",
        "link": "https://br.ign.com/clair-obscur-expedition-33/139278/review/clair-obscur-expedition-33-um-novo-classico-forjado-na-beleza-do-fim-review",
        "imagem": "https://sm.ign.com/t/ign_br/slotter/6/61021/61021_3kyp.800.jpg",
        "fonte": "IGN Brasil"
    },
    {
        "titulo": "Homem de 58 anos é condenado a dois anos de prisão por piratear Nintendo Switch! Entenda o caso",
        "descricao": "Notícia sobre games do portal Voxel.",
        "link": "https://www.tecmundo.com.br/voxel/501178-homem-de-58-anos-e-condenado-a-dois-anos-de-prisao-por-piratear-nintendo-switch-entenda-o-caso.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/16/16111056857221.jpg?ims=328x189",
        "fonte": "Voxel"
    },
    {
        "titulo": "\"Sempre esteve na nossa lista\", diretor e produtor de remaster de Onimusha 2 revelam que trazer clássico da Capcom para plataformas atuais era sonh...",
        "descricao": "Clique para ler a notícia completa na IGN Brasil.",
        "link": "https://br.ign.com/onimusha-2-samurais-destiny/139451/news/sempre-esteve-na-nossa-lista-interna-de-projetos-diretor-e-produtor-de-remaster-de-onimusha-2-revela",
        "imagem": "https://sm.ign.com/t/ign_br/screenshot/default/onimusha-2_7gma.320.jpg",
        "fonte": "IGN Brasil"
    },
    {
        "titulo": "Xbox: jogos de Xbox One e Series S|X com até 90% de desconto",
        "descricao": "Clique para ler mais sobre esta notícia de jogos no TecMundo.",
        "link": "https://www.tecmundo.com.br/voxel/501232-xbox-jogos-de-xbox-one-e-series-sx-com-ate-90-de-desconto.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/23/23185730395050.jpg?ims=96x88",
        "fonte": "TecMundo"
    },
    {
        "titulo": "Epic Games libera dois jogos grátis no Android por tempo limitado! Resgate agora",
        "descricao": "Clique para ler mais sobre esta notícia de jogos no TecMundo.",
        "link": "https://www.tecmundo.com.br/voxel/501245-epic-games-libera-dois-jogos-gratis-no-android-por-tempo-limitado-resgate-agora.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/24/24192438758015.jpg?ims=96x88",
        "fonte": "TecMundo"
    },
    {
        "titulo": "The Elder Scrolls IV Oblivion Remastered pede 32 GB de RAM no PC!",
        "descricao": "Notícia sobre games do portal Voxel.",
        "link": "https://www.tecmundo.com.br/voxel/501218-the-elder-scrolls-iv-oblivion-remastered-pede-32-gb-de-ram-no-pc-veja-requisitos-da-steam.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/22/22172738568003.jpg?ims=328x189",
        "fonte": "Voxel"
    },
    {
        "titulo": "Clair Obscur: Expedition 33 supera Blue Prince e se torna jogo mais bem avaliado de 2025 no Metacritic",
        "descricao": "Clique para ler a notícia completa na IGN Brasil.",
        "link": "https://br.ign.com/clair-obscur-expedition-33/139419/news/clair-obscur-expedition-33-supera-blue-prince-e-se-torna-jogo-mais-bem-avaliado-de-2025-no-metacriti",
        "imagem": "https://sm.ign.com/t/ign_br/screenshot/default/clair-obscur_kymh.320.jpg",
        "fonte": "IGN Brasil"
    },
    {
        "titulo": "Mario Kart World: Veja gameplay, personagens confirmados e preço do game",
        "descricao": "Notícia sobre games do portal Voxel.",
        "link": "https://www.tecmundo.com.br/voxel/501191-mario-kart-world-veja-gameplay-personagens-confirmados-e-preco-do-game.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/17/17112839690088.jpg?ims=328x189",
        "fonte": "Voxel"
    },
    {
        "titulo": "Steam recebe 5 jogos grátis nesta semana! Veja lista e resgate",
        "descricao": "Notícia sobre games do portal Voxel.",
        "link": "https://www.tecmundo.com.br/voxel/501183-steam-recebe-5-jogos-gratis-nesta-semana-veja-lista-e-resgate.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/17/17134630301366.jpg?ims=328x189",
        "fonte": "Voxel"
    },
    {
        "titulo": "Switch 2 mais caro que PS5 no Brasil, Oblivion Remastered no Game Pass e mais! Veja as principais notícias de games da semana",
        "descricao": "Notícia sobre games do portal Voxel.",
        "link": "https://www.tecmundo.com.br/voxel/501246-switch-2-mais-caro-que-ps5-no-brasil-oblivion-remastered-no-game-pass-e-mais-veja-as-principais-noticias-de-games-da-semana.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/24/24203133819005.jpg?ims=96x88",
        "fonte": "Voxel"
    },
    {
        "titulo": "Roblox anuncia grande mudança em seus preços e meta ambiciosa: ser dono de 10% do mercado de jogos",
        "descricao": "Clique para ler mais sobre esta notícia de jogos no TecMundo.",
        "link": "https://www.tecmundo.com.br/voxel/501226-roblox-anuncia-grande-mudanca-em-seus-precos-e-meta-ambiciosa-ser-dono-de-10-do-mercado-de-jogos.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/23/23113319772256.jpg?ims=96x88",
        "fonte": "TecMundo"
    },
    {
        "titulo": "The new shooter from the former 4A Ukraine studio was supposed to launch today, but instead it got a last-second delay and nobody knows for how long",
        "descricao": "newsA closed beta test earlier this month was also delayed, and apparently did not go very well.",
        "link": "https://www.pcgamer.com/games/fps/the-new-shooter-from-the-former-4a-ukraine-studio-was-supposed-to-launch-today-but-instead-it-got-a-last-second-delay-and-nobody-knows-for-how-long/",
        "imagem": "https://cdn.mos.cms.futurecdn.net/ghiEutr5dRygPTXzfy9v76.jpg",
        "fonte": "PC Gamer"
    },
    {
        "titulo": "Jogos do Switch 2 por até R$ 500: O que explica lançamentos tão caros da Nintendo?",
        "descricao": "Clique para ler mais sobre esta notícia de jogos no TecMundo.",
        "link": "https://www.tecmundo.com.br/voxel/501242-jogos-do-switch-2-por-ate-r-500-o-que-explica-lancamentos-tao-caros-da-nintendo.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/24/24155813860014.jpg?ims=96x88",
        "fonte": "TecMundo"
    },
    {
        "titulo": "Nexus Mods decides to allow an Oblivion Remastered mod that changes 'body type' options to male/female, declares it's not 'a battleground for broad...",
        "descricao": "newsThe mod was deleted multiple times before Nexus Mods threw in the towel.",
        "link": "https://www.pcgamer.com/games/rpg/nexus-mods-decides-to-allow-an-oblivion-remastered-mod-that-changes-body-type-options-to-male-female-declares-its-not-a-battleground-for-broader-cultural-or-political-debates/",
        "imagem": "https://cdn.mos.cms.futurecdn.net/tisfbWABPY98fexDSQ3oyS.jpg",
        "fonte": "PC Gamer"
    },
    {
        "titulo": "Smart TV LG 4K 55\" Nanocell: leve entretenimento imersivo para sua casa!",
        "descricao": "Clique para ler a notícia completa na IGN Brasil.",
        "link": "https://br.ign.com/descontos/139464/news/smart-tv-lg-4k-55-nanocell-leve-entretenimento-imersivo-para-sua-casa",
        "imagem": "https://sm.ign.com/t/ign_br/screenshot/default/unnamed-3_bvrq.280.jpg",
        "fonte": "IGN Brasil"
    },
    {
        "titulo": "Elder Scrolls IV Oblivion Remastered é lançado e chega direto ao Game Pass!",
        "descricao": "Notícia sobre games do portal Voxel.",
        "link": "https://www.tecmundo.com.br/voxel/501214-elder-scrolls-iv-oblivion-remastered-e-lancado-e-chega-direto-ao-game-pass-veja-preco-e-gameplay.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/22/22172825532004.jpg?ims=328x189",
        "fonte": "Voxel"
    }
];