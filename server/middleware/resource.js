
module.exports = options => {
  return async (req, res, next) => {
    // 小写复数（req.params.resource）转大写单数（对应的库）
    const modelName = require('inflection').classify(req.params.resource)
    // 引入相应的模型，防止其他块访问不到，挂载到req上
    req.Model = require(`../models/${modelName}`)
    // 中间件函数一定要next()
    next()
  }
}