import { base } from '@/api/base'
import http from '@/api/http'

// eslint-disable-next-line camelcase
const profile_price = {
  // 查询报价详情
  findPriceInfo (params) {
    return http.get(`${base.ksAdmin}/price/info`, { params: params })
  },
  // 报价列表
  findPriceList (params) {
    return http.get(`${base.ksAdmin}/price/list`, { params: params })
  },
  // 查询报价费用列表
  findPriceItemList (params) {
    return http.get(`${base.ksAdmin}/price/findPriceItemList`, { params: params })
  },
  // 提交报价表
  save (params) {
    return http.post(`${base.ksAdmin}/price/save`, params)
  }
}

// eslint-disable-next-line camelcase
export default profile_price
