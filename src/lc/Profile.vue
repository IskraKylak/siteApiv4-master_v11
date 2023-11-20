<template>
  <div class="wrap_preloader lc" v-if="loading">
    <preloader :width="90" :height="90"></preloader>
  </div>
  <div v-if="!loading" class="container">
    <div class="profile">
      <form @submit.prevent="onSubmit">
        <div class="profile-top">
          <div class="wrap_inp" :class="{ errorInput: v$.user.last_name.$error }">
            <fieldset :class="{ errorInput: v$.user.last_name.$error }">
              <legend>Прізвище <span title="обов'язкове">*</span></legend>
              <input
                type="text" class="profile_input"
                v-model="user.last_name"
                :class="{ error: v$.user.last_name }"
                @change="v$.user.last_name.$touch()"
              />

            </fieldset>
            <p class="errorText" v-if="v$.user.last_name.required.$invalid">
              Filed is required
            </p>
          </div>
          <div class="wrap_inp" :class="{ errorInput: v$.user.first_name.$error }">
            <fieldset :class="{ errorInput: v$.user.first_name.$error }">
              <legend>Ім'я <span title="обов'язкове">*</span></legend>
              <input
                type="text"
                class="profile_input"
                v-model="user.first_name"
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
              <legend>По-батькові <span title="обов'язкове">*</span></legend>
              <input
                type="text"
                class="profile_input"
                v-model="user.patronymic"
                :class="{ error: v$.user.patronymic }"
                @change="v$.user.patronymic.$touch()"
              >
            </fieldset>
            <p class="errorText" v-if="v$.user.patronymic.required.$invalid">
              Filed is required
            </p>
          </div>
          <div class="wrap_inp">
            <fieldset>
              <legend>Дата народження <span title="обов'язкове">*</span></legend>
              <input type="date" class="profile_input" v-model="user.birth_date">
            </fieldset>
          </div>
          <div class="wrap_inp" :class="{ errorInput: v$.user.email.$error }">
            <fieldset :class="{ errorInput: v$.user.email.$error }">
              <legend>E-mail *</legend>
              <input
                type="email"
                class="profile_input"
                v-model="user.email"
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
              <legend>Номер телефону <span title="обов'язкове">*</span></legend>
              <input
                type="text"
                class="profile_input"
                v-model="user.phone"
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
            <p class="errorText" v-if="v$.user.phone.minLength.$invalid">
              Tel mast have at least
              {{ v$.user.phone.minLength.$params.min }} !
            </p>
          </div>
          <div class="wrap_inp" :class="{ errorInput: v$.user.region.$error }">
            <fieldset :class="{ errorInput: v$.user.region.$error }">
              <legend>Область <span title="обов'язкове">*</span></legend>
              <input
                type="text"
                class="profile_input"
                v-model="user.region"
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
              <legend>Населений пункт <span title="обов'язкове">*</span></legend>
              <input
                type="text"
                class="profile_input"
                v-model="user.town"
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
              <input type="text" v-model="user.college" class="profile_input">
            </fieldset>
          </div>
          <div class="wrap_inp">
            <fieldset>
              <legend>Серія та номер диплома</legend>
              <input type="text" v-model="user.diploma" class="profile_input">
            </fieldset>
          </div>
          <div class="wrap_inp">
            <fieldset>
              <legend>Початок професійної діяльності</legend>
              <input type="date" :v-model="user.date" class="profile_input">
            </fieldset>
          </div>
          <div class="wrap_inp" :class="{ errorInput: v$.user.job_place.$error }">
            <fieldset :class="{ errorInput: v$.user.job_place.$error }">
              <legend>Місце роботи  <span title="обов'язкове">*</span></legend>
              <input
                type="text" class="profile_input"
                v-model="user.job_place"
                :class="{ error: v$.user.job_place }"
                @change="v$.user.job_place.$touch()"
              />

            </fieldset>
            <p class="errorText" v-if="v$.user.job_place.required.$invalid">
              Filed is required
            </p>
          </div>
          <!-- <div class="wrap_inp">
            <fieldset>
              <legend>Місце роботи <span title="обов'язкове">*</span></legend>
              <input type="text" v-model="user.job_place" class="profile_input">
            </fieldset>
            
          </div> -->
          <div
            class="wrap_inp"
            :class="{ errorInput: v$.user.specialization.$error }"
          >
            <fieldset :class="{ errorInput: v$.user.specialization.$error }">
              <legend>Спеціальність <span title="обов'язкове">*</span></legend>
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
          <div
            class="wrap_inp"
            :class="{ errorInput: v$.user.job_name.$error }"
          >
            <fieldset :class="{ errorInput: v$.user.job_name.$error }">
              <legend>Посада <span title="обов'язкове">*</span></legend>
              <input
                type="text"
                v-model="user.job_name"
                class="profile_input"
                :class="{ error: v$.user.job_name }"
                @change="v$.user.job_name.$touch()"
              >
            </fieldset>
            <p class="errorText" v-if="v$.user.job_name.required.$invalid">
              Filed is required
            </p>
          </div>
          <!--          <fieldset>-->
          <!--            <legend>Робочий номер телефону *</legend>-->
          <!--            <input type="text" v-model="user.email" class="profile_input">-->
          <!--          </fieldset>-->
        </div>
        <div class="profile_success">
          <button class="profile_btn">Зберегти</button>
        </div>
      </form>
      <ResetPass/>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, email, numeric } from '@vuelidate/validators'
