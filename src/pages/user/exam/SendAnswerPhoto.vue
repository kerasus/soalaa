<template>
  <v-dialog
    v-model="dialogStatus"
    fullscreen
    transition="dialog-bottom-transition"
    class="text-center"
  >
    <v-card class="text-center">
      <v-toolbar
        dark
        color="#ffc107"
      >
        <v-btn
          icon
          dark
          @click="closeDialog"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>ارسال تصویر پاسخنامه</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <v-row class="justify-center">
        <v-col cols="8">
          <v-card
            class="mt-10 text-center"
          >
            <v-row>
              <file-upload
                ref="answerImages"
                v-model="answerFiles"
                class="ma-5 col-6 text-right"
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
                  large
                  dark
                  color="#FF8F00"
                >
                  انتخاب عکس
                </v-btn>
              </file-upload>
            </v-row>
            <v-row>
              <v-col
                v-for="(file, index) in answerFiles"
                :key="index"
                class="mx-5 col-6 text-right"
              >
                <v-badge
                  color="transparent"
                  overlap
                >
                  <template v-slot:badge>
                    <v-btn
                      fab
                      dark
                      x-small
                      color="error"
                      class="btnRemoveFile"
                      @click.prevent="removePhoto(file)"
                    >
                      <v-icon dark>
                        mdi-close
                      </v-icon>
                    </v-btn>
                  </template>
                  <v-img
                    :src="file.thumb"
                    width="100%"
                  />
                </v-badge>
              </v-col>
              <!--              <v-col class="text-right">-->
              <!--                <v-alert-->
              <!--                  v-if="showUserAnswers"-->
              <!--                  outlined-->
              <!--                  type="warning"-->
              <!--                  prominent-->
              <!--                  border="left"-->
              <!--                />-->
              <!--              </v-col>-->
              <v-col
                v-if="answerFiles.length>0"
                class="col-6 text-right"
              >
                <v-btn
                  dark
                  color="#1E88E5"
                  class="mx-5"
                  @click="sendAnswerImg"
                >
                  ارسال تصویر
                </v-btn>
                <v-btn
                  dark
                  color="#43A047"
                  @click="confirmSendAllAnswerOfUser"
                >
                  تأیید نهایی
                </v-btn>
              </v-col>
            </v-row>
            <v-card-text>
              <BubbleSheet
                v-if="showUserAnswers"
                :questions="questions"
                :info="{ type: 'scanned-pasokh-barg' }"
                :delay-time="0"
                @clickChoice="choiceClicked"
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <v-overlay :value="loading">
      در حال پردازش
      <v-progress-circular
        indeterminate
        color="amber"
      />
    </v-overlay>
  </v-dialog>
</template>

<script>
import FileUpload from 'vue-upload-component'
import ImageCompressor from "@xkeshi/image-compressor";
import BubbleSheet from '@/components/OnlineQuiz/Quiz/BubbleSheet/BubbleSheet'
import { mixinQuiz} from "@/mixin/Mixins";
import { Question } from '@/models/Question'
import {Exam} from "@/models/Exam";
 import API_ADDRESS from "@/api/Addresses";
 import axios from "axios";

export default {
  name: "SendAnswerPhoto",
  components: {
    FileUpload,
    BubbleSheet
  },
  mixins: [mixinQuiz],
  props:{
    exam:{
      type: Exam,
      default:() => new Exam()
    },
    dialogStatus:{
      type: Boolean,
      default: false
    },
  },
  data:()=>({
    hasPhoto: false,
    loading:false,
    answerFiles: [],
    showUserAnswers:false,
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
    imgTest:{},
    questions:[]

  }),
  mounted() {
    this.loadQuestions()
  },
  methods:{
    removePhoto(file){
      this.showUserAnswers=false
      this.$refs.answerImages.remove(file)
    },
    loadQuestions () {
    },
   choiceClicked(){

   },
    closeDialog(){
      this.questions= []
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
      let answers = this.getUserAnswers(this.exam.id)
      console.log('answers before', answers)
      answers = answers.map( answer => {
        return {
          q_n: answer.question_id,
          c_n: answer.choice_id
        }
      })
      this.sendAnswers(answers)
      console.log('answers after', answers)
    },
    sendAnswers(answers){
      //TODO invalid data
      axios.post(API_ADDRESS.exam.sendAnswersAfterExam , {
        exam_user_id: this.exam.user_exam_id,
        questions:answers
      })
    },
    sendPhoto(){
      let formData = new FormData()
      formData.append('image',this.answerFiles[0].file)
      return axios.post(API_ADDRESS.exam.sendAnswerSheetPhoto, formData)
    },
    showBubbleSheet(bubbleSheetResponse){
      this.bubbleSheetDialogExam = new Exam(this.exam)
      this.$store.commit('updateQuiz', this.bubbleSheetDialogExam)
      for (let i = 0; i < bubbleSheetResponse.length; i++) {
        this.questions.push(new Question({
          id: bubbleSheetResponse[i].q_n,
          has_warning: (typeof bubbleSheetResponse[i].c_n[1] !== 'undefined')
        }))
      }

      const userAnswerResponse = this.convertBubbleSheetResponseToUserAnswerResponse(this.bubbleSheetDialogExam.user_exam_id, bubbleSheetResponse)

      console.log('userAnswerResponse', userAnswerResponse)
      this.$store.commit('clearExamData', this.bubbleSheetDialogExam.id)
      this.$store.commit('mergeDbAnswersIntoLocalstorage', {
        dbAnswers: userAnswerResponse,
        exam_id: this.bubbleSheetDialogExam.id
      })
      this.showUserAnswers = true
    },
    async sendAnswerImg(){
      // this.$store.commit('AppLayout/updateOverlay', {show: true, loading: true, text: 'در حال پردازش'})
      this.loading = true
      try {
        const response  = await this.sendPhoto()
        this.showBubbleSheet(response)
        this.loading = false
      }catch (e) {
        this.loading = false
        let counter = 2
        let fakeData =[{  q_n: 1, c_n:[1,3]}]
        while (counter <= 100) {
          fakeData.push(
              {
                q_n: counter,
                c_n:[3]
              }
          )
          counter++
        }
        this.showBubbleSheet(fakeData)
      }
    }
  }

}
</script>

<style scoped>

</style>
