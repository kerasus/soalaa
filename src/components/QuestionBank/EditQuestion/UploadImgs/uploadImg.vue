<template>
  <div class="SelectImageBox">
    <p class="font-weight-medium mb-5">
      فایل های آپلود شده:
    </p>
    <v-row>
      <v-col md="4">
        <v-card>
          <v-card-title class="body-1">
            صورت سوال
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                v-if="editStatus"
                v-show="questionFile.length === 0"
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
                  <v-btn
                    large
                    text
                    class="btnAddImage"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </file-upload>
              </v-col>
              <v-col
                v-for="(file, index) in questionFile"
                :key="index"
              >
                <v-card>
                  <v-img
                    v-if="(editStatus && file.thumb) || (!editStatus && file)"
                    :src="(editStatus) ? file.thumb : file"
                    width="100%"
                    height="60"
                    class="mt-3"
                    @click="showImgPanel(((editStatus) ? file.thumb : file))"
                  />
                  <span v-else>No Image</span>
                  <v-card-title
                    v-if="editStatus"
                    class="caption"
                    v-text="formatSize(file.size)"
                  />
                  <v-btn
                    v-if="editStatus"
                    fab
                    dark
                    x-small
                    color="error"
                    class="btnRemoveFile"
                    @click.prevent="$refs.questionFile.remove(file)"
                  >
                    <v-icon dark>
                      mdi-close
                    </v-icon>
                  </v-btn>
                </v-card>
              </v-col>
              <v-col
                v-if="!editStatus && questionFile.length === 0"
              >
                <v-card>
                  <v-img
                    width="100%"
                    height="60"
                  >
                    <template v-slot:placeholder>
                      <v-row
                        no-gutters
                        class="fill-height"
                      >
                        <v-col class="d-flex justify-center align-center">
                          <v-icon size="50px">
                            mdi-image-off
                          </v-icon>
                        </v-col>
                      </v-row>
                    </template>
                  </v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md="8">
        <v-card>
          <v-card-title class="body-1">
            جواب سوال
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                v-for="(file, index) in answerFiles"
                :key="index"
                cols="3"
              >
                <v-card>
                  <v-img
                    v-if="(editStatus && file.thumb) || (!editStatus && file)"
                    :src="(editStatus) ? file.thumb : file"
                    width="100%"
                    height="60"
                    class="mt-3"
                    @click="showImgPanel(((editStatus) ? file.thumb : file))"
                  />
                  <span v-else>No Image</span>
                  <v-card-title
                    v-if="editStatus"
                    class="caption"
                    v-text="formatSize(file.size)"
                  />

                  <v-btn
                    v-if="editStatus"
                    fab
                    dark
                    x-small
                    color="error"
                    class="btnRemoveFile"
                    @click.prevent="$refs.answerImages.remove(file)"
                  >
                    <v-icon dark>
                      mdi-close
                    </v-icon>
                  </v-btn>
                </v-card>
              </v-col>
              <v-col
                v-if="editStatus"
                cols="3"
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
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </file-upload>
                </div>
              </v-col>
              <v-col
                v-if="!editStatus && answerFiles.length === 0"
              >
                <v-card>
                  <v-img
                    width="100%"
                    height="60"
                  >
                    <template v-slot:placeholder>
                      <v-row
                        no-gutters
                        class="fill-height"
                      >
                        <v-col class="d-flex justify-center align-center">
                          <v-icon size="50px">
                            mdi-image-off
                          </v-icon>
                        </v-col>
                      </v-row>
                    </template>
                  </v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>

import Cropper from 'cropperjs'
import ImageCompressor from '@xkeshi/image-compressor'
import FileUpload from 'vue-upload-component'
import {Question} from "@/models/Question";

