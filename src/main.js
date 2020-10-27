// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import '@/element-ui-theme'
import '@/styles/index.scss'
import '@/icons'
import i18n from './lang'
import VueScrollTo from 'vue-scrollto'
import VueCookie from 'vue-cookie'
import httpRequest from './api'
import store from './store'
import printJs from '@/utils/print'
import profileTitle from '@/views/profile/profile-title'
import goBackBtn from '@/components/profile/goBackBtn'
import fileList from '@/components/profile/fileList'
import { ElNotification, userType } from '@/utils'
import { translateDict, omitNumber } from '@/utils/dict'

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(VueScrollTo)
Vue.use(VueCookie)
Vue.use(printJs)

Vue.prototype.$http = httpRequest
// element Notification 全局注册
Vue.prototype.$notify = ElNotification
// 字典转换
Vue.prototype.$translateDict = translateDict
// 数值转换
Vue.prototype.$omitNumber = omitNumber
// 用户类型判断 注：该变量用来针对不同用户类型显示不同的数据
Vue.prototype.$userType = userType
Vue.config.productionTip = false

Vue.component('profileTitle', profileTitle)
Vue.component('goBack', goBackBtn)
Vue.component('fileList', fileList)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})
