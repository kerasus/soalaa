<template>
  <div class="image-upload-parent">
    <p style="color: #23263b; font-size: 16px; font-weight: 500">{{ title }}</p>
    <div :id="'filepond-wrapper-' + this.fieldKey" />
  </div>
</template>

<script>
import { Question } from 'src/models/Question'
import * as FilePond from 'filepond'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
FilePond.registerPlugin(FilePondPluginImagePreview)

const dropAreaHTML = `
        <div class="drop-area-parent">
          <div class="drop-area">
            <i class="q-icon isax isax-gallery-add" style="font-size: 48px; color: #dedede; margin-bottom: 12px; margin-top: 24px;" aria-hidden="true" role="presentation"></i>
            <p>عکس مورد نظر را اینجا رها کنید</p>
            <p><span class="vertical-line"></span>یا<span class="vertical-line"></span></p>
            <p style="color: #8075DC; cursor: pointer">انتخاب فایل </p>
          </div>
        </div>
      `

export default {
  name: 'UploadImage',
  data () {
    return {
      pond: FilePond.create({
        allowMultiple: true,
        name: 'filepond',
        labelIdle: dropAreaHTML,
        files: this.files,
        server: this.server
      }),
      files: [{
        source: 'https://nodes.alaatv.com/aaa/questionPhotos/Screenshot%202022-03-02%20124323-4377851.jpg',
        options: {
          type: 'local'
        }
      }],
      server: {
        load: this.load
      }
    }
  },
  props: {
    fieldKey: {
      type: String,
      default: '',
      required: false
    },
    title: {
      type: String,
      default: 'آپلود عکس',
      required: false
    }
  },
  mounted () {
    document.getElementById('filepond-wrapper-' + this.fieldKey).innerHTML = ''
    document.getElementById('filepond-wrapper-' + this.fieldKey).appendChild(this.pond.element)
    document.addEventListener('FilePond:addfile', () => {
      this.question[this.fieldKey] = this.pond.getFiles().map(({ file }) => file)
    })
  },
  methods: {
    load: (source, load, error, progress, abort, headers) => {
      const myRequest = new Request(source)
      fetch(myRequest).then(function (response) {
        response.blob().then(function (myBlob) {
          load(myBlob)
        })
      })
    }
  },
  inject: {
    question: {
      from: 'question', // this is optional if using the same key for injection
      default: new Question()
    }
  }
}
</script>

<style lang="scss">
.drop-area-parent {
  width: 100%;
  height: 240px;
  background-color: #fff;
  overflow: hidden;
  border-radius: 20px;

  .drop-area {
    border: 2px dashed #E4E3F8;
    border-radius: 10px;
    height: calc(100% - 32px);
    width: calc(100% - 32px);
    margin: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .vertical-line {
      border-top: 1px solid #65677F;
      width: 60px;
      display: inline-block;
      margin: 0 10px;
    }
  }
}

.filepond--drop-label {

  height: max-content;

  > * {
    width: 100%;
  }
}

.filepond--credits {
  display: none;
}
</style>
