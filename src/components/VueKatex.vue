<template>
  <div
    class="html-katex"
    style="overflow: hidden"
    :dir="!isLtrString ? 'rtl' : 'ltr'"
    v-html="computedKatex"
  />
</template>

<script>
import mixinConvertToTiptap from 'vue-tiptap-katex-core/mixins/convertToTiptap'
import katex from 'katex'
import 'katex/dist/katex.css'
import addPersianTo from 'src/Utils/katex-persian-renderer/src/index.mjs'
import 'src/Utils/katex-persian-renderer/katex-persian-fonts/index.css'
import allMetrics from 'src/Utils/katex-persian-renderer/katex-persian-fonts/YekanBakhFontMetrics.json'

addPersianTo(katex, {
  fontName: 'YekanBakh',
  fontMetrics: allMetrics
})

export default {
  name: 'VueKatex',
  props: {
    input: {
      type: String,
      default: ''
    },
    ltr: {
      type: Boolean,
      default: null
    }
  },
  emits: ['loaded'],
  data() {
    return {
      rtl: true
    }
  },
  computed: {
    isLtrString() {
      if (this.ltr !== null) {
        return this.ltr
      }
      const string = this.input
      if (!string) {
        return false
      }
      // const englishRegex = /^[A-Za-z0-9 :"'ʹ.<>%$&@!+()\-/\n,…?;ᵒ*~]*$/
      // return !!string.match(englishRegex)
      const persianRegex = /[\u0600-\u06FF]/
      return !string.match(persianRegex)
    },
    computedKatex() {
      let string = this.input
      if (string === null || typeof string === 'undefined') {
        return ''
      }
      string = this.removeFirstAndLastBracket(string)
      string = this.renderKatexToHTML(string)
      return string
    }
  },
  methods: {
    removeFirstAndLastBracket(input) {
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
    },
    renderKatexToHTML(input, katexConfig = {
      throwOnError: false,
      strict: 'warn',
      safe: true,
      trust: true
    }) {
      let string = input
      string = mixinConvertToTiptap.methods.convertToTiptap(string)
      const regex = mixinConvertToTiptap.methods.getRegexPatternForFormula()
      string = string.replace(regex, (match) => {
        let finalMatch
        if (match.includes('$')) {
          finalMatch = match.slice(1, -1)
        } else {
          finalMatch = match.slice(2, -2)
        }
        if (finalMatch) {
          finalMatch = mixinConvertToTiptap.methods.replaceKatexSigns(finalMatch)
        }
        return katex.renderToString(finalMatch, katexConfig)
      })
      return string
    }
  },
  mounted() {
    setTimeout(() => {
      document.querySelectorAll('.katex:not([dir="ltr"])').forEach(item => {
        item.setAttribute('dir', 'ltr')
      })
      this.$emit('loaded')
    }, 1000)
  },
  created() {
    // this.rtl = !this.isLtrString(this.input)
  }
}
</script>

<style lang="scss">
/*rtl:ignore*/
@import "vue-tiptap-katex-core/css/base";
@import "src/css/katex-rtl-fix.scss";

//rtl change bug fix
[dir="rtl"] .html-katex {
  @include katex-rtl-fix;
  //font-size: 1.2rem;
  //line-height: 4rem;

  .katex {
    //font-size: 1.9rem;
  }
}

.html-katex {
  width: 100%;

  & > p {
    direction: inherit;
  }

  .katex {
    /*rtl:ignore*/
    direction: ltr !important;
    /*rtl:ignore*/
  }
}

#mathfield .ML__cmr,
.katex .mtight {
}

</style>
