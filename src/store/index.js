import Vue from 'vue'
import Vuex from 'vuex'

import axios from "@/plugins/axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuth: false,  // indicates whether the user is authenticated or not
    symbols: [], // symbol search results
    timeSeries: {}, // time series for a symbol
    snackbar: {
      state: false,
      text: ""
    }, // snackbar's content
  },
  mutations: {
    SET_IS_AUTH(state, payload) {
      state.isAuth = payload;
    },
    SET_SYMBOLS(state, payload) {
      state.symbols = payload;
    },
    SET_TIME_SERIES(state, payload) {
      state.timeSeries = payload;
    },
    SET_SNACKBAR(state, payload) {
      state.snackbar = payload;
    },
  },
  actions: {
    authenticate({ commit }, payload) { // sets the isAuth state - authenticates the user
      commit("SET_IS_AUTH", payload);
    },
    findSymbol({ commit }, payload) { // finds symbol by company name
      return axios.get("/query", {
        params: {
          keywords: payload,
          function: 'SYMBOL_SEARCH',
          datatype: 'json'
        }
      })
        .then(resp => {
          if (resp.status === 200) {
            console.log(resp.data, "symbol resp");
            commit("SET_SYMBOLS", resp.data.bestMatches)
          }
        })
        .catch(err => console.log(err))
    },
    fetchTimeSeries({ commit }, payload) { // fetches time series by symbol and interval
      return axios.get("/query", {
        params: {
          symbol: payload.symbol,
          function: `TIME_SERIES_${payload.serie}`,
          outputsize: 'compact',
          datatype: 'json'
        }
      })
        .then(resp => {
          console.log(resp.data, "series resp");
          if (resp.status === 200) {
            commit("SET_TIME_SERIES", resp.data)
          }
        })
        .catch(err => console.log(err))
    },
    setSnackbar({ commit }, payload) { // sets the snackbar's state
      commit("SET_SNACKBAR", payload)
    }
  },
  getters: {
    // returns time series as formatted
    getFormattedTimeSeries: (state) => (serie) => {
      let serieKey = ""
      switch (serie) {
        case "Daily":
          serieKey = `Time Series (${serie})`
          break;
        case "Weekly":
          serieKey = `${serie} Time Series`
          break;
        case "Monthly":
          serieKey = `${serie} Time Series`
          break;
        default:
          break;
      }
      const timeSeries = state.timeSeries[serieKey]

      return Object.keys(timeSeries).map(key => {
        return {
          open: timeSeries[key]["1. open"],
          high: timeSeries[key]["2. high"],
          low: timeSeries[key]["3. low"],
          close: timeSeries[key]["4. close"],
          volume: timeSeries[key]["5. volume"],
          date: key
        }
      });
    }
  }

})
