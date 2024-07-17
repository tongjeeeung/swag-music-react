import { v4 as uuidv4 } from 'uuid';
import { Artist, Blog } from './models.js'

const jesus = {
  name: 'Джизус',
  image: '/swag-music-react/static/images/executors/jezus/executor.jpeg',
  about: 'Vladislav Dmitrievich Kozikhov, known by his stage name Dzhizus, is a Russian musician, singer, and songwriter. Born on October 9, 1994, he is recognized for his unique blend of hip-hop, electronic, and rock music. His emotionally charged lyrics often explore themes of love, loss, self-discovery, and social issues. Dzhizus gained popularity in the late 2010s and continues to be an influential figure in contemporary music.',
  playlists: [{
    name: 'Не пара',
    image: '/public/swag-music-react/static/images/executors/jezus/album1.jpg',
    information: 'The track "Не пара" by Джизус (Jeezus) is one of his popular works. In this song, the artist explores themes of love, disappointment, and incompatibility in relationships. The lyrics are filled with emotional experiences and personal reflections, making it relatable and understandable to many listeners.',
    tracks: [{
      name: 'Не пара',
      duration: '3:26',
      url: '/swag-music-react/static/images/executors/jezus/tracks/Не пара.mp3'
    }],
  },
  {
    name: '47 - Revolution and World',
    image: '/swag-music-react/static/images/executors/jezus/album2.jpg',
    information: 'The album "47 - Revolution and World" from Jeezus is a significant work in his work. In this album, the artist continues to explore themes of revolution, world changes, love, disappointment, internal struggle and the search for the meaning of life. The lyrics are filled with deep emotional experiences and personal reflections, which makes them relatable and understandable to many listeners.',
    tracks: [{
      name: 'Ночь',
      duration: '2:55',
      url: '/swag-music-react/static/images/executors/jezus/tracks/Ночь.mp3',
    },
    {
      name: "LOVE",
      url: '/swag-music-react/static/images/executors/jezus/tracks/LOVE.mp3',
      duration: '3:58',
    },
    {
      name: "XXXXstyle",
      url: '/swag-music-react/static/images/executors/jezus/tracks/XXXXstyle.mp3',
      duration: '3:02',
    },
    {
      name: "Ветер моих перемен",
      url: '/swag-music-react/static/tracks/Джизус - Ветер моих перемен.mp3',
      duration: '3:03',
    },
    {
      name: "Во имя любви",
      url: '/swag-music-react/static/images/executors/jezus/tracks/Ветер моих перемен.mp3',
      duration: '2:42',
    },
    {
      name: "Войной",
      url: '/swag-music-react/static/images/executors/jezus/tracks/Войной.mp3',
      duration: '2:06',
    },
    {
      name: "Выбор за тобой",
      url: '/swag-music-react/static/images/executors/jezus/tracks/Выбор за тобой.mp3',
      duration: '3:58',
    },
    {
      name: "Давай со мной",
      url: '/swag-music-react/static/images/executors/jezus/tracks/Давай со мной.mp3',
      duration: '3:04',
    },
    {
      name: "Дыхание с тобой",
      url: '/swag-music-react/static/images/executors/jezus/tracks/Дыхание с тобой.mp3',
      duration: '3:01',
    },
    {
      name: "Запутанный день",
      url: '/swag-music-react/static/images/executors/jezus/tracks/Запутанный день.mp3',
      duration: '3:52',
    },
    {
      name: "Наши сердца",
      url: '/swag-music-react/static/images/executors/jezus/tracks/Наши сердца.mp3',
      duration: '3:49',
    },
    {
      name: "Небом и звездой",
      url: '/swag-music-react/static/images/executors/jezus/tracks/Небом и звездой.mp3',
      duration: '4:51',
    },
    {
      name: "Поколение моё",
      url: '/swag-music-react/static/images/executors/jezus/tracks/Поколение моё.mp3',
      duration: '3:45',
    },
    {
      name: "Пора что-то менять",
      url: '/swag-music-react/static/images/executors/jezus/tracks/Пора что-то менять.mp3',
      duration: '2:22',
    },
    {
      name: "Человек, который изменил всё",
      url: '/swag-music-react/static/images/executors/jezus/tracks/Человек, который изменил всё.mp3',
      duration: '2:26',
    },
    {
      name: "Я умираю для тебя",
      url: '/swag-music-react/static/images/executors/jezus/tracks/Я умираю для тебя.mp3',
      duration: '2:59',
    },
    {
      name: "Я ухожу",
      url: '/swag-music-react/static/images/executors/jezus/tracks/Я ухожу.mp3',
      duration: '4:34',
    }
  ],
  }
],
}

