const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt') // 引入加密
// 定义一个主键
const ObjectId = Schema.Types.ObjectId

// 定义加密密码计算强度
var SALT_WORK_FACTOR = 10

// 开始创建Schema

const userSchema = new Schema({
  UserId: ObjectId,
  UserName: { unique: true, type: String },
  password: String,
  createdAt: { type: Date, default: Date.now() },
  lastLoginAt: { type: Date, default: Date.now() }
})

// 加盐及加密
// 内部方法，每次保存的时候
userSchema.pre('save', function(next) {
  const that = this
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      return next(err)
    }
    bcrypt.hash(that.password, salt, function(err, hash) {
      if (err) {
        return next(err)
      }
      that.password = hash
      next()
    })
  })
})

userSchema.methods = {
  comparePassword: (_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) resolve(isMatch)
        else reject(err)
      })
    })
  }
}
// 发布模型
mongoose.model('User', userSchema)
