/* ============================================================
   SFFR — Site Data
   All franchise, media, and news data used across the site.
   ============================================================ */

const FRANCHISES = [
  {
    id: 'star-wars',
    slug: 'star-wars',
    name: 'Star Wars',
    shortName: 'Star Wars',
    emoji: '⭐',
    universe: 'A Galaxy Far, Far Away',
    genre: ['Sci-Fi', 'Space Opera', 'Fantasy'],
    description: 'The groundbreaking space opera created by George Lucas in 1977 that transformed popular culture. Following the struggle between the Rebel Alliance and the tyrannical Galactic Empire, Star Wars has grown into one of the most expansive fictional universes ever created.',
    color: '#FFE81F',
    bgGradient: 'linear-gradient(135deg, #000000 0%, #0a0a1a 40%, #1a1000 100%)',
    bgGradient2: 'linear-gradient(135deg, #000 0%, #0d0d00 60%, #000 100%)',
    stats: { films: 12, tvShows: 8, items: 240, years: '1977–Present' },
    films: [
      { title: 'Star Wars: Episode IV – A New Hope', year: 1977, director: 'George Lucas', slug: 'star-wars-a-new-hope' },
      { title: 'Star Wars: Episode V – The Empire Strikes Back', year: 1980, director: 'Irvin Kershner', slug: 'star-wars-empire-strikes-back' },
      { title: 'Star Wars: Episode VI – Return of the Jedi', year: 1983, director: 'Richard Marquand', slug: 'star-wars-return-of-the-jedi' },
      { title: 'Star Wars: Episode I – The Phantom Menace', year: 1999, director: 'George Lucas', slug: 'star-wars-phantom-menace' },
      { title: 'Star Wars: Episode II – Attack of the Clones', year: 2002, director: 'George Lucas', slug: 'star-wars-attack-of-the-clones' },
      { title: 'Star Wars: Episode III – Revenge of the Sith', year: 2005, director: 'George Lucas', slug: 'star-wars-revenge-of-the-sith' },
      { title: 'Rogue One: A Star Wars Story', year: 2016, director: 'Gareth Edwards', slug: 'star-wars-rogue-one' },
      { title: 'Star Wars: Episode VII – The Force Awakens', year: 2015, director: 'J.J. Abrams', slug: 'star-wars-force-awakens' },
      { title: 'Star Wars: Episode VIII – The Last Jedi', year: 2017, director: 'Rian Johnson', slug: 'star-wars-last-jedi' },
      { title: 'Solo: A Star Wars Story', year: 2018, director: 'Ron Howard', slug: 'star-wars-solo' },
      { title: 'Star Wars: Episode IX – The Rise of Skywalker', year: 2019, director: 'J.J. Abrams', slug: 'star-wars-rise-of-skywalker' },
    ],
    tvShows: [
      { title: 'The Mandalorian', years: '2019–2023', seasons: 3 },
      { title: 'The Book of Boba Fett', years: '2021–2022', seasons: 1 },
      { title: 'Obi-Wan Kenobi', years: '2022', seasons: 1 },
      { title: 'Andor', years: '2022–2024', seasons: 2 },
      { title: 'Ahsoka', years: '2023–Present', seasons: 1 },
      { title: 'The Acolyte', years: '2024', seasons: 1 },
      { title: 'Skeleton Crew', years: '2024', seasons: 1 },
      { title: 'Clone Wars (Animated)', years: '2008–2020', seasons: 7 },
    ],
    comics: [
      { title: 'Marvel Star Wars (2015–)', publisher: 'Marvel Comics' },
      { title: 'Dark Horse Star Wars (1991–2015)', publisher: 'Dark Horse Comics' },
      { title: 'Star Wars: Darth Vader (2017–)', publisher: 'Marvel Comics' },
    ],
    books: [
      { title: 'Heir to the Empire', author: 'Timothy Zahn', year: 1991 },
      { title: 'Thrawn', author: 'Timothy Zahn', year: 2017 },
      { title: 'Ahsoka', author: 'E.K. Johnston', year: 2016 },
    ],
    videoGames: [
      { title: 'Knights of the Old Republic', year: 2003, developer: 'BioWare' },
      { title: 'Star Wars Jedi: Fallen Order', year: 2019, developer: 'Respawn Entertainment' },
      { title: 'Star Wars Jedi: Survivor', year: 2023, developer: 'Respawn Entertainment' },
      { title: 'Star Wars Battlefront II', year: 2017, developer: 'DICE' },
    ],
    tabletopGames: [
      { title: 'Star Wars: Shatterpoint', year: 2023, publisher: 'AMG' },
      { title: 'Star Wars: Legion', year: 2018, publisher: 'AMG' },
      { title: 'Star Wars: Unlimited (TCG)', year: 2024, publisher: 'Fantasy Flight Games' },
    ],
    collectibleCategories: [
      { type: 'Action Figures', example: 'Hasbro Black Series', slug: 'star-wars-action-figures' },
      { type: 'Premium Statues', example: 'Hot Toys, Sideshow', slug: 'star-wars-statues' },
      { type: 'Trading Cards', example: 'Topps Star Wars Chrome', slug: 'star-wars-trading-cards' },
      { type: 'Prop Replicas', example: 'Master Replicas, EFX', slug: 'star-wars-props' },
    ],
    timeline: [
      { year: '1977', label: 'A New Hope' },
      { year: '1980', label: 'Empire Strikes Back' },
      { year: '1983', label: 'Return of the Jedi' },
      { year: '1999', label: 'The Phantom Menace' },
      { year: '2002', label: 'Attack of the Clones' },
      { year: '2005', label: 'Revenge of the Sith' },
      { year: '2015', label: 'The Force Awakens' },
      { year: '2016', label: 'Rogue One' },
      { year: '2019', label: 'The Mandalorian' },
      { year: '2022', label: 'Andor' },
      { year: '2024', label: 'The Acolyte' },
    ]
  },

  {
    id: 'dune',
    slug: 'dune',
    name: 'Dune',
    shortName: 'Dune',
    emoji: '🏜️',
    universe: 'The Known Universe',
    genre: ['Sci-Fi', 'Epic'],
    description: 'Frank Herbert\'s monumental science fiction saga set in the distant future of humanity. The story of Paul Atreides and the desert planet Arrakis — the only source of the universe\'s most precious resource — spice melange. Denis Villeneuve\'s film adaptations have brought new life to this legendary IP.',
    color: '#D4A017',
    bgGradient: 'linear-gradient(135deg, #1a0a00 0%, #3d2000 40%, #8B6014 100%)',
    stats: { films: 2, tvShows: 1, items: 48, years: '1965–Present' },
    films: [
      { title: 'Dune: Part One', year: 2021, director: 'Denis Villeneuve', slug: 'dune-part-one' },
      { title: 'Dune: Part Two', year: 2024, director: 'Denis Villeneuve', slug: 'dune-part-two' },
    ],
    tvShows: [
      { title: 'Dune: Prophecy', years: '2024–Present', seasons: 1 },
    ],
    books: [
      { title: 'Dune', author: 'Frank Herbert', year: 1965 },
      { title: 'Dune Messiah', author: 'Frank Herbert', year: 1969 },
      { title: 'Children of Dune', author: 'Frank Herbert', year: 1976 },
      { title: 'God Emperor of Dune', author: 'Frank Herbert', year: 1981 },
    ],
    videoGames: [
      { title: 'Dune: Awakening', year: 2025, developer: 'Funcom' },
      { title: 'Dune II: The Building of a Dynasty', year: 1992, developer: 'Westwood Studios' },
    ],
    collectibleCategories: [
      { type: 'Action Figures', example: 'McFarlane Toys', slug: 'dune-action-figures' },
      { type: 'Premium Statues', example: 'Chronicle Collectibles', slug: 'dune-statues' },
      { type: 'Books & Art', example: 'Limited Editions', slug: 'dune-books' },
    ],
    timeline: [
      { year: '1965', label: 'Novel Published' },
      { year: '1984', label: 'Lynch Film' },
      { year: '2000', label: 'Sci-Fi Channel Miniseries' },
      { year: '2021', label: 'Dune Part One' },
      { year: '2024', label: 'Dune Part Two & Prophecy' },
    ]
  },

  {
    id: 'lord-of-the-rings',
    slug: 'lord-of-the-rings',
    name: 'Lord of the Rings',
    shortName: 'LotR',
    emoji: '💍',
    universe: 'Middle-earth',
    genre: ['Fantasy', 'Epic'],
    description: 'J.R.R. Tolkien\'s foundational epic fantasy set in the world of Middle-earth. The story of the One Ring and the fellowship that must destroy it defined an entire genre. Peter Jackson\'s acclaimed film trilogy and the Prime Video series The Rings of Power continue to expand Tolkien\'s legendarium.',
    color: '#6B8E23',
    bgGradient: 'linear-gradient(135deg, #050d05 0%, #0a1a0a 40%, #1a2800 100%)',
    stats: { films: 6, tvShows: 1, items: 186, years: '1954–Present' },
    films: [
      { title: 'The Fellowship of the Ring', year: 2001, director: 'Peter Jackson', slug: 'lotr-fellowship' },
      { title: 'The Two Towers', year: 2002, director: 'Peter Jackson', slug: 'lotr-two-towers' },
      { title: 'The Return of the King', year: 2003, director: 'Peter Jackson', slug: 'lotr-return-of-king' },
      { title: 'The Hobbit: An Unexpected Journey', year: 2012, director: 'Peter Jackson', slug: 'hobbit-unexpected-journey' },
      { title: 'The Hobbit: The Desolation of Smaug', year: 2013, director: 'Peter Jackson', slug: 'hobbit-desolation-of-smaug' },
      { title: 'The Hobbit: The Battle of the Five Armies', year: 2014, director: 'Peter Jackson', slug: 'hobbit-battle-five-armies' },
    ],
    tvShows: [
      { title: 'The Lord of the Rings: The Rings of Power', years: '2022–Present', seasons: 2 },
    ],
    books: [
      { title: 'The Hobbit', author: 'J.R.R. Tolkien', year: 1937 },
      { title: 'The Fellowship of the Ring', author: 'J.R.R. Tolkien', year: 1954 },
      { title: 'The Two Towers', author: 'J.R.R. Tolkien', year: 1954 },
      { title: 'The Return of the King', author: 'J.R.R. Tolkien', year: 1955 },
      { title: 'The Silmarillion', author: 'J.R.R. Tolkien', year: 1977 },
    ],
    videoGames: [
      { title: 'Middle-earth: Shadow of Mordor', year: 2014, developer: 'Monolith Productions' },
      { title: 'Middle-earth: Shadow of War', year: 2017, developer: 'Monolith Productions' },
      { title: 'The Lord of the Rings: Return of the King', year: 2003, developer: 'EA Games' },
    ],
    collectibleCategories: [
      { type: 'Premium Statues', example: 'Weta Workshop', slug: 'lotr-statues' },
      { type: 'Prop Replicas', example: 'Noble Collection, United Cutlery', slug: 'lotr-props' },
      { type: 'Action Figures', example: 'Diamond Select', slug: 'lotr-figures' },
      { type: 'Art Prints', example: 'Sideshow Collectibles', slug: 'lotr-art' },
    ],
    timeline: [
      { year: '1937', label: 'The Hobbit' },
      { year: '1954', label: 'Fellowship Published' },
      { year: '1978', label: 'Bakshi Film' },
      { year: '2001', label: 'Fellowship Film' },
      { year: '2003', label: 'Return of the King' },
      { year: '2012', label: 'Hobbit Trilogy Begins' },
      { year: '2022', label: 'Rings of Power' },
    ]
  },

  {
    id: 'alien',
    slug: 'alien',
    name: 'Alien',
    shortName: 'Alien',
    emoji: '👾',
    universe: 'The Alien Universe',
    genre: ['Sci-Fi', 'Horror'],
    description: 'Ridley Scott\'s 1979 masterpiece introduced the world to the Xenomorph — one of cinema\'s most iconic creatures. The Alien franchise spans action, horror, and survival, from the corridors of the Nostromo to the hive worlds of the Aliens sequel and beyond.',
    color: '#00FF41',
    bgGradient: 'linear-gradient(135deg, #000500 0%, #001000 50%, #001a00 100%)',
    stats: { films: 7, tvShows: 1, items: 94, years: '1979–Present' },
    films: [
      { title: 'Alien', year: 1979, director: 'Ridley Scott', slug: 'alien-1979' },
      { title: 'Aliens', year: 1986, director: 'James Cameron', slug: 'aliens-1986' },
      { title: 'Alien 3', year: 1992, director: 'David Fincher', slug: 'alien-3' },
      { title: 'Alien Resurrection', year: 1997, director: 'Jean-Pierre Jeunet', slug: 'alien-resurrection' },
      { title: 'Prometheus', year: 2012, director: 'Ridley Scott', slug: 'prometheus' },
      { title: 'Alien: Covenant', year: 2017, director: 'Ridley Scott', slug: 'alien-covenant' },
      { title: 'Alien: Romulus', year: 2024, director: 'Fede Álvarez', slug: 'alien-romulus' },
    ],
    tvShows: [
      { title: 'Alien: Earth', years: '2025–Present', seasons: 1 },
    ],
    videoGames: [
      { title: 'Alien: Isolation', year: 2014, developer: 'Creative Assembly' },
      { title: 'Aliens: Colonial Marines', year: 2013, developer: 'Gearbox Software' },
    ],
    collectibleCategories: [
      { type: 'Action Figures', example: 'NECA Aliens Series', slug: 'alien-figures' },
      { type: 'Premium Statues', example: 'Hot Toys, Sideshow', slug: 'alien-statues' },
      { type: 'Prop Replicas', example: 'AvP Galaxy exclusives', slug: 'alien-props' },
    ],
    timeline: [
      { year: '1979', label: 'Alien' },
      { year: '1986', label: 'Aliens' },
      { year: '1992', label: 'Alien 3' },
      { year: '1997', label: 'Alien Resurrection' },
      { year: '2012', label: 'Prometheus' },
      { year: '2017', label: 'Alien: Covenant' },
      { year: '2024', label: 'Alien: Romulus' },
      { year: '2025', label: 'Alien: Earth (TV)' },
    ]
  },

  {
    id: 'blade-runner',
    slug: 'blade-runner',
    name: 'Blade Runner',
    shortName: 'Blade Runner',
    emoji: '🌧️',
    universe: 'The Blade Runner Universe',
    genre: ['Sci-Fi', 'Neo-Noir'],
    description: 'Ridley Scott\'s visionary 1982 neo-noir science fiction film, based on Philip K. Dick\'s "Do Androids Dream of Electric Sheep?" Blade Runner is one of the most influential films ever made, defining the cyberpunk aesthetic. Denis Villeneuve\'s 2049 sequel stands as one of the finest sci-fi films of its era.',
    color: '#00BFFF',
    bgGradient: 'linear-gradient(135deg, #000510 0%, #0a001a 50%, #001020 100%)',
    stats: { films: 2, tvShows: 1, items: 38, years: '1982–Present' },
    films: [
      { title: 'Blade Runner', year: 1982, director: 'Ridley Scott', slug: 'blade-runner-1982' },
      { title: 'Blade Runner 2049', year: 2017, director: 'Denis Villeneuve', slug: 'blade-runner-2049' },
    ],
    tvShows: [
      { title: 'Blade Runner: Black Lotus', years: '2021–2022', seasons: 1 },
    ],
    books: [
      { title: 'Do Androids Dream of Electric Sheep?', author: 'Philip K. Dick', year: 1968 },
    ],
    videoGames: [
      { title: 'Blade Runner', year: 1997, developer: 'Westwood Studios' },
    ],
    collectibleCategories: [
      { type: 'Premium Statues', example: 'Medicom, threezero', slug: 'blade-runner-statues' },
      { type: 'Art Prints', example: 'Mondo, Bottleneck', slug: 'blade-runner-art' },
    ],
    timeline: [
      { year: '1982', label: 'Blade Runner' },
      { year: '1997', label: 'Video Game' },
      { year: '2017', label: 'Blade Runner 2049' },
      { year: '2021', label: 'Black Lotus (Anime)' },
    ]
  },

  {
    id: 'the-expanse',
    slug: 'the-expanse',
    name: 'The Expanse',
    shortName: 'The Expanse',
    emoji: '🚀',
    universe: 'The Expanse Universe',
    genre: ['Sci-Fi', 'Hard SF'],
    description: 'James S.A. Corey\'s celebrated hard science fiction novel series brought to life in a critically acclaimed TV adaptation. Set in a future where humanity has colonized the solar system, The Expanse depicts political tensions between Earth, Mars, and the Belt with stunning scientific accuracy.',
    color: '#4FC3F7',
    bgGradient: 'linear-gradient(135deg, #000510 0%, #020a1a 50%, #050020 100%)',
    stats: { films: 0, tvShows: 1, items: 24, years: '2011–Present' },
    tvShows: [
      { title: 'The Expanse', years: '2015–2022', seasons: 6 },
      { title: 'The Expanse: A Telltale Series', years: '2023', seasons: 1 },
    ],
    books: [
      { title: 'Leviathan Wakes', author: 'James S.A. Corey', year: 2011 },
      { title: 'Caliban\'s War', author: 'James S.A. Corey', year: 2012 },
      { title: 'Abaddon\'s Gate', author: 'James S.A. Corey', year: 2013 },
      { title: 'Cibola Burn', author: 'James S.A. Corey', year: 2014 },
      { title: 'Nemesis Games', author: 'James S.A. Corey', year: 2015 },
      { title: 'Babylon\'s Ashes', author: 'James S.A. Corey', year: 2016 },
      { title: 'Persepolis Rising', author: 'James S.A. Corey', year: 2017 },
      { title: 'Tiamat\'s Wrath', author: 'James S.A. Corey', year: 2019 },
      { title: 'Leviathan Falls', author: 'James S.A. Corey', year: 2021 },
    ],
    videoGames: [
      { title: 'The Expanse: A Telltale Series', year: 2023, developer: 'Telltale Games' },
    ],
    collectibleCategories: [
      { type: 'Art Prints', example: 'Mondo', slug: 'expanse-art' },
      { type: 'Books & Editions', example: 'Subterranean Press', slug: 'expanse-books' },
    ],
    timeline: [
      { year: '2011', label: 'Leviathan Wakes' },
      { year: '2015', label: 'TV Series Begins' },
      { year: '2019', label: 'Amazon Picks Up' },
      { year: '2022', label: 'Series Finale' },
      { year: '2023', label: 'Telltale Game' },
    ]
  },

  {
    id: 'wheel-of-time',
    slug: 'wheel-of-time',
    name: 'Wheel of Time',
    shortName: 'WoT',
    emoji: '🌀',
    universe: "The Wheel of Time World",
    genre: ['Fantasy', 'Epic'],
    description: 'Robert Jordan\'s massive epic fantasy series — 14 novels spanning over four million words — is one of the most beloved fantasy sagas ever written. Amazon\'s Prime Video adaptation, now entering its third season, brings the world of the One Power and the Dragon Reborn to a new generation.',
    color: '#9C27B0',
    bgGradient: 'linear-gradient(135deg, #0a0010 0%, #0d001a 50%, #10000a 100%)',
    stats: { films: 0, tvShows: 1, items: 31, years: '1990–Present' },
    tvShows: [
      { title: 'The Wheel of Time', years: '2021–Present', seasons: 3 },
    ],
    books: [
      { title: "The Eye of the World", author: 'Robert Jordan', year: 1990 },
      { title: "The Great Hunt", author: 'Robert Jordan', year: 1990 },
      { title: "The Dragon Reborn", author: 'Robert Jordan', year: 1991 },
      { title: "The Shadow Rising", author: 'Robert Jordan', year: 1992 },
      { title: "The Fires of Heaven", author: 'Robert Jordan', year: 1993 },
      { title: "Lord of Chaos", author: 'Robert Jordan', year: 1994 },
      { title: "A Crown of Swords", author: 'Robert Jordan', year: 1996 },
      { title: "The Path of Daggers", author: 'Robert Jordan', year: 1998 },
      { title: "Winter's Heart", author: 'Robert Jordan', year: 2000 },
      { title: "Crossroads of Twilight", author: 'Robert Jordan', year: 2003 },
      { title: "Knife of Dreams", author: 'Robert Jordan', year: 2005 },
      { title: "The Gathering Storm", author: 'Robert Jordan / Brandon Sanderson', year: 2009 },
      { title: "Towers of Midnight", author: 'Robert Jordan / Brandon Sanderson', year: 2010 },
      { title: "A Memory of Light", author: 'Robert Jordan / Brandon Sanderson', year: 2013 },
    ],
    tabletopGames: [
      { title: 'Wheel of Time RPG', year: 2001, publisher: 'Wizards of the Coast' },
    ],
    collectibleCategories: [
      { type: 'Art Prints & Books', example: 'Subterranean Press Editions', slug: 'wot-collectibles' },
      { type: 'Figures', example: 'Dark Horse', slug: 'wot-figures' },
    ],
    timeline: [
      { year: '1990', label: 'Eye of the World' },
      { year: '1994', label: 'Lord of Chaos' },
      { year: '2000', label: 'Series Midpoint' },
      { year: '2013', label: 'Final Book' },
      { year: '2021', label: 'Amazon TV Series' },
      { year: '2024', label: 'Season 3' },
    ]
  },

  {
    id: 'star-trek',
    slug: 'star-trek',
    name: 'Star Trek',
    shortName: 'Star Trek',
    emoji: '🖖',
    universe: 'The United Federation of Planets',
    genre: ['Sci-Fi', 'Space Opera'],
    description: 'Gene Roddenberry\'s optimistic vision of humanity\'s future in the 23rd and 24th centuries. Star Trek remains one of the most beloved science fiction franchises, with 11 TV series and 13 films spanning six decades.',
    color: '#FFD700',
    bgGradient: 'linear-gradient(135deg, #000510 0%, #001020 50%, #000a20 100%)',
    stats: { films: 13, tvShows: 11, items: 320, years: '1966–Present' }
  },

  {
    id: 'game-of-thrones',
    slug: 'game-of-thrones',
    name: 'Game of Thrones',
    shortName: 'GoT',
    emoji: '⚔️',
    universe: 'Westeros',
    genre: ['Fantasy', 'Drama'],
    description: 'George R.R. Martin\'s A Song of Ice and Fire series brought to HBO in one of the most ambitious TV productions ever. House of the Dragon continues the story of House Targaryen.',
    color: '#C41E3A',
    bgGradient: 'linear-gradient(135deg, #1a0000 0%, #0d0000 50%, #1a0000 100%)',
    stats: { films: 0, tvShows: 2, items: 178, years: '1996–Present' }
  },

  {
    id: 'foundation',
    slug: 'foundation',
    name: 'Foundation',
    shortName: 'Foundation',
    emoji: '📚',
    universe: "Asimov's Galaxy",
    genre: ['Sci-Fi', 'Epic'],
    description: 'Isaac Asimov\'s landmark science fiction series about the fall and rise of a galactic civilization. Apple TV+\'s adaptation brings this sweeping intellectual epic to a new audience.',
    color: '#FFA500',
    bgGradient: 'linear-gradient(135deg, #100500 0%, #1a0800 50%, #100500 100%)',
    stats: { films: 0, tvShows: 1, items: 18, years: '1951–Present' }
  },

  {
    id: 'doctor-who',
    slug: 'doctor-who',
    name: 'Doctor Who',
    shortName: 'Doctor Who',
    emoji: '🎭',
    universe: 'The Whoniverse',
    genre: ['Sci-Fi', 'Adventure'],
    description: "The world's longest-running science fiction television programme. The Doctor travels through space and time in the TARDIS, fighting evil and exploring the universe with a rotating cast of companions.",
    color: '#003B6F',
    bgGradient: 'linear-gradient(135deg, #000820 0%, #001030 50%, #000820 100%)',
    stats: { films: 2, tvShows: 1, items: 210, years: '1963–Present' }
  },

  {
    id: 'battlestar-galactica',
    slug: 'battlestar-galactica',
    name: 'Battlestar Galactica',
    shortName: 'BSG',
    emoji: '🛸',
    universe: 'The Twelve Colonies',
    genre: ['Sci-Fi', 'Drama'],
    description: 'Ronald D. Moore\'s critically acclaimed reimagining of the original 1978 series is considered one of the finest sci-fi dramas ever made, exploring themes of identity, religion, and survival.',
    color: '#8B7355',
    bgGradient: 'linear-gradient(135deg, #0a0800 0%, #151000 50%, #0a0800 100%)',
    stats: { films: 1, tvShows: 1, items: 62, years: '1978–Present' }
  },

  {
    id: 'avatar',
    slug: 'avatar',
    name: 'Avatar',
    shortName: 'Avatar',
    emoji: '🌿',
    universe: 'Pandora',
    genre: ['Sci-Fi', 'Fantasy'],
    description: 'James Cameron\'s groundbreaking visual achievement set on the lush world of Pandora. The Avatar franchise continues with Avatar: The Way of Water and further sequels in development.',
    color: '#00CED1',
    bgGradient: 'linear-gradient(135deg, #001510 0%, #002510 50%, #001510 100%)',
    stats: { films: 2, tvShows: 0, items: 54, years: '2009–Present' }
  }
];

