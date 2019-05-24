const app = getApp()
Component({
  options: {
    multipleSlots: true
  },
  //组件的属性列表（外部）
  properties: {
    keys: {
      type: Number,
      default: 0
    },
    controlScore: {
      type: Boolean,
      default: false
    },
    fontsize: {
      type: Number,
      default: 30
    },
    max: {
      type: Number,
      default: 10
    },
    color: {
      type: 'String',
      default: 'gold'
    }
  },
  //私有数据
  data: {
    stars: [0,1,2,3,4],
    dataKeys: 0
  },
  ready() {
    // console.log(this.data.keys)
    this.setData({
      dataKey: (this.data.keys / this.data.max) * 5 
    })
  },
  //组件方法列表
  methods: {
    //公有方法
    //点击左边，半颗星
    selectLeft(e) {
      if(!this.data.controlScore) {return}
      let key = e.currentTarget.dataset.key
      if(this.data.datakey === 0.5 && key === 0.5) {
        //只有一颗星的时候，或者每一颗星只有一半的时候，再次点击，变为0
        key = 0
      }
      this.setData({
        dataKey: key
      })
    },
    //点击右边，一颗星
    selectRight(e) {
      if(!this.data.controlScore) {return}
      let key = e.currentTarget.dataset.key
      this.setData({
        dataKey: key
      })
    }
  }
})