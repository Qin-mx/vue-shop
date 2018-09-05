const mongoose = require('mongoose')
const db = 'mongodb://localhost/myDB'

const glob = require('glob')
const { resolve } = require('path')

exports.initSchema = () => {
  glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}
exports.connect = () => {
  // 链接数据库
  mongoose.connect(db)
  let maxConnectTimes = 0
  // 意外处理
  return new Promise((resolve, reject) => {
    // 所有处理都放在这里
    //   增加数据库链接事件监听
    mongoose.connection.on('disconnected', () => {
    // 重连
    // 不能无限重连，必须设置次数
      console.log('***************数据库断开')
      if (maxConnectTimes <= 3) {
        maxConnectTimes++
        mongoose.connect(db)
      } else {
        reject()
        throw new Error('数据库错误,请联系管理员')
      }
    })
    // 数据库链接失败
    mongoose.connection.on('error', err => {
      console.log('*********************数据库错误', err)
      if (maxConnectTimes <= 3) {
        maxConnectTimes++
        mongoose.connect(db)
      } else {
        reject()
        throw new Error('数据库错误,请联系管理员')
      }
    })
    // 链接打开的时候
    mongoose.connection.on('open', () => {
      console.log('MongoDB Connected successfully!')
      resolve()
    })
  })
}
