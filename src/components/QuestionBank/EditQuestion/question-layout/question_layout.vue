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
        :question-id="value.id ? value.id : 'null'"
        style="margin-bottom: 40px"
      />
    </div>
    <div
      v-for="(item, index) in question.choices.list"
      :key="index"
      class="row question-layout-options"
      :class="status ? 'q-mb-md   question-options white': '  question-options'"
    >
      <div class="col col-1">
        <div class="row">
          <div
            class="col col-8 question-layout-spacing-1"
            :class="status ?'question-layout-spacing-1' :'question-layout-spacing-2'"
          >
              <q-btn
                v-if="item.answer"
                round
                icon="mdi-checkbox-marked-circle"
                class="checkbox-marked"
                :class="!status? 'checkbox-marked-size-1': 'checkbox-marked-size-2'"
                @click="clicked(item.order)"
              />
<!--              <q-icon-->
<!--                color="positive"-->
<!--                name="mdi-checkbox-marked-circle"-->
<!--                :size="50"-->
<!--                -->
<!--              />-->
            <div
              v-else-if="status"
              @click="clicked(item.order)"
            >
              <q-btn flat round class="question-btn-size" />
            </div>
          </div>
          <div class="col col-1">
            {{ (index + 1) + ') ' }}
          </div>
        </div>
      </div>
      <div class="col answer-editor col-11">
        <div>
          <question_field
            :ref="'choice' + (index + 1)"
            :key="'choices' + (index + 1) + domKey"
            v-model="item.title"
            :edit-status="status"
            :question-id="value.id ? value.id : 'null'"
          />
        </div>
      </div>
    </div>
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
          :question-id="value.id ? value.id : 'null'"
          :edit-status="status"
          placeholder="پاسخ تشریحی"
          class="mb-16"
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
      domKey: Date.now()
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
      console.log(this.$refs)
      this.$refs.questionStatement.getContent()
      this.$refs.descriptive.getContent()
      this.$refs.choice1[0].getContent()
      this.$refs.choice2[0].getContent()
      this.$refs.choice3[0].getContent()
      this.$refs.choice4[0].getContent()
      this.updateQuestion()
    },
    updateQuestion () {
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

<style scoped lang="scss">

.question-layout {
  margin: 16px;
  font-size: 16px;
  .question-layout-spacing-1 {
      padding-left: 24px;
      padding-right: 24px;
      padding-bottom: 8px;
  }
  .question-layout-spacing-2{
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 8px;
  }
  .checkbox-marked{
    color: #4caf50;
  }
  .checkbox-marked-size-1{
    width: 28px;
    height: 28px;
  }
  .checkbox-marked-size-2{
    width: 36px;
    height: 36px;
  }
  .question-btn-size {
    width: 36px;
    height: 36px;
    background-color: rgba(15, 15, 0, 0.17);
  }
}
.question-layout-options {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.question-options {
  display: flex;
  align-items: center;
  border-radius: 10px;
  background-color: #fff;
}

.background-color-test {
  background-color: white;

}

.question-answer {
  padding: 10px;
  margin-bottom: 20px;
}

.question-options .answer-editor {
  width: 100%;
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
