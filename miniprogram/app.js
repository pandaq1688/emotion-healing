// 情绪治愈馆小程序 - 入口文件

App({
  onLaunch() {
    // 小程序启动时执行
    this.initData();
  },
  
  initData() {
    // 初始化数据
    const systemInfo = wx.getSystemInfoSync();
    this.globalData.systemInfo = systemInfo;
    
    // 检查是否是深色模式
    const theme = wx.getStorageSync('theme') || 'light';
    this.globalData.theme = theme;
  },
  
  globalData: {
    theme: 'light',
    systemInfo: null
  }
})
