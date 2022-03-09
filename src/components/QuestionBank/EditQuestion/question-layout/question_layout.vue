<template>
  <!-- ------------------------- question -------------------------------  -->
  <div class="question-layout">
    <div class="question">
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
        :edit-status="status"
        placeholder="صورت سوال"
        :question-id="question.id ? question.id : 'null'"
        style="margin-bottom: 40px"
        @questionData="getData"
      />
    </div>
    <q-btn
      v-if="question.choices.list.length > 0 && status"
      dark
      class="full-width q-mb-md"
      label="حذف تمام گزینه ها"
      color="pink"
      @click="removeAllChoice"
    />
    <br>
    <div
      v-for="(item, index) in question.choices.list"
      :key="item.order"
      class="row question-layout-options"
      :class="status ? 'q-mb-md   question-options bg-white': '  question-options'"
    >
      <div class="col-1 test">
        <div class="row">
          <div
            class="question-layout-spacing"
          >
            <q-btn
              v-if="item.answer"
              round
              unelevated
              icon="mdi-checkbox-marked-circle"
              class="checkbox-marked"
              padding="none"
              size="20px"
              @click="clicked(item.order)"
            />
            <div
              v-else
              @click="clicked(item.order)"
            >
              <q-btn
                round
                unelevated
                icon="circle"
                padding="none"
                size="20px"
                :text-color="status ? 'grey-4' : 'transparent'"
              />
            </div>
          </div>
          <div class="row items-center">
          <div>
            {{ (index + 1) + ') ' }}
          </div>
          </div>
        </div>
      </div>
      <div class="col-lg-10 answer-editor test">
        <div class="test2">
          <question_field
            :ref="'choice' + (item.order)"
            :key="'choices' + (item.order) + domKey"
            v-model="item.title"
            :edit-status="status"
            :question-id="question.id ? question.id : 'null'"
            @questionData="getData"
          />
        </div>
      </div>
      <q-btn
        v-if="status"
        class="btn-delete-choice"
        dense
        color="pink"
        icon="mdi-close"
        @click="removeChoice(item.order)"
      />
    </div>

    <q-btn
      v-if="status"
      class="full-width q-mb-md q-mt-md"
      label="افزودن گزینه جدید"
      dark
      color="green"
      @click="addChoice"
    />
    <!-- ------------------------- answer -------------------------------  -->
    <div class="question-answer">
      <div style="margin-bottom: 25px;">
        پاسخ تشریحی
      </div>
      <div>
        <question_field
          ref="descriptive"
          :key="'descriptive_answer' + domKey"
          v-model="question.descriptive_answer"
          @value="console.log('ttttttttttttttttt', event)"
          :question-id="question.id ? question.id : 'null'"
          :edit-status="status"
          placeholder="پاسخ تشریحی"
          class="q-mb-lg"
          @questionData="getData"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { Question } from 'src/models/Question'
// eslint-disable-next-line camelcase
import question_field from 'src/components/Question/questionField'

export default {
  name: 'QuestionLayout',
  components: {
    question_field
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
      question: new Question(),
      domKey: Date.now()
    }
  },
  watch: {
    editorValue: function () {
      console.log('watch in lay out run ')
      this.question = this.modelValue
    }
  },
  created () {
    console.log('************************88 layout is run this.value :', this.modelValue)

    // console.log('question lay out question:', this.question)
    // console.log('question lay out currentQuestion:', this.currentQuestion)
    // console.log('question lay out status:', this.status)
    const that = this
    setTimeout(() => {
      that.domKey = Date.now()
    }, 100)
  },
  updated () {
    this.question = this.modelValue
    console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF', this.modelValue)
    console.log('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMmm', this.cq)
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
      console.log('new data from field in lay out ------------------------------------------------------:', val)
      this.editorValue = val
    },
    updateQuestion () {
      console.log('emit update question is run in the question layout, this.question', this.question)
      this.$emit('updateQuestion', this.question)
    },
    clicked (order) {
      console.log('order :', order)
      this.question.choices.list.forEach(item => {
        item.answer = item.order === order
      })
      this.updateQuestion()
    }
  }
}
</script>

<style scoped lang="scss">
.btn-delete-choice {
  position: absolute;
  right: -10px;
  top: -10px;
}

.question-layout-options {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.test{
  //border:1px solid red;
}
.test2{
  //border:2px solid #0066ff;
}
.question-layout {
  margin: 16px;
  font-size: 16px;

  .question-layout-spacing{
      padding-right: 24px;
  }
  .checkbox-marked{
    color: #4caf50;
  }
}
.question-layout-options {
  margin-bottom: 10px;
}

.question-options {
  align-items: center;
  border-radius: 10px;
}

.background-color-test {
  background-color: white;

}

.question-answer {
  padding: 10px;
  margin-bottom: 20px;
}

.question-options .answer-editor {
  width: 90%;
}

</style>
<style>
.question-layout .tiptap-plus.v-card {
  box-shadow: none !important;
}
.question-layout-spacing-1 .q-btn .q-icon,.question-layout-spacing-1 .q-btn .q-spinner {
  font-size: 3.715em !important;
  position: absolute;
}
</style>
