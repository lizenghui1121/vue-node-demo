import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import 'element-ui/lib/theme-chalk/display.css';
import './style.css'

Vue.config.productionTip = false

import http from './http'
Vue.prototype.$http = http

Vue.mixin({
  data() {
    return {
      isMobie: false,
    }
  },
  computed: {
    uploadUrl() {
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthHeaders(){
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  },
  created() {
    this.isMobie = document.body.clientWidth < 768
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
