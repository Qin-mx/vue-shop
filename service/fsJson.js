const fs = require('fs')

fs.readFile('./goods.json', 'utf8', function(err, data) {
  if (err) {
    console.log(err)
  } else {
    // 包装一下
    const newData = JSON.parse(data)
    const pushData = []
    // 提纯
    newData.RECORDS.map(function(value, index) {
      if (value.IMAGE1 != null) { // 不等于1的时候push
        pushData.push(value)
      }
    })
    // console.log(pushData)
    // 获取新数据以后，将其写入新文件
    fs.writeFile('./newGoods.json', JSON.stringify(pushData), function(err) {
      if (err) console.log('写入文件失败')
      else console.log('写入文件操作成功')
    })
  }
})
