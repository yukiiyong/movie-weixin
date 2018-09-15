const app = getApp()
Page({
  data: {
    movies: [],
    search: '',
    searching: false,
    hasMore: true,
    page: 1,
    total: 0,
    count: 20
  },
  search() {
    if(!this.data.hasMore || this.data.searching) { 
      return
    }
    app.douban.find('search', this.data.page, this.data.count, this.data.search)
      .then(res => {
        // console.log(res)
        if(res.subjects.length) {
          this.setData({
            movies: this.data.movies.concat(res.subjects),
            total: res.total,
            searching: false
          })
          //获取完数据检测数据还有无剩余
          this.checkMore()
        } else {
          this.setData({
            hasMore: false,
            searching: false
          })
        }
      })
      .catch(e => {
        console.log('get search data fail')
        console.log(e)
        this.setData({
          searching: false
        })
      })
  },
  changeSearch(e) {
    if(!e.detail.value) {return}
    this.setData({
      search: e.detail.value,
      hasMore: true,
      page: 1,
      searching: false,
      total: 0
    })
    this.search()
  },
  clearSearch() {
    this.setData({
      search: '',
      searching: false
    })
  },
  checkMore() {
    if(this.data.page * this.data.count > this.data.total) {
      this.setData({
        hasMore: false
      })
      return false
    } else {
      this.setData({
        hasMore: true
      })
    }
  },
  onReachBottom(){
    if(!this.data.hasMore) {
      return false
    }
    this.setData({
      page: this.data.page + 1
    })
    this.search()
  }
})