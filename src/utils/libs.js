export const sort = (a, b) => {
  return a - b
}

export function compare (fieldName) {
  return function (a, b) {
    var value1 = a[fieldName]
    var value2 = b[fieldName]
    return value1 - value2
  }
}

export const sumPrice = (cartItems) => {
  return cartItems.reduce((sum, cur) => sum + cur.price, 0)
}

export const localStorageAction = (type, name, data) => {
  const action = {
    get: () => JSON.parse(localStorage.getItem(name)),
    set: () => {
      data && localStorage.setItem(name, JSON.stringify(data))
    },
    remove: () => localStorage.remove(name)
  }
  return name && action[type]()
}
