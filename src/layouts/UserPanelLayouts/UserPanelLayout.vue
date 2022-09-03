<template>
  <div class="row user-panel-layout">
    <user-side-bar class="user-side-bar col-xl-3 col-lg-3 col-md-3" />
    <div class="col-xl-9 col-lg-9 col-md-9 col-12 user-panel-content">
      <Router :include="keepAliveComponents" />
    </div>
  </div>
</template>

<script>
import UserSideBar from 'layouts/UserPanelLayouts/UserSideBar'
import KeepAliveComponents from 'assets/js/KeepAliveComponents'
import Router from 'src/router/Router'
export default {
  name: 'UserPanelLayout',
  components: { UserSideBar, Router },
  data () {
    return {
      keepAliveComponents: KeepAliveComponents
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.user-panel-layout {
  max-width: 1362px;
  margin: auto;
  @media screen and (max-width: 1439px) {
    max-width: 100%;
  }
  @media screen and (max-width: 1439px) {
    padding-left: 32px;
    padding-right: 32px;
  }
  @media screen and (max-width: 1148px) {
    padding-left: 20px;
    padding-right: 20px;
  }
  @media screen and (max-width: 1023px) {
    padding-left: 30px;
    padding-right: 30px;
  }
  @media screen and (max-width: 600px) {
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