/* ---- News Items ----------------------------------------------- */
const NEWS_ITEMS = [
  {
    id: 1,
    tag: 'Upcoming Film',
    title: 'Dune: Messiah Officially Greenlit by Warner Bros. — Denis Villeneuve Returns',
    date: 'May 20, 2026',
    bg: 'linear-gradient(135deg, #3d2000 0%, #8B6014 100%)',
    url: '#'
  },
  {
    id: 2,
    tag: 'Auction',
    title: 'Original Star Wars Millennium Falcon Miniature Sells for $2.4M at Heritage Auctions',
    date: 'May 18, 2026',
    bg: 'linear-gradient(135deg, #0a0a1a 0%, #1a1000 100%)',
    url: '#'
  },
  {
    id: 3,
    tag: 'Collectible Release',
    title: 'Hot Toys Announces Paul Atreides in Stillsuit — Limited to 2,000 Worldwide',
    date: 'May 15, 2026',
    bg: 'linear-gradient(135deg, #1a0a00 0%, #3d2000 100%)',
    url: '#'
  },
  {
    id: 4,
    tag: 'New Season',
    title: 'The Wheel of Time Season 3 Premieres to Record Amazon Viewership',
    date: 'May 12, 2026',
    bg: 'linear-gradient(135deg, #0a0010 0%, #0d001a 100%)',
    url: '#'
  },
  {
    id: 5,
    tag: 'Upcoming',
    title: 'Star Wars: Dawn of the Jedi Confirmed for 2027 — Dave Filoni Directing',
    date: 'May 10, 2026',
    bg: 'linear-gradient(135deg, #000 0%, #0a0a1a 100%)',
    url: '#'
  },
  {
    id: 6,
    tag: 'Collectible',
    title: 'Weta Workshop Releases Limited Smaug Statue — Just 500 Made',
    date: 'May 8, 2026',
    bg: 'linear-gradient(135deg, #050d05 0%, #0a1a0a 100%)',
    url: '#'
  },
  {
    id: 7,
    tag: 'TCG',
    title: 'Star Wars: Unlimited Wave 5 "Fall of the Republic" Revealed — New Legends Format',
    date: 'May 6, 2026',
    bg: 'linear-gradient(135deg, #0a0a00 0%, #1a1000 100%)',
    url: '#'
  },
];

