<template>
  <div class="multiple-choice-Q">
    <q-card class="question-card default-questions-card">
      <q-card-section class="question default-Qcard-title">
        <div>صورت سوال</div>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <div class="row justify-between question-box default-Qcard-box">
          <div class="col-10 question-txt default-Qcard-txt">
            شناخت فراوان جامعه و متخصصان را می طلبد،لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده،لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که
          </div>
          <div class="col-2 question-img default-Qcard-img">
            <q-img
              :src="url"
              spinner-color="primary"
              spinner-size="30px"
              style="height: 96px; width: 96px"
            >
            </q-img>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <div class="multiple-choice-A">
      <MultipleChAnswer/>
    </div>
    <q-card class="default-questions-card">
      <q-card-section class="default-Qcard-title">
        <div>پاسخ تشریحی</div>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <div class="row justify-between default-Qcard-box">
          <div class="col-9 default-Qcard-txt">
            شناخت فراوان جامعه و متخصصان را می طلبد،لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده،لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که
          </div>
          <div class="col-3 default-Qcard-img">
            <q-img
              :src="url"
              spinner-color="primary"
              spinner-size="30px"
              style="height: 96px; width: 96px"
            >
            </q-img>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import MultipleChAnswer from 'components/Question/QuestionPage/Create/textMode/questionTypes/MultipleChAnswer'
export default {
  name: 'MultipleChoiceQ',
  components: {
    MultipleChAnswer
  },
  data () {
    return {
      url: 'https://placeimg.com/500/300/nature'
    }
  }
}
</script>
<style scoped lang="scss">
.multiple-choice-Q {
  padding-top: 35px;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
  color: #23263B;
  text-align: right #{"/* rtl:ignore */"};
  .multiple-choice-A {
    padding-top: 12px;
    padding-bottom: 12px;
  }
  .question-card {
    .question {
      font-size: 14px;
      line-height: 24px;
      padding: 15px 20px;
    }
    .question-box {
      align-items: last baseline;
      font-weight: normal;
      font-size: 14px;
      line-height: 24px;
      .question-img {
        text-align: left #{"/* rtl:ignore */"};
        .q-img {
          border-radius: 0px 0px 1px 20px #{"/* rtl:ignore */"};
          padding: 0;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.default-questions-card {
  background: #FFFFFF;
  box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05) #{"/* rtl:ignore */"};
  border-radius: 30px;
  .default-Qcard-title {
    font-size: 14px;
    line-height: 24px;
    padding: 15px 20px;
  }
  .default-Qcard-box {
    align-items: last baseline;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    .default-Qcard-img {
      text-align: left #{"/* rtl:ignore */"};
      .q-img {
        border-radius: 0px 0px 1px 20px #{"/* rtl:ignore */"};
        padding: 0;
        .q-img__image {
          padding: 0 !important;
        }
      }
    }
  }
}
</style>
