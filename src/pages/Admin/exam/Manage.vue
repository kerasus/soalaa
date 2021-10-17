<template>
<div>
  <exam-list/>
  <exam-info/>
  <exam-report-info/>
  <upload-answers/>
</div>
</template>

<script>
import ExamInfo from 'src/components/OnlineQuiz/Quiz/ExamInfo'
import ExamReportInfo from 'src/components/OnlineQuiz/Quiz/ExamReportInfo'
import UploadAnswers from 'src/components/OnlineQuiz/Quiz/uploadAnswers'
import ExamList from 'src/components/OnlineQuiz/Quiz/ExamList'
export default {
  name: 'Manage',
  components: { ExamList, ExamInfo, ExamReportInfo, UploadAnswers }
}
</script>

<style scoped>

</style>
