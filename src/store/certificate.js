export default {
  state: {
    certificate: []
  },
  mutations: {
    setCertificates (state, payload) {
      state.certificate = payload
    }
  },
  actions: {
    setCertificates ({ commit }, payload) {
      // обратимся к нашему комиту и візовем мутацию setNotify в кторую передадим payload
      commit('setCertificates', payload)
    }
  },
  getters: {
    getCertificate (state) {
      return state.certificate
    }
  },
  modules: {
  }
}
