<template>
  <q-linear-progress
    v-if="this.question.loading"
    size="md"
    indeterminate
    rounded
    color="primary"
  />
  <q-card class="edit-question-main-card custom-card">
    <q-card-section class="main-card-section question">
      <div class="card-section-header">
        <span>صورت سوال</span>
      </div>
      <div class="question-box">
        <QuestionField
          ref="tiptapQuestionStatement"
          :key="'statement' + domKey"
          :editorValue="question.statement"
        />
      </div>
    </q-card-section>
    <q-card-section class="main-card-section long-answer">
      <div class="card-section-header">پاسخ تشریحی</div>
      <div class="answer-box">
        <QuestionField
          ref="tiptapDescriptiveAnswer"
          :key="'descriptive_answer' + domKey"
          :editor-value="question.descriptive_answer"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import QuestionField from 'components/Question/QuestionPage/QuestionField.vue'
import { Question } from 'src/models/Question'
import AdminActionOnQuestion from 'src/mixin/AdminActionOnQuestion'
import { QuestSubcategoryList } from 'src/models/QuestSubcategory'
import { ExamList } from 'src/models/Exam'
import { QuestionStatusList } from 'src/models/QuestionStatus'
import { QuestCategoryList } from 'src/models/QuestCategory'

export default {
  name: 'DescriptiveEditQuestion',
  components: {
    QuestionField
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
  inject: {
    question: {
      from: 'providedQuestion', // this is optional if using the same key for injection
      default: new Question()
    }
  },
  data () {
    return {
      domKey: Date.now(),
      defaultRefName: 'tiptap',
      dynamicMassage: '',
      subCategoriesList: new QuestSubcategoryList(),
      examList: new ExamList(),
      questionStatuses: new QuestionStatusList(),
      categoryList: new QuestCategoryList(),
      loading: false
    }
  },
  created () {
    const that = this
    setTimeout(() => {
      that.domKey = Date.now()
    }, 100)
  },
  mounted () {},
  methods: {
    saveQuestion () {
      // if (this.getContent()) {
      const question = {
        ...this.question,
        choices: this.question.choices.list,
        type_id: this.question.type_id
      }
      this.updateQuestion(question)
      // }
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
.edit-question-main-card {
  margin-top: 43px;
  margin-bottom: 40px;
  .main-card-section {
    .card-section-header {
      display: flex;
      font-size: 16px;
      color: black;
      margin: 8px 18px 0;
      align-items: center;
      @media screen and (max-width: 1024px) {
        margin: 8px 0;
      }
      .save-btn {
        &:deep(.q-icon){
          order: 1;
        }
      }

    }
    .question-box , .answer-box {
      margin: 16px 8px;
      @media screen and (max-width: 1024px) {
        margin: 16px 0;
      }
    }
  }
}
//.Descriptive-Q {
//  padding-top: 35px;
//  font-style: normal;
//  font-weight: 500;
//  font-size: 16px;
//  line-height: 28px;
//  color: #23263B;
//  text-align: right #{"/* rtl:ignore */"};
//  .Descriptive-A {
//    margin-top: 24px;
//  }
//  .question-card {
//    .question {
//      font-size: 14px;
//      line-height: 24px;
//      padding: 15px 20px;
//    }
//    .question-box {
//      align-items: last baseline;
//      font-weight: normal;
//      font-size: 14px;
//      line-height: 24px;
//      .question-img {
//        text-align: left #{"/* rtl:ignore */"};
//        .q-img {
//          border-radius: 0px 0px 1px 20px #{"/* rtl:ignore */"};
//          padding: 0;
//        }
//      }
//    }
//  }
//}
//.multiple-choice-Answer {
//  :nth-child(2n){
//    padding-right: 12px #{"/* rtl:ignore */"};
//  }
//  :nth-child(2n+1){
//    padding-left: 12px #{"/* rtl:ignore */"};
//  }
//  .answer-box {
//    padding-top: 12px;
//    padding-bottom: 12px;
//    :nth-child(2n){
//      padding-right: 0px #{"/* rtl:ignore */"};
//    }
//    :nth-child(2n+1){
//      padding-left: 0px #{"/* rtl:ignore */"};
//    }
//    .q-separator--horizontal-inset {
//      margin-right: 16px #{"/* rtl:ignore */"} !important ;
//    }
//
//  }
//}
</style>
