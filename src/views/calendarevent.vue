<template>
  <div class="wrap_preloader" v-if="loading">
    <preloader :width="90" :height="90"></preloader>
  </div>
  <div v-if="!loading" class="main_page calendar">
    <div class="box_bread_crumbs">
      <div class="box_content container">
        <a href="#">Головна </a><a href="#">Календар заходів</a>
      </div>
    </div>
    <section class="calendar_section-1">
      <div class="box_content container">
        <div class="box_left">
          <h2>календар заходів</h2>
          <div class="list-product">
            <div v-for="(item, idx) in masCalendarView" class="list-product__item" :key="idx">
              <div @click="goTodetail(item.id)" class="box">
                <div class="box_img" v-if="item.image">
                  <img
                    loading="lazy"
                    :src="item.image"
                    alt="img"
                  />
                  <div class="box_date">
                    <p class="date_number">{{ item.day }}</p>
                    <p class="date_month">{{ mounth[new Date(item.start_date).getMonth()] }}</p>
                  </div>
                </div>
                <div class="box_text">
                  <h4>
                    {{ item.name.split(' ').slice(0, 6).join(' ') + ' ...' }}
                  </h4>
                </div>
                <div class="box_bottom">
                  <div class="box_date">
                    <p>{{ item.normal_date }}</p>
                  </div>
                  <div class="box_location">
                    <p>{{ item.place }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="box_right">
          <div id="datepicker">
            <Calendar @dataSelect='dataSelect' :content="this.allEvents" />
          </div>
        </div>
      </div>
    </section>
    <div class="calendar_section-2" v-if="nearestItem">
      <div class="box_content">
        <div class="box_left">
          <div class="box_inner">
            <div class="box_title">
              <h3>Найближча подія</h3>
              <div class="box_bottom">
                <div class="box_date">
                  <p>{{ nearestItem.day }} {{ nearestMouth }} {{ nearestItem.yaer }}</p>
                </div>
                <div class="box_location">
                  <p>{{ nearestItem.place }}, Україна</p>
                </div>
              </div>
            </div>
            <div class="box_text">
              <h4>
                <a href="#"  @click.prevent="goTodetail(nearestItem.id)">{{ nearestItem.name }}</a>
              </h4>
              <p v-html="nearestItem.description">
              </p>
            </div>
          </div>
        </div>
        <div class="box_right">
          <div class="box_img">
            <img
              loading="lazy"
              width="100"
              height="444"
              :src="nearestItem.image"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
    <div class="calendar_section-3">
      <div class="box_title container">
        <h3><a href="#">Усi заходи</a></h3>
      </div>
      <!-- {{ info }} -->
      <div class="box_content container" v-if="info1">
        <div v-for="(item, idx) in info1" class="item" :key="idx">
          <div @click="goTodetail(item.id)" class="box">
            <div class="box_img">
              <img
                loading="lazy"
                :src="item.image"
                alt=""
              />
              <div class="box_date">
                <p class="date_number">{{ item.day }}</p>
                <p class="date_month">{{ mounth[new Date(item.start_date).getMonth()] }}</p>
              </div>
            </div>
            <div class="box_text">
              <h4>
                {{ item.name.split(' ').slice(0, 6).join(' ') + ' ...' }}
              </h4>
            </div>
            <div class="box_bottom">
              <div class="box_date">
                <p>{{ item.normal_date }}</p>
              </div>
              <div class="box_location">
                <p>{{ item.place }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="box_pagination container">
      <Pagination v-if="pagination.count > 1" :content="pagination" @openPage="openPage" />
      <!-- <ul class="pagination">
        <li><a href="#" class="prev" @click.prevent="prevPage"></a></li>
        <li v-for="(tmpPag, idx) in pagination"
            :key="idx">
          <a
            href="#"
            :class="active === tmpPag ? 'active' : ''"
            @click.prevent="openPage(tmpPag)"
          >
            {{ tmpPag }}
          </a>
        </li>
        <li>
          <a href="#" class="next" @click.prevent="nextPage"></a>
        </li>
      </ul> -->
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

import Calendar from '@/components/Calendar'
import axios from 'axios'
import { $array } from 'alga-js'
import preloader from '@/components/UI/Preloader.vue'
import Pagination from '@/components/Pagination'

export default {
  name: 'calendarevent',
  components: {
    Calendar,
    preloader,
    Pagination
  },
  data () {
    return {
      page: {
        current: 1,
        length: 3,
      },
      pagination: {
        elementPage: 3,
        count: 0,
        next: null,
        prev: null
      },
      allEvents: [],
      pag: [],
      active: 1,
      data: '',
      info1: [],
      countItem: 0,
      loading: false,
      masCalendarView: [],
      // nearestItem: {}
      // mounth: [
      //   'Cічня', 'Лютого', 'Березня', 'Квітня', 'Травня', 'Червня', 'Липня', 'Серпня', 'Вересня', 'Жовтня', 'Листопада', 'Грудня']
    }
  },
  created () {
    this.getNotify()
  },
  methods: {
    dataSelect (data) {
      const events = this.allEvents
      this.masCalendarView = []
      for (let i = 0; i < events.length; i++) {
        let normData = new Date(events[i].start_date)
        normData = normData.getDate() + "-" + (normData.getMonth() + 1) + "-" + normData.getFullYear()
        if(normData === data) {
          events[i].day = new Date(events[i].start_date).getDate()
          this.masCalendarView.push(events[i])
        }
      }
    },
    goTodetail (prodId) {
      this.$router.push({
        name: 'details',
        params: { Pid: prodId }
      })
    },
    async getNotify () {
      this.loading = true
      let lang = "uk"
      if(this.$i18n.locale != 'ua')
        lang = this.$i18n.locale
      await axios
        .get(`https://asprof-test.azurewebsites.net/${lang}/api/events/?ordering=-start_date&page_size=3`)
        .then(respons => {
          let res = respons.data.results
          this.countItem = respons.data.count


          this.pagination.count = respons.data.count
          let urlParams = ''
          if(respons.data.previous) {
              urlParams = new URLSearchParams(respons.data.previous);
              if(parseInt(urlParams.get('page')))
                  this.pagination.prev = parseInt(urlParams.get('page'));
              else 
                  this.pagination.prev = 1
          } else {
              this.pagination.prev = null
          }
          if(respons.data.next) {
              urlParams = new URLSearchParams(respons.data.next);
              this.pagination.next = parseInt(urlParams.get('page'));
          } else {
              this.pagination.next = null
          } 

          this.$store.dispatch('setClEvent', res)
          // this.messages = res;
        })
        .catch(error => {
        })
        .finally(() => (this.loading = false))

      await axios
        .get('https://asprof-test.azurewebsites.net/uk/api/events/?ordering=-start_date&page_size=100')
        .then(respons => {
          let res = respons.data.results
          this.$store.dispatch('setAllEvents', res)
        })

      this.allEvents = this.$store.getters.getAllEvents
      this.info1 = this.$store.getters.getClEvent

      for(let i = 0; i < this.info1.length; i++) {
        this.info1[i].day = new Date(this.info1[i].start_date).getDate()
      }

      // this.nearestItem = this.$store.getters.getClEvent[0]
      // this.nearestItem.mounth = this.mounth [new Date(this.nearestItem.start_date).getMonth()]
      // this.nearestItem.day = new Date(this.nearestItem.start_date).getDate()
      this.pag = Math.ceil(this.info1.length / this.page.length)
    },
     async openPage(data) {
        this.active =  data
        let lang = "uk"
        if(this.$i18n.locale != 'ua')
          lang = this.$i18n.locale
        await axios
        .get(`https://asprof-test.azurewebsites.net/${lang}/api/events/?ordering=-start_date&page_size=3&page=${data}`)
        .then(respons => {
          let res = respons.data.results

          let urlParams = ''
          if(respons.data.previous) {
              urlParams = new URLSearchParams(respons.data.previous);
              if(parseInt(urlParams.get('page')))
                  this.pagination.prev = parseInt(urlParams.get('page'));
              else 
                  this.pagination.prev = 1
          } else {
              this.pagination.prev = null
          }
          if(respons.data.next) {
              urlParams = new URLSearchParams(respons.data.next);
              this.pagination.next = parseInt(urlParams.get('page'));
          } else {
              this.pagination.next = null
          } 

          this.countItem = respons.data.count
          this.$store.dispatch('setClEvent', res)
        })
        .catch(error => {
        })
        .finally(() =>  {

          this.info1 = this.$store.getters.getClEvent
          for(let i = 0; i < this.info1.length; i++) {
            this.info1[i].mounth = this.mounth [new Date(this.info1[i].start_date).getMonth()]
            this.info1[i].day = new Date(this.info1[i].start_date).getDate()
          }
          this.loading = false
        })
        
    }
  },
  computed: {
    nearestItem () {
      const events = this.allEvents
      const today = new Date();
      const closestEvent = events.filter(event => new Date(event.start_date) > today);
      // console.log(closestEvent)
      if (closestEvent.length > 0) {
        let nearestEvent =  closestEvent.reduce((prev, curr) => {
          const currDate = new Date(curr.start_date);
          const prevDate = new Date(prev.start_date);
          return Math.abs(currDate - today) < Math.abs(prevDate - today) ? curr : prev;
        });
        // console.log(nearestEvent)
        nearestEvent.mounth = this.mounth [new Date(nearestEvent.start_date).getMonth()]
        nearestEvent.day = new Date(nearestEvent.start_date).getDate()
        return nearestEvent
      } else {
        return null;
      }
    },
    mounth() {
      return [
        this.$t('month.January'),
        this.$t('month.February'), 
        this.$t('month.March'), 
        this.$t('month.April'), 
        this.$t('month.May'), 
        this.$t('month.June'), 
        this.$t('month.July'), 
        this.$t('month.August'), 
        this.$t('month.September'),
        this.$t('month.October'), 
        this.$t('month.November'), 
        this.$t('month.December'),
      ]
    },
    nearestMouth() {
      if(this.nearestItem.start_date)
        return this.mounth [new Date(this.nearestItem.start_date).getMonth()]
      return ''
    }
    // pagination() {
    //     let pag = 0
    //     for( let i = 0; i < this.countItem; i+=6) {
    //         pag+=1
    //     }
    //     return pag
    // },
  }
}
</script>
<style scoped src="@/assets/css/screen.css">
</style>
<style scoped lang="scss">

.list-product {
  display: flex;
  flex-wrap: wrap;
  grid-gap: 20px;
  width: 100%;
  margin-top: 20px
}

.list-product__item {
  max-width: 360px;
  min-width: 360px;
  background: #f7f6f6;
  box-shadow: 0px 9px 12px rgba(216, 216, 216, 40%);

  .box_text {
    padding: 21px 35px 6px 35px;
    font-size: 15px;
    color: var(--main-color);
    text-transform: none;
    transition: all .25s linear;
    line-height: 1.7;

    h4 {
      font-size: 15px;
      color: var(--main-color);
      text-transform: none;
      transition: all .25s linear;
      line-height: 1.7;
      min-height: 50px;
    }
  }

  .box_bottom {
    padding: 10px 35px 27px;
    .box_date {
      padding-left: 28px;
      // background-image: url(/img/icon-calendar.ef86b879.svg);
      background-position: left center;
      background-repeat: no-repeat;
      background-size: 17px;
      p {
        font-size: 15px;
        color: var(--color-gray);
        font-weight: 500;
      }
    }
    .box_location {
      padding-left: 28px;
      // background-image: url(/img/icon-map.58a179a1.svg);
      background-position: left top;
      background-repeat: no-repeat;
      background-size: 17px;
      margin-top: 10px;
      p {
        font-size: 15px;
        color: var(--color-gray);
        font-weight: 500;
      }
    }
  }

  .box_img {
    min-height: 300px;
    max-height: 300px;
    width: 100%;
    overflow: hidden;
    position: relative;

    .box_date {
      position: absolute;
      top: 0;
      left: 34px;
      border-top: 14px solid var(--color-orange);
      box-shadow: 3px 3px 10px #000;
      background: #fff;
      padding: 0 15px 10px;

      .date_number {
        text-align: center;
        color: var(--main-color);
        font-weight: 700;
        font-size: 30px;
        line-height: 1.2;
      }

      .date_month {
        text-align: center;
        color: var(--main-color);
        font-size: 18px;
        font-weight: 600;
        line-height: .8;
      }
    }

    img {
      position: absolute;
      object-fit: cover;
      width: 100%;
    }
  }
}

.calendar_section-3 .box_content.container {
  display: grid;
  grid-template-columns: calc(33% - 20px) calc(33% - 20px) calc(33% - 20px);
  grid-gap: 20px;
}

#datepicker {
  width: max-content;
}

.box_img {
  min-height: 300px;
  max-height: 300px;
  overflow: hidden;
  position: relative;
}

.calendar .calendar_section-3 .box_content .box .box_img img {
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.main_page {
  padding-top: 0;
}

.calendar .calendar_section-1 .box_content {
  grid-gap: 30px;
}

.calendar .calendar_section-1 .box_content .box_left[data-v-2bc12f1c], .calendar .calendar_section-1 .box_content .box_right {
  width: max-content; 
}

.calendar .calendar_section-1 .box_content .box_left {
  flex: 1 1 auto;
}

.box_right {
  
  display: flex;
  justify-content: flex-end;
}

.box_text h4 {
  min-height: 50px;
}

@media screen and (max-width: 1200px) {
  .calendar .calendar_section-3 .box_content .item {
    max-width: 100%;
  }
}

@media screen and (max-width: 991px) {
  .calendar_section-3 .box_content.container {
    display: grid;
    grid-template-columns: calc(50% - 20px) calc(50% - 20px);
    grid-gap: 20px;
  }
}

@media screen and (max-width: 768px) {
  .box_img {
    min-height: 200px;
    max-height: 200px;
  }

  .calendar_section-3 .box_content.container {
    display: grid;
    grid-template-columns: calc(50% - 10px) calc(50% - 10px);
    grid-gap: 10px;
  }
}

@media screen and (max-width: 768px) {
  .calendar_section-3 .box_content.container {
    display: grid;
    grid-template-columns: 100%;
    grid-gap: 10px;
  }

  .calendar .calendar_section-3 .box_content .item {
    max-width: 300px;
    width: 100%;
    margin: 0 auto;
  }
}

.wrap_preloader {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
}
</style>
<style scoped lang="scss">
.button_list {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;

  .btn {
    border-radius: 60px;
    margin: 0 20px;
  }
}

.btn-pag {
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #494ce8;
  border-radius: 50%;
  color: #fff;
  margin: 0 2px;
  cursor: pointer;
}
</style>
