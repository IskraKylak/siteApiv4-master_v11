<template>
  <div class="container">
    <!--    {{ questions }}     -->
    <div class="profile_success">
      <router-link :to="'/lc-updateevents/'+ proId" class="back_btn">Назад</router-link>
      <h1 class="title_event">Редагування тесту до події</h1>
      <div class="list_question">
        <div class="item_question" v-for="(quest, idx) in questions" :key="idx">
          <p>Питання "{{ idx + 1 }}"</p>
          <div class="wrap_input_q">
            <button class="remove_btn" v-on:click="removeQuestion(quest.id)">
              <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
              </svg>
            </button>
            <div class="wrap_input">
              <label :for="'input' + (idx + 1)">Назва питання</label>
              <input :id="'input' + (idx + 1)" type="text" v-model="quest.title" v-on:keyup="addSaveQuestion(idx)">
            </div>
          </div>
          <p>Тип питання "{{ idx + 1 }}"</p>
          <div class="wrap_type_question">
            <div class="wrap_radio">
              <input type="radio" :id="'radio'+ (idx + 1)" v-on:click="vubor(quest, false)" :name="'radio'+ (idx + 1)"
                     :checked="!quest.multiple_answers">
              <label :for="'radio'+ (idx + 1)" class="jss54 jss56">
                <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                </svg>
                <svg class="MuiSvgIcon-root jss55" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"></path>
                </svg>
              </label>
              <label :for="'radio'+ (idx + 1)" class="radioName">Одиничний вибір</label>
            </div>
            <div class="wrap_radio">
              <input type="radio" :id="'radio1'+ (idx + 1)" v-on:click="vubor(quest, true)" :name="'radio'+ (idx + 1)"
                     :checked="quest.multiple_answers">
              <label :for="'radio1'+ (idx + 1)" class="jss54 jss56">
                <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                </svg>
                <svg class="MuiSvgIcon-root jss55" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"></path>
                </svg>
              </label>
              <label :for="'radio1'+ (idx + 1)" class="radioName">Множинний вибір</label>
            </div>
          </div>
          <!--          update          -->
          <button class="btn_update" v-if="quest.update" v-on:click="updateQuestion(idx)">
            <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"></path>
            </svg>
          </button>
          <p>Відповіді до питання "{{ idx + 1 }}"</p>
          <!--          цыкл ответов           -->
          <div class="wrap_answer" v-for="(ansver, idx_2) in quest.answers_set" :key="idx_2">
            <!--            Radio           -->
            <div class="wrap_radio" v-if="quest.multiple_answers === false">
              <input type="radio" :id="(idx + 1) + 'radio'+ (idx_2 + 1)" :name="'name' + idx"
                     v-on:click="is_correct(idx ,idx_2, quest.answers_set)" :checked="ansver.is_correct" >
              <label :for="(idx + 1) + 'radio'+ (idx_2 + 1)" class="jss54 jss56">
                <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                </svg>
                <svg class="MuiSvgIcon-root jss55" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"></path>
                </svg>
              </label>
            </div>
            <!--         Checkbox           -->
            <label v-if="quest.multiple_answers === true" class="wrap_check_radio"
                   :for="(idx + 1) + 'check'+ (idx_2 + 1)">
              <input type="checkbox" v-model="ansver.is_correct"
                     v-on:click="quest.updateAnsver = true; ansver.update = true" :id="(idx + 1) + 'check'+ (idx_2 + 1)"
                     :name="'name' + idx">
              <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
              </svg>
            </label>

            <div class="wrap_input">
              <input type="text" v-model="ansver.title" v-on:keyup="quest.updateAnsver = true; ansver.update = true">
            </div>
            <button class="remove_btn" v-on:click="removeAnsver(quest.id, ansver.id)">
              <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
              </svg>
            </button>
          </div>
          <div class="wrap_add_answer">
            <div @click.prevent="addAnsver(idx)" class="btn_add_answer">
              Додати відповідь
            </div>
            <button class="btn_update" v-if="quest.updateAnsver" v-on:click="putAnsver(quest)">
              <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"></path>
              </svg>
            </button>
          </div>

        </div>
      </div>
      <button @click.prevent="addQuest()" class="profile_btn">Додати питання</button>
    </div>
  </div>
