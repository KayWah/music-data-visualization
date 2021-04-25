<template>
  <Loading v-if="!loading"></Loading>
  <Row v-else-if="loading && StoreCarts.length > 0">
    <Col
      v-for="goods in StoreCarts"
      :key="goods.id"
      span="6"
      :class="'card-wrapper'"
    >
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
</template>

<script>
import { ref } from 'vue'

import GoodsCarts from 'components/GoodsCarts'

import { compare } from 'utils/libs'

import { mapGetters, mapActions } from 'vuex'

import { Col, Row, Empty, Loading } from 'vant'

import { filterGoodsInCarts, filterGoodsIsInArray } from 'api/filterData'

export default {
  name: 'cart',
  data () {
    return {
      carts: []
    }
  },
  created () {
    const carts = localStorage.getItem('carts')
    if (carts) {
      this.newActionCarts(JSON.parse(carts))
    }
    this.setLoading(true)
  },
  computed: {
    ...mapGetters([
      'StoreCarts'
    ])
  },
  methods: {
    removeGoods (goods) {
      const arr = filterGoodsInCarts(this.StoreCarts, goods)
      localStorage.setItem('carts', JSON.stringify(arr))
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
  updated () {
    console.log('Carts===============')
  },
  setup () {
    const loading = ref(false)
    function setLoading (status) {
      loading.value = status
    }
    async function newActionCarts (arr) {
      this.updateCarts({
        carts: arr
      })
    }
    return {
      newActionCarts,
      loading,
      setLoading
    }
  },
  components: {
    GoodsCarts,
    Col,
    Row,
    Empty,
    Loading
  }
}
</script>

<style lang="scss" scoped>
</style>
