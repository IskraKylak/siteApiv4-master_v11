<template>
  <div class="containerTest">
    <div class="profile_success">
      <router-link :to="'/lc-updatecourse/'+ this.$route.params.Pid" class="back_btn">Назад</router-link>
      <ComponentTest :content="`courses/${this.$route.params.Pid}`" :course="true" />
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
