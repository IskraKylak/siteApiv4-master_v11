<template>
  <div class="wrap_preloader lc" v-if="loading">
    <preloader :width="90" :height="90"></preloader>
  </div>
  <div v-if="!loading" class="wrap_table_component">
    <div class="import-excel">
      <h2 class="main_title">Користувачі</h2>
      <a href="https://asprof-test.azurewebsites.net/uk/api/users/excel/" class="import_btn">ЕКСПОРТ В EXCEL</a>
    </div>
    <div class="wrap_search">
      <input type="search" class="input px:width-25" placeholder="Пошук" v-model="searchInput"
             @keyup="searchEvent">
    </div>
    <div class="wrap_table">
      <div class="wrap_my_table">
        <table class="table table_user">
          <thead class="thead">
            <tr class="tr">
              <th class="th" v-for="th in columns" :key="th">
                <div>
                  <span @click.prevent="sortByColumn(th.name)">{{ th.text }}</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody class="tbody">
            <tr class="tr" v-for="td in filteredEntries" :key="td">
              <td class="td">{{ td.id }}</td>
              <td class="td">{{ td.full_name }}</td>
              <td class="td">{{ td.job_name }}</td>
              <td class="td">{{ td.start_activity_date }}</td>
              <td class="td">{{ td.phone }}</td>
              <td class="td">{{ td.email }}</td>
              <td class="td">
                <div class="wrap_td_icons">
                  <div @click="goToEvent(td.id)" class="icon_svg_table icon_svg_table_edit" title="Редагувати">
                    <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
                    </svg>
                  </div>
                  <span class="icon_svg_table icon_svg_table_remove" title="Видалити">
                    <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path
                      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table_foot">
        <div class="table_length">
          Total Rows: {{ countEvent }}
        </div>
        <div class="table_visible_page">
          <!-- <div>
            <span>Rows per page:</span>
            <select v-model="currentEntries" class="select" @change="paginateEntries">
              <option v-for="se in showEntries" :key="se" :value="se">{{ se }}</option>
            </select>
          </div> -->
          <div>
            <div class="start:flex-items">open {{ openPage}} - {{ allPages }} pages</div>
          </div>
          <div class="pagination_arr">
            <span :class="['nav-item', { 'disabled': openPage === 1 }]">
              <a href="#" class="nav-link"
                 @click.prevent="prevPage()">
                <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path
                  d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"></path></svg>
              </a>
            </span>
            <span :class="['nav-item', { 'disabled': openPage === allPages }]">
              <a href="#" class="nav-link"
                 @click.prevent="nextPage()">
                <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path
                  d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"></path></svg>
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import { $array } from 'alga-js'
import axios from 'axios'
import preloader from '@/components/UI/Preloader.vue'

