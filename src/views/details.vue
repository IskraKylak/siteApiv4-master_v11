<template>
<!--  <div class="wrap_preloader" v-if="loading">-->
<!--    <preloader :width="90" :height="90"></preloader>-->
<!--  </div>-->
  <div v-if="!loading && product" class="details">
    <div class="event">
      <div>
        <section class="event_section-2" id="1">
          <div class="wrap_img" v-if="product.image != null">
            <img :src="product.image" alt="img"/>
          </div>
          <!-- <div class="box_content">
            <div class="box_left">
              <h1 class="title_event">
                {{ product.name }}
              </h1>
              <div v-html="product.description" class="description_event">
              </div>
            </div>
            <div class="box_right">
              <div class="box box_date">
                <p>{{ day }} {{ monthString }} {{ year }}</p>
              </div>
              <div class="box box_clock">
                <p>{{ time }}</p>
              </div>
              <div class="box box_adress">
                <p>{{ product.place }}</p>
              </div>
            </div>
          </div> -->
        </section>
        <section class="mainBlock">
            <h1 class="title_event">
              {{ product.name }}
            </h1>
            <div v-html="product.description" class="description_event"></div>
            <div class="box box_date">
              <p>{{ day }} {{ monthString }} {{ year }} - {{ time }}</p>
              <p>{{ product.place }}</p>
            </div>
        </section>
        <section class="event_section-3" id="2">
          <div class="box_content">
            <!-- <div class="box_left">
              <h2>{{$t('details.title1')}}</h2>
            </div> -->
            <div class="box_right" v-html="product.text">
            </div>
          </div>
        </section>
        <section class="event_section-4" id="3">
          <div class="box_content">
            <div class="box_title">
              <h2>{{$t('details.title2')}}</h2>
            </div>
            <h3 class="register" style="text-align: center; font-size: 30px" v-if="product.registered">
              {{$t('details.title3')}}
            </h3>
            <div class="box_link">
              <a :href="product.event_documents" class="link link-1" target="_blank">{{$t('details.btnName8')}}</a>
              <a
                href="#"
                v-if="!product.registered"
                @click.prevent="registerSeminar()"
                class="link link-2"
              >
                {{$t('details.btnName1')}}
              </a>
              <a
                href="#"
                v-if="(product.need_pay && !product.paid)"
                @click.prevent="goLiqPay()"
                class="link link-2"
                target="_blank"
              >
                {{$t('details.btnName2')}}
              </a>
            </div>
          </div>
        </section>
        <section>
          <div class="box_content">
            <div v-html="product.ad_text"></div>
          </div>
        </section>
        <!-- <section class="event_section-5" id="4">
          <div class="box_content">
            <div class="box_left">
              <h2>УВАГА!</h2>
              <p>
                НАЙАКТИВНІШІ учасники, які надішлють найбільшу кількість
                запитань експертам у чат - отримають СМАРТФОНИ!!! Обов'язково
                перед запитанням вказати ПІБ та місто.
              </p>
            </div>
            <div class="box_right">
              <p>
                <b>ТАКОЖ ДОДАТКОВО</b> надсилайте
                <b>НАЙСКЛАДНІШІ КЛІНІЧНІ ВИПАДКИ</b> з детальним описом на
                електронну пошту Асоціації - asprofosvit@gmail.com.
              </p>
              <p>
                Найбільш цікаві будуть <b>РОЗГЛЯНУТІ</b> на клінічному
                консиліумі з нашими експертами.
              </p>
              <p>
                За <b>НАЙЦІКАВІШІ</b> клінічні випадки будуть вручені нагороди:
              </p>
              <ul>
                <li>✅ Диплом за найкращий опис клінічного випадку</li>
                <li>✅ Поїздка на відпочинок до Туреччини!</li>
              </ul>
            </div>
          </div>
        </section> -->
        <!-- <section class="event_section-6">
          <div class="box_content">
            <div class="box_title">
              <h2>ONLINE ТРАНСЛЯЦІЯ</h2>
              <p>
                дає можливість навчатися, ставити питання лекторам та
                спілкуватися із своїми колегами без відриву від робочого місця,
                або вдома за чашечкою кави!
              </p>
            </div>
            <div class="box_text">
              <div class="box box-1">
                <p>
                  Навчання у форматі дискусійного клубу "За круглим столом" з
                  провідними експертами: Скрипник І.М., Юдіна Л.В., Бондаренко
                  О.О., Міщенко Л.А.
                </p>
              </div>
              <div class="box box-2">
                <p>
                  Акцентована увага на таких навчальних модулях, як: менеджмент
                  серцево-судинних ризиків, сучасна ревматологія, COVID-19:
                  гострі питання первинної ланки, актуальні питання на
                  амбулаторному прийомі та багато іншого!
                </p>
              </div>
              <div class="box box-3">
                <p>
                  Тільки актуальні знання, засновані на доказовій медицині, та
                  сучасні клінічні протоколи!
                </p>
              </div>
            </div>
          </div>
        </section>
        <section class="event_section-7" id="5">
          <div class="box_content">
            <div class="box_title">
              <h2>
                Після закінчення заходу зареєстровані учасники матимуть
                можливість отримати сертифікати НУОЗУ ім. П.Л. Шупика
                <span v-if="product.points > 4">
                  {{ product.points}} балів
                </span>
                <span v-if="product.points > 1 && product.points < 5">
                  {{ product.points}} бали
                </span>
                <span v-if="product.points === 1">
                  {{ product.points}} бал
                </span>
              </h2>
            </div>
            <div class="box_text">
              <h3>ЯК ОТРИМАТИ СЕРТИФІКАТ?</h3>
              <div class="box">
                <div class="mini_box mini_box-1">
                  <div class="box_inner">
                    <div class="box_img">
                      <img
                        width="80"
                        height="91"
                        loading="lazy"
                        src="@/assets/images/event_section-7_img-1.webp"
                        alt=""
                      />
                    </div>
                    <div class="box_inner_text">
                      <p>
                        Протягом 1 доби після закінчення заходу пройти тестове
                        завдання
                      </p>
                    </div>
                  </div>
                </div>
                <div class="mini_box mini_box-2">
                  <div class="box_inner">
                    <div class="box_img">
                      <img
                        width="80"
                        height="80"
                        loading="lazy"
                        src="@/assets/images/event_section-7_img-2.webp"
                        alt=""
                      />
                    </div>
                    <div class="box_inner_text">
                      <p>
                        Через 7 днів після того, як учасник відповів на тестові
                        завдання, на електронну пошту прийде посилання на
                        сервіс, де зберігається сертифікат. На сервісі
                        зберігаються сертифікати всіх учасників даного заходу.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="mini_box mini_box-3">
                  <div class="box_inner">
                    <div class="box_img">
                      <img
                        width="80"
                        height="80"
                        loading="lazy"
                        src="@/assets/images/event_section-7_img-3.webp"
                        alt=""
                      />
                    </div>
                    <div class="box_inner_text">
                      <p>Знайти свій сертифікат та завантажити його.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="event_section-8">
          <div class="box_title">
            <h2>
              Чекаємо на Вас:
              <span class="event_date">{{ day }} {{ monthString }} {{ year }} року <br/>о {{ time }}</span>
            </h2>
          </div>
          <div class="box_content" v-if="product.test !== null && product.youtube_id_1 !== null">
            <p>
              Увага!<br/>
              Тестування можливе до {{ dayEnd }}.{{ monthEnd }}.{{ yearEnd }} {{ timeEnd }}. Уважно перевіряйте
              особисті та контактні данні, щоб уникнути помилок. Змінити дані в
              сертифікаті буде неможливо.
            </p>
          </div>
          <hr/>
        </section> -->
        <section
          class="event_section-9"
          id="6"
          v-if="product.youtube_id_1 !== null && product.youtube_id_1 !== ''" 
        >
          <div class="box_content">
            <h2 v-if="product.youtube_id_2 !== null && product.youtube_id_2 !== ''">{{$t('details.title11')}}</h2>
            <div 
              :class="{'wrap_zal' : product.youtube_id_2 !== null && product.youtube_id_2 !== ''}" 
              v-if="product.youtube_id_1 !== null && product.youtube_id_1 !== ''"
            >
              <div 
                class="box box-1"
              >
                <div class="box_title">
                  <h3>{{$t('details.title9')}}</h3>
                </div>
                <div class="box_video" v-if="product.youtube_id_1 !== '' && product.youtube_id_1 !== null && product.youtube_id_1 !== undefined">
                  
                  <YoutubeVue3 ref="youtube" :controls="1" :videoid="product.youtube_id_1" :width="480" :height="320" @ended="onEnded"/>
                </div>
                <div class="wrap_programs_panel">
                  <!-- <button class="btn-program">
                    {{$t('details.btnName3')}}
                  </button> -->
                  <form class="wrap_form_question" @submit.prevent="onSubmit1">
                    <div class="wrap_inputs">
                      <input type="text" placeholder="Задати питання спікеру" v-model="form_question1.question">
                    </div>
                    <button class="btn_post">{{$t('details.btnName4')}}</button>
                  </form>
                </div>
              </div>
              <div class="box box-2" v-if="product.youtube_id_2 !== null && product.youtube_id_2 !== ''">
                <div class="box_title">
                  <h3>{{$t('details.title10')}}</h3>
                </div>
                <div class="box_video" v-show="product.youtube_id_2 !== '' && product.youtube_id_2 !== null && product.youtube_id_2 !== undefined">
                  <YouTube 
                    :src="product.youtube_id_2" 
                    @state-change="endVideo"
                    ref="youtube"
                    width="100%" 
                    height="100%" 
                  />
                </div>
                <div class="wrap_programs_panel">
                  <!-- <button class="btn-program">
                    {{$t('details.btnName5')}}
                  </button> -->
                  <form class="wrap_form_question" @submit.prevent="onSubmit2">
                    <div class="wrap_inputs">
                      <input type="text" placeholder="Задати питання спікеру" v-model="form_question2.question">
                    </div>
                    <button class="btn_post">{{$t('details.btnName6')}}</button>
                  </form>
                </div>
              </div>
            </div>
            
            <button
              v-if="product.test !== null && product.youtube_id_1 !== null && product.registered && (product.paid || product.is_free)"
              class="btn_testing"
              @click="goToTest(proId)"
              :disabled="ytVideo1 !== 0 && ytVideo2 !== 0"
            >
              {{$t('details.btnName7')}}
            </button>
          </div>
        </section>
        <div v-if="product.media_partners_set">
          <section  class="event_section-10" id="7" v-if="product.media_partners_set.length !== 0">
          <div class="box_content" >
            <h2>{{$t('details.title5')}}</h2>
            <div class="box_partners">
              <div class="box" v-for="(media_partner, idx) in product.media_partners_set" :key="idx">
                <img
                  width="400"
                  height="124"
                  loading="lazy"
                  :src="media_partner.image"
                  alt=""
                />
              </div>

            </div>
          </div>
        </section>
        </div>
        <div v-if="product.main_partners_set">
          <section class="event_section-11" v-if="product.main_partners_set.length != 0">
          <div class="box_content" >
            <div class="box_title">
              <h2>{{$t('details.title6')}}</h2>
              <p>
                {{$t('details.text1')}}
              </p>
            </div>
            <div class="box_partners">
              <img
                loading="lazy"
                width="400"
                height="124"
                class="img_main"
                src="@/assets/images/event_sct-11_img-8.jpg"
                alt=""
              />
              <a :href="main_partners.link" :title="main_partners.name" class="media_partner_link"
                 :class="'link-media' + (idx + 1)"
                 v-for="(main_partners, idx) in product.main_partners_set" :key="idx" target="_blank">
                <img
                  v-if="main_partners.image"
                  loading="lazy"
                  :src="main_partners.image"
                  :alt="main_partners.name"
                />
              </a>
            </div>
          </div>
        </section>
        </div>
        <div v-if="product.partners_set">
          <section class="event_section-12" v-if="product.partners_set.length != 0">
          <div class="box_content" >
            <div class="box box-1" v-for="(partners, idx) in product.partners_set" :key="idx">
              <a :href="partners.link" class="link">
                <img
                  width="100"
                  height="100"
                  loading="lazy"
                  :src="partners.image"
                  :alt="partners.name"
                />
              </a>
            </div>
          </div>
        </section>
        </div>
        <section class="event_section-13" id="8">
          <div class="box_title">
            <h2>{{$t('details.title7')}}</h2>
            <p>
              {{$t('details.text2')}}
            </p>
          </div>
          <div class="box_content">
            <div class="box box-1">
              <h5>{{$t('details.title8')}}</h5>
              <div class="box_tel">
                <a class="tel" href="tel:+380679867256">067-986-72-56</a>
                <a class="tel" href="tel:+380971622459">097-162-24-59</a>
              </div>
            </div>
            <div class="box box-2">
              <div class="box_tel">
                <a class="tel" href="tel:+380685096239">068-509-62-39</a>
                <a class="tel" href="tel:+380685092220">068-509-22-20</a>
              </div>
            </div>
            <div class="box box-3">
              <h5>Email</h5>
              <div class="box_mail">
                <a href="mailto:asprofosvit@gmail.com">asprofosvit@gmail.com</a>
              </div>
            </div>
          </div>
        </section>
        <!-- <h1></h1>
        <img :src="product.image" class="img-fluid" /> -->
      </div>
    </div>
    <div id="liqpay_checkout"></div>
  </div>

