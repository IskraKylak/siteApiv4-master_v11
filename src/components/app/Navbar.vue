<template>
  <header class="header" :class="{ open: isOpen }">
    <div class="top-menu">
      <div class="top-menu_left">
        <div class="burger" @click.prevent="$emit('click-my')">
          <span></span>
        </div>
        <h1 class="top-menu_name">{{ title_nav }}</h1>
      </div>
      <div class="top-menu_right">
        <router-link to="/" class="top-menu_home">
          <i class="fas fa-home"></i>
        </router-link>
        <div class="top-menu_right_name_item" >
          <div class="modal_menu_acc" data-target="dropdown"
               ref="dropdown"></div>
          <p class="top-menu_right_name" >{{ myAcc.email }}</p>
          <i class="fas fa-chevron-down">
          </i>
          <div id="dropdown" class="dropdown-content dropdown-menu">
            <router-link to="/lc-profile" class="black-text p_header">
              <p>Мій профіль</p>
            </router-link>
            <div class="p_header" @click.prevent="logout">
              <p>Вихід</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import axios from "axios";

export default {
  data () {
    return {
      myAcc: []
    }
  },
  props: {
    isOpen: {
      type: Boolean
    },
    title_nav: {
      type: String
    }
  },
  created () {
    this.getNotify()
  },
  methods: {
    async getNotify() {
      await axios({
        method: 'GET',
        url: ('https://asprof-test.azurewebsites.net/api/me/'),
        headers: {
          'Authorization': 'Bearer ' + this.$store.getters.getToken
        }
      }).then(respons => {
        let res = respons.data
        this.$store.dispatch('setMyAcc', res)
        // this.messages = res;
      })
        .catch(error => {
          console.log(error)
        })
        .finally(() => (this.loading = false))
      this.myAcc = this.$store.getters.getMyAcc
    },
    async logout () {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/in-login?message=logout')
        })
      // await this.$store.dispatch('logout')
      // this.$router.push('/in-login?message=logout')
    },
  },
  mounted () {
    M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: true,
    })
  }
}
</script>
<style scoped src="@/assets/lc/css/style.min.css">
</style>
<style>
p.top-menu_right_name {
  min-width: 10px;
  height: 10px;
  position: relative;
  z-index: 1;
}

.fa-chevron-down {
  position: relative;
  z-index: 1;
}

.main-lc header.header.open {
  width: calc(100% - 239px);
  margin-left: 239px;
}

.main-lc header.header {
  max-width: 100%;
  width: 100%;
  margin-left: 0;
  transition: all 0.3s ease;
}

.main-lc header.header.open .burger {
  display: none;
}

.main-lc header.header .burger {
  display: block;
}

.top-menu_right_name_item {
  position: relative;
}

.modal_menu_acc {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

</style>
