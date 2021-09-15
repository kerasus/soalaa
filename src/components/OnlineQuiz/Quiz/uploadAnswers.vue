<template>
  <v-container class="upload-booklet-file">
    <v-row
      v-for="(item, index) in questionCategories.list"
      :key="index"
    >
      <v-col md="6">
        <VueFileAgent
          :ref="item.id + 'questionFile'"
          v-model="item.questionFile"
          dir="ltr"
          :multiple="false"
          deletable
          accept=".pdf"
          :max-files="1"
          :help-text="'فایل سوالات ' + item.title"
          @select="select($event, item, 'questionFile')"
          @beforedelete="onBeforeDelete($event, item, 'questionFile')"
          @delete="fileDeleted($event, item, 'questionFile')"
        />
        <v-btn
          :elevation="0"
          class="upload-btn"
          block
          color="blue"
          :disabled="!listLength(item, 'questionFile') "
          @click="uploadFiles(item, 'questionFile', 'questions_booklet')"
        >
          آپلود
        </v-btn>
      </v-col>
      <v-col md="6">
        <VueFileAgent
          :ref="item.id + 'answerFile'"
          v-model="item.answerFile"
          :multiple="false"
          deletable
          accept=".pdf"
          :max-files="1"
          :help-text="'فایل پاسخ ' + item.title"
          @select="select($event, item, 'answerFile')"
          @beforedelete="onBeforeDelete($event, item, 'answerFile')"
          @delete="fileDeleted($event, item.answerFile)"
        />
        <v-btn
          :elevation="0"
          class="upload-btn"
          block
          color="blue"
          :disabled="!listLength(item, 'answerFile') "
          @click="uploadFiles(item, 'answerFile', 'descriptive_answers_booklet')"
        >
          آپلود
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from 'vue';
import VueFileAgent from 'vue-file-agent';
import VueFileAgentStyles from 'vue-file-agent/dist/vue-file-agent.css';
import axios from "axios";
import {QuestCategoryList} from "@/models/QuestCategory";
import API_ADDRESS from "@/api/Addresses";

Vue.use(VueFileAgent);

export default {
  name: "UploadAnswers",
  props: ['exam_id'],
  data () {
    return {
      questionCategories: new QuestCategoryList(),
      random: 0,
      options: []
    }
  },
  computed: {
    listLength () {
      this.random
      return (item, key) => {
        return item[key].length
      }
    }
  },
  created () {
    axios.get(API_ADDRESS.questionCategory.base)
    .then(response => {
      this.questionCategories = new QuestCategoryList(response.data.data)
      this.questionCategories.list.forEach(item => {
        item.questionFile = []
        item.answerFile = []
      })
    })
    axios.get(API_ADDRESS.option.base + '?type=booklet_type')
    .then(response => {
      this.options = response.data.data
    })
  },
  methods: {
    select (event, item, key) {
      console.log(event, item, key)
      this.random = Math.random()
      Vue.set(item, key, event)
    },
    uploadFiles (item, key, booklet_type) {
      let that = this
      item[key].forEach(file => {
        const formData = new FormData()
        formData.append('file', file.file, file.file.name)
        formData.append('category_id', item.id)
        const option = this.options.find(option => option.value === booklet_type)
        formData.append('booklet_type', option.id)
        axios.post(API_ADDRESS.exam.examBookletUpload(this.exam_id), formData,{
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent => {
            that.$refs[item.id + key][0].fileRecords[0].progressInternal = parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 ))
          })
        })
        .then((res) => {
          console.log(res)
        })
      })
      item[key] = []
    },
    onBeforeDelete: function (event, item, key) {
      Vue.set(item, key, [])
      this.$refs[item.id + key][0].deleteFileRecord(event)
      this.random = Math.random()
    },
    fileDeleted: function (event, item) {
      item = []
    },
  }
}
</script>

<style scoped>

</style>

<style>
.upload-booklet-file .file-size {
  font-family: sans-serif;
  direction: ltr;
}

.upload-booklet-file .upload-btn {
  color: #fff;
  margin-top: 5px;
}

</style>
