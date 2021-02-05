// 导出函数，参数期待express实例
module.exports = app => {
  const mongoose = require('mongoose')
  // 连接admin这个数据库，和视频有区别，注意注意！
  mongoose.connect('mongodb://127.0.0.1:27017/node-vue-admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}