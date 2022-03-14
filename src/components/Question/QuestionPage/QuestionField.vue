<template>
  <div class="row">
    <div
      v-if="editStatus"
      class="col-12"
    >
      <vue-tiptap-katex
        ref="tiptap"
        :loading="loading"
        :options="{ bubbleMenu: false, floatingMenu: false, poem: true, reading: true, persianKeyboard: true }"
      />
    </div>
    <div v-else>
      <vue-katex :input="html" />
    </div>

  </div>
</template>
<script>

import API_ADDRESS from 'src/api/Addresses'
import VueTiptapKatex from 'vue3-tiptap-katex'
import VueKatex from 'components/VueKatex'

// replacement
// eslint-disable-next-line import/named
import { ref } from 'vue'

export default {
  name: 'QuestionField',
  components: {
    VueTiptapKatex,
    VueKatex
  },
  props: {
    editorValue: {
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
  data () {
    return {
      value: ref('What you see is <b>what</b> you get.'),
      html: '',
      test: 'test data',
      loading: false
    }
  },
  computed: {
    imageUrl () {
      return API_ADDRESS.question.uploadImage(this.questionId)
    }
  },
  created () {
    this.value = this.editorValue
    this.loading = true
    this.getHtmlValueFromValueProp()
  },
  watch: {
  },
  mounted () {
    if (this.$refs.tiptap) {
      this.$refs.tiptap.setContent(this.html)
    }
  },
  methods: {
    getContent () {
      console.log('value', this.$refs.tiptap.getContent())
      this.$emit('update:modelValue', this.$refs.tiptap.getContent())
    },
    getHtmlValueFromValueProp () {
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

<style scoped>
</style>

<style>
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
