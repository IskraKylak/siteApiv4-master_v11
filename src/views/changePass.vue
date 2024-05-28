<template>
  <div class="wrap_form">
    <h2 class="title_form">{{ $t("password.title1") }}</h2>
    <form @submit.prevent="onSubmit">
      <div class="form-item" :class="{ errorInput: v$.password3.$error }">
        <input
          type="password"
          v-model="password3"
          :class="{ error: v$.password3.$error }"
          @change="v$.password3.$touch()"
          :placeholder="$t('password.old_password')"
          ref="password"
          autocomplete="off"
        />
        <p class="errorText" v-if="v$.password3.required.$invalid">
          Filed is required
        </p>
        <p class="errorText" v-if="v$.password3.minLength.$invalid">
          Password mast have at least
          {{ v$.password3.minLength.$params.min }} !
        </p>
      </div>
      <div class="wrap_form_pass">
        <div class="form-item" :class="{ errorInput: v$.password1.$error }">
          <input
            type="password"
            v-model="password1"
            :class="{ error: v$.password1.$error }"
            @change="v$.password1.$touch()"
            :placeholder="$t('password.new_password')"
            ref="password"
            autocomplete="off"
          />
          <p class="errorText" v-if="v$.password1.required.$invalid">
            Filed is required
          </p>
          <p class="errorText" v-if="v$.password1.minLength.$invalid">
            Password mast have at least
            {{ v$.password1.minLength.$params.min }} !
          </p>
        </div>
        <div class="form-item" :class="{ errorInput: v$.password2.$error }">
          <input
            type="password"
            v-model="password2"
            :class="{ error: v$.password2.$error }"
            @change="v$.password2.$touch()"
            :placeholder="$t('password.confirm_password')"
          />
          <p class="errorText"  v-if="v$.password2.sameAsPassword.$params.equalTo">Password and Confirm Password should match</p>
          <p class="errorText" v-if="v$.password2.required.$invalid">
            Filed is required
          </p>
        </div>
      </div>
      <button class="my_btn" @click="modalFirst = false">{{ $t('password.btn') }}</button>
    </form>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, email, numeric, sameAs } from '@vuelidate/validators'
import axios from 'axios'
import messages from '@/utils/messages'
import 'materialize-css/dist/js/materialize.min'
export default {
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      password1: '',
      password2: '',
      password3: '',
    }
  },
  validations () {
    return {
      password1: {
        required,
        minLength: minLength(4),
      },
      password2: {
        required,
        sameAsPassword: sameAs(this.password1)
      },
      password3: {
        required,
        minLength: minLength(4),
      },
    }
  },
  computed: {
    tokkent() {
      return this.$store.getters.getToken
    }
  },
  methods: {
    async onSubmit () {
      this.v$.$touch()
      if (!this.v$.$invalid) {
        await axios({
          method: 'POST',
          url: (`https://asprof-test.azurewebsites.net/en/api/auth/reset_password/`),
          headers: {
            Authorization: 'Bearer ' + this.$store.getters.getToken
          },
          data: {
            current_password: this.password3,
            new_password: this.password1,
            confirm_password: this.password2,
          },
        }).then(() => {
          this.password3 = '';
          this.password1 = '';
          this.password2 = '';
          this.$message(this.$t('password.message_change_success'));
        })
        .catch(() => {
          this.$message(this.$t('password.message_error'));
        })
      }
    }
  },
}
</script>

<style scoped src="@/assets/css/screen.css">
</style>

<style scoped lang="scss">

.form-item .errorText {
  display: none;
  margin-top: 5px;
  font-size: 13px;
  color: rgb(207, 86, 86);
}

.form-item.errorInput .errorText {
  display: block;
}

.wrap_form {
  padding: 50px 0;
  max-width: 350px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;

  &_pass {
    max-width: 350px;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 0 auto;
    align-items: center;
  }

  form {
    width: 100%;
    padding: 50px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .form-item {
      position: relative;
      width: 100%;
      margin-bottom: 30px;

      .group-link {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        grid-gap: 5px;
      }

      .link-pass {
        color: #002678;

        &:hover {
          text-decoration: underline;
        }
      }

      &.errorInput {
        margin-bottom: 10px;
      }

      input {
        width: 100%;
        height: 44px;
        padding: 0 20px;
      }
    }
  }
}

input.error {
  border: 1px solid rgb(207, 86, 86);
}

h2.title_form {
  position: relative;
  text-align: center;
  width: max-content;
}

h2.title_form:after {
  content: "";
  position: absolute;
  width: 120%;
  left: -10%;
  bottom: 0;
  height: 2px;
  background: #002678;
}

.my_btn {
  background: #002678;
  color: #fff;
  height: 44px;
  max-width: 180px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Montserrat", sans-serif;
  font-weight: normal;
  text-transform: uppercase;
  letter-spacing: 0.7px;
  margin-bottom: 20px;
}

</style>