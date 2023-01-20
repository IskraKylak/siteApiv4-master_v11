<template>
  <modal title="Modal with form + validate" @close="$emit('close')">
    <template v-slot:body>

      <div class="popUp">
        <div class="header2">
          <h2>Додати урок</h2>
        </div>
        <form class="boxes2" @submit.prevent="onSubmit">
          <fieldset>
            <legend>Назва уроку <span title="обов'язкове">*</span></legend>
            <input type="text" class="profile_input" v-model="singleEvent.name">
          </fieldset>

          <legend class="dropzone_title">Текст уроку <span title="обов'язкове">*</span></legend>
              <editor
                api-key="no-api-key"
                @init="handleInit"
                @destroy="handleDestroy"
                @change="handleChange"
                @input="handleInput"
                @error="handleError"
                :config="config"
                name="qwerty"
                ref="ref"
                v-model="singleEvent.text"
              />


          <fieldset>
            <legend>Порядковый номер урока</legend>
            <input type="text" v-model="singleEvent.order_number" class="profile_input">
          </fieldset>
          <button class="profile_btn">Додати</button>
        </form>
      </div>
    </template>
  </modal>
</template>

<script>
import modal from './UI/Modal.vue'
import Editor from '@tinymce/tinymce-vue'
import { useVuelidate } from '@vuelidate/core'
import { required, numeric } from '@vuelidate/validators'
import axios from 'axios'

export default {
  components: { 
    modal,
    editor: Editor,
  },
  props: ['content'],
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      singleEvent: {
        name: '',
        text: '',
        order_number: ''
      }
    }
  },
  validations () {
    return {
      singleEvent: {
        name: {
          required
        },
        text: {
          required
        },
        order_number: {
          required,
          numeric
        }
      }
    }
  },
  created () {
  },
  methods: {
    async onSubmit () {
      var tmp = {
        // id: this.singleEvent.id,
        name: this.singleEvent.name,
        text: this.singleEvent.text,
        order_number: this.singleEvent.order_number,

      }
      await axios({
        url: `https://asprof-test.azurewebsites.net/api/courses/${this.content}/lessons/`,
        data: tmp,
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getToken
        }
      }).then(respons => {
        this.$message('Дані успішно змінені')
        // this.messages = res;
      })
      .catch(error => {
        console.log(error)
        this.$message('Помилка')
      })
      .finally(() => (this.$emit('close')))
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
  max-height: 90vh;
  box-sizing: border-box;
}

.modal__wrapper.update_partner .modal__content .modal-body .boxes2 {
  overflow-y: auto;
  /*height: 100%;*/
  max-height: calc(90vh - 70px);
}
</style>
