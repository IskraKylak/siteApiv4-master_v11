<template>
  <div :key="langChanged">
    <Header @reloadCommponents='reloadCommponents' />
      <router-view />
    <Footer />
  </div>
</template>
<script>
import Header from '@/components/app/Header'
import Footer from '@/components/app/Footer'
import messages from '@/utils/messages'
export default {
  components: {
    Header, Footer
  },
  data() {
    return {
      langChanged: 0,
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    }
  },
  methods: {
    reloadCommponents() {
      this.langChanged++;
    }
  },
  watch: {
    error (e) {
      this.$error(messages[e] || this.$t('message.errors.error'))
    }
  }
}
</script>
<style scoped src="@/assets/css/screen.css" >
</style>
