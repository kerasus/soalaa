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
// import 'katex/dist/katex.min.css'
import katex from 'katex'

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
  data () {
    return {
      rtl: true
    }
  },
  computed: {
    isLtrString () {
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
      string = mixinConvertToTiptap.methods.convertToTiptap(string)
      // const regex = /((\\\[((?! ).){1}((?!\$).)*?((?! ).){1}\\\])|(\$((?! ).){1}((?!\$).)*?((?! ).){1}\$))/gms
      const regex = /(\${1}((?!\$).)+?\${1})|(\${2}((?!\$).)+?\${2})|(\\\[((?! ).){1}((?!\$).)*?((?! ).){1}\\\])|(\[\\((?! ).){1}((?!\$).)*?((?! ).){1}\]\\)/gms
      string = string.replace(regex, (match) => {
        let finalMatch
        if (match.includes('$$')) {
          finalMatch = match.slice(2, -2)
        } else if (match.includes('$')) {
          finalMatch = match.slice(1, -1)
        } else {
          finalMatch = match.slice(2, -2)
        }
        return katex.renderToString(finalMatch, {
          throwOnError: false,
          strict: 'warn'
        })
      })
      return string

      // let string = this.input
      //
      // if (string === null || typeof string === 'undefined') {
      //   return ''
      // }
      // string = string.replaceAll('¬', '&#8202;')
      // string = string.replaceAll('­', '&#8202;')
      //
      // string = string.replaceAll('\\[ ', '\\[')
      // string = string.replaceAll(' \\]', '\\]')
      // string = string.replaceAll(' $', '$')
      // string = string.replaceAll('$ ', '$')
      // // string = string.replaceAll(/&lt;/g, '<').replaceAll(/&gt;/g, '>').replaceAll('&amp;', '&')
      // const regex = /(\${1}((?!\$).)+?\${1})|(\${2}((?!\$).)+?\${2})|(\\\[((?! ).){1}((?!\$).)*?((?! ).){1}\\\])|(\[\\((?! ).){1}((?!\$).)*?((?! ).){1}\]\\)/gms
      // string = string.replace(regex, (match) => {
      //   let finalMatch
      //   if (match.includes('$$')) {
      //     finalMatch = match.slice(2, -2)
      //   } else if (match.includes('$')) {
      //     finalMatch = match.slice(1, -1)
      //   } else {
      //     finalMatch = match.slice(2, -2)
      //   }
      //   return katex.renderToString(finalMatch, {
      //     throwOnError: false,
      //     strict: 'warn'
      //   })
      // })
      // string = string.replaceAll('&lt;', '<')
      // string = string.replaceAll('&gt;', '>')
      //
      // return string
    }
  },
  mounted () {
    setTimeout(() => {
      document.querySelectorAll('.katex:not([dir="ltr"])').forEach(item => {
        item.setAttribute('dir', 'ltr')
      })
    }, 1000)
  },
  created () {
    // this.rtl = !this.isLtrString(this.input)
  }
}
</script>

<style lang="scss">
/*rtl:ignore*/
@import "katex/dist/katex.min.css";
@import "src/css/katex-rtl-fix.scss";

//rtl change bug fix
[dir="rtl"] .html-katex {
  @include katex-rtl-fix;
  font-size: 1.2rem;
  line-height: 4rem;
  .katex {
    font-size: 1.9rem;
  }
}

.html-katex {
  width: 100%;
  font-family: KaTeX_Main, Times New Roman, serif !important;
  & > p {
    direction: inherit;
    &:first-child {
      display: inline-block;
    }
  }
  .katex {
    * {
      //font-family: KaTeX_Main, Times New Roman, serif;
    }
    /*rtl:ignore*/
    direction: ltr !important;
    /*rtl:ignore*/
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
      position: relative;
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

#mathfield .ML__cmr,
.katex .mtight {
  font-family: yekanbakh,serif;
}

</style>
