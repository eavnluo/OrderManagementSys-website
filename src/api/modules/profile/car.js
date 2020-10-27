import { base } from '@/api/base'
import http from '@/api/http'

// eslint-disable-next-line camelcase
const profile_car = {
  // 获取车辆信息列表
  getCarList (params) {
    return http.post(`${base.ksAdmin}/car/list`, params)
  },
  // 保存车辆信息
  saveCarInfo (params) {
    return http.post(`${base.ksAdmin}/car/save`, params)
  },
  // 根据ID获取车辆信息
  getCarInfoById (params) {
    return http.get(`${base.ksAdmin}/car/info/${params.id}`)
  },
  // 修改车辆信息
  updateCarInfo (params) {
    return http.post(`${base.ksAdmin}/car/update`, params)
  },
  // 删除车辆信息
  deleteCarInfoById (params) {
    return http.post(`${base.ksAdmin}/car/delete`, params)
  }
}
// eslint-disable-next-line camelcase
export default profile_car
