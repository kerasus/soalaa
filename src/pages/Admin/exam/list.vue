<template>
  <div>
    <exam-list
      @upload="selectUploadAnswers"
    />
    <q-dialog
      v-model="dialog"
      persistent
    >
      <q-card>
        <q-card-section>
          <q-btn icon="close" flat round dense @click="closeDialog" />
        </q-card-section>
        <q-card-section>
          <upload-file :examId="id"/>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import ExamList from 'src/components/OnlineQuiz/Quiz/ExamList'
import uploadFile from 'src/components/OnlineQuiz/Quiz/uploadFile'

export default {
  name: 'list',
  components: { ExamList, uploadFile },
  data () {
    return {
      dialog: false,
      id: null
    }
  },
  methods: {
    selectUploadAnswers (id) {
      this.id = id
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
.q-dialog__inner--minimized > div {
  max-width: 800px;
}
</style>
