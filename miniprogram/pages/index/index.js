// pages/index/index.js
const { FULL_MOODS, MOOD_CATEGORIES, SONG_DB, BOOK_DB } = require('../../utils/data.js')

Page({
  data: {
    moods: FULL_MOODS,
    selectedMood: null,
    quickMoods: ['抑郁', '难过', '焦虑', '疲惫', '孤独', '烦躁', '开心', '平静'],
    inputValue: '',
    showResult: false,
    resultEmoji: '🌿',
    currentMood: '',
    categoryLabel: '',
    songs: [],
    displaySongs: [],
    books: [],
    showAllSongs: false,
    favorites: []
  },

  onLoad() {
    this.loadFavorites()
    this.loadTodayMood()
  },

  loadTodayMood() {
    const today = this.getDayKey()
    const dailyRecords = wx.getStorageSync('dailyMoodRecords') || {}
    if (dailyRecords[today]) {
      this.setData({ selectedMood: dailyRecords[today].moodId })
    }
  },

  getDayKey() {
    const date = new Date()
    return date.toISOString().split('T')[0]
  },

  selectMood(e) {
    this.setData({ selectedMood: e.currentTarget.dataset.id })
  },

  saveDailyMood() {
    const { selectedMood } = this.data
    if (!selectedMood) {
      wx.showToast({ title: '请先选择一个心情', icon: 'none' })
      return
    }

    const mood = FULL_MOODS.find(m => m.id === selectedMood)
    const records = wx.getStorageSync('dailyMoodRecords') || {}
    const today = this.getDayKey()
    
    records[today] = {
      moodId: mood.id,
      label: mood.label,
      emoji: mood.emoji,
      color: mood.color,
      positive: mood.positive,
      timestamp: Date.now()
    }

    wx.setStorageSync('dailyMoodRecords', records)
    
    wx.showToast({
      title: '今日心情已保存！',
      icon: 'success'
    })
  },

  handleInput(e) {
    this.setData({ inputValue: e.detail.value })
  },

  quickSelect(e) {
    this.setData({ inputValue: e.currentTarget.dataset.mood }, () => {
      this.searchMood()
    })
  },

  searchMood() {
    const { inputValue } = this.data
    if (!inputValue.trim()) {
      wx.showToast({ title: '请输入心情', icon: 'none' })
      return
    }

    const category = this.matchMood(inputValue)
    const moodCategory = category || MOOD_CATEGORIES[0]

    const songs = this.getDailyRecommendations(moodCategory.id, 'song')
    const books = this.getDailyRecommendations(moodCategory.id, 'book')

    this.setData({
      showResult: true,
      resultEmoji: moodCategory.emoji,
      currentMood: inputValue,
      categoryLabel: moodCategory.label,
      songs: songs,
      displaySongs: songs.slice(0, 5),
      books: books,
      showAllSongs: false
    })

    this.saveToHistory(inputValue, moodCategory)

    wx.pageScrollTo({ selector: '#results', duration: 300 })
  },

  matchMood(input) {
    const lowerInput = input.toLowerCase()
    for (const category of MOOD_CATEGORIES) {
      for (const keyword of category.keywords) {
        if (lowerInput.includes(keyword.toLowerCase())) {
          return category
        }
      }
    }
    return null
  },

  getDailyRecommendations(moodId, type) {
    const db = type === 'song' ? SONG_DB : BOOK_DB
    let items = db[moodId] || db.depressed
    
    // 标记收藏状态
    const favorites = wx.getStorageSync('favorites') || []
    items = items.map(item => ({
      ...item,
      liked: favorites.some(f => 
        (type === 'song' && f.title === item.title && f.artist === item.artist) ||
        (type === 'book' && f.title === item.title && f.author === item.author)
      )
    }))

    return items
  },

  toggleSongs() {
    const { songs, showAllSongs } = this.data
    this.setData({
      showAllSongs: !showAllSongs,
      displaySongs: !showAllSongs ? songs : songs.slice(0, 5)
    })
  },

  toggleLike(e) {
    const { type, index } = e.currentTarget.dataset
    const { songs, books, favorites } = this.data
    const list = type === 'song' ? songs : books
    const item = list[index]

    let newFavorites = [...favorites]
    const isLiked = newFavorites.some(f => 
      f.title === item.title && 
      f.artist === item.artist && 
      f.type === type
    )

    if (isLiked) {
      newFavorites = newFavorites.filter(f => 
        !(f.title === item.title && f.artist === item.artist && f.type === type)
      )
    } else {
      newFavorites.push({
        title: item.title,
        artist: item.artist,
        author: item.author,
        type: type,
        addedAt: Date.now()
      })
    }

    // 更新数据
    if (type === 'song') {
      songs[index].liked = !isLiked
    } else {
      books[index].liked = !isLiked
    }

    wx.setStorageSync('favorites', newFavorites)
    this.setData({
      songs,
      books,
      favorites: newFavorites
    })
  },

  copyBook(e) {
    const { title, author } = e.currentTarget.dataset
    wx.setClipboardData({
      data: `${title} - ${author}`,
      success() {
        wx.showToast({
          title: '已复制',
          icon: 'success'
        })
      }
    })
  },

  saveToHistory(mood, category) {
    const history = wx.getStorageSync('moodHistory') || []
    history.unshift({
      id: Date.now().toString(36),
      mood: mood,
      category: category.label,
      emoji: category.emoji,
      timestamp: Date.now()
    })
    wx.setStorageSync('moodHistory', history)
  },

  loadFavorites() {
    const favorites = wx.getStorageSync('favorites') || []
    this.setData({ favorites })
  }
})
