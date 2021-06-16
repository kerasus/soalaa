<template>
  <!-- ------------------------- question -------------------------------  -->
  <div class=" ma-4">
    <div class="mx-5 mb-10">
      <div v-if="status">
        تایپ سوال
      </div>
      <question_field
        :key="'statement' + domKey"
        v-model="question.statement"
        class="my-10"
        :edit-status="status"
        placeholder="صورت سوال"
        @input="updateQuestion"
      />
    </div>
    <div
      v-for="(item, index) in question.choices.list"
      :key="index"
      class="mb-6 answers-box mx-4"
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
        v-else
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
      <div class="answer-editor ma-4">
        <div>
          {{ (index + 1) + ') ' }}
        </div>
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
    <div class="ma-5">
      <div>
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
.answers-box{
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 10px;

}
.answers-box .answer-editor{
width: 100%;
}
</style>
