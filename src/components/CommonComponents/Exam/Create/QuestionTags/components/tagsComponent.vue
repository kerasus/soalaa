<template>
  <div
    v-for="(item, index) in tags"
    :key="index"
    class="question-tag ellipsis"
  >
    <span v-for="(ancestor,ancestorIndex) in item.ancestors"
          :key="ancestorIndex"
          class="ancestors">
      <span v-if="ancestorIndex !== 0"
            class="tag-title ellipsis">{{ ancestor.title }}</span>
      <span v-if="ancestorIndex !== 0"
            class="tag-circle ellipsis" />
    </span>
    <span>
      <span class="tag-title">{{ item.title }}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'tagsComponent',
  props: {
    tags: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped lang="scss">

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
      border-radius: 50%;
      margin: 0 6px;
      background-color: #6D708B;
      opacity: 0.3;
      @media screen and (max-width: 599px){
        order: 1;
      }
    }
    @media screen and (max-width: 599px){
      align-items: center;
      justify-content: center;
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

}

</style>
