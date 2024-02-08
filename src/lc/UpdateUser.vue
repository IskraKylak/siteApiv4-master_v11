<template>
  <div class="container">
    <div class="wrap_preloader lc" v-if="loading">
      <preloader :width="90" :height="90"></preloader>
    </div>
    <div class="profile" v-if="myAcc.role === 'admin' && !loading">
      <form @submit.prevent="onSubmit">
        <div class="profile-top">

          <div class="profile_success">
            <router-link to="/lc-users" class="back_btn">Назад</router-link>
          </div>

          <h2 class="title_event">Редагувати користувача</h2>

          <!--          <div class="radio_block rolle-cont">-->
          <!--            <p class="rolle">Роль користувача</p>-->
          <!--            <div class="rolle-box">-->
          <!--              <div class="radio radio_item">-->
          <!--                <input class="custom-radio" type="radio" id="color-1" name="color" value="indigo">-->
          <!--                <label for="color-1">Користувач</label>-->
          <!--              </div>-->

          <!--              <div class="radio radio_item">-->
          <!--                <input class="custom-radio" type="radio" id="color-2" name="color" value="red">-->
          <!--                <label for="color-2">Модератор</label>-->
          <!--              </div>-->

          <!--              <div class="radio radio_item">-->
          <!--                <input class="custom-radio" type="radio" id="color-3" name="color" value="brown">-->
          <!--                <label for="color-3">Адміністратор</label>-->
          <!--              </div>-->
          <!--            </div>-->

          <!--          </div>-->
          <div class="wrap_inp" :class="{ errorInput: v$.user.last_name.$error }">
            <fieldset :class="{ errorInput: v$.user.last_name.$error }">
              <legend>Прізвище *</legend>
              <input
                v-model="user.last_name"
                type="text"
                class="profile_input"
                :class="{ error: v$.user.last_name }"
                @change="v$.user.last_name.$touch()"
              >
            </fieldset>
            <p class="errorText" v-if="v$.user.last_name.required.$invalid">
              Filed is required
            </p>
          </div>

          <div class="wrap_inp" :class="{ errorInput: v$.user.first_name.$error }">
            <fieldset :class="{ errorInput: v$.user.first_name.$error }">
              <legend>Ім'я *</legend>
              <input
                v-model="user.first_name"
                type="text"
                class="profile_input"
                :class="{ error: v$.user.first_name }"
                @change="v$.user.first_name.$touch()"
              >
            </fieldset>
            <p class="errorText" v-if="v$.user.first_name.required.$invalid">
              Filed is required
            </p>
          </div>
          <div class="wrap_inp" :class="{ errorInput: v$.user.patronymic.$error }">
            <fieldset :class="{ errorInput: v$.user.patronymic.$error }">
              <legend>По-батькові *</legend>
              <input
                v-model="user.patronymic"
                type="text"
                class="profile_input"
                :class="{ error: v$.user.patronymic }"
                @change="v$.user.patronymic.$touch()"
              >
            </fieldset>
            <p class="errorText" v-if="v$.user.patronymic.required.$invalid">
              Filed is required
            </p>
          </div>
          <div
            class="wrap_inp">
            <fieldset>
              <legend>Дата народження *</legend>
              <input v-model="user.birth_date" type="date" class="profile_input">
            </fieldset>
          </div>
          <div class="wrap_inp" :class="{ errorInput: v$.user.email.$error }">
            <fieldset :class="{ errorInput: v$.user.email.$error }">
              <legend>E-mail *</legend>
              <input
                v-model="user.email"
                type="text"
                class="profile_input"
                :class="{ error: v$.user.email }"
                @change="v$.user.email.$touch()"
              >
            </fieldset>
            <p class="errorText" v-if="v$.user.email.required.$invalid">
              Filed is required
            </p>
            <p class="errorText" v-if="v$.user.email.email">Email is not correct</p>
          </div>
          <div class="wrap_inp" :class="{ errorInput: v$.user.phone.$error }">
            <fieldset :class="{ errorInput: v$.user.phone.$error }">
              <legend>Номер телефону *</legend>
              <input
                v-model="user.phone"
                type="text"
                class="profile_input"
                :class="{ error: v$.user.phone }"
                @change="v$.user.phone.$touch()"
              >
            </fieldset>
            <p class="errorText" v-if="v$.user.phone.required.$invalid">
              Filed is required
            </p>
            <p class="errorText" v-if="v$.user.phone.numeric.$invalid">
              You phone is not correct
            </p>
          </div>
          <div class="wrap_inp" :class="{ errorInput: v$.user.region.$error }">
            <fieldset :class="{ errorInput: v$.user.region.$error }">
              <legend>Область</legend>
              <input
                v-model="user.region"
                type="text"
                class="profile_input"
                :class="{ error: v$.user.region }"
                @change="v$.user.region.$touch()"
              >
            </fieldset>
            <p class="errorText" v-if="v$.user.region.required.$invalid">
              Filed is required
            </p>
          </div>
          <div class="wrap_inp" :class="{ errorInput: v$.user.town.$error }">
            <fieldset :class="{ errorInput: v$.user.town.$error }">
              <legend>Населений пункт *</legend>
              <input
                v-model="user.town"
                type="text"
                class="profile_input"
                :class="{ error: v$.user.town }"
                @change="v$.user.town.$touch()"
              >
            </fieldset>
            <p class="errorText" v-if="v$.user.town.required.$invalid">
              Filed is required
            </p>
          </div>
          <div class="wrap_inp">
            <fieldset>
              <legend>ВНЗ</legend>
              <input v-model="user.college" type="text" class="profile_input">
            </fieldset>
          </div>
          <div class="wrap_inp">
            <fieldset>
              <legend>Серія та номер диплома</legend>
              <input v-model="user.diploma" type="text" class="profile_input">
            </fieldset>
          </div>
          <div class="wrap_inp">
            <fieldset>
              <legend>Початок професійної діяльності</legend>
              <input v-model="user.start_activity_date" type="date" class="profile_input">
            </fieldset>
          </div>
          <div class="wrap_inp" :class="{ errorInput: v$.user.job_place.$error }">
            <fieldset :class="{ errorInput: v$.user.job_place.$error }">
              <legend>Місце роботи *</legend>
              <input
                v-model="user.job_place"
                type="text"
                class="profile_input"
                :class="{ error: v$.user.job_place }"
                @change="v$.user.job_place.$touch()"
              >
            </fieldset>
            <p class="errorText" v-if="v$.user.job_place.required.$invalid">
              Filed is required
            </p>
          </div>
          <div
            class="wrap_inp"
            :class="{ errorInput: v$.user.specialization.$error }"
          >
            <fieldset :class="{ errorInput: v$.user.specialization.$error }">
              <legend>Спеціальність *</legend>
              <select
                v-model="user.specialization"
              >
                <option value="" disabled selected>Виберіть спеціальність</option>
                <option
                  v-for="spec in specializationList"
                  :value="spec.id"
                  :key="spec.name"
                >
                  {{ spec.name }}
                </option>
              </select>
            </fieldset>
            <p class="errorText" v-if="v$.user.specialization.required.$invalid">
              Filed is required
            </p>
          </div>
          <div class="wrap_inp">
            <fieldset>
              <legend>Посада *</legend>
              <input v-model="user.specialization_name" type="text" class="profile_input">
            </fieldset>
          </div>
          <div class="wrap_inp">
            <fieldset>
              <legend>Робочий номер телефону</legend>
              <input v-model="user.work_phone" type="text" class="profile_input">
            </fieldset>
          </div>

          <div class="profile_success">
            <button class="profile_btn" type="submit">Зберегти</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, email, numeric } from '@vuelidate/validators'
