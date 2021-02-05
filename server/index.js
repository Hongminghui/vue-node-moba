const express = require('express')

const app = express()

// 给app加上一个属性secret，值为第二个参数，生成token用的，
// 正式的应该放在环境变量中（不知道怎么写）
app.set('secret', 'ertwesdfg6ityuiwqer')

// 需要用到req,res的属性就需要使用这个中间件
app.use(express.json())
// 允许跨域
app.use(require('cors')())
// 静态文件托管
app.use('/uploads', express.static(__dirname + '/uploads'))
// 执行admin > index.js，并且传入app
require('./routes/admin')(app) 

// 
require('./plugins/db')(app)

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
