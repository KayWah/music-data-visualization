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
        <empty-goods description="赶紧去剁手吧" image="error"></empty-goods>
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
import EmptyGoods from './EmptyGoods'

import { compare, localStorageAction } from 'utils/libs'
import { setDispatch } from 'utils/store'

import { useStore } from 'vuex'
// computed,, onUpdated
import { ref, computed } from 'vue'
import { Popup, Row, Col } from 'vant'

// import { filterGoodsInCarts } from 'api/filterData'

import useChangeNumber from '../hooks/useChangeNumber'
import useChangeCheckedType from '../hooks/useChangeCheckedType'
import useRemoveGoods from '../hooks/useRemoveGoods'

export default {
  name: 'cart',
  setup (props) {
    const store = useStore()
    const StoreGetters = store.getters

    const carts = localStorage.getItem('carts')

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
    const setCheckedMap = newCheckedMap => {
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
      const oldCheckedMap = localStorageAction('get', 'checkedMap')
      const newCheckedMap = Object.assign({}, oldCheckedMap, {
        [id]: selectType
      })
      localStorageAction('set', 'checkedMap', newCheckedMap)
      setCheckedMap(newCheckedMap)
      return newCheckedMap
    }
    /**
     * 方法说明
     * @method 更新vuex购物车列表
     * @param {Array} data 更新的产品数据
     */
    function updateCarts (data) {
      setDispatch(store, 'updateCarts', { carts: data })
    }
    /**
     * 方法说明
     * @method 计算购物车已选商品总金额
     * @param {Object} checkedMap 勾选的商品状态和id
     */
    async function computedPrice (checkedMap) {
      if (!checkedMap.value || JSON.stringify(checkedMap.value) === '{}') return false
      const carts = Object.entries(checkedMap.value)
        // 通过这个filter 筛选出所有checked状态为true的项
        .filter(entries => Boolean(entries[1]))
        .map(([checkedId]) =>
          localStorageAction('get', 'carts').find(
            ({ id }) => id === Number(checkedId)
          )
        )

      let totalPrice = 0
      if (carts) {
        carts.forEach(element => {
          totalPrice += element.subscribedCount * element.num
        })
      }
      price.value = totalPrice * 100
    }
    /**
     * 方法说明
     * @method 修改商品数量
     * @param {Number} value 需要修改的产品的数量
     * @param {Object} goods 需要修改的产品数据
     */
    function changeNum (value, goods) {
      // 购物车
      const { otherGoods, newGoods } = useChangeNumber(value, goods, StoreGetters.StoreCarts)
      updateCarts([...otherGoods, newGoods].sort(compare('sort')))
      localStorageAction('set', 'carts', StoreGetters.StoreCarts)
      computedPrice(checkedMap)
    }
    /**
     * 方法说明
     * @method 修改商品的勾选状态
     * @param {Number} value 需要修改的产品的勾选状态
     * @param {Object} goods 需要修改的产品数据
     */
    function changeChecked (value, goods) {
      // 修改购物车数据
      const { otherGoods, newGoods } = useChangeCheckedType(value, goods, StoreGetters.StoreCarts)
      updateCarts([...otherGoods, newGoods].sort(compare('sort')))
      localStorageAction('set', 'carts', StoreGetters.StoreCarts)
      // 修改商品勾选的数据
      computedCheckedMap(value, goods)
      computedPrice(checkedMap)
    }

    function removeGoods (goods) {
      // 更新购物车状态
      const arr = useRemoveGoods(goods, StoreGetters.StoreCarts)
      updateCarts(arr)
      localStorageAction('set', 'carts', arr)
      // 更新选择状态
      const oldCheckedMap = localStorageAction('get', 'checkedMap')
      delete oldCheckedMap[goods.id]
      localStorageAction('set', 'checkedMap', oldCheckedMap)
      computedPrice({ value: oldCheckedMap })
    }

    if (carts) {
      updateCarts(JSON.parse(carts))
    }
    const selectedArray = localStorageAction('get', 'saveCarts') || []
    setCheckedMap(selectedArray)

    return {
      show,
      showPopup,
      computedCheckedMap,
      setCheckedMap,
      checkedMap,
      computedPrice,
      price,
      removeGoods,
      changeNum,
      changeChecked,
      StoreCarts: computed(() => store.state.StoreCarts)
    }
  },
  created () {
    console.log('Cart-created------------')
  },
  updated () {
    console.log('Cart-updated------------')
  },
  components: {
    Popup,
    Row,
    Col,
    GoodsCarts,
    SubmitBar,
    EmptyGoods
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
