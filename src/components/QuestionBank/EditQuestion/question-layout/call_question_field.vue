<template>
  <!-- ------------------------- question -------------------------------  -->
  <div class=" ma-4">
    <div class="mx-5 mb-10">
      <call_question_field
        v-model="question_data.statement"
        class="my-10"
        :edit-status="status"
        title="تایپ سوال"
        placeholder="صورت سوال"
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
        @click="clicked(item.id)"
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
        @click="clicked(item.id)"
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
        <call_question_field
          v-model="item.title"
          :title="(index + 1) + ') '"
          :choices="question_data.choices.list"
          :edit-status="status"
        />
      </div>
    </div>
    <!-- ------------------------- answer -------------------------------  -->
    <div class="ma-5">
      <call_question_field
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
import call_question_field from '@/components/Question/questionField'

export default {
  name: "Questions",
  components: {
    call_question_field,
  },
  props:
   ['status',
   'question_data']
    ,
  data() {
    return {
      correct_answer:this.question_data.choices.list
    }
  },
  watch:{
    correct_answer : () =>{
      console.log('data is changed')
    },

  },
  methods:{
    clicked(id){
     this.correct_answer.forEach(item => {
       if(item.id === id){
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