import Vue from 'vue'
import Vuex from 'vuex'

import axios from "@/plugins/axios"

Vue.use(Vuex)

const isLoggedIn = JSON.parse(localStorage.getItem("sp_is_logged_in"));

export default new Vuex.Store({
  state: {
    isLoggedIn: isLoggedIn !== null ? isLoggedIn : false,  // indicates whether the user is authenticated or not
    symbols: [], // symbol search results
    timeSeries: {}, // time series for a symbol
    snackbar: { // snackbar's content
      show: false,
      text: "",
      btn: {
        close: {
          color: "blue"
        }
      }
    },
  },
  mutations: {
    SET_IS_LOGGED_IN(state, payload) {
      state.isLoggedIn = payload;
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
    authenticate({ commit, dispatch, state }, payload) { // sets the isLoggedIn state - authenticates the user
      // if authentication state is change show snackbar
      if (payload !== state.isLoggedIn) {
        commit("SET_IS_LOGGED_IN", payload);
        localStorage.setItem("sp_is_logged_in", payload)
        dispatch("smackbar", {
          show: true,
          text: `You are successfully logged ${state.isLoggedIn ? "in" : "out"}.`,
        });
      }
    },
    smackbar({ commit }, { // sets the snackbar's state
      show,
      text,
      btn: {
        close: {
          color = "blue"
        } = {}
      } = {}
    }) { 
      commit("SET_SNACKBAR", {
        show,
        text,
        btn: {
          close: {
            color
          }
        }
      })
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
          function: `TIME_SERIES_${payload.serie.toUpperCase()}`,
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

  },
  getters: {
    // returns time series as formatted
    getFormattedTimeSeries: (state) => (serie) => {
      let serieKey = ""
      serie = serie[0].toUpperCase() + serie.slice(1, serie.length)

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
      console.log(timeSeries);

      return Object.keys(timeSeries).map(key => {
        return {
          open: parseFloat(timeSeries[key]["1. open"]),
          high: parseFloat(timeSeries[key]["2. high"]),
          low: parseFloat(timeSeries[key]["3. low"]),
          close: parseFloat(timeSeries[key]["4. close"]),
          volume: parseFloat(timeSeries[key]["5. volume"]),
          date: key
        }
      });
    }
  }

})
