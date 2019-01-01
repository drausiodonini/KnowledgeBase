import 'font-awesome/css/font-awesome.css'

import Vue from 'vue'

import App from './App'

import './config/bootstrap'
import './config/msgs'

import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

require('axios').defaults.headers.common['Authorization'] = "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkRyYXVzaW8gQS4gRG9uaW5pIiwiZW1haWwiOiJkcmF1c2lvZG9uaW5pQGdtYWlsLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE1NDYyOTU3OTYsImV4cCI6MTU0NjU1NDk5Nn0.jofimCLFlf67r0_NgRsdFXEoj9DvTZWRyLijDQZrsrE"

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')