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
    <q-card-section
      class="row main-card-section multiple-answer"
    >
      <div
        v-for="(item, index) in question.group"
        :key="index"
        class="col-lg-6 col-12"
      >
        <div class="card-section-header">
          <div>سوال {{index+ 1}} با شناسه {{item.id}}</div>
        </div>
      </div>
    </q-card-section>
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
import VueKatex from 'src/components/VueKatex'
import { Question } from 'src/models/Question'
export default {
  name: 'GroupQuestionShow',
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
      font-size: 20px;
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
[dir="rtl"] .filepond--root {
  text-align: left #{"/* rtl:ignore */"} !important ;
  direction: ltr #{"/* rtl:ignore */"} !important;
}
.filepond--file-info {
  transform: none !important;
  margin-left: 2.5em #{"/* rtl:ignore */"} !important;
  margin-right: 0.5em #{"/* rtl:ignore */"} !important;
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
    font-size: 20px;
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
