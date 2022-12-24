<template>
  <div class="wrap_preloader lc" v-if="loading">
    <preloader :width="90" :height="90"></preloader>
  </div>
  <div v-if="!loading" class="wrap_table_component">

    <div class="wrap_search">
      <input type="search" class="input px:width-25" placeholder="Пошук" v-model="searchInput">
    </div>

    <div class="wrap_table">
      <div class="table table_event">
        <div class="thead">
          <div class="tr">
            <div class="th" v-for="th in columns" :key="th">
              <div>
                <span @click.prevent="sortByColumn(th.name)">{{ th.text }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="tbody">
          <div class="tr" v-for="td in filteredEntries" :key="td">
            <div class="td">{{ td.id }}</div>
            <div class="td">{{ td.name }}</div>
            <div class="td">{{ td.start_norm_date }}</div>
            <div class="td">{{ td.place }}</div>
            <div class="td">
              <div @click="goToEvent(td.id)" class="icon_svg_table icon_svg_table_edit">
                <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
                </svg>
              </div>
              <span @click="removeEvent(td.id)" class="icon_svg_table icon_svg_table_remove">
                <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path
                  d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="table_foot">
        <div class="table_length">
          Total Rows: {{ countEvent }}
        </div>
        <div class="table_visible_page">
          <div>
            <span>Rows per page:</span>
            <select v-model="currentEntries" class="select" @change="paginateEntries">
              <option v-for="se in showEntries" :key="se" :value="se">{{ se }}</option>
            </select>
          </div>
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
import preloader from '@/components/UI/Preloader.vue'
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  name: 'DataTable',
  components: {
    preloader
  },
  data () {
    return {
      loading: false,
      columns: [
        {
          name: 'id',
          text: 'ID'
        },
        {
          name: 'name',
          text: 'Назва'
        },
        {
          name: 'date',
          text: 'Дата'
        },
        {
          name: 'office',
          text: 'Місце'
        },
        {
          name: 'action',
          text: 'Дії'
        }
      ],
      entries: [],
      showEntries: [5, 10, 25, 50, 100],
      currentEntries: 10,
      filteredEntries: [],
      currentPage: 1,
      allPages: 0,
      searchInput: '',
      countEvent: 0,
      openPage: 1,
      searchEntries: [],
      col: {
        id: '',
        name: '',
        date: '',
        office: '',
        action: '',
      },
      sortcol: {
        id: '',
        name: '',
        date: '',
        office: '',
        action: '',
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
        name: 'lc-updatevebinar',
        params: { Pid: prodId }
      })
    },
    async removeEvent (prodId) {
      await axios({
        url: `https://asprof-test.azurewebsites.net/api/webinars/${prodId}/`,
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getToken
        }
      }).then(respons => {
        this.$message('Дані видалено!')
        this.getNotify()
        // this.messages = res;
      })
        .catch(error => {
          console.log(error)
          this.$message('Помилка')
        })
    },
    async getNotify () {
      this.loading = true
      // if (this.entries.length === 0) {
      await axios
        .get(`https://asprof-test.azurewebsites.net/api/webinars/?ordering=-start_date&page_size=${this.currentEntries}&page=${this.openPage}`)
        .then(respons => {
          this.$store.dispatch('setMessage', respons.data.results)
          this.countEvent = respons.data.count
          // this.messages = res;
          // console.log("res event " + res)
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => (this.loading = false))
      // }
      this.entries = this.$store.getters.getMessage
      this.entries.forEach(elem => elem.start_norm_date = new Date(elem.start_date).toLocaleDateString())
      // this.paginateData(this.entries)
      this.filteredEntries = $array.paginate(this.entries, this.currentPage, this.currentEntries)
      this.allPages = 0
      for(let i = 0; i < this.countEvent; i+=this.currentEntries) {
          this.allPages +=1
      }
    },
    nextPage() {
      if(this.openPage < this.allPages) {
        this.openPage+=1
        this.getNotify()
      }
     
    },
    prevPage() {
      if(this.openPage > 1) {
        this.openPage-=1
        this.getNotify()
      }
      
    },
    paginateEntries () {
      this.getNotify()
    },
    // paginateData (data) {
    //   this.filteredEntries = $array.paginate(data, this.currentPage, this.currentEntries)
    //   this.allPages = $array.pages(data, this.currentEntries)
    // },
    // paginateEvent (page) {
    //   this.currentPage = page
    //   this.paginateEntries()
    // },
    searchEvent () {
      
    },
    getCurrentEntries () {
      return (this.searchEntries.length <= 0) ? this.entries : this.searchEntries
    },
    sortByColumn (column) {
      this.col = {
        name: '',
        position: '',
        office: '',
        extension: '',
        startdate: '',
        salary: ''
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
  },
  watch: {
    // whenever question changes, this function will run
    searchInput(newSearch, oldSearch) {
      if (newSearch.length > 0 ) {
        axios
          .get(`https://asprof-test.azurewebsites.net/api/events/?name__contains=${newSearch}`)
          .then(respons => {
            this.$store.dispatch('setMessage', respons.data.results)
            this.countEvent = respons.data.count
            // this.messages = res;
            // console.log("res event " + res)
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => (this.loading = false))
        // }
        this.entries = this.$store.getters.getMessage
        this.entries.forEach(elem => elem.start_norm_date = new Date(elem.start_date).toLocaleDateString())
        // this.paginateData(this.entries)
        this.filteredEntries = $array.paginate(this.entries, this.currentPage, this.currentEntries)
      } else {
        this.getNotify()
      }
    }
  }
}
</script>
<style scoped src="@/assets/lc/css/table.css">
</style>

<style>
.icon_svg_table_remove,
.icon_svg_table_edit {
  cursor: pointer;
}
</style>
