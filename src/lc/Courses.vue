<template>
  <div class="lc_content" v-if="myAcc.role === 'admin'">
    <TableCourses/>
  </div>

</template>
<script>
import TableCourses from '@/components/TableCourses.vue'
import axios from 'axios'

export default {
  data () {
    return {
      myAcc: []
    }
  },
  components: {
    TableCourses
  },
  created () {
    this.getNotify()
  },
  methods: {
    async getNotify () {
      // await axios({
      //   method: 'GET',
      //   url: ('https://asprof-test.azurewebsites.net/api/me/'),
      //   headers: {
      //     'Authorization': 'Bearer ' + this.$store.getters.getToken
      //   }
      // }).then(respons => {
      //   let res = respons.data
      //   this.$store.dispatch('setMyAcc', res)
      //   // this.messages = res;
      // })
      //   .catch(error => {
      //     console.log(error)
      //   })
      //   .finally(() => (this.loading = false))
      this.myAcc = this.$store.getters.getMyAcc
    }
  }
}
</script>
<style scoped src="@/assets/lc/css/style.min.css">
</style>

<style scoped>
.import_btn {
  margin-top: 10px;
  max-width: 186px;
}
</style>
