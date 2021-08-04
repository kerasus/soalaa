<template>
  <!-- ------------------------- question -------------------------------  -->
  <div class=" ma-4 question-layout">
    <div class="question ">
      <div
          v-if="status"
          class="mb-5 "
      >
        تایپ سوال
      </div>
      <question_field
          :key="'statement' + domKey"
          v-model="question.statement"
          class="mb-10"
          :edit-status="status"
          placeholder="صورت سوال"
          :question-id="value.id ? value.id : 'null'"
          @input="updateQuestion"
      />
    </div>
    <div
        v-for="(item, index) in question.choices.list"
        :key="index"
        class="question-layout-options"
        :class="status ? 'mb-6   question-options white': '  question-options'"
    >
      <div :class="status ?'px-4' :'px-2'">
        <div
            v-if="status"
            @click="clicked(item.order)"
        >
          <v-select
              :items="mbti_value"
              label="انتخاب کزینه"
              dense
              outlined
          ></v-select>
        </div>
      </div>
      <div class="ml-2">
        {{ (index + 1) + ') ' }}
      </div>
      <div class="answer-editor">
        <div>
          <question_field
              :key="'choices' + (index + 1) + domKey"
              v-model="item.title"
              :edit-status="status"
              :question-id="value.id ? value.id : 'null'"
              @input="updateQuestion"
          />
        </div>
      </div>
    </div>
    <!-- ------------------------- answer -------------------------------  -->
    <div class="mb-5 question-answer ">
      <div class="mb-5">
        پاسخ تشریحی
      </div>
      <div>
        <question_field
            :key="'descriptive_answer' + domKey"
            v-model="question.descriptive_answer"
            :question-id="value.id ? value.id : 'null'"
            :edit-status="status"
            placeholder="پاسخ تشریحی"
            class="mb-16"
            @input="updateQuestion"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { Question } from '@/models/Question'
import question_field from '@/components/Question/questionField'

export default {
  name: 'MbtiQuestionLayout',
  components: {
    question_field,
  },
  props: {
    value: {
      type: Question,
      default: new Question()
    },
    status: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      question: new Question(),
      domKey: Date.now(),
      mbti_value: ['string1','string2','string3']
    }
  },
  watch: {
    value: function () {
      this.question = this.value
    }
  },
  created() {
    this.question = this.value
    let that = this
    setTimeout(() => {
      that.domKey = Date.now()
    }, 100)
  },
  methods:{
    updateQuestion () {
      this.$emit('input', this.question)
    },
    clicked(order){
      this.question.choices.list.forEach(item => {
        item.answer = item.order === order;
      })
      this.updateQuestion()
    }
  },
}
</script>

<style scoped>
.question-layout-options{
  display: flex;
  align-items: center;
  margin-bottom: 10px;

}
.question-options{
  display: flex;
  align-items: center;
  border-radius: 10px;
}
.background-color-test{
  background-color: white;

}
.question-answer{
  padding: 10px;
}

.question-options .answer-editor{
  width: 100%;
}

</style>
<style>
.question-layout .tiptap-plus.v-card {
  box-shadow: none !important;
}

</style>
