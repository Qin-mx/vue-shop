<template>
    <div>
        <header class="header">
            <img :src="Image" alt="" @click="showImagePreview">
        </header>
        <!-- 登录注册 -->
        <div class="login-btn" v-if="!status">
            <van-button type="primary" @click="targetLogin">登录</van-button>
            <van-button type="primary" @click="targetregister">注册</van-button>
        </div>
        <van-cell-group>
            <van-cell title="退出" v-if="status" @click="logOut"/>
            <van-cell title="地址管理" is-link @click="targetAddressList" />
            <van-cell title="我的订单" is-link @click="targetMyorder"/>
            <van-cell title="关于我们" is-link @click="alertAboutus"/>
        </van-cell-group>

        <van-popup v-model="show" class="popup-about">
            <p>用于练手，熟悉使用vue</p>
            <p>基于vue + axios + node + koa + vant</p>
        </van-popup>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { Toast } from 'Vant'
import { ImagePreview } from 'Vant'
export default {
  name: 'Personal',
  data() {
    return {
      show: false,
      Image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3198678185,878755003&fm=27&gp=0.jpg'
    }
  },
  computed: {
    ...mapState([
      'status'
    ])
  },
  methods: {
    alertAboutus() {
      this.show = true
    },
    targetAddressList() {
      if (this.status) {
        this.$router.push('/address')
      } else {
        Toast('请先登录')
      }
    },
    targetMyorder() {
      if (this.status) {
        this.$router.push('/order')
      } else {
        Toast('请先登录')
      }
    },
    targetLogin() {
      this.$router.push('/login')
    },
    targetregister() {
      this.$router.push('/register')
    },
    logOut() {
      this.$store.dispatch('logOut')
        .then(res => {
          Toast('当前账号已经退出')
        })
        .catch(err => {
          console.log(err)
        })
    },
    showImagePreview(position, timer) {
      ImagePreview([
        this.Image
      ]
      )
    }
  }
}
</script>

<style scoped lang="scss">
    .header{
        background: #ff5252;
        height: 6.25rem;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            width: 4rem;
            height: 4rem;
            border-radius: 50%;
        }
    }
    .login-btn{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding:  1rem 4rem;
    }
    .popup-about{
        font-size: 14px;
            padding: 1rem;
        width: 60vw;
        p{
            height: 2rem;
        }
    }
    .logout{
         display: flex;
        justify-content: center;
    }
</style>