const toxis = {
  name: 'Toxi$',
  image: "/swag-music-react/static/images/executors/toxi$/executor.jpeg",
  about: "Andrey Smelyanskiy, known as Toxi$, is a rising Russian musician blending hip-hop, trap, and electronic music. Starting his career in the early 2020s, he quickly gained recognition with his emotionally rich tracks that explore personal and social themes. Collaborating with various artists, Toxi$ experiments with new sounds and styles. His energetic performances and charismatic stage presence make his concerts unforgettable. As he continues to release new music, Toxi$ is steadily climbing the ranks of the music industry.",
  playlists: [{
    name: 'HOTSHOT',
    image: "/swag-music-react/static/images/executors/toxi$/album1.png",
    information: "'HOTSHOT' is the latest album by Russian hip-hop artist Toxi$, released in 2023. Known for his distinctive blend of trap, hip-hop, and electronic music, Toxi$ delivers an album that is both innovative and deeply personal.",
    tracks: [{
      name: 'HURTZ',
      duration: '1:44',
      url: "/swag-music-react/static/images/executors/toxi$/tracks/HURTZ.mp3"
    },
    {
      name: "DUNKERK",
      duration: '2:16',
      url: "/swag-music-react/static/images/executors/toxi$/tracks/DUNKERK.mp3"
    },
    {
      name: "RICKFLO",
      duration: '1:31',
      url: "/swag-music-react/static/images/executors/toxi$/tracks/RICKFLO.mp3"
    },
    {
      name: "ГИЛИ",
      duration: '1:47',
      url: "/swag-music-react/static/images/executors/toxi$/tracks/ГИЛИ.mp3"
    },
    {
      name: "КУПОЛ",
      duration: '1:16',
      url: "/swag-music-react/static/images/executors/toxi$/tracks/КУПОЛ.mp3"
    },
    {
      name: "БЕСИТСЯ",
      duration: '2:26',
      url: "/swag-music-react/static/images/executors/toxi$/tracks/БЕСИТСЯ.mp3"
    },
    {
      name: "НА ДЕНЬ",
      duration: '2:13',
      url: "/swag-music-react/static/images/executors/toxi$/tracks/НА ДЕНЬ.mp3"
    },
    {
      name: "BB",
      duration: '3:06',
      url: "/swag-music-react/static/images/executors/toxi$/tracks/BB.mp3"
    },
    {
      name: "ZOOTED",
      duration: '2:00',
      url: "/swag-music-react/static/images/executors/toxi$/tracks/ZOOTED.mp3"
    },
    {
      name: "IDK",
      duration: '1:52',
      url: "/swag-music-react/static/images/executors/toxi$/tracks/IDK.mp3"
    },
  ],
  }],
}

const superheaven = {
  name: 'Superheaven',
  image: "/swag-music-react/static/images/executors/superheaven/executor.png",
  about: "Superheaven is an American rock band known for their grunge-influenced sound and emotionally charged lyrics. Formed in 2008 in Doylestown, Pennsylvania, the band originally went by the name Daylight before rebranding to Superheaven in 2014. Their music blends elements of alternative rock, grunge, and punk, creating a nostalgic yet fresh sound that resonates with fans of 90s rock.",
  playlists: [{
    name: 'Jar',
    image: "/swag-music-react/static/images/executors/superheaven/album1.jpeg",
    information: "The album 'Jar' explores themes of personal experiences, struggles with inner demons, and the search for meaning in life. Superheaven's music is characterized by powerful guitar riffs, emotional vocal performances, and atmospheric sound, which makes them unique in their genre.",
    tracks: [{
      name: 'Crawl',
      duration: '2:33',
      url: "/swag-music-react/static/images/executors/superheaven/tracks/Crawl.mp3"
    },
    {
      name: "Knew",
      url: "/swag-music-react/static/images/executors/superheaven/tracks/Knew.mp3",
      duration: '1:18',
    },
    {
      name: "Life In A Jar",
      duration: '3:42',
      url: "/swag-music-react/static/images/executors/superheaven/tracks/Life In A Jar.mp3"
    },
    {
      name: "No One's Deserving",
      duration: '3:03',
      url: "/swag-music-react/static/images/executors/superheaven/tracks/No One's Deserving.mp3"
    },
    {
      name: "Sponge",
      duration: '4:23',
      url: "/swag-music-react/static/images/executors/superheaven/tracks/Sponge.mp3"
    },
    {
      name: "Youngest Daughter",
      duration: '4:09',
      url: "/swag-music-react/static/images/executors/superheaven/tracks/Youngest Daughter.mp3"
    },
    {
      name: "Outside Of Me",
      duration: "2:32",
      url: "/swag-music-react/static/images/executors/superheaven/tracks/Outside Of Me.mp3"
    },
    {
      name: "Sheltered",
      duration: "2:41",
      url: "/swag-music-react/static/images/executors/superheaven/tracks/Sheltered.mp3"
    },
    {
      name: "Last October",
      duration: "3:53",
      url: "/swag-music-react/static/images/executors/superheaven/tracks/Last October.mp3"
    },
    {
      name: "In On It",
      duration: "3:23",
      url: "/swag-music-react/static/images/executors/superheaven/tracks/In On It.mp3"
    },
    {
      name: "Hole In The Ground",
      duration: "4:32",
      url: "/swag-music-react/static/images/executors/superheaven/tracks/Hole In The Ground.mp3"
    },
    {
      name: "Around The Railing",
      duration: "5:09",
      url: "/swag-music-react/static/images/executors/superheaven/tracks/Around The Railing.mp3"
    },
  ],
  }],
}

