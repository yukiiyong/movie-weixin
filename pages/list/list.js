/*
* @Author: yuki
* @Date:   2018-06-04 22:40:13
* @Last Modified by:   yukiiyong
* @Last Modified time: 2019-05-17 00:39:50
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
		hasMore: true,
    tabTop: 0,
    tabFix: ''
	},
  load() {
    if(!this.data.hasMore) {return}
    app.douban.find(this.data.type, this.data.page, this.data.count)
        .then(data => {
          console.log(data)
          if(data.subjects) {
            let movies = this.handlePubdates(data.subjects)
            this.setData({
              movies: this.data.movies.concat(movies),
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
  handlePubdates(arr) {
    //判断arr的每一项是否含有subject
    let newArr = arr.map(item => {
      if(item.subject) {
        item.subject.pubdates = item.subject.pubdates.map(pubdate => {
          const result = pubdate.match(/[^\(\)]+(?=\))/g)
          return result
        })
        return item
      } 
      item.pubdates = item.pubdates.map(pubdate => {
        const result = pubdate.match(/[^\(\)]+(?=\))/g)
        return result
      })
      return item
    })
    return newArr
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
    const query = wx.createSelectorQuery()
    query.select('.header').boundingClientRect(res => {
      this.setData({
        tabTop: res.height
      })
    }).exec()
	},
  onReady() {
    wx.setNavigationBarTitle({title: this.data.title + ' << 电影'})
  },
  onPageScroll(res) {
    if(res.scrollTop > this.data.tabTop) {
      if(this.data.tabFix === '') {
        this.setData({
          tabFix: 'Fix'
        })
        return
      }      
    } else {
      if(this.data.tabFix === 'Fix') {
        this.setData({
          tabFix: ''
        })
        return
      }
    }
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