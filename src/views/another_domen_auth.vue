<template>
  <div>
    {{ tokken }}
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
        }
    },
    created() {
        this.$store.dispatch('add_tokken', this.$route.params.auth_token)
        
        this.$router.push('/lc-profile')
    },
    computed: {
        tokken() {
            return this.$store.getters.getToken
        }
    },
    methods: {
    }
};
</script>

<style scoped>
</style>