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
