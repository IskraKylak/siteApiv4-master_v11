<template>
  <modal class="modal_add_event" title="Modal with form + validate" @close="$emit('close')">
    <template v-slot:body>

      <div class="popUp">
        <form @submit.prevent="onSubmit">
          <div class="wrap_inputs">
              <fieldset>
                <legend>Назва події *</legend>
                <input type="text" class="profile_input" v-model="singleEvent.name">
              </fieldset>

              <p class="dropzone_title">Опис події</p>
              <editor
                api-key="iu3f89j47o5ydom6c8ci9rih8nrow5z0hkbbzcblkmjz7li8"
                :init="{
                  height: 500,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                  ],
                }"
                v-model="singleEvent.description"
              />
              <fieldset>
                <legend>Дати проведення події (Початок)</legend>
                <input type="datetime-local" v-model="singleEvent.start_date" class="profile_input">
              </fieldset>

              <fieldset>
                <legend>Дати проведення події (Кінець)</legend>
                <input type="datetime-local" v-model="singleEvent.end_date" class="profile_input">
              </fieldset>

              <fieldset>
                <legend>Дата закриття доступу до тестування</legend>
                <input type="datetime-local" v-model="singleEvent.testing_end_date" class="profile_input">
              </fieldset>

              <fieldset>
                <legend>Кількість годин</legend>
                <input type="text" v-model="singleEvent.number_of_hours" class="profile_input">
              </fieldset>

              <fieldset>
                <legend>Місце проведення</legend>
                <input type="text" v-model="singleEvent.place" class="profile_input">
              </fieldset>

              <div class="draft">
                <input type="checkbox" class="checkbox" id="checkbox" v-model="singleEvent.is_draft"/>
                <label for="checkbox">Чернетка</label>
              </div>

              <p class="dropzone_title">Зображення для сторінки події</p>
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

              <p class="dropzone_title">Файл для події</p>
              <div class="d-none">
                <input accept="image/x-png,image/gif,image/jpeg" class="form-control" ref="fileInput" type="file"
                      @input="pickFile">
              </div>
              <div class="wrap_inp_fiel">
                <div class="imagePreviewWrapper"
                    :style="previewImage.val != null ? { 'background-image': `url(${previewImage.val})`, 'background-color': `#fff` } : ''"
                    @click="selectImage">
                </div>
                <span>
            Натисніть сюди для завантаження файлу
            <svg class="MuiSvgIcon-root MuiDropzoneArea-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path
              d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path></svg>
          </span>
              </div>

              <p class="dropzone_title">Основний текст події</p>
              <editor
                api-key="iu3f89j47o5ydom6c8ci9rih8nrow5z0hkbbzcblkmjz7li8"
                :init="{
                  height: 200,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                  ],
                }"
                v-model="singleEvent.text"
              />
              <br>
              <p class="dropzone_title">Рекламный текст події</p>
              <editor
                api-key="iu3f89j47o5ydom6c8ci9rih8nrow5z0hkbbzcblkmjz7li8"
                :init="{
                  height: 200,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                  ],
                }"
                v-model="singleEvent.ad_text"
              />

              <div class="radio_block">
                <input type="checkbox" class="custom-checkbox" id="happy" v-model="singleEvent.private">
                <label for="happy">Закрита подія</label>
              </div>

              <p class="dropzone_title">Спеціалізації користувачів, які можуть брати участь у навчанні</p>
              <div class="wrap_inp">
                <fieldset>
                  <select multiple
                          v-model="singleEvent.specializations"
                  >
                    <option
                      v-for="spec in specializationList"
                      :value="spec.id"
                      :key="spec.name"
                    >
                      {{ spec.name }}
                    </option>
                  </select>
                </fieldset>
              </div>

              <fieldset>
                <legend>First Youtube ID</legend>
                <input type="text" v-model="singleEvent.youtube_id_1" class="profile_input">
              </fieldset>
              <fieldset>
                <legend>Second Youtube ID</legend>
                <input type="text" v-model="singleEvent.youtube_id_2" class="profile_input">
              </fieldset>

              <fieldset>
                <legend>Процент правильних відповідей для проходження тесту</legend>
                <input type="text" v-model="singleEvent.success_percent" class="profile_input">
              </fieldset>

              <fieldset>
                <legend>Кількість спроб пройти тестування (0 - безліч)</legend>
                <input type="text" v-model="singleEvent.max_tries" class="profile_input">
              </fieldset>

              <fieldset>
                <legend>Балів за подію</legend>
                <input type="text" v-model="singleEvent.points" class="profile_input">
              </fieldset>

              <fieldset>
                <legend>Название сертификата</legend>
                <input type="text" v-model="singleEvent.certificate_title" class="profile_input">
              </fieldset>

              <p class="dropzone_title">Мова</p>

              <p class="dropzone_title">Шаблон інтерактивної виставки</p>
              <div class="d-none">
                <input accept="image/x-png,image/gif,image/jpeg" class="form-control" ref="fileInput3" type="file"
                      @input="pickFile3">
              </div>
              <div class="wrap_inp_fiel">
                <div class="imagePreviewWrapper"
                    :style="previewIneractive.val != null ? { 'background-image': `url(${previewIneractive.val})`, 'background-color': `#fff` } : ''"
                    @click="selectInteractive">
                </div>
                <span>
                  Натисніть сюди для завантаження файлу
                  <svg class="MuiSvgIcon-root MuiDropzoneArea-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path
                    d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path></svg>
                </span>
              </div>
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
        description: '',
        start_date: null,
        end_date: null,
        testing_end_date: null,
        number_of_hours: '',
        place: null,
        is_draft: false,
        image: '',
        event_documents: '',
        text: '',
        private: false,
        specializations: [],
        youtube_id_1: '',
        youtube_id_2: '',
        success_percent: '',
        max_tries: '',
        points: '',
        ad_text: '',
        registered: false,
        certificate_title: '',
        language: 'ua',
        partners_banner: null,
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
      // var tmp = {
      //   name: this.singleEvent.name,
      //   description: this.singleEvent.description,
      //   start_date: this.singleEvent.start_date,
      //   end_date: this.singleEvent.end_date,
      //   testing_end_date: this.singleEvent.testing_end_date,
      //   number_of_hours: this.singleEvent.number_of_hours,
      //   place: this.singleEvent.place,
      //   is_draft: this.singleEvent.is_draft,
      //   event_documents: this.singleEvent.id,
      //   text: this.singleEvent.text,
      //   private: this.singleEvent.private,
      //   specializations: this.singleEvent.specializations,
      //   youtube_id_1: this.singleEvent.youtube_id_1,
      //   youtube_id_2: this.singleEvent.youtube_id_2,
      //   success_percent: this.singleEvent.success_percent,
      //   max_tries: this.singleEvent.max_tries,
      //   registered: this.singleEvent.registered,
      //   certificate_title: this.singleEvent.certificate_title,
      //   language: this.singleEvent.language,
      //   partners_banner: this.singleEvent.id,
      //   media_partners_set: this.singleEvent.id,
      //   main_partners_set: this.singleEvent.id,
      //   partners_set: this.singleEvent.id
      // }

      if (this.singleEvent.name !== '') {
        tmp.name = this.singleEvent.name
      }
      if (this.singleEvent.description !== '') {
        tmp.description = this.singleEvent.description
      }
      if (this.singleEvent.start_date !== null) {
        tmp.start_date = this.singleEvent.start_date
      }
      if (this.singleEvent.end_date !== null) {
        tmp.end_date = this.singleEvent.end_date
      }
      if (this.singleEvent.number_of_hours !== '') {
        tmp.number_of_hours = this.singleEvent.number_of_hours
      }
      if (this.singleEvent.place != null) {
        tmp.place = this.singleEvent.place
      }
      if (this.singleEvent.text !== '') {
        tmp.text = this.singleEvent.text
      }
      if (this.singleEvent.specializations.length !== 0) {
        tmp.specializations = this.singleEvent.specializations
      }
      if (this.singleEvent.youtube_id_1 !== '') {
        tmp.youtube_id_1 = this.singleEvent.youtube_id_1
      }
      if (this.singleEvent.youtube_id_2 !== '') {
        tmp.youtube_id_2 = this.singleEvent.youtube_id_2
      }
      if (this.singleEvent.success_percent !== '') {
        tmp.success_percent = this.singleEvent.success_percent
      }
      if (this.singleEvent.max_tries !== '') {
        tmp.max_tries = this.singleEvent.max_tries
      }
      if (this.singleEvent.points !== '') {
        tmp.points = this.singleEvent.points
      }
      if (this.singleEvent.certificate_title !== '') {
        tmp.certificate_title = this.singleEvent.certificate_title
      }
      if (this.singleEvent.ad_text !== '') {
        tmp.ad_text = this.singleEvent.ad_text
      }
      tmp.is_draft = this.singleEvent.is_draft
      tmp.private = this.singleEvent.private
      await axios({
        url: 'https://asprof-test.azurewebsites.net/uk/api/events/',
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
            url: `https://asprof-test.azurewebsites.net/uk/api/events/${tmp.id}/`,
            data: this.singleEvent.image,
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
        if (this.previewImage.click) {
          axios({
            url: `https://asprof-test.azurewebsites.net/uk/api/events/${tmp.id}/`,
            data: this.singleEvent.event_documents,
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
        if (this.previewIneractive.click) {
          axios({
            url: `https://asprof-test.azurewebsites.net/uk/api/events/${tmp.id}/`,
            data: this.singleEvent.partners_banner,
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
        // this.messages = res;
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
          this.singleEvent.image = new FormData() // creates a new FormData object
          this.singleEvent.image.append('image', this.$refs.fileInput2.files[0])
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
