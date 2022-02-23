export default {
  state: {
    home: [],
  },
  mutations: {
    setHome(state, payload) {
      state.home = payload
    },

  },
  actions: {
    setHome ({commit}, payload) {
      // обратимся к нашему комиту и візовем мутацию setNotify в кторую передадим payload
      commit('setHome', payload)
    }
  },
  getters: {
    getHome (state) {
      return state.home
    },
  },
  modules: {
  }
}
