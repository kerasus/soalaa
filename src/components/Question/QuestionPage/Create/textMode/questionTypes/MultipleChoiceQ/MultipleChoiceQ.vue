<template>
  <div class="multiple-choice-Q">
    <q-card class="question-card default-questions-card">
<!--      <q-btn-->
<!--        v-if="question.choices.list.length > 0 && status"-->
<!--        dark-->
<!--        class="full-width q-mb-md"-->
<!--        label="حذف تمام گزینه ها"-->
<!--        color="pink"-->
<!--        @click="removeAllChoice"-->
<!--      />-->
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
            @questionData="getData"
          />
<!--          <div class="col-10 question-txt default-Qcard-txt">-->
<!--            شناخت فراوان جامعه و متخصصان را می طلبد،لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده،لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که-->
<!--          </div>-->
<!--          <div class="col-2 question-img default-Qcard-img">-->
<!--            <q-img-->
<!--              :src="url"-->
<!--              spinner-color="primary"-->
<!--              spinner-size="30px"-->
<!--              style="height: 96px; width: 96px"-->
<!--            >-->
<!--            </q-img>-->
<!--          </div>-->
        </div>
      </q-card-section>
    </q-card>
    <div class="multiple-choice-A">
      <div class="row multiple-choice-Answer">
        <div
          class="col-6 answer-box"
          v-for="(item, index) in question.choices.list"
          :key="item.order"
        >
          <q-card class="col-6 default-questions-card">
            <q-card-section class="default-Qcard-title">
              <q-radio
                dense
                v-model="choice"
                :val="'choice' + (index + 1)"
                :label="'گزینه' + (index + 1)"
                color="primary"
                @click="clicked(item.order)"
              />
            </q-card-section>
            <q-separator inset />
            <q-card-section>
              <div class="row justify-between default-Qcard-box">
                <QuestionField
                  :ref="'choice' + (item.order)"
                  :key="'choices' + (item.order) + domKey"
                  v-model="item.title"
                  :question-id="question.id ? question.id : 'null'"
                  :edit-status="true"
                  @questionData="getData"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <q-card class="default-questions-card">
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
            @questionData="getData"
          />
        </div>
      </q-card-section>
    </q-card>
    <QuestionDetails/>
  </div>
</template>

<script>
import QuestionDetails from 'components/Question/QuestionPage/Create/textMode/QuestionDetails'
import QuestionField from 'components/Question/QuestionPage/QuestionField.vue'
import { Question } from 'src/models/Question'
export default {
  name: 'MultipleChoiceQ',
  components: {
    QuestionField,
    QuestionDetails
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
  mounted () {
    console.log('this.$props--------', this.$props)
  },
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
.multiple-choice-Q {
  padding-top: 35px;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
  color: #23263B;
  text-align: right #{"/* rtl:ignore */"};
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
}
</style>
