<template>
    <div class="floor-bar">
        <div class="title border-bottom">{{title}}</div>
          <div class="floor bdb">
              <div class="floor-left bdr border-right ">
                <img v-lazy="floor1_1.image" alt="" width="100%">
              </div>
              <div>
                <div class="bdb border-bottom"><img v-lazy="floor1_2.image" alt="" width="100%"></div>
                <div><img v-lazy="floor1_3.image" alt="" width="100%"></div>
              </div>
          </div>
          <div class="floor-rule">
            <div v-for="(item, index) in floorData.slice(3)" :key="index" class="border-right border-bottom">
              <img v-lazy="item.image" alt="" width="100%">
            </div>
          </div>
      </div>
</template>

<script>
export default {
  props: {
    floorData: {
      type: Array
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      floor1_1: {},
      floor1_2: {},
      floor1_3: {}
    }
  },
  watch: {
    floorData() {
      this.floor1_1 = this.floorData[0]
      this.floor1_2 = this.floorData[1]
      this.floor1_3 = this.floorData[2]
    },
    title() {
      return this.title
    }
  }
}
</script>

<style scoped lang="scss">
$BgColor: #e5017d;
$fontSize1: 0.875rem;
$fontSize2: 0.75rem;
.title{
    border-bottom-color:#eeeeee;
    font-size: $fontSize1;
    line-height: 1.8rem;
    padding: 0.2rem;
    color: $BgColor;
}
.floor-bar {
  background: #fff;
  margin: 0.3rem;
  div {
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    flex: 1;
  }
  .floor {
    display: flex;
    flex-direction: row;
  }
  .floor-rule {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    img {
      flex: 1;
    }
    div {
      border-bottom-color:#dddddd;
      border-right-color: #fff;
      &:nth-child(odd) {
        border-right-color: #dddddd;
      }
    }
  }
}
</style>