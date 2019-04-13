// pages/user/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
        id: 'selfCore',
        name: '教育信息',
        open: true,
        pages: [{
          name: '我的学时',
          url: ''
        }, {
          name: '我的成绩',
          url: ''
        }, {
          name: '播放记录',
          url: ''
        }, {
          name: '充值',
          url: ''
        }, {
          name: '消费记录',
          url: ''
        }, {
          name: '查看试卷',
          url: ''
        }]
      },
      {
        id: 'selfInfo',
        name: '个人信息',
        open: true,
        pages: [{
          name: '修改个人材料',
          url: ''
        }, {
          name: '修改密码',
          url: ''
        }]
      },
      {
        id: 'release',
        name: '版本信息',
        open: true,
        pages: [{
          name: '清除缓存',
          url: ''
        }, {
          name: '当前版本号为:1.0',
          url: ''
        }]
      },
      {
        id: 'about',
        name: '关于我们',
        open: true,
        pages: [{
          name: '关于我们',
          url: ''
        }]
      }
    ]
  },
  kindToggle: function(e) {
    var id = e.currentTarget.id,
      list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
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
  onShareAppMessage: function() {

  }
})