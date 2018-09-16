const app = getApp()
Page({
	data: {
    user:{},
    hasUserInfo: false,
    skin: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad() {
    if(app.globalData.userInfo) {
      this.setData({
        user: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if(this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }
  },
  onShow() {
    app.getStorage('skin')
      .then((res) => {
        if(res && res.data) {
          let skin = res.data
          this.setData({
            skin: skin
          })
        } else {
          this.setData({
            skin: ''
          })
        }
      }).catch((err) => {
        console.log(err)
      })
  }
  getUserInfo(e) {
    console.log(e)
    const userInfo = e.detail.userInfo
    app.globalData.userInfo = userInfo
    app.wechat.setStorage('user', userInfo)
      .then((res) => {
        this.setData({
          user: userInfo,
          hasUserInfo: true
        })
      })    
  },
  clearStorage() {
    console.log(this.data.user)
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
              icon: 'loading',
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
  },
  naviToPersonInfo() {
    wx.navigateTo({
      url: '../personInfo/personInfo'
    })
  }
})