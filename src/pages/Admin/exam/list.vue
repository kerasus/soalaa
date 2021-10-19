<template>
  <div>
    <exam-list
      @upload="selectUploadAnswers"
    />
    <q-dialog v-model="dialog" persistent>
      <q-card>
        <q-card-section>
          <q-btn icon="close" flat round dense @click="closeDialog" />
        </q-card-section>
        <q-card-section>
          <upload-answers examId="id"/>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import ExamList from 'src/components/OnlineQuiz/Quiz/ExamList'
import UploadAnswers from 'src/components/OnlineQuiz/Quiz/uploadAnswers'
import { Exam } from 'src/models/Exam'

export default {
  name: 'Manage',
  components: { ExamList, UploadAnswers },
  data () {
    return {
      dialog: false,
      exam: new Exam()
    }
  },
  methods: {
    selectUploadAnswers (id) {
      this.exam = new Exam(id)
      this.dialog = true
    },
    closeDialog () {
      this.dialog = false
      this.uploadAnswers = false
    }
  }
}
</script>

<style scoped>

</style>
