import { createStore } from 'vuex'

import home from './home'
import calendarEvent from './calendarEvent'
import presidium from './presidium'
import experts from './experts'
import banners from './banners'
import auth from './auth'
import events from './events'
import users from './users'
import profile from './profile'
import statistikCurse from './statistikCurse'
import specialization from './specialization'
import singleEvent from './singleEvent'
import user from './user'
import bmo from './bmo'

export default createStore({
  state: {
    error: null
  },
  mutations: {
    setError (state, error) {
      state.error = error
    },
    clearError (state) {
      state.error = null
    }
  },
  getters: {
    error: s => s.error
  },
  actions: {},
  modules: {
    home,
    calendarEvent,
    presidium,
    experts,
    banners,
    auth,
    events,
    users,
    profile,
    statistikCurse,
    specialization,
    singleEvent,
    user,
    bmo
  }
})
