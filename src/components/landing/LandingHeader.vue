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
      <q-btn unelevated
             class="submit-btn"
             label="ثبت نام آزمون"
             @click="onClickRegisterBtn"
      />
    </div>
    <div class="video-box flex items-center justify-center">
      <video-player
        :sources="videosSrc"
        poster="https://nodes.alaatv.com/upload/vast/videos/3A_LANDING/video%20tubmail.jpg?w=350&h=196" />
    </div>
  </div>
</template>

<script>
import { PlayerSourceList } from 'src/models/PlayerSource'
import VideoPlayer from 'components/VideoPlayer'

export default {
  name: 'LandingHeader',
  components: {
    VideoPlayer
  },
  data: () => ({
    videosSrc: new PlayerSourceList([
      // { link: 'https://nodes.alaatv.com/media/1612/HD_720p/1612005jkiq.mp4', ext: 'mp4', size: null, caption: 'کیفیت عالی', res: '720p' },
      { link: 'https://cdn.alaatv.com/upload/vast/videos/3A_LANDING/landing%20video.mp4', ext: 'mp4', size: null, caption: 'کیفیت بالا', res: '480p' }
      // { link: 'https://nodes.alaatv.com/media/1612/240p/1612005jkiq.mp4', ext: 'mp4', size: null, caption: 'کیفیت متوسط', res: '240p' }
    ])
  }),
  methods: {
    onClickRegisterBtn () {
      this.$emit('onClickRegisterBtn')
    }
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
      width: 115px;
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
    height: auto;
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
        width: 110px;
        height: 40px;
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;

      }
    }

    .video-box {
      width: 320px;

      .video-btn {
        width: 150px;
        height: 40px;
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
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
      }
    }

    .video-box {
      width: 320px;
      .video-btn {
        width: 150px;
        height: 40px;

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

      .video-btn {
        width: 150px;
        height: 40px;

        border-radius: 24px;
      }
    }
  }
}
@media screen and (max-width: 599px) {
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
