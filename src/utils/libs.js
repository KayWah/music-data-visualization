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

// 返回已选中的所有cartItems
// export const filterChecked = () => {
//   return (
//     Object.entries(checkedMap)
//       // 通过这个filter 筛选出所有checked状态为true的项
//       .filter((entries) => Boolean(entries[1]))
//       // 再从cartData中根据id来map出选中列表
//       .map(([checkedId]) => cartData.find(({ id }) => id === Number(checkedId)))
//   )
// }

export const localStorageAction = (type, name, data) => {
  const action = {
    get: () => JSON.parse(localStorage.getItem(name)),
    set: () => {
      console.log(23)
      data && localStorage.setItem(name, JSON.stringify(data))
    },
    remove: () => localStorage.remove(name)
  }
  console.log(type, name, data)
  return name && action[type]()
}
