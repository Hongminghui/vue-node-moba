import axios from 'axios'
import Vue from 'vue'
// 引入路由
import router from './router'

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})

// 请求拦截，请求的时候加上一个请求头，值为token
http.interceptors.request.use(function(config) {
  // 如果token存在，就加上这个请求头
  if(localStorage.token) {
    // 加上'Bearer '更符合规范，有空格
    config.headers.Authorization = 'Bearer ' + localStorage.token
  }  
  return config
})

// 响应拦截器，所有组件的axios响应都会经过这里
http.interceptors.response.use(res => {
  return res
}, err => {
  // err.response: 响应的数据，响应头，状态码等
  // err.response.data就是send的参数，{message: "用户名不存在"}
  // 如果出错，就弹出错误信息，把element的$message挂载到Vue的原型上
  if(err.response.data.message) {
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })   
  }
  // 如果返回了401,就跳到登录页，需要前后端协商，
  // 后端如果需要登录，就返回状态码401
  if(err.response.status === 401) {
    router.push('/login')
  }
  return Promise.reject(err)
})
export default http