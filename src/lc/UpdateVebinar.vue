<template>
  <div class="wrap_preloader lc" v-if="loading">
    <preloader :width="90" :height="90"></preloader>
  </div>
  <div class="container">
    <div class="profile_success">
      <router-link to="/lc-vebinar" class="back_btn">Назад</router-link>
    </div>
    <div class="wrap_title">
      <h1 class="title_event">Редагування вебінару</h1>
      <swicherLang @changeLang="changeLang" />
    </div>
    <form v-if="myAcc.role === 'admin' && !loading" @submit.prevent="onSubmit">
      <fieldset>
        <legend>Назва вебінару <span title="обов'язкове">*</span></legend>
        <input type="text" class="profile_input" v-model="singleEvent.name">
      </fieldset>

      <legend class="dropzone_title">Опис вебінару <span title="обов'язкове">*</span></legend>
          <editor
            api-key="iu3f89j47o5ydom6c8ci9rih8nrow5z0hkbbzcblkmjz7li8"
            :init="{
              height: 500,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              paste_data_images: true,
            }"
            v-model="singleEvent.description"
          />
      <fieldset>
        <legend>Дати проведення вебінару (Початок) <span title="обов'язкове">*</span></legend>
        <input type="datetime-local" v-model="singleEvent.start_date" class="profile_input">
      </fieldset>

      <fieldset>
        <legend>Дати проведення вебінару (Кінець) <span title="обов'язкове">*</span></legend>
        <input type="datetime-local" v-model="singleEvent.end_date" class="profile_input">
      </fieldset>

      <fieldset>
        <legend>Дата закриття доступу до тестування</legend>
        <input type="datetime-local" v-model="singleEvent.testing_end_date" class="profile_input">
      </fieldset>

      <fieldset>
        <legend>Кількість годин</legend>
        <input type="text" v-model="singleEvent.number_of_hours" class="profile_input">
      </fieldset>

      <fieldset>
        <legend>Місце проведення</legend>
        <input type="text" v-model="singleEvent.place" class="profile_input">
      </fieldset>
      <div class="draft">
        <input type="checkbox" class="checkbox" id="checkbox3" v-model="singleEvent.is_free"/>
        <label for="checkbox3">Безкоштовна вебінар</label>
      </div>
      <div class="draft">
        <input type="checkbox" class="checkbox" id="checkbox2" v-model="singleEvent.need_pay"/>
        <label for="checkbox2">Платний вебінар</label>
      </div>

      <fieldset>
        <legend>Ціна (грн.)</legend>
        <input type="text" v-model="singleEvent.price" class="profile_input">
      </fieldset>

      <div class="draft">
        <input type="checkbox" class="checkbox" id="checkbox" v-model="singleEvent.is_draft"/>
        <label for="checkbox">Чернетка</label>
      </div>

      <p class="dropzone_title">Зображення для сторінки події</p>
      <div class="d-none">
        <input class="form-control" ref="fileInput2" type="file" @input="pickFile2">
      </div>
      <div class="wrap_inp_fiel">
        <div class="imagePreviewWrapper"
             :style="previewFile.val != null ? { 'background-image': `url(${previewFile.val})`, 'background-color': `#fff` } : ''"
             @click="selectFile">
        </div>
        <span>
        Натисніть сюди для завантаження файлу
        <svg class="MuiSvgIcon-root MuiDropzoneArea-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path
          d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path></svg>
      </span>
      </div>

      <!-- <p class="dropzone_title">Файл для події</p>
      <div class="d-none">
        <input accept="image/x-png,image/gif,image/jpeg" class="form-control" ref="fileInput" type="file"
               @input="pickFile">
      </div>
      <div class="wrap_inp_fiel">
        <div class="imagePreviewWrapper"
             :style="previewImage.val != null ? { 'background-image': `url(${previewImage.val})`, 'background-color': `#fff` } : ''"
             @click="selectImage">
        </div>
        <span>
        Натисніть сюди для завантаження файлу
        <svg class="MuiSvgIcon-root MuiDropzoneArea-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path
          d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path></svg>
      </span>
      </div> -->

      <legend class="dropzone_title">Основний текст події <span title="обов'язкове">*</span></legend>
          <editor
            api-key="iu3f89j47o5ydom6c8ci9rih8nrow5z0hkbbzcblkmjz7li8"
            :init="{
              height: 500,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              paste_data_images: true,
            }"
            v-model="singleEvent.text"
          />

      <div class="radio_block">
        <input type="checkbox" class="custom-checkbox" id="happy" v-model="singleEvent.private">
        <label for="happy">Закритий вебінар</label>
      </div>

      <p class="dropzone_title">Спеціалізації користувачів, які можуть брати участь у навчанні</p>
      <div class="wrap_inp">
        <fieldset>
          <select multiple
                  v-model="singleEvent.specializations"
          >
            <option
              v-for="spec in specializationList"
              :value="spec.id"
              :key="spec.name"
            >
              {{ spec.name }}
            </option>
          </select>
        </fieldset>
      </div>

      <fieldset>
        <legend>First Youtube ID</legend>
        <input type="text" v-model="singleEvent.youtube_id" class="profile_input">
      </fieldset>
      <!-- <fieldset>
        <legend>Second Youtube ID</legend>
        <input type="text" v-model="singleEvent.youtube_id_2" class="profile_input">
      </fieldset> -->

      <fieldset>
        <legend>Процент правильних відповідей для проходження тесту</legend>
        <input type="text" v-model="singleEvent.success_percent" class="profile_input">
      </fieldset>

      <fieldset>
        <legend>Кількість спроб пройти тестування (0 - безліч)</legend>
        <input type="text" v-model="singleEvent.max_tries" class="profile_input">
      </fieldset>

      <fieldset>
        <legend>Балів за подію</legend>
        <input type="text" v-model="singleEvent.points" class="profile_input">
      </fieldset>

      <!-- <fieldset>
        <legend>Название сертификата</legend>
        <input type="text" v-model="singleEvent.certificate_title" class="profile_input">
      </fieldset> -->

      <!-- <p class="dropzone_title">Мова</p>
      <div class="radio_block radio_block1_update_evenets">
        <div class="radio radio_item">
          <input class="custom-radio" type="radio" id="color-1">
          <label for="color-1">Українська</label>
        </div>

        <div class="radio radio_item">
          <input class="custom-radio" type="radio" id="color-2">
          <label for="color-2">Русский</label>
        </div>

        <div class="radio radio_item">
          <input class="custom-radio" type="radio" id="color-3">
          <label for="color-3">English</label>
        </div>
      </div> -->

      <!-- <p class="dropzone_title">Шаблон інтерактивної виставки</p>
      <div class="d-none">
        <input accept="image/x-png,image/gif,image/jpeg" class="form-control" ref="fileInput3" type="file"
               @input="pickFile3">
      </div>
      <div class="wrap_inp_fiel">
        <div class="imagePreviewWrapper"
             :style="previewIneractive.val != null ? { 'background-image': `url(${previewIneractive.val})`, 'background-color': `#fff` } : ''"
             @click="selectInteractive">
        </div>
        <span>
        Натисніть сюди для завантаження файлу
        <svg class="MuiSvgIcon-root MuiDropzoneArea-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path
          d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path></svg>
      </span>
      </div> -->

      <!--    <p class="dropzone_title">Подія</p>-->
      <!--    <div class="radio_block radio_block1_update_evenets">-->
      <!--      <div class="radio radio_item">-->
      <!--        <input class="custom-radio" type="radio" id="nofree" name="color" value="indigo">-->
      <!--        <label for="nofree">Платное</label>-->
      <!--      </div>-->

      <!--      <div class="radio radio_item">-->
      <!--        <input class="custom-radio" type="radio" id="free" name="color" value="red">-->
      <!--        <label for="free">Бесплатное</label>-->
      <!--      </div>-->
      <!--    </div>-->
      <!--    <fieldset>-->
      <!--      <legend>Вартість події *</legend>-->
      <!--      <input type="text" class="profile_input" required>-->
      <!--    </fieldset>-->

      <!--    <fieldset>-->
      <!--      <legend>Балів за подію</legend>-->
      <!--      <input type="text" class="profile_input">-->
      <!--    </fieldset>-->

      <!--    <fieldset>-->
      <!--      <legend>Максимальна кількість глядачів</legend>-->
      <!--      <input type="number" class="profile_input">-->
      <!--    </fieldset>-->
      <!--    &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
      <!-- <h1 class="title_update_table_events">Список партнеров</h1>
      <div class="content-regulations">
        <div class="tabs">
          <label
            :for="item.for"
            v-for="item in tabs"
            :key="item.for"
            ref='tabs'
            class="tab-title"
            :class="item.isOpen ? 'open' : ''"
            @click="openTab(item)"
          >
            {{ item.text }}
          </label>
        </div>
        <div class="tabs-content">
          <div class="wrap-regulations-content">
            <input type="radio" name="tab-group" class="tab" id="tab1" checked="">
            <div class="regulations-content">
              <table class="table">
                <thead>
                <tr>
                  <th>ID</th>
                  <th>Назва</th>
                  <th>Порядок</th>
                  <th>Дії</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, idx) in singleEvent.main_partners_set" :key="item.id">
                  <td>{{ item.id }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.order_number }}</td>
                  <td>
                    <div class="events_item-block">
                      <div class="events_item" @click="removePartner('mainPartner', item.id)">
                        <i class="fas fa-trash-restore-alt"></i>
                      </div>
                      <div class="events_item" @click="clickModal('mainPartner', idx, singleEvent.id)">
                        <i class="fas fa-pencil-alt"></i>
                      </div>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
              <div @click="modalValidate = !modalValidate; isPartner = 'mainPartner'; idEvent = singleEvent.id;" class="back_btn t">Добавить нового
                партнера
              </div>
            </div>
          </div>
          <div class="wrap-regulations-content">
            <input type="radio" name="tab-group" class="tab" id="tab2">
            <div class="regulations-content">
              <table class="table">
                <thead>
                <tr>
                  <th>ID</th>
                  <th>Назва</th>
                  <th>Порядок</th>
                  <th>Дії</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, idx) in singleEvent.partners_set" :key="item.id">
                  <td>{{ item.id }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.order_number }}</td>
                  <td>
                    <div class="events_item-block">
                      <div class="events_item" @click="removePartner('partner', item.id)">
                        <i class="fas fa-trash-restore-alt"></i>
                      </div>
                      <div class="events_item" @click="clickModal('partner', idx, singleEvent.id)">
                        <i class="fas fa-pencil-alt"></i>
                      </div>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
              <div @click="modalValidate = !modalValidate; isPartner = 'partner'; idEvent = singleEvent.id; " class="back_btn t">Добавить нового
                партнера
              </div>
            </div>
          </div>
          <div class="wrap-regulations-content">
            <input type="radio" name="tab-group" class="tab" id="tab3">
            <div class="regulations-content">
              <table class="table">
                <thead>
                <tr>
                  <th>ID</th>
                  <th>Назва</th>
                  <th>Порядок</th>
                  <th>Дії</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, idx) in singleEvent.media_partners_set" :key="idx">
                  <td>{{ item.id }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.order_number }}</td>
                  <td>
                    <div class="events_item-block">
                      <div class="events_item" @click="removePartner('mediaPartner', item.id)">
                        <i class="fas fa-trash-restore-alt"></i>
                      </div>
                      <div class="events_item" @click="clickModal('mediaPartner', idx, singleEvent.id)">
                        <i class="fas fa-pencil-alt"></i>
                      </div>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
              <div @click="modalValidate = !modalValidate; isPartner = 'mediaPartner'; idEvent = singleEvent.id;" class="back_btn t">Добавить
                нового партнера
              </div>
            </div>
          </div>
        </div>
      </div> -->
      <div class="profile_success success_file">
        <button class="profile_btn" type="submit">Зберегти</button>
      </div>
    </form>
    <!--    -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
    <div class="update_block">
      <button @click.prevent="goToTest(singleEvent.id)" class="back_btn">Редагування тесту до вебінару</button>
      <button class="back_btn">Редагувати опитування</button>
    </div>
    <modalValidate class="update_partner" v-if="modalValidate" :isPartner="isPartner" :idItem="idItem" :idEvent="idEvent" @close="closeModal()"/>
  </div>