</template>

<script>

import axios from 'axios'
import preloader from '@/components/UI/Preloader.vue'
import { YoutubeVue3 } from 'youtube-vue3'
import YouTube from 'vue3-youtube'
export default {
  name: 'details',
  components: {
    axios,
    preloader,
    YoutubeVue3,
    YouTube 
  },
  data () {
    return {
      ytVideo1: 1,
      ytVideo2: 1,
      LiqPay: '',
      btn_on: true,
      form_question1: {
        question: '',
        event_id: this.$route.params.Pid
      },
      form_question2: {
        question: '',
        event_id: this.$route.params.Pid
      },
      proId: this.$route.params.Pid,
      title: 'details',
      product: {},
      loading: false,
      mounth_mas: [
        this.$t('month.January'), this.$t('month.February'), this.$t('month.March'), this.$t('month.April'), this.$t('month.May'), this.$t('month.June'), this.$t('month.July'), this.$t('month.August'), this.$t('month.September'), this.$t('month.October'), this.$t('month.November'), this.$t('month.December')]
    }
  },
  created () {
    this.getNotify()
  },
  computed: {
    lang() {
      let lang = "uk"
      if(this.$i18n.locale != 'ua')
          lang = this.$i18n.locale
      return lang
    },
    year () {
      if (this.product.start_date) {
        return new Date(this.product.start_date).getFullYear()
      }
      return ''
    },
    month () {
      if (this.product.start_date) {
        return new Date(this.product.start_date).getMonth()
      }
      return ''
    },
    monthString () {
      let month = new Date(this.product.start_date).getMonth()
      
      for (let i = 0; i < this.mounth_mas.length; i++) {
        if (this.product.start_date !== undefined) {
          if (month == i) {
            return this.mounth_mas[i]
          }
        }
      }
      return month + 1
    },
    day () {
      if (this.product.start_date) {
        return new Date(this.product.start_date).getDate()
      }
      return ''
    },
    time () {
      if (this.product.start_date) {
        let hours = new Date(this.product.start_date).getHours()
        let minutes = new Date(this.product.start_date).getMinutes()
        if(minutes < 10)
          minutes = '0' + minutes
        return hours + ":" + minutes
      }
      return ''
    },
    date () {
      if (this.product.start_date) {
        return new Date(this.product.start_date).toLocaleDateString()
      }
      return ''
    },
    yearEnd () {
      if (this.product.testing_end_date) {
        return new Date(this.product.testing_end_date).getFullYear()
      }
      return ''
    },
    monthEnd () {
      if (this.product.testing_end_date) {
        return new Date(this.product.testing_end_date).getMonth() + 1
      }
      return ''
    },
    monthStringEnd () {
      
      let month = new Date(this.product.testing_end_date).getMonth()
      for (let i = 0; i < this.mounth_mas.length; i++) {
        
        if (month == i) {
          return this.mounth_mas[i]
        }
      }
      return ''
    },
    dayEnd () {
      if (this.product.testing_end_date) {
        return new Date(this.product.testing_end_date).getDate()
      } else {
        return ''
      }
    },
    timeEnd () {
      if (this.product.testing_end_date) {
        let hours = new Date(this.product.testing_end_date).getHours()
        let minutes = new Date(this.product.testing_end_date).getMinutes()
        return hours + ":" + minutes
      } else {
        return ''
      }
    },
    dateEnd () {
      if(this.product.testing_end_date)
        return new Date(this.product.testing_end_date).toLocaleDateString()
      return ''
    }
  },
  mounted: function() {
  },
  methods: {
    endVideo (e) {
      this.ytVideo1 = e.data
    },
    playCurrentVideo() {
      this.$refs.youtube.player.playVideo();
    },
    onEnded() {
      this.ytVideo1 = 0
    },
    async registerSeminar () {
      if (this.$store.getters.getToken) {
        await axios({
          url: `https://asprof-test.azurewebsites.net/api/events/${this.$route.params.Pid}/register/`,
          method: 'Post',
          headers: {
            Authorization: 'Bearer ' + this.$store.getters.getToken
          }
        })
          .then(respons => {
            this.$message('Ви зареєстровані!')
            this.getNotify()
          })
          .catch(error => {
            this.$message('Помилка')
          })
      } else {
        this.$router.push({
          name: 'inLogin'
        })
      }
    },
    async goLiqPay () {
      if (this.$store.getters.getToken) {
        await axios({
          url: `https://asprof-test.azurewebsites.net/${this.lang}/api/events/${this.$route.params.Pid}/pay/`,
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + this.$store.getters.getToken
          }
        }).then(respons => {
          this.LiqPay = respons.data
          // this.messages = res;
        })
          .catch(error => {
            this.$message('Помилка')
          })
          .finally(() => (this.loading = false))

        const form = document.createElement('form')
        form.action = 'https://www.liqpay.ua/api/3/checkout'
        form.method = 'POST'

        form.innerHTML = `<input type="hidden" name="data" value="${this.LiqPay.data}"/>
        <input type="hidden" name="signature" value="${this.LiqPay.signature}"/>`

        document.body.append(form)

        form.submit()
      } else {
        this.$router.push({
          name: 'inLogin'
        })
      }
    },
    goToTest (proId) {
      // alert(proId)
      this.$router.push({
        name: 'testVebinar',
        params: { Pid: proId }
      })
    },
    async onSubmit1 () {
      await axios({
        url: `https://asprof-test.azurewebsites.net/${this.lang}/api/events/create/question_to_event/`,
        data: this.form_question1,
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getToken
        }
      }).then(respons => {
        this.$message('Ваше питання відправлено')
      })
        .catch(error => {
          this.$message('Помилка')
        })
        .finally(() => (this.loading = false))
    },
    async onSubmit2 () {
      await axios({
        url: `https://asprof-test.azurewebsites.net/${this.lang}/api/events/create/question_to_event/`,
        data: this.form_question2,
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getToken
        }
      }).then(respons => {
        this.$message('Ваше питання відправлено');
      })
        .catch(error => {
          this.$message('Помилка')
        })
        .finally(() => (this.loading = false))
    },
    async getNotify () {
      this.loading = true
      if (this.$store.getters.getToken) {
        await axios({
          url: `https://asprof-test.azurewebsites.net/${this.lang}/api/events/${this.proId}/`,
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + this.$store.getters.getToken
          }
        }).then(respons => {
          this.$store.dispatch('setClEvent', respons.data)
        })
          .catch(error => {
            this.$message('Помилка')
          })
          .finally(() => (this.loading = false))
      } else {
        await axios({
          url: `https://asprof-test.azurewebsites.net/${this.lang}/api/events/${this.proId}/`,
          method: 'GET',
        }).then(respons => {
          this.$store.dispatch('setClEvent', respons.data);
        })
          .catch(error => {
            this.$message('Помилка')
          })
          .finally(() => (this.loading = false))
      }
      this.product = this.$store.getters.getClEvent
    }
  }
}


