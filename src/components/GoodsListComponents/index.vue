<template>
    <div class="goods-list" @click="goGoodsPrice">
        <div class="goods-image">
           <img v-lazy="Goods.image" alt="" width="90%">
        </div>
        <p class="goods-name">{{Goods.name}}</p>
        <p class="goods-price">￥{{Goods.mallPrice | toMoney}} <del>￥{{Goods.price | toMoney}}</del></p>
    </div>
</template>

<script>
    export default {
      props: {
        Goods: {
          type: Object
        }
      },
      methods: {
        goGoodsPrice() {
          this.$router.push({ name: 'Goods', params: { goodsId: this.Goods.goodsId }})
        }
      }
    }
</script>

<style scoped lang="scss">
.goods-image{
    text-align: center;
}
.goods-name{
    padding: 0 8px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
p{
    padding: 0 8px;
}
</style>