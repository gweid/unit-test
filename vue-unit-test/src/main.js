import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.prototype.$addFun = function(num) {
  return num + 1
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
