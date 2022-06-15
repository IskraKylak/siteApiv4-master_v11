<template>
  <div class="wrap_preloader" v-if="loading">
    <preloader :width="90" :height="90"></preloader>
  </div>
  <div class="presidium" v-if="!loading && info">
    <div class="box_bread_crumbs">
      <div class="box_content container">
        <a href="#">Головна </a><a href="#">{{ info.title }}</a>
      </div>
    </div>
    <section class="presidium_section-1 container">
      <div class="box_title">
        <h2>{{ info.title }}</h2>
        <div class="box_text">
          <p>
            {{ info.text }}
          </p>
        </div>
      </div>
      <div class="box_content container">
        <div class="box_mini box_mini-2">
          <div class="box_img">
            <img
              loading="lazy"
              width="175"
              height="175"
              :src="info.presidium_member_photo1"
              alt=""
              data-aos="zoom-in"
              data-aos-delay="300"
              class="aos-init aos-animate"
            />
          </div>
          <div class="box_text">
            <h5 class="text-h5">{{ info.presidium_member_position1 }}</h5>
            <h6>{{ info.presidium_member_name1 }}</h6>
            <p>
              {{ info.presidium_member_description1 }}
            </p>
          </div>
        </div>
        <div class="box_mini box_mini-1">
          <div class="box_img">
            <img
              loading="lazy"
              width="175"
              height="175"
              :src="info.presidium_member_photo2"
              alt=""
              data-aos="zoom-in"
              class="aos-init aos-animate"
            />
          </div>
          <div class="box_text">
            <h5 class="text-h5">{{ info.presidium_member_position2 }}</h5>
            <h6>{{ info.presidium_member_name2 }}</h6>
            <p>
              {{ info.presidium_member_description2 }}
            </p>
          </div>
        </div>
        <div class="box_mini box_mini-3">
          <div class="box_img">
            <img
              loading="lazy"
              width="175"
              height="175"
              :src="info.presidium_member_photo3"
              alt=""
              data-aos="zoom-in"
              data-aos-delay="600"
              class="aos-init aos-animate"
            />
          </div>
          <div class="box_text">
            <h5 class="text-h5">{{ info.presidium_member_position3 }}</h5>
            <h6>{{ info.presidium_member_name3 }}</h6>
            <p>
              {{ info.presidium_member_description3 }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import {mapActions} from "vuex";
import axios from "axios";
import preloader from '@/components/UI/Preloader.vue'
export default {
  name: "calendarevent",
  components: {preloader},
  data() {
    return {
      info: null,
      loading: false
    };
  },
  created() {
    this.getNotify()
  },
  methods: {
    async getNotify () {
      this.loading = true
      await axios
        .get('https://asprof-test.azurewebsites.net/api/content/asprofosvit/presidium/?format=json')
        .then(respons => {
          let res = respons.data
          this.$store.dispatch('setPresidium', res)
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => (this.loading = false))
      this.info = this.$store.getters.getPresidium
    }
  },
};
</script>
<style scoped src="@/assets/css/screen.css" >
</style>
<style scoped>

.presidium .presidium_section-1 .box_content .box_mini .box_img {
  max-height: 310px;
}

.wrap_preloader {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
}

.presidium .presidium_section-1 .box_content .box_mini .box_img:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: auto;
  bottom: auto;
  opacity: 0;
  z-index: 1;
  transition: all .25s linear;
  border-radius: 50%;
  width: 100%;
  height: 100%;
}
</style>
