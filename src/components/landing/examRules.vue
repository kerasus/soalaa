<template>
  <div>
    <div class="exam-rule-box">
      <!--      <q-img class="dots"-->
      <!--             src="https://nodes.alaatv.com/upload/landing/3a/3a_2.png" />-->
      <!--      <q-img class="logo"-->
      <!--             src="https://nodes.alaatv.com/upload/landing/3a/3a_1.png" />-->
      <div class="title-s">چگونگی و شرایط برگزاری آزمون سه‌آ</div>
      <div v-for="(rule, index) in rules"
           :key="index"
           class="rules">
        {{ rule }}
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'examRules',
  data: () => ({
    rules: ['۱- آزمون های سه آ در روزهای سه شنبه ساعت 8 صبح باز می شوند و تا جمعه ساعت 23:59 ادامه دارند.',
      '۲- در این چهار روز هر لحظه ای که کاربر وارد سایت بشود، از همان لحظه به اندازه مدت زمان آزمون، وقت خواهد داشت.',
      '۳- اگر در حین برگزاری آزمون، اتصال دستگاه کاربر به اینترنت قطع شود، پاسخ های ثبت شده او تا همان لحظه در مرورگر دستگاه ذخیره و بعد از اولین اتصال برای سرور ارسال خواهند شد؛ یعنی نگران قطعی اینترنت نباشید.',
      '۴- صدور کارنامه از 12 ظهر سه شنبه آغاز شده و هر لحظه بعد از آن با شرکت افراد دیگر کارنامه ها به شکل ساعتی بروزرسانی می شوند.',
      '۵- بعد از صدور کارنامه برای داوطلب پیامکی ارسال می شود و اطلاع رسانی انجام می شود.',
      '۶- بلافاصله بعد از ورود داوطلب به محیط آزمون یک پیامک برای او ارسال می شود که حاوی لینک دفترچه سوالات است. یعنی داوطلب به فایل پی دی اف دفترچه هم دسترسی دارد تا در صورت صلاحدید آن را چاپ و آزمون را برگزار نماید.',
      '۷- نحوه نمایش آزمون به شکل آنلاین به دو صورت دفترچه ای و تک سوال است. در مدل دفترچه ای نصف صفحه نمایش شامل سوالات به صورت پشت سر هم و نصف صفحه شامل پاسخبرگ آزمون است.'

    ]
  })
}
</script>

<style scoped lang="scss">

.exam-rule-box {
  padding: 32px;
  background: linear-gradient(-105.93deg, #D19B06 -10.73%, rgba(255, 255, 255, 0) 257.37%);
  border-radius: 24px;
  position: relative;
  width: 100%;

  .title-s {
    font-style: normal;
    font-weight: 900;
    font-size: 28px;
    line-height: 42px;
    color: #232323;
    margin-bottom: 16px;
  }

  .rules {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    color: #232323;
    margin-bottom: 16px;
    max-width: 926px;
  }

  .dots {
    width: 210px;
    position: absolute;
    bottom: 0;
    right: 451px;
  }
  .logo{
    width: 107px;
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
@media  screen and (max-width: 1439px) {
  .exam-rule-box {

    .rules {
      font-size: 18px;
      line-height: 24px;
      max-width: 566px;
    }

    .dots {

      right: 361px;
    }
  }
}
@media  screen and (max-width: 1023px) {
  .exam-rule-box {

    .title-s {
      font-size: 28px;
      line-height: 42px;
    }

    .rules {
      font-size: 15px;
      line-height: 16px;
      max-width: 566px;
    }

    .dots {
      width: 211px;
      right: 241px;
    }
    .logo{
      width: 112px;
    }
  }
}
@media  screen and (max-width: 765px) {
  .exam-rule-box {
    padding: 24px;

    .title-s {
      font-size: 24px;
      line-height: 42px;
    }

    .rules {

      font-size: 12px;
      line-height: 16px;
      max-width: 445px;
    }

    .dots {
      width: 173px;
      right: 168px;
    }
    .logo{
      width: 93px;
    }
  }
}
@media  screen and (max-width: 599px) {
  .exam-rule-box {
    padding: 15px;

    .title-s {
      font-size: 20px;
      line-height: 42px;
      width: 100%;
      text-align: center;
    }

    .rules {
      font-size: 14px;
      line-height: 16px;
      max-width: none;
    }

    .dots {
      width: 76px;
      right: calc(50% - 40px);
    }
    .logo{
      width: 80px;
    }
  }
}

</style>
