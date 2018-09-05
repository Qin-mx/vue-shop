import Vue from 'vue'
import Router from 'vue-router'

import ShopMail from '@/views/pages/ShopMail'
import loginComponent from '@/views/logins/login'
import registerComponent from '@/views/logins/register'
import Goods from '@/views/pages/Goods'
import CategoryList from '@/views/pages/CategoryList'
import Cart from '@/views/pages/Cart'
import Personal from '@/views/pages/Personal'
import AddressList from '@/views/pages/AddressList'
import Myorder from '@/views/pages/Myorder'
import MainTabbar from '@/views/pages/MainTabbar'
Vue.use(Router)

export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [
    { path: '',
      name: 'MainTabbar',
      component: MainTabbar,
      redirect: '/',
      children: [
        { path: '/', name: 'ShopMail', component: ShopMail },
        { path: '/categorylist', name: 'CategoryList', component: CategoryList },
        { path: '/Cart', name: 'Cart', component: Cart },
        { path: '/personal', name: 'Personal', component: Personal }
      ]
    },

    { path: '/login', name: 'login', component: loginComponent },
    { path: '/register', name: 'register', component: registerComponent },
    { path: '/goods', name: 'Goods', component: Goods },
    { path: '/address', name: 'AddressList', component: AddressList },
    { path: '/order', name: 'Myorder', component: Myorder }

  ]
})
