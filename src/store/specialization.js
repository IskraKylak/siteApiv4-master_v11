export default {
  state: {
    specialization: [],
  },
  mutations: {
    setSpecialization(state, payload) {
      state.specialization = payload
    },

  },
  actions: {
    setSpecialization ({commit}, payload) {
      // обратимся к нашему комиту и візовем мутацию setNotify в кторую передадим payload
      commit('setSpecialization', payload)
    }
  },
  getters: {
    getSpecialization (state) {
      return state.specialization
    },
  },
  modules: {
  }
}
