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
    <div
      v-for="(item, index) in question.tags.list"
      :key="index"
      class="question-tag ellipsis"
    >
      <span v-for="(ancestor,ancestorIndex) in item.ancestors"
            :key="ancestorIndex"
            class="ancestors">
        <span v-if="ancestorIndex !== 0"
              class="tag-title">{{ ancestor.title }}</span>
        <span v-if="ancestorIndex !== 0"
              class="tag-circle" />
      </span>
      <span>
        <span class="title-circle" />
        <span class="tag-title">{{ item.title }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tagsComponent',
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
    flex-direction: column;
    margin-top: 0;
  }

  .question-tag {
    align-items: center;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 19px;
    color: #434765;

    .ancestors {

      .tag-title{
        @media screen and (max-width: 599px){
          order: 2;
        }
        div{
          //max-width: 99px;
        }
      }

      .tag-circle {

        display: inline-block;
        height: 6px;
        width: 6px;
        line-height: 60px;
        border-radius: 50%;
        margin: 0 6px;
        background-color: #6D708B;
        opacity: 0.3;
        @media screen and (max-width: 599px){
          order: 1;
        }
      }
      @media screen and (max-width: 599px){
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
     }
    }
    .title-circle {
      @media screen and (max-width: 599px){
        display: inline-block;
        height: 6px;
        width: 6px;
        //line-height: 60px;
        border-radius: 50%;
        margin: 0 6px;
        background-color: #6D708B;
        opacity: 0.3;
      }
    }

    @media screen and (max-width: 599px) {
      display: flex;
      flex-direction: column;
      align-items: start;
    }
  }
}

</style>
