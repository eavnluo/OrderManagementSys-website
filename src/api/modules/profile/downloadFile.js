import { base } from '@/api/base'
import http from '@/api/http'

// eslint-disable-next-line camelcase
const profile_downloadFile = {
  downloadFile (params) {
    return http.get(`${base.ksAdmin}/order/getFilesByBelongTo`, { params: params })
  }
}

// eslint-disable-next-line camelcase
export default profile_downloadFile
