import Vue from 'vue'

const state = {
  token: '',
  profile: '',
  businessType: '',
  locale: ''
}

const mutations = {
  set_token (state, token) {
    state.token = token
    Vue.cookie.set('user_token', token, { expires: '7D' }) // expires :string 10s 1h 1D 1Y
  },
  del_token (state) {
    state.token = ''
    Vue.cookie.delete('user_token')
  },
  set_profile (state, profile) {
    state.profile = profile
    Vue.cookie.set('user_profile', JSON.stringify(profile), { expires: '7D' }) // 存储用户信息
    Vue.cookie.set('user_name', profile.name, { expires: '7D' }) // 存储客户名字
    Vue.cookie.set('user_type', profile.type, { expires: '7D' }) // 存储用户类型
    Vue.cookie.set('user_auth', profile.authenticationStatus, { expires: '7D' }) // 存储用户认证标识
  },
  del_profile (state) {
    state.profile = ''
    Vue.cookie.delete('user_profile')
    Vue.cookie.delete('user_type')
    Vue.cookie.delete('user_name')
    Vue.cookie.delete('user_auth')
  },
  set_businessType (state, businessType) {
    state.businessType = businessType.userType
    Vue.cookie.set('user_businessType', businessType.userType, { expires: '7D' }) // 存储用户业务类型
    Vue.cookie.set('user_companyCode', businessType.companyCode, { expires: '7D' }) // 用户所属公司code
    Vue.cookie.set('user_companyName', businessType.companyName, { expires: '7D' }) // 用户所属公司name
  },
  del_businessType (state) {
    state.businessType = ''
    Vue.cookie.delete('user_businessType')
    Vue.cookie.delete('user_companyCode')
    Vue.cookie.delete('user_companyName')
  }
}

export default {
  state,
  mutations
}
