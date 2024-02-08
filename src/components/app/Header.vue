<template>
  <header class="main-header">
    <div class="container">
      <span class="burger" v-on:click="openMenu = !openMenu"><span>☰</span></span>
      <div class="box_top">
        <router-link class="logo" :to="`/${this.$i18n.locale}/`">
          <div class="strong">
            <img
              loading="lazy"
              width="210"
              height="51"
              src="@/assets/images/logo_white.png"
              alt=""
            />
          </div>
        </router-link>
        <div class="box_callback">
          <div class="box_enter" v-if="tokkent === ''">
            <router-link class="link" :to="`/${this.$i18n.locale}/in-login`">Вхід</router-link>
            <router-link class="link" :to="`/${this.$i18n.locale}/register`">Реєстрація</router-link>
          </div>
          <div class="box_enter" v-else>
            <router-link class="link" :to="`/lc-profile`">{{ myAcc.email }}</router-link>
          </div>
          <div class="box_messendger">
            <a class="link_facebook" :href="infoContact.facebook_link"
            >facebook</a
            >
          </div>
          <!-- <div class="box_lang">
            <ul>
              <li>
                <a href="#" class="lang-ua active">ua</a>
              </li>
              <li>
                <a href="#" class="lang-en">en</a>
              </li>
            </ul>
          </div> -->
          <div class="nav_wrapLang">
              <div class="nav_lang" @click="openLang = !openLang">
                  {{ activeLang }}
              </div>
              <div class="nav_arrPhone" :class="{'active' : openLang}" @click="activeLang = !activeLang"></div>
              <div class="nav_wrapListLang">
                <slide-up-down class="nav_listPhone" v-model="openLang" :duration="300">
                  <div class="nav_listLang">
                    <a href="#" v-for="(item, idx) in lang" :key="idx" @click="switchLang(item.slag)" class="nav_lang" >
                      {{ item.name }}
                    </a>
                  </div>
                </slide-up-down>
              </div>
            </div>
        </div>
      </div>
      <div class="box_bottom" :class="openMenu ? 'open' : ''">
        <div class="close" v-on:click="openMenu = !openMenu">
          &#10006;
        </div>
        <div class="top-menu nav" id="navigation">
          <div class="box_enter modal" v-if="tokkent === ''">
            <router-link class="link" v-on:click="openMenu = !openMenu" :to="`/${this.$i18n.locale}/in-login`">Вхід</router-link>
            <router-link class="link" v-on:click="openMenu = !openMenu" :to="`/${this.$i18n.locale}/register`">Реєстрація</router-link>
          </div>
          <div class="box_enter modal" v-else>
            <router-link class="link" v-on:click="openMenu = !openMenu" :to="`/lc-profile`">{{ myAcc.email }}</router-link>
          </div>
          <ul>
            <li>
              <router-link
                class="link link-2"
                :to="`/${this.$i18n.locale}/`"
                v-on:click="openMenu = !openMenu"
              >
                {{$t('menu.association')}}
              </router-link>
            </li>
            <li>
              <router-link
                class="link link-2"
                :to="`/${this.$i18n.locale}/presidium`"
                v-on:click="openMenu = !openMenu"
              >
                {{$t('menu.Presidium')}}
              </router-link>
            </li>
            <li>
              <router-link
                class="link link-2"
                v-on:click="openMenu = !openMenu"
                :to="`/${this.$i18n.locale}/calendarevent`"
              >
                {{$t('menu.Calendar')}} <br />{{$t('menu.measures')}}
              </router-link>
              <!-- <a class="link link-2" href="#">Календарь <br />заходів</a> -->
            </li>
            <li>
              <a
                class="link link-3"
                v-on:click="openMenu = !openMenu"
                href="#"
              >
                {{$t('menu.Gallery')}}
              </a>
            </li>
            <li>
              <a
                class="link link-3"
                href="#"
                v-on:click="openMenu = !openMenu"
              >
                {{$t('menu.Magazines')}}
              </a>
            </li>
            <li>
              <router-link
                class="link link-2"
                :to="`/${this.$i18n.locale}/bmo`"
                v-on:click="openMenu = !openMenu"
              >
                {{$t('menu.BMO')}}
              </router-link>
              <!-- <a class="link link-2" href="#">БМО-БПР</a> -->
            </li>
            <li class="link link-2">
              <router-link
                class="link link-2"
                :to="`/${this.$i18n.locale}/experts`"
                v-on:click="openMenu = !openMenu"
              >
                {{$t('menu.Experts')}}
              </router-link>
            </li>
            <li>
              <router-link
                class="link link-2"
                :to="`/${this.$i18n.locale}/contact`"
                v-on:click="openMenu = !openMenu"
              >
                {{$t('menu.Contacts')}}
              </router-link>
            </li>
          </ul>
<!--          <div class="box_enter">-->
<!--            <router-link class="link" to="/register">Реєстрація</router-link>-->
<!--            <router-link class="link" to="/in-login">Вхід</router-link>-->
<!--          </div>-->
        </div>
      </div>
    </div>
  </header>
</template>
<script>

