import { base } from '@/api/base'
import http from '@/api/http'

// bill
// eslint-disable-next-line camelcase
const profile_bill = {
  findListGroupMonth (params) {
    return http.get(`${base.ksAdmin}/bill/info/getListGroupMonth`, { params: params })
  },
  findListByMonth (params) {
    return http.get(`${base.ksAdmin}/bill/info/getListByMonth`, { params: params })
  },
  findListByOrderNo (params) {
    return http.get(`${base.ksAdmin}/bill/info/getListByOrderNo`, { params: params })
  },
  findInfoByStatementNo (params) {
    return http.get(`${base.ksAdmin}/bill/info/getInfoByOrderItem`, { params: params })
  },
  confirmItem (params) {
    return http.post(`${base.ksAdmin}/bill/info/confirmItem`, params)
  }
}

// eslint-disable-next-line camelcase
export default profile_bill
