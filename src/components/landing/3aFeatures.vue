<template>
  <div class="landing-3a-features row">
    <div class="col-12">
      <p class="landing-3a-features-title">ویژگی های آزمون سه‌آ</p>
    </div>
    <div class="landing-3a-feature col-sm-4 col-xs-6">
      <q-img width="300px"  src="https://nodes.alaatv.com/upload/landing/3a/7.png"/>
      <p class="feature-title">سه‌آ در سه شنبه ها</p>
    </div>

    <div class="landing-3a-feature col-sm-4 col-xs-6">
      <q-img width="300px"  src="https://nodes.alaatv.com/upload/landing/3a/8.png"/>
      <p class="feature-title">راحت در موبایل</p>
    </div>

    <div class="landing-3a-feature col-sm-4 col-xs-6">
      <q-img width="300px"  src="https://nodes.alaatv.com/upload/landing/3a/9.png"/>
      <p class="feature-title">کارنامه آنی</p>
    </div>

    <div class="landing-3a-feature col-sm-4 col-xs-6">
      <q-img width="300px"  src="https://nodes.alaatv.com/upload/landing/3a/10.png"/>
      <p class="feature-title">تست‌ها مطابق کنکور</p>
    </div>

    <div class="landing-3a-feature col-sm-4 col-xs-6">
      <q-img width="300px"  src="https://nodes.alaatv.com/upload/landing/3a/12.png"/>
      <p class="feature-title">پاسخنامه ویدئویی</p>
    </div>
  </div>
</template>

<script>
export default {
  name: '3aFeatures'
}
</script>

<style lang="scss" scoped>
.landing-3a-features {
  display: flex;
  padding-bottom: 80px;

  @media only screen and (max-width: 767px) {
    padding-bottom: 55px;
  }

  @media only screen and (max-width: 599px) {
    padding-bottom: 43px;
  }

  .landing-3a-features-title {
    text-align: center;
    font-style: normal;
    font-weight: 900;
    font-size: 32px;
    line-height: 42px;
    color: #232323;
  }

  .landing-3a-feature {
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    .feature-title {
      font-style: normal;
      font-weight: 700;
      font-size: 18px;
      line-height: 32px;
      color: #1E1E1E;
    }
  }

}
</style>