export default {
  name: 'DataTable',
  components: {
    preloader
  },
  data () {
    return {
      sort: '-start_date',
      loading: false,
      columns: [
        {
          name: 'id',
          text: 'ID'
        },
        {
          name: 'last_name',
          text: 'ПІБ'
        },
        {
          name: 'job_name',
          text: 'Спеціальність'
        },
        {
          name: 'start_activity_date',
          text: 'Дата Реєстрації'
        },
        {
          name: 'phone',
          text: 'Номер телефона'
        },
        {
          name: 'email',
          text: 'E-mail'
        },
        {
          name: 'action',
          text: 'Дії'
        }
      ],
      entries: [],
      // showEntries: [5, 10, 25, 50, 100],
      currentEntries: 100,
      filteredEntries: [],
      currentPage: 1,
      allPages: 1,
      searchInput: '',
      searchEntries: [],
      countEvent: 0,
      openPage: 1,
      col: {
        id: '',
        last_name: '',
        specialty: '',
        date: '',
        tel: '',
        email: '',
        action: ''
      },
      sortcol: {
        id: '',
        name: '',
        specialty: '',
        date: '',
        tel: '',
        email: '',
        action: ''
      }
    }
  },
  computed: {
    showInfo () {
      const getCurrentEntries = (this.searchEntries.length <= 0) ? this.entries : this.searchEntries
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
        name: 'lc-updateuser',
        params: { Pid: prodId }
      })
    },
    async getNotify () {
      this.loading = true
      await axios({
        method: 'GET',
        url: (`https://asprof-test.azurewebsites.net/uk/api/users/?format=json&ordering=${this.sort}&page=${this.openPage}`),
        headers: {
          'Authorization': 'Bearer ' + this.$store.getters.getToken
        }
      }).then(respons => {
        let res = respons.data.results
        this.$store.dispatch('setUsers', res)
        this.countEvent = respons.data.count
        // this.messages = res;
      })
      .catch(error => {
      })
      .finally(() => {
        this.entries = this.$store.getters.getUsers
        this.filteredEntries = $array.paginate(this.entries, this.currentPage, this.currentEntries)
        this.allPages = 0
        for(let i = 0; i < this.countEvent; i+=this.currentEntries) {
            this.allPages +=1
        }
        this.loading = false
      })
    },
    paginateEntries () {
      if(this.isSearch) {
        this.search(this.openPage, this.searchInput)
      } else {
        this.getNotify()
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
    },
    getCurrentEntries () {
      return (this.searchEntries.length <= 0) ? this.entries : this.searchEntries
    },
    async search (page, value) {
      await axios({
        method: 'GET',
        url: (`https://asprof-test.azurewebsites.net/uk/api/users/?page=${page}&last_name=${value}`),
        headers: {
          'Authorization': 'Bearer ' + this.$store.getters.getToken
        }
      })
        .then(respons => {
          this.$store.dispatch('setMessage', respons.data.results)
          this.countEvent = respons.data.count
        })
        .catch(error => {
        })
        .finally(() => {
          this.entries = this.$store.getters.getMessage
          this.entries.forEach(elem => elem.start_norm_date = new Date(elem.start_date).toLocaleDateString())
          this.filteredEntries = $array.paginate(this.entries, this.currentPage, this.currentEntries)
          this.allPages = 0
          for(let i = 0; i < this.countEvent; i+=this.currentEntries) {
              this.allPages +=1
          }
        })
    },
    sortByColumn (column) {
      if(this.sort == column)
        this.sort = '-' + this.sort
      else
        this.sort = column
      this.getNotify()
    },
    nextPage() {
      if(this.openPage < this.allPages) {
        this.openPage+=1
        if(this.isSearch) {
          this.search(this.openPage, this.searchInput)
        } else {
          this.getNotify()
        }
        
      }
     
    },
    prevPage() {
      if(this.openPage > 1) {
        this.openPage-=1
        if(this.isSearch) {
          this.search(this.openPage, this.searchInput)
        } else {
          this.getNotify()
        }
      }
      
    }    
  },
  watch: {
    // whenever question changes, this function will run
    // whenever question changes, this function will run
    searchInput(newSearch, oldSearch) {
      if (newSearch.length > 0 ) {
        this.isSearch = true
        this.search(1, newSearch)
      } else {
        this.isSearch = false
        this.getNotify()
      }
    }
  }
}
</script>
<style scoped src="@/assets/lc/css/table.css">
</style>

<style>
.import-excel {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 20px
}

.import_btn {
  background-color: #1faeea;
  padding: 8px 22px;
  font-size: .9375rem;
  border-radius: 4px;
  color: #fff;
  letter-spacing: .02857em;
  line-height: 1.75;
  text-decoration: none;
  transition: all 0.3s ease;
}

.import_btn:hover {
  background-color: #303f9f
}

.table_static_wrapper {
  margin-bottom: 170px
}

.desc_course {
  height: 113px
}

.form-bottom {
  margin-top: 60px
}

.profile-bottom_title {
  font-size: 24px;
  font-weight: 700
}

</style>
