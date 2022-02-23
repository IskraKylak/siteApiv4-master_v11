<template>
  <div class="wrap_table_component">
<!--    {{ info }}-->
    <a :href="'https://asprof-test.azurewebsites.net/api/statistics/events/summary/'+ proId + '/excel/'" class="import_btn">ЕКСПОРТ В EXCEL</a>
    <div class="wrap_search">
      <input type="search" class="input px:width-25" placeholder="Пошук" v-model="searchInput"
             @keyup="searchEvent">
    </div>

    <div class="wrap_table">
      <div class="wrap_my_table table_curses2">
        <table class="my_table">
        <thead class="thead">
          <tr>
            <th v-for="th in columns" :key="th">
              <div>
                <span @click.prevent="sortByColumn(th.name)">{{ th.text }}</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="tbody">
          <tr v-for="td in filteredEntries" :key="td">
            <td>{{ td.id }}</td>
            <td>{{ td.email }}</td>
            <td>{{ td.full_name }}</td>
            <td>{{ td.phone }}</td>
            <td>{{ td.work_phone }}</td>
            <td>{{ td.region }}</td>
            <td>{{ td.town }}</td>
            <td>{{ td.job_place }}</td>
            <td>{{ td.job_name }}</td>
            <td>{{ td.specialization_name }}</td>
            <td>{{ td.tests_count }}</td>
            <td>{{ td.certificates_count }}</td>
          </tr>
        </tbody>
      </table>
      </div>
      <div class="table_foot">
        <div class="table_length">
          Total Rows: {{ entries.length }}
        </div>
        <div class="table_visible_page">
          <div>
            <span>Rows per page:</span>
            <select v-model="currentEntries" class="select" @change="paginateEntries">
              <option v-for="se in showEntries" :key="se" :value="se">{{ se }}</option>
            </select>
          </div>
          <div>
            <div class="start:flex-items">{{ showInfo.from }} - {{ showInfo.to }} of {{ showInfo.of }} entries</div>
          </div>
          <div class="pagination_arr">
            <span :class="['nav-item', { 'disabled': currentPage === 1 }]">
              <a href="#" class="nav-link"
                 @click.prevent="(currentPage < 1) ? currentPage = 1 : currentPage -= 1, paginateEntries()">
                <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path
                  d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"></path></svg>
              </a>
            </span>
            <span :class="['nav-item', { 'disabled': currentPage === allPages }]">
              <a href="#" class="nav-link"
                 @click.prevent="(currentPage > allPages) ? currentPage = allPages : currentPage += 1, paginateEntries()">
                <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path
                  d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"></path></svg>
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!--      <div class="between:flex y:margin-3">-->

    <!--        <div class="end:flex center:items">-->
    <!--          <ul class="pagination:nav">-->
    <!--            <li :class="['nav-item', { 'disabled': currentPage === 1 }]">-->
    <!--              <a href="#" class="nav-link" @click.prevent="currentPage = 1, paginateEntries()">First</a>-->
    <!--            </li>-->
    <!--            <li :class="['nav-item', { 'disabled': currentPage === 1 }]">-->
    <!--              <a href="#" class="nav-link"-->
    <!--                 @click.prevent="(currentPage < 1) ? currentPage = 1 : currentPage -= 1, paginateEntries()">Prev</a>-->
    <!--            </li>-->
    <!--            <li v-for="pagi in showPagination" :key="pagi"-->
    <!--                :class="['nav-item', {'ellipsis': pagi === '...', 'active': pagi === currentPage}]">-->
    <!--              <a href="#" class="nav-link" @click.prevent="paginateEvent(pagi)">{{ pagi }}</a>-->
    <!--            </li>-->
    <!--            <li :class="['nav-item', { 'disabled': currentPage === allPages }]">-->
    <!--              <a href="#" class="nav-link"-->
    <!--                 @click.prevent="(currentPage > allPages) ? currentPage = allPages : currentPage += 1, paginateEntries()">Next</a>-->
    <!--            </li>-->
    <!--            <li :class="['nav-item', { 'disabled': currentPage === allPages }]">-->
    <!--              <a href="#" class="nav-link" @click.prevent="currentPage = allPages, paginateEntries()">Last</a>-->
    <!--            </li>-->
    <!--          </ul>-->
    <!--        </div>-->
    <!--      </div>-->
  </div>
</template>
<script>
import { $array } from 'alga-js'

