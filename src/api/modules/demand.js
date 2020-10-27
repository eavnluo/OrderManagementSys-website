import { base } from '../base'
import http from '../http'

// 需求调研
const demand = {
  // 所属行业列表
  findIndustryList () {
    return http.get(`${base.ksAdmin}/request/findIndustryList`)
  },
  // 提交表单
  save (params) {
    return http.post(`${base.ksAdmin}/request/save`, params)
  }
}

export default demand
