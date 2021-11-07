import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

// Custom Css
import "@/assets/scss/main.scss"

Vue.config.productionTip = false

// filters
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
