<template>
  <div>
    <YoutubeVue3 ref="youtube" :videoid="link_yt" :loop="1"
        @ended="onEnded" @paused="onPaused" @played="onPlayed"/>
  </div>
</template>
<script>
import { YoutubeVue3 } from 'youtube-vue3'
export default {
  props: [
    'link_yt'
  ],
  data () {
    return {
    }
  },
  components: {
    YoutubeVue3
  },
  created () {
  },
  methods: {
   onEnded () {
      this.btn_on = false
      console.log('## OnEnded')
    },
    onPaused () {
      console.log('## OnPaused')
    },
    onPlayed () {
      console.log('## OnPlayed')
    },
  }
}
</script>
<style scoped src="@/assets/lc/css/style.css">
</style>
