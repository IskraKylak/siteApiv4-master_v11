<template>
  <div class="wrap_preloader" v-if="loading">
    <preloader :width="90" :height="90"></preloader>
  </div>
  <div class="experts" v-if="experts">
    <div class="box_bread_crumbs">
      <div class="box_content container">
        <a href="#">Головна </a><a href="#">Експерти</a>
      </div>
    </div>
    <section class="experts_section-1">
      <h2>Експерти</h2>
      <div class="box_content container">
        <div
          class="box_mini box_mini-1"
          v-for="(expert, idx) in experts"
          :key="idx"
        >
          <div class="box_img">
            <img
              loading="lazy"
              width="175"
              height="175"
              :src="expert.image"
              alt=""
              data-aos="zoom-in"
              class="aos-init aos-animate"
            />
          </div>
          <div class="box_text">
            <h5>{{ expert.full_name }}</h5>
            <p>
              {{ expert.information }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import axios from "axios";
import preloader from '@/components/UI/Preloader.vue'
import AOS from 'aos'
export default {
  components: {
    preloader
  },
  data() {
    return {
      experts: null,
      loading: false
    };
  },
  created() {
    this.getNotify()
  },
  methods: {
    async getNotify() {
      this.loading = true
      await axios
        .get("https://asprof-test.azurewebsites.net/api/content/asprofosvit/experts/?format=json")
        .then(respons => {
          let res = respons.data
          this.$store.dispatch('setExperts', res)
          // this.messages = res;
          // console.log("res event " + res)
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => (this.loading = false))
      this.experts = this.$store.getters.getExperts
      AOS.init()
    }
  }
};
</script>

<style scoped src="@/assets/css/screen.css" >
</style>
<style scoped>
.experts .experts_section-1 .box_content .box_mini .box_img {
  max-height: 175px;
  min-height: 175px;
  max-width: 175px;
  min-width: 175px;
}

.wrap_preloader {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
}
.experts .experts_section-1 .box_content .box_mini .box_img:before {
  content: '';
  position: absolute;
  top: 0px;
  right: auto;
  bottom: auto;
  left: 0px;
  opacity: 0;
  z-index: 1;
  transition: all .25s linear;
  border-radius: 50%;
  height: 100%;
  width: 100%;
}

</style>
