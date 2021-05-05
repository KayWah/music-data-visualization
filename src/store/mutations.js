import * as types from './mutation-types'

const mutations = {
  [types.SET_CARTS] (state, carts) {
    console.log(carts)
    state.StoreCarts = carts
  }
}

export default mutations
