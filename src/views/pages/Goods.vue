<template>
    <div>
        <van-nav-bar
            title="商品详情页"
            fixed
            left-arrow
            @click-left="onClickLeft"
        />
        <!-- 图片 -->
        <div class="goods-header">
            <img :src="GoodsInfo.IMAGE1" alt="" width="100%" :onerror="errorImg" v-lazy="GoodsInfo.IMAGE1">
        </div>
        <!-- actions商品名称价格 -->
        <div class="goods-main">
            <div class="goods-info">
               <p class="goods-name">{{GoodsInfo.NAME}}</p>
               <p class="goods-price">￥{{GoodsInfo.PRESENT_PRICE | toMoney}} 元<del>￥{{GoodsInfo.ORI_PRICE | toMoney}} 元</del></p>
            </div>
            <van-tabs sticky swipeable>
                <van-tab title="商品详情">
                    <div class="info-img" v-html="GoodsInfo.DETAIL"></div>
                </van-tab>
                <van-tab title="评论">
                    <div class="comments">
                        评价页面暂时无
                    </div>
                    
                </van-tab>
            </van-tabs>

            <!-- <div class="goods-btn">
                <div>
                    <van-button size="large" type="primary">加入购物车</van-button>
                    <van-button size="large" type="danger">直接购买</van-button>
                </div>
            </div>   -->
            <van-goods-action>
                <!-- <van-goods-action-mini-btn icon="chat" text="客服" @click="onClickMiniBtn" />
                <van-goods-action-mini-btn icon="cart" text="购物车" @click="onClickMiniBtn" /> -->
                <van-goods-action-big-btn text="加入购物车" @click="addGoodsToCart" />
                <!-- <van-goods-action-big-btn text="立即购买" @click="buyNowCart" primary /> -->
            </van-goods-action>          
        </div>
        
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/api/apiConfig'
import { Toast } from 'Vant'
export default {
  name: 'Goods',
  data() {
    return {
      GoodsInfo: {},
      goodsId: '',
      active: 0,
      errorImg: 'this.src="https://github.com/shenghy/SmileVue/blob/master/src/assets/images/errorimg.png?raw=true"'
    }
  },
  created() {
    console.log(this.$route)
    this.goodsId = this.$route.params.goodsId
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.goodsId) {
        vm.$router.go(-1)
        Toast.clear()
      } else {
        vm.getList()
      }
    })
  },
  methods: {
    getList() {
      axios({
        url: url.GoodsInfo,
        method: 'post',
        data: {
          goodsId: this.goodsId
        }
      }).then(res => {
        if (res.data.code === 200 && res.data.message) {
          this.GoodsInfo = res.data.message
        } else {
          Toast('服务器错误，数据获取失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 返回上一页
    onClickLeft() {
      this.$router.go(-1)
    },
    // 加入购物车
    addGoodsToCart() {
      // 本地是否有数据
      let cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) : []
      const isHaveGoods = cartInfo.find(cart => cart.goodsId === this.goodsId) // 类似于indexOf方法
      console.log(isHaveGoods)
      if (!isHaveGoods) {
        //   如果查找不到
        const newGoodsInfo = {
          goodsId: this.GoodsInfo.ID,
          Name: this.GoodsInfo.NAME,
          price: this.GoodsInfo.PRESENT_PRICE,
          image: this.GoodsInfo.IMAGE1,
          count: 1
        }
        cartInfo.push(newGoodsInfo)
        Toast.success('购物车添加成功')
      } else {
        isHaveGoods.count += 1
        cartInfo.push(isHaveGoods)
        cartInfo = Array.from(new Set(cartInfo))
        Toast('购物车已有此商品存在')
      }
      localStorage.cartInfo = JSON.stringify(cartInfo)
      //   跳转
      // this.$router.push({ name: 'Cart' })
    },
    // 立即购买
    buyNowCart() {

    }
  }
}
</script>

<style scoped lang="scss">
.goods-header{
    width: 100%;
    margin-top: 46px;
    text-align: center;
    img{
        width: 100%;
        object-fit: cover;
    }
}
.info-img{
        font-size: 0;
}
.goods-btn{
    width: 100%;
    position: fixed;
    bottom: 0;
    background: #fff;
    div{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        button{
            margin: 5px;
        }
    }

}
.comments{
    min-height:93vh;
}
</style>