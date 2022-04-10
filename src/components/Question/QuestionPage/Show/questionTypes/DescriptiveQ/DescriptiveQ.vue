<template>
  <div class="Descriptive-Q">
    <q-linear-progress
      v-if="this.question.loading"
      size="md"
      indeterminate
      rounded
      color="primary"
    />
    <q-card
      v-if="question.statement"
      class="question-card default-questions-card"
    >
      <q-card-section class="question default-Qcard-title">
        <div>صورت سوال</div>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <div class="row justify-between question-box default-Qcard-box">
          <vue-katex
            :input="question.statement"
          />
        </div>
      </q-card-section>
    </q-card>
    <q-card
      v-if="question.descriptive_answer"
      class="default-questions-card Descriptive-A"
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
  name: 'DescriptiveShowQ',
  components: {
    VueKatex
  },
  data () {
    return {}
  },
  inject: {
    question: {
      from: 'providedQuestion', // this is optional if using the same key for injection
      default: new Question()
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
