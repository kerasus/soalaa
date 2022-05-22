<template>
  <q-card class="create-question-main-card custom-card">
    <q-card-section class="main-card-section question">
      <div class="card-section-header">
        <span>صورت سوال</span>
      </div>
      <div class="question-box">
        <QuestionField
          ref="tiptapQuestionStatement"
          :key="'statement' + domKey"
        />
      </div>
    </q-card-section>
    <q-card-section
      v-if="question.choices.list[0]"
      class="row main-card-section multiple-answer"
    >
      <div
        class="col-lg-6 col-12"
        v-for="(item, index) in question.choices.list"
        :key="item.order"
      >
        <div class="card-section-header">
          <q-btn
            class="icon-type"
            icon="isax:close-square5"
            color="negative"
            flat
            @click="removeChoice(item.order)"
          />
          <q-radio
            dense
            v-model="choice"
            :val="'choice' + index"
            :label="'گزینه ' + (index + 1)"
            color="primary"
            @click="choiceClicked(item.order)"
          />
        </div>
        <div class="multiple-answer-box">
          <QuestionField
            :ref="'tiptapChoice' + index"
            :key="'choices' + index + domKey"
          />
        </div>
      </div>
    </q-card-section>
    <q-card-section class="main-card-section long-answer">
      <div class="card-section-header">پاسخ تشریحی</div>
      <div class="answer-box">
        <QuestionField
          ref="tiptapDescriptiveAnswer"
          :key="'descriptive_answer' + domKey"
        />
      </div>
    </q-card-section>
  </q-card>
  <div class="relative-position">
    <div class="attach-btn row">
      <question-identifier
        class="col-12"
        :exams="examList"
        :lessons="subCategoriesList"
        :categories="categoryList"
        :gradesList="gradesList"
        :groups-list="lessonGroupList"
        :lessons-list="lessonsList"
        :authorship-dates-list="authorshipDatesList"
        :question-authors-list="questionAuthorsList"
        :buffer="true"
        @gradeSelected="getLessonsList"
        @groupSelected="getLessonsList"
        @attach="attachExam"
        @detach="detachExam"
        @tags-collected="setTagsOnCreate"
      />
    </div>
    <btn-box
      class="col-12"
      @saveQuestion="saveQuestion"
    />
  </div>
</template>

