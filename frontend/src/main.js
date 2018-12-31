import 'font-awesome/css/font-awesome.css'

import Vue from 'vue'

import App from './App'

import './config/bootstrap'
import './config/msgs'

import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

require('axios').defaults.headers.common['Authorization'] = "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkRyYXVzaW8gQS4gRG9uaW5pIiwiZW1haWwiOiJkcmF1c2lvZG9uaW5pQGdtYWlsLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE1NDYyMTI3NzAsImV4cCI6MTU0NjQ3MTk3MH0.1276hffCPSG1fCNLVa2jE_8dhfTMtQe0rmbnHBv4yAM"

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')