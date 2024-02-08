<template>
  <div class="wrap_preloader lc" v-if="loading">
    <preloader :width="90" :height="90"></preloader>
  </div>
  <div class="container">
<!--    {{ singleEvent }}-->
    <div class="profile_success">
      <router-link to="/lc-specializations" class="back_btn">Назад</router-link>
    </div>
    <div class="wrap_title">
      <h1 class="title_event">Редагування спеціализації</h1>
      <swicherLang @changeLang="changeLang" />
    </div>
    <form @submit.prevent="onSubmit" v-if="myAcc.role === 'admin' && !loading">
      <fieldset>
        <legend>Назва спеціаліста <span title="обов'язкове">*</span></legend>
        <input type="text" class="profile_input" v-model="singleEvent.name">
      </fieldset>
      <fieldset>
        <legend>Назва спеціализації <span title="обов'язкове">*</span></legend>
        <input type="text" class="profile_input" v-model="singleEvent.second_name">
      </fieldset>

      <p class="dropzone_title">Зображення для сторінки спеціализації</p>
      <div class="d-none">
        <input class="form-control" ref="fileInput2" type="file" @input="pickFile2">
      </div>
      <div class="wrap_inp_fiel">
        <div class="imagePreviewWrapper"
             :style="previewFile.val != null ? { 'background-image': `url(${previewFile.val})`, 'background-color': `#fff` } : ''"
             @click="selectFile">
        </div>
        <span>
        Натисніть сюди для завантаження файлу
        <svg class="MuiSvgIcon-root MuiDropzoneArea-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path
          d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path></svg>
        </span>
      </div>

      <div class="draft">
        <input type="checkbox" class="checkbox" id="checkbox" v-model="singleEvent.main"/>
        <label for="checkbox">Main</label>
      </div>
      <div class="draft">
        <input type="checkbox" class="checkbox" id="checkbox2" v-model="singleEvent.main_on_categories_page"/>
        <label for="checkbox2">Main on categories page</label>
      </div>

      <fieldset>
        <legend>Sort id <span title="обов'язкове">*</span></legend>
        <input type="text" class="profile_input" v-model="singleEvent.sort_id">
      </fieldset>
      <div class="profile_success success_file">
        <button class="profile_btn" type="submit">Зберегти</button>
      </div>
    </form>  
  </div>
</template>
<style scoped src="@/assets/lc/css/style.css">
</style>
<script>

import Editor from '@tinymce/tinymce-vue'
import axios from 'axios'
import ModalAddLesson from '@/components/ModalAddLesson.vue'
import preloader from '@/components/UI/Preloader.vue'
import swicherLang from '@/components/swicherLang'

