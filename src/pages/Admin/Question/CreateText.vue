<template>
  <div class="createQ-text-container">
    <navbar
      :componentTabs="componentTabs"
      :loading="componentTabs.loading"
    />
    <div class="relative-position">
      <component
        v-if="question.type"
        :is="getComponent"
        v-bind="allProps"
      />
      <q-inner-loading
        :showing="question.loading"
        color="primary"
        class="QComponents-inner-loading"
        label-style="font-size: 1.1em"
      />
    </div>
    <div class="relative-position">
      <attach-exam/>
      <div class="attach-btn row">
        <question-details class="col-9"/>
        <btn-box
          class="col-3"
          @saveQuestion="setQuestionContents"
        />
      </div>
      <comment-box/>
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
import { defineAsyncComponent } from 'vue'
import Navbar from 'components/Question/QuestionPage/Create/textMode/Navbar'
import DynamicComponent from 'components/Question/QuestionPage/Create/textMode/questionTypes/DynamicComponent'
import { Question } from 'src/models/Question'
import QuestionDetails from 'components/Question/QuestionPage/Create/textMode/QuestionDetails'
import AdminActionOnQuestion from 'src/mixin/AdminActionOnQuestion'
import { QuestionType, TypeList } from 'src/models/QuestionType'
import AttachExam from 'components/Question/QuestionPage/AttachExam'
import CommentBox from 'components/Question/QuestionPage/CommentBox'
import BtnBox from 'components/Question/QuestionPage/BtnBox'
export default {
  name: 'CreateText',
  components: {
    DescriptiveQ: defineAsyncComponent(() => import('components/Question/QuestionPage/Create/textMode/questionTypes/DescriptiveQ/DescriptiveQ')),
    MultipleChoiceQ: defineAsyncComponent(() => import('components/Question/QuestionPage/Create/textMode/questionTypes/MultipleChoiceQ/MultipleChoiceQ')),
    MBTIQ: defineAsyncComponent(() => import('components/Question/QuestionPage/Create/textMode/questionTypes/MBTIQ/MBTIQ')),
    BtnBox,
    CommentBox,
    AttachExam,
    DynamicComponent,
    Navbar,
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
      allProps: {
        setContentToQuestion: false
      }
    }
  },
  provide () {
    return {
      question: this.question
    }
  },
  mounted () {
    this.setAllQuestionLoadings()
    this.getQuestionType()
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
.createQ-text-container {
  padding: 40px 100px;
  display: flex;
  flex-direction: column;
}
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