</template>
<style scoped src="@/assets/lc/css/style.css">
</style>
<script>

import Editor from '@tinymce/tinymce-vue'
import axios from 'axios'
import modalValidate from '@/components/ModalValidate.vue'
import preloader from '@/components/UI/Preloader.vue'
import swicherLang from '@/components/swicherLang'

export default {
  data () {
    return {
      activeLang: "uk",
      loading: false,
      idEvent: null,
      myAcc: '',
      specializationList: [],
      singleEvent: {
        id: '',
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        testing_end_date: '',
        number_of_hours: '',
        place: null,
        is_draft: false,
        image: '',
        event_documents: '',
        text: '',
        private: true,
        specializations: [],
        youtube_id: '',
        success_percent: '',
        max_tries: '',
        registered: false,
        certificate_title: '',
        language: '',
        partners_banner: null,
        media_partners_set: [],
        main_partners_set: [],
        partners_set: []
      },
      previewImage: {
        val: null,
        click: false
      },
      previewFile: {
        val: null,
        click: false
      },
      previewIneractive: {
        val: null,
        click: false
      },
      proId: this.$route.params.Pid,
      tabs: [
        {
          for: 'tab1',
          text: 'Головні партнери',
          isOpen: true
        },
        {
          for: 'tab2',
          text: 'Партнери',
          isOpen: false
        },
        {
          for: 'tab3',
          text: 'Медіа партнери',
          isOpen: false
        }
      ],
      modalValidate: false,
      isPartner: '',
      idItem: null
    }
  },
  components: {
    editor: Editor,
    modalValidate,
    preloader,
    swicherLang
  },
  created () {
    this.getNotify()
  },
  methods: {
    changeLang(data) {
      this.activeLang = data
      this.getNotify()
    },
    async goToTest (prodId) {
      if (this.singleEvent.test == null) {
        await axios({
          url: `https://asprof-test.azurewebsites.net/${this.activeLang}/api/webinars/${prodId}/test/`,
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + this.$store.getters.getToken
          }
        }).then(respons => {
          this.$message('Тест створено')
        })
          .catch(error => {
            this.$message('Помилка створення тесту')
          })
          .finally(() => (this.loading = false))
      }
      this.$router.push({
        name: 'lc-testWebinar',
        params: { Pid: prodId }
      })
    },
    async onSubmit () {
      this.loading = true
      var tmp = {
        id: this.singleEvent.id,
        name: this.singleEvent.name,
        description: this.singleEvent.description,
        start_date: this.singleEvent.start_date,
        end_date: this.singleEvent.end_date,
        testing_end_date: this.singleEvent.testing_end_date,
        number_of_hours: this.singleEvent.number_of_hours,
        place: this.singleEvent.place,
        is_draft: this.singleEvent.is_draft,
        // image: this.singleEvent.image,
        // event_documents: this.singleEvent.id,
        text: this.singleEvent.text,
        private: this.singleEvent.private,
        specializations: this.singleEvent.specializations,
        youtube_id: this.singleEvent.youtube_id,
        // youtube_id_2: this.singleEvent.youtube_id_2,
        success_percent: this.singleEvent.success_percent,
        max_tries: this.singleEvent.max_tries,
        registered: this.singleEvent.registered,
        certificate_title: this.singleEvent.certificate_title,
        // language: this.singleEvent.language,
        need_pay: this.singleEvent.need_pay,
        price: this.singleEvent.price,
        is_free: this.singleEvent.is_free
        // partners_banner: this.singleEvent.id,
        // media_partners_set: this.singleEvent.id,
        // main_partners_set: this.singleEvent.id,
        // partners_set: this.singleEvent.id
      }
      await axios({
        url: `https://asprof-test.azurewebsites.net/${this.activeLang}/api/webinars/${this.proId}/`,
        data: tmp,
        method: 'PATCH',
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getToken
        }
      }).then(respons => {
        const res = respons.data
        this.$store.dispatch('setSingleEvent', res)
        this.$message('Дані успішно змінені')
      })
        .catch(error => {
          this.$message('Помилка')
        })
        .finally(() => (this.loading = false))
      if (this.previewFile.click) {
        await axios({
          url: `https://asprof-test.azurewebsites.net/${this.activeLang}/api/webinars/${this.proId}/`,
          data: this.singleEvent.image,
          method: 'PATCH',
          headers: {
            Authorization: 'Bearer ' + this.$store.getters.getToken
          }
        }).then(respons => {
          const res = respons.data
          this.$store.dispatch('setSingleEvent', res)
          this.$message('Картинка змінена!')
          // this.messages = res;
        })
          .catch(error => {
            this.$message('Помилка')
          })
          .finally(() => (this.loading = false))
      }

      if (this.previewImage.click) {
        await axios({
          url: `https://asprof-test.azurewebsites.net/${this.activeLang}/api/webinars/${this.proId}/`,
          data: this.singleEvent.event_documents,
          method: 'PATCH',
          headers: {
            Authorization: 'Bearer ' + this.$store.getters.getToken
          }
        }).then(respons => {
          const res = respons.data
          this.$store.dispatch('setSingleEvent', res)
          this.$message('Картинка змінена!')
        })
          .catch(error => {
            this.$message('Помилка')
          })
          .finally(() => (this.loading = false))
      }

      if (this.previewIneractive.click) {
        await axios({
          url: `https://asprof-test.azurewebsites.net/${this.activeLang}/api/webinars/${this.proId}/`,
          data: this.singleEvent.partners_banner,
          method: 'PATCH',
          headers: {
            Authorization: 'Bearer ' + this.$store.getters.getToken
          }
        }).then(respons => {
          const res = respons.data
          this.$store.dispatch('setSingleEvent', res)
          this.$message('Картинка змінена!')
        })
          .catch(error => {
            this.$message('Помилка')
          })
          .finally(() => (this.loading = false))
      }
    },
    async removePartner (tab, id) {
      if (tab === 'mainPartner') {
        await axios({
          url: `https://asprof-test.azurewebsites.net/${this.activeLang}/api/webinars/${this.singleEvent.id}/main_partners/${id}/`,
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer ' + this.$store.getters.getToken
          }
        }).then(respons => {
          this.$message('Партнера видалено!')
        })
          .catch(error => {
            this.$message('Помилка')
          })
          .finally(() => (this.loading = false))
      } else if (tab === 'partner') {
        await axios({
          url: `https://asprof-test.azurewebsites.net/${this.activeLang}/api/webinars/${this.singleEvent.id}/partners/${id}/`,
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer ' + this.$store.getters.getToken
          }
        }).then(respons => {
          this.$message('Партнера видалено!')
        })
          .catch(error => {
            this.$message('Помилка')
          })
          .finally(() => (this.loading = false))
      } else if (tab === 'mediaPartner') {
        await axios({
          url: `https://asprof-test.azurewebsites.net/${this.activeLang}/api/webinars/${this.singleEvent.id}/media_partners/${id}/`,
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer ' + this.$store.getters.getToken
          }
        }).then(respons => {
          this.$message('Партнера видалено!')
        })
          .catch(error => {
            this.$message('Помилка')
          })
          .finally(() => (this.loading = false))
      }
      this.getNotify()
    },
    // eslint-disable-next-line camelcase
    clickModal (tab, id, id_event) {
      this.modalValidate = !this.modalValidate
      this.isPartner = tab
      this.idItem = id
      // eslint-disable-next-line camelcase
      this.idEvent = id_event
    },
    closeModal () {
      this.modalValidate = false
      // this.singleEvent = this.$store.getters.getSingleEvent
      this.idItem = null
      this.getNotify()
    },
    async getNotify () {
      await axios({
        method: 'GET',
        url: (`https://asprof-test.azurewebsites.net/${this.activeLang}/api/me/`),
        headers: {
          'Authorization': 'Bearer ' + this.$store.getters.getToken
        }
      }).then(respons => {
        let res = respons.data
        this.$store.dispatch('setMyAcc', res)
        this.myAcc = this.$store.getters.getMyAcc
        // this.messages = res;
      })
        .catch(error => {
        })
        .finally(() => (this.loading = false))

      this.loading = true
      await axios({
        method: 'GET',
        url: (`https://asprof-test.azurewebsites.net/${this.activeLang}/api/webinars/${this.proId}`),
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.getToken
        }
      })
        .then(respons => {
          this.$store.dispatch('setSingleEvent', respons.data)
        })
        .catch(error => {
        })
        .finally(() => (this.loading = false))
      this.singleEvent = this.$store.getters.getSingleEvent
      this.previewFile.val = this.singleEvent.image
      this.previewImage.val = this.singleEvent.event_documents
      this.previewIneractive.val = this.singleEvent.partners_banner
      this.specializationList = this.$store.getters.getSpecialization
    },
    openTab (item) {
      for (let i = 0; i < this.tabs.length; i++) {
        this.tabs[i].isOpen = false
        if (this.tabs[i].for === item.for) {
          this.tabs[i].isOpen = true
        }
      }
    },
    // image upload and preview methods
    selectImage () {
      this.$refs.fileInput.click()
    },
    selectFile () {
      this.$refs.fileInput2.click()
    },
    selectInteractive () {
      this.$refs.fileInput3.click()
    },
    pickFile () {
      const input = this.$refs.fileInput
      const file = input.files
      if (file && file[0]) {
        const reader = new FileReader()
        reader.onload = e => {
          this.singleEvent.event_documents = new FormData() // creates a new FormData object
          this.singleEvent.event_documents.append('event_documents', this.$refs.fileInput.files[0])
          this.previewImage.click = true
          this.previewImage.val = e.target.result
        }
        reader.readAsDataURL(file[0])
        this.$emit('input', file[0])
      }
    },
    pickFile2 () {
      const input = this.$refs.fileInput2
      const file = input.files
      if (file && file[0]) {
        const reader = new FileReader()
        reader.onload = e => {
          this.singleEvent.image = new FormData() // creates a new FormData object
          this.singleEvent.image.append('image', this.$refs.fileInput2.files[0])
          this.previewFile.click = true
          this.previewFile.val = e.target.result
        }
        reader.readAsDataURL(file[0])
        this.$emit('input', file[0])
      }
    },
    pickFile3 () {
      const input = this.$refs.fileInput3
      const file = input.files
      if (file && file[0]) {
        const reader = new FileReader()
        reader.onload = e => {
          this.singleEvent.partners_banner = new FormData() // creates a new FormData object
          this.singleEvent.partners_banner.append('partners_banner', this.$refs.fileInput3.files[0])
          this.previewIneractive.click = true
          this.previewIneractive.val = e.target.result
        }
        reader.readAsDataURL(file[0])
        this.$emit('input', file[0])
      }
    },
  }
}

