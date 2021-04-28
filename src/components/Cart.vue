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
      <SubmitBar
        ref="SubmitBar"
        :checkedMap="checkedMap"
        :price="price"
      ></SubmitBar>
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
    // 是否显示购物车列表
    const show = ref(false)
    // 购物车总金额
    const price = ref(0)
    // 选中的商品对象数组
    const checkedMap = ref([])
    const showPopup = () => {
      show.value = true
    }
    /**
     * 方法说明
     * @method 修改勾选的商品状态和id数组内容
     * @param {Object} newCheckedMap 新的勾选的商品状态和id
     */
    const setCheckedMap = (newCheckedMap) => {
      checkedMap.value = newCheckedMap
    }
    /**
     * 方法说明
     * @method 计算购物车已选
     * @param {Boolean} selectType 商品的选中状态
     * @param {Object} cartItem 商品
     * @return {Object} 返回勾选的商品状态和id
     */
    async function computedCheckedMap (selectType, cartItem) {
      const { id } = cartItem
      const oldCheckedMap = localStorageAction('get', 'checkMap')
      const newCheckedMap = Object.assign({}, oldCheckedMap, {
        [id]: selectType
      })
      localStorageAction('set', 'checkMap', newCheckedMap)
      this.setCheckedMap(newCheckedMap)
      return newCheckedMap
    }
    /**
     * 方法说明
     * @method 更新vuex购物车列表
     * @param {Array} arr 添加到购物车列表的数组
     */
    async function newActionCarts (arr) {
      this.updateCarts({
        carts: arr
      })
    }
    /**
     * 方法说明
     * @method 计算购物车已选商品总金额
     * @param {Object} checkedMap 勾选的商品状态和id
     */
    async function computedPrice (checkedMap) {
      const carts = Object.entries(checkedMap)
        // 通过这个filter 筛选出所有checked状态为true的项
        .filter((entries) => Boolean(entries[1]))
        .map(([checkedId]) =>
          localStorageAction('get', 'carts').find(
            ({ id }) => id === Number(checkedId)
          )
        )
      let totalPrice = 0
      carts.forEach((element) => {
        totalPrice += element.subscribedCount * element.num
      })
      price.value = totalPrice * 100
    }
    return {
      show,
      showPopup,
      newActionCarts,
      computedCheckedMap,
      setCheckedMap,
      checkedMap,
      computedPrice,
      price
    }
  },
  created () {
    console.log('Cart-created------------')
    const carts = localStorage.getItem('carts')
    if (carts) {
      this.newActionCarts(JSON.parse(carts))
    }
    const selectedArray = localStorageAction('get', 'saveCarts') || []
    this.setCheckedMap(selectedArray)
  },
  updated () {
    console.log('Cart-updated------------')
  },
  methods: {
    removeGoods (goods) {
      const arr = filterGoodsInCarts(this.StoreCarts, goods)
      const oldCheckedMap = localStorageAction('get', 'checkMap')
      delete oldCheckedMap[goods.id]
      this.newActionCarts(arr)
      localStorageAction('set', 'checkMap', oldCheckedMap)
      this.computedPrice(oldCheckedMap)
    },
    changeNum (value, goods) {
      // 购物车
      const changeGoods = filterGoodsIsInArray(this.StoreCarts, goods)[0]
      const otherGoods = filterGoodsInCarts(this.StoreCarts, goods)
      const newGoods = { ...changeGoods, num: value }
      this.newActionCarts([...otherGoods, newGoods].sort(compare('sort')))
      localStorageAction('set', 'carts', this.StoreCarts)

      this.computedCheckedMap(goods.checked, newGoods)
      this.computedPrice(this.checkedMap)
    },
    changeChecked (value, goods) {
      const changeGoods = filterGoodsIsInArray(this.StoreCarts, goods)[0]
      const otherGoods = filterGoodsInCarts(this.StoreCarts, goods)
      const newGoods = { ...changeGoods, checked: value }
      this.newActionCarts([...otherGoods, newGoods].sort(compare('sort')))
      localStorageAction('set', 'carts', this.StoreCarts)
      this.computedCheckedMap(value, goods)
      this.computedPrice(this.checkedMap)
    },
    ...mapActions(['updateCarts'])
  },
  computed: {
    ...mapGetters(['StoreCarts'])
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