</template>
<script>
// import question from '@/components/Question.vue'

import axios from 'axios'

export default {
  props: ['content'],
  data () {
    return {
        test: {
            name: '',
            result: '',
            questionsList: '',
            questionsId: '',
            questionsAnsverList: '',
            questionsAnsverId: '',
        },
      proId: this.$route.params.Pid,
      questions: []
    }
  },
  created () {
    this.getNotify()
  },
  methods: {
    // Обновление вопроса
    async putAnsver (quest) {
      var done = false
      for (let i = 0; i < quest.answers_set.length; i++) {
        if (quest.answers_set[i].update) {
          let elem = {
            title: quest.answers_set[i].title,
            is_correct: quest.answers_set[i].is_correct
          }

 
          let api = `https://asprof-test.azurewebsites.net/api/${this.content}/${this.proId}/test/questions/${quest.id}/answers/${quest.answers_set[i].id}/`


          await axios({
            method: 'PUT',
            url: (api),
            data: elem,
            headers: {
              Authorization: 'Bearer ' + this.$store.getters.getToken
            }
          })
            .then(respons => {
              done = true
            })
            .catch(error => {
              done = false
              console.log(error)
            })
            .finally(() => (this.loading = false))
        }
      }
      if (done) {
        this.$message('Дані змінено!')
        this.getNotify()
      } else {
        this.$message('Помилка')
        this.getNotify()
      }
    },
    async updateQuestion (idx) {
      var elem = {
        title: this.questions[idx].title,
        multiple_answers: this.questions[idx].multiple_answers,
      }
      // console.log(elem)

      let api = `https://asprof-test.azurewebsites.net/api/${this.content}/${this.proId}/test/questions/${this.questions[idx].id}/`

      await axios({
        method: 'PUT',
        url: (api),
        data: elem,
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getToken
        }
      })
        .then(respons => {
          this.$message('Дані змінено!')
          this.getNotify()
        })
        .catch(error => {
          this.$message('Помилка')
          console.log(error)
        })
        .finally(() => (this.loading = false))
    },
    addSaveQuestion (idx) {
      this.questions[idx].update = true
    },
    // удаление вопросов/ответов
    async removeAnsver (idx, idxA) {

      let api = `https://asprof-test.azurewebsites.net/api/${this.content}/${this.proId}/test/questions/${idx}/answers/${idxA}/`


      await axios({
        method: 'DELETE',
        url: (api),
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getToken
        }
      })
        .then(respons => {
          this.$message('Дані видалено!')
          this.getNotify()
        })
        .catch(error => {
          this.$message('Помилка')
          console.log(error)
        })
        .finally(() => (this.loading = false))
    },
    async removeQuestion (idx) {

      let api = `https://asprof-test.azurewebsites.net/api/${this.content}/${this.proId}/test/questions/${idx}/`

      await axios({
        method: 'DELETE',
        url: (api),
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getToken
        }
      })
        .then(respons => {
          this.$message('Дані видалено!')
          this.getNotify()
        })
        .catch(error => {
          this.$message('Помилка')
          console.log(error)
        })
        .finally(() => (this.loading = false))
    },
    // ---------------------------
    async getNotify () {
      // this.loading = true

      let api = `https://asprof-test.azurewebsites.net/api/${this.content}/${this.proId}/test/questions/`

      this.myAcc = this.$store.getters.getMyAcc
      await axios({
        method: 'GET',
        url: (api),
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getToken
        }
      })
        .then(respons => {
          // console.log(respons.data)
          this.questions = respons.data
          for (let i = 0; i < this.questions.length; i++) {
            this.questions[i].update = false
            this.questions[i].updateAnsver = false
            for (let x = 0; x < this.questions[i].answers_set.length; x++) {
              this.questions[i].answers_set[x].update = false
            }
          }
          // this.$store.dispatch('setSingleEvent', respons.data)
          // console.log(typeof this.$store.getters.getSingleEvent.id)
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => (this.loading = false))
    },
    // Одиничний вибір
    is_correct (idxQ, idx, elem) {
      this.questions[idxQ].updateAnsver = true

      for (var i = 0; i < elem.length; i++) {
        elem[i].is_correct = false
        if (i == idx) {
          elem[i].is_correct = true
          elem[i].update = true
        }
      }
    },
    // Тип питання
    vubor (elem, val) {
      elem.multiple_answers = val
      elem.update = true
    },
    // Додати відповідь\питання
    async addAnsver (idx) {
      for (let i = 0; i < this.questions[idx].answers_set.length; i++) {
        if (this.questions[idx].answers_set[i].update) {
          var elem2 = {
            title: this.questions[idx].answers_set[i].title,
            is_correct: this.questions[idx].answers_set[i].is_correct
          }

          let api = `https://asprof-test.azurewebsites.net/api/${this.content}/${this.proId}/test/questions/${this.questions[idx].id}/answers/${this.questions[idx].answers_set[i].id}/`
                
          await axios({
            method: 'PUT',
            url: (api),
            data: elem2,
            headers: {
              Authorization: 'Bearer ' + this.$store.getters.getToken
            }
          })
            .then(respons => {
            })
            .catch(error => {
              console.log(error)
            })
            .finally(() => (this.loading = false))
        }
      }
      var elem = {
        title: '',
        is_correct: false
      }


      let api = `https://asprof-test.azurewebsites.net/api/${this.content}/${this.proId}/test/questions/${this.questions[idx].id}/answers/`


      await axios({
        url: api,
        method: 'POST',
        data: elem,
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getToken
        }
      }).then(respons => {
        this.$message('Відповідь додано!')
        this.getNotify()
      })
        .catch(error => {
          console.log(error)
          this.$message('Помилка')
        })
    },
    async addQuest () {
      var elem = {
        // id: this.questions.length + 1,
        title: '',
        multiple_answers: true
        // answers_set: []
      }
      let api = ''
      if(this.content === 'courses') {
        api = `https://asprof-test.azurewebsites.net/api/${this.content}/${this.proId}/test/questions/`
      } else {
        api = `https://asprof-test.azurewebsites.net/api/${this.content}/${this.proId}/test/questions/`
      }
      

      // console.log(elem)
      await axios({
        url: api,
        method: 'POST',
        data: elem,
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getToken
        }
      }).then(respons => {
        this.$message('Дані додані')
        this.getNotify()
        // this.messages = res;
      })
        .catch(error => {
          console.log(error)
          this.$message('Помилка')
        })
    }
  }
}
</script>

