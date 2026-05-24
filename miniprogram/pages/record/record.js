// pages/record/record.js
Page({
  data: {
    history: []
  },

  onLoad() {
    this.loadHistory()
  },

  onShow() {
    this.loadHistory()
  },

  loadHistory() {
    const history = wx.getStorageSync('moodHistory') || []
    const formatted = history.map(item => ({
      ...item,
      time: this.formatTime(item.timestamp)
    }))
    this.setData({ history: formatted })
  },

  formatTime(timestamp) {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now - date
    
    if (diff < 60000) {
      return '刚刚'
    } else if (diff < 3600000) {
      return Math.floor(diff / 60000) + '分钟前'
    } else if (diff < 86400000) {
      return Math.floor(diff / 3600000) + '小时前'
    } else if (diff < 604800000) {
      return Math.floor(diff / 86400000) + '天前'
    } else {
      return date.toLocaleDateString('zh-CN', { 
        month: 'short', 
        day: 'numeric',
        year: '2-digit'
      })
    }
  },

  deleteItem(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '删除记录',
      content: '确定要删除这条心情记录吗？',
      success: (res) => {
        if (res.confirm) {
          const history = this.data.history.filter(item => item.id !== id)
          const rawHistory = wx.getStorageSync('moodHistory').filter(item => item.id !== id)
          wx.setStorageSync('moodHistory', rawHistory)
          this.loadHistory()
          wx.showToast({ title: '已删除', icon: 'success' })
        }
      }
    })
  },

  clearAll() {
    wx.showModal({
      title: '清空记录',
      content: '确定要清空所有心情记录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('moodHistory')
          this.setData({ history: [] })
          wx.showToast({ title: '已清空', icon: 'success' })
        }
      }
    })
  }
})
