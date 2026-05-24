// pages/trend/trend.js
const { FULL_MOODS } = require('../../utils/data.js')

Page({
  data: {
    currentYear: 2024,
    currentMonth: 0,
    calendarDays: [],
    last30Days: [],
    positiveCount: 0,
    streak: 0,
    topMood: '-',
    weekdays: ['日', '一', '二', '三', '四', '五', '六'],
    currentMonthLabel: ''
  },

  onLoad() {
    const now = new Date()
    this.setData({
      currentYear: now.getFullYear(),
      currentMonth: now.getMonth()
    })
    this.loadData()
  },

  onShow() {
    this.loadData()
  },

  loadData() {
    this.loadDailyRecords()
    this.generateCalendar()
    this.updateMonthLabel()
  },

  loadDailyRecords() {
    const records = wx.getStorageSync('dailyMoodRecords') || {}
    const days = Object.entries(records)
      .map(([date, record]) => ({ date, ...record }))
      .sort((a, b) => new Date(b.date) - new Date(a.date))

    // 计算最近30天
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const last30 = days.filter(d => new Date(d.date) >= thirtyDaysAgo)

    // 正向天数
    const positiveCount = last30.filter(d => d.positive).length

    // 连续记录
    let streak = 0
    let checkDate = new Date()
    checkDate.setHours(0, 0, 0, 0)
    for (let i = 0; i < 365; i++) {
      const dayKey = checkDate.toISOString().split('T')[0]
      if (records[dayKey]) {
        streak++
        checkDate.setDate(checkDate.getDate() - 1)
      } else if (i === 0) {
        // 今天没记，看昨天
        checkDate.setDate(checkDate.getDate() - 1)
      } else {
        break
      }
    }

    // 最常见心情
    const moodCounts = {}
    days.forEach(d => {
      moodCounts[d.label] = (moodCounts[d.label] || 0) + 1
    })
    const topMood = Object.entries(moodCounts)
      .sort((a, b) => b[1] - a[1])[0]?.[0] || '-'

    this.setData({
      last30Days: last30,
      positiveCount,
      streak,
      topMood
    })
  },

  generateCalendar() {
    const { currentYear, currentMonth } = this.data
    const records = wx.getStorageSync('dailyMoodRecords') || {}
    const today = new Date()

    // 当月第一天
    const firstDay = new Date(currentYear, currentMonth, 1)
    // 当月最后一天
    const lastDay = new Date(currentYear, currentMonth + 1, 0)
    // 日历开始日期（第一周的周日）
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    const endDate = new Date(lastDay)
    endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()))

    let d = new Date(startDate)
    while (d <= endDate) {
      const dateStr = d.toISOString().split('T')[0]
      const record = records[dateStr]
      const isToday = 
        d.getDate() === today.getDate() && 
        d.getMonth() === today.getMonth() && 
        d.getFullYear() === today.getFullYear()
      
      let color = 'transparent'
      if (record) {
        if (record.positive) color = '#C8E6C9'
        else if (record.positive === false) color = '#FFCDD2'
        else color = '#FFE0B2'
      }

      days.push({
        date: dateStr,
        day: d.getDate(),
        hasRecord: !!record,
        isToday,
        otherMonth: d.getMonth() !== currentMonth,
        color,
        record
      })

      d.setDate(d.getDate() + 1)
    }

    this.setData({ calendarDays: days })
  },

  updateMonthLabel() {
    const { currentYear, currentMonth } = this.data
    const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    this.setData({
      currentMonthLabel: `${currentYear}年 ${months[currentMonth]}`
    })
  },

  prevMonth() {
    let { currentYear, currentMonth } = this.data
    currentMonth--
    if (currentMonth < 0) {
      currentMonth = 11
      currentYear--
    }
    this.setData({ currentYear, currentMonth }, () => {
      this.generateCalendar()
      this.updateMonthLabel()
    })
  },

  nextMonth() {
    let { currentYear, currentMonth } = this.data
    currentMonth++
    if (currentMonth > 11) {
      currentMonth = 0
      currentYear++
    }
    this.setData({ currentYear, currentMonth }, () => {
      this.generateCalendar()
      this.updateMonthLabel()
    })
  }
})