</script>

<style scoped>

.wrap_title {
  display: flex;
  align-items: center;
  grid-gap: 20px;
  margin-bottom: 20px;
}

legend span {
  color: red;
  font-size: 15px;
}

.back_btn.t {
  width: max-content;
}

fieldset {
  min-height: 59px;
  height: auto;
  padding: 10px;
}

.wrap_inp select {
  width: 100%;
  background: #fafafa;
  padding: 0 13px;
  font-size: 16px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.wrap_inp_fiel {
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
  fill: #7c7d84;
}

.tab {
  display: none;
}

.tab:checked ~ .regulations-content {
  display: block;
}

.tab:not(no-checked) ~ .regulations-content {
  display: none;
}

.regulations-content .table {
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #dddddd;
  border-collapse: collapse;
}

.regulations-content .table th {
  font-weight: bold;
  padding: 5px;
  background: #efefef;
  border: 1px solid #dddddd;
}

.regulations-content .table td {
  border: 1px solid #dddddd;
  padding: 5px;
}

.events_item-block {
  display: flex;
  width: 100%;
  justify-content: center;
}

.tabs {
  display: flex;
  margin-bottom: -1px;
  position: relative;
  z-index: 2;
}

.tab-title {
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 22px;
  background-color: #e0e0e0;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  margin-right: 3px;
  box-sizing: border-box;
  border-left: 1px solid #e0e0e0;
  border-top: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  cursor: pointer;
}

.tab-title.open {
  background-color: #fafafa;
}

.tabs-content {
  padding: 20px;
  border: 1px solid #e0e0e0;
  position: relative;
  z-index: 1;
}

fieldset {

}

fieldset select {
  width: 100%;
}

</style>