const trapt = {
  name: 'Trapt',
  image: '/swag-music-react/static/images/executors/trapt/executor.webp',
  about: 'Trapt is an American rock band formed in Los Gatos, California, in 1995. The band is known for its post-grunge and alternative metal sound. The original lineup consisted of Chris Taylor Brown (vocals), Simon Ormandy (guitar), Peter Charell (bass), and David Stege (drums).',
  playlists: [{
    name: 'Trapt',
    image: '/swag-music-react/static/images/executors/trapt/album1.jpeg',
    information: 'The album "Trapt" was well-received and helped establish the band in the rock music scene. It remains a significant part of their discography. If you have any more questions or need further details, feel free to ask!',
    tracks: [{
      name: 'Echo',
      duration: '4:11',
      url: '/swag-music-react/static/images/executors/trapt/tracks/Echo.mp3'
    },
    {
      name: "Enigma",
      duration: '4:40',
      url: '/swag-music-react/static/images/executors/trapt/tracks/Enigma.mp3'
    },
    {
      name: "Headstrong",
      duration: '4:45',
      url: '/swag-music-react/static/images/executors/trapt/tracks/Headstrong.mp3'
    },
    {
      name: "Hollowman",
      duration: '5:03',
      url: '/swag-music-react/static/images/executors/trapt/tracks/Hollowman.mp3'
    },
    {
      name: "Made Of Glass",
      duration: '3:29',
      url: '/swag-music-react/static/images/executors/trapt/tracks/Glass.mp3'
    },
    {
      name: "New Beginning",
      duration: '9:12',
      url: '/swag-music-react/static/images/executors/trapt/tracks/Beginning.mp3'
    },
    {
      name: "Still Frame",
      duration: '4:31',
      url: '/swag-music-react/static/images/executors/trapt/tracks/Frame.mp3'
    },
    {
      name: "Stories",
      duration: '3:55',
      url: '/swag-music-react/static/images/executors/trapt/tracks/Stories.mp3'
    },
    {
      name: "The Game",
      duration: '5:05',
      url: '/swag-music-react/static/images/executors/trapt/tracks/The Game.mp3'
    },
    {
      name: "These Walls",
      duration: '4:05',
      url: '/swag-music-react/static/images/executors/trapt/tracks/These Walls.mp3'
    },
    {
      name: "When All Is Said And Done",
      duration: '4:16',
      url: '/swag-music-react/static/images/executors/trapt/tracks/When All Is Said And Done.mp3'
    },
    ],
  }],
};

const tyler = {
  name: 'Tyler, The Creator',
  image: '/swag-music-react/static/images/executors/tyler/executor.jpeg',
  about: "Tyler, The Creator is an American rapper, singer, songwriter, and record producer known for his innovative and genre-defying music. Born Tyler Gregory Okonma on March 6, 1991, in Ladera Heights, California, he first gained prominence as the co-founder and leader of the alternative hip-hop collective Odd Future.",
  playlists: [{
    name: 'IGOR',
    image: '/swag-music-react/static/images/executors/tyler/album1.jpeg',
    information: "IGOR is the fifth studio album by American rapper and producer Tyler, the Creator, released on May 17, 2019. The album blends hip hop, R&B, and neo-soul, showcasing Tyler's growth in production and lyrical content. It explores themes of love, heartbreak, and self-discovery, with Tyler adopting the persona of Igor. IGOR received critical acclaim for its unique sound and storytelling. Notable tracks include EARFQUAKE, I THINK, and A BOY IS A GUN. The album debuted at number one on the US Billboard 200 and won Best Rap Album at the 2020 Grammy Awards.",
    tracks: [{
      name: 'A BOY IS A GUN',
      duration: '3:30',
      url: '/swag-music-react/static/images/executors/tyler/tracks/A BOY IS A GUN.mp3'
    },
    {
      name: "ARE WE STILL FRIENDS",
      duration: '4:25',
      url: '/swag-music-react/static/images/executors/tyler/tracks/ARE WE STILL FRIENDS.mp3'
    },
    {
      name: "EARFQUAKE",
      duration: '3:10',
      url: '/swag-music-react/static/images/executors/tyler/tracks/EARFQUAKE.mp3'
    },
    {
      name: "EXACTLY WHAT YOU RUN FROM YOU END UP CHASING",
      duration: '0:14',
      url: '/swag-music-react/static/images/executors/tyler/tracks/EXACTLY WHAT YOU RUN FROM YOU END UP CHASING.mp3'
    },
    {
      name: "GONE, GONE THANK YOU",
      duration: '6:15',
      url: '/swag-music-react/static/images/executors/tyler/tracks/GONE, GONE THANK YOU.mp3'
    },
    {
      name: "I DON'T LOVE YOU ANYMORE",
      duration: '2:41',
      url: "/swag-music-react/static/images/executors/tyler/tracks/I DON'T LOVE YOU ANYMORE.mp3"
    },
    {
      name: "I THINK",
      duration: '3:32',
      url: '/swag-music-react/static/images/executors/tyler/tracks/I THINK.mp3'
    },
    {
      name: "IGOR'S THEME",
      duration: '3:20',
      url: "/swag-music-react/static/images/executors/tyler/tracks/IGOR'S THEME.mp3"
    },
    {
      name: "NEW MAGIC WAND",
      duration: '3:15',
      url: '/swag-music-react/static/images/executors/tyler/tracks/NEW MAGIC WAND.mp3'
    },
    {
      name: "PUPPET",
      duration: '2:59',
      url: '/swag-music-react/static/images/executors/tyler/tracks/PUPPET.mp3'
    },
    {
      name: "RUNNING OUT OF TIME",
      duration: '2:57',
      url: '/swag-music-react/static/images/executors/tyler/tracks/RUNNING OUT OF TIME.mp3'
    },
    {
      name: "WHAT'S GOOD",
      duration: '3:25',
      url: "/swag-music-react/static/images/executors/tyler/tracks/WHAT'S GOOD.mp3"
    },
    ],
  }],
};

