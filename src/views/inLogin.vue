<template>
  <div class="wrap_form">
    <h2 class="title_form">{{$t("login.btnEnter")}}</h2>
    <form @submit.prevent="onSubmit">
      <div class="form-item" :class="{ errorInput: v$.email.$error }">
        <input
          :class="{ error: v$.email.$error }"
          v-model="email"
          @change="v$.email.$touch()"
          placeholder="Еmail"
        />
        <p class="errorText" v-if="v$.email.required.$invalid">
          Filed is required
        </p>
        <p class="errorText" v-if="v$.email.email">Email is not correct</p>
      </div>
      <div class="form-item" :class="{ errorInput: v$.password.$error }">
        <input
          type="password"
          v-model="password"
          :class="{ error: v$.password.$error }"
          @change="v$.password.$touch()"
          :placeholder="$t('login.placeholder.pass')"
        />
        <p class="errorText" v-if="v$.password.required.$invalid">
          Filed is required
        </p>
        <p class="errorText" v-if="v$.password.minLength.$invalid">
          Password mast have at least {{ v$.password.minLength.$params.min }} !
        </p>
        <div class="group-link">
          <router-link class="link-pass" :to="`/${this.$i18n.locale}/forgot-password`">{{ $t('login.forgot_password') }}</router-link>
        </div>
      </div>
      <button class="my_btn" @click="modalFirst = false">{{ $t('login.btnEnter') }}</button>
      <router-link class="my_btn" :to="`/${this.$i18n.locale}/register`">{{ $t('login.btnReg') }}</router-link>
    </form>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, email } from '@vuelidate/validators'
import messages from '@/utils/messages'
import 'materialize-css/dist/js/materialize.min'
export default {
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      password: '',
      email: '',
    }
  },
  validations () {
    return {
      password: {
        required,
        minLength: minLength(4),
      },
      email: {
        required,
        email,
      },
    }
  },
  computed: {
    tokkent() {
      return this.$store.getters.getToken
    }
  },
  mounted () {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
    if(this.$store.getters.getToken !== '') {
      this.$router.push("/lc-profile")
    }
  },
  methods: {
    async onSubmit () {
      this.v$.$touch()
      if (!this.v$.$invalid) {
        const user = {
          email: this.email,
          password: this.password,
          lang: "uk"
        }
        if(this.$i18n.locale != 'ua')
            user.lang = this.$i18n.locale
        try {
          await this.$store.dispatch('login', user)
          this.$router.push("/lc-profile")
        } catch (e) {
          throw e
        }
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
        justify-content: flex-end;
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