<template>
  <!-- ------------------------- question -------------------------------  -->
  <div>
    <call_question_field
      v-model="question_data.statement"
      class="my-10"
      :edit-status="status"
      title="تایپ سوال"
      placeholder="صورت سوال"
    />
    <v-card
      v-for="(item, index) in question_data.choices.list"
      :key="index"
      class="mb-6"
      flat
    >
      <v-col>
        <div
          v-if="item.answer"
          class="right-answer-icon"
        >
          <v-icon
            color="green"
            :size="36"
          >
            mdi-checkbox-marked-circle
          </v-icon>
        </div>
        <div class="answer-editor">
          <call_question_field
            v-model="item.title"
            :title="(index + 1) + ') '"
            :choices="question_data.choices.list"
            :edit-status="status"
          />
        </div>
      </v-col>
    </v-card>
    <call_question_field
      v-model="question_data.descriptive_answer"
      :edit-status="status"
      title="پاسخ تشریحی"
      placeholder="پاسخ تشریحی"
      class="mb-16"
    />
  </div>
</template>
<script>
import call_question_field from '@/components/Question/questionField'

export default {
  name: "Questions",
  components: {
    call_question_field,
  },
  props: {
    status,
    question_data: {}

  },
  data() {
    return {}
  },
}
</script>

<style scoped>
.answer-editor {
  display: inline-block;
  width: calc(100% - 36px)
}
 .right-answer-icon{
  display: inline-block; width: 36px;
}

</style>