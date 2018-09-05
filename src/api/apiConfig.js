// const BASEURL = 'https://www.easy-mock.com/mock/5b0fa56b6a4029656363ab8d/WebShop'
const BASEURL = 'https://api.myjson.com/bins/g7q58'

const LCOALURL = 'http://localhost:3000/'

const url = {
  // getShoppingInfo: BASEURL + '/index', // 商城首页信息
  getShoppingInfo: BASEURL,
  registerUser: LCOALURL + 'user/register', // 用户注册接口
  loginUser: LCOALURL + 'user/login', // 用户登录接口
  GoodsInfo: LCOALURL + 'goods/getDetailGoodsInfo', // 获取商品详情
  getCategoryList: LCOALURL + 'goods/getCategoryList', // 得到商品大类信息
  getCategorySubList: LCOALURL + 'goods/getCategorySubList', // 得到商品小类信息
  getGoodsListByCateroySubID: LCOALURL + 'goods/getGoodsListByCateroySubID' // 根据类别获取商品列表
}

export default url
