import Vue from 'vue'
import store from '@/store'
import { base } from '@/api/base'
import { Message, Notification } from 'element-ui'

// 随机生成UUID
export function getUUID () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
  })
}

export function clearLoginInfo () {
  store.commit('del_token')
  store.commit('del_profile')
  store.commit('del_businessType')
}

export function errorMessage (error) {
  Message({
    message: `${error}`,
    type: 'error',
    duration: 2000
  })
}

export function ElNotification (type, message, title, duration) {
  Notification({
    type: type,
    message: message,
    title: title || '提示',
    offset: 70,
    duration: duration || 4000
  })
}

export function downloadTheFile (id) {
  window.open(
    `${base.ksAdmin}/order/downloadFile?id=${id}&token=${Vue.cookie.get('user_token')}`
  )
}

export function scrollSmoothing (currentY, targetY) {
  // 计算需要移动的距离
  let needScrollTop = targetY - currentY
  let _currentY = currentY
  setTimeout(() => {
    // 一次调用滑动帧数，每次调用会不一样
    const dist = Math.ceil(needScrollTop / 10)
    _currentY += dist
    window.scrollTo(_currentY, currentY)
    // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
    if (needScrollTop > 10 || needScrollTop < -10) {
      scrollSmoothing(_currentY, targetY)
    } else {
      window.scrollTo(_currentY, targetY)
    }
  }, 1)
}

export function judgeUserCode () {
  const companyCode = Vue.cookie.get('user_companyCode')
  return Vue.cookie.get('user_type') === '0' ? { customerCode: companyCode, supplyCode: '' } : { customerCode: '', supplyCode: companyCode }
}

// isK 卡车 isF 仓储 isC 客户
export const userType = {
  isK () {
    return Vue.cookie.get('user_businessType').indexOf('K') !== -1
  },
  isF () {
    return Vue.cookie.get('user_businessType').indexOf('F') !== -1
  },
  isC () {
    return Vue.cookie.get('user_businessType').indexOf('C') !== -1
  }
}
