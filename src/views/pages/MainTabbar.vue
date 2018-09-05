<template>
    <div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        
        <van-tabbar v-model="active" @change="changeActive">
            <van-tabbar-item icon="shop-collect">首页</van-tabbar-item>
            <van-tabbar-item icon="wap-nav">分类</van-tabbar-item>
            <van-tabbar-item icon="shopping-cart">购物车</van-tabbar-item>
            <van-tabbar-item icon="description">个人中心</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
      name: 'MainTabbar',
      data() {
        return {
          active: 0
        }
      },
      created() {
        this.handleNowActive()
      },
      methods: {
        // 判断当前路由
        handleNowActive() {
          const url = this.$route.path
          switch (url) {
            case 0:
              this.active = 0
              break
            case '/categorylist':
              this.active = 1
              break
            case 2:
              this.active = 2
              break
            case '/personal':
              this.active = 3
              break
          }
        },
        changeActive() {
          switch (this.active) {
            case 0:
              this.$router.push('/')
              break
            case 1:
              this.$router.push('/categorylist')
              break
            case 2:
              this.$router.push('/Cart')
              break
            case 3:
              this.$router.push('/personal')
              break
            default:
              this.$router.push('/')
              break
          }
        }
      }
    }
</script>

<style scoped>

</style>