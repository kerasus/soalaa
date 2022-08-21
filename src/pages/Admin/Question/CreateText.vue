<template>
  <div class="createQ-text">
    <navbar
      :componentTabs="componentTabs"
      :loading="componentTabs.loading"
    />
    <div class="relative-position">
      <!--      <component-->
      <!--        v-if="question.type"-->
      <!--        :is="getComponent"-->
      <!--        v-bind="allProps"-->
      <!--      />-->
      <q-inner-loading
        :showing="question.loading"
        color="primary"
        class="QComponents-inner-loading"
        label-style="font-size: 1.1em"
      />
    </div>
    <div class="relative-position">
      <attach-exam
        :exams="examList"
        :lessons="subCategoriesList"
      />
      <div class="attach-btn row">
        <question-identifier class="col-9" />
        <btn-box
          class="col-3"
          @saveQuestion="setQuestionContents"
        />
      </div>
      <comment-box />
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
// import { defineAsyncComponent } from 'vue'
import Navbar from 'components/Question/QuestionPage/Create/textMode/Navbar'
// import DynamicComponent from 'components/Question/QuestionPage/Create/textMode/questionTypes/DynamicComponent'
import { Question } from 'src/models/Question'
import AdminActionOnQuestion from 'src/mixin/AdminActionOnQuestion'
import { QuestionType, TypeList } from 'src/models/QuestionType'
import AttachExam from 'components/Question/QuestionPage/AttachExam/AttachExam'
import CommentBox from 'components/Question/QuestionPage/StatusChange'
import BtnBox from 'components/Question/QuestionPage/BtnBox'
import { ExamList } from 'src/models/Exam'
import { QuestSubcategoryList } from 'src/models/QuestSubcategory'
import QuestionIdentifier from 'components/Question/QuestionPage/QuestionIdentifier'
// import API_ADDRESS from 'src/api/Addresses'
export default {
  name: 'CreateText',
  components: {
    QuestionIdentifier,
    BtnBox,
    CommentBox,
    AttachExam,
    Navbar
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
      allProps: {
        setContentToQuestion: false
      },
      examList: new ExamList(),
      subCategoriesList: new QuestSubcategoryList()
    }
  },
  created () {
    // console.log(this.$route, 'this.$route')
    // console.log(this.$router, 'this.$router')
  },
  provide () {
    return {
      question: this.question
    }
  },
  mounted () {
    this.setAllQuestionLoadings()
    this.getQuestionType()
    this.loadExamList()
    this.loadSubcategories()
    this.loadCategories()
  },
  methods: {
    chosenComponent (questionType) {
      const cName = questionType.componentName
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
.slide-fade-enter-active {
   transition: all 0.3s ease-out;
 }

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
<style lang="scss">
.QComponents-inner-loading{
  background-color: #a6a6a65c;
}
</style>
<style lang="sass">
.example-fab-animate,
.q-fab:hover .example-fab-animate--hover
  animation: example-fab-animate 0.82s cubic-bezier(.36,.07,.19,.97) both
  transform: translate3d(0, 0, 0)
  backface-visibility: hidden
  perspective: 1000px

@keyframes example-fab-animate
  10%, 90%
    transform: translate3d(-1px, 0, 0)

  20%, 80%
    transform: translate3d(2px, 0, 0)

  30%, 50%, 70%
    transform: translate3d(-4px, 0, 0)

  40%, 60%
    transform: translate3d(4px, 0, 0)
</style>
