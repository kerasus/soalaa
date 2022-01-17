<template>
  <v-dialog
    v-model="dialogStatus"
    fullscreen
    transition="dialog-bottom-transition"
    max-width="600"
  >
    <v-card>
      <v-btn
        color="red"
        @click="closeDialog"
      >
        close
      </v-btn>
      <v-card class="mt-10">
        <file-upload
          ref="answerImages"
          v-model="answerFiles"
          input-id="answerImages"
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
            color="primary"
            large
          >
            انتخاب عکس
          </v-btn>
        </file-upload>

        <v-col
          v-for="(file, index) in answerFiles"
          :key="index"
          class="col-5"
        >
          <v-card>
            <v-img
              :src="file.thumb"
              width="100%"
              height="60"
              class="mt-3"
            />
            <v-btn
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
      </v-card>
      <v-card-text>
        <v-btn @click="sendAnswerImg">
          send to backend
        </v-btn>
        <v-btn @click="confirmSendAllAnswerOfUser">
          گرفتن جواب ها
        </v-btn>
        <BubbleSheet
          :questions="questions"
          :info="{ type: 'scanned-pasokh-barg' }"
          :delay-time="0"
          @clickChoice="choiceClicked"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import FileUpload from 'vue-upload-component'
import ImageCompressor from "@xkeshi/image-compressor";
import BubbleSheet from '@/components/OnlineQuiz/Quiz/BubbleSheet/BubbleSheet'
import { mixinQuiz} from "@/mixin/Mixins";
import { Question } from '@/models/Question'
import {Exam} from "@/models/Exam";
// import ExamData from "@/assets/js/ExamData";
// import API_ADDRESS from "@/api/Addresses";
// import axios from "axios";

export default {
  name: "SendAnswerPhoto",
  components: {
    FileUpload,
    BubbleSheet
  },
  mixins: [mixinQuiz],
  props:{
    questions:{
      type: Array,
      default:() => []
    },
    examData:{
      type: Exam,
      default:() => new Exam()
    },
    dialogStatus:{
      type: Boolean,
      default: false
    },
  },
  data:()=>({
    answerFiles: [],
    extensions: 'gif,jpg,jpeg,png,webp',
    accept: 'image/jpg',
    size: 1024 * 1024 * 10,
    thread: 3,
    drop: true,
    dropDirectory: true,
    directory: false,
    createDirectory: false,
    addIndex: false,
    data: {},
    imgTest:{}
  }),
  created() {
  },
  mounted() {
    this.loadQuestions()
  },
  methods:{
    loadQuestions () {

    },
   choiceClicked(){
      console.log('choiceClicked clicked')
   },
    closeDialog(){
      this.$emit("closeDialog");
    },
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
          return prevent()
        }
        if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
          return prevent()
        }
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
        newFile.blob = ''
        let URL = (window.URL || window.webkitURL)
        if (URL) {
          newFile.blob = URL.createObjectURL(newFile.file)
        }
        newFile.thumb = ''
        if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
          newFile.thumb = newFile.blob
        }
      }

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
    inputFile(newFile, oldFile) {
      const files = {
        answerFiles: this.answerFiles
      }
      console.log('imgTest', this.imgTest)
      console.log('answerFiles', this.answerFiles)
      console.log('files', files)
      this.imgTest = this.answerFiles.map( item => item.file)
      if (newFile && oldFile) {
        // update
        if (newFile.active && !oldFile.active) {
          // beforeSend
          // min size
          if (newFile.size >= 0 && this.minSize > 0 && newFile.size < this.minSize) {
            this.$refs.answerImages.update(newFile, { error: 'size' })
          }
        }
      }
    },
    confirmSendAllAnswerOfUser() {
      let answers = this.getUserAnswers(this.examData.id)
      console.log('answers before', answers)
      answers = answers.map( answer => {
        return {
          q_n: answer.question_id,
          c_n: answer.choice_id
        }
      })
      console.log('answers after', answers)
    },
    async sendAnswerImg(){
      // let formData = new FormData();
      // console.log('this.answerFiles :',this.answerFiles[0].file)
     // formData.append('image', this.answerFiles[0].file);
     // console.log('form data ', formData.get('image'))
      // console.log('result  : ',formData.get('exams'))
      const response = {
        data: [
          {
            "q_n": 1,
            "c_n": [
              1
            ]
          },
          {
            "q_n": 2,
            "c_n": [
              2
            ]
          }
          ]
      }
let counter = 3
      while (counter <= 100) {
        let qkey = 'q_'+counter
        let akey = 'c_'+counter
        response.data.push(
            {
              [qkey]: counter,
              [akey]:[
                counter]
            }
      )
        counter++
      }
    // const examData = new ExamData()
    //  const getExamDataAndParticipate =  await  examData.getExamDataAndParticipate(this.examData.exam.id)
    //  console.log('getExamDataAndParticipate :', getExamDataAndParticipate)
    //  console.log('this.quiz :', this.quiz)
    // axios.post(API_ADDRESS.exam.sendAnswerSheetPhoto, formData)
    //   .then(res => {
    //     console.log(res)
    //
    //     })
    //   .catch(e => {
    //     console.log(e)
    //   })

    }
  }

}
</script>

<style scoped>

</style>