</script>
<style scoped src="@/assets/css/screen.css">
</style>
<style lang="scss">

.main_page {

  .mainBlock {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px 20px 0 20px;

    h1.title_event {
      color: #1f4e8c;
      font-size: 50px;
      text-align: center;
    }

    .description_event {
      font-size: 20px;
      font-weight: bold;
    }
  }
} 

.event .event_section-4 .box_content .box_link {
  display: flex;
  width: 100%;
  justify-content: center;
  grid-gap: 20px;
  flex-wrap: wrap;
  @media screen and (max-width: 991px) {
  }
}

.main_page  {
  h3.register {
    color: #16c60c;
  }
}

button:disabled,
button[disabled] {
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
  cursor: auto;

  &:hover {
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
  }
}

.btn_testing {
  display: block;
  max-width: 402px;
  width: 100%;
  margin: 102px auto 0;
  color: #000;
  border: 3px solid #00cf91;
  background-color: #00cf91;
  padding: 20px;
  border-radius: 30px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 50%);
  font-size: 26px;
  font-weight: 700;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: #04b07d;
    border: 3px solid #04b07d;
  }
}

.box_partners {
  position: relative;

  a.media_partner_link {
    position: absolute;

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &.link-media1 {
      left: 0;
      bottom: 0;
      width: 30%;
      height: 28%;
    }

    &.link-media2 {
      left: 2%;
      bottom: 28%;
      width: 21%;
      height: 21%;
    }

    &.link-media3 {
      left: 24%;
      bottom: 28%;
      width: 16%;
      height: 21%;
    }

    &.link-media4 {
      left: 41%;
      bottom: 28%;
      width: 24%;
      height: 25%;
    }

    &.link-media5 {
      left: 66%;
      bottom: 28%;
      width: 13%;
      height: 20%;
    }

    &.link-media6 {
      left: 80%;
      bottom: 24%;
      width: 18%;
      height: 22%;
    }

    &.link-media7 {
      left: auto;
      right: 0;
      bottom: 0%;
      width: 20%;
      height: 22%;
    }
  }

}

