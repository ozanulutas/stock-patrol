import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/router/routes'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  // if route has meta midlleware calls the specific meiddleware to action
  const { meta: { middleware } = {} } = to.matched.find(record => record.meta.middleware) || {}
  if (middleware) {
    const middlewareModule = require(`@/middleware/${middleware}`);
    if(middlewareModule) {
      middlewareModule.default(next, store)
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
