<template>
  <!-- ------------------------- question -------------------------------  -->
  <div class=" ma-4 page-layout">
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
        @input="updateQuestion"
      />
    </div>
    <div
      v-for="(item, index) in question.choices.list"
      :key="index"
      :class="status ? 'mb-6  mx-4 question-options white': '  mx-4 question-options'"
    >
      <div
        v-if="item.answer"
        class="answer-icon-box"
        @click="clicked(item.order)"
      >
        <v-icon
          color="green"
          :size="36"
          class="mx-4"
        >
          mdi-checkbox-marked-circle
        </v-icon>
      </div>
      <div
        v-else-if="status"
        class="mx-4"
        @click="clicked(item.order)"
      >
        <v-btn
          class=""
          fab
          depressed
          width="36"
          height="36"
        />
      </div>
      <div>
        {{ (index + 1) + ') ' }}
      </div>
      <div class="answer-editor ma-4">
        <div>
          <question_field
            :key="'choices' + (index + 1) + domKey"
            v-model="item.title"
            :edit-status="status"
            @input="updateQuestion"
          />
        </div>
      </div>
    </div>
    <!-- ------------------------- answer -------------------------------  -->
    <div class="ma-5 question-answer ">
      <div class="mb-5">
        پاسخ تشریحی
      </div>
      <div>
        <question_field
          :key="'descriptive_answer' + domKey"
          v-model="question.descriptive_answer"
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
  name: 'QuestionLayout',
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
      domKey: Date.now()
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
.tiptap-plus v-card v-sheet theme--light elevation-3{
  box-shadow: 0 0;
}
</style>