import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  name: 'DataTable',
  data () {
    return {
      proId: this.$route.params.Pid,
      loading: false,
      columns: [
        {
          name: 'id',
          text: 'ID'
        },
        {
          name: 'email',
          text: 'Email'
        },
        {
          name: 'full_name',
          text: 'Ім\'я'
        },
        {
          name: 'phone',
          text: 'Телефон'
        },
        {
          name: 'work_phone',
          text: 'Робочий телефон'
        },
        {
          name: 'region',
          text: 'Область'
        },
        {
          name: 'town',
          text: 'Населений пункт'
        },
        {
          name: 'job_place',
          text: 'Місце роботи'
        },
        {
          name: 'job_name',
          text: 'Посада'
        },
        {
          name: 'specialization',
          text: 'Спеціалізація'
        },
        {
          name: 'proh',
          text: 'Проходжень'
        },
        {
          name: 'cer',
          text: 'Сертифікатів'
        }
      ],
      entries: [],
      showEntries: [5, 10, 25, 50, 100],
      currentEntries: 10,
      filteredEntries: [],
      currentPage: 1,
      allPages: 1,
      searchInput: '',
      searchEntries: [],
      col: {
        id: '',
        email: '',
        full_name: '',
        phone: '',
        work_phone: '',
        region: '',
        town: '',
        job_place: '',
        job_name: '',
        specialization_name: '',
        tests_count: '',
        certificates_count: ''
      },
      sortcol: {
        id: '',
        email: '',
        full_name: '',
        phone: '',
        work_phone: '',
        region: '',
        town: '',
        job_place: '',
        job_name: '',
        specialization_name: '',
        tests_count: '',
        certificates_count: ''
      }
    }
  },
  // async mounted () {
  //   await this.getNotify()
  // },
  computed: {
    info () {
      return this.$store.getters.getEventsApi
    },
    showInfo () {
      const getCurrentEntries = (this.searchEntries.length <= 0) ? this.entries : this.searchEntries
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      // this.allPages = $array.pages(this.entries, this.currentEntries)
      return $array.show(getCurrentEntries, this.currentPage, this.currentEntries)
    },
    showPagination () {
      return $array.pagination(this.allPages, this.currentPage, 3)
    }
  },
  created () {
    this.getNotify()
  },
  methods: {
    goToEvent (prodId) {
      this.$router.push({
        name: 'lc-updateevents',
        params: { Pid: prodId }
      })
    },
    async getNotify () {
      await axios
      await axios({
        method: 'GET',
        url: (`https://asprof-test.azurewebsites.net/api/statistics/events/summary/${this.proId}/`),
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getToken
        }
      }).then(respons => {
        this.entries = respons.data
        // this.messages = res;
      })
        .catch(error => {
          console.log(error)
        })
        .finally(() => (this.loading = false))
      // this.entries = this.$store.getters.getMessage
      // this.paginateData(this.entries)
      this.filteredEntries = $array.paginate(this.entries, this.currentPage, this.currentEntries)
      this.allPages = $array.pages(this.entries, this.currentEntries)
    },
    paginateEntries () {
      if (this.searchInput.length >= 3) {
        this.searchEntries = $array.search(this.entries, this.searchInput)
        this.paginateData(this.searchEntries)
        // this.filteredEntries = $array.paginate(this.searchEntries, this.currentPage, this.currentEntries)
        // this.allPages = $array.pages(this.searchEntries, this.currentEntries)
      } else {
        this.searchEntries = []
        // this.filteredEntries = $array.paginate(this.entries, this.currentPage, this.currentEntries)
        // this.allPages = $array.pages(this.entries, this.currentEntries)
        this.searchEntries = []
        this.paginateData(this.entries)
        this.col = {
          id: '',
          email: '',
          full_name: '',
          phone: '',
          work_phone: '',
          region: '',
          town: '',
          job_place: '',
          job_name: '',
          specialization_name: '',
          tests_count: '',
          certificates_count: ''
        }
      }
    },
    paginateData (data) {
      this.filteredEntries = $array.paginate(data, this.currentPage, this.currentEntries)
      this.allPages = $array.pages(data, this.currentEntries)
    },
    paginateEvent (page) {
      this.currentPage = page
      this.paginateEntries()
    },
    searchEvent () {
      this.currentPage = 1
      this.paginateEntries()
    },
    getCurrentEntries () {
      return (this.searchEntries.length <= 0) ? this.entries : this.searchEntries
    },
    sortByColumn (column) {
      this.col = {
        id: '',
        email: '',
        full_name: '',
        phone: '',
        work_phone: '',
        region: '',
        town: '',
        job_place: '',
        job_name: '',
        specialization_name: '',
        tests_count: '',
        certificates_count: ''
      }
      let sortedEntries = this.getCurrentEntries()
      const sortedColumn = this.sortcol[column]
      if (sortedColumn === '') {
        this.sortcol[column] = 'asc'
        sortedEntries = $array.sorted(this.getCurrentEntries(), column, 'asc')
      } else if (sortedColumn === 'asc') {
        this.sortcol[column] = 'desc'
        sortedEntries = $array.sorted(this.getCurrentEntries(), column, 'desc')
      } else if (sortedColumn === 'desc') {
        this.sortcol[column] = ''
      }
      this.paginateData(sortedEntries)
    }
  }
}
</script>
<style scoped src="@/assets/lc/css/table.css">
</style>

<style scoped lang="scss">
.table_curses2 {
  width: 100%;
  overflow: auto;
  table {
    min-width: 1800px;
    th,td {
      height: 47px;
    }
  }
}

.import_btn {
  display: flex;
  background-color: #1faeea;
  padding: 8px 22px;
  font-size: .9375rem;
  border-radius: 4px;
  color: #fff;
  letter-spacing: .02857em;
  line-height: 1.75;
  max-height: 42px;
  text-decoration: none;
  max-width: 150px;
  margin-bottom: 20px;
  margin-left: auto;
}
//.table_curses2 .thead .tr,
//.table_curses2 .tbody .tr {
//  width: 100%;
//  grid-template-columns: 6% 6% 6% 7% 12% 6% 10% 8% 7% 8% 8% 8%;
//}
</style>
