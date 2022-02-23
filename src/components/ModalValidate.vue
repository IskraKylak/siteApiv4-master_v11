<template>
  <modal title="Modal with form + validate" @close="$emit('close')">
    <template v-slot:body>

      <div class="popUp">
        <div class="header2">
          <h2>{{ title }}</h2>
        </div>
        <form class="boxes2" @submit.prevent="onSubmit">

          <div class="wrap_inp" :class="{ errorInput: v$.singPartnerModal.name.$error }">
            <fieldset>
              <legend>Назва партнера *</legend>
              <input
                type="text"
                class="profile_input"
                v-model="singPartnerModal.name"
                :class="{ error: v$.singPartnerModal.name}"
                @change="v$.singPartnerModal.name.$touch()"
              >
            </fieldset>
            <p class="errorText" v-if="v$.singPartnerModal.name.required.$invalid">
              Filed is required
            </p>
          </div>
          <div class="wrap_inp" :class="{ errorInput: v$.singPartnerModal.link.$error }">
            <fieldset>
              <legend>Посылання на партнера *</legend>
              <input
                type="text"
                class="profile_input"
                v-model="singPartnerModal.link"
                :class="{ error: v$.singPartnerModal.link }"
                @change="v$.singPartnerModal.link.$touch()"
              >
            </fieldset>
            <p class="errorText" v-if="v$.singPartnerModal.link.required.$invalid">
              Filed is required
            </p>
          </div>

          <div class="wrap_inp" :class="{ errorInput: v$.singPartnerModal.order_number.$error }">
            <fieldset>
              <legend>Порядок *</legend>
              <input
                type="text"
                class="profile_input"
                v-model="singPartnerModal.order_number"
                :class="{ error: v$.singPartnerModal.order_number }"
                @change="v$.singPartnerModal.order_number.$touch()"
              >
            </fieldset>
            <p class="errorText" v-if="v$.singPartnerModal.order_number.required.$invalid">
              Filed is required
            </p>
            <p class="errorText" v-if="v$.singPartnerModal.order_number.numeric.$invalid">
              You order is not correct
            </p>
          </div>
          <div class="wrap_inp" :class="{ errorInput: v$.singPartnerModal.image.$error }">
            <p class="dropzone_title">Логотип партнера</p>
            <div class="d-none">
              <input
                accept="image/x-png,image/gif,image/jpeg"
                class="form-control"
                ref="fileInput4"
                type="file"
                @input="pickFile4"
              >
            </div>
            <div class="wrap_inp_fiel">
              <div class="imagePreviewWrapper"
                   :style="previewPartner.val != null ? { 'background-image': `url(${previewPartner.val})`, 'background-color': `#fff` } : ''"
                   @click="selectPartners">
              </div>
              <span>
              Натисніть сюди для завантаження файлу
              <svg class="MuiSvgIcon-root MuiDropzoneArea-icon" focusable="false" viewBox="0 0 24 24"
                   aria-hidden="true"><path
                d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path></svg>
              </span>
            </div>
            <div v-if="v$.singPartnerModal.image.$error" class="errorText">
              Select Image
            </div>
          </div>
          <button class="profile_btn">{{ title }}</button>
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