export default {
  name: "UploadImg",
  components: {
    FileUpload,
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
  data(){
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
        content: '',
      },
      editFile: {
        show: false,
        name: '',
      },

      srcImg1:'https://picsum.photos/id/11/500/300',
      srcImg2:'https://picsum.photos/500/300'
    }
  },
  watch: {
    'editFile.show'(newValue, oldValue) {
      // 关闭了 自动删除 error
      if (!newValue && oldValue) {
        this.$refs.answerImages.update(this.editFile.id, { error: this.editFile.error || '' })
      }
      if (newValue) {
        this.$nextTick( () => {
          if (!this.$refs.editImage) {
            return
          }
          let cropper = new Cropper(this.$refs.editImage, {
            autoCrop: false,
          })
          this.editFile = {
            ...this.editFile,
            cropper
          }
        })
      }
    },
    'addData.show'(show) {
      if (show) {
        this.addData.name = ''
        this.addData.type = ''
        this.addData.content = ''
      }
    },
  },
  created() {
    this.question = this.value
    if (!this.editStatus) {
      this.questionFile = (this.question.statement_photo) ? [this.question.statement_photo] : []
      this.answerFiles = this.question.answer_photos
    }
  },
  methods :{
    showImgPanel(src){
      this.$emit("imgClicked",src);
    },

    fileUpdated () {
      const files = {
        questionFile: this.questionFile,
        answerFiles: this.answerFiles
      }

      this.question.statement_photo = this.questionFile.blob
      this.question.answer_photos = this.answerFiles.map( item => item.blob)
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
    inputFilter(newFile, oldFile, prevent) {
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
        if (newFile.file && newFile.error === "" && newFile.type.substr(0, 6) === 'image/' && this.autoCompress > 0 && this.autoCompress < newFile.size) {
          newFile.error = 'compressing'
          const imageCompressor = new ImageCompressor(null, {
            convertSize: 1024 * 1024,
            maxWidth: 512,
            maxHeight: 512,
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
      if (newFile && newFile.error === "" && newFile.file && (!oldFile || newFile.file !== oldFile.file)) {
        // Create a blob field
        // 创建 blob 字段
        newFile.blob = ''
        let URL = (window.URL || window.webkitURL)
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
      if (newFile && newFile.error === '' && newFile.type.substr(0, 6) === "image/" && newFile.blob && (!oldFile || newFile.blob !== oldFile.blob)) {
        newFile.error = 'image parsing'
        let img = new Image();
        img.onload = () => {
          this.$refs.answerImages.update(newFile, {error: '', height: img.height, width: img.width})
        }
        img.οnerrοr = (e) => {
          console.log('e', e)
          this.$refs.answerImages.update(newFile, { error: 'parsing image size'})
        }
        img.src = newFile.blob
      }
    },
    // add, update, remove File Event
    inputFile(newFile, oldFile) {
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
    alert(message) {
      alert(message)
    },
    onEditFileShow(file) {
      this.editFile = { ...file, show: true }
      this.$refs.answerImages.update(file, { error: 'edit' })
    },
    onEditorFile() {
      if (!this.$refs.answerImages.features.html5) {
        this.alert('Your browser does not support')
        this.editFile.show = false
        return
      }
      let data = {
        name: this.editFile.name,
        error: '',
      }
      if (this.editFile.cropper) {
        let binStr = atob(this.editFile.cropper.getCroppedCanvas().toDataURL(this.editFile.type).split(',')[1])
        let arr = new Uint8Array(binStr.length)
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
    onAddFolder() {
      if (!this.$refs.answerImages.features.directory) {
        this.alert('Your browser does not support')
        return
      }
      let input = document.createElement('input')
      input.style = "background: rgba(255, 255, 255, 0);overflow: hidden;position: fixed;width: 1px;height: 1px;z-index: -1;opacity: 0;"
      input.type = 'file'
      input.setAttribute('allowdirs', true)
      input.setAttribute('directory', true)
      input.setAttribute('webkitdirectory', true)
      input.multiple = true
      document.querySelector("body").appendChild(input)
      input.click()
      input.onchange = (e) => {
        console.log('e', e)
        this.$refs.answerImages.addInputFile(input).then(function() {
          document.querySelector("body").removeChild(input)
        })
      }
    },
    onAddData() {
      this.addData.show = false
      if (!this.$refs.answerImages.features.html5) {
        this.alert('Your browser does not support')
        return
      }
      let file = new window.File([this.addData.content], this.addData.name, {
        type: this.addData.type,
      })
      this.$refs.answerImages.add(file)
    }


  }
}
</script>

<style>
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
</style>
