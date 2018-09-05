const Router = require('koa-router')
const mongoose = require('mongoose')

const router = new Router()

router.get('/', async(ctx) => {
  ctx.body = '这是用户操作首页'
})

router.post('/register', async(ctx) => {
  const User = mongoose.model('User')
  const newUser = new User(ctx.request.body)
  await newUser.save().then(() => {
    ctx.body = {
      code: 200,
      message: '注册成功'
    }
  }).catch(error => {
    ctx.body = {
      code: 500,
      message: error
    }
  })
//   console.log(ctx.request.body)
//   console.log(ctx)
//   ctx.body = ctx.request.body
})

router.post('/login', async(ctx) => {
  const loginUser = ctx.request.body // 得到传过来的信息
  console.log(loginUser)
  const UserName = loginUser.UserName
  const password = loginUser.password
  // 引入user的model
  const User = mongoose.model('User')
  await User.findOne({ UserName }).exec().then(async(result) => {
    if (result) {
      const newUser = new User()
      await newUser.comparePassword(password, result.password)
        .then((isMatch) => {
          if (isMatch) {
            ctx.body = { code: 0, message: '登录成功', status: 1 }
          } else {
            ctx.body = { code: 200, message: '密码错误' }
          }
        })
        .catch(err => {
          ctx.body = { code: 500, message: err }
        })
    } else {
      ctx.body = { code: 200, message: '用户名不存在' }
    }
  }).catch(err => {
    console.log(err)
    ctx.body = { code: 500, message: err }
  })
})

module.exports = router
