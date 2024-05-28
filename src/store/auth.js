import axios from 'axios'

export default {
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: localStorage.getItem('user') || ''
  },
  actions: {
    login({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({
          url: `https://asprof-test.azurewebsites.net/${user.lang}/api/auth/token/`,
          data: user,
          method: 'POST'
        })
          .then(resp => {
            const user = resp.data.refresh
            const token = resp.data.access

            localStorage.setItem('token', token)
            localStorage.setItem('user', user)

            axios.defaults.headers.common['Authorization'] = token

            commit('auth_success', {token, user})
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            commit('setError', err)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    register({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({
          url: `https://asprof-test.azurewebsites.net/${user.lang}/api/users/register/`,
          data: user,
          method: 'POST'
        })
          .then(resp => {
            const user = resp.data.refresh
            const token = resp.data.access

            localStorage.setItem('token', token)
            localStorage.setItem('user', user)

            axios.defaults.headers.common['Authorization'] = token

            commit('auth_success', {token, user})
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            commit('setError', err)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout({commit}) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    add_tokken({commit}, payload) {
      axios.defaults.headers.common['Authorization'] = payload
      localStorage.setItem('token', payload)
      commit('set_tokken', payload)
    },
  },
  mutations: {
    set_tokken(state, obj) {
      state.token = obj
    },
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, obj) {
      state.status = 'success'
      state.token = obj.token
      state.user = obj.user
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.status = ''
      state.token = ''
      state.user = ''
    },
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    getToken(state) {
      return state.token
    },
    getAcs(state) {
      return state.user
    }
  }
}
