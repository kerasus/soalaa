<template>
  <div
    class="question-image-panel"
  >
    <q-card
      class="question-card default-questions-card image-panel-box"
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
                <q-btn class="delete-btn" round color="red" icon="mdi-delete" size="xs" @click="deleteImage({ src: item, type: 'statement_photo' })" />
                <img :src="item" @click="selectImage(item)" />
              </div>
              <div v-if="editable">
                <div id="filepond-wrapper-statement" />
              </div>
              <p v-if="!editable && (!question.statement_photo || question.statement_photo.length === 0)">وجود ندارد</p>
            </div>
            پاسخ سوال
            <div class="answer-images">
              <div v-for="(item, index) in question.answer_photos" :key="index" class="q-image">
                <q-btn class="delete-btn" round color="red" icon="mdi-delete" size="xs" @click="deleteImage({ src: item, type: 'answer_photo' })" />
                <img :src="item" @click="selectImage(item)" />
              </div>
              <div v-if="editable">
                <div id="filepond-wrapper-answer" />
              </div>
              <p v-if="!editable && (!question.answer_photos || question.answer_photos.length === 0)">وجود ندارد</p>
            </div>
          </div>
        </q-card-section>
      </div>
    </q-card>
  </div>
  <image-side-panel
    :mode="mode"
    @closePanelBtnClicked="closePanelBtnClicked"
  />
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

import ImageSidePanel from 'components/Question/QuestionPage/ImageSidePanel'
export default {
  name: 'ImagePanel',
  components: {
    ImageSidePanel
  },
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
      })
      document.getElementById('filepond-wrapper-answer').innerHTML = ''
      document.getElementById('filepond-wrapper-answer').appendChild(this.pond_answer.element)
      document.addEventListener('FilePond:addfile', () => {
        this.question.added_answer_photos = this.pond_answer.getFiles().map(({ file }) => file)
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
      pond_statement: FilePond.create({
        allowMultiple: true,
        name: 'filepond',
        labelIdle: dropAreaHTML,
        allowImagePreview: false,
        imagePreviewMinHeight: 200
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
      this.floatMode = !this.floatMode
      this.$emit('imgPanelModeChanged')
      // this.$q.notify({
      //   message: 'این قابلیت بزودی اضافه خواهد شد...',
      //   color: 'primary'
      // })
    }
  }
}
</script>

<style lang="scss">
.question-image-panel {
  .image-panel-box {
    height: 600px;
    overflow-x: scroll;
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
