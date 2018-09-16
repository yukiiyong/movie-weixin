/*
* @Author: yuki
* @Date:   2018-04-07 23:18:26
* @Last Modified by:   yukiiyong
* @Last Modified time: 2018-09-16 16:56:37
*/
const wechat = require('./util/wechat.js')
const douban = require('./util/douban.js')
const baidu = require('./util/baidu.js')
App({
	data: {
		name: 'Movie',
		version: '1.0.0',
		currentCity: '北京'
	},
	wechat: wechat,
	douban:douban,
	baidu:baidu,
	//生命周期函数，监听小程序初始化
	//当小程序初始化完成，会触发onLanch (全局只触发一次)
	onLaunch() {
		var logs = wx.getStorageSync('logs') || []
		logs.unshift(Date.now())
		wx.setStorageSync('logs', logs)

		wx.login({
			success: res => {
				//发送res.code到后台获取openId，sessionKey，unionId
			}
		})
		//获取用户信息
		wx.getSetting({
			success: res => {
				if(res.authSetting['scope.userInfo']) {
					//已经授权，可以直接调用getUserInfo 获取头像昵称，不会弹框
					wx.getUserInfo({
						success: res => {
							this.globalData.userInfo = res.userInfo							
							//由于getUserInfo是网络请求，所以可能在page.onload之后才返回
							//所以此处加上callback以防止这种情况
							if(this.userInfoReadyCallback) {
								this.userInfoReadyCallback(res)
							}
						}
					})
				} 
			}
		})
		wechat.getLocation()
		      .then(res => {
		      	const {latitude,longitude} = res
		      	return baidu.getCityName(latitude, longitude)
		      })
		      .then(name => {
		      	this.data.currentCity = name.replace('市','')
		      	console.log(`currentCity: ${this.data.currentCity}`)
		      })
		      .catch(err => {
		      	this.data.currentCity = '北京',
		      	console.log(err)
		      })

	},
	globalData: {
		userInfo: null
	}
})