// 定义Category的模型，数据库中会变成复数
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  // 类型是mongoose里的id类型，ref：关联着Category这个模型，也就是它本身
  // 找当前分类的父级分类，就从Category里面找id和parent的type值相同的
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}
})

module.exports = mongoose.model('Category', schema)