/* ---- Recent Movie Cards (for rotating gallery) ---------------- */
const RECENT_FILMS = [
  { title: 'Dune: Part Two', year: 2024, franchise: 'Dune', bg: 'linear-gradient(135deg, #3d2000, #8B6014)' },
  { title: 'Alien: Romulus', year: 2024, franchise: 'Alien', bg: 'linear-gradient(135deg, #000500, #001500)' },
  { title: 'Avatar: The Way of Water', year: 2022, franchise: 'Avatar', bg: 'linear-gradient(135deg, #001510, #002a20)' },
  { title: 'The Rings of Power S2', year: 2024, franchise: 'LotR', bg: 'linear-gradient(135deg, #050d05, #0a1a0a)' },
  { title: 'Andor Season 2', year: 2024, franchise: 'Star Wars', bg: 'linear-gradient(135deg, #000, #0a0a1a)' },
  { title: 'Foundation S3', year: 2025, franchise: 'Foundation', bg: 'linear-gradient(135deg, #100500, #1a0800)' },
  { title: 'Blade Runner 2099', year: 2025, franchise: 'Blade Runner', bg: 'linear-gradient(135deg, #000510, #001020)' },
  { title: 'Dune: Prophecy S2', year: 2025, franchise: 'Dune', bg: 'linear-gradient(135deg, #2d1800, #6b4400)' },
];

