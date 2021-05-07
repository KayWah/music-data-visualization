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
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 10px;
  right: 10px;
  font-size: 30px;
  text-align: center;
  background-color: #fff;
  color: #42b983;
  border-radius: 50px;
  box-shadow: 0px 0px 3px 1px #2c3e50;
  height: 40px;
  width: 40px;
  cursor: pointer;
}
.global-cart-list {
  overflow: hidden;
  height: 100%;
  width: 400px;
}
</style>
