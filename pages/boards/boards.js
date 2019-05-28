const app = getApp()
Page({
  data: {
    boards: [
      {'key':'in_theaters'},
      {'key': 'coming_soon'},
      {'key': 'top250'}
    ],
    theaters: [
      {'key': 'in_theaters','title':'正在热映'},
      {'key': 'coming_soon',"title":'即将上映'}
    ],
    billboards: [
      {'key':'weekly','title':'一周电影口碑榜'},
      {'key':'top250','title':'豆瓣电影Top250'},
      {'key':'new_movies','title':'新片榜'}
    ],
    loading: true,
    theaterIndex: 0
  },
  onLoad() {
    //console.log(document.documentElement)
    const promises = this.data.boards.map(board => {
      return app.douban.find(board.key, 1, 6)
        .then(data => {
          // console.log(data)
          board.title = data.title
          board.total = data.total
          board.movies = data.subjects
          return board
        })
    })
    Promise.all(promises).then((boards) => {
      this.setData({boards:boards,loading: false})
    })
    const theatersPromises = this.data.theaters.map(theater => {
      return app.douban.find(theater.key, 1, 6)
        .then(data => {
          theater.total = data.total
          theater.movies = data.subjects
          return theater
        })
    })
    Promise.all(theatersPromises).then((theaters) => {
      this.setData({theaters:theaters,loading: false})
    })
    const billboardsPromises = this.data.billboards.map(billboard => {
      return app.douban.find(billboard.key, 1, 6)
        .then(data => {
          billboard.total = data.subjects.length
          billboard.title = data.title
          billboard.movies = data.subjects.slice(0,4)
          return billboard
        })
    })
    Promise.all(billboardsPromises).then((billboards) => {
      this.setData({billboards:billboards,loading: false})
      this.getPhoto(billboards)
    })
  },
  findIndex(arr ,key) {
    for(let i = 0; i < arr.length; i++) {
      if(arr[i].key === key) {
        return key
      }
    }
  },
  getPhoto(billboards) {
    const billboardPromise = billboards.map(billboard => {
      let url
      if(billboard.movies[0].subject) {
        url = `subject/${billboard.movies[0].subject.id}`
      } else {
        url= `subject/${billboard.movies[0].id}`
      }
      return app.douban.find(url)
        .then(data => {
          billboard.photo = data.photos[0].image
          return billboard
        })
    })
    Promise.all(billboardPromise).then(billboards => {
      this.setData({
        billboards:billboards
      })
    })
  },
  theaterChange(e) {
    this.setData({
      theaterIndex: e.detail.current
    })
  },
  changeTheaterIndex(e) {
    const index = e.currentTarget.dataset.index
    console.log(this.data.billboards)
    this.setData({
      theaterIndex: index
    })
  },
  navigateToList(e) {
    const theater = this.data.theaters[this.data.theaterIndex]
    const url = `../list/list?type=${theater.key}&title=${theater.title}`
    wx.navigateTo({
      url:url
    })
  },
  naviToSearch(e) {
    console.log('naviToSearch')
    const url = '../search/search'
    wx.navigateTo({
      url:url
    })
    // wx.switchTab({
    //   url: url
    // })
  }
})