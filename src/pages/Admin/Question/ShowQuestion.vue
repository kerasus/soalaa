<template>
  <div class="showQ-text-container">
    <q-linear-progress
      v-if="question.loading"
      indeterminate
      color="primary"
      class="q-mt-sm"
    />
    <navbar
      :mode="'show'"
      @panelClicked="openImgPanel"
    />
    <div class="relative-position">
      <div
        class="row"
      >
        <component
          v-if="question.type"
          :is="getComponent"
          v-bind="allProps"
          class="col-9"
        />
        <div
          v-if="isPanelOpened"
          class="col-3"
        >
          <image-panel/>
        </div>
      </div>
    </div>
    <div class="relative-position">
      <attach-exam
        :exams="examList"
        :lessons="subCategoriesList"
        @detach="detachSavedExam"
      />
      <q-inner-loading
        :showing="question.exams.loading"
        color="primary"
        class="QComponents-inner-loading"
        label-style="font-size: 1.1em"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable no-var */
import { computed, defineAsyncComponent } from 'vue'
import { Question } from 'src/models/Question'
import Navbar from 'components/Question/QuestionPage/Create/textMode/Navbar'
import QuestionDetails from 'components/Question/QuestionPage/Create/textMode/QuestionDetails'
import AdminActionOnQuestion from 'src/mixin/AdminActionOnQuestion'
import { QuestionType, TypeList } from 'src/models/QuestionType'
import AttachExam from 'components/Question/QuestionPage/AttachExam'
import CommentBox from 'components/Question/QuestionPage/StatusChange'
import BtnBox from 'components/Question/QuestionPage/BtnBox'
import { ExamList } from 'src/models/Exam'
import { QuestSubcategoryList } from 'src/models/QuestSubcategory'
import { QuestionStatusList } from 'src/models/QuestionStatus'
import ImagePanel from 'components/Question/QuestionPage/ImagePanel'
// import API_ADDRESS from 'src/api/Addresses'
export default {
  name: 'ShowQuestion',
  components: {
    ImagePanel,
    Navbar,
    DescriptiveQ: defineAsyncComponent(() => import('components/Question/QuestionPage/Show/questionTypes/DescriptiveQ/DescriptiveQ')),
    MultipleChoiceQ: defineAsyncComponent(() => import('components/Question/QuestionPage/Show/questionTypes/MultipleChoiceQ/MultipleChoiceQ')),
    MBTIQ: defineAsyncComponent(() => import('components/Question/QuestionPage/Show/questionTypes/MBTIQ/MBTIQ')),
    BtnBox,
    CommentBox,
    AttachExam,
    QuestionDetails
  },
  mixins: [
    AdminActionOnQuestion
  ],
  props: {},
  data () {
    return {
      questionType: new QuestionType(),
      componentTabs: new TypeList(),
      question: new Question(),
      allProps: {},
      examList: new ExamList(),
      subCategoriesList: new QuestSubcategoryList(),
      questionStatuses: new QuestionStatusList(),
      isPanelOpened: false
    }
  },
  created () {
    this.enableLoading()
    // this.getPageReady()
    this.getQuestionById(this.getCurrentQuestionId())
    this.loadExamList()
  },
  provide () {
    return {
      providedQuestion: computed(() => this.question)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.disableLoading()
    })
  },
  methods: {
    chosenComponent () {
      const cName = this.question.type.componentName
      if (cName === 'MultipleChoiceQ') {
        return 'multiple-choice-q'
      }
      if (cName === 'DescriptiveQ') {
        return 'descriptive-q'
      }
      if (cName === 'MBTIQ') {
        return 'm-b-t-i-q'
      }
    },
    setQuestionContents () {
      this.allProps.setContentToQuestion = true
    },
    enableLoading () {
      this.question.loading = true
    },
    disableLoading () {
      this.question.loading = false
    },
    openImgPanel () {
      this.isPanelOpened = true
    }
  },
  computed: {
    getComponent () {
      // updates even if properties inside are updated
      return this.chosenComponent(this.question.type)
    }
  },
  watch: {
    question: {
      handler (newValue, oldValue) {
        // console.log('question', newValue)
      },
      deep: true
    }
  }
}
</script>

<style scoped lang="scss">
.showQ-text-container {
  padding: 40px 100px;
  display: flex;
  flex-direction: column;
}
</style>
