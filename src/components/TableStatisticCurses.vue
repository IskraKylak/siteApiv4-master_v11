<template>
  <div class="wrap_table_component">
    <div class="wrap_search">
      <input type="search" class="input px:width-25" placeholder="Пошук" v-model="searchInput"
             @keyup="searchEvent">
    </div>

    <div class="wrap_table">
      <div class="wrap_my_table">
        <table class="my_table">
          <thead class="thead">
          <tr class="tr">
            <th class="th" v-for="th in columns" :key="th">
              <div>
                <span @click.prevent="sortByColumn(th.name)">{{ th.text }}</span>
              </div>
            </th>
            <th></th>
          </tr>
          </thead>
          <tbody class="tbody">
          <tr class="tr" v-for="td in filteredEntries" :key="td">
            <td class="td">{{ td.id }}</td>
            <td class="td">{{ td.name }}</td>
            <td class="td">{{ td.tests_count }}</td>
            <td class="td">{{ td.certificates_count }}</td>
            <td class="td">{{ td.users_registered }}</td>
            <td class="td">{{ td.users_online }}</td>
            <td class="td">{{ td.anonymous_users_online }}</td>
            <td class="td">{{ td.authorized_users_online }}</td>
            <td class="td">
              <div @click="goToCourses('lc-courses', td.id )">
              <span class="icon_svg_table icon_svg_table_edit">
                <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path
                  d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></svg>
              </span>
              </div>
            </td>
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
  </div>
</template>
<script>
import { $array } from 'alga-js'
import axios from 'axios'

export default {
  name: 'DataTableStatisticCurses',
  data () {
    return {
      columns: [
        {
          name: 'id',
          text: 'ID'
        },
        {
          name: 'name',
          text: 'Назва курсу'
        },
        {
          name: 'tests_count',
          text: 'Проходжень'
        },
        {
          name: 'certificates_count',
          text: 'Отримано сертифікатів'
        },
        {
          name: 'users_registered',
          text: 'Зареєстровані користувачі'
        },
        {
          name: 'users_online',
          text: 'Користувачів онлайн'
        },
        {
          name: 'anonymous_users_online',
          text: 'Анонімні користувачі онлайн'
        },
        {
          name: 'authorized_users_online',
          text: 'Авторизованих користувачів онлайн'
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
        name: '',
        tests_count: '',
        certificates_count: '',
        users_registered: '',
        users_online: '',
        anonymous_users_online: '',
        authorized_users_online: ''
      },
      sortcol: {
        id: '',
        name: '',
        tests_count: '',
        certificates_count: '',
        users_registered: '',
        users_online: '',
        anonymous_users_online: '',
        authorized_users_online: ''
      }
    }
  },
  computed: {
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
    goToCourses (name, id) {
      this.$router.push({
        name: name,
        params: { Pid: id }
      })
    },
    async getNotify () {
      this.loading = true
      await axios({
        method: 'GET',
        url: ('https://asprof-test.azurewebsites.net/uk/api/statistics/events/summary/'),
        headers: {
          'Authorization': 'Bearer ' + this.$store.getters.getToken
        }
      }).then(respons => {
        let res = respons.data
        this.$store.dispatch('setStatCurs', res)
        // this.messages = res;
      })
        .catch(error => {
        })
        .finally(() => (this.loading = false))
      this.entries = this.$store.getters.getStatCurs
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
          name: '',
          tests_count: '',
          certificates_count: '',
          users_registered: '',
          users_online: '',
          anonymous_users_online: '',
          authorized_users_online: ''
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
        name: '',
        tests_count: '',
        certificates_count: '',
        users_registered: '',
        users_online: '',
        anonymous_users_online: '',
        authorized_users_online: ''
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

<style lang="scss">

.my_table {
  min-width: 1600px;

  thead, tbody {
    tr {
      th, td {
        padding: 0 10px;
        text-align: left;
        font-weight: normal;
        border-bottom: 1px solid rgba(224, 224, 224, 1);
      }
    }
  }
}


.table_foot {
  border-top: 1px solid rgba(224, 224, 224, 1);
}

.my_table .icon_svg_table svg {
  width: 24px;
  max-height: 24px;
}
</style>
