<template>
  <div class="row user-panel-layout">
    <user-side-bar class="col-xl-3 col-lg-3 col-md-3" />
    <div class="col-xl-9 col-lg-9 col-md-9 user-panel-content">
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
      keepAliveComponents: KeepAliveComponents,
      properties: {
        layoutView: 'lHh Lpr lFf',
        layoutHeader: true,
        layoutHeaderVisible: true,
        layoutHeaderReveal: false,
        layoutHeaderElevated: false,
        layoutHeaderBordered: false,
        layoutLeftDrawer: true,
        layoutLeftDrawerVisible: false,
        layoutLeftDrawerOverlay: false,
        layoutLeftDrawerElevated: false,
        layoutLeftDrawerBordered: false,
        layoutLeftDrawerWidth: 325,
        layoutPageContainer: true,
        layoutRightDrawer: false,
        layoutFooter: false,
        layoutHeaderCustomClass: 'main-layout-header row',
        layoutLeftDrawerCustomClass: 'main-layout-left-drawer',
        layoutPageContainerCustomClass: 'main-layout-container'
      }
    }
  },
  created () {
    this.updateLayout()
  },
  methods: {
    updateLayout () {
      this.$store.dispatch('AppLayout/updateStore', this.properties)
    }
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
  .user-panel-content {
    @media screen and (max-width: 1439px) {
      padding-right: 32px;
    }
    @media screen and (max-width: 1148px) {
      padding-right: 20px;
    }
  }
}
</style>
