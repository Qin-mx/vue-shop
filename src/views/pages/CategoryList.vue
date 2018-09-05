<template>
    <div>
        <van-nav-bar
            title="类别列表"
            left-arrow
            @click-left="onClickLeft"
        />
        <van-row>
            <van-col span="6">
                <div class="leftNav" ref="leftNav">
                    <ul>
                        <li v-for="(item , index) in CategoryList" :key="item.ID" :class="{active:cateIndex ==  index }" @click="handleCategory(index)">
                            {{item.MALL_CATEGORY_NAME}}
                        </li>
                    </ul>
                </div>
            </van-col>
            <van-col span="18">
                <van-tabs v-model="active" @click="onClickCategorySub">
                    <van-tab v-for="(item,index) in CategoryListSub" :title="item.MALL_SUB_NAME" :key="index">
                    </van-tab>
                </van-tabs>
                <!-- 上拉加载列表 -->
                <div class="list-div" ref="listdiv">
                    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                        <van-list v-model="loading" :finished="finished" @load="onLoad">
                            <div class="list-item" v-for="(item,index) in goodList" :key="index" @click="goGoodsInfo(item.ID)">
                                <div class="list-item-img">
                                  <img :src="item.IMAGE1" alt="" width="100%" :onerror="errorImg"/>
                                </div>
                                <div class="list-item-text">
                                    <div>{{item.NAME}}</div>
                                    <div class="">￥{{item.ORI_PRICE}}</div>
                                </div>
                            </div>
                        </van-list>
                    </van-pull-refresh>
                </div>

            </van-col>
        </van-row>
    </div>
</template>

<script>
    import axios from 'axios'
    import url from '@/api/apiConfig'
    import { Toast } from 'Vant'
    export default {
      name: 'CategoryList',
      data() {
        return {
          cateIndex: 0,
          CategoryList: [],
          CategoryListSub: [],
          active: 0,
          goodList: [], // 商品列表信息
          loading: false, // 上拉加载使用
          finished: false, // 下拉加载是否没有数据了
          count: 0,
          isLoading: false, // 是否下拉
          listQuery: { // 商品列表需要的数据
            page: 1, // 页数
            pageSize: 10 // 每页的个数
          },
          sub_id: null, // id
          errorImg: 'this.src="https://github.com/shenghy/SmileVue/blob/master/src/assets/images/errorimg.png?raw=true"'
        }
      },
      created() {
        this.getCategory()
      },
      mounted() {
        const height = document.documentElement.clientHeight
        this.$refs.leftNav.style.height = height - 46 + 'px'
        this.$refs.listdiv.style.height = height - 140 + 'px'
      },
      methods: {
        onClickLeft() {
          this.$router.go(-1)
        },
        // 获取左侧导航
        getCategory() {
          axios({
            url: url.getCategoryList,
            method: 'get'
          }).then(res => {
            if (res.data.code === 200 && res.data.message) {
              this.CategoryList = res.data.message
              this.getCategorySub(this.CategoryList[this.cateIndex].ID)
            } else {
              Toast('服务器错误，数据获取失败')
            }
          }).catch(err => {
            console.log(err)
          })
        },
        // 获取右侧数据
        getCategorySub(id) {
          var data = { categoryId: id }
          axios({
            url: url.getCategorySubList,
            method: 'post',
            data }).then(res => {
            if (res.data.code === 200 && res.data.message) {
              this.CategoryListSub = res.data.message
              this.sub_id = this.CategoryListSub[0].ID
              this.active = 0
            } else {
              Toast('服务器错误，数据获取失败')
            }
          }).catch(err => {
            console.log(err)
          })
        },
        // 选中
        handleCategory(val) {
          this.cateIndex = val
          this.listQuery.page = 1
          this.loading = true
          this.goodList = []
          this.finished = false
          this.getCategorySub(this.CategoryList[this.cateIndex].ID)
          this.onLoad()
        },
        // 商品列表接口数据的方法
        getGoodsList() {
          axios({
            url: url.getGoodsListByCateroySubID,
            method: 'post',
            data: {
              sub_id: this.sub_id,
              page: this.listQuery.page,
              pageSize: this.listQuery.pageSize
            }
          }).then(res => {
            if (res.data.code === 200 && res.data.message.length) {
              this.listQuery.page++
              this.goodList = this.goodList.concat(res.data.message)
            } else {
              this.finished = true // 当前状况下没有数据可以加载了
            }
            this.loading = false
          }).catch(err => {
            console.log(err)
          })
        },
        // 加载商品数量
        onLoad() {
          setTimeout(() => {
            this.sub_id = this.sub_id ? this.sub_id : this.CategoryListSub[0].ID
            this.getGoodsList()
          }, 500)
        },
        onRefresh() {
          setTimeout(() => {
            this.isLoading = false
            this.finished = false
            this.listQuery.page = 1
            this.goodList = []
            this.onLoad()
          }, 500)
        },
        // 点击导航切换商品信息
        onClickCategorySub(index, title) {
          this.sub_id = this.CategoryListSub[index].ID
          this.goodList = [] // 清空list的数据
          this.loading = true
          this.finished = false // 重新可以上拉
          this.listQuery.page = 1 // 默认页数
          this.onLoad()
        },
        // 跳转到商品详情页面
        goGoodsInfo(id) {
          this.$router.push({ name: 'Goods', params: { goodsId: id }})
        }
      }
    }
</script>

<style scoped lang="scss">
    .leftNav{
        background: #70c2db;
        li{
            font-size: 16px;
            height: 2rem;
            line-height: 2rem;
            color: #fff;
            padding: 0.2rem 0.3rem;
            text-align: center;
            border-bottom: 1px solid #fff;
        }
        .active{
            background: #fff;
            color: #666;
        }
    }
    .list-div{
        overflow: scroll;
    }
    .list-item{
      height: 6.25rem;
      background-color: #fff;
      border-bottom: 1px solid #f0f0f0;
      box-sizing: border-box;
      .list-item-img{
        width: 6.25rem;
        height: 6.25rem;
        padding: 0.5rem;
        text-align: center;
        box-sizing: border-box;
        float: left;
        img{
          width: 100%;
          object-fit: cover;
        }
      }
      .list-item-text{
        font-size: 14px;
        padding: 1rem ;
        box-sizing: border-box;
        div:nth-child(2){
          height: 2rem;
          line-height: 2rem;
        }
      }
    }
    // 两列
    .card{
        width: calc(50% - 0.2rem);
        display: inline-block;
        &:nth-child(2n-1){
          margin-right: 0.1rem;
        }
        &:nth-child(2n){
          margin-left: 0.1rem;
        }
        .list-item-img{
          width: 100%;
          height: 8rem;
          padding: 0.5rem;
          text-align: center;
          box-sizing: border-box;
        }
        .list-item-text{
            font-size: 14px;
            padding: 0 1rem;
            div{
                height: 1.5rem;
                line-height: 1.5rem;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap
            }
        }
    }


</style>