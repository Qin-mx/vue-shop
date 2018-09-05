<template>
    <div>
      <!-- 首页头部 -->
      <!-- <van-row gutter="5" class="search-bar">
          <van-col span="3">
            <i class="iconfont icon-dingwei"></i>
          </van-col>
          <van-col span="16">
            <input type="text" class="search-input" placeholder="查找">
          </van-col>
          <van-col span="5">
            <van-button size="mini" class="search-btn">查找</van-button>
          </van-col>
      </van-row> -->
      <van-nav-bar
        title="首页"
      />
      <!-- 首页banner -->
      <div class="banner-swiper">
          <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(item,index) in bannerImg" :key="index">
              <img :alt="'banner'+ index" width="100%" v-lazy="item.image">
            </van-swipe-item>
          </van-swipe>
      </div>
      <!-- 类别-->
      <div class="type-bar">
          <div v-for="(cata,index) in category" :key="index" class="type-image">
              <img v-lazy="cata.image" :alt="'type'+index" >
              <span>{{cata.mallCategoryName}}</span>
          </div>
      </div>
      <!-- 广告图片 -->
      <div class="adbanner-bar">
        <img v-lazy="advertesPicture" alt="ad" width="100%">
      </div>
      <!-- 商品推荐 -->
      <div class="recommend-area">
        <div class="title border-bottom">商品推荐</div>
        <div class="recommend-body border-bottom">
          <swiper :options="swiperOption">
              <swiper-slide v-for="(item,index) in recommend" :key="index">
                <div class="recommend-item border-right" >
                  <img v-lazy="item.image" alt="" width="80%">
                  <p class="recommend-desc">{{item.goodsName}}</p>
                  <p>￥{{item.price | toMoney}}<del>(￥{{item.mallPrice | toMoney }})</del></p>
                </div>
              </swiper-slide>
          </swiper>
        </div>
      </div>
      <!-- 商品楼层 -->
      <floor-component :floorData="floor1" :title="title.floor1"></floor-component>
      <floor-component :floorData="floor2" :title="title.floor2"></floor-component>
      <floor-component :floorData="floor3" :title="title.floor3"></floor-component>
      <!-- 热卖商品 -->
      <div class="hot-bar">
        <div class="title">热卖商品</div>
        <div class="hot-goods">
          <van-list>
              <van-row gutter="6">
                <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
                  <goods-list-components :Goods="item"></goods-list-components>
                </van-col>
              </van-row>
          </van-list>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import FloorComponent from '@/components/FloorComponent'
import GoodsListComponents from '@/components/GoodsListComponents'
import url from '@/api/apiConfig'
export default {
  name: 'ShopMail',
  components: {
    swiper,
    swiperSlide,
    FloorComponent,
    GoodsListComponents
  },
  created() {
    this.featchData()
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 3
      },
      category: [], // 类别
      bannerImg: [], // banner图
      advertesPicture: '', // 广告图片
      recommend: [], // 商品推荐
      floor1: [],
      floor2: [],
      floor3: [],
      title: {},
      hotGoods: [] // 热卖商品
    }
  },
  beforeCreate() {
    console.log('beforeCreate')
  },
  mounted() {
    console.log('mounted')
  },
  beforeMount() {
    console.log('beforeMount')
  },
  beforeUpdate() {
    console.log('beforeUpdate')
  },
  updated() {
    console.log('updated')
  },
  beforeDestroy() {
    console.log('beforeDestroy')
  },
  destroyed() {
    console.log('destroyed')
  },
  methods: {
    featchData() {
      axios({
        url: url.getShoppingInfo,
        method: 'get'
      }).then(res => {
        console.log(res)
        if (res.status === 200) {
          this.category = res.data.data.category
          this.bannerImg = res.data.data.slides
          this.advertesPicture = res.data.data.advertesPicture.PICTURE_ADDRESS
          this.recommend = res.data.data.recommend
          this.floor1 = res.data.data.floor1
          this.floor2 = res.data.data.floor2
          this.floor3 = res.data.data.floor3
          this.title = res.data.data.floorName
          this.hotGoods = res.data.data.hotGoods
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
$BgColor: #e5017d;
$fontSize1: 0.875rem;
$fontSize2: 0.75rem;
// .search-bar{
//   height: 2.3rem;
//   background: $BgColor;
//   line-height: 2.3rem;
//   text-align: center;
//   color: #fff;
//   margin: 0!important;
//   overflow: hidden;
// }
// .search-input{
//   width: 100%;
//   height: 1.3rem;
//   border-top:0;
//   border-left:0;
//   border-right:0;
//   border-bottom: 1px solid #fff;
//   font-size: $fontSize1;
//   color:#fff;
//   background-color: $BgColor;
// }
// .search-btn{
//   width: 60%;
//   height: auto;
//   line-height: 1.25rem;
//   font-size: $fontSize2;
// }
// input::-webkit-input-placeholder{
//             color:#ece8eb;
//   }
//   input::-moz-placeholder{   /* Mozilla Firefox 19+ */
//             color:#ece8eb;
//   }
//   input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
//             color:#ece8eb;
//   }
//   input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
//   color:#ece8eb;
// }

.banner-swiper{
  clear: both;
  max-height: 8.9rem;
  overflow: hidden;
}

.type-bar{
  background-color: #ffff;
  margin: 0.3rem;
  border-radius: .3rem;
  font-size:$fontSize1;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  text-align: center;
  div{
    padding: 0.3rem;
    font-size:$fontSize2;
    img{
      display: block;
      margin: 0.2rem auto;
    }
  }
}
.title{
    // border-bottom: 1px solid #eeeeee;
    border-bottom-color: #eeeeee;
    font-size: $fontSize1;
    padding: 0.2rem;
    color: $BgColor;
}
.recommend-area{
  background: #fff;
  margin: .3rem;
  .recommend-body{
    border-bottom-color: #eeeeee;
    .recommend-item{
      width: 99%;
      padding:0.3rem 0;
      border-right-color: #eeeeee;
      font-size:$fontSize2;
      text-align: center;
      line-height: 20px;
      .recommend-desc{
        height: 2.75rem;
        overflow: hidden;
      }
      del{
        padding:0 0.3rem
      }
    }
  }
}
.hot-bar{
  margin: .3rem;
  .title{
    background: #fff;
  }
  .goods-list{
    background: #fff;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    font-size: $fontSize2;
    line-height: 1.25rem;
    margin: 5px 0;
  }
}
.type-image{
  flex: 1;
  img{
    width: 80%;
  }
}
.hot-goods{
    margin-bottom: 60px;
    .van-col {
      height: 11.75rem;
    }
}
</style>
