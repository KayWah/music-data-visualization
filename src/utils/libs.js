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
