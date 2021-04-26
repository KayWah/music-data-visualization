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
    price: {
      type: Number,
      default: 100
    }
  },
  setup () {
    const checkedAll = ref(false)
    return {
      checkedAll
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
