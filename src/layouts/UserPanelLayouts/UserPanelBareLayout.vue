<template>
  <div class="row user-panel-bare-layout">
    <div class="col-12">
      <Router :include="keepAliveComponents" />
    </div>
  </div>
</template>

<script>
import Router from 'src/router/Router'
import KeepAliveComponents from 'assets/js/KeepAliveComponents'

export default {
  name: 'UserPanelBareLayout',
  components: { Router },
  data () {
    return {
      keepAliveComponents: KeepAliveComponents
    }
  }
}
</script>

<style scoped lang="scss">
.user-panel-bare-layout {
  max-width: 1362px;
  margin: auto;
  padding-top: 30px;
  background: #f4f6f9;
  justify-content: center;
  @media screen and (max-width: 1439px) {
    max-width: 100%;
  }
  @media screen and (max-width: 1439px) {
    padding-left: 35px;
    padding-right: 35px;
  }
  //@media screen and (max-width: 1148px) {
  //  padding-left: 20px;
  //  padding-right: 20px;
  //}
  @media screen and (max-width: 1023px) {
    padding-left: 30px;
    padding-right: 30px;
  }
  @media screen and (max-width: 599px) {
    padding-left: 20px;
    padding-right: 20px;
  }
  .user-side-bar {
    @media screen and (max-width: 1023px) {
      display: none;
    }
  }
}
</style>
