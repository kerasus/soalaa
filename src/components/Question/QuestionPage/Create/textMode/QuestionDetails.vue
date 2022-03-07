<template>
  <div class="question-details">
    <div class="box-title">مشخصات سوال</div>
  </div>
</template>

<script>
export default {
  name: 'QuestionDetails',
  props: {
    imgPanelVisibility: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {}
  }
}
</script>
<style scoped lang="scss">
.question-details {
  margin-top: 40px;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
  text-align: right #{"/* rtl:ignore */"};
  color: #23263B;
}
</style>
