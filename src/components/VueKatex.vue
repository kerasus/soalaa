<template>
  <div v-katex:auto v-html="input" />
</template>

<script>
import Vue from 'vue'
import VueKatex from 'vue-katex'
import 'katex/dist/katex.min.css'
Vue.use(VueKatex, {
  globalOptions: {
    delimiters: [
      {left: "$$", right: "$$", display: true},
      {left: "\\[", right: "\\]", display: true},
      {left: "$", right: "$", display: false},
      {left: "\\(", right: "\\)", display: false}
    ]
  }
});
export default {
  name: "VueKatex",
  props: {
    input: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>

</style>
