import { base } from '@/api/base'
import http from '@/api/http'

// eslint-disable-next-line camelcase
const profile_user = {
  // 完善客户信息
  perfectCustomerInfo (params) {
    return http.post(`${base.ksAdmin}/info/perfectCustomerInfo`, params)
  },
  // 根据ID获取客户信息
  getCustomerInfo () {
    return http.get(`${base.ksAdmin}/info/getCustomerInfo`)
  },
  // 完善供应商信息
  perfectSupplyInfo (params) {
    return http.post(`${base.ksAdmin}/info/perfectSupplyInfo`, params)
  },
  // 根据ID获取供应商信息
  getSupplyInfo () {
    return http.get(`${base.ksAdmin}/info/getSupplyInfo`)
  },
  // 获取业务类型列表
  getIndustryTypeList () {
    return http.get(`${base.ksAdmin}/info/getIndustryTypeList`)
  },
  getListByParentId (params) {
    return http.get(`${base.ksAdmin}/info/getListByParentId/${params.parentId}`)
  }
}

// eslint-disable-next-line camelcase
export default profile_user
