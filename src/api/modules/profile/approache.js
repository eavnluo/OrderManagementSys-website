import { base } from '@/api/base'
import http from '@/api/http'

// eslint-disable-next-line camelcase
const profile_approache = {
  // 合作指南二级菜单详情 参数：type 示例：01
  findGuideList (params) {
    return http.get(`${base.ksAdmin}/info/findGuideList`, { params: params })
  }
}

// eslint-disable-next-line camelcase
export default profile_approache
