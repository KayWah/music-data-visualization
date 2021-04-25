export function filterDataField (data, name) {
  let arr = []
  arr = data[name].map((item) => {
    // return {
    //   name: item.name,
    //   id: item.id,
    //   alias: item.alias,
    //   albumSize: item.albumSize,
    //   picUrl: item.picUrl
    // }
    return item
  })
  console.log(arr)
  return arr
}

/*
 * fieldName 字段名
 * data 数据
 */
export function filterFieldData (fieldName, data) {
  const arr = []
  data.forEach((element) => {
    const o = {}
    fieldName.map((item) => {
      o[item] = element[item]
    })
    arr.push(o)
  })
  return arr
}

/*
 * carts 购物车商品数组
 * goods 选定的商品
 */
export function filterGoodsIsInArray (carts, goods) {
  return carts.filter(item => {
    return item.id === goods.id
  })
}

/*
 * carts 购物车商品数组
 * goods 选定的商品
 */
export function filterGoodsInCarts (carts, goods) {
  return carts.filter(item => {
    return goods.id !== item.id
  })
}
