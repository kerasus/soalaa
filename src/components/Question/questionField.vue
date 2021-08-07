<template>
  <v-row>
    <v-col v-if="editStatus">
      <vue-tiptap-katex
        ref="tiptap"
        :loading="loading"
        :access-token="$store.getters['Auth/accessToken']"
        :upload-url="'/api/v1/question/upload/' + questionId"
      />
    </v-col>
    <!-- eslint-disable vue/no-v-html -->
    <v-col v-else>
      <vue-katex :input="html" />
    </v-col>
  </v-row>
</template>

<script>
import VueKatex from '@/components/VueKatex'
import VueTiptapKatex from 'vue-tiptap-katex'

export default {
  name: 'QuestionField',
  components: {
    VueTiptapKatex,
    VueKatex
  },
  props: {
    value: {
      default: '',
      type: String
    },
    label: {
      default: '',
      type: String
    },
    editStatus: {
      default: false,
      type: Boolean
    },
    questionId: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      html: '',
      loading: false
    }
  },
  watch: {

  },
  created () {
    this.loading = true
    this.getHtmlValueFromValueProp()
  },
  mounted () {
    if (this.$refs.tiptap) {
      this.$refs.tiptap.setContent(this.html)
    }
  },
  methods: {
    getContent () {
      this.$emit('input', this.$refs.tiptap.getContent())
    },
    getHtmlValueFromValueProp () {
      let html = this.value
      if (html === null || typeof html === 'undefined') {
        html = ''
      }
      this.html = html
      this.loading = false
    },
  }
}
</script>

<style scoped>
</style>

<style>
.inline .v-btn.blue--text {
  display: none;
}

.tiptap-plus-container.focused {
  border: solid 1px #dedede;
}
</style>

