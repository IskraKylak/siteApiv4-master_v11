<template>
  <div class="wrap_preloader lc" v-if="loading">
    <preloader :width="90" :height="90"></preloader>
  </div>
  <div v-if="myAcc" :class="[{'scroll-off' : modalValidate}]">
    <div class="lc_content" v-if="myAcc.role === 'admin' && !loading">
      <TableBaseSpecializations/>

      <div class="box-btn-plus">
        <button @click="modalValidate = !modalValidate" class="btn-plus" >
          +
        </button>
      </div>
      <ModalAddSpecializations v-if="modalValidate" @close="closeModal()"/>
    </div>
  </div>
</template>
<script>
import TableBaseSpecializations from '@/components/TableBaseSpecializations'
import axios from 'axios'
import preloader from '@/components/UI/Preloader.vue'
import ModalAddSpecializations from '@/components/ModalAddSpecializations.vue'
export default {
  data () {
    return {
      myAcc: [],
      loading: false,
      modalValidate: false
    }
  },
  components: {
    TableBaseSpecializations,
    preloader,
    ModalAddSpecializations
  },
  created () {
    this.getNotify()
  },
  methods: {
    closeModal () {
      this.modalValidate = false
      this.getNotify()
    },
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
        this.$store.dispatch('setMyAcc', res);
      })
        .catch(error => {
        })
        .finally(() => (this.loading = false))
      this.myAcc = this.$store.getters.getMyAcc
    }
  }
}
</script>
<style scoped src="@/assets/lc/css/style.css">
</style>

<style>
.scroll-off {
  overflow: hidden;
}
</style>
