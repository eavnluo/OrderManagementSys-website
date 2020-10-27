import { base } from '../base'
import http from '../http'

const website = {
  // 获取动态列表 && 获取动态详情
  findWebSiteNews (params) {
    return http.get(`${base.ksAdmin}/website/getWebSiteNews`, { params: params })
  },
  // 获取图片列表
  findIndexImage (params) {
    return http.get(`${base.ksAdmin}/website/getIndexImage`, { params: params })
  }
}

export default website
