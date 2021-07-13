<template>
  <v-container class="upload-booklet-file">
    <v-row v-for="(item, index) in questionCategories.list" :key="index">
      <v-col md="6">
        <VueFileAgent
            dir="ltr"
            :ref="item.id + 'questionFile'"
            v-model="item.questionFile"
            :multiple="false"
            deletable
            accept=".pdf"
            :maxFiles="1"
            @select="select($event, item, 'questionFile')"
            @beforedelete="onBeforeDelete($event, item, 'questionFile')"
            @delete="fileDeleted($event, item, 'questionFile')"
            :helpText="'فایل سوالات ' + item.title"
        />
        <v-btn :elevation="0" class="upload-btn" block color="blue" :disabled="!listLength(item, 'questionFile') " @click="uploadFiles(item, 'questionFile')">
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
            :maxFiles="1"
            @select="select($event, item, 'answerFile')"
            @beforedelete="onBeforeDelete($event, item, 'answerFile')"
            @delete="fileDeleted($event, item.answerFile)"
            :helpText="'فایل پاسخ ' + item.title"
        />
        <v-btn :elevation="0" class="upload-btn" block color="blue" :disabled="!listLength(item, 'answerFile') " @click="uploadFiles(item, 'answerFile')">
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
  name: "uploadAnswers",
  data () {
    return {
      questionCategories: new QuestCategoryList(),
      random: 0
    }
  },
  props: ['exam_id'],
  methods: {
    select (event, item, key) {
      console.log(event, item, key)
      this.random = Math.random()
      Vue.set(item, key, event)
    },
    uploadFiles (item, key) {
      let that = this
      item[key].forEach(file => {
        const formData = new FormData()
        formData.append('file', file.file, file.file.name)
        formData.append('category_id', '60b7858d743940688b23c7f4')
        formData.append('booklet_type', 'questions_booklet')
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
  },
  computed: {
    listLength () {
      this.random
      return (item, key) => {
        return item[key].length
      }
    }
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
