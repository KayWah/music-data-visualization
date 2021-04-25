<template>
  <div>
    <Card
      :title="goods.name"
      :price="`${goods.subscribedCount.toFixed(2)}`"
      :thumb="goods.coverImgUrl"
      :desc="goods.description"
      :num="goods.num"
    >
      <template #footer>
        <Stepper v-model="stepperNum" min="1" max="99" @change="changeNum" />
        <Button size="mini" @click="removeGoods(goods)" type="danger"
          >删除</Button
        >
      </template>
    </Card>
  </div>
</template>

<script>
import { ref, toRefs } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { Button, Card, Stepper } from 'vant'
// import { filterGoodsInCarts, filterGoodsIsInArray } from 'api/filterData'

export default {
  name: 'goods-carts',
  data () {
    return {
    }
  },
  props: {
    goods: {}
  },
  mounted () {
    this.setStepper(this.goods.num)
  },
  computed: {
    ...mapGetters([
      'StoreCarts'
    ])
  },
  methods: {
    removeGoods (goods) {
      this.$emit('removeGoods', goods)
    },
    changeNum (value) {
      this.$emit('changeNum', value, this.goods)
    },
    ...mapActions([
      'updateCarts'
    ])
  },
  updated () {
    this.setStepper(this.goods.num)
  },
  setup () {
    const stepperNum = ref(3)
    function setStepper (num) {
      stepperNum.value = num
    }
    async function newActionCarts () {
      this.updateCarts({
        carts: this.carts
      })
    }
    return {
      ...toRefs(stepperNum),
      newActionCarts,
      setStepper,
      stepperNum
    }
  },
  components: {
    Button,
    Card,
    Stepper
  }
}
</script>

<style lang="scss" scoped>
</style>
