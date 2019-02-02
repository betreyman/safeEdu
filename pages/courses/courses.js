// pages/courses/courses.js
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
    }
  },
  getUserInfo(){
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
        console.log("res:"+res)
      },
      fail:(res)=>{
        console.log("res:"+res)
      },
      complete(res){
        console.log("res:"+res)
      }
    })
    // this.data.text = 'changed data' // 不要直接修改 this.data
    // 应该使用 setData
    this.setData({
      text: 'changed data'
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
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log("Page.route : "+this.route)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
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
  //页面滚动触发事件的处理函数
  onPageScroll() {
    // Do something when page scroll
  },
  //页面尺寸改变时触发
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
    }, function() {
      // this is setData callback
    })
  },
  customData: {
    hi: 'MINA'
  }
})