const ssshhhiiittt = {
  name: 'ssshhhiiittt',
  image: '/swag-music-react/static/images/executors/ssshhhiiittt/executor.jpg',
  about: 'The band ssshhhiiittt is a Russian post-punk and synth-punk group formed in 2017. Their music is characterized by an aggressive sound, dark lyrics, and energetic performances. The band quickly gained popularity in the Russian alternative scene due to their unique style and powerful energy. The main members are vocalist Ivan Ivanov, guitarist Alexey Petrov, bassist Dmitry Sidorov, and drummer Sergey Kuznetsov. They have released several albums and singles, receiving positive reviews from both critics and listeners. Their music addresses themes of social alienation, inner struggle, and resistance against the system. ssshhhiiittt continues to actively perform and record new music, attracting attention from both Russian and international audiences.',
  playlists: [{
    name: 'Зло',
    image: '/swag-music-react/static/images/executors/ssshhhiiittt/album1.jpg',
    information: 'The album "Зло" by the band ssshhhiiittt was released on March 1, 2019. This album is a mix of post-punk and synth-punk, characterized by aggressive sound and dark lyrics. The themes of the album include social alienation, inner conflicts, and fighting against the system. "Зло" received positive reviews for its energy and unique style. Notable tracks include "Танцы на костях," "Пустота," and "Зло." The album helped the band establish themselves in the Russian alternative scene and attracted international attention.',
    tracks: [{
      name: 'Вишенка',
      duration: '4:35',
      url: '/swag-music-react/static/images/executors/ssshhhiiittt/tracks/Вишенка.mp3'
    },
    {
      name: "Дворы",
      duration: '2:44',
      url: '/swag-music-react/static/images/executors/ssshhhiiittt/tracks/Дворы.mp3'
    },
    {
      name: "Зверь",
      duration: '2:59',
      url: '/swag-music-react/static/images/executors/ssshhhiiittt/tracks/Зверь.mp3'
    },
    {
      name: "Когда-нибудь",
      duration: '2:51',
      url: '/swag-music-react/static/images/executors/ssshhhiiittt/tracks/Когда-нибудь.mp3'
    },
    {
      name: "Не скучай",
      duration: '4:13',
      url: '/swag-music-react/static/images/executors/ssshhhiiittt/tracks/Не скучай.mp3'
    },
    {
      name: "Самый худший ученик",
      duration: '4:20',
      url: '/swag-music-react/static/images/executors/ssshhhiiittt/tracks/Самый худший ученик.mp3'
    },
    {
      name: "Сгорел",
      duration: '2:09',
      url: '/swag-music-react/static/images/executors/ssshhhiiittt/tracks/Сгорел.mp3'
    },
    {
      name: "Тебя нет",
      duration: '4:22',
      url: '/swag-music-react/static/images/executors/ssshhhiiittt/tracks/Тебя нет.mp3'
    },
    ],
  }],
};

const saluki = {
  name: 'SALUKI',
  image: '/swag-music-react/static/images/executors/saluki/executor.jpg',
  about: 'Saluki is a Russian musical project that combines elements of hip-hop, rap, and electronic music. The project was founded in 2017 and quickly gained popularity due to its unique sound and experimental approach to music. Saluki is known for its deep lyrics that touch on themes of personal experiences, social issues, and inner struggles.',
  playlists: [{
    name: 'Огней',
    image: '/swag-music-react/static/images/executors/saluki/album1.png',
    information: "The track 'Огней' is one of Saluki's popular songs. In this song, the artist explores themes of loneliness, self-discovery, and striving for light in dark times. The music and lyrics create an atmosphere that immerses the listener in a world of emotions and reflections. 'Огней' has received positive reviews from both critics and listeners and continues to be an important part of Saluki's work.",
    tracks: [{
      name: 'Огней',
      duration: '3:01',
      url: '/swag-music-react/static/images/executors/saluki/tracks/Огней.mp3'
      },
    ],
  }],
}

