<template>
  <SubmitBar :price="price" button-text="提交订单" @submit="onSubmit">
    <Checkbox v-model="checkedAll">全选</Checkbox>
    <template #tip>
      你的收货地址不支持同城送, <span @click="onClickLink">修改地址</span>
    </template>
  </SubmitBar>
</template>

<script>
import { ref } from 'vue'

import { SubmitBar, Checkbox } from 'vant'

export default {
  name: 'submit-bar',
  props: {
    // show: {
    //   type: Boolean,
    //   default: false
    // },
    selectedGoods: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  created () {
    console.log(this.selectedGoods)
  },
  updated () {
    console.log(this.selectedGoods)
    console.log('abcccccccc')
    this.computedPrice(this.selectedGoods)
  },
  mounted () {
    console.log(this.selectedGoods)
    console.log('abcccccccc')
  },
  computed () {
    console.log(this.selectedGoods)
    console.log('abcccccccc')
  },
  watch: {
    selectedGoods (newValue, oldValue) {
      console.log(newValue)
      console.log(oldValue)
    }
  },
  methods: {
    onSubmit () {
      console.log('提交')
    }
    // computedPrice (selectedGoods) {
    //   console.log(selectedGoods)
    // }
  },
  setup () {
    const checkedAll = ref(false)
    const price = ref(0)

    const computedPrice = (goods) => {
      console.log(goods)
      let a = 0
      goods.forEach(element => {
        a += element.subscribedCount
      })
      price.value = a * 100
      console.log(a)
    }
    return {
      checkedAll,
      computedPrice,
      price
    }
  },
  components: {
    SubmitBar,
    Checkbox
  }
}
</script>

<style lang="scss" scoped>
</style>
