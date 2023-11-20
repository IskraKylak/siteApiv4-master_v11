<template>
  <div class="wrap_preloader lc" v-if="loading">
    <preloader :width="90" :height="90"></preloader>
  </div>
  <div v-if="!loading" class="wrap_table_component">
    <!-- <div class="import-excel">
      <div @click="downloadAllEcel()" class="import_btn">ЕКСПОРТ В EXCEL</div>
    </div> -->
    <!-- <div class="wrap_search">
      <input type="search" class="input px:width-25" placeholder="Пошук" v-model="searchInput">
    </div> -->

    <div class="wrap_table">
      <div class="wrap_my_table">
        <table class="table table_event">
          <thead class="thead">
            <tr class="tr">
              <th class="th" v-for="th in columns" :key="th">
                <div>
                  <span>{{ th.text }}</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody class="tbody">
            <tr class="tr" v-for="td in entries" :key="td">
              <td class="td">{{ td.id }}</td>
              <td class="td">{{ td.name }}</td>
              <td class="td">
                <div class="wrap_td_icons">
                  <div @click="goToEvent(td.id)" class="icon_svg_table icon_svg_table_edit" title="Редагувати">
                    <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
                    </svg>
                  </div>
                  <span @click="removeEvent(td.id)" class="icon_svg_table icon_svg_table_remove" title="Видалити">
                    <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path
                      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                  </span>
                  <!-- <div @click="downloadEcel(td)" class="icon_svg_table icon_svg_table_remove" title="Експорт в Excel">
                    <div class="svg_import MuiSvgIcon-root"></div>
                  </div> -->
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table_foot">
        <!-- <div class="table_length">
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
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
// import { $array } from 'alga-js'
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
      sort: '-start_date',
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
      isSearch: false,
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
    // info () {
    //   return this.$store.getters.getEventsApi
    // },
    // showInfo () {
    //   const getCurrentEntries = (this.searchEntries.length <= 0) ? this.entries : this.searchEntries
    //   // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    //   // this.allPages = $array.pages(this.entries, this.currentEntries)
    //   return $array.show(getCurrentEntries, this.currentPage, this.currentEntries)
    // },
    // showPagination () {
    //   return $array.pagination(this.allPages, this.currentPage, 3)
    // }
  },
  created () {
    this.getNotify()
  },
  methods: {
    // downloadAllEcel() {
    //   axios({
    //     url: `https://asprof-test.azurewebsites.net/api/statistics/courses/summary/excel/`,
    //     method: 'get',
    //     responseType : 'blob',
    //     headers: {
    //       Authorization: 'Bearer ' + this.$store.getters.getToken
    //     }
    //   }).then(res => {
    //       const url = window.URL.createObjectURL(new Blob([res.data]));
    //       const a = document.createElement("a");
    //       a.href = url;
    //       const filename = `file.xlsx`;
    //       a.setAttribute('download', filename);
    //       // document.body.appendChild(link);
    //       a.click();
    //       a.remove();
    //   }).catch(error => {
    //     this.$message('Помилка')
    //     console.log(error)
    //   })
    // },
    // downloadEcel(item) {
    //   axios({
    //     url: `https://asprof-test.azurewebsites.net/api/statistics/courses/summary/${item.id}/excel/`,
    //     method: 'get',
    //     responseType : 'blob',
    //     headers: {
    //       Authorization: 'Bearer ' + this.$store.getters.getToken
    //     }
    //   }).then(res => {
    //       const url = window.URL.createObjectURL(new Blob([res.data]));
    //       const a = document.createElement("a");
    //       a.href = url;
    //       const filename = `file.xlsx`;
    //       a.setAttribute('download', filename);
    //       // document.body.appendChild(link);
    //       a.click();
    //       a.remove();
    //   }).catch(error => {
    //     this.$message('Помилка')
    //     console.log(error)
    //   })
    // },
    goToEvent (prodId) {
      this.$router.push({
        name: 'lc-updatespecializations',
        params: { Pid2: prodId }
      })
    },
    async removeEvent (prodId) {
      await axios({
        url: `https://asprof-test.azurewebsites.net/api/specializations/${prodId}/`,
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
      this.isSearch = false
      // if (this.entries.length === 0) {
      await axios
        .get(`https://asprof-test.azurewebsites.net/api/specializations/`)
        .then(respons => {
          this.$store.dispatch('setMessage', respons.data)
          // this.countEvent = respons.data.count
          // this.messages = res;
          // console.log("res event " + res)
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          this.loading = false
          this.entries = this.$store.getters.getMessage
        })
      // }
      
      // this.entries.forEach(elem => elem.start_norm_date = new Date(elem.start_date).toLocaleDateString())
      // this.paginateData(this.entries)
      // this.filteredEntries = $array.paginate(this.entries, this.currentPage, this.currentEntries)
      // this.allPages = 0
      // for(let i = 0; i < this.countEvent; i+=this.currentEntries) {
      //     this.allPages +=1
      // }
    },
    // searchEvent () {
    // },
    // getCurrentEntries () {
    //   return (this.searchEntries.length <= 0) ? this.entries : this.searchEntries
    // },
    // sortByColumn (column) {
    //   if(this.sort == column)
    //     this.sort = '-' + this.sort
    //   else
    //     this.sort = column
    //   this.getNotify()
    // },
    // async search (page, value) {
    //   axios
    //     .get(`https://asprof-test.azurewebsites.net/api/courses/?page=${page}&page_size=${this.currentEntries}&name__icontains=${value}`)
    //     .then(respons => {
    //       this.$store.dispatch('setMessage', respons.data.results)
    //       this.countEvent = respons.data.count
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    //     .finally(() => {
    //       this.entries = this.$store.getters.getMessage
    //       this.entries.forEach(elem => elem.start_norm_date = new Date(elem.start_date).toLocaleDateString())
    //       this.filteredEntries = $array.paginate(this.entries, this.currentPage, this.currentEntries)
    //       this.allPages = 0
    //       for(let i = 0; i < this.countEvent; i+=this.currentEntries) {
    //           this.allPages +=1
    //       }
    //     })
    // },
    // nextPage() {
    //   if(this.openPage < this.allPages) {
    //     this.openPage+=1
    //     if(this.isSearch) {
    //       this.search(this.openPage, this.searchInput)
    //     } else {
    //       this.getNotify()
    //     }
        
    //   }
     
    // },
    // prevPage() {
    //   if(this.openPage > 1) {
    //     this.openPage-=1
    //     if(this.isSearch) {
    //       this.search(this.openPage, this.searchInput)
    //     } else {
    //       this.getNotify()
    //     }
    //   }
      
    // },
    // paginateEntries () {
    //     if(this.isSearch) {
    //       this.search(this.openPage, this.searchInput)
    //     } else {
    //       this.getNotify()
    //     }
    // }
  },
  // watch: {
  //   searchInput(newSearch, oldSearch) {
  //     if (newSearch.length > 0 ) {
  //       this.isSearch = true
  //       this.search(1, newSearch)
  //     } else {
  //       this.isSearch = false
  //       this.getNotify()
  //     }
      
  //     // console.log(this.filteredEntries)
  //   }
  // }
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
  cursor: pointer;
}

.import_btn:hover {
  background-color: #303f9f
}

.icon_svg_table_remove,
.icon_svg_table_edit {
  cursor: pointer;
}
</style>