<style scoped src="@/assets/lc/css/style.css">
</style>

<style lang="scss">

.wrap_add_answer {
  display: flex;
  align-items: center;

  .btn_update {
    margin-left: 10px;
    margin-bottom: 0;
    margin-right: 0;
  }
}

.btn_update {
  margin-bottom: 10px;
  max-width: 64px;
  min-width: 64px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1faeea;
  color: #fff;
  border-radius: 4px;
  transition: all 0.3s ease;
  margin-right: 15px;

  &:hover {
    background: #303f9f;
  }

  svg {
    max-width: 24px;
    min-width: 24px;
    height: 24px;
    fill: #fff;
  }
}

.wrap_type_question {
  display: flex;
}

.wrap_radio {
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 20px;
  margin-bottom: 20px;

  input[type=radio] {
    opacity: 1;
    position: absolute;
    top: 0;
    left: 0;
    max-width: 0px;
    min-width: 0px;
    height: 0px;
    margin: 0;
    cursor: pointer;
  }

  input:checked ~ label.jss54 svg:nth-child(1) {
    fill: #1faeea;
  }

  input:checked ~ label.jss54 svg:nth-child(2) {
    fill: #1faeea;
    opacity: 1;
  }

  label.radioName {
    font-size: 1rem;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    cursor: pointer;
  }

  label.jss54 {
    margin-right: 5px;
    display: block;
    max-width: 24px;
    min-width: 24px;
    height: 24px;
    border-radius: 50%;
    position: relative;
    cursor: pointer;
    overflow: hidden;

    svg:nth-child(1) {
      width: 100%;
      height: 100%;
      fill: rgba(0, 0, 0, 0.54);
    }

    svg:nth-child(2) {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      fill: rgba(0, 0, 0, 0.54);
      opacity: 0;
    }
  }

  //input:not(checked)~.label.jss54 {
  //  display: none;
  //}
}

