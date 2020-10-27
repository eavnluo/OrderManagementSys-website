import { base } from '@/api/base'
import http from '@/api/http'

// eslint-disable-next-line camelcase
const profile_chart = {
  getStatisticsOrderNum () {
    return http.get(`${base.ksAdmin}/order/statisticsOrderNum`)
  }
}

// eslint-disable-next-line camelcase
export default profile_chart
