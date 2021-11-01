import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuth: false,  // indicates whether the user is authenticated or not
  },
  mutations: {
    SET_IS_AUTH(state, payload) { 
      state.isAuth = payload;
    }
  },
  actions: {
    authenticate({ commit }, payload) { // sets the isAuth state - authenticates the user
      commit("SET_IS_AUTH", payload);
    }
  },

})
