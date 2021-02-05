import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import http from './http'

Vue.config.productionTip = false
// 将$http挂载到Vue原型上，其他组件都可以用this.$http来发起网络请求了
Vue.prototype.$http = http

// 现在全局拥有了getAuthHeaders方法，uploadUrl属性
Vue.mixin({
  computed: {
    uploadUrl() {
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
}) 

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
