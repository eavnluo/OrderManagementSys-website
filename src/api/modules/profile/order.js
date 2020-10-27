import { base } from '@/api/base'
import http from '@/api/http'

// eslint-disable-next-line camelcase
const profile_order = {
  // 获取订单列表
  findOrderList (params) {
    return http.get(`${base.ksAdmin}/order/list`, { params: params })
  },
  // 获取订单内容
  findOrderInfo (params) {
    return http.get(`${base.ksAdmin}/order/info/${params}`)
  },
  // 获取卡车，仓库供应商列表
  findListByType (params) {
    return http.get(`${base.ksAdmin}/supply/findListByType`, { params: params })
  },
  // 获取商品列表
  findGoodList () {
    return http.get(`${base.ksAdmin}/goods/queryAll`)
  },
  // 查看订单状态
  findOrderStatusFlow (params) {
    return http.get(`${base.ksAdmin}/order/getOrderStatusFlow`, { params: params })
  },
  // 提交订单
  saveCompleteOrder (params) {
    return http.post(`${base.ksAdmin}/order/saveCompleteOrder`, params)
  },
  // 供应商完善订单内容
  perfectOrderInfo (params) {
    return http.post(`${base.ksAdmin}/order/perfectOrderInfo`, params)
  },
  // 下载附件
  downloadFile (params) {
    return http.get(`${base.ksAdmin}/order/downloadFile`, { params: params })
  },
  // 导出订单
  downloadXls (params) {
    return http.get(`${base.ksAdmin}/order/exportData`, { params: params })
  },
  // 获取联系人列表（可查询）
  findBaseContactsList (params) {
    return http.get(`${base.ksAdmin}/customercontacts/list`, { params: params })
  },
  // 获取联系人列表
  findBaseContactsAllList (params) {
    return http.get(`${base.ksAdmin}/customercontacts/queryAll`, { params: params })
  },
  // 新增/修改 联系人
  addBaseContacts (params) {
    return http.post(`${base.ksAdmin}/customercontacts/${!params.id ? 'save' : 'update'}`, params)
  },
  // 查看联系人
  viewBaseContacts (id) {
    return http.get(`${base.ksAdmin}/customercontacts/info/${id}`)
  },
  // 删除联系人
  deleteBaseContacts (params) {
    return http.post(`${base.ksAdmin}/customercontacts/delete`, params)
  },
  // 提交追货宝信息
  stackInfo (params) {
    return http.post(`${base.ksAdmin}/order/stackInfo/add`, params)
  }
}

// eslint-disable-next-line camelcase
export default profile_order
