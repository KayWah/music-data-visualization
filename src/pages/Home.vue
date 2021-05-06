<template>
  <div>
    <Loading v-if="!loading"></Loading>
    <Row v-else-if="loading && goods.length > 0">
      <keep-alive>
        <Col
          v-for="good in goods"
          :key="good.id"
          span="6"
          :class="'card-wrapper'"
        >
          <Card
            :title="good.name"
            :price="`${good.subscribedCount.toFixed(2)}`"
            :thumb="good.coverImgUrl"
            :desc="good.description"
          >
            <template #footer>
              <Button size="mini" @click="addGoods(good)" type="warning"
                >加入购物车</Button
              >
            </template>
          </Card>
        </Col>
      </keep-alive>
    </Row>
    <Row v-else>
      <Col span="24">
        <Empty image="error" description="店铺空空如也"></Empty>
      </Col>
    </Row>
  </div>
</template>

<script>
// 虚拟数据
import GoodsJson from '../mock/GoodsJson'

import { ref } from 'vue'

import { useStore } from 'vuex'

import { compare } from 'utils/libs'

import { filterFieldData, filterGoodsIsInArray, filterGoodsInCarts } from 'api/filterData'
import { Col, Row, Button, Card, Loading, Empty } from 'vant'

export default {
  name: 'home',
  data () {
    return {
      value: '',
      goods: [],
      carts: [],
      artists: []
    }
  },
  components: {
    Col,
    Row,
    Button,
    Card,
    Loading,
    Empty
  },
  created () {
    this.getHighquality().then(res => {
      const fieldName = ['id', 'name', 'description', 'subscribedCount', 'coverImgUrl', 'newImported']
      const data = filterFieldData(fieldName, res)
      this.goods = data
      setTimeout(() => {
        this.setLoading(true)
      }, 1000)
    })
  },
  mounted () {
    console.log('mounted')
  },
  setup (props) {
    const store = useStore()
    const StoreGetters = store.getters

    const loading = ref(false)

    function setLoading (status) {
      loading.value = status
      console.log(loading)
    }
    const getHighquality = () => {
      return new Promise((resolve) => {
        resolve(GoodsJson)
      })
    }

    async function newActionCarts (arr) {
      this.updateCarts({
        carts: arr
      })
    }

    const addGoods = (goods) => {
      console.log(typeof StoreGetters.StoreCarts)
      // 当前点击的商品
      const addGood = filterGoodsIsInArray(StoreGetters.StoreCarts || [], goods)
      // 购物车的其他商品
      const otherGood = filterGoodsInCarts(StoreGetters.StoreCarts || [], goods)
      // 如果已经加入购物车
      let arr = []
      if (addGood.length > 0) {
        const goods = { ...addGood[0], num: ++addGood[0].num }
        arr.push(...otherGood, goods)
      } else {
        arr.push(...store.getters.StoreCarts,
          { ...goods, num: 1, sort: store.getters.StoreCarts.length, checked: false })
      }
      arr = arr.sort(compare('sort'))
      store.dispatch('updateCarts', { carts: arr })
      localStorage.setItem('carts', JSON.stringify(arr))
    }

    return {
      loading,
      getHighquality,
      newActionCarts,
      setLoading,
      addGoods
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
