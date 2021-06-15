<template>
  <!-- ------------------------- question -------------------------------  -->
  <div class=" ma-4">
    <div class="mx-5 mb-10">
      <question_field
        v-model="question.statement"
        class="my-10"
        :edit-status="status"
        title="تایپ سوال"
        placeholder="صورت سوال"
        @input="updateQuestion"
      />
    </div>
    <div
      v-for="(item, index) in question_data.choices.list"
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
        <question_field
          v-model="item.title"
          :title="(index + 1) + ') '"
          :choices="question_data.choices.list"
          :edit-status="status"
        />
      </div>
    </div>
    <!-- ------------------------- answer -------------------------------  -->
    <div class="ma-5">
      <question_field
        v-model="question_data.descriptive_answer"
        :edit-status="status"
        title="پاسخ تشریحی"
        placeholder="پاسخ تشریحی"
        class="mb-16"
      />
    </div>
  </div>
</template>
<script>
import question_field from '@/components/Question/questionField'
import { Question } from "@/models/Question";

export default {
  name: "Questions",
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
    question_data: {
      type: Question,
      default: new Question()
    }
  },
  data() {
    return {
      question: new Question(),
      selected_item: false
    }
  },
  created() {
    this.question = this.value
  },
  // watch:{
  //   value : () =>{
  //     this.question = this.value
  //   },
  // },
  methods:{
    updateQuestion () {
      this.$emit('input', this.question)
    },
    clicked(order){
      this.question.choices.list.forEach(item => {
          if(item.order === order){
            item.answer = true
          }else {
            item.answer = false
          }
        })
    }
  }
}
</script>

<style scoped>

.answers-box{
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 10px;

}
.answers-box .answer-icon-box{

}
/*.answer-editor {*/
/*  display: inline-block;*/
/*  width: calc(100% - 36px)*/
/*}*/

/* .right-answer-icon{*/
/*  display: inline-block; */
/*   width: 36px;*/
/*}*/
/*v-if="item.answer"*/

</style>