.media_partner_link:hover {
  box-shadow: 0 0 20px #1f4e8c;
}

.box_video iframe {
  width: 100%;
  height: 60vh;
  min-height: 300px;
}

.event .event_section-9 .box_content .wrap_zal .box .box_video iframe {
  width: 100%;
  height: 400px;
  min-height: 300px;
}

.event .event_section-9 .box_content .wrap_zal .box.box-1,
.event .event_section-9 .box_content .wrap_zal .box.box-2 {
  margin-top: 0;
}

.wrap_programs_panel {
  margin-top: 30px;

  .btn-program {
    border-radius: 30px;
    border: 2px solid #e0c24a;
    max-width: 300px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    color: #1f4e8c;
    text-transform: uppercase;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 0 auto;

    &:hover {
      background: #e0c24a;
    }
  }
}

.main_page .wrap_form_question {
  display: flex;
  justify-content: center;
  margin: 30px auto 0 auto;

  .btn_post {
    border-radius: 10px;
    height: 50px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    background: #9d001e;
    border: 0;
    font-weight: bold;
    cursor: pointer;
  }

  .wrap_inputs {
    margin-right: 20px;
    max-width: 600px;
    width: 100%;

    input {
      border: 2px solid #cb7979;
      border-radius: 10px;
      display: flex;
      align-items: center;
      padding: 0 15px;
      height: 50px;
      width: 100%;
    }
  }
}

