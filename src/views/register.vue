  <template>
  <div class="container">
    <div v-if="!isRegister" class="wrap_form_reg">
      <h2 class="title_form">{{$t("register.title")}}</h2>
      <form @submit.prevent="onSubmit">
        <p>{{$t("register.subtitle1")}}</p>
<!--        {{ v$.surname }}-->
        <div class="wrap_form_row">
          <div class="form-item" :class="{ errorInput: v$.surname.$error }">
            <input
              v-model="surname"
              :class="{ error: v$.surname.$error }"
              @change="v$.surname.$touch()"
              :placeholder="$t('register.palaceHolder.surname')"
            />
            <p class="errorText" v-if="v$.surname.required.$invalid">
              Filed is required
            </p>
            <p class="errorText" v-if="v$.surname.minLength.$invalid">
              Surname mast have at least
              {{ v$.surname.minLength.$params.min }} !
            </p>
          </div>
          <div class="form-item" :class="{ errorInput: v$.name.$error }">
            <input
              v-model="name"
              :class="{ error: v$.name.$error }"
              @change="v$.name.$touch()"
              :placeholder="$t('register.palaceHolder.name')"
            />
            <p class="errorText" v-if="v$.name.required.$invalid">
              Filed is required
            </p>
            <p class="errorText" v-if="v$.name.minLength.$invalid">
              Name mast have at least {{ v$.name.minLength.$params.min }} !
            </p>
          </div>
          <div class="form-item" :class="{ errorInput: v$.middleName.$error }">
            <input
              v-model="middleName"
              :class="{ error: v$.middleName.$error }"
              @change="v$.middleName.$touch()"
              :placeholder="$t('register.palaceHolder.middleName')"
            />
            <p class="errorText" v-if="v$.middleName.required.$invalid">
              Filed is required
            </p>
            <p class="errorText" v-if="v$.middleName.minLength.$invalid">
              Surname mast have at least
              {{ v$.middleName.minLength.$params.min }} !
            </p>
          </div>
        </div>
        <p>{{$t("register.subtitle2")}}</p>
        <div class="wrap_form_row">
          <div
            class="form-item"
            :class="{ errorInput: v$.selectedRegions.$error }"
          >
            <select
              v-model="selectedRegions"
              :class="{ error: v$.selectedRegions.$error }"
              @change="v$.selectedRegions.$touch()"
              :placeholder="$t('register.palaceHolder.selectedRegions')"
            >
              <option value="" disabled selected>{{ $t('register.palaceHolder.selectedRegions') }}</option>
              <option
                v-for="region in regions"
                :value="region.name"
                :key="region.name"
              >
                {{ region.name }}
              </option>
            </select>
            <p class="errorText" v-if="v$.selectedRegions.required.$invalid">
              Filed is required
            </p>
          </div>
          <div class="form-item" :class="{ errorInput: v$.locality.$error }">
            <input
              v-model="locality"
              :class="{ error: v$.locality.$error }"
              @change="v$.locality.$touch()"
              :placeholder="$t('register.palaceHolder.locality')"
            />
            <p class="errorText" v-if="v$.locality.required.$invalid">
              Filed is required
            </p>
            <p class="errorText" v-if="v$.locality.minLength.$invalid">
              Surname mast have at least
              {{ v$.locality.minLength.$params.min }} !
            </p>
          </div>
        </div>
        <p>{{$t("register.subtitle3")}}</p>
        <div class="wrap_form_row">
          <div
            class="form-item"
            :class="{ errorInput: v$.selectedSpeciality.$error }"
          >
            <select
              v-model="selectedSpeciality"
              :class="{ error: v$.selectedSpeciality.$error }"
              @change="v$.selectedSpeciality.$touch()"
              :placeholder="$t('register.palaceHolder.selectedSpeciality')"
            >
              <option value="" disabled selected>{{ $t('register.palaceHolder.selectedSpeciality') }}</option>
              <option
                v-for="spec in speciality"
                :value="spec.id"
                :key="spec.name"
              >
                {{ spec.name }}
              </option>
            </select>
            <p class="errorText" v-if="v$.selectedSpeciality.required.$invalid">
              Filed is required
            </p>
          </div>
          <div class="form-item" :class="{ errorInput: v$.work.$error }">
            <input
              v-model="work"
              :class="{ error: v$.work.$error }"
              @change="v$.work.$touch()"
              :placeholder="$t('register.palaceHolder.work')"
            />
            <p class="errorText" v-if="v$.work.required.$invalid">
              Filed is required
            </p>
            <p class="errorText" v-if="v$.work.minLength.$invalid">
              Surname mast have at least
              {{ v$.work.minLength.$params.min }} !
            </p>
          </div>
          <div class="form-item" :class="{ errorInput: v$.position.$error }">
            <input
              v-model="position"
              :class="{ error: v$.position.$error }"
              @change="v$.position.$touch()"
              :placeholder="$t('register.palaceHolder.position')"
            />
            <p class="errorText" v-if="v$.position.required.$invalid">
              Filed is required
            </p>
            <p class="errorText" v-if="v$.position.minLength.$invalid">
              Surname mast have at least
              {{ v$.position.minLength.$params.min }} !
            </p>
          </div>
        </div>
        <p>{{$t("register.subtitle4")}}</p>
        <div class="wrap_form_row">
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
          <div class="form-item" :class="{ errorInput: v$.tel.$error }">
            <input
              v-model="tel"
              :class="{ error: v$.tel.$error }"
              @change="v$.tel.$touch()"
              :placeholder="$t('register.palaceHolder.tel')"
            />
            <p class="errorText" v-if="v$.tel.required.$invalid">
              Filed is required
            </p>
            <p class="errorText" v-if="v$.tel.numeric.$invalid">
              You phone is not correct
            </p>
            <p class="errorText" v-if="v$.tel.minLength.$invalid">
              Tel mast have at least
              {{ v$.tel.minLength.$params.min }} !
            </p>
          </div>
        </div>
        <p>{{$t("register.subtitle5")}}</p>
        <div class="wrap_form_row">
          <div class="form-item" :class="{ errorInput: v$.password1.$error }">
            <input
              type="password"
              v-model="password1"
              :class="{ error: v$.password1.$error }"
              @change="v$.password1.$touch()"
              :placeholder="$t('register.palaceHolder.password')"
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
              :placeholder="$t('register.palaceHolder.password')"
            />
            <p class="errorText"  v-if="v$.password2.sameAsPassword.$params.equalTo">Password and Confirm Password should match</p>
            <p class="errorText" v-if="v$.password2.required.$invalid">
              Filed is required
            </p>
          </div>
        </div>
        <button class="my_btn" >{{$t("register.btnName")}}</button>
      </form>
    </div>
    <div v-else class="container reg-success">
      <h2>
        {{$t('register.success')}}
      </h2>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, email, numeric, sameAs } from '@vuelidate/validators'
