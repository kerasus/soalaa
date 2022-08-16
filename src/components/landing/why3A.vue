<template>
  <div class="why-3a-section">
    <p class="section-title">بچه ها چرا آزمون سه‌آ میدن؟</p>
    <div class="choosing-3a-reason-container row">
      <div
        v-for="(reason, index) in reasons"
        :key="index"
        class="choosing-3a-reason  col-md-4 col-sm-6 col-xs-12"
      >
        <div class="choosing-3a-reason-inside">
          <div class="reason-header">
            <q-img class="reason-image" :src="reason.src" width="185px"/>
          </div>
          <div class="reason-body">
            <div class="reason-title">{{ reason.title }}</div>
            <div class="reason-description">
              {{ reason.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'why3A',
  data () {
    return {
      reasons: [
        {
          src: 'https://nodes.alaatv.com/upload/landing/3a/1.png',
          title: 'آزمون بلای جونشون نیست',
          description: 'اگر بخواییم یک قاتل سلامت روان انسان نام ببریم، اون استرس منفیه. آزمون های فراوان و تحمل استرس منفی اونها، کل زندگی شما رو تحت تاثیر قرار میده. در سه‌آ کلا 10 مرحله آزمون اساسی با بودجه بندی استاندارد در یکسال خواهی داشت.'
        },
        {
          src: 'https://nodes.alaatv.com/upload/landing/3a/2.png',
          title: 'از ۹۹٪ داوطلبین جلوترن',
          description: 'اگر برای رسیدن به هدفت جدی هستی پس باید مثل بهترین ها عمل کنی. راز مگو همه رتبه برتر ها اینکه بعد هر آزمون، خودشونو با خودشون مقایسه میکنن. توی سه‌آ یک تیم مشاوره شما رو آنالیز و بعد بهترین راهکار هارو بهتون پیشنهاد میدن.'
        },
        {
          src: 'https://nodes.alaatv.com/upload/landing/3a/3.png',
          title: 'سه شنبه‌ها آزمون میدن',
          description: ' هر برنامه‌ای که داشته باشی یا حتی تمایل داشتی تو چند آزمون آزمایشی شرکت کنی؛ سه‌آ رو با خیال راحت شرکت کن چون سه شنبه ها کاملا آنلاین برگزار میشه و تا جمعه هم آزمون بدی کارنامه با رتبه تخمینی بهت میده.'
        },
        {
          src: 'https://nodes.alaatv.com/upload/landing/3a/4.png',
          title: 'چرا باید تا ۴۰۰ برابر بیشتر هزینه کنن؟',
          description: 'متاسفانه تعداد بالای مراحل آزمون لزوما به هدف موفقیت شما نیست و علاوه بر استرس منفی که به شما تحمیل میکنه، بیشتر به هدف هزینه بیشتر شماست. در سه‌آ به اندازه آزمون میدید و بسیار کمتر هزینه می‌کنید.'
        },
        {
          src: 'https://nodes.alaatv.com/upload/landing/3a/5.png',
          title: 'یه تیم مشاوره که آنالیزشون میکنه',
          description: 'هدف همه داوطلبین از شرکت توی آزمون آزمایشی، موفقیت در آزمون سراسری هست و نه صرفا آزمون دادن. یادگیری کامل در دل برنامه مطالعاتی و ارتقا مهارت های آزمونی کاری هست که آزمون سه‌آ براساس آنالیز شما توسط تیم مشاوره براتون انجام میده.'
        },
        {
          src: 'https://nodes.alaatv.com/upload/landing/3a/6.png',
          title: 'تنها آزمون ایران با دوربین مخفی',
          description: 'احتمالا این تجربه رو داری که وقتی میری سر جلسه آزمون با وجود اینکه مطالب رو عالی مطالعه کردی اما نتیجه نمیگیری! لزوما مشکل در روند مطالعه نیست و اینجا فقط داری بد آزمون میدی. متاسفانه هیچ آزمونی تو ایران نیست که اینو بهت بگه.'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.why-3a-section {
  padding-bottom: 108px;

  @media only screen and (max-width: 1439px) {
    padding-bottom: 76px;
  }

  @media only screen and (max-width: 1023px) {
    padding-bottom: 32px;
  }

  @media only screen and (max-width: 767px) {
    padding-bottom: 68px;
  }

  @media only screen and (max-width: 599px) {
    padding-bottom: 53px;
  }
  .section-title {
    text-align: center;
  }
  .choosing-3a-reason-container {
    .choosing-3a-reason{
      .choosing-3a-reason-inside {
        background: #FFFFFF;
        box-shadow: 0 4px 16px 2px rgba(40, 40, 40, 0.08);
        border-radius: 24px;
        width: 350px;
        height: 357px;
        @media only screen and (max-width: 1439px) {
          width: 290px;
          height: 412px;
        }

        @media only screen and (max-width: 1023px) {
          width: 330px;
          height: 357px;
        }

        @media only screen and (max-width: 767px) {
          width: 240px;
          height: 325px;
        }

        @media only screen and (max-width: 599px) {
          width: 100%;
          height: 292px;
        }

        .reason-header {
          background: #EEB000;
          height: 156px;
          border-radius: 22px;

          @media only screen and (max-width: 599px) {
            height: 127px;
          }
        }

        .reason-body {
          padding: 24px;
          .reason-title {
            font-style: normal;
            font-weight: 700;
            font-size: 20px;
            line-height: 24px;
            color: #232323;
            margin-bottom: 8px;
            @media only screen and (max-width: 767px) {
              font-size: 18px;
            }
            @media only screen and (max-width: 599px) {
              text-align: center;
            }
          }

          .reason-description {
            font-style: normal;
            font-weight: 300;
            font-size: 14px;
            line-height: 20px;
            color: #1E1E1E;
            @media only screen and (max-width: 767px) {
              font-size: 12px;
            }
            @media only screen and (max-width: 599px) {
              text-align: center;
            }
          }
        }
      }
    }
  }
}
</style>
