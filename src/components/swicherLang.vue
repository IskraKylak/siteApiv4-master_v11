<template>
    <div class="wrap_lang">
        <div class="btn_lang" v-for="(item, idx) in langs" :key="idx" :class="item.active ? 'active' : ''" @click="active(item.lang)">{{ item.lang }}</div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      langs: [
        { lang: "uk", active: true },
        { lang: "ru", active: false },
        { lang: "en", active: false }
      ],
    }
  },
  methods: {
    active(article) {
      this.langs.forEach(item => {
        item.active = false
        if(item.lang == article) {
          item.active = true
          this.$emit('changeLang', item.lang)
        }
      })
      
    },
  }
}
</script>
<style scoped lang="scss">
  .wrap_lang {
    display: flex;
    grid-gap: 10px;
    align-items: center;

    .btn_lang {
      background-color: #e0e0e0;
      border-radius: 4px;
      padding: 5px;
      cursor: pointer;
      text-transform: uppercase;

      &.active {
        background: #20aeea;
        color: #fff;
      }
    }
  }
</style>