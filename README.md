#### 介绍
* 仿豆瓣电影小程序
#### 功能介绍
##### 已实现功能
* 显示电影信息,根据地理位置展现正在上映的电影,即将上映的电影和豆瓣电影top250，新片榜等
* 搜索电影信息（douban api不可用）
* 获取地理位置信息（使用百度地图api把经纬度转化成城市),可以在app中更新位置信息
* 获取用户信息并显示（button open-type=“getuserInfo” + wx.getUserInfo）
* 修改个人信息并保存
* 显示系统信息
* 清除缓存
##### todo
* 浏览记录展示
* "我的"页面" 换肤
#### 截图
![屏幕截图](https://github.com/yukiiyong/movie-weixin/blob/master/images/20180917_153005.gif)

#### 使用的api
* 豆瓣 https://douban.uieee.com/v2/movie
* 百度地图 https://api.map.baidu.com

#### 下载运行
* git clone https://github.com/yukiiyong/movie-weixin/new/master?readme=1.git
* npm install 
* 使用微信开发者工具预览和上传
