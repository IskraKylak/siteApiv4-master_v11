export default {
  state: {
    banner: [],
  },
  mutations: {
    setBanner(state, payload) {
      state.banner = payload
    },

  },
  actions: {
    setBanner ({commit}, payload) {
      // обратимся к нашему комиту и візовем мутацию setNotify в кторую передадим payload
      commit('setBanner', payload)
    }
  },
  getters: {
    getBanner (state) {
      return state.banner
    },
  },
  modules: {
  }
}
