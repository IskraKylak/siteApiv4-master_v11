export default {
  state: {
    singleEvent: [],
  },
  mutations: {
    setSingleEvent(state, payload) {
      state.singleEvent = payload
    },
  },
  actions: {
    setSingleEvent ({commit}, payload) {
      // обратимся к нашему комиту и візовем мутацию setNotify в кторую передадим payload
      commit('setSingleEvent', payload)
    }
  },
  getters: {
    getSingleEvent (state) {
      return state.singleEvent
    },
  },
  modules: {
  }
}