const pepel = {
  name: 'Pepel Nahudi',
  image: '/swag-music-react/static/images/executors/pepel/executor.jpg',
  about: 'Pepel Nahudi is a Russian musician known for his experimental and psychedelic compositions. His music combines elements of various genres, creating unique soundscapes. One of his well-known albums is "Psychedelic Love," which features tracks that explore deep and colorful dreams, sounds of the universe, and the world of illusions. Pepel Nahudi continues to experiment with new sounds and styles, attracting listeners with his originality and depth of musical works.',
  playlists: [{
    name: 'Psychedelic Love',
    image: '/swag-music-react/static/images/executors/pepel/album1.jpg',
    information: "Psychedelic Love is an album by the Russian musician Pepel Nahudi. Known for his experimental and psychedelic compositions, Pepel Nahudi combines elements of various genres to create unique soundscapes. The album 'Psychedelic Love' features tracks that delve into themes such as deep and colorful dreams, the sounds of the universe, and the world of illusions. Pepel Nahudi continues to experiment with new sounds and styles, captivating listeners with his originality and the depth of his musical works.",
    tracks: [{
      name: 'КТО ТЕБЕ ЭТО СКАЗАЛ',
      duration: '2:13',
      url: '/swag-music-react/static/images/executors/pepel/tracks/КТО ТЕБЕ ЭТО СКАЗАЛ.mp3'
      },
      {
        name: 'AUDIODRUG',
        duration: '1:54',
        url: '/swag-music-react/static/images/executors/pepel/tracks/AUDIODRUG.mp3'
      },
      {
        name: "DON'T CALL ME",
        duration: '2:04',
        url: "/swag-music-react/static/images/executors/pepel/tracks/DON'T CALL ME.mp3"
      },
      {
        name: 'ОБЪЯСНЕНИЯ',
        duration: '2:12',
        url: '/swag-music-react/static/images/executors/pepel/tracks/ОБЪЯСНЕНИЯ.mp3'
      },
      {
        name: '#F_CKITALL',
        duration: '2:00',
        url: "/swag-music-react/static/images/executors/pepel/tracks/#F_CKITALL.mp3"
      },
      {
        name: 'ТЫ МЕНЯ РАЗЛЮБИ',
        duration: '1:52',
        url: '/swag-music-react/static/images/executors/pepel/tracks/ТЫ МЕНЯ РАЗЛЮБИ.mp3'
      },
    ],
  },
  {
    name: 'KINGDOM MADE',
    image: '/swag-music-react/static/images/executors/pepel/album2.png',
    information: "I couldn't find specific information about an album titled 'KINGDOM MADE'. It's possible that it might be a new or lesser-known release, or it might be from an independent artist. If you have more details about the artist or any specific tracks from the album, please provide them, and I'll do my best to help you with the information.",
    tracks: [{
      name: 'Ненадолго',
      duration: '2:28',
      url: '/swag-music-react/static/images/executors/pepel/tracks/Ненадолго.mp3'
      },
      {
        name: 'Всё чем дорожил',
        duration: '2:13',
        url: '/swag-music-react/static/images/executors/pepel/tracks/Всё чем дорожил.mp3'
      },
      {
        name: "Заново завоевать",
        duration: '1:52',
        url: "/swag-music-react/static/images/executors/pepel/tracks/Заново завоевать.mp3"
      },
      {
        name: 'Дай мне',
        duration: '1:55',
        url: '/swag-music-react/static/images/executors/pepel/tracks/Дай мне.mp3'
      },
      {
        name: 'Тунайт',
        duration: '2:40',
        url: "/swag-music-react/static/images/executors/pepel/tracks/Тунайт.mp3"
      },
      {
        name: 'Вдохновения',
        duration: '2:22',
        url: '/swag-music-react/static/images/executors/pepel/tracks/Вдохновения.mp3'
      },
      {
        name: "Так сложилось",
        duration: '1:48',
        url: "/swag-music-react/static/images/executors/pepel/tracks/Так сложилось.mp3"
      },
      {
        name: 'Минерал',
        duration: '2:35',
        url: '/swag-music-react/static/images/executors/pepel/tracks/Минерал.mp3'
      },
      {
        name: 'Звезда упала',
        duration: '2:13',
        url: "/swag-music-react/static/images/executors/pepel/tracks/Звезда упала.mp3"
      },
      {
        name: 'Мы не видели рая Последний вдох',
        duration: '1:57',
        url: '/swag-music-react/static/images/executors/pepel/tracks/Мы не видели рая Последний вдох.mp3'
      },
    ],
  }
  ],
}

