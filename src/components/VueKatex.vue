<template>
  <div
    class="html-katex"
    :dir="!isLtrString ? 'rtl' : 'ltr'"
    v-html="input"
  />
</template>

<script>
// import { createApp } from 'vue'
// const app = createApp({})
// import VueKatex from 'vue-katex'
// import 'katex/dist/katex.min.css'
// app.use(VueKatex, {
//   globalOptions: {
//     delimiters: [
//       { left: '$$', right: '$$', display: true },
//       { left: '\\[', right: '\\]', display: true },
//       { left: '$', right: '$', display: false },
//       { left: '\\(', right: '\\)', display: false }
//     ]
//   }
// })
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
  #mathfield .ML__cmr,
  .katex .mtight {
    font-family: IRANSans;
  }

  .html-katex {
    width: 100%;

    .katex {
      direction: ltr;
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
