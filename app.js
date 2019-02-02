//app.js 在主线程的代码 app.js 中初始化 Worker
const utils = require('./utils')
const worker = wx.createWorker('workers/request/index.js')
//主线程向 Worker 发送消息
//console.log("111111111111")
worker.postMessage({
  msg: 'hello from AppService',
  buffer: utils.str2ab('hello arrayBuffer from AppService')
})
//console.log("22222222222")
worker.onMessage(function (msg) {
  //console.log('[AppService] onWorkerMessage', msg)
  //const buffer = msg.buffer
  //console.log('[AppService] on worker buffer', utils.ab2str(buffer))
})

//console.log(`[AppService] on worker create: ${worker.onMessage}`)

//App() 函数用来注册一个小程序。接受一个 Object 参数，其指定小程序的生命周期回调等
App({
  //小程序启动后触发 生命周期回调—监听小程序初始化 小程序初始化完成时（全局只触发一次）
  onLaunch: function (options) {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  //生命周期回调—监听小程序显示	小程序启动，或从后台进入前台显示时
  onShow: function (options){

  },
  //生命周期回调—监听小程序隐藏	小程序从前台进入后台时
  onHide: function () {

  },
  //错误监听函数	小程序发生脚本错误，或者 api 调用失败时触发，会带上错误信息
  onError: function (msg) {
    console.log("error.msg:----------"+msg+"------------")
  },
  //页面不存在监听函数	小程序要打开的页面不存在时触发，会带上页面信息回调该函数
  onPageNotFound: function (options) {

  },
  globalData: {
    userInfo: null
  }
})