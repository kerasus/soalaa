<template>
  <div class="common-questions">
    <div
      v-for="( question , index ) in allQuestions"
      :key="index"
      class="question-body"
    >
      <q-expansion-item
        class="question-expansion shadow-2"
        group="same"
        expand-separator
        :label="question.question"
      >
        <q-card class="expansion-card">
          <q-card-section>
            {{question.answer}}
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>
  </div>
</template>

<script>
export default {
  name: 'commonQuestion',
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

<style lang="scss" scoped>
.common-questions{
  margin: auto;
  max-width: 1380px;
  width: 100%;
  .question-body{
    .question-expansion{
      background-color: white;
      .expansion-card{
        font-size: 16px;
      }
    }
  }
}
</style>
<style lang="scss">
.question-body{
  .question-expansion{
    background-color: white;
  }
  .q-expansion-item{
    .q-expansion-item__content{
      margin-bottom: 16px;
    }
  }
}
</style>
