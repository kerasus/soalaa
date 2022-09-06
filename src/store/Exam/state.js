// eslint-disable-next-line import/named
import { ref } from 'vue'

export default function () {
  return {
    quiz: ref(null),
    userQuizListData: ref({}),
    currentQuestion: ref(null),
    currentExamFrozenQuestions: ref(null),
    failedListAnswerData: ref([]),
    failedListStatusData: ref([]),
    failedListBookmarkData: ref([]),
    failedListUnBookmarkData: ref([])
  }
}
