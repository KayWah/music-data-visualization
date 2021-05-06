<template>
  <SubmitBar
    :price="price"
    button-text="提交订单"
    @submit="submitCarts(price)"
    :loading="submitLoading"
  >
    <Checkbox v-model="checkedAll">全选</Checkbox>
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
      default: 0
    },
    checkedMap: {
      type: Object,
      default: () => {
        return {}
      }
    },
    submitCarts: {
      type: Function,
      default: () => {
        return null
      }
    },
    submitLoading: {
      type: Boolean,
      default: false
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

<style lang="scss" scoped></style>
