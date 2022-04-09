<template>
  <div class="multiple-choice-Q">
    <q-card class="question-card default-questions-card">
      <q-card-section class="question default-Qcard-title">
        <div>صورت سوال</div>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <div
          v-if="question.statement"
          class="row justify-between question-box default-Qcard-box"
        >
          <vue-katex
            :input="question.statement"
          />
        </div>
      </q-card-section>
    </q-card>
    <div class="multiple-choice-A">
      <div
        v-if="question.choices.list.length"
        class="row multiple-choice-Answer"
      >
        <div
          class="col-6 answer-box"
          v-for="(item, index) in question.choices.list"
          :key="item.order"
        >
          <q-card class="col-6 default-questions-card">
            <q-card-section class="default-Qcard-title">
              <q-radio
                dense
                disable
                v-model="choice"
                :val="'choice' + index"
                :label="'گزینه ' + (index + 1)"
                color="primary"
              />
            </q-card-section>
            <q-separator inset />
            <q-card-section>
              <div class="row justify-between default-Qcard-box">
                <vue-katex
                  :input="item.title"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
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
          <vue-katex
            :input="question.descriptive_answer"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { Question } from 'src/models/Question'
import VueKatex from 'components/VueKatex'
export default {
  name: 'MultipleChoiceShowQ',
  components: {
    VueKatex
  },
  props: {},
  data () {
    return {
      choice: ''
    }
  },
  inject: {
    question: {
      from: 'providedQuestion', // this is optional if using the same key for injection
      default: new Question()
    }
  },
  created () {
    this.setChoice()
  },
  mounted () {},
  updated () {},
  methods: {
    setChoice () {
      const choiceIndex = this.question.choices.list.findIndex((item) => item.answer === true)
      this.choice = 'choice' + choiceIndex
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