export default {
  data () {
    return {
      activeLang: "uk",
      loading: false,
      idEvent: null,
      myAcc: '',
      specializationList: [],
      singleEvent: {
        id: '',
        name: '',
        second_name: '',
        main: '',
        main_on_categories_page: '',
        sort_id: '',
        photo: ''
      },
      previewImage: {
        val: null,
        click: false
      },
      previewFile: {
        val: null,
        click: false
      },
      previewIneractive: {
        val: null,
        click: false
      },
      photo: '',
      proId: this.$route.params.Pid2,
      modalValidate: false,
      isPartner: '',
      idItem: null
    }
  },
  components: {
    editor: Editor,
    ModalAddLesson,
    preloader,
    swicherLang
  },
  created () {
    this.getNotify()
  },
  methods: {
    changeLang(data) {
      this.activeLang = data
      this.getNotify()
    },
    async onSubmit () {
      this.loading = true
      var tmp = {
        // id: this.singleEvent.id,
        name: this.singleEvent.name,
        second_name: this.singleEvent.second_name,
        main: this.singleEvent.main,
        main_on_categories_page: this.singleEvent.main_on_categories_page,
        sort_id: this.singleEvent.sort_id,
      }
      await axios({
        url: `https://asprof-test.azurewebsites.net/${this.activeLang}/api/specializations/${this.proId}/`,
        data: tmp,
        method: 'PATCH',
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getToken
        }
      }).then(respons => {
        const res = respons.data
        this.$store.dispatch('setSingleEvent', res)
        this.$message('Дані успішно змінені')
        // this.messages = res;
      })
        .catch(error => {
          this.$message('Помилка')
        })
        .finally(() => (this.loading = false))
      if (this.previewFile.click) {
        await axios({
          url: `https://asprof-test.azurewebsites.net/${this.activeLang}/api/specializations/${this.proId}/`,
          data: this.singleEvent.photo,
          method: 'PATCH',
          headers: {
            Authorization: 'Bearer ' + this.$store.getters.getToken
          }
        }).then(respons => {
          const res = respons.data
          this.$store.dispatch('setSingleEvent', res)
          this.$message('Картинка змінена!')
          // this.messages = res;
        })
          .catch(error => {
            this.$message('Помилка')
          })
          .finally(() => (this.loading = false))
      }
    },
    async getNotify () {
      await axios({
        method: 'GET',
        url: (`https://asprof-test.azurewebsites.net/${this.activeLang}/api/me/`),
        headers: {
          'Authorization': 'Bearer ' + this.$store.getters.getToken
        }
      }).then(respons => {
        let res = respons.data
        this.$store.dispatch('setMyAcc', res)
        this.myAcc = this.$store.getters.getMyAcc
        // this.messages = res;
      })
        .catch(error => {
        })
        .finally(() => (this.loading = false))

      this.loading = true
      await axios({
        method: 'GET',
        url: (`https://asprof-test.azurewebsites.net/${this.activeLang}/api/specializations/${this.proId}`),
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getToken
        }
      })
        .then(respons => {
          this.$store.dispatch('setSingleEvent', respons.data)
        })
        .catch(error => {
        })
        .finally(() => (this.loading = false))
      this.singleEvent = this.$store.getters.getSingleEvent
      this.previewFile.val = this.singleEvent.photo
    },
    // image upload and preview methods
    selectImage () {
      this.$refs.fileInput.click()
    },
    selectFile () {
      this.$refs.fileInput2.click()
    },
    selectInteractive () {
      this.$refs.fileInput3.click()
    },
    pickFile () {
      const input = this.$refs.fileInput
      const file = input.files
      if (file && file[0]) {
        const reader = new FileReader()
        reader.onload = e => {
          this.singleEvent.event_documents = new FormData() // creates a new FormData object
          this.singleEvent.event_documents.append('event_documents', this.$refs.fileInput.files[0])
          this.previewImage.click = true
          this.previewImage.val = e.target.result
        }
        reader.readAsDataURL(file[0])
        this.$emit('input', file[0])
      }
    },
    pickFile2 () {
      const input = this.$refs.fileInput2
      const file = input.files
      if (file && file[0]) {
        const reader = new FileReader()
        reader.onload = e => {
          this.singleEvent.photo = new FormData() // creates a new FormData object
          this.singleEvent.photo.append('photo', this.$refs.fileInput2.files[0])
          this.previewFile.click = true
          this.previewFile.val = e.target.result
        }
        reader.readAsDataURL(file[0])
        this.$emit('input', file[0])
      }
    },
    pickFile3 () {
      const input = this.$refs.fileInput3
      const file = input.files
      if (file && file[0]) {
        const reader = new FileReader()
        reader.onload = e => {
          this.singleEvent.partners_banner = new FormData() // creates a new FormData object
          this.singleEvent.partners_banner.append('partners_banner', this.$refs.fileInput3.files[0])
          this.previewIneractive.click = true
          this.previewIneractive.val = e.target.result
        }
        reader.readAsDataURL(file[0])
        this.$emit('input', file[0])
      }
    },
  }
}

</script>

<style scoped>

.wrap_title {
  display: flex;
  align-items: center;
  grid-gap: 20px;
  margin-bottom: 20px;
}

legend span {
  color: red;
  font-size: 15px;
}

.back_btn {
  width: max-content;
  cursor: pointer;
}

fieldset {
  min-height: 59px;
  height: auto;
  padding: 10px;
}

.wrap_inp select {
  width: 100%;
  background: #fafafa;
  padding: 0 13px;
  font-size: 16px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.wrap_inp_fiel {
  width: 250px;
  height: 250px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  box-sizing: border-box;
  min-height: 250px;
  border: 2px dashed #7c7d84;
  overflow: hidden;
  margin-bottom: 20px;
}

.imagePreviewWrapper {
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  cursor: pointer;
  margin: 0 auto 30px;
  background-size: cover;
  background-position: top center;
  z-index: 2;
}

.wrap_inp_fiel span {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100%;
  color: #7c7d84;
  background: #fff;
  z-index: 1;
  padding: 20px;
}

.wrap_inp_fiel span svg {
  width: 51px;
  height: 51px;
  fill: #7c7d84;
}

.tab {
  display: none;
}

.tab:checked ~ .regulations-content {
  display: block;
}

.tab:not(no-checked) ~ .regulations-content {
  display: none;
}

.regulations-content .table {
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #dddddd;
  border-collapse: collapse;
}

.regulations-content .table th {
  font-weight: bold;
  padding: 5px;
  background: #efefef;
  border: 1px solid #dddddd;
}

.regulations-content .table td {
  border: 1px solid #dddddd;
  padding: 5px;
}

.events_item-block {
  display: flex;
  width: 100%;
  justify-content: center;
  cursor: pointer;
}

.tabs {
  display: flex;
  margin-bottom: -1px;
  position: relative;
  z-index: 2;
}

.tab-title {
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 22px;
  background-color: #e0e0e0;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  margin-right: 3px;
  box-sizing: border-box;
  border-left: 1px solid #e0e0e0;
  border-top: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  cursor: pointer;
}

.tab-title.open {
  background-color: #fafafa;
}

.tabs-content {
  padding: 20px;
  border: 1px solid #e0e0e0;
  position: relative;
  z-index: 1;
}

fieldset {

}

fieldset select {
  width: 100%;
}

</style>