<script>
import BtnBox from 'components/Question/QuestionPage/BtnBox'
import QuestionField from 'components/Question/QuestionPage/QuestionField.vue'
import { Question } from 'src/models/Question'
import AdminActionOnQuestion from 'src/mixin/AdminActionOnQuestion'
import { QuestSubcategoryList } from 'src/models/QuestSubcategory'
import { ExamList } from 'src/models/Exam'
import { QuestionStatusList } from 'src/models/QuestionStatus'
import { computed } from 'vue'
import { QuestCategoryList } from 'src/models/QuestCategory'
import QuestionIdentifier from 'components/Question/QuestionPage/QuestionIdentifier'
import mixinTree from 'src/mixin/Tree'
export default {
  name: 'MultipleChoiceQ',
  components: {
    QuestionIdentifier,
    QuestionField,
    BtnBox
  },
  mixins: [
    AdminActionOnQuestion,
    mixinTree
  ],
  props: {
    loading: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      domKey: Date.now(),
      choice: '',
      defaultRefName: 'tiptap',
      dynamicMassage: '',
      question: new Question(),
      subCategoriesList: new QuestSubcategoryList(),
      examList: new ExamList(),
      questionStatuses: new QuestionStatusList(),
      categoryList: new QuestCategoryList(),
      allProps: {
        loading: false
      }
    }
  },
  provide () {
    return {
      providedQuestion: computed(() => this.question)
    }
  },
  created () {
    const that = this
    setTimeout(() => {
      that.domKey = 'Date.now()'
    }, 100)
    this.setDefaultChoices()
    this.getPageReady()
    this.getGradesList()
    this.loadQuestionAuthors()
    this.loadAuthorshipDates()
  },
  mounted () {
    this.$nextTick(() => {
      // this.setAllQuestionLoadings()
      // this.disableAllQuestionLoadings()
    })
  },
  updated () {},
  methods: {
    saveQuestion () {
      if (this.getContent()) {
        const exams = []
        this.question.exams.list.forEach(item => {
          exams.push({
            id: item.exam_id,
            exam_id: item.exam_id,
            sub_category_id: item.sub_category_id,
            order: item.order
          })
        })
        this.question.author.push({ full_name: this.$store.getters['Auth/user'].full_name, id: this.$store.getters['Auth/user'].id })
        const question = {
          author: this.question.author,
          choices: this.question.choices.list,
          exams,
          descriptive_answer: this.question.descriptive_answer,
          statement: this.question.statement,
          level: 1,
          sub_category_id: 1,
          recommended_time: 0,
          type_id: this.question.type_id
        }
        this.createQuestion(question)
      }
    },
    setDefaultChoices () {
      this.question.choices.list = []
      this.question.choices.addEmptyChoices(4)
    },
    removeChoice (order) {
      if (this.question.choices.list.length < 3) {
        this.$q.notify({
          message: 'شما نمیتوانید کمتر از 2 گزینه داشته باشید!',
          color: 'negative',
          icon: 'report_problem'
        })
        return
      }
      const index = this.question.choices.list.findIndex(item => item.order === order)
      this.question.choices.list.splice(index, 1)
      this.question.choices.reorder()
    },
    addChoice () {
      this.question.choices.addOneEmptyChoice()
    },
    getContent () {
      const that = this
      let status = false
      if (this.validateContent()) {
        this.question.statement = this.getContentOfQuestionParts('QuestionStatement')
        this.question.choices.list.forEach(function (item, index) {
          item.title = that.getContentOfChoice(index)
          // toDo : the line bellow is none related and temporary
          item.id = index
        })
        this.question.descriptive_answer = this.getContentOfQuestionParts('DescriptiveAnswer')
        // console.log('this.question', this.question)
        status = true
      }
      return status
    },
    getContentOfChoice (index) {
      return this.$refs[this.defaultRefName + 'Choice' + index][0].getContent()
    },
    getContentOfQuestionParts (name) {
      return this.$refs[this.defaultRefName + name].getContent()
    },
    validateContentOfChoice () {
      const that = this
      let status = true
      this.question.choices.list.forEach(function (item, index) {
        if (!that.getContentOfChoice(index)) {
          status = false
        }
      })
      return status
    },
    validateAnswerOfChoice () {
      let status = false
      this.question.choices.list.forEach(function (item, index) {
        if (item.answer) {
          status = true
        }
      })
      return status
    },
    validateContent () {
      let status = true
      const that = this
      // eslint-disable-next-line
      let errors = []
      if (!this.getContentOfQuestionParts('QuestionStatement')) {
        errors.push(this.getErrorMessage('صورت سوال'))
        status = false
      }
      if (!this.validateContentOfChoice()) {
        const ChoiceMassage = 'لطفا پاسخ تمامی سوالات را درج کنید'
        errors.push(ChoiceMassage)
        status = false
      }
      // if (!this.getContentOfQuestionParts('DescriptiveAnswer')) {
      //   errors.push(this.getErrorMessage('پاسخ تشریحی'))
      //   status = false
      // }
      if (!this.choice) {
        const ChoiceMassage = 'لطفا گزینه صحیح را ثبت کنید'
        errors.push(ChoiceMassage)
        status = false
      }
      if (!this.validateAnswerOfChoice()) {
        const ChoiceMassage = 'لطفا گزینه صحیح را ثبت کنید'
        errors.push(ChoiceMassage)
        status = false
      }
      if (!status) {
        errors.forEach(function (item) {
          that.$q.notify({
            message: item,
            color: 'negative',
            icon: 'report_problem'
          })
        })
      }
      return status
    },
    getErrorMessage (dynamicWord) {
      return 'لطفا فیلد ' + dynamicWord + ' را پر کنید'
    },
    choiceClicked (order) {
      this.question.choices.list.forEach(item => {
        item.answer = item.order === order
      })
    }
  }
}
</script>

<style scoped lang="scss">
.create-question-main-card {
  margin-top: 43px;
  margin-bottom: 40px;
  .main-card-section {
    .card-section-header {
      display: flex;
      font-size: 16px;
      color: black;
      margin: 8px 18px 0;
      @media screen and (max-width: 1024px) {
        margin: 8px 0;
      }

    }
    .question-box , .answer-box, .multiple-answer-box {
      margin: 16px 8px;
      @media screen and (max-width: 1024px) {
        margin: 16px 0;
      }
    }
  }
}
</style>

