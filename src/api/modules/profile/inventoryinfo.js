import { base } from '@/api/base'
import http from '@/api/http'

// eslint-disable-next-line camelcase
const profile_inventoryinfo = {
  // 获取库存信息列表
  getInventoryList (params) {
    return http.post(`${base.ksAdmin}/inventoryinfo/findStoreList`, params)
  },
  // 获取出入库列表
  getOutInRecords (params) {
    return http.get(`${base.ksAdmin}/inventoryinfo/getOutInRecords`, { params: params })
  }
}
// eslint-disable-next-line camelcase
export default profile_inventoryinfo
