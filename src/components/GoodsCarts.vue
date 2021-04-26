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
        <Checkbox v-model="checkedStatus" @change="changeChecked" v-if="showChecked"></Checkbox>
      </template>
    </Card>
  </div>
</template>

<script>
// , toRefs
import { ref } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { Button, Card, Stepper, Checkbox } from 'vant'
// import { filterGoodsInCarts, filterGoodsIsInArray } from 'api/filterData'

export default {
  name: 'goods-carts',
  data () {
    return {
    }
  },
  props: {
    goods: {},
    showChecked: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.setStepper(this.goods.num)
    this.setCheckedStatus(this.goods.checked)
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
    changeChecked (value) {
      this.$emit('changeChecked', value, this.goods)
    },
    ...mapActions([
      'updateCarts'
    ])
  },
  updated () {
    this.setStepper(this.goods.num)
    this.setCheckedStatus(this.goods.checked)
  },
  setup () {
    const stepperNum = ref(3)
    const checkedStatus = ref(false)
    function setStepper (num) {
      stepperNum.value = num
    }
    function setCheckedStatus (num) {
      checkedStatus.value = num
    }
    async function newActionCarts () {
      this.updateCarts({
        carts: this.carts
      })
    }
    return {
      // ...toRefs(stepperNum),
      // ...toRefs(checkedStatus),
      newActionCarts,
      setStepper,
      stepperNum,
      checkedStatus,
      setCheckedStatus
    }
  },
  components: {
    Button,
    Card,
    Stepper,
    Checkbox
  }
}
</script>

<style lang="scss" scoped>
</style>
