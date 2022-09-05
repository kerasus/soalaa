<template>
  <question-item v-if="questions.loading"
                 :question="loadingQuestion" />
  <template v-else>
    <question-item v-for="question in questions.list"
                   :key="question.id"
                   :question="question" />
  </template>
</template>

<script>
import QuestionItem from '../QuestionItem/QuestionItem'
import { Question, QuestionList } from 'src/models/Question'
export default {
  name: 'QuestionList',
  components: { QuestionItem },
  props: {
    questions: {
      type: QuestionList,
      default: new QuestionList()
    }
  },
  data () {
    return {
      loadingQuestion: new Question({ loading: true })
    }
  }
}
</script>
