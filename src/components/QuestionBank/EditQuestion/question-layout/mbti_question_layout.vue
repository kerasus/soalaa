<template>
  <!-- ------------------------- question -------------------------------  -->
  <div class="question-layout">
    <div class="question ">
      <div
          v-if="status"
          style="margin-bottom: 20px"
      >
        تایپ سوال
      </div>
      <question_field
          ref="questionStatement"
          :key="'statement' + domKey"
          v-model="question.statement"
          class="q-mb-lg"
          :edit-status="status"
          placeholder="صورت سوال"
          :question-id="value.id ? value.id : 'null'"
          @input="updateQuestion"
      />
    </div>
    <div
        v-for="(item, index) in question.choices.list"
        :key="index"
        class="row question-layout-options"
        :class="status ? 'q-mb-md  question-options white': '  question-o' +
        'ptions'"
    >
      <div class="col-2">
      <div class="row">
      <div :class="status ?'col-10' :'col-10'">
<!--        Todo : v-autocomplete -->
        <q-select
        :options="mbtiValue"
        option-label="text"
        option-value="value"
        v-model="item.answer"
        />
<!--            <v-autocomplete-->
<!--                v-model="item.answer"-->
<!--                :items="mbti_value"-->
<!--                label="انتخاب مقدار"-->
<!--                dense-->
<!--                outlined-->
<!--                rounded-->
<!--                :disabled="!status"-->
<!--                @change="updateQuestion"-->
<!--            />-->
      </div>
        <div class="col-1">
          {{ (index + 1) + ') ' }}
        </div>
      </div>
      </div>
      <div class="answer-editor col-10">
        <div>
          <question_field
              :ref="'choice' + (index + 1)"
              :key="'choices' + (index + 1) + domKey"
              v-model="item.title"
              :edit-status="status"
              :question-id="value.id ? value.id : 'null'"
              @input="updateQuestion"
          />
        </div>
      </div>
    </div>
  </div>
  <!-- ------------------------- answer -------------------------------  -->
</template>
<script>
/* eslint-disable */
import { Question } from 'src/models/Question'
// ToDo eslint
// eslint-disable-next-line camelcase
import question_field from 'components/Question/QuestionPage/QuestionField.vue'

export default {
  name: 'MbtiQuestionLayout',
  components: {
    question_field
  },
  props: {
    value: {
      type: Question,
      default: new Question()
    },
    status: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      question: new Question(),
      domKey: Date.now(),
      mbtiValue: [
        {
          text: 'bartle-s',
          value: 'socializer'
        },
        {
          text: 'bartle-e',
          value: 'explorer'
        },
        {
          text: 'bartle-a',
          value: 'achiever'
        },
        {
          text: 'bartle-k',
          value: 'killer'
        },
        {
          text: 'mbti-I',
          value: 'introversion'
        },
        {
          text: 'mbti-E',
          value: 'extroversion'
        },
        {
          text: 'mbti-N',
          value: 'intuition'
        },
        {
          text: 'mbti-S',
          value: 'sensing'
        },
        {
          text: 'mbti-T',
          value: 'thinking'
        },
        {
          text: 'mbti-F',
          value: 'feeling'
        },
        {
          text: 'mbti-J',
          value: 'judging'
        },
        {
          text: 'mbti-P',
          value: 'perceiving'
        }
      ]
    }
  },
  watch: {
    value: function () {
      this.question = this.value
    }
  },
  created () {
    this.question = this.value
    const that = this
    setTimeout(() => {
      that.domKey = Date.now()
    }, 100)
  },
  methods: {
    getContent () {
      console.log('test', this.$refs)
      this.$refs.questionStatement.getContent()
      this.$refs.choice1[0].getContent()
      this.$refs.choice2[0].getContent()
      this.updateQuestion()
    },
    updateQuestion () {
      console.log('this.question', this.question)
      this.$emit('input', this.question)
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

<style scoped>
.question-layout-options {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

}

.question-options {
  display: flex;
  align-items: center;
  border-radius: 10px;
}

.background-color-test {
  background-color: white;

}

.question-answer {
  padding: 10px;
}

.question-options .answer-editor {
  width: 100%;
}

</style>
<style>
.question-layout .tiptap-plus.v-card {
  box-shadow: none !important;
}

/*@media (max-width: 1077px) {*/
/*  .question-layout-options.mb-6.question-options.white {*/
/*    width: auto;*/
/*    position: relative;*/
/*  }*/
/*}*/
</style>
