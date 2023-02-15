<template>
  <div ref="HtmlKatex"
       class="html-katex"
       style="overflow: hidden"
       :dir="!isLtrString ? 'rtl' : 'ltr'"
       v-html="computedKatex"
  />
<!--  <canvas v-show="false"-->
<!--          ref="convertor" />-->
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
    },
    base64: {
      type: Boolean,
      default: false
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
  mounted() {
    setTimeout(() => {
      document.querySelectorAll('.katex:not([dir="ltr"])').forEach(item => {
        item.setAttribute('dir', 'ltr')
      })
      this.$emit('loaded')
      if (this.base64) {
        this.convertPhotosToBase64()
      }
    }, 1000)
  },
  created() {
    // this.rtl = !this.isLtrString(this.input)
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
    },
    convertPhotosToBase64 () {
      this.convertSvgToBase64()
      this.convertImagesToBase64()
    },
    convertImagesToBase64 () {
      if (!this.$refs.HtmlKatex) {
        return
      }
      const images = this.$refs.HtmlKatex.getElementsByTagName('img')
      images.forEach(image => {
        this.toDataURL(image.src, function(dataUrl) {
          image.src = dataUrl
        })
      })
    },
    convertSvgToBase64 () {
      if (!this.$refs.HtmlKatex) {
        return
      }
      const svgs = this.$refs.HtmlKatex.getElementsByTagName('svg')
      svgs.forEach(svg => {
        // Convert the SVG node to HTML.
        const div = document.createElement('div')
        div.appendChild(svg.cloneNode(true))

        // Encode the SVG as base64
        const b64 = 'data:image/svg+xml;base64,' + window.btoa(div.innerHTML)
        const url = 'url("' + b64 + '")'
        svg.style.backgroundImage = url
        svg.style.backgroundSize = 'cover'
        if (svg.parentElement.classList.contains('brace-left')) {
          svg.style.backgroundPosition = 'left'
        }
        if (svg.parentElement.classList.contains('brace-center')) {
          svg.style.backgroundPosition = 'bottom'
        }
        if (svg.parentElement.classList.contains('brace-right')) {
          svg.style.backgroundPosition = 'right'
        }
      })
    },
    toDataURL(src, callback, outputFormat) {
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.onload = function() {
        const canvas = document.createElement('CANVAS')
        const ctx = canvas.getContext('2d')
        canvas.height = this.naturalHeight
        canvas.width = this.naturalWidth
        ctx.drawImage(this, 0, 0)
        const dataURL = canvas.toDataURL(outputFormat)
        callback(dataURL)
      }
      img.src = src + '?test=123'
      if (img.complete || img.complete === undefined) {
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
        img.src = src
      }
    }
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
    /*rtl:ignore*/
    direction: ltr !important;
    /*rtl:ignore*/
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
