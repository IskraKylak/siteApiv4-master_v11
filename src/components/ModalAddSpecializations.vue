<template>
  <modal class="modal_add_event" title="Modal with form + validate" @close="$emit('close')">
    <template v-slot:body>

      <div class="popUp">
        <form @submit.prevent="onSubmit">
          <div class="wrap_inputs">
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
          </div>

          <div class="profile_success success_file">
            <button class="profile_btn" type="submit">Зберегти</button>
          </div>
        </form>
      </div>
    </template>
  </modal>
</template>

<script>
import modal from './UI/Modal.vue'
import { useVuelidate } from '@vuelidate/core'
import { required, numeric } from '@vuelidate/validators'
import axios from 'axios'
import Editor from '@tinymce/tinymce-vue'
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
  components: { modal, editor: Editor },
  props: {
  },
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
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
      myAcc: []
    }
  },
  created () {
    this.startModal()
  },
  methods: {
    async onSubmit () {
      this.loading = true
      var tmp = {}

      if (this.singleEvent.name !== '') {
        tmp.name = this.singleEvent.name
      }
      if (this.singleEvent.second_name !== '') {
        tmp.second_name = this.singleEvent.second_name
      }
      if (this.singleEvent.main !== null) {
        tmp.main = this.singleEvent.main
      }
      if (this.singleEvent.main_on_categories_page !== null) {
        tmp.main_on_categories_page = this.singleEvent.main_on_categories_page
      }
      if (this.singleEvent.sort_id !== '') {
        tmp.sort_id = this.singleEvent.sort_id
      }
      await axios({
        url: 'https://asprof-test.azurewebsites.net/uk/api/specializations/',
        data: tmp,
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getToken
        }
      }).then(respons => {
        const res = respons.data
        this.$store.dispatch('setSingleEvent', res)
        this.$message('Дані успішно додані')
        tmp.id = respons.data.id
        if (this.previewFile.click) {
          axios({
            url: `https://asprof-test.azurewebsites.net/uk/api/specializations/${tmp.id}/`,
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
        this.$emit('close')
      })
        .catch(error => {
          this.$message('Помилка')
        })
        .finally(() => (this.loading = false))
    },
    startModal () {
      this.specializationList = this.$store.getters.getSpecialization
    },
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

<style scoped src="@/assets/lc/css/style.min.css">
</style>
<style lang="scss">



.popUp .profile_btn {
  margin-top: 0;
}

.main .wrap_inp_fiel {
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
}

.wrap_inp {
  margin-bottom: 20px;
}

.wrap_inp .errorText {
  display: none;
  margin-top: 5px;
  font-size: 13px;
  color: rgb(207, 86, 86);
}

.wrap_inp fieldset {
  margin-bottom: 0;
}

fieldset.errorInput {
  border: 1px solid rgb(207, 86, 86);
}

.wrap_inp select {
  width: 100%;
  background: #fafafa;
  padding: 0 13px;
  font-size: 16px;
}

.wrap_inp.errorInput .errorText {
  display: block;
}

.modal__wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
}

.modal__wrapper.modal_add_event .modal-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}

.modal__wrapper.modal_add_event .modal-header .button-close{
    font-size: 0;
    display: block;
    top: 20px;
    right: 20px;
    height: 24px;
    width: 24px;

   &::before {
      content: ""; 
      position: absolute; 
      width: 24px; 
      height: 4px; 
      background: #fff;
      transform: rotate(45deg);
   }

   &::after {
      content: ""; 
      position: absolute; 
      width: 24px; 
      height: 4px; 
      background: #fff;
      transform: rotate(-45deg);
   }
}

.modal__wrapper.modal_add_event .modal__content {
  padding: 30px;
  box-sizing: border-box;
  height: 90vh;
}

.modal__wrapper.modal_add_event .modal__content .modal-body,
.modal__wrapper.modal_add_event .modal__content .modal-body .popUp,
.modal__wrapper.modal_add_event .modal__content .modal-body .popUp form {
  height: 100%;
  box-sizing: border-box;
}

.modal__wrapper.modal_add_event .modal__content .modal-body .wrap_inputs {
  overflow-y: auto;
  box-sizing: border-box;
  height: 90%;
  padding: 0 5px;
}

</style>
