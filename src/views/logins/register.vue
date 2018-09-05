<template>
    <div class="group">
        <van-nav-bar
            title="用户注册"
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
                :error-message="nameError"
            />

            <van-field
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
                :error-message="passwordError"
            />
        </van-cell-group>
        <van-button class="btn"  type="primary" size="large" @click="registerAction" :loading="loginloading ">注册</van-button>


    </div>
</template>
<script>
    import axios from 'axios'
    import url from '@/api/apiConfig.js'
    import { Toast } from 'Vant'
    export default {
      name: 'register',
      data() {
        return {
          username: '',
          password: '',
          loginloading: false,
          nameError: '',
          passwordError: ''
        }
      },
      methods: {
        goBack() {
          this.$router.go(-1)
        },
        registerAction() {
          // 如果为真，就执行
          this.checkForm() && this.handleRegister()
        },
        // 登录接口调用
        handleRegister() {
          console.log(this.loginloading)
          this.loginloading = true
          axios({
            url: url.registerUser,
            method: 'post',
            data: {
              UserName: this.username,
              password: this.password
            }
          }).then(res => {
            if (res.data.code === 200) {
              Toast.success(res.data.message)
            } else {
              console.log(res.data.message)
              Toast.fail('注册失败')
            }
            this.loginloading = false
          }).catch(error => {
            this.loginloading = false
            console.log(error)
          })
        },
        // 表单验证方法
        checkForm() {
          let isOk = true
          if (this.username.length < 5) {
            this.nameError = '用户名不能小于五位'
            isOk = false
          } else {
            this.nameError = ''
          }

          if (this.password.length < 6) {
            this.passwordError = '密码不能小于6位'
            isOk = false
          } else {
            this.passwordError = ''
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
