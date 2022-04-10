<template>
  <div class="multiple-choice-Q">
    <q-btn
      v-if="question.choices.list.length > 0"
      dark
      class="full-width q-mb-md removeAllChoice-btn"
      label="اضافه کردن گزینه جدید"
      @click="addChoice"
    />
    <div>
      <q-card
        class="question-card default-questions-card"
      >
        <q-card-section class="question default-Qcard-title">
          <div>صورت سوال</div>
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          <div
            v-if="question.statement"
            class="row justify-between question-box default-Qcard-box"
          >
            <QuestionField
              ref="tiptapQuestionStatement"
              :key="'statement' + domKey"
              :editorValue="question.statement"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="multiple-choice-A">
      <div
        v-if="question.choices.list.length"
        class="row multiple-choice-Answer"
      >
        <div
          class="col-12 answer-box"
          v-for="(item, index) in question.choices.list"
          :key="item.order"
        >
          <q-card
            class="col-12 default-questions-card"
          >
            <q-card-section class="default-Qcard-title">
              <q-radio
                dense
                v-model="choice"
                :val="'choice' + index"
                :label="'گزینه ' + (index + 1)"
                color="primary"
                @click="choiceClicked(item.order)"
              />
              <q-btn
                push
                color="primary"
                text-color="white"
                label="حذف گزینه"
                @click="removeChoice(item.order)"
              />
            </q-card-section>
            <q-separator inset />
            <q-card-section>
              <div class="row justify-between default-Qcard-box">
                <QuestionField
                  :ref="'tiptapChoice' + index"
                  :key="'choices' + index + domKey"
                  :editor-value="item.title"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <div>
      <q-card
        v-if="question.descriptive_answer"
        class="default-questions-card"
      >
        <q-card-section class="default-Qcard-title">
          <div>پاسخ تشریحی</div>
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          <div class="row justify-between default-Qcard-box">
            <QuestionField
              ref="tiptapDescriptiveAnswer"
              :key="'descriptive_answer' + domKey"
              :editor-value="question.descriptive_answer"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import QuestionField from 'components/Question/QuestionPage/QuestionField.vue'
import { Question } from 'src/models/Question'
import AdminActionOnQuestion from 'src/mixin/AdminActionOnQuestion'
import { QuestSubcategoryList } from 'src/models/QuestSubcategory'
import { ExamList } from 'src/models/Exam'
import { QuestionStatusList } from 'src/models/QuestionStatus'
export default {
  name: 'MultipleChoiceEditQuestion',
  components: {
    QuestionField
  },
  mixins: [
    AdminActionOnQuestion
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
      subCategoriesList: new QuestSubcategoryList(),
      examList: new ExamList(),
      questionStatuses: new QuestionStatusList(),
      allProps: {
        loading: false
      }
    }
  },
  inject: {
    question: {
      from: 'providedQuestion', // this is optional if using the same key for injection
      default: new Question()
    }
  },
  created () {
    const that = this
    setTimeout(() => {
      that.domKey = 'Date.now()'
    }, 100)
    this.setChoice()
  },
  mounted () {},
  updated () {},
  methods: {
    setChoice () {
      const choiceIndex = this.question.choices.list.findIndex((item) => item.answer === true)
      this.choice = 'choice' + choiceIndex
    },
    saveQuestion () {
      if (this.getContent()) {
        const question = {
          ...this.question,
          choices: this.question.choices.list,
          type_id: this.question.type_id
        }
        this.updateQuestion(question)
      }
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
      // if (!this.getContentOfQuestionParts('DescriptiveAnswer')) {
      //   errors.push(this.getErrorMessage('پاسخ تشریحی'))
      //   status = false
      // }
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
.multiple-choice-Q {
  padding-top: 35px;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
  color: #23263B;
  text-align: right #{"/* rtl:ignore */"};
  .removeAllChoice-btn {
    color: #FFFFFF;
    background: #9690E4;
    border-radius: 10px;
  }
  .multiple-choice-A {
    padding-top: 12px;
    padding-bottom: 12px;
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
