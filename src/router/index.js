import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import { clearLoginInfo, scrollSmoothing, errorMessage } from '@/utils'

Vue.use(Router)

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  const token = Vue.cookie.get('user_token')
  const userType = Vue.cookie.get('user_type') === '0' ? 'client' : 'supplier'
  if (to.meta.requireAuth && !token) {
    errorMessage('token失效，请重新登录')
    clearLoginInfo()
    next({ name: 'HomeContent' })
  } else if (to.meta.requireAuth) {
    if (to.meta.role.indexOf(userType) === -1) {
      next({ name: 'NoPermission' })
    } else {
      const currentY = document.documentElement.scrollTop || document.body.scrollTop
      scrollSmoothing(currentY, 0)
      next()
    }
  } else {
    window.scroll(0, 0)
    next()
  }
})

export default router