const crystalcastles = {
  name: 'Crystal Castles',
  image: '/swag-music-react/static/images/executors/crystalcastles/executor.jpg',
  about: "Crystal Castles is an electronic music duo from Toronto, Ontario, Canada, formed in 2006. The duo consists of producer Ethan Kath and, originally, vocalist Alice Glass. They are known for their chaotic live shows and lo-fi melancholic homemade productions. Their music is characterized by a mix of synth-pop, noise, and experimental elements.",
  playlists: [{
    name: 'Crystal Castles',
    image: '/swag-music-react/static/images/executors/crystalcastles/album1.png',
    information: "Crystal Castles, a Canadian electronic band, has released several albums. Their debut album, 'Crystal Castles,' was released in 2008 and features tracks like 'Alice Practice,' 'Crimewave,' and 'Untrust Us.' The album is known for its raw and experimental sound. Their second album, 'Crystal Castles (II),' was released in 2010 and includes songs like 'Celestica,' 'Baptism,' and 'Not in Love' (featuring Robert Smith of The Cure). This album continues the band's signature electronic and experimental style. In 2012, they released their third album, 'Crystal Castles (III),' which features tracks such as 'Plague,' 'Wrath of God,' and 'Sad Eyes.' This album has a darker and more melancholic tone compared to their previous works. Their fourth album, 'Amnesty (I),' was released in 2016 and is the first album after the departure of original vocalist Alice Glass. It includes songs like 'Char,' 'Concrete,' and 'Fleece.' This album introduces new vocalist Edith Frances and continues the band's electronic and experimental sound. If you have any specific questions about any of these albums or need more details, feel free to ask!",
    tracks: [
      {
        name: "Untrust Us",
        duration: "3:06",
        url: "/swag-music-react/static/images/executors/crystalcastles/tracks/Untrust Us.mp3"
      },
      {
        name: "Alice Practice",
        duration: "2:41",
        url: "/swag-music-react/static/images/executors/crystalcastles/tracks/Alice Practice.mp3"
      },
      {
        name: "Crimewave",
        duration: "4:18",
        url: "/swag-music-react/static/images/executors/crystalcastles/tracks/Crimewave.mp3"
      },
      {
        name: "Magic Spells",
        duration: "6:07",
        url: "/swag-music-react/static/images/executors/crystalcastles/tracks/Magic Spells.mp3"
      },
      {
        name: "Xxzxcuzx Me",
        duration: "1:54",
        url: "/swag-music-react/static/images/executors/crystalcastles/tracks/Xxzxcuzx me.mp3"
      },
      {
        name: "Air War",
        duration: "4:07",
        url: "/swag-music-react/static/images/executors/crystalcastles/tracks/Air War.mp3"
      },
      {
        name: "Courtship Dating",
        duration: "3:32",
        url: "/swag-music-react/static/images/executors/crystalcastles/tracks/Courtship Dating.mp3"
      },
      {
        name: "Good Time",
        duration: "2:59",
        url: "/swag-music-react/static/images/executors/crystalcastles/tracks/Good Time.mp3"
      },
      {
        name: "1991",
        duration: "1:53",
        url: "/swag-music-react/static/images/executors/crystalcastles/tracks/1991.mp3"
      },
      {
        name: "Vanished",
        duration: "4:02",
        url: "/swag-music-react/static/images/executors/crystalcastles/tracks/Vanished.mp3"
      },
      {
        name: "Knights",
        duration: "3:00",
        url: "/swag-music-react/static/images/executors/crystalcastles/tracks/Knights.mp3"
      },
      {
        name: "Love and Caring",
        duration: "2:19",
        url: "/swag-music-react/static/images/executors/crystalcastles/tracks/Love And Caring.mp3"
      },
      {
        name: "Through the Hosiery",
        duration: "3:06",
        url: "/swag-music-react/static/images/executors/crystalcastles/tracks/Through The Hosiery.mp3"
      },
      {
        name: "Reckless",
        duration: "3:28",
        url: "/swag-music-react/static/images/executors/crystalcastles/tracks/Reckless.mp3"
      },
      {
        name: "Black Panther",
        duration: "2:57",
        url: "/swag-music-react/static/images/executors/crystalcastles/tracks/Black Panther.mp3"
      },
      {
        name: "Tell Me What to Swallow",
        duration: "2:14",
        url: "/swag-music-react/static/images/executors/crystalcastles/tracks/Tell Me What To Swallow.mp3"
      }      
    ],
  },
  {
    name: 'Alice Practice',
    image: '/swag-music-react/static/images/executors/crystalcastles/album2.jpg',
    information: "'Alice Practice' is a song by the Canadian electronic band Crystal Castles. It was released as the band's debut single in 2006 and later included in their self-titled debut album, 'Crystal Castles', which was released in 2008.",
    tracks: [{
      name: 'Alice Practice',
      duration: '2:43',
      url: '/swag-music-react/static/images/executors/crystalcastles/tracks/Alice Practice.mp3'
      },
    ],
  }],
}

