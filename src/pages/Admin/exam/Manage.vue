<template>
<div>
  <exam-list
    @update-exam="selectExamInfo"
    @update-exam-report="selectExamReportInfo"
    @upload="selectUploadAnswers"
  />
  <q-dialog v-model="dialog" persistent>
    <q-card>
      <q-card-section>
        <q-btn icon="close" flat round dense @click="closeDialog" />
      </q-card-section>
      <q-card-section>
        <component :is="selectComponent"/>
      </q-card-section>
    </q-card>
  </q-dialog>
  <exam-info/>
  <exam-report-info/>
  <upload-answers/>
</div>
</template>

<script>
import ExamList from 'src/components/OnlineQuiz/Quiz/ExamList'
import ExamInfo from 'src/components/OnlineQuiz/Quiz/ExamInfo'
import ExamReportInfo from 'src/components/OnlineQuiz/Quiz/ExamReportInfo'
import UploadAnswers from 'src/components/OnlineQuiz/Quiz/uploadAnswers'
import { Exam } from 'src/models/Exam'

export default {
  name: 'Manage',
  components: { ExamList, ExamInfo, ExamReportInfo, UploadAnswers },
  data () {
    return {
      dialog: false,
      exam: new Exam(),
      selectComponent: '',
      examInfo: false,
      examReportInfo: false,
      uploadAnswers: false
    }
  },
  methods: {
    dialogComponent () {
      if (this.examInfo) {
        this.selectComponent = 'ExamInfo'
      } else if (this.examReportInfo) {
        this.selectComponent = 'ExamReportInfo'
      } else if (this.uploadAnswers) {
        this.selectComponent = 'uploadAnswers'
      }
    },
    selectExamInfo (event) {
      this.exam = new Exam(event)
      this.examInfo = true
      this.dialogComponent()
      this.dialog = true
    },
    selectExamReportInfo (event) {
      this.exam = new Exam(event)
      this.examReportInfo = true
      this.dialogComponent()
      this.dialog = true
    },
    selectUploadAnswers (event) {
      this.exam = new Exam(event)
      this.uploadAnswers = true
      this.dialogComponent()
      this.dialog = true
    },
    closeDialog () {
      this.dialog = false
      this.examInfo = false
      this.examReportInfo = false
      this.uploadAnswers = false
    }
  }
}
</script>

<style scoped>

</style>
