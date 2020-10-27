import { base } from '../base'
import http from '../http'

// 登录，注册，忘记密码,修改密码 涉及账号操作的接口
const account = {
  login (params) {
    return http.post(`${base.ksAdmin}/user/login`, params)
  },
  register (params) {
    return http.post(`${base.ksAdmin}/user/register`, params)
  },
  forgetPwd (params) {
    return http.post(`${base.ksAdmin}/user/retrievePassword`, params)
  },
  sendSms (params) {
    return http.post(`${base.ksAdmin}/user/sendSms`, params)
  },
  editPassword (params) {
    return http.post(`${base.ksAdmin}/user/editPassword`, params)
  }
}

export default account
