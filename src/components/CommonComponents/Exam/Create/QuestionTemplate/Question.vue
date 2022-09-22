<template>
  <div class="question-component">
    <div class="question-container">
      <vue-katex
        v-if="question.statement"
        :input="question.statement"
      />
      <div v-else-if="question.statement_photo?.length>0">
        <div
          v-for="(photo, index) in question.statement_photo"
          :key="index"
        >
          <q-img :src="photo" />
        </div>
      </div>
    </div>

    <div class="multiple-choices-container">
      <template v-if="question.loading">
        <div
          v-for="item in 4"
          :key="item"
          class="choice-column col-3"
        >
          <div class="question-choice">
            {{ item }}
          </div>
          <q-skeleton
            type="text"
            width="100px"
            height="25px"
          />
        </div>
      </template>

      <div
        v-else-if="question.choices.list"
        class="multiple-choices"
      >
        <multiple-choices-template
          v-for="(choice , index) in question.choices.list"
          id="test"
          ref="questionChoice"
          :key="index"
          class=" col-lg-3 col-md-3 col-sm-12"
          :class="questionCol"
          :dir="isLtrQuestion()? 'ltr':''"
          :choice="choice"
        />
      </div>

      <div v-else-if="question.answer_photos?.length>0">
        <div
          v-for="(photo, index) in question.answer_photos"
          :key="index"
        >
          <q-img :src="photo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueKatex from 'src/components/VueKatex'
import MultipleChoicesTemplate from 'components/CommonComponents/Exam/Create/QuestionTemplate/MultipleChoicesTemplate'
import { Question } from 'src/models/Question'

export default {
  name: 'Question',
  components: { VueKatex, MultipleChoicesTemplate },
  props: {
    question: {
      type: Question,
      default: new Question()
    }
  },

  data: () => ({
    name: '',
    questionCol: ''
  }),

  mounted () {
    this.setChoiceCol()
  },

  methods: {
    setChoiceCol () {
      const el = this.$refs.questionChoice

      if (!el) {
        return
      }
      el.forEach(choice => {
        if (window.innerWidth < 1024) {
          return null
        }
        if (!this.isSingleLine(choice.$el)) {
          this.questionCol = 'col-lg-6 col-sm-6'
          this.$nextTick(() => {
            this.checkLines(choice.$el)
          })
        }
      })
    },

    checkLines (el) {
      if (!this.isSingleLine(el)) {
        this.questionCol = 'col-lg-12 col-sm-12'
      }
    },

    getElementHeight (choiceBoxElement, computed) {
      const padding = parseInt(computed.paddingTop) + parseInt(computed.paddingBottom)
      return choiceBoxElement.clientHeight - padding
    },

    isSingleLine (choiceBoxElement) {
      const choiceContentElement = choiceBoxElement.childNodes[1]
      const computed = getComputedStyle(choiceContentElement)
      const height = this.getElementHeight(choiceBoxElement, computed)
      // 16 => margin-bottom
      const choiceContentLineHeight = parseInt(computed.lineHeight) + 16
      return height <= choiceContentLineHeight
    },

    isLtrQuestion () {
      const string = this.question.statement
      if (!string) {
        return false
      }
      const persianRegex = /[\u0600-\u06FF]/
      return !string.match(persianRegex)
    }
  }
}
</script>

<style lang="scss" scoped>
.question-component {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #434765;

  .question-container {
    margin-bottom: 20px;

    @media only screen and (max-width: 1439px) {
      margin-bottom: 24px;
    }

    @media only screen and (max-width: 1023px) {
      margin-bottom: 10px;
    }

    &:deep(.html-katex) {
      p {
        margin-bottom: 0;
      }
    }

  }

  .multiple-choices-container {

  }
}
</style>
