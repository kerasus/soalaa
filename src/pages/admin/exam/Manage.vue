<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <exam-list
          ref="examList"
          @update-exam-id="updateExamId"
          @update-exam-report-id="updateReportExamId"
        />
      </v-col>
      <v-dialog
        v-model="dialog"
        max-width="800px"
      >
        <v-sheet>
          <v-row>
            <v-btn
              icon
              :style="{ margin: '20px' }"
              @click="dialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-row>
          <v-row>
            <v-col>
              <exam-info
                col-lg="5"
                cols="12"
                :exam="exam"
                @refresh-exam-list="rereshExamList"
              />
            </v-col>
          </v-row>
        </v-sheet>
      </v-dialog>
      <v-dialog
        v-model="reportDialog"
        max-width="600px"
      >
        <v-sheet>
          <v-row>
            <v-btn
              icon
              :style="{ margin: '20px' }"
              @click="reportDialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-row>
          <v-row>
            <v-col>
              <exam-report-info
                col-lg="5"
                cols="12"
                :exam="exam"
                @refresh-exam-list="rereshExamList"
              />
            </v-col>
          </v-row>
        </v-sheet>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import ExamInfo from "@/components/OnlineQuiz/Quiz/examInfo";
import ExamReportInfo from "@/components/OnlineQuiz/Quiz/examReportInfo";
import ExamList from "@/components/OnlineQuiz/Quiz/examList";
import {Exam} from "@/models/Exam";

export default {
  name: 'Manage',
  components: {ExamList, ExamInfo, ExamReportInfo},
  data: () => ({
    exam: new Exam(),
    dialog: false,
    reportDialog: false,
  }),
  sockets: {
    connecting() {
      this.onSocketStatusChange('on connection')
    },
    disconnect() {
      this.onSocketStatusChange('Socket to break off')
      // this.isConnected = false;
    },
    connect_failed() {
      this.onSocketStatusChange('connection failed')
    },
    connect() {
      this.onSocketStatusChange('socket connected')
      // Fired when the socket connects.
      // this.isConnected = true
    },


    // Fired when the server sends something on the "messageChannel" channel.
    messageChannel() {
      // console.log('messageChannel: ', data)
    },
    'question.file-link:update': function (data) {
      console.log('question.file-link:update: ', data)
    },
    questionFileLinkUpdate (data) {
      console.log('questionFileLinkUpdate: ', data)
    }
  },
  methods: {
    onSocketStatusChange (status) {
      // this.socketStatus = status
      console.log(status)
    },
    rereshExamList() {
      this.dialog = false
      this.reportDialog = false
      this.$refs.examList.getExams()
    },
    updateExamId(e) {
      this.exam = new Exam(e)
      this.dialog = true
    },
    updateReportExamId(e) {
      this.exam = new Exam(e)
      this.reportDialog = true
    }
  }
}
</script>

<style scoped>

</style>
