<template>
  <div>
    <form class="form-bottom" @submit.prevent="onSubmit2">
      <div class="profile-bottom">
        <h2 class="profile-bottom_title">Заміна паролю</h2>
        <div
          class="wrap_inp"
          :class="{ errorInput: v1$.passwords.current_password.$error }"
        >
          <fieldset :class="{ errorInput: v1$.passwords.current_password.$error }">
            <legend>Старий пароль <span title="обов'язкове">*</span></legend>
            <input
              v-model="passwords.current_password"
              :class="{ error: v1$.passwords.current_password.$error }"
              @change="v1$.passwords.current_password.$touch()"
              placeholder="Пароль"
              ref="password"
              autocomplete="off"
            />
          </fieldset>
          <p class="errorText" v-if="v1$.passwords.current_password.required.$invalid">
            Filed is required
          </p>
        </div>
        <div
          class="wrap_inp"
          :class="{ errorInput: v1$.passwords.new_password.$error }"
        >
          <fieldset>
            <legend>Пароль <span title="обов'язкове">*</span></legend>
            <input
              v-model="passwords.new_password"
              :class="{ error: v1$.passwords.new_password.$error }"
              @change="v1$.passwords.new_password.$touch()"
              placeholder="Пароль"
              ref="password"
              autocomplete="off"
            />
          </fieldset>
          <p class="errorText" v-if="v1$.passwords.new_password.required.$invalid">
            Filed is required
          </p>
          <p class="errorText" v-if="v1$.passwords.new_password.minLength.$invalid">
            Password mast have at least
            {{ v1$.passwords.new_password.minLength.$params.min }} !
          </p>
        </div>
        <div
          class="wrap_inp"
          :class="{ errorInput: v1$.passwords.confirm_password.$error }"
        >
          <fieldset>
            <legend>Повторіть пароль <span title="обов'язкове">*</span></legend>
            <input
              v-model="passwords.confirm_password"
              :class="{ error: v1$.passwords.confirm_password.$error }"
              @change="v1$.passwords.confirm_password.$touch()"
              placeholder="Пароль"
            />
          </fieldset>
          <p class="errorText" v-if="v1$.passwords.confirm_password.sameAsPassword.$params.equalTo">Password and Confirm
            Password should match</p>
          <p class="errorText" v-if="v1$.passwords.confirm_password.required.$invalid">
            Filed is required
          </p>
        </div>
        <div class="profile_success">
          <button class="profile_btn" type="submit">Зберегти</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import axios from 'axios'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, sameAs } from '@vuelidate/validators'
import messages from '@/utils/messages'
export default {
  setup () {
    return { v1$: useVuelidate() }
  },
  data () {
    return {
      passwords: {
        current_password: '',
        new_password: '',
        confirm_password: ''
      }
    }
  },
  validations () {
    return {
      passwords: {
        current_password: {
          required,
        },
        new_password: {
          required,
          minLength: minLength(4),
        },
        confirm_password: {
          required,
          // minLength: minLength(4),
          sameAsPassword: sameAs(this.passwords.newPass1)
        }
      }
    }
  },
  methods: {
    async onSubmit2 () {
      this.v1$.passwords.current_password.$touch()
      this.v1$.passwords.new_password.$touch()
      this.v1$.passwords.confirm_password.$touch()
      if (!this.v1$.passwords.current_password.$invalid ||
        !this.v1$.passwords.new_password.$invalid ||
        !this.v1$.passwords.confirm_password.$invalid) {
        await axios({
          url: `https://asprof-test.azurewebsites.net/uk/api/auth/reset_password/`,
          data: this.passwords,
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + this.$store.getters.getToken
          }
        }).then(respons => {
          const res = respons.data
          this.$message("Пароль змінений")
        }).catch(error => {
          this.$message("Помилка: Неправильно введено пароль!")
        }).finally(() => (this.loading = false))
      } else {
        alert('false')
      }
    }
  }
}
</script>

<style scoped src="@/assets/lc/css/style.min.css">
</style>
<style scoped>

.wrap_inp fieldset input {
  background: #fafafa;
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

legend span {
  color: red;
  font-size: 15px;
}
</style>
