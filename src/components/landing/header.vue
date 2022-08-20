<template>
  <div class="landing-header column items-center">
    <div class="introduction ">
      <div class="title-style">
        تو این آزمون ۲ تا رقیب داری؛
        <br>
        خودت و کل کنکوریای ۱۴۰۱
      </div>
      <div class="body-style">
        همه رتبه برتر ها، تو هر آزمون، ابتدا خودشونو با خودشون میسنجن؛ و میدونن هیچ آزمونی به اندازه کنکور مخاطب نداره
        پس درگیر جامعه آماری نمیشن. سه‌آ کامل آنالیزت میکنه و بعد با جامعه آماری کنکور سال پیش، مقایسه‌ت میکنه.
      </div>
      <q-btn unelevated class="submit-btn" label="ثبت نام آزمون"/>
    </div>
    <div class="video-box flex items-center justify-center">
      <video-player
        :sources="source"
        poster="https://nodes.alaatv.com/media/thumbnails/1612/1612012nbhu.jpg"/>
      <!--      <div class="video-btn flex items-center justify-between q-px-md">-->
      <!--        مشاهده ویدئو-->
      <!--        <div class="video-icon flex items-center">-->
      <!--          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">-->
      <!--            <path fill-rule="evenodd" clip-rule="evenodd"-->
      <!--                  d="M0 10.0058C0 4.48625 4.48842 0 10 0C15.5116 0 20 4.48625 20 10.0058C20 15.5137 15.5116 20 10 20C4.48842 20 0 15.5137 0 10.0058ZM13.668 11.0178C13.7741 10.9117 13.9093 10.7477 13.9382 10.7091C14.0927 10.5065 14.1699 10.2557 14.1699 10.0058C14.1699 9.72504 14.083 9.46454 13.9189 9.25229C13.9055 9.23885 13.8791 9.21019 13.8448 9.17284C13.7806 9.10296 13.6885 9.00264 13.6004 8.91462C12.8089 8.06561 10.7432 6.67631 9.66216 6.25181C9.49807 6.18524 9.08301 6.03956 8.861 6.02991C8.64865 6.02991 8.44595 6.07815 8.2529 6.17463C8.01158 6.3097 7.81853 6.52195 7.71236 6.77279C7.64479 6.94645 7.53861 7.46744 7.53861 7.47709C7.43243 8.04631 7.37452 8.9725 7.37452 9.99518C7.37452 10.9706 7.43243 11.8572 7.51931 12.4361C7.52169 12.4385 7.53 12.4799 7.5429 12.5442C7.58211 12.7397 7.6638 13.1471 7.75097 13.314C7.96332 13.7192 8.37838 13.9701 8.82239 13.9701H8.861C9.15058 13.9604 9.75869 13.7096 9.75869 13.7C10.7819 13.2754 12.7992 11.9537 13.61 11.0757L13.668 11.0178Z"-->
      <!--                  fill="#130F26"/>-->
      <!--          </svg>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
import { PlayerSourceList } from 'src/models/PlayerSource'
import VideoPlayer from 'components/VideoPlayer'

export default {
  name: 'header',
  components: {
    VideoPlayer
  },
  data: () => ({
    source: new PlayerSourceList([{ src: 'https://nodes.alaatv.com/upload/vast/videos/HD_720p/1647426360_1245.mp4' }]),
    data: [
      { link: 'https://nodes.alaatv.com/media/1612/HD_720p/1612005jkiq.mp4', ext: 'mp4', size: null, caption: 'کیفیت عالی', res: '720p' },
      { link: 'https://nodes.alaatv.com/media/1612/hq/1612005jkiq.mp4', ext: 'mp4', size: null, caption: 'کیفیت بالا', res: '480p' },
      { link: 'https://nodes.alaatv.com/media/1612/240p/1612005jkiq.mp4', ext: 'mp4', size: null, caption: 'کیفیت متوسط', res: '240p' }
    ]
  }),
  mounted () {
    console.log('this.source :', this.source)
  }
}
</script>

