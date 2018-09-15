const app = getApp()
Page({
	data: {
    user:{},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad() {
    if(app.globalData.userInfo) {
      this.setData({
        user: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
        app.userInfoReadyCallback = (res) => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            user: res.userInfo,
            hasUserInfo: true
          })
        }
    }
    // app.wechat.getStorage('user')
    //   .then((res) => {
    //     console.log(res)
    //     this.setData({
    //       user: res,
    //       hasUserInfo: true
    //     })
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //     // if(app.globalData.userInfo) {
    //     //   this.setData({
    //     //     user: app.globalData.userInfo
    //     //   })
    //     // }
    //   })
  },
  getUserInfo(e) {
    const userInfo = e.detail.userInfo
    console.log(e)
    app.globalData.userInfo = userInfo
    this.setData({
      user: userInfo,
      hasUserInfo: true
    })
  },
  clearStorage() {
    app.wechat.showModal({
      title: '提示',
      content: '确定要清除缓存？',
      confirmText: '是',
      cancelText: '否'
    }).then((res) => {
      const {confirm, cancel} = res
      if(confirm) {
        wx.clearStorage({
          success: function() {
            wx.showToast({
              title: '已清除缓存',
              duration: 1500
            })
          }
        })
      }
    })
  },
  updateLocation() {
    wx.navigateTo({
      url: '../updateLocation/updateLocation'
    })
  },
  naviToSystemInfo() {
    wx.navigateTo({
      url: '../systemInfo/systemInfo'
    })
  }
})