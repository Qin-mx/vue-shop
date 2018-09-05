<template>
    <div>
        <van-nav-bar
        title="购物车"
        left-arrow
        @click-left="onClickLeft"
        />
        <!--清空购物车-->
        <div class="card-title" v-if="isEmpty">
            <van-button size="small" type="danger" @click="clearCart" plain >清空购物车</van-button>
        </div>
        <!-- 商品列表 -->
        <div class="shop-cart" v-if="isEmpty">
            <van-card
            :title="item.Name ? item.Name :'当前商品已失效'"
            :num="item.Name?item.count:null"
            :price="item.price ?item.price*item.count: null"
            :thumb="item.image ? item.image : errorImg"
            v-for="(item,index) in cartInfo"
            :key="index"
            >
            <div slot="footer">
                <van-stepper v-model="item.count" v-if="item.Name" integer/>
            </div>
        </van-card>
        </div>

        <!-- 没有数据的显示 -->
        <div class="cart-empty" v-else>
          当前购物车为空~~
        </div>
        <van-submit-bar
        :loading="loading"
        :price="totalPrice"
        button-text="提交订单"
        @submit="onSubmit"
        :disabled="!isEmpty"
        class="catr-fixed-bottom"
      />
    </div>
</template>

<script>
    export default {
      name: 'Cart',
      data() {
        return {
          loading: false,
          cartInfo: [], // 购物车内的商品
          isEmpty: false, // 购物车是否为空，不为空则显示true，为空显示false
          errorImg: 'https://github.com/shenghy/SmileVue/blob/master/src/assets/images/errorimg.png?raw=true'
        }
      },
      created() {
        this.getCartInfo()
      },
      computed: {
        totalPrice() {
          let totalMoney = 0
          this.cartInfo.forEach((item, index) => {
            totalMoney += item.price * item.count
          })
          localStorage.cartInfo = JSON.stringify(this.cartInfo)

          return totalMoney * 100
        }
      },
      methods: {
        onClickLeft() {
          this.$router.go(-1)
        },
        // 得到购物车的商品
        getCartInfo() {
          // 判断localStorage里是否有购物车数据
          if (localStorage.cartInfo) {
            // 如果有数据，我们去除并赋值给cartInfo
            this.cartInfo = JSON.parse(localStorage.cartInfo)
          }
          // 打印到控制台查看效果
          console.log('当前数据:' + JSON.stringify(this.cartInfo))
          this.isEmpty = this.cartInfo.length > 0
          console.log(this.cartInfo)
        },
        // 提交订单
        onSubmit() {
          this.loading = true
          // 不管本地存在了就添加进去，不去重
          let orderInfo = localStorage.orderInfo ? JSON.parse(localStorage.orderInfo) : []
          if (localStorage.orderInfo) {
            this.cartInfo.forEach(v => {
              orderInfo.unshift(v)
            })
          } else {
            orderInfo = this.cartInfo
          }
          localStorage.orderInfo = JSON.stringify(orderInfo)
          setTimeout(() => {
            this.loading = false
            this.clearCart()
          }, 1000)
        },
        // 清空数据
        // 清空购物车的商品
        clearCart() {
          localStorage.removeItem('cartInfo')
          this.cartInfo = []
          this.isEmpty = this.cartInfo.length > 0
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