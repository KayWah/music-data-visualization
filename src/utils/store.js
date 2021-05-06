export function setDispatch (store, type, payload, options = null) {
  store.dispatch(type, payload, options)
}