<style lang="scss" scoped>
.landing-header {
  &:deep(.q-btn) {
    .q-btn .q-btn__content {
      margin: 0;
    }
  }

  text-align: center;
  padding-bottom: 64px;
  background: url("https://nodes.alaatv.com/upload/landing/3a/h1.png");
  background-repeat: no-repeat !important;
  background-position: center;

  .introduction {
    padding-top:120px;
    padding-bottom: 85px;
    .title-style {
      font-style: normal;
      font-weight: 900;
      font-size: 38px;
      line-height: 42px;
      color: #232323;
      margin-bottom: 20px;
    }

    .body-style {
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #3F3F3F;
      margin-bottom: 20px;
      max-width: 450px;
    }

    .submit-btn {
      width: 105px;
      height: 40px;
      background: #FFC107;
      border-radius: 24px;
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
      color: #212121;
    }
  }

  .video-box {
    width: 350px;
    height: 200px;
    background: #E2E2E2;
    border-radius: 24px;

    .video-btn {
      display: none;
      width: 150px;
      height: 40px;
      background: #FFF0C1;
      border: 2px solid #FFC107;
      border-radius: 24px;

      .video-icon {

      }
    }
  }
}

@media screen and (max-width: 1439px) {
  .landing-header {
    text-align: center;
    background-image: url("https://nodes.alaatv.com/upload/landing/3a/h2.png");

    .introduction {
      padding-top:136px;
      .title-style {
        font-size: 32px;
        line-height: 42px;
      }

      .submit-btn {
        width: 105px;
        height: 40px;
        background: #FFC107;
        border-radius: 24px;
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        color: #212121;
      }
    }

    .video-box {
      width: 320px;
      height: 200px;
      background: #E2E2E2;
      border-radius: 24px;

      .video-btn {
        width: 150px;
        height: 40px;
        background: #FFF0C1;
        border: 2px solid #FFC107;
        border-radius: 24px;

        .video-icon {

        }
      }
    }
  }
}
@media screen and (max-width: 1023px){
  .landing-header {
    text-align: center;
    background: url("https://nodes.alaatv.com/upload/landing/3a/h3.png");

    .introduction {
      padding-top:87px;
      padding-bottom: 132px;
      .title-style {
        font-size: 32px;
        line-height: 42px;
      }

      .submit-btn {
        width: 105px;
        height: 40px;
        background: #FFC107;
        border-radius: 24px;
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        color: #212121;
      }
    }

    .video-box {
      width: 320px;
      height: 200px;
      border-radius: 24px;
      .video-btn {
        width: 150px;
        height: 40px;
        background: #FFF0C1;
        border: 2px solid #FFC107;
        border-radius: 24px;

        .video-icon {

        }
      }
    }
  }
}
@media screen and (max-width: 765px) {
  .landing-header {
    padding-bottom: 56px;
    background: url("https://nodes.alaatv.com/upload/landing/3a/h4.png");
    .introduction {
      padding-top:52px;
      padding-bottom: 90px;
      .title-style {
        font-size: 28px;
        line-height: 38px;
      }

    .body-style{
      font-size: 14px;
      line-height: 16px;
      width: 402px;
    }

      .submit-btn {
        width: 96px;
        height: 32px;
        font-size: 14px;
        line-height: 24px;
      }
    }

    .video-box {
      width: 328px;
      height: 172px;

      .video-btn {
        width: 150px;
        height: 40px;
        background: #FFF0C1;
        border: 2px solid #FFC107;
        border-radius: 24px;
      }
    }
  }
}
@media screen and (max-width: 600px) {
  .landing-header {
    padding: 0 15px 40px 15px;
    background: url("https://nodes.alaatv.com/upload/landing/3a/h5.png");
    .introduction {
      padding-top:43px;
      padding-bottom: 50px;
      .title-style {
        line-height: 34px;
      }

      .body-style {
        line-height: 18px;
        width: 100%;
      }

      .submit-btn {
        width: 105px;
        height: 40px;
        background: #FFC107;
        border-radius: 24px;
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        color: #212121;
      }
    }

    .video-box {
      width: 100%;
      min-height: 56.25%;

      //.video-btn {
      //  width: 150px;
      //  height: 56.25%;
      //  background: #FFF0C1;
      //  border: 2px solid #FFC107;
      //  border-radius: 24px;
      //
      //  .video-icon {
      //
      //  }
      //}
    }
  }
}

</style>
