// 数据相关的工具函数

// 完整心情分类
const FULL_MOODS = [
  { id: 'happy', label: '开心', emoji: '😊', color: '#FFD93D', positive: true },
  { id: 'peaceful', label: '平静', emoji: '😌', color: '#7BC8F6', positive: true },
  { id: 'tired', label: '疲惫', emoji: '😴', color: '#A8E6CF', positive: false },
  { id: 'anxious', label: '焦虑', emoji: '😰', color: '#FFB347', positive: false },
  { id: 'sad', label: '难过', emoji: '😢', color: '#98D8C8', positive: false },
  { id: 'depressed', label: '抑郁', emoji: '💔', color: '#B7B7D1', positive: false },
  { id: 'irritated', label: '烦躁', emoji: '😠', color: '#FF6B6B', positive: false },
  { id: 'lonely', label: '孤独', emoji: '🌙', color: '#C9B1FF', positive: false },
  { id: 'angry', label: '生气', emoji: '😤', color: '#FF8A80', positive: false },
  { id: 'lost', label: '失落', emoji: '😔', color: '#D1C4E9', positive: false },
  { id: 'blessed', label: '幸福', emoji: '🥰', color: '#FFD1DC', positive: true },
  { id: 'satisfied', label: '满足', emoji: '☺️', color: '#C5E1A5', positive: true }
]

const MOOD_CATEGORIES = [
  { id: 'depressed', keywords: ['抑郁', '压抑', '消沉', '抑郁症', '绝望'], emoji: '💔', label: '抑郁' },
  { id: 'sad', keywords: ['难过', '悲伤', '伤心', '心碎', '悲痛'], emoji: '😢', label: '难过' },
  { id: 'anxious', keywords: ['焦虑', '紧张', '不安', '恐慌', '焦虑症'], emoji: '😰', label: '焦虑' },
  { id: 'tired', keywords: ['疲惫', '累', '疲劳', '困乏', '疲倦'], emoji: '😴', label: '疲惫' },
  { id: 'lonely', keywords: ['孤独', '寂寞', '孤单', '独处', '无人理解'], emoji: '🌙', label: '孤独' },
  { id: 'irritated', keywords: ['烦躁', '烦', '暴躁', '恼火', '心烦'], emoji: '😠', label: '烦躁' },
  { id: 'lost', keywords: ['低落', '沮丧', '颓废', '消极', '泄气'], emoji: '😔', label: '低落' },
  { id: 'happy', keywords: ['开心', '快乐', '高兴', '愉快', '喜悦'], emoji: '😊', label: '开心' },
  { id: 'peaceful', keywords: ['平静', '宁静', '放松', '安宁'], emoji: '😌', label: '平静' },
  { id: 'satisfied', keywords: ['满足', '满意'], emoji: '☺️', label: '满足' }
]

// 数据库（简化版）
const SONG_DB = {
  depressed: [
    { title: 'Fix You', artist: 'Coldplay' },
    { title: 'Someone Like You', artist: 'Adele' },
    { title: 'Yesterday', artist: 'The Beatles' },
    { title: 'Let It Be', artist: 'The Beatles' },
    { title: 'Hallelujah', artist: 'Jeff Buckley' }
  ],
  sad: [
    { title: 'When You\'re Gone', artist: 'Shawn Mendes' },
    { title: 'Back to December', artist: 'Taylor Swift' },
    { title: 'Hello', artist: 'Adele' },
    { title: 'Perfect', artist: 'Ed Sheeran' },
    { title: 'The Sound of Silence', artist: 'Simon & Garfunkel' }
  ],
  anxious: [
    { title: 'Weightless', artist: 'Marconi Union' },
    { title: 'Mellotron', artist: 'Moby' },
    { title: 'Blinding Lights', artist: 'The Weeknd' },
    { title: 'Levitating', artist: 'Dua Lipa' },
    { title: 'Dreams', artist: 'Fleetwood Mac' }
  ],
  tired: [
    { title: 'Dreams', artist: 'Fleetwood Mac' },
    { title: 'Sunflower', artist: 'Post Malone' },
    { title: 'Happy', artist: 'Pharrell Williams' },
    { title: 'Can\'t Stop the Feeling', artist: 'Justin Timberlake' },
    { title: 'Shake It Off', artist: 'Taylor Swift' }
  ],
  lonely: [
    { title: 'Here Comes the Sun', artist: 'The Beatles' },
    { title: 'Space Oddity', artist: 'David Bowie' },
    { title: 'Bohemian Rhapsody', artist: 'Queen' },
    { title: 'We Are the Champions', artist: 'Queen' },
    { title: 'Somebody to Love', artist: 'Queen' }
  ],
  irritated: [
    { title: 'In the Air Tonight', artist: 'Phil Collins' },
    { title: 'Take On Me', artist: 'a-ha' },
    { title: 'Dancing in the Street', artist: 'Mick Jagger & David Bowie' },
    { title: 'Wake Me Up Before You Go-Go', artist: 'Wham!' },
    { title: 'Careless Whisper', artist: 'George Michael' }
  ],
  lost: [
    { title: 'Rise Up', artist: 'Andra Day' },
    { title: 'Fight Song', artist: 'Rachel Platten' },
    { title: 'Roar', artist: 'Katy Perry' },
    { title: 'Firework', artist: 'Katy Perry' },
    { title: 'Stronger', artist: 'Kelly Clarkson' }
  ],
  happy: [
    { title: 'Good as Hell', artist: 'Lizzo' },
    { title: 'Uptown Funk', artist: 'Mark Ronson' },
    { title: 'Locked Out of Heaven', artist: 'Bruno Mars' },
    { title: '24K Magic', artist: 'Bruno Mars' },
    { title: 'Shut Up and Dance', artist: 'Walk the Moon' }
  ],
  peaceful: [
    { title: 'Here Comes the Sun', artist: 'The Beatles' },
    { title: 'Let It Be', artist: 'The Beatles' },
    { title: 'Golden Slumbers', artist: 'The Beatles' },
    { title: 'Something', artist: 'The Beatles' },
    { title: 'Blackbird', artist: 'The Beatles' }
  ],
  satisfied: [
    { title: 'Best Day of My Life', artist: 'American Authors' },
    { title: 'Shut Up and Dance', artist: 'Walk the Moon' },
    { title: 'Can\'t Feel My Face', artist: 'The Weeknd' },
    { title: 'Starboy', artist: 'The Weeknd' },
    { title: 'Blinding Lights', artist: 'The Weeknd' }
  ]
}

