import { base } from '../base'
import http from '../http'

// 新闻接口
const news = {
  enterpriseNews (params) {
    return http.get(`${base.ks}/enterpriseNews/findEnterpriseNews`, { params: params })
  },
  industryNews (params) {
    return http.get(`${base.ks}/industryNews/findIndustryNews`, { params: params })
  }
}

export default news
