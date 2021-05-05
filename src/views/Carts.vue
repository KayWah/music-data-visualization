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
        :showChecked="true"
        :goods="goods"
        @removeGoods="removeGoods"
        @changeNum="changeNum"
        @changeChecked="changeChecked"
      ></Goods-Carts>
    </Col>
  </Row>
  <Row v-else>
    <Col span="24">
      <empty-goods image="error" description="赶紧去剁手吧"></empty-goods>
    </Col>
  </Row>
</template>

<script>
import { ref, onUpdated, computed } from 'vue'

import GoodsCarts from 'components/GoodsCarts'

import EmptyGoods from 'components/EmptyGoods'

import { compare, localStorageAction } from 'utils/libs'

import { useStore } from 'vuex'

import { Col, Row, Loading } from 'vant'
// , filterGoodsIsInArray
// import { filterGoodsInCarts } from 'api/filterData'

import useChangeNumber from '../hooks/useChangeNumber'
import useChangeCheckedType from '../hooks/useChangeCheckedType'
import useRemoveGoods from '../hooks/useRemoveGoods'

export default {
  name: 'cart',
  data () {
    return {
      carts: []
    }
  },
  updated () {
    console.log('Cart-updateds===============')
  },
  setup () {
    const store = useStore()
    const StoreGetters = store.getters

    const carts = localStorage.getItem('carts')

    const loading = ref(false)

    onUpdated(() => {
    })

    // 设置加载状态
    function setLoading (status) {
      loading.value = status
    }

    /**
     * 方法说明
     * @method 更新状态
     * @param {Array} data 更新的产品数据
     */
    function updateCarts (data) {
      store.dispatch('updateCarts', { carts: data })
    }

    // 计算购物车已选
    async function computedCartsSelectedGoods () {
      localStorageAction('get', 'saveCarts')
    }

    /**
     * 方法说明
     * @method 删除商品
     * @param {Object} goods 需要删除的产品数据
     */
    function removeGoods (goods) {
      const arr = useRemoveGoods(goods, StoreGetters.StoreCarts)
      updateCarts(arr)
      localStorageAction('set', 'carts', arr)
      // 更新选择状态
      const oldCheckedMap = localStorageAction('get', 'checkedMap')
      delete oldCheckedMap[goods.id]
      localStorageAction('set', 'checkedMap', oldCheckedMap)
    }

    // 修改商品数量
    function changeNum (value, goods) {
      const { otherGoods, newGoods } = useChangeNumber(value, goods, StoreGetters.StoreCarts)
      updateCarts([...otherGoods, newGoods].sort(compare('sort')))
      localStorage.setItem('carts', JSON.stringify(StoreGetters.StoreCarts))
    }

    function changeChecked (value, goods) {
      const { otherGoods, newGoods } = useChangeCheckedType(value, goods, StoreGetters.StoreCarts)
      updateCarts([...otherGoods, newGoods].sort(compare('sort')))
      localStorageAction('set', 'carts', StoreGetters.StoreCarts)
    }

    if (carts) {
      updateCarts(JSON.parse(carts))
    }

    setLoading(true)

    return {
      loading,
      setLoading,
      computedCartsSelectedGoods,
      changeNum,
      removeGoods,
      changeChecked,
      StoreCarts: computed(() => store.state.StoreCarts)
    }
  },
  components: {
    GoodsCarts,
    Col,
    Row,
    Loading,
    EmptyGoods
  }
}
</script>

<style lang="scss" scoped></style>