import axios from "axios";
import SlideUpDown from 'vue3-slide-up-down'
import {$array} from "alga-js";

export default {
  components: {
    SlideUpDown
  },
  data () {
    return {
      myAcc: [],
      openMenu: false,
      infoContact: {
        facebook_link: ''
      },
      openLang: false,
      lang: [
        {
          name: 'UA',
          slag: 'ua'
        },
        {
          name: 'RU',
          slag: 'ru'
        },
        {
          name: 'EN',
          slag: 'en'
        }
      ]
    }
  },
  computed: {
    activeLang() {
      let lang = this.lang.find (item => item.slag == this.$i18n.locale)
      return lang.name
    },
    tokkent() {
      return this.$store.getters.getToken
    }
  },
  created () {
    this.getNotify()
  },
  methods: {
    switchLang(lang) {
      this.$router.push({ params: { lang: lang } });
      localStorage.setItem('lang', lang);
      this.$i18n.locale = lang;
      this.openLang = false
      this.$emit('reloadCommponents')
    },
    async getNotify () {
      let lang = "uk"
      if(this.$i18n.locale != 'ua')
          lang = this.$i18n.locale
      await axios({
        method: 'GET',
        url: (`https://asprof-test.azurewebsites.net/${lang}/api/content/hippocrates/contacts/`),
      }).then(response => {
        this.infoContact.facebook_link = response.data.facebook_link
        // this.messages = res;
      })
        .catch(error => {
          this.$store.dispatch('logout')
        })
        .finally()
      await axios({
        method: 'GET',
        url: (`https://asprof-test.azurewebsites.net/${lang}/api/me/`),
        headers: {
          'Authorization': 'Bearer ' + this.$store.getters.getToken
        }
      }).then(respons => {
        let res = respons.data
        this.$store.dispatch('setMyAcc', res)
        // this.messages = res;
      })
        .catch(error => {
          this.$store.dispatch('logout')
        })
        .finally(() => (this.loading = false))
      this.myAcc = this.$store.getters.getMyAcc
    }
  }
}
</script>
<style scoped src="@/assets/css/screen.css" >
</style>

<style lang="scss">
.nav {
  &_wrapLang {
    padding-right: 15px;
    position: relative;
    margin-top: 2px;
  }

  &_arrPhone {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5 6L0.669873 0.75L9.33013 0.750001L5 6Z' fill='white'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    width: 10px;
    height: 6px;
    position: absolute;
    right: 0;
    top: 7px;
    cursor: pointer;

    &.active {
      transform: rotate(180deg)
    }
    
  }

  &_lang {
    color: #fff;
    font-style: normal;
    font-weight: 700;
    font-size: desktop-vw(16);
    line-height: 130%;
    text-decoration: none;
    cursor: pointer;
  }

  &_listLang {
    display: flex;
    flex-direction: column;
    grid: 5px;
    width: 100%;
  }

  &_wrapListLang {
    position: absolute;
    background: #fa5c18;
    left: -4px;
    top: 22px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.box_enter.modal {
  display: none;
}

.main_page .section-1 {
  min-height: 0;
  height: auto;
}

/*.main_page .section-1 .box_slider {*/
/*  min-height: 700px;*/
/*}*/

/*.main_page .section-1 .box_slider .slick-list .box_img {*/
/*  min-height: 700px;*/
/*}*/

.main_page .section-1 .box_slider .slick-list .box_img img {
  position: absolute;
  top: auto;
  left: auto;
  right: auto;
  bottom: auto;
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.main_page header .container .box_bottom .nav {
  display: inline-block;
  text-align: center;
  margin: 10px 0 0 auto;
  z-index: 1;
  width: 100%;
  max-width: 970px;
}

.main_page header .container .box_bottom .nav > ul {
  display: flex;
  -ms-justify-content: space-between;
  justify-content: space-between;
  align-items: center;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.main_page header .container .box_bottom .nav > ul li {
  display: inline-block;
}

.main_page header .container .box_bottom .nav > ul li a {
  font-size: 14px;
  display: inline-block;
  padding: 5px 0px;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  background: transparent;
  color: #fff;
  transition: all .15s linear;
  overflow: hidden;
  transition: all .2s linear;
}

/*.main_page header .container .box_bottom .nav .box_enter {*/
/*  display: none;*/
/*}*/

.close {
  display: none;
}

@media screen and (max-width: 768px) {

  .main_page header.main-header .container .box_enter.modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0;
    margin-bottom: 30px;
  }

  .main_page header .container .box_enter.modal a {
    margin-right: 0;
  }

  .main_page header.main-header .container .burger {
    z-index: 400;
  }

  .main_page header.main-header {
    background: rgba(0, 38, 120, 0.8);
  }

  .main-header .box_bottom {
    transition: all 0.3s ease;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 500;
    height: 100vh;
    background-color: rgba(0, 38, 120, 1);
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.3);
    transform: translateX(100%);
  }

  .main-header .box_bottom.open {
    transform: translateX(0);
  }

  .main_page header .container .box_bottom .nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px;
  }

  .main_page header .container .box_bottom .nav > ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .close {
    display: block;
    color: #fff;
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 10;
  }
}
</style>
