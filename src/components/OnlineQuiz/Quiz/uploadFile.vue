<template>
  <div class="upload-file-container">
    <div class="row justify-around q-mb-lg">
      <div class="col-7 q-px-lg text-right">
        <q-btn
          round
          color="primary"
          unelevated
          @click="goBack"
        >
          <i class="fi-rr-angle-left row" />
        </q-btn>
      </div>

    </div>
    <div class="upload-file">
      <div
        v-for="(item, index) in questionCategories.list"
        :key="index"
        class="row upload-file-side"
        style="width: 400px"
      >
        <div class="col">
          <q-file
            :ref="item.id + 'questionFile'"
            v-model="item.questionFile"
            accept=".pdf"
            color="orange"
            :label="'فایل سوالات ' + item.title"
            filled
            :disable="item.questions_booklet || item.loading.question ? true : false"
            @update:model-value="addFiles (item.questionFile, item, 'question')"
          >
            <template v-slot:append>
              <q-icon
                v-if="!item.loading.question"
                name="cancel"
                @click="deleteFile (item, 'questionFile', 'question')"
                class="cursor-pointer"
              />
            </template>
          </q-file>
          <div class="buttons-block">
            <q-btn
              class="full-width upload-file-btn"
              dense
              flat
              color="blue"
              icon-right="cloud_upload"
              label="آپلود"
              :loading="item.loading.question"
              :disabled="item.questions_booklet || !item.canUpload['question']"
              @click="upload(item, 'questionFile', 'questions_booklet', 'question')"
            />
            <a
              v-if="item.questions_booklet"
              :href="item.questions_booklet"
              target="_blank"
              :style="{ textDecoration: 'none'}"
            >
              <q-btn
                class="full-width upload-file-btn"
                dense
                color="orange"
                flat
                icon-right="file_download"
                label="دانلود"
              />
            </a>
          </div>
          <br>
          <q-file
            :ref="item.id + 'answerFile'"
            v-model="item.answerFile"
            accept=".pdf"
            color="orange"
            :label="'فایل پاسخ ' + item.title"
            filled
            :disable="item.descriptive_answers_booklet || item.loading.answer ? true :false"
            @update:model-value="addFiles (item.questionFile, item, 'answer')"
          >
            <template v-if="item.answerFile" v-slot:append>
              <q-icon
                v-if="!item.loading.answer"
                name="cancel"
                @click="deleteFile (item, 'answerFile', 'answer')"
                class="cursor-pointer"
              />
            </template>
          </q-file>
          <div class="buttons-block">
            <q-btn
              dense
              class="full-width upload-file-btn"
              color="blue"
              flat
              icon-right="cloud_upload"
              label="آپلود"
              :loading="item.loading.answer"
              :disabled="item.descriptive_answers_booklet || !item.canUpload['answer']"
              @click="upload(item, 'answerFile', 'descriptive_answers_booklet','answer')"
            />
            <a
              v-if="item.descriptive_answers_booklet"
              :href="item.descriptive_answers_booklet"
              target="_blank"
              :style="{ textDecoration: 'none' }"
            >
              <q-btn
                class="full-width upload-file-btn"
                dense
                color="orange"
                flat
                icon-right="file_download"
                label="دانلود"
              />
            </a>
          </div>
        </div>
      </div>
      <br>
    </div>
  </div>

</template>

<script>
import { QuestCategoryList } from 'src/models/QuestCategory'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'uploadFile',
  props: {
    examId: {
      type: String
    }
  },
  data () {
    return {
      questionCategories: new QuestCategoryList(),
      bookletOptions: [],
      canUpload: [],
      loading: []
    }
  },
  watch: {
    examId () {
      this.getBooklets()
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    goBack () {
      this.$router.push('/admin/exam')
    },
    getData () {
      this.$axios.get(API_ADDRESS.questionCategory.base)
        .then(response => {
          this.questionCategories = new QuestCategoryList(response.data.data)
          this.questionCategories.list.forEach(item => {
            item.questionFile = []
            item.answerFile = []
            item.loading = {
              question: false,
              answer: false
            }
            item.canUpload = {
              question: false,
              answer: false
            }
          })
        })
      this.getBookletOptions()
      this.getBooklets()
    },
    getBookletOptions () {
      this.$axios.get(API_ADDRESS.option.base + '?type=booklet_type')
        .then(response => {
          this.bookletOptions = response.data.data
        })
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
    addFiles (files, item, group) {
      item.canUpload[group] = true
    },
    upload (item, key, bookletType, group) {
      item.loading[group] = true
      const that = this
      const file = item[key]
      const formData = new FormData()
      formData.append('file', file, file.name)
      formData.append('category_id', item.id)
      const option = this.bookletOptions.find(option => option.value === bookletType)
      formData.append('booklet_type', option.id)
      that.$axios.post(API_ADDRESS.exam.examBookletUpload(this.examId), formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((res) => {
          item.loading[group] = false
          that.$q.notify({
            message: 'اطلاعات آزمون شما ثبت شد.',
            type: 'positive',
            position: 'top'
          })
          item[bookletType] = res.data.data.url
          item[key] = []
        })
        .catch(() => {
          item.loading[group] = false
        })
    },
    deleteFile (item, key, group) {
      item.canUpload[group] = false
      item[key] = []
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-file-container{
  width: 100%;
}
.upload-file {
  justify-content: center;
  display: flex;
  flex-direction: row;

  .upload-file-side {
    margin: 0 30px;

    .buttons-block {
      height: 90px;

      .upload-file-btn {
        margin-top: 10px;
      }
    }
  }
}
</style>
