import Vue from 'vue'
import axios from 'axios'
import { errorMessage } from '@/utils'

const http = axios.create({
  timeout: 1000 * 15,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

http.interceptors.request.use(request => {
  request.headers.common['token'] = Vue.cookie.get('user_token')
  return request
}, error => {
  errorMessage(error)
  return Promise.reject(error.message)
})

http.interceptors.response.use(response => {
  if (response.data.code === 401) {
    errorMessage(response.data.msg)
    return response
  } else if (response.data.code === 500) {
    errorMessage(response.data.msg)
    return response
  } else if (response.data.code) {
    errorMessage('未知异常，请联系管理员')
  }
  return response
}, error => {
  errorMessage(error)
  return Promise.reject(error.message)
})

export default http
