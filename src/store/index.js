import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import Cookies from 'js-cookie'
import url from '././../api/apiConfig'
import axios from 'axios'

Vue.use(Vuex)
const store = new Store({
  state: {
    status: Cookies.get('SET_STATUS') || ''
  },
  mutations: {
    SET_STATUS(state, status) {
      state.status = status
    }
  },
  actions: {
    LoginUserName({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        axios({
          url: url.loginUser,
          method: 'post',
          data: userInfo
        }).then(res => {
          const data = res.data
          if (data.code === 0) {
            commit('SET_STATUS', data.status)
            Cookies.set('SET_STATUS', data.status)
          }
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    logOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_STATUS', '')
        Cookies.remove('SET_STATUS')
        localStorage.removeItem('cartInfo')
        resolve()
      })
    }
  }
})

export default store
