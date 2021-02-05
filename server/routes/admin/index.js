// 导出一个函数，给server > index.js使用

// app是个形参，将会传过来express的实例
module.exports = app => {
  const express = require('express')
  const AdminUser = require('../../models/AdminUser')
  // 引入jwt
  const jwt = require('jsonwebtoken')
  // http错误处理
  const assert = require('http-assert')
  // 子路由
  const router = express.Router({
    // resource定义在路由中间件那里，要在下面的具体接口中使用resource
    // 需要合并参数，父子路由的参数合并，让子路由(router)能访问到
    mergeParams: true
  })
  
  // 登录校验中间件
  const authMiddleware = require('../../middleware/auth')

  // 根据请求的路径找到对应模型的中间件
  const resourceMiddleware = require('../../middleware/resource')

  /* 新建资源的接口 */
  router.post('/',  async (req, res) => {
    // 根据req.body创建文档，并文档传给客户端
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  /* 编辑时，获取编辑内容的接口 */
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  /* 编辑资源的接口 */
  router.put('/:id', async (req, res) => {
    // 第一个参数是id，第二个参数是更新的内容
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  /* 删除资源的接口 */
  router.delete('/:id', async (req, res) => {
    // 第一个参数是id，第二个参数是更新的内容
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  /* 获取资源列表的接口 */
  router.get('/', async (req, res) => {
    // 不是每个模型都有parent字段，所以需要判断
    const queryOptions = {}
    // 模型名称是Category
    if(req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(items)
  })

  
  
  /* 通用的增删改查接口 */
  // 1. 将第一个参数作为router请求的前缀 2. 登录校验 3：寻找对应模型
  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)


  /* 上传文件的接口 */
  // 因为express本身没有处理上传文件的能力，所以需要multer来处理
  const multer = require('multer')
  // dest: 要上传的地址，server下的uploads目录，__dirname:当前文件所在文件夹的绝对路径
  const upload = multer({dest: __dirname + '/../../uploads'}) 
  // upload.single('file'): 上传单个文件，字段名为file，上传时前端提交表单数据的就是file
  // multer中间件允许这个接口可以接收文件上传，并且把上传后的文件信息挂载到req.file
  // req.file包含文件路径大小等信息，express本身没有req.file
  app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async(req, res) => {
    const file = req.file
    // filename就是保存在uploads中的文件名，给file增加url属性，就是图片的地址
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  /* 登录页面的接口 */
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    // 1. 根据用户名找用户
    // 属性和值同名的简写方式
    // .select('+password'): 把隐藏的password取出来,+强制取，-排除
    const user = await AdminUser.findOne({username}).select('+password')
    // 验证用户是否存在，如果不存在状态码设置为422，抛出错误信息为‘用户不存在’
    // 后面的错误处理函数来捕获异常
    assert(user, 422, '用户不存在')
    
    // 2. 校验密码，参数是明文和密文，返回boolean值，true为正确
    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')

    // 3. 返回token
    const token = jwt.sign({id: user._id,}, app.get('secret'))
    res.send({token}) 
  })

  // 错误处理函数
  app.use(async (err, req, res, next) => {
    // statusCode: 错误时的状态码，如果没有状态码就报500错误
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}