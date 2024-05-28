import { createApp } from 'vue'
import App from './App.vue'

import AOS from 'aos'
import 'aos/dist/aos.css'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/css/slick.css'
import './assets/css/slick-theme.css'
import './assets/lc/css/table.css'
import messagePlugin from './utils/message.plugin'
import { laguages } from './i18n'
import { defaultLocate } from './i18n'
import {createI18n, useI18n} from 'vue-i18n'
import VueGtag from "vue-gtag"


const messages = Object.assign(laguages)
const i18n = createI18n({
  legacy: true,
  locale: localStorage.getItem('lang') || 'ua',
  fallbackLocale: 'ua',
  messages
})

const app = createApp(App)
app.config.globalProperties.$http = axios;
const token = localStorage.getItem('token')
if (token) {
  app.config.globalProperties.$http.defaults.headers.common['Authorization'] = token
}
app.use(messagePlugin).use(store).use(router).use(VueAxios, axios).use(i18n).use(VueGtag, {
  config: { id: "G-C9ZQPL8HCV" }
});


router.beforeEach((to, from, next) => {
  const lang = to.params.lang || localStorage.getItem('lang') || 'ua';
  i18n.global.locale = lang;
  next();
});
app.mount('#app');