<template>
  <div class="containerTest">
    <div class="profile_success">
      <router-link :to="'/lc-updatecourse/'+this.$route.params.Pid2+'/lesson/'+this.$route.params.Pid3" class="back_btn">Назад</router-link>
      <ComponentTest :content="`courses/${this.$route.params.Pid2}/lessons/${this.$route.params.Pid3}`" :course="true" />
    </div>
  </div>
</template>
<script>
import ComponentTest from '@/components/ComponentTest.vue'

export default {
    data () {
        return {
            lesson: {
                courseId: this.$route.params.Pid2,
                lessonId: this.$route.params.Pid3
            }
        }
    },
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