import ResetPass from '@/components/ResetPass'
import preloader from '@/components/UI/Preloader.vue'
export default {
  components: {
    ResetPass,
    preloader
  },
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      loading: false,
      myAcc: [],
      specializationList: [],
      user: {
        // id: '',
        email: '',
        full_name: 'None',
        first_name: '',
        last_name: '',
        patronymic: null,
        phone: '',
        work_phone: null,
        birth_date: null,
        region: '',
        town: '',
        start_activity_date: null,
        college: null,
        diploma: null,
        job_place: '',
        job_name: '',
        specialization: null,
        specialization_name: '',
        email_confirmed: false
      }
    }
  },
  validations () {
    return {
      user: {
        first_name: {
          required
        },
        last_name: {
          required
        },
        patronymic: {
          required
        },
        region: {
          required
        },
        town: {
          required
        },
        phone: {
          required,
          numeric,
          minLength: minLength(1)
        },
        email: {
          required,
          email
        },
        specialization: {
          required
        },
        job_name: {
          required
        },
        job_place: {
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
      this.v$.user.job_name.$touch()
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
        !this.v$.user.job_name.$invalid && 
        !this.v$.user.job_place.$invalid) {
          this.loading = true
          await axios({
            url: 'https://asprof-test.azurewebsites.net/api/me/',
            data: this.user,
            method: 'PATCH',
            headers: {
              Authorization: 'Bearer ' + this.$store.getters.getToken
            }
          }).then(respons => {
            const res = respons.data
            this.$store.dispatch('setMyAcc', res)
            this.$message('Дані успішно змінені')
            // this.messages = res;
          })
            .catch(error => {
              console.log(error)
              this.$message('Помилка')
            })
            .finally(() => (this.loading = false))
      } 
    },
    async getNotify () {
      this.loading = true
      await axios({
        method: 'GET',
        url: ('https://asprof-test.azurewebsites.net/api/me/'),
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getToken
        }
      }).then(respons => {
        const res = respons.data
        this.$store.dispatch('setMyAcc', res)
        // this.messages = res;
      })
        .catch(error => {
          console.log(error)
        })
        .finally(() => (this.loading = false))
      this.myAcc = this.$store.getters.getMyAcc
      this.specializationList = this.$store.getters.getSpecialization
      // this.user.id = this.myAcc.id
      this.user.email = this.myAcc.email
      this.user.full_name = this.myAcc.full_name
      this.user.first_name = this.myAcc.first_name
      this.user.last_name = this.myAcc.last_name
      this.user.patronymic = this.myAcc.patronymic
      this.user.phone = this.myAcc.phone
      this.user.work_phone = this.myAcc.work_phone
      this.user.birth_date = this.myAcc.birth_date
      this.user.region = this.myAcc.region
      this.user.town = this.myAcc.town
      this.user.start_activity_date = this.myAcc.start_activity_date
      this.user.college = this.myAcc.college
      this.user.diploma = this.myAcc.diploma
      this.user.job_place = this.myAcc.job_place
      this.user.job_name = this.myAcc.job_name
      this.user.specialization = this.myAcc.specialization
      this.user.specialization_name = 'Хирург'
    }
  }
}
</script>
<style scoped src="@/assets/lc/css/style.css">
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

legend span {
  color: red;
  font-size: 15px;
}
</style>
