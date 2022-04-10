<template>
  <div class="Descriptive-Q">
<!--        <button @click="getContent">getContent</button>-->
    <q-linear-progress
      v-if="this.question.loading"
      size="md"
      indeterminate
      rounded
      color="primary"
    />
    <q-card class="question-card default-questions-card">
      <q-card-section class="question default-Qcard-title">
        <div>صورت سوال</div>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <div class="row justify-between question-box default-Qcard-box">
          <QuestionField
            ref="tiptapQuestionStatement"
            :key="'statement' + domKey"
          />
        </div>
      </q-card-section>
    </q-card>
    <q-card class="default-questions-card Descriptive-A">
      <q-card-section class="default-Qcard-title">
        <div>پاسخ تشریحی</div>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <div class="row justify-between default-Qcard-box">
          <QuestionField
            ref="tiptapDescriptiveAnswer"
            :key="'descriptive_answer' + domKey"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
  <div class="relative-position">
    <attach-exam
      :exams="examList"
      :lessons="subCategoriesList"
    />
    <div class="attach-btn row">
      <question-details class="col-9"/>
      <btn-box
        class="col-3"
        @saveQuestion="saveQuestion"
      />
    </div>
    <status-change
      :statuses="questionStatuses"
    />
    <q-inner-loading
      :showing="question.exams.loading"
      color="primary"
      class="QComponents-inner-loading"
      label-style="font-size: 1.1em"
    />
  </div>
</template>

<script>
import AttachExam from 'components/Question/QuestionPage/AttachExam'
import StatusChange from 'components/Question/QuestionPage/StatusChange'
import QuestionDetails from 'components/Question/QuestionPage/Create/textMode/QuestionDetails'
import BtnBox from 'components/Question/QuestionPage/BtnBox'
import QuestionField from 'components/Question/QuestionPage/QuestionField.vue'
import { Question } from 'src/models/Question'
import AdminActionOnQuestion from 'src/mixin/AdminActionOnQuestion'
import { QuestSubcategoryList } from 'src/models/QuestSubcategory'
import { ExamList } from 'src/models/Exam'
import { QuestionStatusList } from 'src/models/QuestionStatus'
import { computed } from 'vue'

export default {
  name: 'DescriptiveQ',
  components: {
    QuestionField,
    BtnBox,
    StatusChange,
    AttachExam,
    QuestionDetails
  },
  mixins: [
    AdminActionOnQuestion
  ],
  props: {
    status: {
      type: Boolean,
      default: () => false
    }
  },
  provide () {
    return {
      providedQuestion: computed(() => this.question)
    }
  },
  data () {
    return {
      domKey: Date.now(),
      question: new Question(),
      choice: '',
      defaultRefName: 'tiptap',
      dynamicMassage: '',
      subCategoriesList: new QuestSubcategoryList(),
      examList: new ExamList(),
      questionStatuses: new QuestionStatusList(),
      loading: true
    }
  },
  created () {
    const that = this
    setTimeout(() => {
      that.domKey = Date.now()
    }, 100)
    this.getPageReady()
  },
  mounted () {
    // this.$nextTick(() => {
    //   this.setAllQuestionLoadings()
    //   this.loadExamList()
    //   this.loadSubcategories()
    //   this.getQuestionStatus()
    //   this.disableAllQuestionLoadings()
    // })
  },
  methods: {
    saveQuestion () {
      // this.allProps.setContentToQuestion = true
    },
    getContent () {
      if (this.validateContent()) {
        this.question.statement = this.getContentOfQuestionParts('QuestionStatement')
        this.question.descriptive_answer = this.getContentOfQuestionParts('DescriptiveAnswer')
      }
      console.log('this.question', this.question)
    },
    getContentOfChoice (index) {
      return this.$refs[this.defaultRefName + 'Choice' + index][0].getContent()
    },
    getContentOfQuestionParts (name) {
      return this.$refs[this.defaultRefName + name].getContent()
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
      if (!this.getContentOfQuestionParts('DescriptiveAnswer')) {
        errors.push(this.getErrorMessage('پاسخ تشریحی'))
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
    }
  }
}
</script>

<style scoped lang="scss">
.Descriptive-Q {
  padding-top: 35px;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
  color: #23263B;
  text-align: right #{"/* rtl:ignore */"};
  .Descriptive-A {
    margin-top: 24px;
  }
  .question-card {
    .question {
      font-size: 14px;
      line-height: 24px;
      padding: 15px 20px;
    }
    .question-box {
      align-items: last baseline;
      font-weight: normal;
      font-size: 14px;
      line-height: 24px;
      .question-img {
        text-align: left #{"/* rtl:ignore */"};
        .q-img {
          border-radius: 0px 0px 1px 20px #{"/* rtl:ignore */"};
          padding: 0;
        }
      }
    }
  }
}
.multiple-choice-Answer {
  :nth-child(2n){
    padding-right: 12px #{"/* rtl:ignore */"};
  }
  :nth-child(2n+1){
    padding-left: 12px #{"/* rtl:ignore */"};
  }
  .answer-box {
    padding-top: 12px;
    padding-bottom: 12px;
    :nth-child(2n){
      padding-right: 0px #{"/* rtl:ignore */"};
    }
    :nth-child(2n+1){
      padding-left: 0px #{"/* rtl:ignore */"};
    }
    .q-separator--horizontal-inset {
      margin-right: 16px #{"/* rtl:ignore */"} !important ;
    }

  }
}
</style>
<style lang="scss">

</style>
