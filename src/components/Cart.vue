<template>
  <div @click="showPopup" :class="'cart-fixed'">购物车</div>
  <Popup v-model:show="show" position="right" :class="'global-cart-list'">
    <h3>购物车列表</h3>
    <Row v-if="StoreCarts.length > 0" :class="'carts-fixed_wrapper'">
      <Col v-for="goods in StoreCarts" :key="goods.id" span="24">
        <Goods-Carts
          :goods="goods"
          :showChecked="true"
          @removeGoods="removeGoods"
          @changeNum="changeNum"
          @changeChecked="changeChecked"
        ></Goods-Carts>
      </Col>
    </Row>
    <Row v-else>
      <Col span="24">
        <Empty image="error" description="赶紧去剁手吧"></Empty>
      </Col>
    </Row>
    <Row>
      <SubmitBar ref="SubmitBar" :selectedGoods="selectedGoods" ></SubmitBar>
    </Row>
  </Popup>
</template>

<script>
import GoodsCarts from './GoodsCarts'
import SubmitBar from './SubmitBar'

import { compare, localStorageAction } from 'utils/libs'

import { mapGetters, mapActions } from 'vuex'

import { ref } from 'vue'
import { Popup, Row, Col, Empty } from 'vant'

import { filterGoodsInCarts, filterGoodsIsInArray } from 'api/filterData'

export default {
  name: 'cart',
  setup (props) {
    const show = ref(false)
    const selectedGoods = ref([])
    const showPopup = () => {
      show.value = true
    }
    const setSelectedGoods = (goods) => {
      console.log(goods)
      selectedGoods.value = goods
    }
    /**
     * 计算购物车已选
     * @params type 选中状态
     * @params goods 选中商品
    */
    async function computedCartsSelectedGoods (selectType, goods) {
      const oldSelectedCartsGoods = localStorageAction('get', 'saveCarts')
      let newSelectedCartsGoods = []
      if (selectType) {
        if (oldSelectedCartsGoods) {
          newSelectedCartsGoods = [...oldSelectedCartsGoods, goods]
        } else {
          newSelectedCartsGoods = [goods]
        }
      } else {
        newSelectedCartsGoods = oldSelectedCartsGoods.filter(item => {
          return item.id !== goods.id
        })
      }
      localStorageAction('set', 'saveCarts', newSelectedCartsGoods)
      this.setSelectedGoods(newSelectedCartsGoods)
    }
    async function newActionCarts (arr) {
      this.updateCarts({
        carts: arr
      })
    }
    return {
      show,
      showPopup,
      newActionCarts,
      computedCartsSelectedGoods,
      setSelectedGoods,
      selectedGoods
    }
  },
  created () {
    const carts = localStorage.getItem('carts')
    if (carts) {
      this.newActionCarts(JSON.parse(carts))
    }
    const selectedArray = localStorageAction('get', 'saveCarts') || []
    this.setSelectedGoods(selectedArray)
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
      localStorageAction('set', 'carts', this.StoreCarts)
      // this.computedCartsSelectedGoods(value, goods)
    },
    changeChecked (value, goods) {
      const changeGoods = filterGoodsIsInArray(this.StoreCarts, goods)[0]
      const otherGoods = filterGoodsInCarts(this.StoreCarts, goods)
      const newGoods = { ...changeGoods, checked: value }
      this.newActionCarts([...otherGoods, newGoods].sort(compare('sort')))
      localStorageAction('set', 'carts', this.StoreCarts)
      this.computedCartsSelectedGoods(value, goods)
      // this.$refs.SubmitBar.computedPrice(this.selectedGoods)
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
    GoodsCarts,
    SubmitBar
  }
}
</script>

<style lang="scss" scoped>
.global-cart-list {
  overflow: hidden;
}
.carts-fixed_wrapper {
  overflow-y: auto;
  height: 100%;
  box-sizing: border-box;
  padding-bottom: 150px;
  align-content: start;
}
</style>
