<template>
  <div class="main_page">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>

import EmptyLayout from '@/layouts/EmptyLayout'
import MainLayout from '@/layouts/MainLayout'
import axios from 'axios'

export default {
  components: {
    EmptyLayout,
    MainLayout
  },
  computed: {
    layout () {
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  },
  methods: {
    async getNotify () {
      await axios({
        method: 'GET',
        url: (`https://asprof-test.azurewebsites.net/api/specializations/`),
      }).then(respons => {
        let res = respons.data
        this.$store.dispatch('setSpecialization', res)
        // this.messages = res;
      })
        .catch(error => {
          console.log(error)
        })
        .finally(() => (this.loading = false))
    }
  },
  created: function () {
    this.getNotify()
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('logout')
        }
        throw err
      })
    })
  }
}
</script>

<style scoped>
body {
  margin: 0;
}

body {
  font-family: 'Montserrat', sans-serif;
  max-width: 1920px;
  margin: 0 auto 0;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: #292929;
  background: #ffffff;
}
</style>
<style scoped src="@/assets/css/screen.css">
</style>

<style lang="scss">
.z-depth-1, nav, .card-panel, .card, .toast, .btn, .btn-large, .btn-small, .btn-floating, .dropdown-content, .collapsible, .sidenav {
  -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
}
#toast-container {
  display: block;
  position: fixed;
  z-index: 10000;
}

@media only screen and (max-width: 600px) {
  #toast-container {
    min-width: 100%;
    bottom: 0%;
  }
}

@media only screen and (min-width: 601px) and (max-width: 992px) {
  #toast-container {
    left: 5%;
    bottom: 7%;
    max-width: 90%;
  }
}

@media only screen and (min-width: 993px) {
  #toast-container {
    top: 10%;
    right: 7%;
    max-width: 86%;
  }
}

.toast {
  border-radius: 2px;
  top: 35px;
  width: auto;
  margin-top: 10px;
  position: relative;
  max-width: 100%;
  height: auto;
  min-height: 48px;
  line-height: 1.5em;
  background-color: #323232;
  padding: 10px 25px;
  font-size: 1.1rem;
  font-weight: 300;
  color: #fff;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  cursor: default;
}

.toast .toast-action {
  color: #eeff41;
  font-weight: 500;
  margin-right: -25px;
  margin-left: 3rem;
}

.toast.rounded {
  border-radius: 24px;
}

@media only screen and (max-width: 600px) {
  .toast {
    width: 100%;
    border-radius: 0;
  }
}
</style>

<style>
.wrap_preloader {
  position: fixed;
  z-index: 99;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  background: #fff;
}

.wrap_preloader.lc {
  position: relative;
}
</style>

