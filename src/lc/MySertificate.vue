<template>
  <div class="container">
    <div class="table_sertificate table_cust">
      <div class="table_wrapper">
        <div class="title_table">
          <h1>Семінари</h1>
        </div>
        <div class="sub_title">
          <p class="sertificate_sub_title_text1">Назва</p>
          <p class="sertificate_sub_title_text2">Дата</p>
        </div>
        <div
          class="table_content"
          v-for="(elem, idx) in certificatesEvent"
          :key="idx"
        >
          <div class="left_content">
            <h3 class="title_content">{{ elem.name }}</h3>
          </div>
          <div class="right_content">
            <a :href="elem.url" class="download_btn" type="">Завантажити</a>
            <p class="date_content">{{ elem.created }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="table_sertificate table_cust">
      <div class="table_wrapper">
        <div class="title_table">
          <h1>Вебінари</h1>
        </div>
        <div class="sub_title">
          <p>Назва</p>
          <p class="sertificate_sub_title_text2">Дата</p>
        </div>
        <div
          class="table_content"
          v-for="(elem, idx) in certificatesCourse"
          :key="idx"
        >
          <div class="left_content">
            <h3 class="title_content">{{ elem.name }}</h3>
          </div>
          <div class="right_content">
            <a :href="elem.url" class="download_btn" type="">Завантажити</a>
            <p class="date_content">{{ elem.created }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped src="@/assets/lc/css/style.css">
</style>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      myAcc: [],
      certificates: []
    }
  },
  components: {
  },
  created () {
    this.getNotify()
  },
  computed: {
    certificatesCourse () {
      const mounth = ['січня', 'лютого',
        'березня', 'квітня', 'травня',
        'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня']
      let mas = []
      if (this.certificates && this.certificates.course_certificates) {
        // eslint-disable-next-line no-const-assign
        mas = this.certificates.course_certificates
        for (let i = 0; i < mas.length; i++) {
          const date = new Date(mas[i].created)
          mas[i].created = date.getDate() + ' ' +
            mounth[date.getMonth()] + ' ' + date.getFullYear()
        }
      }
      return mas
    },
    certificatesEvent () {
      const mounth = ['січня', 'лютого',
        'березня', 'квітня', 'травня',
        'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня']
      let mas = []
      if (this.certificates && this.certificates.event_certificates) {
        // eslint-disable-next-line no-const-assign
        mas = this.certificates.event_certificates
        for (let i = 0; i < mas.length; i++) {
          const date = new Date(mas[i].created)
          mas[i].created = date.getDate() + ' ' +
            mounth[date.getMonth()] + ' ' + date.getFullYear()
        }
      }
      return mas
    }
  },
  methods: {
    async getNotify () {
      await axios({
        method: 'GET',
        url: ('https://asprof-test.azurewebsites.net/uk/api/statistics/certificates/'),
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getToken
        }
      }).then(respons => {
        this.$store.dispatch('setCertificates', respons.data)
      })
        .catch(error => {
        })
        .finally(() => (this.loading = false))
      this.certificates = this.$store.getters.getCertificate
    }
  }
}
</script>
