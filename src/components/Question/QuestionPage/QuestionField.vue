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

</style>
<style lang="scss">
/*rtl:ignore*/
@import "katex/dist/katex.min.css";
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
  table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;
    td,
    th {
      min-width: 1em;
      border: 2px solid #ced4da;
      padding: 3px 5px;
      vertical-align: top;
      box-sizing: border-box;
      position: static;
      > * {
        margin-bottom: 0;
      }
    }
    th {
      font-weight: bold;
      text-align: left;
      background-color: #f1f3f5;
    }
    .selectedCell:after {
      z-index: 2;
      position: absolute;
      content: "";
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(200, 200, 255, 0.4);
      pointer-events: none;
    }
    .column-resize-handle {
      position: absolute;
      right: -2px;
      top: 0;
      bottom: -2px;
      width: 4px;
      background-color: #adf;
      pointer-events: none;
    }
  }
  .beit {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
    @media only screen and (max-width: 500px) {
      flex-direction: column;
    }
    .mesra {
      position: relative;
      width: 100%;
      min-height: 1px;
      padding-right: 15px;
      padding-left: 15px;
      -ms-flex-preferred-size: 0;
      flex-basis: 0;
      -webkit-box-flex: 1;
      -ms-flex-positive: 1;
      flex-grow: 1;
      max-width: 100%;
      white-space: nowrap;
      @media only screen and (max-width: 500px) {
        white-space: normal;
        flex-basis: auto;
      }
    }
  }
}
</style>
