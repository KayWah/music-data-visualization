import * as types from './mutation-types'

export function updateCarts ({ commit, state }, { carts }) {
  commit(types.SET_CARTS, carts)
}
