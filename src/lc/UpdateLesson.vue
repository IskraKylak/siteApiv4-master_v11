<template>
  <div class="wrap_preloader lc" v-if="loading">
    <preloader :width="90" :height="90"></preloader>
  </div>
  <div class="container" v-if="myAcc.role === 'admin' && !loading">
<!--    {{ singleEvent }}-->
    <div class="profile_success">
      <router-link :to="`/lc-updatecourse/${singleEvent.course}`" class="back_btn">Назад</router-link>
    </div>
    <h1 class="title_event">Редагування курсу</h1>
    <form @submit.prevent="onSubmit">
      <fieldset>
        <legend>Назва уроку <span title="обов'язкове">*</span></legend>
        <input type="text" class="profile_input" v-model="singleEvent.name">
      </fieldset>

      <legend class="dropzone_title">Текст уроку <span title="обов'язкове">*</span></legend>
          <editor
            api-key="iu3f89j47o5ydom6c8ci9rih8nrow5z0hkbbzcblkmjz7li8"
            :init="{
              height: 500,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              paste_data_images: true,
            }"
            v-model="singleEvent.text"
          />


      <fieldset>
        <legend>Порядковий номер урока</legend>
        <input type="text" v-model="singleEvent.order_number" class="profile_input">
      </fieldset>



      <div class="draft">
        <input type="checkbox" class="checkbox" id="checkbox" v-model="singleEvent.has_test"/>
        <label for="checkbox">Додати тест</label>
      </div>
      <div class="profile_success success_file">
        <button class="profile_btn" type="submit">Зберегти</button>
      </div>
    </form>
    <div class="update_block">
      <button @click.prevent="goToTest(singleEvent.id)" class="back_btn">Редагування тесту до уроку</button>
      <!-- <button class="back_btn">Редагувати опитування</button> -->
    </div>
    <modalValidate class="update_partner" v-if="modalValidate" :isPartner="isPartner" :idItem="idItem" :idEvent="idEvent" @close="closeModal()"/>
  </div>
</template>
<style scoped src="@/assets/lc/css/style.css">
</style>
<script>

import Editor from '@tinymce/tinymce-vue'
import axios from 'axios'
import modalValidate from '@/components/ModalValidate.vue'
import preloader from '@/components/UI/Preloader.vue'
const config = {
  height: 500,
  inline: false,
  theme: 'modern',
  fontsize_formats: '8px 10px 12px 14px 16px 18px 20px 22px 24px 26px 28px 30px 34px 38px 42px 48px 54px 60px',
  plugins: 'textcolor print preview fullpage powerpaste searchreplace autolink directionality advcode visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount tinymcespellchecker a11ychecker imagetools mediaembed  linkchecker contextmenu colorpicker textpattern help',
  toolbar1: 'forecolor backcolor formatselect fontsizeselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
  image_advtab: true,
  templates: [
    {
      title: 'Test template 1',
      content: 'Test 1'
    },
    {
      title: 'Test template 2',
      content: 'Test 2'
    }
  ],
  content_css: [
    '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
    '//www.tinymce.com/css/codepen.min.css'
  ]
}

export default {
  data () {
    return {
      loading: false,
      idEvent: null,
      myAcc: '',
      specializationList: [],
      singleEvent: {
        id: '',
        name: '',
        text: '',
        order_number: ''
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
      proId1: this.$route.params.Pid2,
      proId2: this.$route.params.Pid3,
    }
  },
  components: {
    editor: Editor,
    modalValidate,
    preloader
  },
  created () {
    this.getNotify()
  },
  methods: {
    async goToTest (prodId) {
      if (this.singleEvent.lesson_test === null) {
        await axios({
          url: `https://asprof-test.azurewebsites.net/uk/api/courses/${this.singleEvent.course}/lessons/${this.singleEvent.id}/test`,
          method: 'get',
          headers: {
            Authorization: 'Bearer ' + this.$store.getters.getToken
          }
        }).then(respons => {
          this.$message('Тест створено')
          // this.messages = res;
        })
          .catch(error => {
            this.$message('Помилка створення тесту')
          })
          .finally(() => (this.loading = false))
      }
      this.$router.push({
        name: 'lc-testLesson',
      })
    },
    async onSubmit () {
      this.loading = true
      var tmp = {
        // id: this.singleEvent.id,
        author: null,
        name: this.singleEvent.name,
        text: this.singleEvent.text,
        order_number: this.singleEvent.order_number,
        has_test: this.singleEvent.has_test,
        test_time: 0,
        lesson_test: null

      }
      await axios({
        url: `https://asprof-test.azurewebsites.net/uk/api/courses/${this.singleEvent.course}/lessons/${this.proId2}/`,
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

    },
    async getNotify () {
      await axios({
        method: 'GET',
        url: ('https://asprof-test.azurewebsites.net/uk/api/me/'),
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
        url: (`https://asprof-test.azurewebsites.net/uk/api/courses/${this.proId1}/lessons/${this.proId2}`),
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
    }
  }
}

</script>

<style scoped>

legend span {
  color: red;
  font-size: 15px;
}

.back_btn.t {
  width: max-content;
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
