<template>
  <div
    v-if="(listConfig.questionInfo && question.tags.list.length > 0) || question.loading "
    class="question-tags col-sm-12 col-xs-12">
    <div v-for="i in 3"
         :key="i">
      <q-skeleton
        v-if="question.loading"
        class="info-title q-mx-sm"
        type="text"
        width="80px"
      />
    </div>
    <tags-component :tags="question.tags.list" />
  </div>
</template>

<script>
import tagsComponent from 'components/CommonComponents/Exam/Create/QuestionTags/components/tagsComponent'

export default {
  name: 'QuestionTags',
  components: { tagsComponent },
  props: {
    question: {
      type: Object,
      default: () => {}
    },
    listConfig: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped lang="scss">
.question-tags {
  display: flex;
  flex-direction: column;
  margin-top: 16px;

  @media only screen and (max-width: 1439px) {
    margin-top: 20px;
  }

  @media screen and (max-width: 599px) {
    //flex-direction: column;
    margin-top: 0;
  }
}

</style>
