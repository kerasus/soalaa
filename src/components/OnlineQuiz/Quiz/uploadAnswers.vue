<template>
  <div
    v-for="(item, index) in questionCategories.list"
    :key="index"
    class="row"
  >
    <div class="col">
      <q-file
        :model-value="item"
        label="Pick files"
        outlined
        multiple
        style="max-width: 400px"
      >
<!--        <template v-slot:file="{ index, file }">-->
<!--          <q-chip-->
<!--            class="full-width q-my-xs"-->
<!--            square-->
<!--            @remove="cancelFile(index)"-->
<!--          >-->
<!--&lt;!&ndash;            <q-linear-progress&ndash;&gt;-->
<!--&lt;!&ndash;              class="absolute-full full-height"&ndash;&gt;-->
<!--&lt;!&ndash;              :value="uploadProgress[index].percent"&ndash;&gt;-->
<!--&lt;!&ndash;              :color="uploadProgress[index].color"&ndash;&gt;-->
<!--&lt;!&ndash;              track-color="grey-2"&ndash;&gt;-->
<!--&lt;!&ndash;            />&ndash;&gt;-->

<!--&lt;!&ndash;            <q-avatar>&ndash;&gt;-->
<!--&lt;!&ndash;              <q-icon :name="uploadProgress[index].icon"/>&ndash;&gt;-->
<!--&lt;!&ndash;            </q-avatar>&ndash;&gt;-->

<!--            <div class="ellipsis relative-position">-->
<!--              {{ file.name }}-->
<!--            </div>-->

<!--            <q-tooltip>-->
<!--              {{ file.name }}-->
<!--            </q-tooltip>-->
<!--          </q-chip>-->
<!--        </template>-->

        <template v-slot:after>
          <q-btn
            color="primary"
            dense
            icon="cloud_upload"
            round
            @click="upload(item)"
          />
        </template>
      </q-file>
      <div>
        <!--     <q-uploader-->
        <!--       :ref="item.id + 'questionFile'"-->
        <!--       :field-name="item.id + 'questionFile'"-->
        <!--       @added="file_selected"-->
        <!--       accept=".pdf"-->
        <!--       @removed="fileDeleted(item)"-->
        <!--     >-->
        <!--       <template v-slot:header="scope">-->
        <!--         <div class="row no-wrap items-center q-pa-sm q-gutter-xs">-->
        <!--           <q-btn v-if="scope.uploadedFiles.length > 0" icon="done_all" @click="scope.removeUploadedFiles" round dense flat >-->
        <!--             <q-tooltip>Remove Uploaded Files</q-tooltip>-->
        <!--           </q-btn>-->
        <!--           <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" />-->
        <!--           <div class="col">-->
        <!--             <div class="q-uploader__title">{{ 'فایل سوالات ' + item.title }}</div>-->
        <!--             <div class="q-uploader__subtitle">{{ scope.uploadSizeLabel }}</div>-->
        <!--           </div>-->
        <!--           <q-btn v-if="scope.canAddFiles" type="a" icon="add_box" round dense flat>-->
        <!--             <q-uploader-add-trigger />-->
        <!--             <q-tooltip>Pick Files</q-tooltip>-->
        <!--           </q-btn>-->
        <!--           <q-btn v-if="scope.canUpload" icon="cloud_upload" @click="uploadFile('questionFile', 'questions_booklet')" round dense flat >-->
        <!--             <q-tooltip>Upload Files</q-tooltip>-->
        <!--           </q-btn>-->

        <!--           <q-btn v-if="scope.isUploading" icon="clear" @click="scope.abort" round dense flat >-->
        <!--             <q-tooltip>Abort Upload</q-tooltip>-->
        <!--           </q-btn>-->
        <!--         </div>-->
        <!--       </template>-->
        <!--       <template v-slot:list="scope">-->
        <!--         <q-list separator>-->

        <!--           <q-item v-for="file in scope.files" :key="file.id">-->
        <!--             <q-item-section>-->
        <!--               <q-item-label class="full-width ellipsis">-->
        <!--                 {{ file.name }}-->
        <!--               </q-item-label>-->

        <!--               <q-item-label caption>-->
        <!--                 {{ file.__sizeLabel }}-->
        <!--               </q-item-label>-->
        <!--             </q-item-section>-->
        <!--             <q-item-section top side>-->
        <!--               <q-btn-->
        <!--                 class="gt-xs"-->
        <!--                 size="12px"-->
        <!--                 flat-->
        <!--                 dense-->
        <!--                 round-->
        <!--                 icon="delete"-->
        <!--                 @click="scope.removeFile(file)"-->
        <!--               />-->
        <!--             </q-item-section>-->
        <!--           </q-item>-->

        <!--         </q-list>-->
        <!--       </template>-->
        <!--     </q-uploader>-->
      </div>
      <br>
    </div>
  </div>