/* ---- Recent Collectibles (for rotating gallery) --------------- */
const RECENT_COLLECTIBLES = [
  { name: 'Hot Toys Sabine Wren DX', type: 'Premium Figure', maker: 'Hot Toys', bg: 'linear-gradient(135deg, #000, #0a0a1a)' },
  { name: 'NECA Xenomorph Warrior', type: 'Action Figure', maker: 'NECA', bg: 'linear-gradient(135deg, #000500, #001500)' },
  { name: 'Weta Smaug Deluxe Statue', type: 'Premium Statue', maker: 'Weta Workshop', bg: 'linear-gradient(135deg, #050d05, #0a1a0a)' },
  { name: 'Hot Toys Paul Atreides', type: 'Premium Figure', maker: 'Hot Toys', bg: 'linear-gradient(135deg, #1a0a00, #3d2000)' },
  { name: 'Sideshow Darth Vader', type: 'Premium Statue', maker: 'Sideshow', bg: 'linear-gradient(135deg, #000, #0a0000)' },
  { name: 'threezero Roy Batty', type: 'Premium Figure', maker: 'threezero', bg: 'linear-gradient(135deg, #000510, #0a001a)' },
];

/* ---- Search Index (slug → page path mapping) ------------------ */
const SEARCH_INDEX = [
  ...FRANCHISES.map(f => ({
    name: f.name,
    type: 'Franchise',
    slug: f.slug,
    url: `franchise/${f.slug}.html`,
    keywords: [f.name, f.shortName, f.universe, ...(f.genre || [])].map(s => s.toLowerCase())
  })),
  // Individual films
  { name: 'A New Hope', type: 'Film', slug: 'star-wars-a-new-hope', url: 'item/star-wars-a-new-hope.html', keywords: ['a new hope', 'star wars', 'episode iv', '1977', 'luke skywalker'] },
  { name: 'Dune: Part One', type: 'Film', slug: 'dune-part-one', url: 'item/dune-part-one.html', keywords: ['dune', 'part one', '2021', 'villeneuve', 'paul atreides'] },
  { name: 'Hot Toys Luke Skywalker', type: 'Collectible', slug: 'hot-toys-luke', url: 'item/hot-toys-luke-skywalker.html', keywords: ['hot toys', 'luke skywalker', 'star wars', 'figure', 'collectible'] },
  { name: 'Star Wars Films', type: 'Media List', slug: 'star-wars-films', url: 'media/star-wars-films.html', keywords: ['star wars', 'films', 'movies', 'list'] },
  { name: 'Star Wars Collectibles', type: 'Collectibles', slug: 'star-wars-collectibles', url: 'media/star-wars-collectibles.html', keywords: ['star wars', 'collectibles', 'figures', 'statues'] },
];

/* Fuzzy search helper ------------------------------------------ */
function searchAll(query) {
  if (!query || query.trim().length < 2) return [];
  const q = query.toLowerCase().trim();
  const scored = SEARCH_INDEX.map(item => {
    let score = 0;
    // Exact name match
    if (item.name.toLowerCase() === q) score += 100;
    // Name starts with
    if (item.name.toLowerCase().startsWith(q)) score += 50;
    // Name contains
    if (item.name.toLowerCase().includes(q)) score += 30;
    // Keywords contain
    item.keywords.forEach(k => {
      if (k === q) score += 20;
      if (k.startsWith(q)) score += 10;
      if (k.includes(q)) score += 5;
    });
    return { ...item, score };
  })
  .filter(i => i.score > 0)
  .sort((a, b) => b.score - a.score)
  .slice(0, 8);
  return scored;
}
