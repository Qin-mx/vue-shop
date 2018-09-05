<template>
    <div>
        <van-nav-bar
        title="我的订单"
        left-arrow
        @click-left="onClickLeft"
        />
        <!-- 商品列表 -->
        <div class="shop-cart" v-if="isEmpty">
           <van-card
            :title="item.Name ? item.Name :'当前商品已失效'"
            :num="item.Name?item.count:null"
            :price="item.price ?item.price*item.count: null"
            :thumb="item.image ? item.image : errorImg"
            v-for="(item,index) in orderInfo"
            :key="index"
            >
        </van-card>
        </div>

        <!-- 没有数据的显示 -->
        <div class="cart-empty" v-else>
          还没有购物呢~~
        </div>
    </div>
</template>

<script>
    export default {
      name: 'Myorder',
      data() {
        return {
          orderInfo: [], // 购物车内的商品
          errorImg: 'https://github.com/shenghy/SmileVue/blob/master/src/assets/images/errorimg.png?raw=true'
        }
      },
      created() {
        this.getOrderInfo()
      },
      methods: {
        onClickLeft() {
          this.$router.go(-1)
        },
        // 得到购物车的商品
        getOrderInfo() {
          // 判断localStorage里是否有购物车数据
          if (localStorage.orderInfo) {
            // 如果有数据，我们去除并赋值给cartInfo
            this.orderInfo = JSON.parse(localStorage.orderInfo)
          }
          // 打印到控制台查看效果
          console.log('当前数据:' + JSON.stringify(this.orderInfo))
          this.isEmpty = this.orderInfo.length > 0
          console.log(this.orderInfo)
        },
        // 清空购物车的商品
        clearCart() {
          localStorage.removeItem('orderInfo')
          this.orderInfo = []
        }
      }
    }
</script>

<style scoped lang="scss">
  .cart-empty{
    font-szie: 16px;
    color: #999;
    text-align: center;
    height: 3rem;
    line-height: 3rem;
    background: #fff;
  }
  .card-title{
    width: 100%;
    height: 2.5rem;
    background-color: #fff;
    border-bottom:1px solid #E4E7ED;
    box-sizing: border-box;
    padding:5px;
    text-align: right;
    // position: fixed;
    // top: 46px;
}
.catr-fixed-bottom{
  bottom: 50px;
}
</style>