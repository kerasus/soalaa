<template>
  <div class="SelectImageBox mb-10">
    <p class="font-weight-medium mb-11">
      فایل های آپلود شده:
    </p>
    <v-row>
      <v-col md="4">
        <v-card>
          <v-card-title class="subtitle-1">
            صورت سوال
          </v-card-title>
          <v-card-text>
            <v-row no-gutters>
              <v-col cols="3">
                <file-upload
                  ref="questionImage"
                  v-model="questionFile"
                  input-id="questionImage"
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
                :key="file.id + ' ' + index"
                cols="3"
              >
                <v-img
                  v-if="file.thumb"
                  :src="file.thumb"
                  width="60"
                  height="60"
                  class="mt-3"
                  @click="showImgPanel(file.thumb)"
                />
                <span v-else>No Image</span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md="8">
        <v-card>
          <v-card-title class="subtitle-1">
            جواب سوال
          </v-card-title>
          <v-card-text>
            <v-row no-gutters>
              <v-col
                v-for="(file, index) in answerFiles"
                :key="file.id + ' ' + index"
                cols="3"
              >
                <v-badge
                  bordered
                  color="error"
                  icon="mdi-close"
                  overlap
                  @click.prevent="$refs.answerImages.remove(file)"
                >
                  <v-img
                    v-if="file.thumb"
                    :src="file.thumb"
                    width="60"
                    height="60"
                    class="mt-3"
                    @click="showImgPanel(file.thumb)"
                  />
                  <span v-else>No Image</span>
                </v-badge>
              </v-col>
              <v-col cols="3">
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

export default {
  name: "UploadImg",
  components: {
    FileUpload,
  },
  data(){
    return {
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
  methods :{
    showImgPanel(src){
      this.$emit("imgClicked",src);
    },

    testFunction () {
      const files = this.$refs.answerImages.get()
      console.log('files', files)
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
      console.log('inputFilter: this.answerFiles', this.answerFiles)

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
      console.log('inputFile: this.answerFiles', this.answerFiles)

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
.SelectImageBox .file-uploads {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
