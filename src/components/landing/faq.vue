<template>
  <div class="common-questions">
    <div class="title-s">
      سوالات متداول
    </div>
    <div
      class="question-body"
    >
      <div v-for="( question , index ) in allQuestions"
           :key="index">
        <q-expansion-item
          class="question-expansion"
          group="same"
          expand-separator
          :header-style="{ backgroundColor: '#fafafa' ,borderRadius:' 24px' }"
          header-class="header-background"
          style="border-radius: 10px"
          icon="img:https://nodes.alaatv.com/upload/landing/3a/down.png"
        >
          <template v-slot:header>
            <div class="flex items-center">
              <div class="dot q-mr-sm" />
              <span class="header-style"> {{ question.question }}</span>
            </div>

          </template>
          <div class="expansion-card">
            {{ question.answer }}
          </div>
        </q-expansion-item>
        <q-separator v-if="index < allQuestions.length - 1" />

      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'faq',
  data () {
    return {
      allQuestions: [
        {
          question: 'آزمون سه آ کجا برگزار میشه؟',
          answer: 'آزمون سه آ یک آزمون آنلاین و غیر حضوریه که شما می تونید از خونه با هر دستگاهی در اون شرکت کنید. دیگه لازم نیست کلی وقت و انرژی رو هدر بدید و خودتون رو به حوزه برگزاری آزمون برسونید.'
        },
        {
          question: 'با موبایل هم میتونم در آزمون سه آ شرکت کنم؟',
          answer: 'بله با هر دستگاهی مثل موبایل و تبلت و کامپیوتر شخصی می تونید آزمون بدید.'
        },
        {
          question: 'آزمون دادن با موبایل سخت نیست؟',
          answer: 'یکی از قابلیت های آزمون سه آ، اینه که مدل های نمایش مختلفی داره و وقتی شما با موبایل آزمون میدید، میتونید از روش نمایش تک سوال استفاده کنید. در این مدل در صفحه نمایش فقط یک سوال دیده میشه و دیگه نیازی نیست بزرگ نمایی (زوم) کنید. در این روش خیلی راحت می تونید بین سوالات جابجا بشید.'
        },
        {
          question: 'دفترچه سوالات و پاسخ تشریحی رو بهم میدید؟',
          answer: 'همون طور که گفتیم روش های مختلفی برای نمایش سوالات تدارک دیدیم. وقتی وارد آزمون میشید یه پیامک براتون ارسال میشه که لینک دفترچه سوالات رو بهتون میده و اگر خونه چاپگر (پرینتر) دارید یا با فایل پی دی اف راحت ترید، میتونید ازش استفاده کنید.' +
            'فایل پی دی اف پاسخنامه تشریحی آزمون هم بعد از اتمام زمان آزمون در پنل کارنامه قابل مشاهده و دانلوده.'
        },
        {
          question: 'اگر وسط آزمون اینترنتم قطع شد چی میشه؟',
          answer: 'ما جواب های شمارو هر لحظه در مرورگرتون ذخیره می کنیم و وقتی اینترنت قطع و وصل بشه، بعد از اتصال مجدد اون جواب ها برامون دوباره ارسال میشه. بنابراین نگران قطعی اینترنت نباشید.'
        },
        {
          question: 'کارنامه کی صادر میشه؟',
          answer: 'وقتی زمان قانونی آزمون تموم شد، بلافاصله کارنامه صادر میشه و به دفترچه پاسخ و ویدیوی تحلیل آزمون هم دسترسی داری.'
        }
      ]
    }
  }
}
</script>
<style scoped lang="scss">
.common-questions {
padding-bottom: 124px;
  .title-s {
    font-style: normal;
    font-weight: 900;
    font-size: 28px;
    line-height: 31px;
    text-align: center;
    color: #232323;
    margin-bottom: 24px;
    margin-top: 64px;
  }
  .question-body{
    background: #fafafa;
    border-radius: 24px;
    border: 1px solid #DBDBDB;
    box-shadow: 0 4px 16px 2px rgba(40, 40, 40, 0.08);
    .header-background {

    }

    .question-expansion {
      &:deep(.q-icon) {
        font-family: 'Material Icons';
      }
      &:deep(.q-item-type){
        justify-content: space-between;
      }

      .header-style {
        padding: 8px 0;
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 24px;
        justify-content: center;
        display: flex;
        align-items: center;
        color: #232323;
      }
      .expansion-card{
        font-weight: 300;
        font-size: 16px;
        line-height: 20px;
        color: #232323;
        padding: 20px;
        background-color: #fafafa;
        border-radius: 24px;
      }
      .dot{
        background: #232323;
        width: 5px;
        height: 5px;
        border-radius: 5px;
        display: none;
      }
      &:deep(.q-expansion-item--expanded){
          .dot{
            display: block;
          }
      }
    }
  }

}
@media screen and (max-width: 1439px){

}
@media screen and (max-width: 1023px){
  .common-questions {
    padding-bottom: 39px;
    .title-s {
      font-size: 33px;
      line-height: 31px;
      text-align: center;
      margin-bottom: 33px;
    }
    .question-body{

      .question-expansion {

        .header-style {
          font-size: 13px;
          line-height: 24px;
        }
      }
    }

  }
}
@media screen and (max-width: 765px){
  .common-questions {
    padding-bottom: 39px;
    .title-s {
      font-size: 24px;
      line-height: 31px;
      margin-bottom: 24px;
      margin-top: 33px;
    }
  }
}
@media screen and (max-width: 599px){
  .common-questions {
    padding-bottom: 27px;
    .title-s {
      font-size: 20px;
      line-height: 31px;
      margin-bottom: 16px;
      margin-top: 40px;
    }
    .question-body{

      .question-expansion {
        .expansion-card{
          font-weight: 300;
          font-size: 11px;
          line-height: 20px;
        }
      }
    }
  }
}

