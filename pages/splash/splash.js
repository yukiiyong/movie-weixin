//获取全局应用实例
const app = getApp()
//创建页面实例
Page({
	//页面的厨师数据
	data: {
		movies:[],
		loading:true
	},
	getCache() {
		return new Promise(resolve => {
			app.wechat.getStorage('last_splash_data')
			    .then(res =>{
			    	const {movies, expires} = res.data
			    	//有缓存，判断是否过期
			    	if(movies && expires > Date.now()) {
			    		return resolve(res.data)
			    	}
			    	//过期
			    	console.log('uncached')
			    	return resolve(null)
			    })
			    .catch(e => resolve(null))
		})
	},
	handleStart() {
		wx.switchTab({
			url:'../board/board'
		})
	},
	onLoad() {
		this.getCache().then(cache => {
			if(cache) {
				//有缓存则赋值
				return this.setData({movies: cache.movies, loading: false})
			}
			//页面只需要 movies 和loading
			app.douban.find('in_theaters', 1, 4)
			.then(data => {
				this.setData({
					movies: data.subjects,
					loading: false
				})
				console.log('data',data)
				return app.wechat.setStorage('last_splash_data',{
					movies: data.subjects,
					expires: Date.now() + 1 *24 * 60 * 60* 1000
				})
			})
			.then(() => {
				console.log('last splash data cached')
			})
		})
	}
})