const BOOK_DB = {
  depressed: [
    { title: '蛤蟆先生去看心理医生', author: '罗伯特·戴博德', reason: '童话形式讲述心理咨询，温暖有力量，是走出抑郁的温柔指南。全书没有复杂专业术语，让你在阅读中不知不觉获得治愈。' },
    { title: '也许你该找个人聊聊', author: '洛莉·戈特利布', reason: '心理治疗师的真实故事，让你看到每个人都值得被倾听和理解。读这本书就像在安全的空间里和智慧温暖的朋友聊天。' }
  ],
  sad: [
    { title: '解忧杂货店', author: '东野圭吾', reason: '温暖奇幻的故事，每个烦恼都能在杂货店找到答案。五个独立又相互关联的故事，织成一张温柔的网，相信人生每一个选择都有意义。' },
    { title: '小王子', author: '安托万·德·圣-埃克苏佩里', reason: '写给大人的童话，关于爱与驯服，抚平内心的伤口。让我们记起真正重要的东西，是用心才能看见的。' }
  ],
  anxious: [
    { title: '正念：此刻是一枝花', author: '乔·卡巴金', reason: '正念减压创始人的奠基之作，通过系统练习在焦虑中找到平静的锚点。没有复杂理论，只有可操作的方法。' },
    { title: '焦虑的人', author: '弗雷德里克·巴克曼', reason: '新年夜人质劫持故事，一群被焦虑困住的人在荒诞中找到救赎。让我们看到焦虑如此普遍，不必因焦虑而焦虑。' }
  ],
  tired: [
    { title: '瓦尔登湖', author: '亨利·戴维·梭罗', reason: '简单生活的经典，文字如湖水清澈，给疲惫的心最温柔抚慰。让你重新思考幸福的本质。' },
    { title: '慢煮生活', author: '汪曾祺', reason: '美食散文精选，充满人间烟火气。读这本书不用费神，跟着吃吃喝喝，心就慢慢暖起来。' }
  ],
  lonely: [
    { title: '百年孤独', author: '加西亚·马尔克斯', reason: '魔幻现实主义巅峰之作，让我们看到孤独或许是人生常态，但正是孤独赋予人生深刻意义。' },
    { title: '质数的孤独', author: '保罗·乔尔达诺', reason: '两个像质数一样孤独的灵魂的故事。这本书不会给你虚假安慰，但会让你知道你体验过的孤独，有人懂。' }
  ],
  irritated: [
    { title: '菜根谭', author: '洪应明', reason: '明代处世格言集，字字珠玑。在烦躁时翻开读一段，让心慢慢静下来。一本可以读一辈子的书。' },
    { title: '断舍离', author: '山下英子', reason: '通过整理物品整理内心，让生活空间变清爽时，内心的烦躁也会随之减少。' }
  ],
  lost: [
    { title: '少有人走的路', author: 'M·斯科特·派克', reason: '心智成熟的经典之作，告诉我们如何面对人生苦难，在迷失中找到方向。在低落时给你重新站起来的勇气。' },
    { title: '被讨厌的勇气', author: '岸见一郎', reason: '对话体讲阿德勒心理学，让你放下过去的负担，勇敢做自己。在迷茫时给你全新的视角。' }
  ],
  happy: [
    { title: '小王子', author: '安托万·德·圣-埃克苏佩里', reason: '写给大人的童话，让你在忙碌中记起曾经的纯真。开心时读它会让快乐更纯粹。' },
    { title: '解忧杂货店', author: '东野圭吾', reason: '温暖奇幻的故事，让你更相信这个世界的美好。' }
  ],
  peaceful: [
    { title: '瓦尔登湖', author: '亨利·戴维·梭罗', reason: '简单生活的经典，让喧嚣的心安静下来。在平静中获得力量。' },
    { title: '菜根谭', author: '洪应明', reason: '明代处世格言集，适合随时翻开读一段。' }
  ],
  satisfied: [
    { title: '幸福之路', author: '伯特兰·罗素', reason: '哲学家谈幸福，不空谈大道理，从具体生活出发，告诉我们如何获得幸福。满足时读，让你更懂珍惜。' },
    { title: '心流', author: '米哈里·契克森米哈赖', reason: '心流理论奠基之作，告诉我们如何在全神贯注中获得深度满足。' }
  ]
}

module.exports = {
  FULL_MOODS,
  MOOD_CATEGORIES,
  SONG_DB,
  BOOK_DB
}