</style>
<!--<style lang="scss" scoped>-->
<!--.title-s{-->
<!--  font-style: normal;-->
<!--  font-weight: 900;-->
<!--  font-size: 28px;-->
<!--  line-height: 31px;-->
<!--  text-align: center;-->
<!--  color: #232323;-->
<!--  margin-bottom: 24px;-->
<!--  margin-top: 64px;-->
<!--}-->
<!--.common-questions{-->
<!--  margin: auto;-->
<!--  max-width: 1380px;-->
<!--  width: 100%;-->
<!--  .question-body{-->
<!--    padding: 8px;-->
<!--    border: 1px solid #DBDBDB;-->
<!--    box-shadow: 0 4px 16px 2px rgba(40, 40, 40, 0.08);-->
<!--    border-radius: 24px;-->
<!--    background: #fafafa;-->
<!--    .question-expansion{-->
<!--      background-color: #FAFAFA;-->
<!--      &:deep(.q-icon){-->
<!--        font-family: 'Material Icons';-->
<!--      }-->
<!--      &:deep(.q-item-type){-->
<!--        justify-content: space-between;-->
<!--      }-->
<!--      .header-style{-->
<!--        font-style: normal;-->
<!--        font-weight: 700;-->
<!--        font-size: 18px;-->
<!--        line-height: 24px;-->
<!--        justify-content: center;-->
<!--        display: flex;-->
<!--        align-items: center;-->
<!--        color: #232323;-->
<!--      }-->
<!--      .dot{-->
<!--        background: #232323;-->
<!--        width: 5px;-->
<!--        height: 5px;-->
<!--        border-radius: 5px;-->
<!--        display: none;-->
<!--      }-->
<!--      &:deep(.q-expansion-item&#45;&#45;expanded){-->
<!--       .dot{-->
<!--          display: block;-->
<!--        }-->
<!--      }-->
<!--      .expansion-card{-->
<!--        font-weight: 300;-->
<!--        font-size: 16px;-->
<!--        line-height: 20px;-->
<!--        color: #232323;-->
<!--        padding: 20px;-->
<!--        background-color: #fafafa;-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</style>-->
