<template>
  <div class="SelectImageBox">
<!-- Todo : fix this font weight-->
    <p class="box-titles q-mb-md q-mt-md">
      فایل های آپلود شده:
    </p>
<!--    todo file-upload-->
    <div class="row">
      <div class="col-md-4">
        <q-card class="question-box">
          <q-card-section class="box-titles">
            صورت سوال
          </q-card-section>
<!--          <v-card-title class="body-1">-->
<!--            -->
<!--          </v-card-title>-->
          <q-card-actions vertical class="question-box-card-action">
            <div class="row">
              <div
                v-if="editStatus"
                v-show="questionFile.length === 0"
                class="col test"
                style="padding-top: 16px;"
              >
                <file-upload
                  ref="questionFile"
                  v-model="questionFile"
                  input-id="questionFile"
                  :extensions="extensions"
                  :accept="accept"
                  :multiple="false"
                  :directory="directory"
                  :create-directory="createDirectory"
                  :size="size || 0"
                  :thread="thread < 1 ? 1 : (thread > 5 ? 5 : thread)"
                  :data="data"
                  :drop="drop"
                  :drop-directory="dropDirectory"
                  :add-index="addIndex"
                  @input-filter="inputFilter"
                  @input-file="inputFile"
                >
                  <q-btn
                    flat
                    class="btnAddImage"
                    icon="mdi-plus"
                  ></q-btn>
<!--                  <v-btn-->
<!--                    large-->
<!--                    text-->
<!--                    class="btnAddImage"-->
<!--                  >-->
<!--                    <v-icon>mdi-plus</v-icon>-->
<!--                  </v-btn>-->
                </file-upload>
              </div>
              <div
                v-for="(file, index) in questionFile"
                :key="index"
                class="col test2"
              >
                <q-card>
                  <q-img
                    v-if="(editStatus && file.thumb) || (!editStatus && file)"
                    :src="(editStatus) ? file.thumb : file"
                    class="q-mt-3"
                    @click="showImgPanel(((editStatus) ? file.thumb : file))"
                    style="height: 60px; max-width: 100%"
                  />
                  <span v-else>No Images</span>
                  <q-card-section
                    v-if="editStatus"
                    class="caption"
                  >
                    {{ formatSize(file.size) }}
                  </q-card-section>
                  <!-- delete img ----------------------------------------------------------->
                  <q-btn
                    v-if="editStatus"
                    round
                    color="red"
                    size="12px"
                    class="btnRemoveFile"
                    icon="mdi-close"
                    @click.prevent="$refs.questionFile.remove(file)"
                  ></q-btn>
                </q-card>
              </div>
              <div
                v-if="!editStatus && questionFile.length === 0"
                class="col"
              >
                <q-card>
                  <q-img
                    style="height: 60px; max-width: 100%"
                  >
                      <div
                        class="row fit wrap justify-center items-center"
                      >
                        <div>
                          <q-icon name="mdi-image-off" size="md" ></q-icon>
                        </div>
                      </div>
                  </q-img>
                </q-card>
              </div>
            </div>
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-md-8">
        <q-card class="upload-question-container">
          <q-card-section class="box-titles">
            جواب سوال
          </q-card-section>
          <!--          <v-card-title class="body-1">-->
          <!--            -->
          <!--          </v-card-title>-->
          <q-card-section class="answer-box">
            <div class="row">
              <div
                v-for="(file, index) in answerFiles"
                :key="index"
                class="col col-3"
                style="padding-left: 16px;"
              >
                <q-card>
                  <q-img
                    v-if="(editStatus && file.thumb) || (!editStatus && file)"
                    :src="(editStatus) ? file.thumb : file"
                    style="height: 60px; max-width: 100%"
                    class="q-mt-3"
                    @click="showImgPanel(((editStatus) ? file.thumb : file))"
                  />

                  <span v-else>No Image</span>
                  <q-card-section
                    v-if="editStatus"
                    class="caption"
                  >
                    {{ formatSize(file.size) }}
                  </q-card-section>

                  <q-btn
                    v-if="editStatus"
                    round
                    color="red"
                    size="12px"
                    class="btnRemoveFile"
                    icon="mdi-close"
                    @click.prevent="$refs.answerImages.remove(file)"
                  ></q-btn>
                </q-card>
              </div>
              <div
                v-if="editStatus"
                class="col col-3"
                style="padding-top: 16px;"
              >
                <div>
                  <file-upload
                    ref="answerImages"
                    v-model="answerFiles"
                    input-id="answerImages"
                    :extensions="extensions"
                    :accept="accept"
                    :multiple="true"
                    :directory="directory"
                    :create-directory="createDirectory"
                    :size="size || 0"
                    :thread="thread < 1 ? 1 : (thread > 5 ? 5 : thread)"
                    :data="data"
                    :drop="drop"
                    :drop-directory="dropDirectory"
                    :add-index="addIndex"
                    @input-filter="inputFilter"
                    @input-file="inputFile"
                  >
                    <v-btn
                      large
                      text
                      class="btnAddImage"
                      icon="mdi-plus"
                    ></q-btn>
                  </file-upload>
                </div>
              </div>
              <div
                class="col"
                v-if="!editStatus && answerFiles.length === 0"
              >
                <q-card>
                  <q-img
                    style="height: 60px; max-width: 100%"
                  >
                    <div
                      class="row fit wrap justify-center items-center"
                    >
                      <div>
                        <q-icon name="mdi-image-off" size="md" ></q-icon>
                      </div>
                    </div>
                  </q-img>
                </q-card>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script>

