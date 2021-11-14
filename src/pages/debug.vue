<template>
  <div>dd
    <vue-tiptap-katex
      ref="tiptap"
      :loading="loading"
      :access-token="'Auth/accessToken'"
      :upload-url="'imageUrl'"
      :options="{ bubbleMenu: false, floatingMenu: false, poem: true, reading: true }"
    />
  </div>
</template>

<script>
import VueTiptapKatex from 'vue3-tiptap-katex'
export default {
  name: 'debug',
  components: { VueTiptapKatex },
  data () {
    return {
      loading: false,
      html: '<p>I’m running tiptap with Vue.js. 🎉</p>',
      innerHTML: 'hi'
    }
  }
}
</script>

<style scoped>

</style>