</template>

<script>
import { QuestCategoryList } from 'src/models/QuestCategory'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'uploadAnswers',
  // components: [VueFileAgent],
  props: {
    examId: {
      type: String
    }
  },
  data () {
    return {
      questionCategories: new QuestCategoryList(),
      options: [],
      files: null,
      uploadProgress: [],
      uploading: null
    }
  },
  watch: {
    examId () {
      this.getBooklets()
    }
  },
  mounted () {
    this.$axios.get(API_ADDRESS.questionCategory.base)
      .then(response => {
        this.questionCategories = new QuestCategoryList(response.data.data)
        console.log(this.questionCategories.list)
        this.questionCategories.list.forEach(item => {
          item.questionFile = []
          item.answerFile = []
        })
      })
    this.$axios.get(API_ADDRESS.option.base + '?type=booklet_type')
      .then(response => {
        this.options = response.data.data
      })
    // this.getBooklets()
  },
  methods: {
    test () {
      console.log('fuck')
    },
    cleanUp () {
      clearTimeout(this.uploading.value)
    },
    // updateUploadProgress () {
    //   let done = true
    //   this.uploadProgress.value = this.uploadProgress.value.map(progress => {
    //     if (progress.percent === 1 || progress.error === true) {
    //       return progress
    //     }
    //     const percent = Math.min(1, progress.percent + Math.random() / 10)
    //     const error = percent < 1 && Math.random() > 0.95
    //
    //     if (error === false && percent < 1 && done === true) {
    //       done = false
    //     }
    //
    //     return {
    //       ...progress,
    //       error,
    //       color: error === true ? 'red-2' : 'green-2',
    //       percent
    //     }
    //   })
    //
    //   this.uploading.value = done !== true
    //     ? setTimeout(this.updateUploadProgress, 300)
    //     : null
    // },
    updateFiles (newFiles) {
      this.files.value = newFiles
      this.uploadProgress.value = (newFiles || []).map(file => ({
        error: false,
        color: 'green-2',
        percent: 0,
        icon: file.type.indexOf('video/') === 0
          ? 'movie'
          : (file.type.indexOf('image/') === 0
              ? 'photo'
              : (file.type.indexOf('audio/') === 0
                  ? 'audiotrack'
                  : 'insert_drive_file'))
      }))
    }
    // upload () {
    //   this.cleanUp()
    //
    //   const allDone = this.uploadProgress.value.every(progress => progress.percent === 1)
    //
    //   this.uploadProgress.value = this.uploadProgress.value.map(progress => ({
    //     ...progress,
    //     error: false,
    //     color: 'green-2',
    //     percent: allDone === true ? 0 : progress.percent
    //   }))
    //
    //   // this.updateUploadProgress()
    // }
  },
  select (event, item, key) {
    console.log('tt', event, item, key)
    this.$set(item, key, event)
  },
  getBooklets () {
    this.$axios.get(API_ADDRESS.exam.pdf(this.examId))
      .then(response => {
        this.questionCategories.list.forEach(category => {
          category.descriptive_answers_booklet = ''
          category.questions_booklet = ''
          response.data.forEach(file => {
            if (file.category.id === category.id) {
              file.booklets.forEach(booklet => {
                if (booklet.value === 'descriptive_answers_booklet') {
                  category.descriptive_answers_booklet = booklet.url
                } else if (booklet.value === 'questions_booklet') {
                  category.questions_booklet = booklet.url
                }
              })
            }
          })
        })
      })
  },

  upload (item, key, bookletType) {
    const that = this
    item[key].forEach(file => {
      console.log('file:', file)
      const formData = new FormData()
      formData.append('file', file.file, file.file.name)
      formData.append('category_id', item.id)
      const option = this.options.find(option => option.value === bookletType)
      formData.append('booklet_type', option.id)
      that.$axios.post(API_ADDRESS.exam.examBookletUpload(this.examId), formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          that.$refs[item.id + key][0].fileRecords[0].progressInternal = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100))
        }
      })
        .then((res) => {
          console.log('uploadFiles', res)
          that.$q.notify({
            message: 'اطلاعات آزمون شما ثبت شد.',
            type: 'success'
          })
          item[bookletType] = res.data.data.url
          item[key] = []
        })
        .catch((err) => {
          console.log('err', err)
        })
    })
  }
  //
  // onBeforeDelete: function (event, item, key) {
  //   Vue.set(item, key, [])
  //   this.$refs[item.id + key][0].deleteFileRecord(event)
  //   this.random = Math.random()
  // },

  // fileDeleted (item) {
  //   item = []
  // }
}
</script>

<style scoped>

</style>
