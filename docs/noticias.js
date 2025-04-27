const noticias = [
  {
    "titulo": "The Last of Us Part II: Remastered recebe atualização para corrigir bugs",
    "descricao": "A Naughty Dog lançou uma nova atualização para The Last of Us Part II: Remastered para corrigir problemas técnicos.",
    "link": "https://exemplo.com/lastofus",
    "imagem": "https://via.placeholder.com/800x450?text=The+Last+of+Us+II",
    "fonte": "PlayStation Blog",
    "timestamp": "2025-04-27T15:30:00",
    "categorias": ["playstation", "jogos"]
  },
  {
    "titulo": "Nintendo Switch 2 será revelado ainda este ano, dizem fontes",
    "descricao": "De acordo com informações de pessoas próximas à Nintendo, o sucessor do Switch pode ser anunciado nos próximos meses.",
    "link": "https://exemplo.com/switch2",
    "imagem": "https://via.placeholder.com/800x450?text=Nintendo+Switch+2",
    "fonte": "Nintendo Life",
    "timestamp": "2025-04-26T10:15:00",
    "categorias": ["nintendo", "consoles"]
  },
  {
    "titulo": "Starfield recebe expansão 'Shattered Space' com novos planetas",
    "descricao": "Bethesda anuncia nova DLC para Starfield que adiciona um novo sistema estelar, missões e equipamentos.",
    "link": "https://exemplo.com/starfield-dlc",
    "imagem": "https://via.placeholder.com/800x450?text=Starfield",
    "fonte": "Xbox Wire",
    "timestamp": "2025-04-26T09:45:00",
    "categorias": ["xbox", "jogos"]
  },
  {
    "titulo": "REVIEW: Elden Ring: Shadow of the Erdtree impressiona com sua escala e dificuldade",
    "descricao": "A expansão de Elden Ring chega para desafiar ainda mais os jogadores e expandir o universo do jogo base.",
    "link": "https://exemplo.com/elden-ring-review",
    "imagem": "https://via.placeholder.com/800x450?text=Elden+Ring",
    "fonte": "IGN Brasil",
    "timestamp": "2025-04-25T14:20:00",
    "categorias": ["reviews", "jogos"]
  },
  {
    "titulo": "Counter-Strike 2 recebe maior atualização desde o lançamento",
    "descricao": "Valve lança patch com novos mapas e ajustes significativos no sistema de movimento do jogo.",
    "link": "https://exemplo.com/cs2-update",
    "imagem": "https://via.placeholder.com/800x450?text=Counter-Strike+2",
    "fonte": "PC Gamer",
    "timestamp": "2025-04-25T11:30:00",
    "categorias": ["pc", "jogos"]
  },
  {
    "titulo": "God of War Ragnarök ganha modo New Game+ e novas armaduras",
    "descricao": "Santa Monica Studio lança atualização gratuita com conteúdo adicional para God of War Ragnarök.",
    "link": "https://exemplo.com/gow-update",
    "imagem": "https://via.placeholder.com/800x450?text=God+of+War",
    "fonte": "PlayStation Blog",
    "timestamp": "2025-04-24T16:45:00",
    "categorias": ["playstation", "jogos"]
  },
  {
    "titulo": "Zelda: Echoes of Wisdom terá integração com Tears of the Kingdom",
    "descricao": "O novo jogo da série Zelda terá recursos especiais para quem jogou o título anterior no Nintendo Switch.",
    "link": "https://exemplo.com/zelda-echoes",
    "imagem": "https://via.placeholder.com/800x450?text=Zelda",
    "fonte": "Nintendo Life",
    "timestamp": "2025-04-24T13:20:00",
    "categorias": ["nintendo", "jogos"]
  },
  {
    "titulo": "REVIEW: Final Fantasy XVI no PC supera a versão de console",
    "descricao": "A versão para PC de Final Fantasy XVI chega com melhorias visuais e desempenho superior à versão de PS5.",
    "link": "https://exemplo.com/ff16-pc-review",
    "imagem": "https://via.placeholder.com/800x450?text=Final+Fantasy+XVI",
    "fonte": "TechMundo",
    "timestamp": "2025-04-23T15:10:00",
    "categorias": ["reviews", "pc", "jogos"]
  },
  {
    "titulo": "Xbox anuncia novo modelo do console Series X com 2TB e design totalmente digital",
    "descricao": "Microsoft apresenta nova versão do Xbox Series X sem drive de disco e maior capacidade de armazenamento.",
    "link": "https://exemplo.com/xbox-series-x-2tb",
    "imagem": "https://via.placeholder.com/800x450?text=Xbox+Series+X",
    "fonte": "Xbox Wire",
    "timestamp": "2025-04-23T10:00:00",
    "categorias": ["xbox", "consoles"]
  },
  {
    "titulo": "Metal Gear Solid Delta: Snake Eater receberá demo jogável em junho",
    "descricao": "Konami confirmou que o remake de Metal Gear Solid 3 terá uma versão de demonstração antes do lançamento.",
    "link": "https://exemplo.com/metal-gear-delta",
    "imagem": "https://via.placeholder.com/800x450?text=Metal+Gear+Solid",
    "fonte": "IGN Brasil",
    "timestamp": "2025-04-22T17:30:00",
    "categorias": ["jogos"]
  },
  {
    "titulo": "GTA 6 ganha novas imagens vazadas mostrando Lucia em Vice City",
    "descricao": "Novas capturas de tela do aguardado Grand Theft Auto VI surgiram online, revelando mais detalhes do jogo.",
    "link": "https://exemplo.com/gta6-leaks",
    "imagem": "https://via.placeholder.com/800x450?text=GTA+6",
    "fonte": "Kotaku",
    "timestamp": "2025-04-22T09:15:00",
    "categorias": ["jogos", "noticias"]
  },
  {
    "titulo": "Steam Deck 2 recebe data de lançamento e especificações técnicas",
    "descricao": "Valve anuncia oficialmente o sucessor do seu portátil de jogos com hardware melhorado e bateria de maior duração.",
    "link": "https://exemplo.com/steam-deck-2",
    "imagem": "https://via.placeholder.com/800x450?text=Steam+Deck+2",
    "fonte": "PC Gamer",
    "timestamp": "2025-04-21T14:40:00",
    "categorias": ["pc", "consoles"]
  },
  {
    "titulo": "REVIEW: Silent Hill 2 Remake é uma obra-prima do horror moderno",
    "descricao": "O remake do clássico de terror psicológico da Konami impressiona tanto os fãs antigos quanto os novos jogadores.",
    "link": "https://exemplo.com/silent-hill-2-review",
    "imagem": "https://via.placeholder.com/800x450?text=Silent+Hill+2",
    "fonte": "GameVicio",
    "timestamp": "2025-04-21T11:00:00",
    "categorias": ["reviews", "jogos"]
  },
  {
    "titulo": "PlayStation 5 Pro: Sony confirma lançamento para o final de 2025",
    "descricao": "Versão mais potente do PS5 chega este ano com melhor desempenho em ray tracing e suporte a 8K.",
    "link": "https://exemplo.com/ps5-pro",
    "imagem": "https://via.placeholder.com/800x450?text=PS5+Pro",
    "fonte": "PlayStation Blog",
    "timestamp": "2025-04-20T16:20:00",
    "categorias": ["playstation", "consoles"]
  },
  {
    "titulo": "Microsoft finaliza aquisição da Activision Blizzard King e promete novidades",
    "descricao": "Após superar obstáculos regulatórios, Microsoft conclui a compra da Activision Blizzard e planeja expansão do Game Pass.",
    "link": "https://exemplo.com/ms-activision",
    "imagem": "https://via.placeholder.com/800x450?text=Microsoft+Activision",
    "fonte": "Xbox Wire",
    "timestamp": "2025-04-20T10:30:00",
    "categorias": ["xbox", "noticias"]
  },
  {
    "titulo": "REVIEW: Mario & Luigi: Reino dos Sonhos Remake traz nostalgia e inovações",
    "descricao": "O clássico do Nintendo DS retorna com gráficos atualizados e mecânicas refinadas para o Switch.",
    "link": "https://exemplo.com/mario-luigi-review",
    "imagem": "https://via.placeholder.com/800x450?text=Mario+e+Luigi",
    "fonte": "Nintendo Life",
    "timestamp": "2025-04-19T13:45:00",
    "categorias": ["nintendo", "reviews"]
  }
];