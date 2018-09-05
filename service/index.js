const Koa = require('koa')
const app = new Koa()
const { connect, initSchema } = require('./database/init.js')
// const mongoose = require('mongoose')
// 引入中间件
const bodyParser = require('koa-bodyparser') // 处理post请求
// 注册中间件
app.use(bodyParser())
// 处理跨域
const cors = require('koa2-cors')
app.use(cors())
// 引入router
const Router = require('koa-router')

const user = require('./appApi/user.js')
const goods = require('./appApi/goods.js')

// 装载所有子路由
const router = new Router()
router.use('/user', user.routes())
router.use('/goods', goods.routes())
// 加载路由中间件

app.use(router.routes())
app.use(router.allowedMethods())

// 立即执行函数
;(async() => {
  await connect() // 链接
  initSchema() // 初始化
  // const User = mongoose.model('User')
  // const oneUser = new User({ UserName: 'jspang2', password: '123456' })
  // oneUser.save().then(() => {
  //   console.log('插入成功')
  // })

  // const user = await User.findOne({})
  // console.log(user)
})()

// app.use(async(ctx) => {
//   ctx.body = '<h1>Hello world</h1>'
// })

app.listen(3000, () => {
  console.log('[Server] starting at port http://localhost:3000')
})

