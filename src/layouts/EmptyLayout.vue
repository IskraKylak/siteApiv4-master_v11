<template>
  <Header />
  <router-view />
  <Footer />
</template>
<script>
import Header from '@/components/app/Header'
import Footer from '@/components/app/Footer'
import messages from '@/utils/messages'
export default {
  components: {
    Header, Footer
  },
  computed: {
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    error (e) {
      console.log("Empty" + e)
      this.$error(messages[e] || 'Что то пошло не так')
    }
  }
}
</script>
<style scoped src="@/assets/css/screen.css" >
</style>
