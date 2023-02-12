<template>
  <div  v-if="!isUserLogin"
        class="page-width">
    <div class="sub-mit-box flex justify-between items-center">
      <div class="info">
        <span v-html="options.text" />
      </div>
      <div class="action-box">
        <q-btn
          unelevated
          class="btn-style"
          label="ورود"
          :to="{ name: 'login' }"
        />
        <q-btn
          unelevated
          color="primary"
          class="btn-style"
          label="ثبت نام"
          :to="{ name: 'login' }"
        />
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'GoLogin',
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    isUserLogin() {
      return this.$store.getters['Auth/isUserLogin']
    }
  }
}
</script>
<style lang="scss">
.boxed.boxedInFullWidthStatus {
  padding-right: 15px;
  padding-left: 15px;
  max-width: 100% !important;
  width: 100% !important;
}
</style>

<style scoped lang="scss">

.page-width{
  //width: 1362px;
  width: 100%;
  margin: auto;
  @media screen and (max-width:1439px ){
    //width: 954px;
    width: 100%;
  }
  @media screen and (max-width:1023px ){
    //width: 540px;
    width: 100%;
  }
  @media screen and (max-width:599px ){
    width: 100%;
    padding-right: 19px;
    padding-left: 19px;
  }
}
.sub-mit-box{
  background: #FFFFFF;
  border-radius: 16px;
  padding: 36px 80px;
  margin-bottom: 80px;
  @media  screen and (max-width: 1439px){
    padding: 30px 60px;
    margin-bottom: 60px;
  }
  @media  screen and (max-width: 1023px){
    padding: 24px;
    display: grid;
    grid-template-columns: 1fr;
    margin-bottom: 40px;
  }
  @media  screen and (max-width: 599px){
    border-radius: 12px;
  }
  .info{
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    letter-spacing: -0.03em;
    color: #000000;
    @media  screen and (max-width: 1439px){
      font-size: 16px;
      line-height: 25px;
    }
    @media  screen and (max-width: 1023px){
    margin-bottom: 24px;
    }
    @media  screen and (max-width: 599px){
      font-size: 14px;
      line-height: 22px;
    }
  }
  .action-box{
    @media  screen and (max-width: 1023px){
      justify-self: flex-end;
    }
  }
  .btn-style{
    width: 96px;
    color: #6D708B;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    align-items: center;
    text-align: center;
    letter-spacing: -0.03em;
    height: 40px;

  }
}
</style>
