<template>
  <div class="calendar" :class="headTrue() ? 'true' : ''">
    <!--    {{ dataEventYM }}-->
    <!--    {{ dataEventD }}-->
    <!--    {{ title2 }}-->
    <div class="header">
      <button @click="prev">&#9668;</button>
      <span class="title">{{ title }}</span>
      <button @click="next">&#9658;</button>
    </div>
    <div class="week days">
      <div class="day">Нд</div>
      <div class="day">Пн</div>
      <div class="day">Вт</div>
      <div class="day">Ср</div>
      <div class="day">Чт</div>
      <div class="day">Пт</div>
      <div class="day">Сб</div>
    </div>
    <div class="week" v-for="(week, idx) in weeks" :key="idx">
      <div class="day selectable"
           :class="day == 0 ? 'hide' : '', dayTrue(day) ? 'class-red' : ''"
           v-for="(day, idx) in week" @click="showEvents(day)" :key="idx">
        {{ day }}
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

const DATE = new Date()
const DAYS = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
const MONTHS = ['Cічень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень']
const daysInYearMonth = (y, m) => new Date(y, m, 0).getDate()
export default {
  // props: {
  //   dataEventYM: {
  //     type: Object
  //   },
  //   dataEventD: {
  //     type: Object
  //   }
  // },
  data () {
    return {
      title: '-',
      title2: '',
      month: 0,
      year: 0,
      days: [],
      weeks: [],
      eventTrue: [],
      trueDay: false
    }
  },
  mounted () {
    this.init()
  },
  created () {
    this.getNotify()
  },
  computed: {
    dataEventYM () {
      let dataEvent = []
      let dataEvent1 = []
      for (let index = 0; index < this.eventTrue.length; ++index) {
        dataEvent.push((this.eventTrue[index].start_date).split('T')[0].split('-')[0])
      }
      for (let index = 0; index < this.eventTrue.length; ++index) {
        dataEvent1.push((this.eventTrue[index].start_date).split('T')[0].split('-')[1])
      }
      for (let index = 0; index < dataEvent.length; ++index) {
        dataEvent[index] = `${dataEvent[index]}-${dataEvent1[index]}`
      }
      return dataEvent
    },
    dataEventY () {
      let dataEvent = []
      for (let index = 0; index < this.eventTrue.length; ++index) {
        dataEvent.push((this.eventTrue[index].start_date).split('T')[0].split('-')[0])
      }
      return dataEvent
    },
    dataEventM () {
      let dataEvent = []
      for (let index = 0; index < this.eventTrue.length; ++index) {
        dataEvent.push((this.eventTrue[index].start_date).split('T')[0].split('-')[1])
      }
      return dataEvent
    },
    dataEventD () {
      let dataEvent = []
      for (let index = 0; index < this.eventTrue.length; ++index) {
        dataEvent.push((this.eventTrue[index].start_date).split('T')[0].split('-')[2])
      }
      return dataEvent
    }
  },
  methods: {
    headTrue () {
      for (let index = 0; index < this.eventTrue.length; ++index) {
        // alert((this.eventTrue[index].start_date).split('T')[0].split('-')[0] + '=' + this.year + "  " + parseInt((this.eventTrue[index].start_date).split('T')[0].split('-')[1]) +'='+ parseInt((this.month+1)))
        if ((this.eventTrue[index].start_date).split('T')[0].split('-')[0] == this.year && parseInt((this.eventTrue[index].start_date).split('T')[0].split('-')[1]) == parseInt((this.month+1))) {
          // alert((this.eventTrue[index].start_date).split('T')[0].split('-')[0] + ' ' + this.year)
          // alert(parseInt((this.eventTrue[index].start_date).split('T')[0].split('-')[1]) + " " + (this.month+1))
          // alert((this.eventTrue[index].start_date).split('T')[0].split('-')[1] + " " + this.year)
          // alert((this.eventTrue[index].start_date).split('T')[0].split('-')[1] + " " + (this.month+1))
          this.trueDay = true
          return true
        }
      }
      return false
    },
    dayTrue(day) {
      for (let index = 0; index < this.eventTrue.length; ++index) {
        // alert((this.eventTrue[index].start_date).split('T')[0].split('-')[1] + " " + (this.title2).split('-')[1])
        if (parseInt((this.eventTrue[index].start_date).split('T')[0].split('-')[1]) == (this.title2).split('-')[1]) {
          if(day == (this.eventTrue[index].start_date).split('T')[0].split('-')[2]) {
            return true
          }
        }
      }
      return false
    },
    async getNotify () {
      await axios
        .get('https://asprof-test.azurewebsites.net/api/events/?format=json')
        .then(respons => {
          let res = respons.data
          this.$store.dispatch('setClEvent', res)
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => (this.loading = false))
      this.eventTrue = this.$store.getters.getClEvent
    },
    next () {
      this.update(new Date(this.year, this.month + 1, 1))
    },
    prev () {
      this.update(new Date(this.year, this.month - 1, 1))
    },
    daysInMonth () {
      return daysInYearMonth(this.year, this.month)
    },
    monthStartsOn () {
      return new Date(this.year, this.month, 1).getDay()
    },
    setTitle () {
      this.title2 = `${this.year}-${this.month + 1}`
      this.title = `${MONTHS[this.month]} ${this.year}`
    },
    update (date) {
      if (date) {
        this.month = date.getMonth()
        this.year = date.getFullYear()
        this.day = date.getDate()
      }
      this.setTitle()
      this.setDays()
      this.setWeeks()
    },
    setDays () {
      let preDays = this.monthStartsOn() > 0 ? Array(this.monthStartsOn() - 1).fill(0) : []
      this.days = [...preDays, ...Array(this.daysInMonth() + 2).keys()]
    },
    setWeeks () {
      let n = 0
      this.weeks = []

      while (n < this.days.length) {
        let week = [...this.days.slice(n, n += 7), ...Array(7).fill(0)].slice(0, 7)
        this.weeks.push(week)
      }
    },
    showEvents (day) {
      let data = `${this.title2}-${day}`
      this.$emit('showEvents', { data: data })
    },
    init () {
      this.update(DATE)
    }
  }
}
</script>
<style scoped src="@/assets/lc/css/table.css">
</style>
<style scoped>

* {
  box-sizing: border-box
}

.week.days {
  background: #036;
  color: #fff;
}

.calendar {
  width: 300px;
  /*margin: 20px;*/
  /*border: 1px solid #000;*/
  border-bottom-width: 2px;
  border-right-width: 2px;
  /*padding: 20px;*/
  background: #fff;
}

.week {
  width: 300px;
  height: 32px;
  padding: 1px 0;
}

.day {
  width: 40px;
  height: 30px;
  float: left;
  display: flex;
  direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 1px;
  border-radius: 3px;
}

.day.selectable {
  cursor: pointer;
}

.day.selectable:hover {
  border: 1px solid #000;
  background: #ddf2f7;
}

.hide {
  opacity: 0;
}

.calendar.true .class-red {
  background: #e1cd00;
  color: #fff;
  font-weight: bold;
}

.header button {
  background: transparent;
  border: 0;
  cursor: pointer;
}

.header {
  text-align: center;
  height: 35px;
}

header.true {
}

#datepicker .calendar .header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
