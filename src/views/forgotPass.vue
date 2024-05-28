<template>
  <div class="wrap_form">
    <h2 class="title_form">{{ $t("password.title1") }}</h2>
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
      <button class="my_btn" @click="modalFirst = false">{{ $t('password.btn') }}</button>
    </form>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, email } from '@vuelidate/validators'
import messages from '@/utils/messages'
import 'materialize-css/dist/js/materialize.min'
import axios from "axios";

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      email: '',
    }
  },
  validations () {
    return {
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
        await axios({
          method: 'POST',
          url: (`https://asprof-test.azurewebsites.net/en/api/auth/forgot_password/`),
          data: { email: this.email },
        }).then(() => {
          this.$message(this.$t('password.message_forgot_success'));
        })
        .catch(() => {
          this.$message(this.$t('password.message_forgot_error'));
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