<!--<style scoped lang="scss">-->
<!--.create-question-main-card {-->
<!--  margin-top: 43px;-->
<!--  margin-bottom: 40px;-->
<!--  .main-card-section {-->
<!--    .card-section-header{-->
<!--      font-size: 16px;-->
<!--      color: black;-->
<!--      margin: 8px 18px 0;-->
<!--      @media screen and (max-width: 1024px) {-->
<!--        margin: 8px 0;-->
<!--      }-->

<!--    }-->
<!--    .question-box{-->
<!--      background-color: var(&#45;&#45;3a-Neutral2);-->
<!--      margin: 16px 8px;-->
<!--      border: 1px solid var(&#45;&#45;3a-Neutral1);-->
<!--      border-radius: 16px;-->
<!--      @media screen and (max-width: 1024px) {-->
<!--        margin: 16px 0;-->
<!--      }-->
<!--      .tiptap-header{-->
<!--        border-radius: 16px;-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->
<!--.custom-card{-->
<!--  padding-bottom: 100px;-->
<!--}-->
<!--.multiple-choice-Q {-->
<!--  padding-top: 35px;-->
<!--  font-style: normal;-->
<!--  font-weight: 500;-->
<!--  font-size: 16px;-->
<!--  line-height: 28px;-->
<!--  color: #23263B;-->
<!--  text-align: right #{"/* rtl:ignore */"};-->
<!--  .removeAllChoice-btn {-->
<!--    color: #FFFFFF;-->
<!--    background: #9690E4;-->
<!--    border-radius: 10px;-->
<!--  }-->
<!--  .multiple-choice-A {-->
<!--    padding-top: 12px;-->
<!--    padding-bottom: 12px;-->
<!--  }-->
<!--  .question-card {-->
<!--    .question {-->
<!--      font-size: 14px;-->
<!--      line-height: 24px;-->
<!--      padding: 15px 20px;-->
<!--    }-->
<!--    .question-box {-->
<!--      align-items: last baseline;-->
<!--      font-weight: normal;-->
<!--      font-size: 14px;-->
<!--      line-height: 24px;-->
<!--      .question-img {-->
<!--        text-align: left #{"/* rtl:ignore */"};-->
<!--        .q-img {-->
<!--          border-radius: 0px 0px 1px 20px #{"/* rtl:ignore */"};-->
<!--          padding: 0;-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->
<!--.multiple-choice-Answer {-->
<!--  :nth-child(2n){-->
<!--    padding-right: 12px #{"/* rtl:ignore */"};-->
<!--  }-->
<!--  :nth-child(2n+1){-->
<!--    padding-left: 12px #{"/* rtl:ignore */"};-->
<!--  }-->
<!--  .answer-box {-->
<!--    padding-top: 12px;-->
<!--    padding-bottom: 12px;-->
<!--    :nth-child(2n){-->
<!--      padding-right: 0px #{"/* rtl:ignore */"};-->
<!--    }-->
<!--    :nth-child(2n+1){-->
<!--      padding-left: 0px #{"/* rtl:ignore */"};-->
<!--    }-->
<!--    .q-separator&#45;&#45;horizontal-inset {-->
<!--      margin-right: 16px #{"/* rtl:ignore */"} !important ;-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</style>-->
<!--<style lang="scss">-->
<!--// USED IN MANY OTHER COMPONENTS-->
<!--.default-questions-card {-->
<!--  background: #FFFFFF;-->
<!--  box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05) #{"/* rtl:ignore */"};-->
<!--  border-radius: 30px;-->
<!--  .q-card__section {-->
<!--    padding: 15px 20px !important;-->
<!--  }-->
<!--  .default-Qcard-title {-->
<!--    font-size: 14px;-->
<!--    line-height: 24px;-->
<!--  }-->
<!--  .default-Qcard-box {-->
<!--    align-items: last baseline;-->
<!--    font-weight: normal;-->
<!--    font-size: 14px;-->
<!--    line-height: 24px;-->
<!--    .default-Qcard-img {-->
<!--      text-align: left #{"/* rtl:ignore */"};-->
<!--      .q-img {-->
<!--        border-radius: 0px 0px 1px 20px #{"/* rtl:ignore */"};-->
<!--        padding: 0 !important;-->
<!--        .q-img__image {-->
<!--          padding: 0 !important;-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->
<!--.multiple-choice-Answer {-->
<!--  .answer-box {-->
<!--    .q-radio__inner {-->
<!--      margin-left: 7px #{"/* rtl:ignore */"} !important;-->
<!--    }-->
<!--  }-->
<!--  .default-Qcard-title{-->
<!--    justify-content: space-between;-->
<!--    display: flex;-->
<!--    .q-btn {-->
<!--      padding: 4px 16px !important;-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</style>-->
