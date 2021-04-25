<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/carts">Cart</router-link>
  </div>
  <router-view />
  <Cart></Cart>
</template>

<script>
import Cart from 'components/Cart'

export default {
  name: 'app',
  components: {
    Cart
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.card-wrapper {
  padding: 10px;
}
.cart-fixed {
  position: fixed;
  bottom: 10px;
  right: 10px;
  height: 60px;
  width: 60px;
  line-height: 60px;
  text-align: center;
  background-color: #2c3e50;
  color: #42b983;
}
.global-cart-list {
  height: 100%;
  width: 400px;
}
</style>
