const Router = require('koa-router')
const router = new Router()
const mongoose = require('mongoose')

const fs = require('fs')
// router.get('/', async(ctx) => {
//   ctx.body = '这是GOODS'
// })
router.get('/insertAllGoodsInfo', async(ctx) => {
  fs.readFile('./newGoods.json', 'utf8', (err, data) => {
    if (err) console.log(err)
    else {
      data = JSON.parse(data)
      let saveCount = 0
      const Goods = mongoose.model('Goods')

      data.map((value, index) => {
        console.log(value)
        const newGoods = new Goods(value)
        newGoods.save().then(() => {
          saveCount++
          console.log('成功' + saveCount)
        }).catch(err => {
          console.log(err)
        })
      })

      ctx.body = '开始导入数据'
    }
  })
})
router.get('/insertAllCategory', async(ctx) => {
  fs.readFile('./category.json', 'utf8', (error, data) => {
    if (error) console.log(error)
    else {
      data = JSON.parse(data)
      let saveCount = 0
      const Category = mongoose.model('Category')
      data.RECORDS.map((value, index) => {
        console.log('vale' + index)
        const newCategory = new Category(value)
        newCategory.save().then(() => {
          saveCount++
          console.log('成功' + saveCount)
        }).catch(error => {
          console.log('失败：' + error)
        })
      })
      ctx.body = '开始导入数据'
    }
  })
})

router.get('/insertAllCategorySub', async(ctx) => {
  fs.readFile('./category_sub.json', 'utf8', (error, data) => {
    if (error) console.log(error)
    else {
      data = JSON.parse(data)
      let saveCount = 0
      const CategorySub = mongoose.model('Category_sub')
      data.RECORDS.map((value, index) => {
        const newCategorySub = new CategorySub(value)
        newCategorySub.save().then(() => {
          saveCount++
          console.log('成功' + saveCount)
        }).catch(error => {
          console.log('失败：' + error)
        })
      })
    }
  })
  ctx.body = '开始导入数据.'
})

// 获取商品详情信息接口
router.post('/getDetailGoodsInfo', async(ctx) => {
  try {
    const goodsId = ctx.request.body.goodsId
    const Goods = mongoose.model('Goods')
    const result = await Goods.findOne({ ID: goodsId }).exec()
    ctx.body = { code: 200, message: result }
  } catch (error) {
    ctx.body = { code: 500, message: error }
  }
})

// 获取商品的导航的列表
router.post('/getCategorySubList', async(ctx) => {
  try {
    console.log(ctx.request.body)
    const CategorySubId = ctx.request.body.categoryId
    const CategorySub = mongoose.model('Category_sub')
    const result = await CategorySub.find({ MALL_CATEGORY_ID: CategorySubId }).exec()
    ctx.body = { code: 200, message: result }
  } catch (err) {
    ctx.body = { code: 500, message: err }
  }
})

// 获取商品的导航
router.get('/getCategoryList', async(ctx) => {
  try {
    const Category = mongoose.model('Category')
    const result = await Category.find().exec()
    ctx.body = { code: 200, message: result }
  } catch (err) {
    ctx.body = { code: 500, message: err }
  }
})

// 根据类别获取商品列表
router.post('/getGoodsListByCateroySubID', async(ctx) => {
  try {
    const sub_id = ctx.request.body.sub_id // 当前商品的id
    const page = ctx.request.body.page // 当前页数
    const pageSize = ctx.request.body.pageSize || 10 // 每页显示的数量
    const start = (page - 1) * pageSize // 开始的位置

    const Goods = mongoose.model('Goods')
    const result = await Goods.find({ SUB_ID: sub_id }).skip(start).limit(pageSize).exec()
    ctx.body = { code: 200, message: result }
  } catch (error) {
    ctx.body = { code: 500, message: error }
  }
})
module.exports = router
