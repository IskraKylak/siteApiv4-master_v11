<template>
  <div class="wrap_preloader lc" v-if="loading">
    <preloader :width="90" :height="90"></preloader>
  </div>
  <div v-if="myAcc" :class="[{'scroll-off' : modalValidate}]">
    <div class="lc_content" v-if="myAcc.role === 'admin' && !loading">
      <TableBaseVebinars/>

      <div class="box-btn-plus">
        <button @click="modalValidate = !modalValidate" class="btn-plus" >
          +
        </button>
      </div>
      <ModalAddEvent v-if="modalValidate" @close="closeModal()"/>
    </div>
  </div>
</template>
<script>
import TableBaseVebinars from '@/components/TableBaseVebinars.vue'
import axios from 'axios'
import preloader from '@/components/UI/Preloader.vue'
import ModalAddEvent from '@/components/ModalAddEvent.vue'
export default {
  data () {
    return {
      myAcc: [],
      loading: false,
      modalValidate: false
    }
  },
  components: {
    TableBaseVebinars,
    preloader,
    ModalAddEvent
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
        this.$store.dispatch('setMyAcc', res)
        // this.messages = res;
      })
        .catch(error => {
          console.log(error)
        })
        .finally(() => (this.loading = false))
      this.myAcc = this.$store.getters.getMyAcc
      console.log('this.myAcc')
      console.log(this.myAcc)
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
