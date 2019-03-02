//logs.js
const util = require('../../utils/util.js')
//Page 是一个页面构造器，这个构造器就生成了一个页面.在生成页面的时候，小程序框架会把 data 数据和 index.wxml 一起渲染出最终的结构,在渲染完界面之后，页面实例就会收到一个 onLoad 的回调，你可以在这个回调处理你的逻辑
Page({
  data: {// 参与页面渲染的数据
    logs: []
  },
  onLoad: function () {
    // 页面渲染后 执行
    // this.setData({
    //   logs: (wx.getStorageSync('logs') || []).map(log => {
    //     return util.formatTime(new Date(log))
    //   })
    // })
  }
})