import preloader from '@/components/UI/Preloader.vue'
export default {
  components: {
    preloader
  },
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      loading: false,
      myAcc: [],
      proId: this.$route.params.Pid,
      specializationList: [],
      user: {
        id: '',
        role: '',
        email: '',
        password: '',
        full_name: '',
        first_name: '',
        last_name: '',
        patronymic: '',
        phone: '',
        work_phone: '',
        birth_date: null,
        region: '',
        town: '',
        start_activity_date: null,
        college: '',
        diploma: '',
        job_place: '',
        job_name: '',
        specialization: '',
        specialization_name: '',
        email_confirmed: false
      }
    }
  },
  validations () {
    return {
      user: {
        email: {
          required,
          email
        },
        password: {
          required
        },
        full_name: {
          required
        },
        first_name: {
          required
        },
        last_name: {
          required
        },
        patronymic: {
          required
        },
        phone: {
          required,
          numeric
        },
        work_phone: {
          required
        },
        region: {
          required
        },
        town: {
          required
        },
        job_place: {
          required
        },
        specialization: {
          required
        }
      }
    }
  },
  created () {
    this.getNotify()
  },
  methods: {
    async onSubmit () {
      this.v$.user.first_name.$touch()
      this.v$.user.last_name.$touch()
      this.v$.user.patronymic.$touch()
      this.v$.user.region.$touch()
      this.v$.user.town.$touch()
      this.v$.user.phone.$touch()
      this.v$.user.email.$touch()
      this.v$.user.specialization.$touch()
      this.v$.user.job_place.$touch()
      if (
        !this.v$.user.first_name.$invalid &&
        !this.v$.user.last_name.$invalid &&
        !this.v$.user.patronymic.$invalid &&
        !this.v$.user.region.$invalid &&
        !this.v$.user.town.$invalid &&
        !this.v$.user.phone.$invalid &&
        !this.v$.user.email.$invalid &&
        !this.v$.user.specialization.$invalid &&
        !this.v$.user.job_place.$invalid) {
        this.loading = true
        await axios({
          url: `https://asprof-test.azurewebsites.net/uk/api/users/${this.proId}/`,
          data: this.user,
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
      }
    },
    async getNotify () {
      this.loading = true
      this.myAcc = this.$store.getters.getMyAcc
      await axios({
        method: 'GET',
        url: (`https://asprof-test.azurewebsites.net/uk/api/users/${this.proId}`),
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getToken
        }
      })
        .then(respons => {
          this.$store.dispatch('setUser', respons.data)
        })
        .catch(error => {
        })
        .finally(() => (this.loading = false))
      this.specializationList = this.$store.getters.getSpecialization
      this.user = this.$store.getters.getUser
    }
  }
}

</script>

<style scoped src="@/assets/lc/css/style.min.css">
</style>
<style scoped>
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
</style>
