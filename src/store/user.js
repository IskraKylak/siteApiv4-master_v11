export default {
  state: {
    user: []
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    setUser ({ commit }, payload) {
      // обратимся к нашему комиту и візовем мутацию setNotify в кторую передадим payload
      commit('setUser', payload)
    }
  },
  getters: {
    getUser (state) {
      return state.user
    }
  },
  modules: {}
}
