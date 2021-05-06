import { filterGoodsInCarts } from 'api/filterData'

/**
 * 计算其他商品与修改数量的商品
 * 返回其他商品，修改数量后的目标商品
 */
export default function (goods, StoreCarts) {
  return filterGoodsInCarts(StoreCarts, goods)
}
