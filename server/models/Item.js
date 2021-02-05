const mongoose = require('mongoose')

const schema = mongoose.Schema({
  name: { type: String },
  // 只保存图片地址
  icon: { type: String }
})

module.exports = mongoose.model('Item', schema)