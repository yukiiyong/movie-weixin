/*
* @Author: yukiiyong
* @Date:   2018-09-16 17:26:41
* @Last Modified by:   yukiiyong
* @Last Modified time: 2018-09-17 01:33:28
*/
const app = getApp()

Page({
  data: {
    personInfo: {},
    customItem: '',
    constellationArray: ['白羊座','金牛座','双子座','巨蟹座','狮子座','处女座','天秤座','天蝎座','射手座','摩羯座','水瓶座','双鱼座']
  },
  onLoad() {
    app.wechat.getStorage('user')
      .then((data)  => {
        console.log(data)
        let personInfo = _checkPersonInfo(data.data)
        this.setData({
          personInfo: personInfo
        })
      }).catch((err) => {
        console.log(err)
        this.getPersonInfo()
      })
  },
  getPersonInfo() {
    if(app.globalData.userInfo) {
      let userInfo = app.globalData.userInfo
      userInfo = _checkPersonInfo(userInfo)
      this.setData({
        personInfo: userInfo
      })
    }
    else if(wx.canIUse('button.open-type.getUserInfo')){
      wx.getUserInfo({
        success: (res) => {
          let personInfo = _checkPersonInfo(res)          
          this.setData({
            personInfo: personInfo
          })
        }
      })
    } else {
      wx.navigateBack()
    }
  },
  genderChange(e) {
    const gender = parseInt(e.detail.value)
    let personInfo = this.data.personInfo
    personInfo.gender =gender
    this.setData({
      personInfo: personInfo
    })
  },
  cityChange(e) {
    let personInfo = this.data.personInfo
    personInfo.city = e.detail.value
    this.setData({
      personInfo: personInfo
    })
  },
  constellationChange(e) {
    let personInfo = this.data.personInfo
    const constellation = this.data.constellationArray[e.detail.value]
    personInfo.constellation = constellation
    this.setData({
      personInfo: personInfo
    })
  },
  descChange(e) {
    let personInfo = this.data.personInfo
    personInfo.desc = e.detail.value
    this.setData({
      personInfo: personInfo
    })
  },
  birthChange(e) {
    let personInfo = this.data.personInfo
    personInfo.birthday = e.detail.value
    this.setData({
      personInfo: personInfo
    })
  },
  savePersonInfo() {
    app.wechat.setStorage('user', this.data.personInfo)
      .then(data => {
        console.log(data)
        wx.showToast({
          title: '资料修改成功',
          duration: 1500
        })
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      })
  }
})

function _checkPersonInfo(personInfo) {
  personInfo.constellation = personInfo.constellation ? personInfo.constellation : '请选择星座'
  personInfo.birthday = personInfo.birthday ? personInfo.birthday : '1990-01-01'
  if(/市/g.test(personInfo.city) || /省/g.test(personInfo.city) || /区/g.test(personInfo.city)) {
    personInfo.city = personInfo.city
  }else {
    personInfo.city = ['广东省','广州市','海珠区']    
  }
  return personInfo
}