<template>
  <div class="container-box text-center">
    <div class="img-box text-center">
      <q-img class="img"
             src="https://nodes.alaatv.com/aaa/landing/Soalaa/States/404.png"></q-img>
    </div>
    <div class="main-text">
      صفحه‌ای یافت نشد!
    </div>
    <div class="links">
      <q-btn flat
             to="/"
             class="link">
        صفحه اصلی
      </q-btn>
      <q-btn flat
             :to="{name: 'User.Exam.List'}"
             class="link">
        آزمون‌های سه‌آ
      </q-btn>
      <q-btn flat
             :to="{name: 'User.Create.Exam'}"
             class="link">
        بانک سوالا
      </q-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>
<style lang="scss" scoped>
.container-box{
  padding-top: 230px;
  .img-box{
    width: 462px;
    margin: 0 auto 50px;
    @media screen and(max-width: 1439px) {
      width: 299px;
    }
    @media screen and(max-width: 1023px) {
      width: 356px;
    }
    @media screen and(max-width: 599px) {
      width: 240px;
    }
    .img{
      width: 100%;
    }
  }
  .main-text{
    margin-bottom: 20px;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 37px;
    letter-spacing: -0.03em;
    color: var(--Text-2);
    @media screen and(max-width: 1439px) {
      font-size: 22px;
      line-height: 34px;
    }
    @media screen and(max-width: 599px) {
      font-size: 18px;
      line-height: 28px;
    }
  }
  //$breakpoint-xs: 599px !default
  //$breakpoint-sm: 1023px !default
  //$breakpoint-md: 1439px !default
  //$breakpoint-lg: 1919px !default
  .links{
    display: flex;
    justify-content: center;
    .link{
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 28px;
      letter-spacing: -0.03em;
      color: var(--Primary-dark);
      :deep(.q-btn__content){
        margin: 0 10px
      }
      @media screen and(max-width: 599px) {
        font-size: 14px;
        line-height: 22px;
      }
    }

  }
}
</style>