.wrap_zal {
  display: grid;
  grid-template-columns: 48% 48%;
  grid-gap: 4%;
}

@media screen and (max-width: 1024px) {
  .wrap_zal {
    display: grid;
    grid-template-columns: 100%;
    grid-gap: 4%;
  }

  .main_page {

  .mainBlock {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px 0 0 0;

    h1.title_event {
      color: #1f4e8c;
      font-size: 30px;
    }

    .description_event {
      font-size: 20px;
      font-weight: bold;
    }
  }
} 
}

@media screen and (max-width: 768px) {
  .box_partners {
    display: grid;
    grid-template-columns: 49% 49%;
    grid-gap: 2%;
    min-height: 0;
    max-height: 100%;
  }

  .box_partners a.media_partner_link.link-media1,
  .box_partners a.media_partner_link.link-media2,
  .box_partners a.media_partner_link.link-media3,
  .box_partners a.media_partner_link.link-media4,
  .box_partners a.media_partner_link.link-media5,
  .box_partners a.media_partner_link.link-media6,
  .box_partners a.media_partner_link.link-media7 {
    position: relative;
    display: block;
    top: auto;
    left: auto;
    bottom: auto;
    right: auto;
    width: 100%;
    min-height: 25vh;
    height: auto;
  }
}

@media screen and (max-width: 400px) {
  .box_partners {
    display: block;
  }

  .box_partners a.media_partner_link {
    margin-bottom: 20px;
  }
}

