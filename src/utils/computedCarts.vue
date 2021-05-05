<template>
  <div></div>
</template>

<script>
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore
    /**
     * 方法说明
     * @method 更新状态
     * @param {Array} data 更新的产品数据
     */
    function updateCarts (data) {
      store.dispatch('updateCarts', { carts: data })
    }
    return {
      updateCarts
    }
  }
}
</script>

<style lang="scss" scoped></style>