const articlesServer = [
  {
    name: "Inside '47-Revolution and World': Dzhizus' Masterpiece of Change and Reflection",
    title: "Dzhizus' album '47-Revolution and World' is a powerful narrative of transformation and global awareness, marrying evocative lyrics with inventive soundscapes. This article delves into the heart of '47-Revolution and World,' uncovering its core themes of revolution, self-discovery, and societal change. Explore how Dzhizus utilizes a fusion of musical genres and cutting-edge production techniques to create a profound listening experience. Join us as we break down the album's artistic vision and its impact on modern music, showcasing Dzhizus' talent for capturing the zeitgeist of our tumultuous times.",
    image: "/swag-music-react/static/images/blog/article1/first.jpg",
    image_2: "/swag-music-react/static/images/blog/article1/second.jpeg",
    subtitle: "Vladislav Dmitrievich Kozikhov, known by his stage name Dzhizus, is a Russian musician, singer, and songwriter. Born on October 9, 1994, he is recognized for his unique blend of hip-hop, electronic, and rock music. His emotionally charged lyrics often explore themes of love, loss, self-discovery, and social issues. Dzhizus gained popularity in the late 2010s and continues to be an influential figure in contemporary music."
  },
  {
    name: "Exploring 'Не Пара': Inside Dzhizus' Remarkable Album",
    title: "Dzhizus' album 'Не Пара' is a captivating exploration of deep emotions and innovative soundscapes. This article delves into the heart of 'Не Пара,' analyzing its poignant lyrics, diverse musical influences, and the artistic vision that defines Dzhizus' work. Discover how Dzhizus crafts a narrative of love, loss, and self-reflection, creating a powerful and resonant experience for listeners. Join us as we unpack the themes, production techniques, and creative inspiration behind 'Не Пара,' highlighting its significance in the contemporary music scene.",
    image: '/swag-music-react/static/images/blog/article2/first.jpg',
    image_2: "/swag-music-react/static/images/blog/article2/second.jpeg",
    subtitle: "Vladislav Dmitrievich Kozikhov, known by his stage name Dzhizus, is a Russian musician, singer, and songwriter. Born on October 9, 1994, he is recognized for his unique blend of hip-hop, electronic, and rock music. His emotionally charged lyrics often explore themes of love, loss, self-discovery, and social issues. Dzhizus gained popularity in the late 2010s and continues to be an influential figure in contemporary music."
  },
  {
    name: "The Heat of 'Hotshot': Unveiling Toxi$' Explosive New Album",
    title: "Toxi$'s latest album 'Hotshot' bursts onto the scene with high energy, captivating beats, and sharp lyricism. This article takes an in-depth look at 'Hotshot,' exploring its standout tracks, innovative production, and the themes permeating Toxi$'s fiery delivery. Dive into the creative process behind the album and understand how Toxi$ continues to push the boundaries of the contemporary music landscape. With its dynamic sound and bold personality, 'Hotshot' is set to solidify Toxi$'s place as a force to be reckoned with in the industry.",
    image: '/swag-music-react/static/images/blog/article3/first.png',
    image_2: "/swag-music-react/static/images/blog/article3/second.jpeg",
    subtitle: "'HOTSHOT' is the latest album by Russian hip-hop artist Toxi$, released in 2023. Known for his distinctive blend of trap, hip-hop, and electronic music, Toxi$ delivers an album that is both innovative and deeply personal."
  },
  {
    name: "Exploring the Depths of 'Jar': A Journey Through Superheaven's Seminal Album",
    title: "Superheaven's album 'Jar' is a powerful exploration of angst, raw emotion, and grunge-influenced soundscapes. In this article, we delve into the themes and musicality that define 'Jar,' examining its impact on the alternative rock scene. Discover how Superheaven masterfully blends heavy riffs and introspective lyrics to create a compelling narrative that resonates with listeners. From the production nuances to the emotional intensity, 'Jar' stands as a significant milestone in the band's discography and a poignant reflection on the struggles of youth and identity.",
    image: '/swag-music-react/static/images/blog/article4/first.jpeg',
    image_2: "/swag-music-react/static/images/blog/article4/second.png",
    subtitle: "Superheaven is an American rock band known for their grunge-influenced sound and emotionally charged lyrics. Formed in 2008 in Doylestown, Pennsylvania, the band originally went by the name Daylight before rebranding to Superheaven in 2014. Their music blends elements of alternative rock, grunge, and punk, creating a nostalgic yet fresh sound that resonates with fans of 90s rock."
  },
  {
    name: "Unpacking 'IGOR': A Sonic and Emotional Odyssey by Tyler, The Creator",
    title: "Tyler, The Creator's album 'IGOR' is a masterful blend of genre-defying music and raw, emotional storytelling. In this article, we delve into the intricate production, lyrical themes, and artistic vision behind 'IGOR'. Explore how Tyler navigates through the complexities of love, heartbreak, and self-discovery, creating an album that resonates deeply with listeners. From the vibrant instrumentation to the introspective lyrics, 'IGOR' stands as a testament to Tyler's evolution as an artist and his ability to craft a compelling narrative through music.",
    image: '/swag-music-react/static/images/blog/article5/first.jpeg',
    image_2: "/swag-music-react/static/images/blog/article5/second.jpeg",
    subtitle: "Tyler, The Creator is an American rapper, singer, songwriter, and record producer known for his innovative and genre-defying music. Born Tyler Gregory Okonma on March 6, 1991, in Ladera Heights, California, he first gained prominence as the co-founder and leader of the alternative hip-hop collective Odd Future.",
  },
  {
    name: 'The Artistic Evolution of Toxi$: A Dive into the Music and Vision of a Rising Star',
    title: "Toxi$ is not just a name; it's a movement in the world of contemporary music and art. This article delves into the creative journey of Toxi$, exploring the unique blend of genres, lyrical depth, and visual aesthetics that define their work. From early beginnings to recent breakthroughs, discover how Toxi$ is pushing boundaries, influencing the industry, and connecting with a diverse audience on a profound level.",
    image: '/swag-music-react/static/images/blog/article6/first.jpg',
    image_2: "/swag-music-react/static/images/blog/article6/second.webp",
    subtitle: "Andrey Smelyanskiy, known as Toxi$, is a rising Russian musician blending hip-hop, trap, and electronic music. Starting his career in the early 2020s, he quickly gained recognition with his emotionally rich tracks that explore personal and social themes. Collaborating with various artists, Toxi$ experiments with new sounds and styles. His energetic performances and charismatic stage presence make his concerts unforgettable. As he continues to release new music, Toxi$ is steadily climbing the ranks of the music industry."
  },
  {
    name: 'Favorite monkeys',
    title: 'Feel like a beautiful monkey, free to sleep all your life.',
    image: '/swag-music-react/static/images/blog/article7/first.jpg',
    image_2: '/swag-music-react/static/images/blog/article7/second.jpg',
    subtitle: "Monkeys captivate many with their intelligence and playfulness. Here are a few favorites: 1. Chimpanzees: Intelligent primates that use tools and communicate with gestures. They live in complex social groups.<br>2. Orangutans: Wise and calm, these primates from Borneo and Sumatra spend much time in trees, eating fruit. 3. Gorillas: The largest primates, living in family groups. They symbolize strength and tranquility. 4. Capuchins: Small but smart monkeys known for their curiosity and learning ability. 5. Macaques: Common in Asia, these monkeys have complex social hierarchies and adapt well to living near humans."
  },
  {
    name: 'Btlushka || tongjeeeung',
    title: 'All about the creator of "SwAg Shop" & "SwAg MuSSSiC".',
    image: '/swag-music-react/static/images/blog/article8/first.jpg',
    image_2: '/swag-music-react/static/images/blog/article8/second.jpg',
    subtitle: '', 
  },
  {
    name: 'Skate music',
    title: 'Skate music is a genre closely associated with skateboarding culture, serving as its energetic and rebellious soundtrack. It began in the late 1970s and early 1980s, heavily influenced by punk rock bands like The Ramones and Black Flag, whose fast-paced and aggressive sound resonated with skaters. Over time, skate music has expanded to include elements of hip-hop, alternative rock, and even electronic music, reflecting the eclectic tastes of the skateboarding community.',
    image: '/swag-music-react/static/images/blog/article9/first.avif',
    image_2: '/swag-music-react/static/images/blog/article9/second.avif',
    subtitle: "Skateboarding videos have played a significant role in popularizing skate music. These videos often feature soundtracks that introduce new tracks and artists to skaters, creating a symbiotic relationship between the sport and the music. Skate music is more than just background noise; it influences the fashion, language, and attitudes within the skateboarding community, helping to create a unique and vibrant subculture."
  },
  {
    name: 'New freshmen 2024',
    title: 'In 2024, new vibrant artists are emerging on the music scene, capturing attention with their unique sounds and fresh ideas. Among them are young musicians who blend various genres to create something entirely new and unusual. These artists actively use social media and streaming platforms to promote their music, allowing them to quickly gain popularity and find their audience worldwide.',
    image: '/swag-music-react/static/images/blog/article10/first.jpg',
    image_2: '/swag-music-react/static/images/blog/article10/second.jpg',
    subtitle: "Some of them have already released debut albums that have received positive reviews from critics and listeners. Their music often reflects contemporary trends and issues, making it particularly relevant for the younger generation. In 2024, we can expect many interesting releases and concerts from these new talents, who will undoubtedly shape the musical landscape of the coming years."
  }
]

