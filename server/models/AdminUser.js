// 定义Category的模型，数据库中会变成复数
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: { type: String },
 
  // set函数，将输入的密码加密之后再存储
  password: { 
    type: String, 
    // select：隐藏，输入的时候密码不会显示，这样再次保存的时候，密码就不会二次加密了
    select: false, 
    set(val) {
    // 第一个参数是输入的值，第二个参数是加密等级，应该在10-12比较合理
    return require('bcrypt').hashSync(val, 12)
  }}
})

module.exports = mongoose.model('AdminUser', schema)