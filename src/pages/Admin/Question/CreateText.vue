<template>
  <div class="createQ-text-container">
    <Navbar
      :componentTabs="componentTabs"
      :loading="componentTabs.loading"
    />
    <DynamicComponent
      v-if="currentComponent"
      :component="currentComponent"
      :key="componentKey"
      :allProps="allProps"
    />
    <AttachExam/>
    <div class="attach-btn row">
      <QuestionDetails class="col-9"/>
      <BtnBox class="col-3"/>
    </div>
    <CommentBox/>
  </div>
</template>

<script>
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
      componentKey: 0,
      currentComponent: null,
      question: new Question(),
      allProps: {}
    }
  },
  provide () {
    return {
      question: this.question
    }
  },
  mounted () {
    this.getQuestionType()
  },
  methods: {
    chosenComponent (question) {
      this.currentComponent = question.type
      this.forceRerenderComponent()
    },
    forceRerenderComponent () {
      this.componentKey += 1
    }
  },
  watch: {
    question: {
      handler (newValue, oldValue) {
        this.chosenComponent(newValue)
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
