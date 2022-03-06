<template>
  <div class="image-upload-parent">
    <p style="color: #23263b; font-size: 16px; font-weight: 500">{{ title }}</p>
    <file-pond
      :allow-multiple="true"
      :labelIdle="dropAreaHTML"
    />
  </div>
</template>

<script>
import { Question } from '../../../models/Question.js'
import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
)

export default {
  name: 'UploadImage',
  data () {
    return {
      dropAreaHTML: `
        <div class="drop-area-parent">
          <div class="drop-area">
            <i class="q-icon isax isax-gallery-add" style="font-size: 48px; color: #dedede; margin-bottom: 12px; margin-top: 24px;" aria-hidden="true" role="presentation"></i>
            <p>عکس مورد نظر را اینجا رها کنید</p>
            <p><span class="vertical-line"></span>یا<span class="vertical-line"></span></p>
            <p style="color: #8075DC">انتخاب فایل </p>
          </div>
        </div>
      `,
    }
  },
  props: {
    value: {
      type: Question,
      default: new Question(),
      required: false
    },
    key: {
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
  components: {
    FilePond,
  }
}
</script>

<style scoped lang="scss">
.image-upload-parent {

}
</style>

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
