const app = getApp()

Page({
	data: {
		title: '',
		movie: {},
		loading: true
	},
	//生命周期函数， 监听页面加载
	onLoad(params) {
		// console.log(params)
		app.douban.findOne(params.id) 
		.then(data => {
			console.log(data)
			this.setData({title:data.title,movie:data,loading:false})
			wx.setNavigationBarTitle({title: data.title + '<< 电影'})
		})
		.catch(e => {
			this.setData({title: '获取数据异常', movie:{},loading:false})
			console.error(e)
		})
	},
	onReady(){
		if(this.data.title){
			wx.setNavigationBarTitle({title: this.data.title + ' << 电影'})			
		}
	},
	onShareAppMessage(){
		return {
			title: '分享标题',
			desc:'分享描述',
			path: '/pages/item/item?id='+this.data.id
		}
	}
})