.btn_add_answer {
  height: 35px;
  max-width: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background: #1faeea;
  text-transform: uppercase;
  border-radius: 3px;
  padding: 0 10px;
  cursor: pointer;
  margin-left: auto;

  &:hover {
    background: #303f9f;
    transition: all 0.3s linear;
  }
}

.back_btn {
  font-size: 16px;
  padding: 8px 22px;
  color: rgba(0, 0, 0, .87);
  box-shadow: 0 3px 1px -2px #fff, 0 2px 2px 0 #fff, 0 1px 5px 0 #fff;
  background-color: #e0e0e0;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: .02857em;
  font-weight: 500;
  line-height: 1.75;
  text-decoration: none;
}

.item_question {
  p {
    color: rgba(0, 0, 0, 0.54);
    font-weight: normal;
    font-size: 16px;
    margin-bottom: 10px;
  }
}

.wrap_input_q,
.wrap_answer {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .wrap_radio {
    margin-bottom: 0;
    margin-right: 0;
  }

  .wrap_check_radio {
    max-width: 18px;
    min-width: 18px;
    height: 18px;
    border-radius: 3px;
    border: 2px solid rgba(0, 0, 0, 0.54);
    margin-right: 10px;
    cursor: pointer;
    position: relative;

    input[type=checkbox],
    input[type=radio] {
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      max-width: 0px;
      min-width: 0px;
      height: 0px;
      margin: 0;
      cursor: pointer;
    }

    input:not(checked) ~ .MuiSvgIcon-root {
      display: none;
    }

    input:checked ~ .MuiSvgIcon-root {
      display: block;
      max-width: 24px;
      min-width: 24px;
      height: 24px;
      position: absolute;
      top: -5px;
      left: -5px;
      fill: #1faeea;
    }
  }

  .wrap_input {
    position: relative;
    flex: 1 1 auto;

    label {
      position: absolute;
      background: #fafafa;
      top: -14px;
      left: 32px;
      padding: 4px;
      color: rgba(0, 0, 0, 0.54);
      font-weight: normal;
    }

    input {
      background: transparent;
      height: 56px;
      width: 100%;
      border: 1px solid rgba(0, 0, 0, 0.23);
      border-radius: 5px;
      padding: 0 15px;

      &:hover {
        border: 1px solid #000;
      }

      &:focus {
        border: 2px solid #1faeea;
      }
    }
  }
}

.wrap_input input {
  margin: 0;
}

.wrap_answer {
  .remove_btn {
    margin-right: 0;
    margin-left: 10px;
  }
}

.remove_btn {
  max-width: 64px;
  min-width: 64px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f50057;
  color: #fff;
  border-radius: 4px;
  transition: all 0.3s ease;
  margin-right: 15px;

  &:hover {
    background: #c51162;
  }

  svg {
    max-width: 24px;
    height: 24px;
    fill: #fff;
  }
}
</style>
