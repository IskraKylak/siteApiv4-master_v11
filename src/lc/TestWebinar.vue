<template>
  <div class="containerTest">
    <div class="profile_success">
      <router-link :to="'/lc-updatevebinar/'+ this.$route.params.Pid" class="back_btn">Назад</router-link>
      <ComponentTest :content="`webinars/${this.$route.params.Pid}`" :course="false" />
    </div>
  </div>
</template>
<script>
import ComponentTest from '@/components/ComponentTest.vue'

export default {
  components: {
    ComponentTest
  },
}
</script>

<style lang="scss">
  .containerTest {
    padding: 40px;
  }

  .back_btn {
    display: flex;
    width: max-content;
    margin-bottom: 20px;
  }

</style>