export default {
  components: { modal },
  props: {
    isPartner: {
      type: String
    },
    idItem: {
      type: Number
    },
    idEvent: {
      type: Number
    }
  },
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      title: '',
      tmpSingleEvent: [],
      previewPartner: {
        val: null,
        click: false
      },
      singPartnerModal: {
        id: '',
        name: '',
        link: '',
        order_number: '',
        image: ''
      }
    }
  },
  validations () {
    return {
      singPartnerModal: {
        name: {
          required
        },
        link: {
          required
        },
        order_number: {
          required,
          numeric
        },
        image: {
          required
        }
      }
    }
  },
  created () {
    this.startModal()
  },
  methods: {
    startModal () {
      this.tmpSingleEvent = JSON.parse(JSON.stringify(this.$store.getters.getSingleEvent))
      if (this.idItem != null) {
        console.log('idItem ' + this.idItem)
        console.log('tmpSingleEvent ')
        this.title = 'Змінити партнера'
        if (this.isPartner === 'mainPartner') {
          this.singPartnerModal = this.tmpSingleEvent.main_partners_set[this.idItem]
          this.previewPartner.val = this.singPartnerModal.image
        } else if (this.isPartner === 'partner') {
          console.log(this.tmpSingleEvent.partners_set[this.idItem])
          this.singPartnerModal = this.tmpSingleEvent.partners_set[this.idItem]
          this.previewPartner.val = this.singPartnerModal.image
        } else if (this.isPartner === 'mediaPartner') {
          console.log(this.tmpSingleEvent.media_partners_set[this.idItem])
          this.singPartnerModal = this.tmpSingleEvent.media_partners_set[this.idItem]
          this.previewPartner.val = this.singPartnerModal.image
        }
      } else {
        this.title = 'Додати нового партнера'
        this.singPartnerModal.id = ''
        this.singPartnerModal.name = ''
        this.singPartnerModal.image = ''
        this.singPartnerModal.order_number = ''
        this.previewPartner.val = null
      }
    },
    async onSubmit () {
      this.v$.singPartnerModal.name.$touch()
      this.v$.singPartnerModal.link.$touch()
      this.v$.singPartnerModal.order_number.$touch()
      this.v$.singPartnerModal.image.$touch()
      if (
        !this.v$.singPartnerModal.name.$invalid &&
        !this.v$.singPartnerModal.link.$invalid &&
        !this.v$.singPartnerModal.order_number.$invalid &&
        !this.v$.singPartnerModal.image.$invalid) {
        if (this.isPartner === 'mainPartner') {
          if (this.idItem != null) {
            await axios({
              url: (`https://asprof-test.azurewebsites.net/api/events/${this.idEvent}/main_partners/${this.singPartnerModal.id}/`),
              data: {
                id: this.singPartnerModal.id,
                name: this.singPartnerModal.name,
                link: this.singPartnerModal.link,
                order_number: this.singPartnerModal.order_number
              },
              method: 'PATCH',
              headers: {
                Authorization: 'Bearer ' + this.$store.getters.getToken
              }
            })
              .then(respons => {
                console.log(respons.data)
                this.$message('Партнера змінено!')
                this.$emit('close')
              })
              .catch(error => {
                // alert(error)
                console.log(error)
              })
            if (this.previewPartner.click) {
              await axios({
                url: `https://asprof-test.azurewebsites.net/api/events/${this.idEvent}/main_partners/${this.singPartnerModal.id}/`,
                data: this.singPartnerModal.image,
                method: 'PATCH',
                headers: {
                  Authorization: 'Bearer ' + this.$store.getters.getToken
                }
              }).then(respons => {
                const res = respons.data
                this.$message('Картинка змінена!')
                this.previewPartner.click = false
                // this.messages = res;
              })
                .catch(error => {
                  console.log(error)
                  this.$message('Помилка')
                  this.previewPartner.click = false
                })
                .finally(() => (this.loading = false))
            }
          } else {
            var tmp = {
              // id: this.singPartnerModal.id,
              name: this.singPartnerModal.name,
              image: null,
              link: this.singPartnerModal.link,
              order_number: this.singPartnerModal.order_number
            }
            // console.log('tmp.id: ' + tmp.id)
            await axios({
              url: (`https://asprof-test.azurewebsites.net/api/events/${this.idEvent}/main_partners/`),
              data: tmp,
              method: 'POST',
              headers: {
                Authorization: 'Bearer ' + this.$store.getters.getToken
              }
            })
              .then(respons => {
                console.log(respons.data)
                this.$message('Партнера додано!')
                tmp.id = respons.data.id
                if (this.previewPartner.click) {
                  // console.log('this.singPartnerModal.image: ' + this.singPartnerModal.image)
                  // console.log('tmp.id: ' + tmp.id)
                  axios({
                    url: `https://asprof-test.azurewebsites.net/api/events/${this.idEvent}/main_partners/${tmp.id}/`,
                    data: this.singPartnerModal.image,
                    method: 'PATCH',
                    headers: {
                      Authorization: 'Bearer ' + this.$store.getters.getToken
                    }
                  }).then(respons => {
                    const res = respons.data
                    this.$message('Картинка додана!')
                    this.previewPartner.click = false
                    this.previewPartner.val = null
                    this.$emit('close')
                    // this.messages = res;
                  })
                    .catch(error => {
                      console.log(error)
                      this.$message('Помилка! Картинка не додана!')
                      this.previewPartner.click = false
                    })
                    .finally(() => (this.loading = false))
                }
              })
              .catch(error => {
                // alert(error)
                console.log(error)
                this.$message('Помилка! Партнера не додано! Такий порядковий номер вже є!')
              })
          }
        } else if (this.isPartner === 'partner') {
          if (this.idItem != null) {
            await axios({
              url: (`https://asprof-test.azurewebsites.net/api/events/${this.idEvent}/partners/${this.singPartnerModal.id}/`),
              data: {
                id: this.singPartnerModal.id,
                name: this.singPartnerModal.name,
                link: this.singPartnerModal.link,
                order_number: this.singPartnerModal.order_number
              },
              method: 'PATCH',
              headers: {
                Authorization: 'Bearer ' + this.$store.getters.getToken
              }
            })
              .then(respons => {
                console.log(respons.data)
                this.$message('Партнера змінено!')
                this.$emit('close')
              })
              .catch(error => {
                // alert(error)
                console.log(error)
              })
            if (this.previewPartner.click) {
              await axios({
                url: `https://asprof-test.azurewebsites.net/api/events/${this.idEvent}/partners/${this.singPartnerModal.id}/`,
                data: this.singPartnerModal.image,
                method: 'PATCH',
                headers: {
                  Authorization: 'Bearer ' + this.$store.getters.getToken
                }
              }).then(respons => {
                const res = respons.data
                this.$message('Картинка змінена!')
                this.previewPartner.click = false
                // this.messages = res;
              })
                .catch(error => {
                  console.log(error)
                  this.$message('Помилка')
                  this.previewPartner.click = false
                })
                .finally(() => (this.loading = false))
            }
          } else {
            var tmp = {
              // id: this.singPartnerModal.id,
              name: this.singPartnerModal.name,
              image: null,
              link: this.singPartnerModal.link,
              order_number: this.singPartnerModal.order_number
            }
            // console.log('tmp.id: ' + tmp.id)
            await axios({
              url: (`https://asprof-test.azurewebsites.net/api/events/${this.idEvent}/partners/`),
              data: tmp,
              method: 'POST',
              headers: {
                Authorization: 'Bearer ' + this.$store.getters.getToken
              }
            })
              .then(respons => {
                console.log(respons.data)
                this.$message('Партнера додано!')
                tmp.id = respons.data.id
                if (this.previewPartner.click) {
                  // console.log('this.singPartnerModal.image: ' + this.singPartnerModal.image)
                  // console.log('tmp.id: ' + tmp.id)
                  axios({
                    url: `https://asprof-test.azurewebsites.net/api/events/${this.idEvent}/partners/${tmp.id}/`,
                    data: this.singPartnerModal.image,
                    method: 'PATCH',
                    headers: {
                      Authorization: 'Bearer ' + this.$store.getters.getToken
                    }
                  }).then(respons => {
                    const res = respons.data
                    this.$message('Картинка додана!')
                    this.previewPartner.click = false
                    this.previewPartner.val = null
                    this.$emit('close')
                    // this.messages = res;
                  })
                    .catch(error => {
                      console.log(error)
                      this.$message('Помилка! Картинка не додана!')
                      this.previewPartner.click = false
                    })
                    .finally(() => (this.loading = false))
                }
              })
              .catch(error => {
                // alert(error)
                console.log(error)
                this.$message('Помилка! Партнера не додано! Такий порядковий номер вже є')
              })
          }
        } else if (this.isPartner === 'mediaPartner') {
          if (this.idItem != null) {
            await axios({
              url: (`https://asprof-test.azurewebsites.net/api/events/${this.idEvent}/media_partners/${this.singPartnerModal.id}/`),
              data: {
                id: this.singPartnerModal.id,
                name: this.singPartnerModal.name,
                link: this.singPartnerModal.link,
                order_number: this.singPartnerModal.order_number
              },
              method: 'PATCH',
              headers: {
                Authorization: 'Bearer ' + this.$store.getters.getToken
              }
            })
              .then(respons => {
                console.log(respons.data)
                this.$message('Партнера змінено!')
                this.$emit('close')
              })
              .catch(error => {
                // alert(error)
                console.log(error)
              })
            if (this.previewPartner.click) {
              await axios({
                url: `https://asprof-test.azurewebsites.net/api/events/${this.idEvent}/media_partners/${this.singPartnerModal.id}/`,
                data: this.singPartnerModal.image,
                method: 'PATCH',
                headers: {
                  Authorization: 'Bearer ' + this.$store.getters.getToken
                }
              }).then(respons => {
                const res = respons.data
                this.$message('Картинка змінена!')
                this.previewPartner.click = false
                // this.messages = res;
              })
                .catch(error => {
                  console.log(error)
                  this.$message('Помилка')
                  this.previewPartner.click = false
                })
                .finally(() => (this.loading = false))
            }
          } else {
            var tmp = {
              // id: this.singPartnerModal.id,
              name: this.singPartnerModal.name,
              image: null,
              link: this.singPartnerModal.link,
              order_number: this.singPartnerModal.order_number
            }
            // console.log('tmp.id: ' + tmp.id)
            await axios({
              url: (`https://asprof-test.azurewebsites.net/api/events/${this.idEvent}/media_partners/`),
              data: tmp,
              method: 'POST',
              headers: {
                Authorization: 'Bearer ' + this.$store.getters.getToken
              }
            })
              .then(respons => {
                console.log(respons.data)
                this.$message('Партнера додано!')
                tmp.id = respons.data.id
                if (this.previewPartner.click) {
                  // console.log('this.singPartnerModal.image: ' + this.singPartnerModal.image)
                  // console.log('tmp.id: ' + tmp.id)
                  axios({
                    url: `https://asprof-test.azurewebsites.net/api/events/${this.idEvent}/media_partners/${tmp.id}/`,
                    data: this.singPartnerModal.image,
                    method: 'PATCH',
                    headers: {
                      Authorization: 'Bearer ' + this.$store.getters.getToken
                    }
                  }).then(respons => {
                    const res = respons.data
                    this.$message('Картинка додана!')
                    this.previewPartner.click = false
                    this.previewPartner.val = null
                    this.$emit('close')
                    // this.messages = res;
                  })
                    .catch(error => {
                      console.log(error)
                      this.$message('Помилка! Картинка не додана!')
                      this.previewPartner.click = false
                    })
                    .finally(() => (this.loading = false))
                }
              })
              .catch(error => {
                // alert(error)
                console.log(error)
                this.$message('Помилка! Партнера не додано! Такий порядковий номер вже є')
              })
          }
        }
      }
    },
    selectPartners () {
      this.$refs.fileInput4.click()
    },
    pickFile4 () {
      const input = this.$refs.fileInput4
      const file = input.files
      if (file && file[0]) {
        const reader = new FileReader()
        reader.onload = e => {
          this.singPartnerModal.image = new FormData() // creates a new FormData object
          this.singPartnerModal.image.append('image', this.$refs.fileInput4.files[0])
          this.previewPartner.val = e.target.result
          this.previewPartner.click = true
        }
        reader.readAsDataURL(file[0])
        this.$emit('input', file[0])
      }
    }
  }
}

</script>

<style scoped src="@/assets/lc/css/style.min.css">
</style>
<style>
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

.modal__wrapper.update_partner .modal__content {
  max-height: calc(90vh - 30px);
}

.modal__wrapper.update_partner .modal__content .modal-body .boxes2 {
  overflow-y: auto;
  /*height: 100%;*/
  max-height: calc(90vh - 70px);
}
</style>
