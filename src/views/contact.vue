<template>
  <div class="contacts">
    <div class="box_bread_crumbs">
      <div class="box_content container">
        <a href="#">Головна </a><a href="#">Контакти</a>
      </div>
    </div>
    <section class="contacts_section-1">
      <h2>контакти</h2>
      <div class="box_content container">
        <div class="box_top">
          <div class="box_mini box_mini-1">
            <div class="box_adress">
              <h5>Адреса:</h5>
              <p>{{ infoContact.location }}</p>
            </div>
          </div>
          <div class="box_mini box_mini-2">
            <div class="box_mail">
              <h5>Email:</h5>
              <a :href="'mailto:'+infoContact.email">{{ infoContact.email }}</a>
            </div>
          </div>
          <div class="box_mini box_mini-3">
            <div class="box_tel">
              <h5>телефон</h5>
              <a class="tel" :href="'tel:'+item" v-for="(item, idx) in infoContact.tel" :key="idx">{{ item }}</a>
            </div>
          </div>
        </div>
        <div class="box_bottom">
          <h2>підпишись на новини, щоб бути у курсі</h2>
          <div class="box_form">
            <form>
              <input type="text" class="input_email" placeholder="e-mail" />
              <input type="submit" class="input_submit" value="OK" />
            </form>
            <p>або</p>
            <div class="box_messendger">
              <a class="link_facebook" :href="infoContact.facebook_link"
                >facebook</a
              >
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="contacts_section-2">
      <div class="box_content">
        <iframe class="GoogleMaps_wrapper__128ML" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.137654933049!2d30.4989720511683!3d50.457161294661866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce66582595b5%3A0x7b5ada9cb8f548e2!2z0YPQuy4g0JrRg9C00YDRj9Cy0YHQutCw0Y8sIDMvNSwg0JrQuNC10LIsIDAyMDAw!5e0!3m2!1sru!2sua!4v1604348613190!5m2!1sru!2sua" frameborder="0"></iframe>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

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
      await axios({
        method: 'GET',
        url: ('https://asprof-test.azurewebsites.net/api/content/hippocrates/contacts/'),
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
          console.log(error)
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
<style scoped>
</style>

