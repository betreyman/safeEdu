// pages/courses/courses.js
console.log('加载 page.js')
var count = 0
//用于避免事件重复提交
var hasClick = false;
Page({

  /**
   * 页面的初始数据页面加载时，
   * data 将会以JSON字符串的形式由逻辑层传至渲染层，
   * 因此data中的数据必须是可以转成JSON的类型：字符串，数字，布尔值，对象，数组
   */
  data: {
    text: 'init data',
    num: 0,
    array: [{ text: 'init data' }],
    object: {
      text: 'init data'
    },
    loading: false
  },
  tapPullDown: function () {
    //wx.startPullDownRefresh()
  },
  tap: function () {
    // 把按钮的loading状态显示出来

    this.setData({

      loading: true

    })

    // 接着做耗时的操作
  },
  nativetap: function () {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  getUserInfo() {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        const latitude = res.latitude // 纬度
        const longitude = res.longitude // 经度
        this.setData({
          text: "latitude : " + latitude + "longitude : " + longitude
        })
      }
    })
  },
  changeText() {
    wx.scanCode({
      success: (res) => {
        console.log("res:" + res)
      },
      fail: (res) => {
        console.log("res:" + res)
      },
      complete(res) {
        console.log("res:" + res)
      }
    })
    // this.data.text = 'changed data' // 不要直接修改 this.data
    // 应该使用 setData
    //逻辑层通过 Page 实例的 setData 方法传递数据到渲染层
    this.setData({
      text: 'changed data'
    }, function () {

    })

  },
  changeNum() {
    // 或者，可以修改 this.data 之后马上用 setData 设置一下修改了的字段
    this.data.num = 1
    this.setData({
      num: this.data.num
    })
  },
  changeItemInArray() {
    // 对于对象或数组字段，可以直接修改一个其下的子字段，这样做通常比修改整个对象或数组更好
    this.setData({
      'array[0].text': 'changed data'
    })
  },
  changeItemInObject() {
    this.setData({
      'object.text': 'changed data'
    })
  },
  addNewField() {
    this.setData({
      'newField.text': 'new data'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   * 页面加载时触发。一个页面只会调用一次，
   * 可以在 onLoad 的参数中获取打开当前页面路径中的参数。
   */
  onLoad: function (options) {
    count += 1
    console.log('第 ' + count + ' 次启动这个页面')
    //getApp()获取app.js中定义的全局对象
    // var localUserInfo = getApp()
    // console.log(localUserInfo.globalData.userInfo)
    // localUserInfo.globalData.userInfo.name="mxj"
    // //console.log(localUserInfo.globalData.userInfo)
    // this.setData({text:"onload"},function(){
    //   console.log("callback: onLoad" )
    // })
    //模态对话框
    // wx.showModal({

    //   title: '标题',

    //   content: '告知当前状态，信息和解决方法',

    //   confirmText: '主操作',

    //   cancelText: '次要操作',

    //   success: function (res) {

    //     if (res.confirm) {

    //       console.log('用户点击主操作')

    //     } else if (res.cancel) {

    //       console.log('用户点击次要操作')

    //     }

    //   }

    //})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   * 页面初次渲染完成时触发。一个页面只会调用一次，
   * 代表页面已经准备妥当，可以和视图层进行交互
   */
  onReady: function () {
    // this.setData({text:'onReady'},function(){
    //   console.log("callback: onReady")
    // })
    // wx.showToast({ // 显示Toast

    //   title: '已发送',

    //   icon: 'success',

    //   duration: 1500

    // })

    // wx.hideToast() // 隐藏Toast
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //console.log("Page.route : "+this.route)
    // this.setData({text:'onShow'},function(){
    //   console.log("callback: onShow")
    // })
  },

  /**
   * 生命周期函数--监听页面隐藏
   * 页面隐藏/切入后台时触发。 如 navigateTo 或底部 tab 切换到其他页面，小程序切入后台等。
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   * 页面卸载时触发。如redirectTo或navigateBack到其他页面时。
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("onPullDownRefresh: onRun")
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   * // 当界面的下方距离页面底部距离小于100像素时触发回调
   */
  onReachBottom: function () {
    console.log("onReachBottom: onRun")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    } else {
      console.log(res.target)
    }
    //此事件需要 return 一个 Object，用于自定义转发内容，返回内容如下
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123'
    }
  },
  /**
   * 页面滚动触发事件的处理函数
   * 请只在需要的时候才在 page 中定义此方法，不要定义空方法。
   * 以减少不必要的事件派发对渲染层-逻辑层通信的影响。 
   * 注意：请避免在 onPageScroll 中过于频繁的执行 setData 等引起逻辑层-渲染层通信的操作。
   * 尤其是每次传输大量数据，会影响通信耗时。
   */
  // onPageScroll(options) {
  //   // Do something when page scroll
  //   //console.log("onPageScroll: onRun" + options.scrollTop)
  // },
  /**
   * 页面尺寸改变时触发;小程序屏幕旋转时触发
   */
  onResize() {
    // Do something when page resize
  },
  //当前是 tab 页时，点击 tab 时触发
  onTabItemTap(item) {
    //console.log(item.index)
    //console.log(item.pagePath)
    //console.log(item.text)
  },
  // Event handler.
  viewTap() {
    // setData 函数用于将数据从逻辑层发送到视图层（异步），同时改变对应的 this.data 的值（同步）。
    this.setData({
      text: 'Set some data for updating view.'
    }, function () {
      // this is setData callback
    })
  },
  customData: {
    hi: 'MINA'
  },
  //正常页面请求服务器数据业务逻辑
  testTap: function () {
    if (hasClick) {
      return
    }
    hasClick = true
    wx.showLoading()
    wx.request({
      url: 'https://test.com/getinfo',
      method: 'POST',
      header: { 'content-type': 'application/json' },
      data: {},
      success: function (res) {
        if (res.statusCode === 200) {
          console.log(res.data)// 服务器回包内容
        }
      },
      fail: function (res) {
        wx.showToast({ title: '系统错误' })
      },
      complete: function (res) {
        wx.hideLoading()
        hasClick = false
      }
    })
  }
})