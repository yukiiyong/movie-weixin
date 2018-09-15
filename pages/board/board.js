const app = getApp()
Page({
	data: {
		boards:[
		  {'key':'in_theaters'},
		  {'key':'coming_soon'},
		  {'key':'top250'}
		],
		indicatorColor:"gray",
		loading:true
	},
	onLoad() {
		const promises = this.data.boards.map(board => {
			return app.douban.find(board.key,1, 10)
			          .then(data => {
			          		board.title = data.title,
			          		board.movies = data.subjects
			          		return board
			          })
		})
		Promise.all(promises).then(boards => {
			this.setData({boards:boards, loading:false})
		})
	}
})