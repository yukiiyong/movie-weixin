const app = getApp()
Page({
  data: {
    latitude: '',
    longitude: '',
    markers: [], //latitude longitude name desc
    covers: [],  //latitude,longitude, iconPath
    formattedAddress: '',
    refreshing: false
  },
  onLoad() {
    this.mapCtx = wx.createMapContext('myMap')
    this.chooseLocation()
  },
  chooseLocation() {
    if(this.data.loading) {return}
    this.setData({
      loading: true
    })
    app.wechat.getLocation('gcj02')
      .then(res => {
        const {latitude, longitude} = res
        this.setData({
          longitude,
          latitude,
          markers: [{
            latitude: latitude,
            longitude: longitude,
            name: '我的位置',
            desc: ''
          }],
          covers: [{
            latitude: latitude,
            longitude: longitude,
            iconPath: ''
          }]
        })

        return app.baidu.getCity(latitude,longitude)
      }).then((res) => {
        let markers = this.data.markers
        markers[0].desc = res.formatted_address
        this.setData({
          markers: markers,
          formattedAddress: res.formatted_address,
          loading: false
        })
      })
  },
  tapPoi(e) {
    console.log(e)
    // wx.chooseLocation({
    //   success: (res) => {
    //     console.log(res)
    //   }
    // })
  }
})