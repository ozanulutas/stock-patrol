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
  // if route requires authentication and user is authenticated, disable access
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(!store.state.isAuth) {
      console.log("not auth");
      store.dispatch("setSnackbar", {
        state: true,
        text: "Unauthorized access!",
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
