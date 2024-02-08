export default {
  state: {
    calendEvent: [],
    allEvents: [],
  },
  mutations: {
    setClEvent(state, payload) {
      state.calendEvent = payload
    },
    setAllEvents(state, payload) {
      state.allEvents = payload
    },
  },
  actions: {
    setClEvent ({commit}, payload) {
      // обратимся к нашему комиту и візовем мутацию setNotify в кторую передадим payload
      commit('setClEvent', payload)
    },
    setAllEvents({commit}, payload) {
      commit('setAllEvents', payload)
    },
  },
  getters: {
    getClEvent (state) {
      return state.calendEvent
    },
    getAllEvents (state) {
      return state.allEvents
    }
  },
  modules: {
  }
}
