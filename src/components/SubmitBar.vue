<template>
  <SubmitBar
    :price="price"
    button-text="提交订单"
    @submit="submitCarts(price)"
    :loading="submitLoading"
  >
    <Checkbox v-model="selectAll" @click="checkedAll(selectAll)">全选</Checkbox>
  </SubmitBar>
</template>

<script>
import { onUpdated, ref } from 'vue'

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
    checkedAll: {
      type: Function,
      default: () => {
        return null
      }
    },
    submitLoading: {
      type: Boolean,
      default: false
    },
    selectedAll: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    onUpdated(() => {
      setSelectAll()
    })

    const selectAll = ref(false)
    // 是否全选
    function setSelectAll () {
      selectAll.value = props.selectedAll
    }

    return {
      selectAll
    }
  },
  components: {
    SubmitBar,
    Checkbox
  }
}
</script>

<style lang="scss" scoped></style>