</style>

<style scoped>

.box_video {
  overflow: hidden;
}

/* .event_section-2 .wrap_img:before {
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 48, 91, 0.4);
  position: absolute;
  z-index: 5;
} */

.event_section-2 .box_content {
  position: relative;
  z-index: 10;
}

.event_section-2 .wrap_img {
  position: relative;
  z-index: 1;
}

.event .event_section-2 {
  background-image: none;
  position: relative;
  height: auto;
}

.event .event_section-2 .wrap_img {
  position: relative;
  /* top: 0;
  left: 0;
  width: 100%;
  height: 100%; */
  display: flex;
  justify-content: center;
}

.event .event_section-2 .wrap_img img {
  /* position: absolute;
  object-fit: cover; */
  width: 100%;
  height: auto;
}

.event .event_section-8 div.box_title h2:before,
.event .event_section-8 div.box_title h2:after,
.event section.event_section-8 hr,
.event section.event_section-9 .box_content .box .box_title h3:before,
.event section.event_section-9 .box_content .box .box_title h3:after,
.event section.event_section-4 div.box_content h2:before,
.event section.event_section-4 div.box_content h2:after,
.event .event_section-7 .box_content .box_title h2:before,
.event .event_section-7 .box_content .box_title h2:after,
div.event section.event_section-8 hr {
  background: #1f4e8c;
}

div.event .event_section-9 .box_content {
  border-bottom: 1px solid #1f4e8c;
}

.event .event_section-8 hr {

}

</style>
