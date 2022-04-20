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
      :categories="categoryList"
      :buffer="true"
    />
    <div class="attach-btn row">
      <question-identifier class="col-9"/>
      <btn-box
        class="col-3"
        @saveQuestion="saveQuestion"
      />
    </div>
    <q-inner-loading
      :showing="question.exams.loading"
      color="primary"
      class="QComponents-inner-loading"
      label-style="font-size: 1.1em"
    />
  </div>
</template>

<script>
import AttachExam from 'components/Question/QuestionPage/AttachExam/AttachExam'
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

export default {
  name: 'DescriptiveQ',
  components: {
    QuestionIdentifier,
    QuestionField,
    BtnBox,
    AttachExam
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
      categoryList: new QuestCategoryList(),
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
  mounted () {},
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
          exams: exams,
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
    getContent () {
      let status = false
      if (this.validateContent()) {
        this.question.statement = this.getContentOfQuestionParts('QuestionStatement')
        this.question.descriptive_answer = this.getContentOfQuestionParts('DescriptiveAnswer')
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
// USED IN MANY OTHER COMPONENTS
.default-questions-card {
  background: #FFFFFF;
  box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05) #{"/* rtl:ignore */"};
  border-radius: 30px;
  .q-card__section {
    padding: 15px 20px !important;
  }
  .default-Qcard-title {
    font-size: 14px;
    line-height: 24px;
  }
  .default-Qcard-box {
    align-items: last baseline;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    .default-Qcard-img {
      text-align: left #{"/* rtl:ignore */"};
      .q-img {
        border-radius: 0px 0px 1px 20px #{"/* rtl:ignore */"};
        padding: 0 !important;
        .q-img__image {
          padding: 0 !important;
        }
      }
    }
  }
}
.multiple-choice-Answer {
  .answer-box {
    .q-radio__inner {
      margin-left: 7px #{"/* rtl:ignore */"} !important;
    }
  }
  .default-Qcard-title{
    justify-content: space-between;
    display: flex;
    .q-btn {
      padding: 4px 16px !important;
    }
  }
}
</style>
