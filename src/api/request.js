import { BaseUrl } from './config'
import { axiosInstance } from './axiosConfig'

function getUrl (type) {
  const url = `${BaseUrl}${type ? `${type}` : ''}`
  return url
}

// 获取链接后面的参数
function param (data) {
  if (!data) {
    return this
  }
  let url = ''
  // 遍历参数
  for (let l = 0; l < Object.keys(data).length; l++) {
    const key = Object.keys(data)[l]
    const value = key !== undefined ? data[key] : ''
    url += `&${key}=${encodeURIComponent(value)}`
  }
  // 去除链接的?
  return url ? url.substring(1) : ''
}

export function getMusicApi (type, data) {
  let url = getUrl(type)
  const params = param(data)
  if (data) {
    url += (url.indexOf('?') < 0 ? '?' : '&') + params
  }
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${url}`)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err.response)
      })
  })
}
