// Atualizado em: 2025-04-26 03:07:53
const noticias = [
    {
        "titulo": "5 jogos gratuitos de Android em alta para baixar esta semana na Play Store",
        "descricao": "Notícia sobre games do portal Voxel.",
        "link": "https://www.tecmundo.com.br/voxel/501221-5-jogos-gratuitos-de-android-em-alta-para-baixar-esta-semana-na-play-store.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/22/22192616609144.jpg?ims=164x118",
        "fonte": "Voxel"
    },
    {
        "titulo": "Quem será o próximo Papa? ChatGPT aponta cardeal italiano como favorito",
        "descricao": "Clique para ler mais sobre esta notícia de jogos no TecMundo.",
        "link": "https://www.tecmundo.com.br/software/404114-quem-sera-o-proximo-papa-chatgpt-aponta-cardeal-italiano-como-favorito.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/23/23104835408144.jpg?ims=220x127",
        "fonte": "TecMundo"
    },
    {
        "titulo": "Guerra dos drones: Reino Unido proíbe exportação de controles de videogame para a Rússia",
        "descricao": "Clique para ler mais sobre esta notícia de jogos no TecMundo.",
        "link": "https://www.tecmundo.com.br/seguranca/404156-guerra-dos-drones-reino-unido-proibe-exportacao-de-controles-de-videogame-para-a-russia.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/24/24181642361038.jpg?ims=220x127",
        "fonte": "TecMundo"
    },
    {
        "titulo": "\"Sempre esteve na nossa lista\", diretor e produtor de remaster de Onimusha 2 revelam que trazer clássico da Capcom para plataformas atuais era sonh...",
        "descricao": "Clique para ler a notícia completa na IGN Brasil.",
        "link": "https://br.ign.com/onimusha-2-samurais-destiny/139451/news/sempre-esteve-na-nossa-lista-interna-de-projetos-diretor-e-produtor-de-remaster-de-onimusha-2-revela",
        "imagem": "https://sm.ign.com/t/ign_br/screenshot/default/onimusha-2_7gma.320.jpg",
        "fonte": "IGN Brasil"
    },
    {
        "titulo": "By choosing not to replace Oblivion Remastered's soundtrack, Bethesda made the allegations against composer Jeremy Soule everyone else's problem",
        "descricao": "NewsOblivion's soundtrack is a core part of its identity, but it's also tainted by association.",
        "link": "https://www.pcgamer.com/games/the-elder-scrolls/by-choosing-not-to-replace-oblivion-remastereds-soundtrack-bethesda-made-the-allegations-against-composer-jeremy-soule-everyone-elses-problem/",
        "imagem": "https://cdn.mos.cms.futurecdn.net/uFDK5MHpRBXm9SHx5KLbae.jpg",
        "fonte": "PC Gamer"
    },
    {
        "titulo": "Today's Wordle answer for Saturday, April 26",
        "descricao": "regular riddleGet all the help you need with today's Wordle.",
        "link": "https://www.pcgamer.com/games/puzzle/wordle-answer-today-april-26-2025/",
        "imagem": "https://cdn.mos.cms.futurecdn.net/Kpk2kvGhurFqEY6q22TuQ4.jpg",
        "fonte": "PC Gamer"
    },
    {
        "titulo": "Dune: Awakening terá beta aberto extenso no início de março",
        "descricao": "Clique para ler a notícia completa na IGN Brasil.",
        "link": "https://br.ign.com/dune-awakening/139415/news/dune-awakening-tera-beta-aberto-entre-9-e-12-de-maio",
        "imagem": "https://sm.ign.com/t/ign_br/screenshot/default/da-desertvista_jqhf.320.jpg",
        "fonte": "IGN Brasil"
    },
    {
        "titulo": "Hackers podiam colocar anúncios falsos no Instagram de brasileiros",
        "descricao": "Clique para ler mais sobre esta notícia de jogos no TecMundo.",
        "link": "https://www.tecmundo.com.br/seguranca/404121-hackers-podiam-colocar-anuncios-falsos-no-instagram-de-brasileiros.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/23/23141806941049.jpg?ims=220x127",
        "fonte": "TecMundo"
    },
    {
        "titulo": "Eleve seus estudos com o Tablet Samsung Tab A9 64GB",
        "descricao": "Clique para ler a notícia completa na IGN Brasil.",
        "link": "https://br.ign.com/descontos/139461/news/eleve-seus-estudos-com-o-tablet-samsung-tab-a9-64gb",
        "imagem": "https://sm.ign.com/t/ign_br/screenshot/default/woman-using-tablet-while-working_x776.280.jpg",
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
        "titulo": "Nexus Mods decides to allow an Oblivion Remastered mod that changes 'body type' options to male/female, declares it's not 'a battleground for broad...",
        "descricao": "newsThe mod was deleted multiple times before Nexus Mods threw in the towel.",
        "link": "https://www.pcgamer.com/games/rpg/nexus-mods-decides-to-allow-an-oblivion-remastered-mod-that-changes-body-type-options-to-male-female-declares-its-not-a-battleground-for-broader-cultural-or-political-debates/",
        "imagem": "https://cdn.mos.cms.futurecdn.net/tisfbWABPY98fexDSQ3oyS.jpg",
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
        "titulo": "Japão testa navio equipado com arma de canhão eletromagnético; conheça o JS Asuka",
        "descricao": "Clique para ler mais sobre esta notícia de jogos no TecMundo.",
        "link": "https://www.tecmundo.com.br/seguranca/404162-japao-testa-navio-equipado-com-arma-de-canhao-eletromagnetico-conheca-o-js-asuka.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/25/25095503743003.jpg?ims=220x127",
        "fonte": "TecMundo"
    },
    {
        "titulo": "Hogwarts Legacy e GTA 5 de graça e mais! Veja as indicações de games da semana",
        "descricao": "Notícia sobre games do portal Voxel.",
        "link": "https://www.tecmundo.com.br/voxel/501196-hogwarts-legacy-e-gta-5-de-graca-e-mais-veja-as-indicacoes-de-games-da-semana.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/17/17174254439649.jpg?ims=164x118",
        "fonte": "Voxel"
    },
    {
        "titulo": "Epic Games Store libera novo jogo grátis nesta quinta (24)! Resgate aqui",
        "descricao": "Notícia sobre games do portal Voxel.",
        "link": "https://www.tecmundo.com.br/voxel/501231-epic-games-store-libera-novo-jogo-gratis-nesta-quinta-24-resgate-aqui.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/23/23190434293060.jpg?ims=164x118",
        "fonte": "Voxel"
    },
    {
        "titulo": "Modders somehow cranked out a VR mod for Oblivion Remastered mere hours after its surprise launch",
        "descricao": "newsIt's like you're really there, stabbing the rats.",
        "link": "https://www.pcgamer.com/games/the-elder-scrolls/modders-somehow-cranked-out-a-vr-mod-for-oblivion-remastered-mere-hours-after-its-surprise-launch/",
        "imagem": "https://cdn.mos.cms.futurecdn.net/TX2HhYnf5Um9mSMqHVvC9C.jpg",
        "fonte": "PC Gamer"
    },
    {
        "titulo": "Esse controle é um dos mais vendidos no Mercado Livre. Saiba o porquê!",
        "descricao": "Clique para ler a notícia completa na IGN Brasil.",
        "link": "https://br.ign.com/descontos/139460/news/esse-controle-e-um-dos-mais-vendidos-no-mercado-livre-saiba-o-porque",
        "imagem": "https://sm.ign.com/t/ign_br/screenshot/default/close-up-gamer-playing-with-controller_qu8f.280.jpg",
        "fonte": "IGN Brasil"
    },
    {
        "titulo": "WPS Office: Como essa alternativa gratuita está conquistando usuários após o aumento de preço do Microsoft 365",
        "descricao": "Clique para ler mais sobre esta notícia de jogos no TecMundo.",
        "link": "https://www.tecmundo.com.br/software/404131-wps-office-como-essa-alternativa-gratuita-esta-conquistando-usuarios-apos-o-aumento-de-preco-do-microsoft-365.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/23/23195959876040.jpg?ims=220x127",
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
        "titulo": "The new shooter from the former 4A Ukraine studio was supposed to launch today, but instead it got a last-second delay and nobody knows for how long",
        "descricao": "newsA closed beta test earlier this month was also delayed, and apparently did not go very well.",
        "link": "https://www.pcgamer.com/games/fps/the-new-shooter-from-the-former-4a-ukraine-studio-was-supposed-to-launch-today-but-instead-it-got-a-last-second-delay-and-nobody-knows-for-how-long/",
        "imagem": "https://cdn.mos.cms.futurecdn.net/ghiEutr5dRygPTXzfy9v76.jpg",
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
        "titulo": "YouTube Music vai compartilhar letras e trará estabilizador de volume",
        "descricao": "Clique para ler mais sobre esta notícia de jogos no TecMundo.",
        "link": "https://www.tecmundo.com.br/software/404129-youtube-music-vai-compartilhar-letras-e-trara-estabilizador-de-volume.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/23/23181642789011.jpg?ims=220x127",
        "fonte": "TecMundo"
    },
    {
        "titulo": "Lost Records: Bloom & Rage é como uma festa que acabou cedo demais | Review",
        "descricao": "Clique para ler a notícia completa na IGN Brasil.",
        "link": "https://br.ign.com/lost-records-bloom-and-rage-tape-2/139360/review/lost-records-bloom-rage-e-como-uma-festa-que-acabou-cedo-demais",
        "imagem": "https://sm.ign.com/t/ign_br/slotter/6/61129/61129_c4mh.800.jpg",
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
        "titulo": "Nuuvem tem jogos da Steam com até 95% de desconto; aproveite!",
        "descricao": "Notícia sobre games do portal Voxel.",
        "link": "https://www.tecmundo.com.br/voxel/501220-nuuvem-tem-jogos-da-steam-com-ate-95-de-desconto-aproveite.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/22/22180302975049.jpg?ims=164x118",
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
        "titulo": "Epic Games libera dois jogos grátis no Android por tempo limitado! Resgate agora",
        "descricao": "Notícia sobre games do portal Voxel.",
        "link": "https://www.tecmundo.com.br/voxel/501194-epic-games-libera-dois-jogos-gratis-no-android-por-tempo-limitado-resgate-agora.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/17/17140531878400.jpg?ims=164x118",
        "fonte": "Voxel"
    },
    {
        "titulo": "WhatsApp ganha modo 'Privacidade Avançada' para conversas; saiba como funciona",
        "descricao": "Clique para ler mais sobre esta notícia de jogos no TecMundo.",
        "link": "https://www.tecmundo.com.br/internet/404172-whatsapp-ganha-modo-privacidade-avancada-para-conversas-saiba-como-funciona.htm",
        "imagem": "https://tm.ibxk.com.br/2025/03/28/28132609560200.jpg?ims=220x127",
        "fonte": "TecMundo"
    },
    {
        "titulo": "OpenAI lança Deep Research mais leve no ChatGPT",
        "descricao": "Clique para ler mais sobre esta notícia de jogos no TecMundo.",
        "link": "https://www.tecmundo.com.br/software/404163-openai-lanca-deep-research-mais-leve-no-chatgpt.htm",
        "imagem": "https://tm.ibxk.com.br/2025/04/01/01090541316009.jpg?ims=220x127",
        "fonte": "TecMundo"
    },
    {
        "titulo": "Fallout creator laments the loss of the game's earliest development materials: 'I had that in digital form and was ordered to destroy it'",
        "descricao": "News\"The amount of stuff that's been lost about Fallout and its early development saddens me,\" Tim Cain says.",
        "link": "https://www.pcgamer.com/games/fallout/fallout-creator-laments-the-loss-of-the-games-earliest-development-materials-i-had-that-in-digital-form-and-was-ordered-to-destroy-it/",
        "imagem": "https://cdn.mos.cms.futurecdn.net/MgNn2HsHWpppaKvUTVxpEP.jpg",
        "fonte": "PC Gamer"
    }
];