/* 登录校验中间件 */

module.exports = options => {
  const AdminUser = require('../models/AdminUser')
  // 引入jwt
  const jwt = require('jsonwebtoken')
  // http错误处理
  const assert = require('http-assert')
  return async (req, res, next) => {   
    // 从请求头中获取token，后端用小写
    // 根据空格分割字符串，第二个才是token
    const token = String(req.headers.authorization || '').split(' ').pop()
    // 验证token存在
    assert(token, 401, '请先登录')
    // 最终会解析出来{id: .....}，也就是用于生成token的东西
    // req.app 等同与 app是express规定的
    const { id } = jwt.verify(token, req.app.get('secret'))
    // 验证id存在
    assert(id, 401, '请先登录')
    req.user = await AdminUser.findById(id)
    // 以上三步，token,id,req.user任意一步有问题都应该报错
    assert(req.user, 401, '请先登录')
    await next()
  }
}