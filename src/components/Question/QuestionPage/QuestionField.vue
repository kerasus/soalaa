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
        },
        persianKeyboard: true,
        mathliveOptions: {
          locale: 'fa',
        }
      }"
    />
  </div>
</template>

<script>
import API_ADDRESS from 'src/api/Addresses'
import { Question } from 'src/models/Question'
import VueTiptapKatex from 'vue3-tiptap-katex'
import mixinConvertToTiptap from 'vue-tiptap-katex-core/mixins/convertToTiptap'

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
      const input = this.getModifiedContent(this.html)
      this.$refs.tiptap.setContent(input)
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
    },
    getModifiedContent (input) {
      let modifiedValue = this.removeImageWithLocalSrc(input)
      modifiedValue = this.fixWidehatProblemFromLatex(modifiedValue)
      modifiedValue = this.modifyPrimeWithPower(modifiedValue)
      modifiedValue = this.modifySinus(modifiedValue)
      modifiedValue = this.modifyCosine(modifiedValue)
      modifiedValue = this.removeEmptyDataKatexElements(modifiedValue)
      modifiedValue = this.modifyCombination(modifiedValue)
      modifiedValue = this.removeFirstAndLastBracket(modifiedValue)
      return modifiedValue
    },
    removeImageWithLocalSrc (html) {
      const regex = /<img src="file:.*?".*?\/?>/gms
      return html.replaceAll(regex, '')
    },
    fixWidehatProblemFromLatex (input) {
      const regex = /({\\widehat)(.*?)(\})/gms
      return input.replaceAll(regex, (result) => {
        const charUnderWidehat = result.replace('{\\widehat', '').replace('}', '')
        return '\\widehat{' + charUnderWidehat + '}'
      })
    },
    modifyPrimeWithPower (input) {
      const regex = /(\{\\prime}\^.)/gms
      return input.replaceAll(regex, (result) => {
        const char = result.replace('{\\prime}^', '')
        return '{\\prime' + char + '}'
      })
    },
    modifySinus (input) {
      const regex = /(\\sin\w*)/gms
      return input.replaceAll(regex, (result) => {
        const char = result.replace('\\sin', '')
        return '\\sin ' + char
      })
    },
    modifyCosine (input) {
      const regex = /(\\cos\w*)/gms
      return input.replaceAll(regex, (result) => {
        const char = result.replace('\\cos', '')
        return '\\cos ' + char
      })
    },
    removeEmptyDataKatexElements (input) {
      return input.replaceAll('<span data-katex="true">$$</span>', '').replaceAll('<span data-katex="true"></span>', '')
    },
    modifyCombination (input) {
      const regex = /(\\left\( \\begin\{align})(.*?)(\\end{align} \\right\))/gms
      return input.replaceAll(regex, (result) => {
        const numberRegex = /\d+/g
        const arrayOfNumbers = result.match(numberRegex)
        return '{{' + arrayOfNumbers[0] + '\\choose ' + arrayOfNumbers[1] + '}}'
      })
    },
    removeFirstAndLastBracket (input) {
      const regexPatternForFormula = mixinConvertToTiptap.methods.getRegexPatternForFormula()
      const regex = /\\\[.*\\]/gms
      let string = input
      string = string.replace(regexPatternForFormula, (match) => {
        let finalMatch
        if (match.includes('$')) {
          finalMatch = match.slice(1, -1)
        } else {
          finalMatch = match.slice(2, -2)
        }
        finalMatch = finalMatch.replace(regex, (bracketMatch) => {
          if (finalMatch.indexOf('\\[') === 0 && finalMatch.indexOf('\\]') === finalMatch.length - 2) {
            return bracketMatch.replace('\\[', '').replace('\\]', '')
          }
          return bracketMatch
        })
        return '$' + finalMatch + '$'
      })
      return string
    }
  }
}
</script>

<style lang="scss" scoped>
.type-section {
  &:deep(.tiptap-container) {
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

</style>
<style lang="scss">
/*rtl:ignore*/
@import "vue-tiptap-katex-core/css/base";
@import "src/css/katex-rtl-fix.scss";
//rtl change bug fix
[dir="rtl"] .katex {
  @include katex-rtl-fix
}
[dir="rtl"] .type-section {
  @include katex-rtl-fix;
  font-size: 1.2rem;
  line-height: 4rem;
  .katex {
    font-size: 1.9rem;
  }
}

.type-section.katex * {
}
#mathfield .ML__cmr,
.katex .mtight {
}
.inline .v-btn.blue--text {
  display: none;
}

.tiptap-plus-container.focused {
  border: solid 1px #dedede;
}
.type-section {
  width: 100%;

  & > p {
    direction: inherit;
    &:first-child {
      display: inline-block;
    }
  }
}
</style>
