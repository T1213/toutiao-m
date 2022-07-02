import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    SearchHistroyLsit: []
  },
  getters: {
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setSearchHistroyLsit (state, payload) {
      const arr = state.SearchHistroyLsit
      arr.unshift(payload)
      state.SearchHistroyLsit = [...new Set(arr)]
    },
    deleteHistroy (state, index) {
      state.SearchHistroyLsit.splice(index, 1)
    },
    deleteAllHistroy (state) {
      state.SearchHistroyLsit = []
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