const initializeDatabase = async () => {
  try {
    const artists = [jesus, toxis, tyler, superheaven, trapt, saluki, ssshhhiiittt, crystalcastles, pepel];
    const blogs = articlesServer;

    // Инициализация артистов
    for (const artistData of artists) {
      const existingArtist = await Artist.findOne({ name: artistData.name });

      const artistId = existingArtist ? existingArtist._id : uuidv4();

      const playlists = artistData.playlists.map(playlist => {
        let playlistId = playlist._id;

        if (existingArtist) {
          const existingPlaylist = existingArtist.playlists.find(p => p.name === playlist.name);
          if (existingPlaylist) {
            playlistId = existingPlaylist._id;
          }
        } else {
          playlistId = uuidv4();
        }

        const tracks = playlist.tracks.map(track => {
          let trackId = track._id;
          let auditions = track.auditions || 0;

          if (existingArtist) {
            const existingTrack = existingArtist.playlists
              .find(p => p._id.toString() === playlistId.toString())
              ?.tracks.find(t => t.name === track.name);
            if (existingTrack) {
              trackId = existingTrack._id;
              auditions = existingTrack.auditions; // Сохраняем существующие прослушивания
            }
          } else {
            trackId = uuidv4();
          }

          return {
            ...track,
            _id: trackId,
            albumId: playlistId,
            image: playlist.image, // Устанавливаем изображение альбома
            auditions, // Сохраняем или устанавливаем прослушивания
            executor: artistData.name, // Устанавливаем имя исполнителя
            executorID: artistId // Устанавливаем ID исполнителя
          };
        });

        return {
          ...playlist,
          _id: playlistId,
          tracks,
          executor: artistData.name, // Устанавливаем имя исполнителя
          executorID: artistId // Устанавливаем ID исполнителя
        };
      });

      const artist = await Artist.findOneAndUpdate(
        { name: artistData.name },
        {
          name: artistData.name,
          image: artistData.image,
          about: artistData.about,
          playlists
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      console.log(`Артист ${artistData.name} успешно добавлен или обновлен в базе данных`);
    }

    // Инициализация блогов
    for (const blogData of blogs) {
      if (!blogData._id) {
        blogData._id = uuidv4();
      }

      const blog = await Blog.findOneAndUpdate(
        { _id: blogData._id },
        blogData,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      console.log(`Блог ${blogData.name} успешно добавлен или обновлен в базе данных`);
    }
  } catch (error) {
    console.error('Ошибка при инициализации базы данных:', error);
  }
};

const removeDuplicateArtists = async () => {
  try {
    const artists = await Artist.aggregate([
      {
        $group: {
          _id: { name: "$name" },
          uniqueIds: { $addToSet: "$_id" },
          count: { $sum: 1 }
        }
      },
      {
        $match: {
          count: { $gt: 1 }
        }
      }
    ]);

    for (const artist of artists) {
      artist.uniqueIds.shift();
      await Artist.deleteMany({ _id: { $in: artist.uniqueIds } });
    }

    console.log('Дублирующиеся записи успешно удалены');
  } catch (error) {
    console.error('Ошибка при удалении дублирующихся записей:', error);
  }
};

// Вызов функции для удаления дублирующихся записей
removeDuplicateArtists();

export default initializeDatabase;