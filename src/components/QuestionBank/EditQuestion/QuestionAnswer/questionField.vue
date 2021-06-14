<template>
  <!-- ------------------------- question -------------------------------  -->
  <div>
    <QuestionField
      v-model="question_data.statement"
      :edit-status="status"
      title="تایپ سوال"
      label="صورت سوال"
    />
    <QuestionField
      v-for="(item, index) in question_data.choices.list"
      :key="index"
      v-model="item.title"
      :choices="question_data.choices.list"
      :edit-status="status"
    />
    <QuestionField
      v-model="question_data.descriptive_answer"
      :edit-status="status"
      title="پاسخ تشریحی"
      label="پاسخ تشریحی"
    />
  </div>
</template>
<script>
import QuestionField from '@/components/Question/questionField'
export default {
  name: "Questions",
  components: {
    QuestionField,
  },
  props: {
    status,
    question_data:{}

  },
  data() {
    return {}
  },
  created() {
  }
}
</script>

<style scoped>

</style>