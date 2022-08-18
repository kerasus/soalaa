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
              <div class="dot q-mr-sm"/>
              <span class="header-style"> {{ question.question }}</span>
            </div>

          </template>
          <div class="expansion-card">
            {{ question.answer }}
          </div>
        </q-expansion-item>
        <q-separator/>

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
          question: 'آزمون سه آ برای چه پایه هایی برگزار میشه؟',
          answer: 'آزمون سه آ فعلا فقط برای پایه دوازدهم و برای رشته های ریاضی، تجربی و انسانی برگزار میشه.'
        },
        {
          question: 'آزمون سه آ شامل چند مرحله آزمونه؟',
          answer: 'سه آ شامل سه مرحله آزمونه که اولی با سر فصل جمع بندی نیم سال اول دوازدهم در 28 دی ماه، دمی با سرفصل جمع بندی پایه های دهم و یازدهم در 27 فروردین 1400 و سومی با سرفصل کنکور سراسری در اواخر خرداد ماه برگزار میشه'
        },
        {
          question: 'آیا من میتونم فقط در یک مرحله از آزمون های سه آ شرکت کنم؟',
          answer: 'بله، ولی به دلیل مسیری که تیم طراحی سوالات در نظر گرفتن و هدف گذاری هایی که انجام شده، شرکت کردن در هر سه مرحله میتونه به تقویت و پیشرفت من کمک کنه.'
        },
        {
          question: 'آزمون سه آ فقط آنلاین برگزار میشه؟',
          answer: 'بله، من در روز آزمون، از خونه با هر وسیله ای ( موبایل، تبلت یا کامپیوتر ) میتونم تو آزمون شرکت کنم.'
        },
        {
          question: 'آیا یک آزمون آنلاین میتونه مثل یک آزمون حضوری رسمیت داشته باشه؟',
          answer: ' حتما، سه آ راس ساعت و بدون تاخیر شروع میشه و راس ساعت هم تموم میشه. تمام تدابیر برای شکل گیری فضای آزمون اندیشیده شده.'
        },
        {
          question: 'شرکت در آزمون سه آ با موبایل سخت نیست؟',
          answer: 'اگه بدونی آلاء برات چه خوابی دیده میگی نه! انقدر راحت میتونی بین سوالات جابجا بشی و گزینه موردنظرت رو انتخاب کنی که حد نداره. تازه هر لحظه میتونی ببینی کدوم سوالا رو نزدی و چقد زمان داری.'
        },
        {
          question: 'کارنامه آزمون رو کی میتونم ببینم؟',
          answer: 'کارنامه نه، بهتره بگی ابرکارنامه! به فاصله سه روز بعد از روز آزمون!'
        },
        {
          question: 'اگه پاسخنامه یک سوال رو متوجه نشدم چیکار کنم؟',
          answer: 'کاری نداره که! میرم حل ویدیویی سوالات رو  می بینم.'
        }
      ]
    }
  }
}
</script>
<style scoped lang="scss">
.common-questions {

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
