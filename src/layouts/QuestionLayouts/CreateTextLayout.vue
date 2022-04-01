<template>
  <div class="createQ-text-container">
    <navbar
      :componentTabs="componentTabs"
      :loading="componentTabs.loading"
    />
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" :key="$route.fullPath" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script>
/* eslint-disable no-var */
import Navbar from 'components/Question/QuestionPage/Create/textMode/Navbar'
import { Question } from 'src/models/Question'
import QuestionDetails from 'components/Question/QuestionPage/Create/textMode/QuestionDetails'
import AdminActionOnQuestion from 'src/mixin/AdminActionOnQuestion'
import { QuestionType, TypeList } from 'src/models/QuestionType'
import AttachExam from 'components/Question/QuestionPage/AttachExam'
import CommentBox from 'components/Question/QuestionPage/CommentBox'
import BtnBox from 'components/Question/QuestionPage/BtnBox'
import { ExamList } from 'src/models/Exam'
import { QuestSubcategoryList } from 'src/models/QuestSubcategory'
// import API_ADDRESS from 'src/api/Addresses'
export default {
  name: 'CreateText',
  components: {
    BtnBox,
    CommentBox,
    AttachExam,
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
  },
  methods: {
    chosenComponent (questionType) {
      const cName = questionType.componentName
      console.log('cName', cName)
      if (cName === 'MultipleChoiceQ') {
        // this.$router.push({ name: 'Admin.Question.Create.Image.MultipleChoice' })
        this.$router.push({ name: 'Admin.Question.Create.Image' })
      }
      if (cName === 'DescriptiveQ') {
        // this.$router.push({ name: 'Admin.Question.Create.Image.Descriptive' })
        this.$router.push({ name: 'Admin.Question.Create.Image' })
      }
      if (cName === 'MBTIQ') {
        // this.$router.push({ name: 'Admin.Question.Create.Text.MBTI' })
        this.$router.push({ name: 'Admin.Question.Create.Image' })
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
    },
    'question.type': {
      handler () {
        this.chosenComponent(this.question.type)
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
</style>
