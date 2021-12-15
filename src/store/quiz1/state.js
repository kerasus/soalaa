import { ref } from 'vue'

export default function () {
  return {
    quiz: ref(null),
    userQuizListData: ref({}),
    currentQuestion: ref(null),
    currentExamFrozenQuestions: ref(null)
  }
}
