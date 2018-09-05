// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Button, Row, Col, Swipe, SwipeItem, Lazyload, List, Field, NavBar, Cell, CellGroup, Popup, Tab,
  Tabs, PullRefresh, GoodsAction, GoodsActionBigBtn, GoodsActionMiniBtn, Card, Stepper, SubmitBar, Tabbar,
  TabbarItem, AddressList, AddressEdit
} from 'Vant'
Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(Field).use(NavBar)
  .use(Cell).use(CellGroup).use(Popup).use(Tab).use(Tabs).use(PullRefresh).use(GoodsAction).use(GoodsActionBigBtn)
  .use(GoodsActionMiniBtn).use(Card).use(SubmitBar).use(Stepper).use(Tabbar).use(TabbarItem).use(AddressList).use(AddressEdit)

// 导入样式
import '@/styles/index.scss'
import '@/assets/border.css'
// import '@/utils/flexible.js'
// 导入filter
import * as filters from '@/filter'
import store from './store'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
