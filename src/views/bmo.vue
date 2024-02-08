<template>
  <div class="wrap_preloader" v-if="loading">
    <preloader :width="90" :height="90"></preloader>
  </div>
  <div v-if="!loading && bmo" class="bmo-bpr active">
    <section class="section-1">
      <div class="item">
        <a href="#" class="box_content">
          <div class="box_img" v-if="bmo.banner !== null">
            <img
              loading="lazy"
              :src="bmo.banner"
              alt=""
              width="100"
              height="100"
            />
          </div>
          <div class="box_text">
            <div class="box_title">
              <h1 class="text-h1">
                {{ bmo.title1 }}
              </h1>
            </div>
          </div>
        </a>
      </div>
    </section>
    <div class="box_bread_crumbs">
      <div class="box_content container">
        <a href="#">Головна </a><a href="#">Президіум</a>
      </div>
    </div>
    <div class="bmo-bpr_section-2">
      <div class="box_content container">
        <div class="box_top">
          <p>
            {{ bmo.text1 }}
          </p>
        </div>
        <div class="box_bottom">
          <h3>
            {{ bmo.title2 }}
          </h3>
          <p>
            {{ bmo.text2 }}
          </p>
        </div>
      </div>
    </div>
    <section class="bmo-bpr_section-3">
      <div class="box_content container">
        <div class="box_left">
          <div class="box_inner">
            <div class="box_top">
              <h2 data-aos="">НАвіщо потрібне освітнє портфоліо</h2>
              <p>
                Офіційні документи МОЗ України, які повинен заповнювати кожен
                лікар для підготовки до атестації!
              </p>
            </div>
          </div>
        </div>
        <div class="box_right">
          <img
            width="100"
            height="100"
            loading="lazy"
            class="img_bg"
            src="@/assets/images/bmo-bpr_section-2_img-1.webp"
            alt=""
          />
          <div class="box_link">
            <a class="link_gallary" :href="bmo.form"
              > {{ bmo.form_name }}
              <svg
                class="mdi-icon"
                width="36"
                height="36"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>

import axios from "axios";
import preloader from '@/components/UI/Preloader.vue'
export default {
  name: "bmp",
  components: {
    preloader
  },
  data() {
    return {
      title: "bmp",
      bmo: null,
      loading: false
    };
  },
  created() {
    this.getNotify()
  },
  methods: {
    async getNotify () {
      this.loading = true
      let lang = "uk"
      if(this.$i18n.locale != 'ua')
          lang = this.$i18n.locale
      await axios
        .get(`https://asprof-test.azurewebsites.net/${lang}/api/content/asprofosvit/BmoNpr/?format=json`)
        .then(respons => {
          let res = respons.data
          this.$store.dispatch('setBmoNpr', res)
          // this.messages = res;
        })
        .catch(error => {
        })
        .finally(() => (this.loading = false))
      this.bmo = this.$store.getters.getBmoNpr
    }
  }
};
</script>
<style scoped src="@/assets/css/screen.css" >
</style>
<style scoped>

.wrap_preloader {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
}
</style>

