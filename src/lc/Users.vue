<template>
  <div class="wrap_preloader lc" v-if="loading">
    <preloader :width="90" :height="90"></preloader>
  </div>
  <div class="lc_content" v-if="myAcc.role === 'admin' && !loading" >
    <TableBaseUsers/>
  </div>
</template>

<script>
import TableBaseUsers from '@/components/TableBaseUsers.vue'
import axios from "axios";
import preloader from '@/components/UI/Preloader.vue'
export default {
  data () {
    return {
      myAcc: [],
      loading: false,
    }
  },
  components: {
    TableBaseUsers,
    preloader
  },
  created () {
    this.getNotify()
  },
  methods: {
    async getNotify() {
      this.loading = true
      await axios({
        method: 'GET',
        url: ('https://asprof-test.azurewebsites.net/api/me/'),
        headers: {
          'Authorization': 'Bearer ' + this.$store.getters.getToken
        }
      }).then(respons => {
        let res = respons.data
        this.$store.dispatch('setMyAcc', res)
        // this.messages = res;
      })
        .catch(error => {
          console.log(error)
        })
        .finally(() => (this.loading = false))
      this.myAcc = this.$store.getters.getMyAcc
    }
  }
}
</script>

<style scoped src="@/assets/lc/css/style.min.css">
</style>
