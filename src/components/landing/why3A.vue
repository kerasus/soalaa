<template>
  <div class="why-3a-section">
    <div class="section-title">بچه ها چرا آزمون سه‌آ میدن؟</div>

    <div class="choosing-3a-reason-container">
      <div class="choosing-3a-reason ">
        <div class="reason-header">
          <span class="badge">1</span>
          <q-img class="reason-image" :src="reasons[0].src" :width="imageWidth[0]" />
        </div>
        <div class="reason-body">
          <div class="reason-title">{{ reasons[0].title }}</div>
          <div class="reason-description">
            {{ reasons[0].description }}
          </div>
        </div>
      </div>

      <div class="choosing-3a-reason ">
        <div class="reason-header">
          <span class="badge">2</span>
          <q-img class="reason-image" :src="reasons[1].src" :width="imageWidth[1]"/>
        </div>
        <div class="reason-body">
          <div class="reason-title">{{ reasons[1].title }}</div>
          <div class="reason-description">
            {{ reasons[1].description }}
          </div>
        </div>
      </div>

      <div class="choosing-3a-reason ">
        <div class="reason-header">
          <span class="badge">3</span>
          <q-img class="reason-image" :src="reasons[2].src" :width="imageWidth[2]"/>
        </div>
        <div class="reason-body">
          <div class="reason-title">{{ reasons[2].title }}</div>
          <div class="reason-description">
            {{ reasons[2].description }}
          </div>
        </div>
      </div>

      <div class="choosing-3a-reason ">
        <div class="reason-header">
          <span class="badge">4</span>
          <q-img class="reason-image" :src="reasons[3].src" :width="imageWidth[3]"/>
        </div>
        <div class="reason-body">
          <div class="reason-title">{{ reasons[3].title }}</div>
          <div class="reason-description">
            {{ reasons[3].description }}
          </div>
        </div>
      </div>

      <div class="choosing-3a-reason ">
        <div class="reason-header">
          <span class="badge">5</span>
          <q-img class="reason-image" :src="reasons[4].src" :width="imageWidth[4]"/>
        </div>
        <div class="reason-body">
          <div class="reason-title">{{ reasons[4].title }}</div>
          <div class="reason-description">
            {{ reasons[4].description }}
          </div>
        </div>
      </div>

      <div class="choosing-3a-reason ">
        <div class="reason-header">
          <span class="badge">6</span>
          <q-img class="reason-image" :src="reasons[5].src" :width="imageWidth[5]" />
        </div>
        <div class="reason-body">
          <div class="reason-title">{{ reasons[5].title }}</div>
          <div class="reason-description">
            {{ reasons[5].description }}
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
      ],
      imageWidthList: [
        { md: '185px', sm: '158px', xs: '130px' },
        { md: '192px', sm: '171px', xs: '144px' },
        { md: '173px', sm: '159px', xs: '130px' },
        { md: '248px', sm: '208px', xs: '168px' },
        { md: '172px', sm: '156px', xs: '129px' },
        { md: '190px', sm: '174px', xs: '143px' }
      ],
      currentImagesWidthList: []
    }
  },
  computed: {
    imageWidth () {
      return this.setImageWidth()
    },

    windowSize () {
      return this.$store.getters['AppLayout/windowSize']
    }
  },
  methods: {
    setImageWidth () {
      this.currentImagesWidthList = []

      if (this.windowSize.x > 768) {
        this.imageWidthList.forEach(item => {
          this.currentImagesWidthList.push(item.md)
        })
      } else if (this.windowSize.x > 600) {
        this.imageWidthList.forEach(item => {
          this.currentImagesWidthList.push(item.sm)
        })
      } else {
        this.imageWidthList.forEach(item => {
          this.currentImagesWidthList.push(item.xs)
        })
      }

      return this.currentImagesWidthList
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

  @media only screen and (max-width: 768px) {
    padding-bottom: 68px;
  }

  @media only screen and (max-width: 600px) {
    padding-bottom: 53px;
  }

  .section-title {
    text-align: center;
    font-style: normal;
    font-weight: 900;
    font-size: 32px;
    line-height: 42px;
    color: #232323;
    margin-bottom: 40px;

    @media only screen and (max-width: 768px) {
      font-size: 24px;
      margin-bottom: 33px;
    }

    @media only screen and (max-width: 600px) {
      font-size: 20px;
      margin-bottom: 16px;
    }
  }

  .choosing-3a-reason-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .choosing-3a-reason {
      background: #FFFFFF;
      box-shadow: 0 4px 16px 2px rgba(40, 40, 40, 0.08);
      border-radius: 24px;
      width: 350px;
      height: 357px;
      margin-bottom: 40px;
      padding: 4px;

      @media only screen and (max-width: 1439px) {
        width: 290px;
        height: 412px;
      }

      @media only screen and (max-width: 1023px) {
        width: 330px;
        height: 357px;
      }

      @media only screen and (max-width: 768px) {
        width: 240px;
        height: 325px;
      }

      @media only screen and (max-width: 600px) {
        width: 100%;
        height: 292px;
        margin-bottom: 25px;
      }

      .reason-header {
        background: #EEB000;
        height: 156px;
        border-radius: 22px;
        display: flex;
        justify-content: center;
        position: relative;
        @media only screen and (max-width: 600px) {
          height: 127px;
        }
        .badge {
          position: absolute;
          width: 40px;
          height: 40px;
          top: -15px;
          left: -13px;
          color: #EEB000;
          background: #263238;
          border: 3px solid #EEB000;
          border-radius: 50%;
          font-style: normal;
          font-weight: 900;
          font-size: 24px;
          line-height: 42px;
          text-align: center;
        }
        .reason-image {
          position: absolute;
        }
      }

      .reason-body {
        padding: 30px 20px 20px 20px ;

        @media only screen and (max-width: 768px) {
          padding: 8px 20px 20px 20px ;
        }

        .reason-title {
          font-style: normal;
          font-weight: 700;
          font-size: 20px;
          line-height: 24px;
          color: #232323;
          margin-bottom: 8px;
          @media only screen and (max-width: 768px) {
            font-size: 18px;
          }
          @media only screen and (max-width: 600px) {
            text-align: center;
          }
        }

        .reason-description {
          font-style: normal;
          font-weight: 300;
          font-size: 14px;
          line-height: 20px;
          color: #1E1E1E;
          @media only screen and (max-width: 768px) {
            font-size: 12px;
          }
          @media only screen and (max-width: 600px) {
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
