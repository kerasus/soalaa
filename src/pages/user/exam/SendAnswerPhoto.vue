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
        <v-spacer/>
      </v-toolbar>
      <v-row class="justify-center">
        <v-col cols="8">
          <v-card
              flat
              class="mt-10 pt-5 text-center"
          >

            <v-alert
                color="cyan"
                border="left"
                elevation="2"
                colored-border
                class="mx-5 text-right"
            >
              {{ exam.title }}
            </v-alert>

            <v-row class="align-end ">
              <v-col
                  class="ma-5 col-4 text-right"
              >
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
                      large
                      dark
                      color="#FF8F00"
                  >
                    {{ answerFiles.length > 0 ? 'تغییر عکس' : 'انتخاب عکس ' }}
                  </v-btn>
                </file-upload>
              </v-col>
              <v-col
                  v-for="(file, index) in answerFiles"
                  :key="index"
                  class="mx-5 col-6 text-right"
              >
                <v-badge
                    class="uploaded-image"
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
                      :width="'100%'"
                  />
                </v-badge>
              </v-col>
            </v-row>
            <v-row>
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
                    v-if="!showUserAnswers"
                    dark
                    color="#1E88E5"
                    class="mx-5"
                    outlined
                    @click="sendAnswerImg"
                >
                  ارسال تصویر
                </v-btn>
                <v-btn
                    v-if="showUserAnswers"
                    dark
                    color="#43A047"
                    outlined
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
import {mixinQuiz} from "@/mixin/Mixins";
import {Question} from '@/models/Question'
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
  props: {
    exam: {
      type: Exam,
      default: () => new Exam()
    },
    dialogStatus: {
      type: Boolean,
      default: false
    },
  },
  watch: {
    dialogStatus (newVal) {
      if (!newVal) {
        this.closeDialog()
      }
    }
  },
  data: () => ({
    hasPhoto: false,
    loading: false,
    answerFiles: [],
    showUserAnswers: false,
    extensions: 'gif,jpg,jpeg,png,webp',
    accept: 'image/jpeg',
    size: 1024 * 1024 * 10,
    thread: 3,
    drop: true,
    dropDirectory: true,
    directory: false,
    createDirectory: false,
    addIndex: false,
    data: {},
    imgTest: {},
    questions: []

  }),
  mounted() {
  },
  methods: {
    removePhoto() {
      this.showUserAnswers = false
      // this.$refs.answerImages.remove(file)
      this.$refs.answerImages.clear()
    },
    choiceClicked() {
      console.log('this.$refs.answerImages', this.$refs.answerImages)
    },
    closeDialog() {
      this.questions = []
      this.removePhoto()
      this.$emit('closeDialog');
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
                this.$refs.answerImages.update(newFile, {error: '', file, size: file.size, type: file.type})
              })
              .catch((err) => {
                this.$refs.answerImages.update(newFile, {error: err.message || 'compress'})
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
          this.$refs.answerImages.update(newFile, {error: 'parsing image size'})
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
            this.$refs.answerImages.update(newFile, {error: 'size'})
          }
        }
      }
    },
    confirmSendAllAnswerOfUser() {
      let answers = this.getUserAnswers(this.exam.id)
      answers = answers.map(answer => {
        return {
          q_n: answer.question_id,
          c_n: answer.choice_id
        }
      })
      this.sendAnswers(answers)
    },
    sendAnswers(answers) {
      this.loading = true
      axios.post(API_ADDRESS.exam.sendScannedAnswers, {
        exam_user_id: this.exam.user_exam_id,
        questions: answers
      })
          .then(() => {
            this.$notify({
              group: 'notifs',
              title: 'توجه!',
              text: 'پاسخنامه شما با موفقیت ثبت شد.',
              type: 'success'
            })
            this.loading = false
            this.closeDialog()
          })
          .catch(() => {
            this.loading = false
          })
    },
    sendPhoto() {
      let formData = new FormData()
      formData.append('image', this.answerFiles[0].file)
      return axios.post(API_ADDRESS.exam.sendAnswerSheetPhoto, formData)
    },
    showBubbleSheet(bubbleSheetResponse) {
      this.loadExamData()
      this.reloadQuestions(bubbleSheetResponse)
      this.reloadUserExamData(bubbleSheetResponse)
      this.showUserAnswers = true
    },
    loadExamData() {
      this.bubbleSheetDialogExam = new Exam(this.exam)
      this.$store.commit('updateQuiz', this.bubbleSheetDialogExam)
    },
    reloadUserExamData(bubbleSheetResponse) {
      const userAnswerResponse = this.convertBubbleSheetResponseToUserAnswerResponse(this.bubbleSheetDialogExam.user_exam_id, bubbleSheetResponse)
      this.$store.commit('clearExamData', this.bubbleSheetDialogExam.id)
      this.$store.commit('mergeDbAnswersIntoLocalstorage', {
        dbAnswers: userAnswerResponse,
        exam_id: this.bubbleSheetDialogExam.id
      })
    },
    reloadQuestions(bubbleSheetResponse) {
      this.questions = []
      const bubbleSheetResponseLength = bubbleSheetResponse.length
      for (let i = 0; i < bubbleSheetResponseLength; i++) {
        this.questions.push(new Question({
          id: bubbleSheetResponse[i].q_n,
          has_warning: (typeof bubbleSheetResponse[i].c_n[1] !== 'undefined')
        }))
      }
    },
    async sendAnswerImg() {
      this.loading = true
      try {
        const response = await this.sendPhoto()
        this.showBubbleSheet(response.data.data)
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    }
  }

}
</script>

<style scoped>
.uploaded-image {
  width: 300px;
}
</style>
