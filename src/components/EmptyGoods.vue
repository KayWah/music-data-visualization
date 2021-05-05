<template>
  <Empty :image="image" :description="description"></Empty>
</template>

<script>
import { Empty } from 'vant'

export default {
  name: 'empty-goods',
  props: {
    description: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    }
  },
  components: {
    Empty
  }
}
</script>

<style lang="scss" scoped>
</style>
