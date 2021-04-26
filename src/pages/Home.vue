<template>
  <div>
    <!-- <Row>
      <Col span="20">
        <Field v-model="value" label="文本" placeholder="请输入用户名"></Field>
      </Col>
      <Col span="4">
        <Button type="primary" @click="newGoods">添加</Button>
      </Col>
    </Row> -->
    <Loading v-if="!loading"></Loading>
    <Row v-else-if="loading && goods.length > 0">
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
    </Row>
    <Row v-else>
      <Col span="24">
        <Empty image="error" description="店铺空空如也"></Empty>
      </Col>
    </Row>
  </div>
</template>

<script>
import { ref } from 'vue'
// import Category from 'vue-category-tree/dist/vue-cateogry-tree.min'
import { mapGetters, mapActions } from 'vuex'

import { Column } from '@antv/g2plot'

import {
  ARTISTLIST,
  SEARCH_HOT_DETAILS,
  TOP_SONG,
  HOT_TOPIC,
  Highquality
} from 'api/api'

import { compare } from 'utils/libs'
import { getMusicApi } from 'api/request'
// filterFieldData Field,
import { filterDataField, filterFieldData, filterGoodsIsInArray, filterGoodsInCarts } from 'api/filterData'

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
    // Loading,
    Button,
    Card,
    Loading,
    Empty
  },
  created () {
    // const carts = localStorage.getItem('carts')
    // if (carts) {
    //   this.carts = JSON.parse(carts)
    //   this.newActionCarts(JSON.parse(carts))
    // }
    // const goods = localStorage.getItem('goods')
    // if (goods) {
    //   this.goods = JSON.parse(goods)
    // }
  },
  mounted () {
    // this.getArtist().then(res => {
    //   const fieldName = ['name', 'albumSize']
    //   const artists = filterFieldData(fieldName, res)
    //    this.columnPlot(artists)
    // })
    // this.getSEARCHHOTDETAILS()
    this.getHighquality().then(res => {
      console.log(res)
      const fieldName = ['id', 'name', 'description', 'subscribedCount', 'coverImgUrl', 'newImported']
      const data = filterFieldData(fieldName, res)
      this.goods = data
      console.log(data)
      this.setLoading(true)
    })
    // this.getHotTopic()
    // this.getTopSong()
  },
  computed: {
    ...mapGetters([
      'StoreCarts'
    ])
  },
  methods: {
    newGoods () {
      const price = Math.floor(Math.random() * 100).toFixed(2)
      this.goods.push({ title: this.value, key: this.goods.length, price, desc: this.value + '描述信息' })
      this.value = ''
      localStorage.setItem('goods', JSON.stringify(this.goods))
    },
    addGoods (goods) {
      // 当前点击的商品
      const addGood = filterGoodsIsInArray(this.StoreCarts, goods)
      // 购物车的其他商品
      const otherGood = filterGoodsInCarts(this.StoreCarts, goods)
      // 如果已经加入购物车
      let arr = []
      if (addGood.length > 0) {
        const goods = { ...addGood[0], num: ++addGood[0].num }
        arr.push(...otherGood, goods)
      } else {
        arr.push(...this.StoreCarts, { ...goods, num: 1, sort: this.StoreCarts.length, checked: false })
      }
      // this.carts = arr.sort(compare('sort'))
      arr = arr.sort(compare('sort'))
      this.newActionCarts(arr)
      localStorage.setItem('carts', JSON.stringify(arr))
    },
    ...mapActions([
      'updateCarts'
    ])
  },
  setup (props) {
    const loading = ref(false)
    function setLoading (status) {
      loading.value = status
      console.log(loading)
    }
    const getArtist = () => {
      return getMusicApi(ARTISTLIST, { limit: 10 })
        .then((result) => {
          return filterDataField(result, 'artists')
        })
        .catch((err) => {
          console.log(err)
        })
    }
    const getSEARCHHOTDETAILS = () => {
      getMusicApi(SEARCH_HOT_DETAILS, { limit: 10 })
        .then((result) => {
          console.log(result)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    const getTopSong = () => {
      getMusicApi(TOP_SONG, { limit: 10 })
        .then((result) => {
          console.log(result)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    const getHotTopic = () => {
      getMusicApi(HOT_TOPIC)
        .then((result) => {
          console.log(result)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    const getHighquality = () => {
      return getMusicApi(Highquality)
        .then((result) => {
          return filterDataField(result, 'playlists')
        })
        .catch((err) => {
          console.log(err)
        })
    }

    const columnPlot = (data) => {
      const column = new Column('container', {
        data,
        xField: 'name',
        yField: 'albumSize',
        xAxis: {
          label: {
            autoHide: true,
            autoRotate: false
          }
        },
        meta: {
          name: {
            alias: '名字'
          },
          albumSize: {
            alias: '专辑数量'
          }
        },
        minColumnWidth: 20,
        maxColumnWidth: 20
      })

      column.render()
    }

    async function newActionCarts (arr) {
      this.updateCarts({
        carts: arr
      })
    }

    return {
      loading,
      getArtist,
      columnPlot,
      getSEARCHHOTDETAILS,
      getTopSong,
      getHotTopic,
      getHighquality,
      newActionCarts,
      setLoading
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