import axios from 'axios'

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      isRegister: false,
      surname: '',
      name: '',
      middleName: '',
      regions: [
        { name: 'Автономна Республіка Крим' },
        { name: 'Вінницька' },
        { name: 'Волинська' },
        { name: 'Дніпропетровська' },
        { name: 'Донецька' },
        { name: 'Житомирська' },
        { name: 'Закарпатська' },
        { name: 'Запорізька' },
        { name: 'Івано-Франківська' },
        { name: 'Київ' },
        { name: 'Київська' },
        { name: 'Кіровоградська' },
        { name: 'Луганська' },
        { name: 'Львівська' },
        { name: 'Миколаївська' },
        { name: 'Одеська' },
        { name: 'Полтавська' },
        { name: 'Рівненська' },
        { name: 'Севастополь' },
        { name: 'Сумська' },
        { name: 'Тернопільська' },
        { name: 'Харківська' },
        { name: 'Херсонська' },
        { name: 'Хмельницька' },
        { name: 'Черкаська' },
        { name: 'Чернівецька' },
        { name: 'Чернігівська' }
      ],
      selectedRegions: '',
      locality: '',
      speciality: [],
      selectedSpeciality: '',
      work: '',
      position: '',
      email: '',
      tel: '',
      password1: '',
      password2: ''
    }
  },
  created () {
    this.speciality = this.$store.getters.getSpecialization
    if(this.$store.getters.getToken !== '') {
      this.$router.push("/lc-profile")
    }
  },
  validations () {
    return {
      isRegister: false,
      surname: {
        required,
        minLength: minLength(4),
      },
      name: {
        required,
        minLength: minLength(4),
      },
      middleName: {
        required,
        minLength: minLength(4),
      },
      selectedSpeciality: {
        required,
      },
      selectedRegions: {
        required,
      },
      locality: {
        required,
        minLength: minLength(4),
      },
      work: {
        required,
        minLength: minLength(4),
      },
      position: {
        required,
        minLength: minLength(4),
      },
      password1: {
        required,
        minLength: minLength(4),
      },
      password2: {
        required,
        // minLength: minLength(4),
        sameAsPassword: sameAs(this.password1)
      },
      tel: {
        required,
        numeric,
        minLength: minLength(1),
      },
      email: {
        required,
        email,
      },
    }
  },
  methods: {
    onSubmit () {
      this.v$.$touch()
      if (!this.v$.$invalid) {
        const user1 = {
          email: this.email,
          password: this.password1,
          first_name: this.name,
          last_name: this.surname,
          patronymic: this.middleName,
          phone: this.tel,
          work_phone: "",
          birth_date: null,
          region: this.selectedRegions,
          town: this.locality,
          start_activity_date: null,
          college: "",
          diploma: "",
          job_place: this.work,
          job_name: this.selectedSpeciality,
          specialization: null,
          lang: "uk"
        }
        if(this.$i18n.locale != 'ua')
          user1.lang = this.$i18n.locale
        this.$store.dispatch('register', user1)
        .then(() => {
          this.isRegister = true;
        })
        .catch()
      }
    },
  },
}
</script>
<style scoped src="@/assets/css/screen.css">
</style>
<style scoped lang="scss">
.reg-success {
  text-align: center;
  padding: 50px 0;
}

.wrap_form_reg {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    width: 100%;
    padding: 50px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .form-item {
      width: 100%;
      margin-bottom: 30px;

      &.errorInput {
        margin-bottom: 10px;
      }

      input,
      select {
        width: 100%;
        height: 44px;
        padding: 0 20px;
      }
    }
  }
}

.wrap_form_row {
  margin-top: 20px;
  width: 100%;
  display: grid;
  grid-template-columns: calc(33% - 20px) calc(33% - 20px) calc(33% - 20px);
  grid-gap: 20px;
  justify-content: space-between;

  &:nth-of-type(2),
  &:nth-of-type(4),
  &:nth-of-type(5) {
    grid-template-columns: calc(50% - 20px) calc(50% - 20px);
  }
}

.form-item .errorText {
  display: none;
  margin-top: 5px;
  font-size: 13px;
  color: rgb(207, 86, 86);
}

.form-item.errorInput .errorText {
  display: block;
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

// .form-item p {
//   display: block;
//   margin-top: 5px;
//   line-height: 15px;
// }
</style>
