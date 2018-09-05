<template>
    <div>
        <van-nav-bar
        title="收货地址"
        left-arrow
        @click-left="onClickLeft"
        />
        <van-address-list
            v-model="chosenAddressId"
            :list="list"
            @add="onAdd"
            @edit="onEdit"
        />
    </div>
</template>

<script>
import { Toast } from 'Vant'
export default {
  data() {
    return {
      chosenAddressId: '1',
      list: [
        {
          id: '1',
          name: '张三',
          tel: '13000000000',
          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
        },
        {
          id: '2',
          name: '李四',
          tel: '1310000000',
          address: '浙江省杭州市拱墅区莫干山路 50 号'
        }
      ]
    }
  },

  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },

    onAdd() {
      Toast('当前功能暂无')
    },

    onEdit(item, index) {
      Toast('当前功能暂无')
    }
  }
}
</script>

<style scoped>
</style>