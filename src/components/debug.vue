<template>
  <div>

  </div>
</template>

<script>

  import katex from 'katex'
  import axios from "axios";

  export default {

    data() {
      return {
      }
    },
    mounted() {
    },
    created() {
      let regex = /((\\\[((?! ).){1}((?!\$).)*?((?! ).){1}\\\])|(\$((?! ).){1}((?!\$).)*?((?! ).){1}\$))/gm;

      axios.get('https://nodes.alaatv.com/aaa/questionFiles/6135be32e0db6947171ef9a024d5a9667bd69bd6f62a241f7252d38d.json')
      .then(response => {
        let array = response.data
        let stringified = JSON.stringify(array)
        console.clear()
        console.log(response.data)
        console.log('The process has started...')
        console.log('Size of the raw JSON file: ' + Math.round(stringified.length * 2 / 1024) + 'KB')


        response.data.forEach(question => {
          question.statement = question.statement.replace(regex, (match) => {
            let finalMatch
            if (match.includes('$$')) {
              finalMatch = match.slice(2, -2)
            } else if (match.includes('$')) {
              finalMatch = match.slice(1, -1)
            } else {
              finalMatch = match.slice(2, -2)
            }
            return katex.renderToString(finalMatch, {
              throwOnError: false
            });
          })
        })
        console.log('Size of the final JSON file: ' + Math.round(JSON.stringify(response.data).length * 2 / 1024) + 'KB')
        this.download(JSON.stringify(response.data), 'json.json', 'application/json');
      })
    },
    methods: {
      download(content, fileName, contentType) {
        var a = document.createElement("a");
        var file = new Blob([content], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
      }
    }
  }
</script>

<style lang="scss">
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
</style>
