export default {
  state: {
    calendEvent: [],
  },
  mutations: {
    setClEvent(state, payload) {
      state.calendEvent = payload
    }
  },
  actions: {
    setClEvent ({commit}, payload) {
      // обратимся к нашему комиту и візовем мутацию setNotify в кторую передадим payload
      commit('setClEvent', payload)
    }
  },
  getters: {
    getClEvent (state) {
      return state.calendEvent
    }
  },
  modules: {
  }
}
