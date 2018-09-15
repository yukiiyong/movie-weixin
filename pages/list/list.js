/*
* @Author: yuki
* @Date:   2018-06-04 22:40:13
* @Last Modified by:   yuki
* @Last Modified time: 2018-06-05 02:13:18
*/
//获取app实例
const app = getApp()
Page({
	data: {
    type: 'in_theaters',
    title: '',
    page: 1,
    total: 0,
    count: 20,
		movies: [],
		loading: false,
		hasMore: true
	},
  load() {
    if(!this.data.hasMore) {return}
    app.douban.find(this.data.type, this.data.page, this.data.count)
        .then(data => {
          console.log(data)
          if(data.subjects) {
            this.setData({
              movies: this.data.movies.concat(data.subjects),
              total: data.total,
              loading: false
            })
            this.checkMore()
          }
          else {
            this.setData({
              loading:false,
              hasMore: false
            })
          }
        })
  },
  checkMore() {
    const page = this.data.page
    const count = this.data.count
    if(page * count > this.data.total) {
      console.log('total'+this.data.total)
      this.setData({
        hasMore: false
      })
    }
  },
	onLoad(params) {
    const type = params.type || this.data.type
    const title = params.title || this.data.title
    const page = 1
    this.setData({
      type: type,
      title: title,
      page: page
    })
    this.load()
	},
  onReady() {
    wx.setNavigationBarTitle({title: this.data.title + ' << 电影'})
  },
  onReachBottom() {
    if(!this.data.hasMore) {return}
    const page = this.data.page + 1
      this.setData({
        page: page
      })
    this.load()
  },
  onPullDownRefresh() {
    this.setData({
      movies: [],
      hasMore: true,
      page: 1
    })
    this.load()
    app.wechat.original.stopPullDownRefresh()
  }
})