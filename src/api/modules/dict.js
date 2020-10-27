import { base } from '@/api/base'
import http from '@/api/http'

const dict = {
  // 字典查询
  findDicList (params) {
    return http.get(`${base.ksAdmin}/info/findDicList`, { params: params })
  }
}

export default dict
