<template>
  <div @click="showPopup" :class="'cart-fixed'">购物车</div>
  <Popup v-model:show="show" position="right" :class="'global-cart-list'">
    <h3>购物车列表</h3>
    <Row v-if="StoreCarts.length > 0">
      <Col v-for="goods in StoreCarts" :key="goods.id" span="24">
        <Goods-Carts
          :goods="goods"
          @removeGoods="removeGoods"
          @changeNum="changeNum"
        ></Goods-Carts>
      </Col>
    </Row>
    <Row v-else>
      <Col span="24">
        <Empty image="error" description="赶紧去剁手吧"></Empty>
      </Col>
    </Row>
  </Popup>
</template>

<script>
import GoodsCarts from './GoodsCarts'

import { compare } from 'utils/libs'

import { mapGetters, mapActions } from 'vuex'

import { ref } from 'vue'
import { Popup, Row, Col, Empty } from 'vant'

import { filterGoodsInCarts, filterGoodsIsInArray } from 'api/filterData'

export default {
  name: 'cart',
  setup () {
    const show = ref(false)
    const showPopup = () => {
      show.value = true
    }
    async function newActionCarts (arr) {
      this.updateCarts({
        carts: arr
      })
    }
    return {
      show,
      showPopup,
      newActionCarts
    }
  },
  created () {
    const carts = localStorage.getItem('carts')
    if (carts) {
      this.newActionCarts(JSON.parse(carts))
    }
  },
  updated () {
    console.log('Cart------------')
  },
  methods: {
    removeGoods (goods) {
      const arr = filterGoodsInCarts(this.StoreCarts, goods)
      this.newActionCarts(arr)
    },
    changeNum (value, goods) {
      const changeGoods = filterGoodsIsInArray(this.StoreCarts, goods)[0]
      const otherGoods = filterGoodsInCarts(this.StoreCarts, goods)
      const newGoods = { ...changeGoods, num: value }
      this.newActionCarts([...otherGoods, newGoods].sort(compare('sort')))
      localStorage.setItem('carts', JSON.stringify(this.StoreCarts))
    },
    ...mapActions([
      'updateCarts'
    ])
  },
  computed: {
    ...mapGetters([
      'StoreCarts'
    ])
  },
  components: {
    Popup,
    Row,
    Col,
    Empty,
    GoodsCarts
  }
}
</script>

<style lang="scss" scoped>
</style>
