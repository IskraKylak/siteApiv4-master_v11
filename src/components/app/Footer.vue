<template>
  <footer class="footer">
    <div class="box_content container">
      <div class="box_left">
        <div class="box_adress">
          <h5>{{$t('Footer.Address')}}:</h5>
          <p>{{ infoContact.location }}</p>
        </div>
        <div class="box_mail">
          <h5>Email:</h5>
          <a :href="'mailto:' + infoContact.email">{{infoContact.email}}</a>
        </div>
        <div class="box_tel">
          <a class="tel" :href="'tel:' + item" v-for="(item, idx) in infoContact.tel" :key="idx">{{ item }}</a>
        </div>
      </div>
      <div class="box_right">
        <div class="box_top">
          <h4>{{$t('Footer.signup')}}</h4>
          <div class="box_find">
            <form>
              <input type="text" class="input_email" placeholder="e-mail" />
              <input type="submit" class="input_submit" :value="$t('Footer.btnSing')" />
            </form>
            <div class="box_messendger">
              <a class="link_facebook" :href="infoContact.facebook_link"
              >facebook</a
              >
            </div>
          </div>
        </div>
        <div class="box_bottom">
          <div class="box1 box-1">
            <ul>
              <li>
                <a href="/">{{$t('menu.association')}}</a>
              </li>
              <li>
                <router-link class="link link-2" :to="`/${this.$i18n.locale}/presidium`"
                >{{$t('menu.Presidium')}}</router-link
                >
              </li>
              <li>
                <router-link class="link link-2" :to="`/${this.$i18n.locale}/calendarevent`"
                >{{$t('menu.Calendar')}} <br />{{$t('menu.measures')}}</router-link
                >
              </li>
              <li>
                <a href="#">{{$t('menu.Gallery')}}</a>
              </li>
            </ul>
          </div>
          <div class="box1 box-2">
            <ul>
              <li>
                <a href="#">{{$t('menu.Magazines')}}</a>
              </li>
              <li>
                <router-link class="link link-2" :to="`/${this.$i18n.locale}/bmo`"
                >{{$t('menu.BMO')}}</router-link
                >
              </li>
              <li>
                <a href="#">{{$t('menu.Contacts')}}</a>
              </li>
            </ul>
          </div>
          <div class="box1 box-3">
            <ul v-if="tokkent === ''">
              <li>
                <router-link class="link" :to="`/${this.$i18n.locale}/register`">{{$t('lc.Registration')}}</router-link>
              </li>
              <li>
                <router-link class="link" :to="`/${this.$i18n.locale}/in-login`">{{$t('lc.Login')}}</router-link>
              </li>
            </ul>
            <ul v-else>
              <li>
                <router-link class="link" to="/lc-profile">{{$t('lc.Personal')}}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>

import axios from "axios";
import {$array} from "alga-js";

export default {
  data () {
    return {
      infoContact: {
          title: '',
          text: '',
          tel: [],
          email: '',
          location: 'вул. Деміївська, 13, м. Київ',
          socTitle: 'Зв’язатися через соціальні мережі:',
          facebook_link: '',
          viber_link: '',
          telegram_link: ''
      }
    }
  },
  created () {
    this.getNotify()
  },
  methods: {
    async getNotify () {
      let lang = "uk"
      if(this.$i18n.locale != 'ua')
          lang = this.$i18n.locale
      await axios({
        method: 'GET',
        url: (`https://asprof-test.azurewebsites.net/${lang}/api/content/hippocrates/contacts/`),
      }).then(response => {
        this.infoContact.title = response.data.title
        this.infoContact.text = response.data.text
        this.infoContact.email = response.data.email
        this.infoContact.tel = response.data.phones.split('\r\n')
        this.infoContact.facebook_link = response.data.facebook_link
        this.infoContact.viber_link = response.data.viber_link
        this.infoContact.telegram_link = response.data.telegram_link
        // this.messages = res;
      })
        .catch(error => {
          this.$store.dispatch('logout')
        })
        .finally()
    }
  },
  computed: {
    tokkent() {
      return this.$store.getters.getToken
    }
  }
}
</script>
<style scoped src="@/assets/css/screen.css" >
</style>
