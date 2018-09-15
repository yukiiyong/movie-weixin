const app = getApp()
Page({
  data: {
    sysInfo: []
  },
  onLoad() {
    wx.getSystemInfo({
      success: (res) => {
        console.log(res)
        let arr = []
        const resolution = res.windowWidth * res.pixelRatio + '*' + res.windowHeight * res.pixelRatio
        arr.push({name: '手机型号', key:'model', value: res.model})
        arr.push({name: '分辨率', key:'resolution', value: resolution})
        arr.push({name: '系统语言', key:'language', value: res.language})
        arr.push({name: '微信版本', key:'version', value: res.version})
        this.setData({
          sysInfo: arr
        })
      }
    })
  }
})