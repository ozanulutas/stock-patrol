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

  let logError = ""; // error on route visits
  let log = JSON.parse(localStorage.getItem("sp_route_log")) || []; // old log from local storage

  // if route has meta midlleware calls the specific meiddleware for action
  const { meta: { middleware } = {} } = to.matched.find(record => record.meta.middleware) || {}

  if (middleware) {
    const middlewareModule = require(`@/middleware/${middleware}`);
    if(middlewareModule) {
      logError = middlewareModule.default(from, to, next, router, store);
    } else {
      next()
    }
  } else {
    next()
  }

  // set log with route info and put it in local storage
  log.push({
    title: new Date(),
    isLoggedIn: store.state.isLoggedIn,
    from: from.fullPath,
    to: to.fullPath,
    error: logError
  });
  localStorage.setItem("sp_route_log", JSON.stringify(log));
  
  log = [];
})


export default router
