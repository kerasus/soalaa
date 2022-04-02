<template>
  <div class="createQ-text-container">
    <navbar/>
    <router-view v-slot="{ Component }">
<!--      <transition name="fade" mode="out-in">-->
        <keep-alive>
          <component :is="Component" :key="$route.fullPath" />
        </keep-alive>
<!--      </transition>-->
    </router-view>
  </div>
</template>

<script>
/* eslint-disable no-var */
import Navbar from 'components/Question/QuestionPage/Create/textMode/Navbar'
import { Question } from 'src/models/Question'
import AdminActionOnQuestion from 'src/mixin/AdminActionOnQuestion'
export default {
  name: 'CreateTextLayout',
  components: {
    Navbar
  },
  mixins: [
    AdminActionOnQuestion
  ],
  created () {
    console.log('created')
    this.setAllQuestionLoadings()
  },
  data () {
    return {
      question: new Question()
    }
  },
  provide () {
    return {
      question: this.question
    }
  },
  methods: {
    chosenComponent (questionType) {
      const cName = questionType.componentName
      if (cName === 'MultipleChoiceQ') {
        this.$router.push({ name: 'Admin.Question.Create.Text.MultipleChoice' })
      } else if (cName === 'DescriptiveQ') {
        this.$router.push({ name: 'Admin.Question.Create.Text.Descriptive' })
      } else if (cName === 'MBTIQ') {
        this.$router.push({ name: 'Admin.Question.Create.Text.MBTI' })
      }
    }
  },
  watch: {
    // question: {
    //   handler (newValue, oldValue) {
    //     // console.log('question', newValue)
    //   },
    //   deep: true
    // },
    // 'question.type': {
    //   handler () {
    //     this.chosenComponent(this.question.type)
    //   },
    //   deep: true
    // }
  }
}
</script>
<!--export default {-->
<!--  name: 'CreateTextLayout',-->
<!--  components: {},-->
<!--  mixins: [],-->
<!--  props: {},-->
<!--  mounted () {-->
<!--    // this.setAllQuestionLoadings()-->
<!--    // this.getQuestionType()-->
<!--    // this.loadExamList()-->
<!--    // this.loadSubcategories()-->
<!--  },-->
<!--  methods: {-->
<!--    chosenComponent (questionType) {-->
<!--      // const cName = questionType.componentName-->
<!--      // console.log('cName', cName)-->
<!--      // if (cName === 'MultipleChoiceQ') {-->
<!--      //   this.$router.push({ name: 'Admin.Question.Create.Text.MultipleChoice' })-->
<!--      //   // this.$router.push({ name: 'Admin.Question.Create.Image' })-->
<!--      // }-->
<!--      // if (cName === 'DescriptiveQ') {-->
<!--      //   this.$router.push({ name: 'Admin.Question.Create.Text.Descriptive' })-->
<!--      //   // this.$router.push({ name: 'Admin.Question.Create.Image' })-->
<!--      // }-->
<!--      // if (cName === 'MBTIQ') {-->
<!--      //   this.$router.push({ name: 'Admin.Question.Create.Text.MBTI' })-->
<!--      //   // this.$router.push({ name: 'Admin.Question.Create.Image' })-->
<!--      // }-->
<!--    },-->
<!--    setQuestionContents () {-->
<!--      this.allProps.setContentToQuestion = true-->
<!--    }-->
<!--  },-->
<!--  computed: {-->
<!--    // getComponent () {-->
<!--    //   // updates even if properties inside are updated-->
<!--    //   return this.chosenComponent(this.question.type)-->
<!--    // }-->
<!--  },-->
<!--}-->
<!--</script>-->

<style scoped lang="scss">
.createQ-text-container {
  padding: 40px 100px;
  display: flex;
  flex-direction: column;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
