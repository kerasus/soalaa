<template>
  <div class="type-section">
    <vue-tiptap-katex
      ref="tiptap"
      :loading="loading"
      :options="{
        bubbleMenu: false,
        floatingMenu: false,
        poem: true,
        reading: true,
        persianKeyboard: true,
        uploadServer: {
          url: getQuestionUploadURL,
          headers: {
            Authorization: getAuthorizationCode
          }
        }
      }"
    />
  </div>
</template>
<script>
import API_ADDRESS from 'src/api/Addresses'
import { Question } from 'src/models/Question'
import VueTiptapKatex from 'vue3-tiptap-katex'

export default {
  name: 'QuestionField',
  components: {
    VueTiptapKatex
  },
  props: {
    editorValue: {
      default: '',
      type: String
    },
    label: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      value: 'What you see is <b>what</b> you get.',
      html: '',
      test: 'test data',
      loading: false
    }
  },
  inject: {
    question: {
      from: 'providedQuestion', // this is optional if using the same key for injection
      default: new Question()
    }
  },
  computed: {
    getQuestionUploadURL () {
      return API_ADDRESS.question.uploadImage(this.question.id)
    },
    getAuthorizationCode () {
      return 'Bearer ' + this.$store.getters['Auth/accessToken']
    }
  },
  created() {
    this.value = this.editorValue
    this.loading = true
    this.getHtmlValueFromValueProp()
  },
  watch: {},
  mounted() {
    if (this.$refs.tiptap) {
      this.$refs.tiptap.setContent(this.html)
    }
  },
  methods: {
    getContent() {
      return this.$refs.tiptap.getContent()
      // this.$emit('update:modelValue', this.$refs.tiptap.getContent())
    },
    getHtmlValueFromValueProp() {
      let html = this.value
      if (html === null || typeof html === 'undefined') {
        html = ''
      }
      this.html = html
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.type-section {
  &:deep(.tiptap-plus-container) {
    background-color: var(--3a-Neutral2);
    border: 1px solid var(--3a-Neutral1);
    border-radius: 16px;
  }

  &:deep(.tiptap-header) {
    border-radius: 16px 16px 0 0;
    background-color: var(--3a-Neutral3);
  }
}

// ToDo: check this styles in scoped style tag
#mathfield .ML__cmr,
.katex .mtight {
  font-family: IRANSans;
}

.inline .v-btn.blue--text {
  display: none;
}

.tiptap-plus-container.focused {
  border: solid 1px #dedede;
}
</style>
