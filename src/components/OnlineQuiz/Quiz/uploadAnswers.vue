<template>
  <div  class="upload-file">
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
          loading="true"
        >
          <template v-if="item.questionFile" v-slot:append>
            <q-icon name="attach_file" />
            <q-icon name="cancel" @click.stop.prevent="item.questionFile = null" class="cursor-pointer"/>
          </template>
        </q-file>
        <div>
          <q-btn
            class="full-width"
            dense
            flat
            color="blue"
            icon-right="cloud_upload"
            label="آپلود"
            @click="upload(item, 'questionFile', 'questions_booklet')"
          />
          <q-btn
            class="full-width"
            dense
            color="orange"
            flat
            icon-right="file_download"
            label="دانلود"
            @click="test"
          />
        </div>
        <br>
        <q-file
          :ref="item.id + 'answerFile'"
          v-model="item.answerFile"
          accept=".pdf"
          color="orange"
          :label="'فایل پاسخ ' + item.title"
          filled
        >
          <template v-if="item.answerFile" v-slot:append>
            <q-icon name="attach_file" />
            <q-icon name="cancel" @click.stop.prevent="item.answerFile = null" class="cursor-pointer"/>
          </template>
        </q-file>
        <div>
          <q-btn
            dense
            color="blue"
            flat
            icon-right="cloud_upload"
            label="آپلود"
            @click="upload(item, 'answerFile', 'questions_booklet')"
          />
          <q-btn
            dense
            color="orange"
            flat
            icon-right="file_download"
            label="دانلود"
            @click="test"
          />
        </div>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
import { QuestCategoryList } from 'src/models/QuestCategory'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'uploadAnswers',
  props: {
    examId: {
      type: String
    }
  },
  data () {
    return {
      questionCategories: new QuestCategoryList(),
      options: [],
      files: null
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
        console.log(this.questionCategories)
        console.log('list: ', this.questionCategories.list)
        this.questionCategories.list.forEach(item => {
          item.questionFile = []
          item.answerFile = []
        })
      })
    this.$axios.get(API_ADDRESS.option.base + '?type=booklet_type')
      .then(response => {
        this.options = response.data.data
      })
    this.getBooklets()
  },
  methods: {
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
      const file = item[key]
      console.log('file:', file)
      const formData = new FormData()
      formData.append('file', file, file.name)
      formData.append('category_id', item.id)
      const option = this.options.find(option => option.value === bookletType)
      formData.append('booklet_type', option.id)
      that.$axios.post(API_ADDRESS.exam.examBookletUpload(this.examId), formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((res) => {
          console.log('uploadFiles', res)
          that.$q.notify({
            message: 'اطلاعات آزمون شما ثبت شد.',
            type: 'positive',
            position: 'top'
          })
          item[bookletType] = res.data.data.url
          item[key] = []
        })
        .catch((err) => {
          console.log('err', err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-file{
  display: flex;
  flex-direction: row;
  .upload-file-side{
    margin: 0 30px;
  }
}
</style>
