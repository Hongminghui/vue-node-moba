// 定义Category的模型，数据库中会变成复数
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  items: [{
    image: { type: String },
    // 点击图片，跳转的地址
    url: { type: String }
  }]
})

module.exports = mongoose.model('Ad', schema)