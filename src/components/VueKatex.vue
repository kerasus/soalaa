<template>
  <div
    class="html-katex"
    :dir="!isLtrString ? 'rtl' : 'ltr'"
    v-html="localInput"
  />
</template>

<script>
import 'katex/dist/katex.min.css'
import katex from 'katex'

export default {
  name: "VueKatex",
  props: {
    input: {
      type: String,
      default: ''
    },
    ltr: {
      type: Boolean,
      default: null
    },
  },
  data () {
    return {
      rtl: true,
      localInput: ''
    }
  },
  computed: {
    isLtrString () {
      if (this.ltr !== null) {
        return this.ltr
      }
      let string = this.localInput
      if (!string) {
        return false
      }
      // const englishRegex = /^[A-Za-z0-9 :"'ʹ.<>%$&@!+()\-/\n,…?;ᵒ*~]*$/
      // return !!string.match(englishRegex)
      const persianRegex = /[\u0600-\u06FF]/
      return !string.match(persianRegex)
    },
  },
  watch: {
    input (newVal) {
      this.loadLocalInput(newVal)
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
    this.loadLocalInput(this.input)
  },
  methods: {
    loadLocalInput (newVal) {
      this.localInput = newVal
      this.prepareForKatex()
    },
    prepareForKatex () {
      let regex = /(\${1}((?!\$).)+?\${1})|(\${2}((?!\$).)+?\${2})|(\\\[((?! ).){1}((?!\$).)*?((?! ).){1}\\\])/gms;
      this.localInput = this.localInput.replace(regex, (match) => {
        return ' ' + match + ' '
      })
      this.localInput = this.localInput.replaceAll('\\[ ', '\\[')
      this.localInput = this.localInput.replaceAll(' \\]', ' \\]')
      this.localInput = this.localInput.replaceAll(' $', '$')
      this.localInput = this.localInput.replaceAll('$ ', '$')
      this.localInput = this.localInput.replace(regex, (match) => {
        let finalMatch
        if (match.includes('$$')) {
          finalMatch = match.slice(2, -2)
        } else if (match.includes('$')) {
          finalMatch = match.slice(1, -1)
        } else {
          finalMatch = match.slice(2, -2)
        }
        finalMatch = finalMatch.replaceAll(/&lt;/g, '<').replace(/&gt;/g, '>')
        return katex.renderToString(finalMatch, {
          throwOnError: false,
          safe: true,
          trust: true
        })
      })
    }
  }
}
</script>

<style lang="scss">
  .katex * {
    font-family: KaTeX_Main;
  }

  #mathfield .ML__cmr,
  .katex .mtight {
    font-family: IRANSans;
  }

  .html-katex {
    width: 100%;
    display: grid;

    .katex {
      direction: ltr;
      .katex-html {
        .accent {
          background-color: transparent !important;
          border-color: transparent !important;
        }
        .overline {
          font-size: inherit !important;
          font-weight: inherit !important;
          letter-spacing: inherit !important;
          line-height: inherit !important;
          text-transform: inherit !important;
          font-family: inherit !important;
        }
      }
    }

    table {
      border-collapse: collapse;
      table-layout: fixed;
      width: auto;
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
  }

  .beit .mesra {
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
  }

  @media only screen and (max-width: 500px) {
    .beit {
      flex-direction: column;
    }
    .beit .mesra {
      white-space: normal;
      flex-basis: auto;
    }
  }
</style>

<style scoped lang="scss">

.html-katex {
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
}
</style>

<style>
.html-katex > p {
  direction: inherit;
}

.html-katex > p:first-child {
  display: inline-block;
}
</style>
