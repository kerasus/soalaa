<template>
  <div
    class="question-image-panel"
    :class="{'question-image-float-panel' : isPanelFloat }"
  >
    <q-card
      class="question-card default-questions-card image-panel-box"
      :class="{'float-panel-box' : isPanelFloat }"
    >
      <q-card-section class="image-panel-header default-Qcard-title row justify-between">
        <q-btn
          class="close-panel-btn"
          icon="isax:close-circle"
          color="white"
          text-color="accent"
          dense
          unelevated
          rounded
          @click="closePanelBtnClicked"
        />
        <q-btn
          class="change-mode-btn"
          color="white"
          text-color="accent"
          label="تغییر حالت"
          flat
          rounded
          unelevated
          @click="imgPanelModeChanged"
        />
      </q-card-section>
      <div>
        <q-card-section>
          <img class="main-image" v-if="selectedImageSrc" :src="selectedImageSrc">
          <div class="all-images">
            صورت سوال
            <div class="statement-images">
              <div v-for="(item, index) in question.statement_photo" :key="index" class="q-image">
                <q-btn v-if="editable" class="delete-btn" round color="red" icon="mdi-delete" size="xs" @click="deleteImage({ src: item, type: 'statement_photo' })" />
                <img :src="item" @click="selectImage(item)" />
              </div>
              <div v-for="(item, index) in question.added_statement_photos" :key="index" class="q-image">
                <q-btn :loading="true" class="delete-btn" round color="red" icon="mdi-delete" size="xs" />
                <img :src="getUrl(item)" @click="selectImage(getUrl(item))" />
              </div>
              <div v-if="editable" style="margin-right: 50px">
                <div id="filepond-wrapper-statement" />
              </div>
              <p v-if="!editable && (!question.statement_photo || question.statement_photo.length === 0)">وجود ندارد</p>
            </div>
            پاسخ سوال
            <div class="answer-images">
              <div v-for="(item, index) in question.answer_photos" :key="index" class="q-image">
                <q-btn v-if="editable" class="delete-btn" round color="red" icon="mdi-delete" size="xs" @click="deleteImage({ src: item, type: 'answer_photo' })" />
                <img :src="item" @click="selectImage(item)" />
              </div>
              <div v-for="(item, index) in question.added_answer_photos" :key="index" class="q-image">
                <q-btn :loading="true" class="delete-btn" round color="red" icon="mdi-delete" size="xs" />
                <img :src="getUrl(item)" @click="selectImage(getUrl(item))" />
              </div>
              <div v-if="editable" style="margin-right: 50px">
                <div id="filepond-wrapper-answer" />
              </div>
              <p v-if="!editable && (!question.answer_photos || question.answer_photos.length === 0)">وجود ندارد</p>
            </div>
          </div>
        </q-card-section>
      </div>
    </q-card>
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
            <i class="q-icon mdi mdi-plus-circle" style="font-size: 46px; color: rgb(225, 225, 225); cursor: pointer; margin-right: 20px" aria-hidden="true" role="presentation"> </i>
          </div>
        </div>
      `

export default {
  name: 'ImagePanel',
  components: {},
  props: {
    mode: {
      type: String,
      default () {
        return 'show'
      }
    },
    editable: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  mounted () {
    if (this.question.statement_photo.length) {
      this.selectImage(this.question.statement_photo[0])
    } else if (this.question.answer_photos.length) {
      this.selectImage(this.question.answer_photos[0])
    }
    if (this.editable) {
      document.getElementById('filepond-wrapper-statement').innerHTML = ''
      document.getElementById('filepond-wrapper-statement').appendChild(this.pond_statement.element)
      document.addEventListener('FilePond:addfile', () => {
        this.question.added_statement_photos = this.pond_statement.getFiles().map(({ file }) => file)
        this.pond_statement.removeFile()
        this.$emit('uploadStatement')
      })
      document.getElementById('filepond-wrapper-answer').innerHTML = ''
      document.getElementById('filepond-wrapper-answer').appendChild(this.pond_answer.element)
      document.addEventListener('FilePond:addfile', () => {
        this.question.added_answer_photos = this.pond_answer.getFiles().map(({ file }) => file)
        this.pond_answer.removeFile()
        this.$emit('uploadAnswer')
      })
    }
  },
  inject: {
    question: {
      from: 'providedQuestion', // this is optional if using the same key for injection
      default: new Question()
    }
  },
  data () {
    return {
      floatPanelMode: false,
      pond_statement: FilePond.create({
        allowMultiple: true,
        name: 'filepond',
        labelIdle: dropAreaHTML
      }),
      pond_answer: FilePond.create({
        allowMultiple: true,
        name: 'filepond',
        labelIdle: dropAreaHTML
      }),
      selectedImageSrc: ''
    }
  },
  methods: {
    // deleteUnsavedImage (object) {
    //   this.question[object.type] = this.question[object.type].filter(file => {
    //     return file.name !== object.file.name
    //   })
    // },
    getUrl (file) {
      return URL.createObjectURL(file)
    },
    deleteImage (image) {
      this.$emit('deleteImage', image)
    },
    selectImage (src) {
      this.selectedImageSrc = src
    },
    closePanelBtnClicked () {
      this.$emit('closePanelBtnClicked')
    },
    imgPanelModeChanged () {
      this.floatPanelMode = !this.floatPanelMode
      this.$emit('imgPanelModeChanged')
    }
  },
  computed: {
    isPanelFloat () {
      return !!(this.floatPanelMode)
    }
  }
}
</script>

<style scoped lang="scss">
.question-image-panel {
  .image-panel-box {
    height: 600px;
    overflow-x: scroll;
    border-radius: 30px;
  }
  .float-panel-box {
    overflow-x: auto;
    height: 450px;
    .q-card {
      box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    }
  }
  .image-panel-header {
    position: sticky;
    top: 0;
    z-index: 9999;
    background-color: #fff;
  }
  .change-mode-btn {
    margin-right: 60px;
  }

  .filepond--list-scroller {
    display: none;
  }
}

.main-image {
  width: 100%;
}

.all-images {
  .statement-images, .answer-images {
    display: flex;
    flex-direction: row;
    .q-image {
      position: relative;
      img {
        cursor: pointer;
        margin: 8px;
        object-fit: cover;
        width: 100px;
        height: 100px;
        border-radius: 14px;
      }
      .delete-btn {
        position: absolute !important;
        right: 0 !important;
      }
    }
  }
}

.main-image {
  width: 100%;
}
</style>
<style lang="scss">
.question-image-float-panel {
    .q-card {
      box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    }
  .question-image-panel {
    .image-panel-box {
      overflow-x: auto;
    }
  }
}
.all-images {
  .filepond--drop-label {
    .q-icon {
      background-color: #9690e4;
      border-radius: 10px;
    }
  }
}
</style>
