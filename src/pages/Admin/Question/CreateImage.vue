<template>
  <div class="page-container">
    <div class="row">
      <div class="col flex justify-between">
        <span>
          برای ثبت سوال جدید میتوانید تصویر صورت سوال را در این صفحه آپلود کنید یا به صورت مستقیم آن ها را تایپ کنید
          <q-btn
            icon-right="isax:info-circle"
            label="بیشتر بخوانید"
            flat
            rounded
            color="primary"
          />
        </span>
        <q-btn
          label="تایپ سوال"
          color="primary"
          class="change-type"
          to="/question/create/text/multipleChoice"
          unelevated
        />
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <upload-image v-model="question" title="صورت سوال" field-key="statement_photo"/>
      </div>
      <div class="col-6">
        <upload-image v-model="question" title="پاسخ سوال" field-key="answer_photos"/>
      </div>
    </div>
<!--    <div class="row">-->
<!--      <div class="col">-->
<!--        <AttachExam />-->
<!--        <div class="attach-btn row">-->
<!--          <QuestionDetails class="col-9"/>-->
<!--          <BtnBox class="col-3"/>-->
<!--        </div>-->
<!--        <CommentBox />-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
import uploadImage from 'src/components/Question/QuestionPage/UploadImage'
import { Question } from 'src/models/Question'
// import QuestionDetails from 'components/Question/QuestionPage/Create/textMode/QuestionDetails'
import { AdminActionOnQuestion } from 'src/mixin/Mixins'
// import AttachExam from 'components/Question/QuestionPage/AttachExam'
// import CommentBox from 'components/Question/QuestionPage/CommentBox'
// import BtnBox from 'components/Question/QuestionPage/BtnBox'

export default {
  name: 'CreateImage',
  components: {
    uploadImage
    // ,
    // QuestionDetails,
    // AttachExam,
    // CommentBox,
    // BtnBox
  },
  mixins: [AdminActionOnQuestion],
  data () {
    return {
      question: new Question()
    }
  },
  created () {
    this.getPageReady()
  },
  mounted () {},
  provide () {
    return {
      question: this.question
    }
  }
}
</script>

<style scoped lang="scss">
.page-container {
  //padding: 40px 100px;
  padding-top: 20px;
  display: flex;
  flex-direction: column;

  .change-type {
    width: 144px;
    height: 40px;
    border-radius: 10px;
  }
}
</style>
