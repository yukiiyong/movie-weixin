const app = getApp()
Page({
  data: {
    personInfoArr: [
      {'key': 'nickName','name':'昵称'},
      {'key': 'gender','name':'性别'},
      {'key': 'birthday','name': '生日'},
      {'key': 'constellation', 'name':'星座'},
      {'key': 'city','name':'城市'},
      {'key': 'language','name':'语言'},
      {'key': 'desc','name':'详细'},
    ]
  },
  onLoad() {
    app.wechat.getStorage('user')
      .then(data => {
        console.log(data)
        let personInfo = this._checkPersonInfo(data.data)
        this.setData({
          personInfoArr: personInfo
        })
      }).catch((err) => {
        console.log(err)
        this.getUserInfo()
      })
  },
  onShow() {
    app.wechat.getStorage('user')
      .then(data => {
        console.log(data)
        let personInfo = this._checkPersonInfo(data.data)
        this.setData({
          personInfoArr: personInfo
        })
      }).catch((err) => {
        console.log(err)
        this.getUserInfo()
      })
  },
  _checkPersonInfo(userInfo) {
    let arr = this.data.personInfoArr.map((item) => {
        if(item.key === 'gender') {
          item.value = userInfo[item.key] === 1 ? '男' : '女'
        } else{
          item.value=userInfo[item.key]
        }
        if(item.value === 'zh_CN') {
          item.value = '中文'
        }
        return item
      })
    return arr
  },
  getUserInfo() {
    if(app.globalData.userInfo) {
      let userInfo = this._checkPersonInfo(app.globalData.userInfo)
      this.setData({
        personInfoArr: userInfo
      })
    }
    else {
      wx.getUserInfo({
        success: (res) => {
          let personInfo = this._checkPersonInfo(res)
          this.setData({
            personInfoArr: personInfo
          })
        }
      })
    }
  },
  naviToChangePersonInfo() {
    wx.navigateTo({
      url: '../editPersonInfo/editPersonInfo'
    })
  } 
})
