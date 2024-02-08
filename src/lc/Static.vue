<template>
  <div class="lc_content" v-if="myAcc.role === 'admin'">
    <div class="import-excel">
      <h2 class="main_title">Статистика по семінарам</h2>
      <a href="https://asprof-test.azurewebsites.net/uk/api/statistics/events/summary/excel/" class="import_btn">ЕКСПОРТ В EXCEL</a>
    </div>
    <TableStatisticCurses />
  </div>
</template>
<script>
import TableStatisticCurses from '@/components/TableStatisticCurses.vue'
// import TableVebinar from '@/components/TableVebinar'
import axios from "axios";

export default {
  data () {
    return {
      myAcc: []
    }
  },
  components: {
    TableStatisticCurses
  },
  created () {
    this.getNotify()
  },
  methods: {
    async getNotify() {
      await axios({
        method: 'GET',
        url: ('https://asprof-test.azurewebsites.net/uk/api/me/'),
        headers: {
          'Authorization': 'Bearer ' + this.$store.getters.getToken
        }
      }).then(respons => {
        let res = respons.data
        this.$store.dispatch('setMyAcc', res)
      })
        .catch(error => {
        })
        .finally(() => (this.loading = false))
      this.myAcc = this.$store.getters.getMyAcc
    }
  }
}
</script>
<style scoped src="@/assets/lc/css/style.min.css">
</style>
