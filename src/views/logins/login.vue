<template>
    <div class="group">
        <van-nav-bar
            title="用户登录"
             left-arrow
            @click-left="goBack"
        />
        <van-cell-group class="login-panel">
            <van-field
                v-model="username"
                label="用户名"
                icon="clear"
                placeholder="请输入用户名"
                required
                @click-icon="username = ''"
            />

            <van-field
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
            />
        </van-cell-group>
        <van-button class="btn"  type="primary" size="large" @click="registerAction" :loading="loginloading ">登录</van-button>
    </div>
</template>
<script>
    import { Toast } from 'Vant'
    export default {
      name: 'login',
      data() {
        return {
          username: '',
          password: '',
          loginloading: false,
          tips: '',
          isshow: false
        }
      },
      created() {
        if (localStorage.UserName) {
          Toast.success('您已经登录过')
          this.$router.push({ path: '/' })
        }
      },
      methods: {
        goBack() {
          this.$router.go(-1)
        },
        registerAction() {
          if (this.checkForm()) {
            this.handleRegister()
          }
        },
        handleRegister() {
          this.loginloading = true
          const data = {
            UserName: this.username,
            password: this.password
          }
          this.$store.dispatch(
            'LoginUserName', data
          ).then(res => {
            if (res.code === 0) {
              Toast.success(res.message)
              this.$router.push({ path: '/' })
            } else {
              Toast.fail(res.data.message)
            }
            this.loginloading = false
          }).catch(error => {
            this.loginloading = false
            console.log(error)
          })
        },
        checkForm() {
          let isOk = true
          if (this.username.length < 5) {
            this.tips = '用户名长度不应小于5位'
            isOk = false
          } else {
            this.tips = ''
          }
          if (this.password.length < 6) {
            this.tips = '密码长度不应小于6位'
            isOk = false
          } else {
            this.tips = ''
          }
          return isOk
        }
      }
    }
</script>
<style scope>
.login-panel{
    width: 96%;
    margin:20px auto;
    border-radius: 5px;
}
.btn{
    display: block;
    width: 96%;
    margin: 2rem auto 5rem;
}
</style>
