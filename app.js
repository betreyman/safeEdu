//app.js 在主线程的代码 app.js 中初始化 Worker(多线程)
//const utils = require('./utils')
//const worker = wx.createWorker('workers/request/index.js')
//主线程向 Worker 发送消息
//console.log("111111111111")
// worker.postMessage({
//   msg: 'hello from AppService',
//   buffer: utils.str2ab('hello arrayBuffer from AppService')
// })
//console.log("22222222222")
// worker.onMessage(function(msg) {
//   //console.log('[AppService] onWorkerMessage', msg)
//   //const buffer = msg.buffer
//   //console.log('[AppService] on worker buffer', utils.ab2str(buffer))
// })

//console.log(`[AppService] on worker create: ${worker.onMessage}`)

//App() 函数用来注册一个小程序。接受一个 Object 参数，其指定小程序的生命周期回调等
App({
  //小程序启动后触发 生命周期回调—监听小程序初始化 小程序初始化完成时（全局只触发一次）
  //小程序初始化完成时触发，全局只触发一次。参数也可以使用 wx.getLaunchOptionsSync 获取。
  onLaunch: function(options) {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    var openid = wx.getStorageSync("openid")
    var session_key = wx.getStorageSync("session_key")
    var sessionId = wx.getStorageSync("sessionId")
    var expiredTime = wx.getStorageSync("expiredTime")
    console.log(`expiredTime = ${expiredTime}`)
    var now = +new Date()
    //console.log(`${openid} || ${session_key} || ${sessionId} || ${expiredTime}`)
    if (now - expiredTime <= 1 * 24 * 60 * 60 * 1000) {
      this.globalData.userInfo.openid = openid
      this.globalData.session_key = session_key
      this.globalData.sessionId = sessionId
      this.globalData.expiredTime = expiredTime
      //console.log("-----------------------")
    } else {
      //console.log("=======================")
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          //console.log("code : " + res.code) //每次获取的code都不一样
          if (res.code) {
            this.globalData.appInfo.code = res.code
            //获取微信用户openid与会话密钥
            wx.request({
              url: 'https://api.weixin.qq.com/sns/jscode2session',
              data: {
                appid: this.globalData.appInfo.appid,
                secret: this.globalData.appInfo.secret,
                js_code: this.globalData.appInfo.code,
                grant_type: 'authorization_code'
              },
              success: wxres => {
                //设置全局变量微信用户openid与会话密钥session_key的值
                this.globalData.userInfo.openid = wxres.data.openid
                this.globalData.session_key = wxres.data.session_key
                try {
                  wx.setStorageSync("openid", wxres.data.openid)
                  wx.setStorageSync("session_key", wxres.data.session_key)
                } catch (e) {
                  console.log('app.js写入openid或session_key发生错误')
                }
                //console.log("openid=" + this.globalData.userInfo.openid +"||"+ "session_key=" + this.globalData.session_key)
              }
            })

            //获取后台登录token信息
            wx.request({
              url: this.globalData.baseUrl + '/getToken',
              data: {
                username: 'thinkgem', // 用户输入的账号
                password: 'admin' // 用户输入的密码
                //code: res.code
              },
              method: "POST",
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              success: function(res) {
                // 登录成功
                if (res.statusCode === 200) {
                  console.log(res.data) // 服务器回包内容
                  this.globalData.sessionId = res.data.token
                  //console.log(`this.globalData = ${this.globalData.sessionId} || res.data.token = ${res.data.token}`)
                  try {
                    wx.setStorageSync("sessionId", res.data.token)
                  } catch (e) {
                    console.log("app.js写入本地缓存sessionId报错")
                  }
                }
              }.bind(this)
            })
            //过期时间1天（sessionId,session_key,openid）
            var expiredTime = +new Date() + 1 * 24 * 60 * 60 * 1000
            this.globalData.expiredTime = expiredTime
            try {
              wx.setStorageSync("expiredTime", expiredTime)
            } catch (e) {
              console.log("app.js写入本地缓存expiredTime报错")
            }

          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      })
    }

    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  //生命周期回调—监听小程序显示	小程序启动，或从后台进入前台显示时
  onShow: function(options) {
    console.log("app.js onShow is run " + options)
    //获取宿主环境信息
    // wx.getSystemInfo({
    //   success:function(...res){
    //     console.log(res);
    //   },
    //   fail:function(res){

    //   },
    //   complete(res){
    //     console.log("wx.getSystemInfo.complete is run");
    //   }
    // })
    //判断API是否存在做兼容
    // if (wx.openBluetoothAdapter) {
    //   wx.openBluetoothAdapter()
    // } else {
    //   // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
    //   wx.showModal({
    //     title: '提示',
    //     content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
    //   })
    // }
  },
  //生命周期回调—监听小程序隐藏	小程序从前台进入后台时
  onHide: function() {

  },
  //错误监听函数	小程序发生脚本错误，或者 api 调用失败时触发，会带上错误信息
  onError: function(msg) {
    console.log("error.msg:----------" + msg + "------------")
  },
  //页面不存在监听函数	小程序要打开的页面不存在时触发，会带上页面信息回调该函数
  onPageNotFound: function(options) {
    // wx.redirectTo({
    //   url: 'pages/...'
    // }) // 如果是 tabbar 页面，请使用 wx.switchTab
  },
  //自定义全局变量
  globalData: {
    userInfo: {
      name: '', //用户姓名
      openid: '' //微信用户的唯一标识
    },
    appInfo: {
      code: '', //微信登录凭证
      appid: 'wx0235d3d7bbec6f56', //小程序ID
      secret: '7046f8213513c5f192de698a092fbbf9' //小程序密钥
    },
    //baseUrl: 'http://203.93.109.202:8050/bdp/api',
    baseUrl: 'http://localhost:8080/aqjyInit/api',
    session_key: '', //会话密钥(微信服务器给开发者服务器颁发的身份凭证，开发者可以用session_key请求微信服务器其他接口来获取一些其他信息)
    sessionId: '',
    expiredTime: ''
  }
})