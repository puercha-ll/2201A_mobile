import { createStore } from 'vuex'

export default createStore({
  state: {
    role: '234'
  },
  getters: {
  },
  mutations: {
    setRole(state, payload) {
      state.role = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