import Cropper from 'cropperjs'
import ImageCompressor from '@xkeshi/image-compressor'
import VueUploadComponent from 'vue-upload-component'
import { Question } from 'src/models/Question'

export default {
  name: 'UploadImg',
  components: {
    'file-upload': VueUploadComponent
  },
  props: {
    value: {
      type: Question,
      default: new Question()
    },
    editStatus: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      question: new Question(),
      files: [],
      questionFile: [],
      answerFiles: [],
      accept: 'image/png,image/gif,image/jpeg,image/webp',
      extensions: 'gif,jpg,jpeg,png,webp',
      minSize: 1,
      size: 1024 * 1024 * 10,
      directory: false,
      drop: true,
      dropDirectory: true,
      createDirectory: false,
      addIndex: false,
      thread: 3,
      name: 'file',
      // putAction: '/upload/put',
      data: {
        // '_csrf_token': 'xxxxxx',
      },
      autoCompress: 1024 * 1024,
      uploadAuto: false,
      addData: {
        show: false,
        name: '',
        type: '',
        content: ''
      },
      editFile: {
        show: false,
        name: ''
      }
    }
  },
  watch: {
    'editFile.show' (newValue, oldValue) {
      // 关闭了 自动删除 error
      if (!newValue && oldValue) {
        this.$refs.answerImages.update(this.editFile.id, { error: this.editFile.error || '' })
      }
      if (newValue) {
        this.$nextTick(() => {
          if (!this.$refs.editImage) {
            return
          }
          const cropper = new Cropper(this.$refs.editImage, {
            autoCrop: false
          })
          this.editFile = {
            ...this.editFile,
            cropper
          }
        })
      }
    },
    'addData.show' (show) {
      if (show) {
        this.addData.name = ''
        this.addData.type = ''
        this.addData.content = ''
      }
    },
    value: {
      handler: function (newValue) {
        this.question = newValue
        if (!this.editStatus) {
          this.questionFile = (this.question.statement_photo) ? [this.question.statement_photo] : []
          this.answerFiles = this.question.answer_photos
        }
      },
      deep: true
    }
  },
  created () {
    this.question = this.value
    if (!this.editStatus) {
      this.questionFile = (this.question.statement_photo) ? [this.question.statement_photo] : []
      this.answerFiles = this.question.answer_photos
    }
  },
  methods: {
    showImgPanel (src) {
      console.log('src -----------', src)
      this.$emit('imgClicked', src)
    },
    fileUpdated () {
      const files = {
        questionFile: this.questionFile,
        answerFiles: this.answerFiles
      }
      if (this.questionFile[0]) {
        this.question.statement_photo = this.questionFile[0].file
      }
      this.question.answer_photos = this.answerFiles.map(item => item.file)
      console.log('files', files)
      console.log('this.question', this.question)
      this.$emit('input', this.question)
    },
    copyImageAddress (url) {
      const el = document.createElement('textarea')
      el.value = '![](' + url + ')'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      this.$notify({
        group: 'notifs',
        title: 'توجه',
        text: 'آدرس فایل به کلیپبورد منتقل شد',
        type: 'success'
      })
    },
    formatSize (size) {
      if (size > 1024 * 1024 * 1024 * 1024) {
        return (size / 1024 / 1024 / 1024 / 1024).toFixed(2) + ' TB'
      } else if (size > 1024 * 1024 * 1024) {
        return (size / 1024 / 1024 / 1024).toFixed(2) + ' GB'
      } else if (size > 1024 * 1024) {
        return (size / 1024 / 1024).toFixed(2) + ' MB'
      } else if (size > 1024) {
        return (size / 1024).toFixed(2) + ' KB'
      }
      return size.toString() + ' B'
    },
    inputFilter (newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // Before adding a file
        // 添加文件前
        // Filter system files or hide files
        // 过滤系统文件 和隐藏文件
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
          return prevent()
        }
        // Filter php html js file
        // 过滤 php html js 文件
        if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
          return prevent()
        }
        // Automatic compression
        // 自动压缩
        if (newFile.file && newFile.error === '' && newFile.type.substr(0, 6) === 'image/' && this.autoCompress > 0 && this.autoCompress < newFile.size) {
          newFile.error = 'compressing'
          const imageCompressor = new ImageCompressor(null, {
            convertSize: 1024 * 1024,
            maxWidth: 512,
            maxHeight: 512
          })
          imageCompressor.compress(newFile.file)
            .then((file) => {
              this.$refs.answerImages.update(newFile, { error: '', file, size: file.size, type: file.type })
            })
            .catch((err) => {
              this.$refs.answerImages.update(newFile, { error: err.message || 'compress' })
            })
        }
      }
      if (newFile && newFile.error === '' && newFile.file && (!oldFile || newFile.file !== oldFile.file)) {
        // Create a blob field
        // 创建 blob 字段
        newFile.blob = ''
        const URL = (window.URL || window.webkitURL)
        if (URL) {
          newFile.blob = URL.createObjectURL(newFile.file)
        }
        // Thumbnails
        // 缩略图
        newFile.thumb = ''
        if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
          newFile.thumb = newFile.blob
        }
      }
      // image size
      // image 尺寸
      if (newFile && newFile.error === '' && newFile.type.substr(0, 6) === 'image/' && newFile.blob && (!oldFile || newFile.blob !== oldFile.blob)) {
        newFile.error = 'image parsing'
        const img = new Image()
        img.onload = () => {
          this.$refs.answerImages.update(newFile, { error: '', height: img.height, width: img.width })
        }
        img.οnerrοr = (e) => {
          console.log('e', e)
          this.$refs.answerImages.update(newFile, { error: 'parsing image size' })
        }
        img.src = newFile.blob
      }
    },
    // add, update, remove File Event
    inputFile (newFile, oldFile) {
      this.fileUpdated()

      if (newFile && oldFile) {
        // update
        if (newFile.active && !oldFile.active) {
          // beforeSend
          // min size
          if (newFile.size >= 0 && this.minSize > 0 && newFile.size < this.minSize) {
            this.$refs.answerImages.update(newFile, { error: 'size' })
          }
        }
        if (newFile.progress !== oldFile.progress) {
          // progress
        }
        if (newFile.error && !oldFile.error) {
          // error
        }
        if (newFile.success && !oldFile.success) {
          // success
          console.log('oldFile.response.url', oldFile.response.url)
          console.log('this.answerFiles', this.answerFiles)
        }
      }
      if (!newFile && oldFile) {
        // remove
        if (oldFile.success && oldFile.response.id) {
          // $.ajax({
          //   type: 'DELETE',
          //   url: '/upload/delete?id=' + oldFile.response.id,
          // })
        }
      }
      // Automatically activate upload
      if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
        if (this.answerImagesAuto && !this.$refs.answerImages.active) {
          this.$refs.answerImages.active = true
        }
      }
    },
    alert (message) {
      alert(message)
    },
    onEditFileShow (file) {
      this.editFile = { ...file, show: true }
      this.$refs.answerImages.update(file, { error: 'edit' })
    },
    onEditorFile () {
      if (!this.$refs.answerImages.features.html5) {
        this.alert('Your browser does not support')
        this.editFile.show = false
        return
      }
      const data = {
        name: this.editFile.name,
        error: ''
      }
      if (this.editFile.cropper) {
        const binStr = atob(this.editFile.cropper.getCroppedCanvas().toDataURL(this.editFile.type).split(',')[1])
        const arr = new Uint8Array(binStr.length)
        for (let i = 0; i < binStr.length; i++) {
          arr[i] = binStr.charCodeAt(i)
        }
        data.file = new File([arr], data.name, { type: this.editFile.type })
        data.size = data.file.size
      }
      this.$refs.answerImages.update(this.editFile.id, data)
      this.editFile.error = ''
      this.editFile.show = false
    },
    // add folder
    onAddFolder () {
      if (!this.$refs.answerImages.features.directory) {
        this.alert('Your browser does not support')
        return
      }
      const input = document.createElement('input')
      input.style = 'background: rgba(255, 255, 255, 0);overflow: hidden;position: fixed;width: 1px;height: 1px;z-index: -1;opacity: 0;'
      input.type = 'file'
      input.setAttribute('allowdirs', true)
      input.setAttribute('directory', true)
      input.setAttribute('webkitdirectory', true)
      input.multiple = true
      document.querySelector('body').appendChild(input)
      input.click()
      input.onchange = (e) => {
        console.log('e', e)
        this.$refs.answerImages.addInputFile(input).then(function () {
          document.querySelector('body').removeChild(input)
        })
      }
    },
    onAddData () {
      this.addData.show = false
      if (!this.$refs.answerImages.features.html5) {
        this.alert('Your browser does not support')
        return
      }
      const file = new window.File([this.addData.content], this.addData.name, {
        type: this.addData.type
      })
      this.$refs.answerImages.add(file)
    }

  }
}
</script>

<style>
.SelectImageBox {
  margin-right: 15px;
  margin-left: 15px;
}
.SelectImageBox .file-uploads.file-uploads-html4 input, .file-uploads.file-uploads-html5 label:hover {
  opacity: 0.08;
  background-color: currentColor;
}

.SelectImageBox .btnRemoveFile {
  position: absolute;
  top: -16px;
  left: -16px;
}
.SelectImageBox .file-uploads {
  display: flex;
  align-items: center;
  justify-content: center;
}
.SelectImageBox .upload-question-container {
  margin-left: 15px;

}
.SelectImageBox .question-box-card-action {
  padding-right: 16px;
  padding-left: 16px;
  padding-bottom: 16px;
}
.SelectImageBox .answer-box {
  padding-bottom: 16px;
  padding-top: 8px;
}
.SelectImageBox .box-titles {
  font-size: 1rem ;
}
</style>
