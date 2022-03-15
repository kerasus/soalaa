<template>
  <div class="Descriptive-Q">
    <q-card class="question-card default-questions-card">
      <q-card-section class="question default-Qcard-title">
        <div>صورت سوال</div>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <div class="row justify-between question-box default-Qcard-box">
          <QuestionField
            ref="questionStatement"
            :key="'statement' + domKey"
            v-model="question.statement"
            :edit-status="true"
            :question-id="question.id ? question.id : 'null'"
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
            ref="descriptive"
            :key="'descriptive_answer' + domKey"
            v-model="question.descriptive_answer"
            :question-id="question.id ? question.id : 'null'"
            :edit-status="true"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import QuestionField from 'components/Question/QuestionPage/QuestionField.vue'
import { Question } from 'src/models/Question'
export default {
  name: 'DescriptiveQ',
  components: {
    QuestionField
  },
  props: {
    cq: {
      type: Question,
      default: () => new Question()
    },
    modelValue: {
      type: Question,
      default: () => new Question()
    },
    status: {
      type: Boolean,
      default: () => false
    }
  },
  inject: {
    currentQuestion: {
      from: 'currentQuestion', // this is optional if using the same key for injection
      default: new Question()
    }
  },
  data () {
    return {
      domKey: Date.now(),
      question: new Question(),
      choice: ''
    }
  },
  watch: {
    editorValue: function () {
      this.question = this.modelValue
    }
  },
  created () {
    const that = this
    setTimeout(() => {
      that.domKey = Date.now()
    }, 100)
  },
  mounted () {},
  updated () {
    this.question = this.modelValue
  },
  methods: {
    removeChoice (order) {
      const index = this.question.choices.list.findIndex(item => item.order === order)
      this.question.choices.list.splice(index, 1)
      this.updateQuestion()
    },
    addChoice () {
      this.question.choices.addEmptyChoice()
      this.updateQuestion()
    },
    removeAllChoice () {
      this.question.choices.list = []
      this.updateQuestion()
    },
    getContent () {
      this.$refs.questionStatement.getContent()
      this.$refs.descriptive.getContent()
      this.$refs.choice1[0].getContent()
      this.$refs.choice2[0].getContent()
      this.$refs.choice3[0].getContent()
      this.$refs.choice4[0].getContent()
      this.updateQuestion()
    },
    getData (val) {
      this.editorValue = val
    },
    updateQuestion () {
      this.$emit('updateQuestion', this.question)
    },
    clicked (order) {
      this.question.choices.list.forEach(item => {
        item.answer = item.order === order
      })
      this.updateQuestion()
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
