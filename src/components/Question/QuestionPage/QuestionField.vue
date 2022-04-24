<template>
    <div class="type-section">
          <vue-tiptap-katex
            ref="tiptap"
            :loading="loading"
            :options="{ bubbleMenu: false, floatingMenu: false, poem: true, reading: true, persianKeyboard: true }"
          />
        </div>
</template>
<script>

import VueTiptapKatex from 'vue3-tiptap-katex'

// replacement
// eslint-disable-next-line import/named
import { ref } from 'vue'

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
  data () {
    return {
      value: ref('What you see is <b>what</b> you get.'),
      html: '',
      test: 'test data',
      loading: false
    }
  },
  computed: {},
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
      return this.$refs.tiptap.getContent()
      // this.$emit('update:modelValue', this.$refs.tiptap.getContent())
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

<style lang="scss" scoped>
.type-section {
  background-color: var(--3a-Neutral2);
  border: 1px solid var(--3a-Neutral1);
  border-radius: 16px;
}

</style>

<style lang="scss">
.type-section {
  .tiptap-header {
    border-radius: 16px 16px 0 0;
    background-color: var(--3a-Neutral3);
  }
}
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
