<template>
  <div class="row user-panel-layout">
    <div v-if="getTemplateLeftSideBarType === 'default'"
         class="user-side-bar col-xl-3 col-lg-3 col-md-3"
    >
      <sticky-both-sides>
        <user-side-bar />
      </sticky-both-sides>
    </div>
    <div class="col-xl-9 col-lg-9 col-md-9 col-12 user-panel-content">
      <Router :include="keepAliveComponents" />
    </div>
  </div>
</template>

<script>
import UserSideBar from 'layouts/UserPanelLayouts/UserSideBar'
import KeepAliveComponents from 'assets/js/KeepAliveComponents'
import Router from 'src/router/Router'
import StickyBothSides from 'components/Utils/StickyBothSides'

export default {
  name: 'UserPanelLayout',
  components: {
    UserSideBar,
    Router,
    StickyBothSides
  },
  data () {
    return {
      keepAliveComponents: KeepAliveComponents
    }
  },
  computed: {
    getTemplateLeftSideBarType() {
      return this.$store.getters['AppLayout/layoutLeftSideBarType']
    },
    getLayoutLeftDrawerVisibility () {
      return this.$store.getters['AppLayout/layoutLeftDrawerVisible']
    },
    windowSize () {
      return this.$store.getters['AppLayout/windowSize']
    },
    hasNavigationBar() {
      return this.getTemplateLeftSideBarType === 'default' && !this.getLayoutLeftDrawerVisibility
    }
  },
  created () {
    if (this.windowSize.x < 1024) {
      this.$store.dispatch('AppLayout/updateTemplateLayout', {
        layoutLeftDrawerVisible: false,
        layoutLeftDrawer: true
      })
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.user-panel-layout {
  display: flex;
  max-width: 1362px;
  margin: auto;
  padding-top: 30px;
  background: #f4f6f9;
  justify-content: space-between;
  .user-side-bar {
    width: 277px;
    @media screen and(max-width: 1439px) {
      width: 220px;
    }
  }
  .user-panel-content {
    max-width: 1050px;
  }
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
  // ======================================================= attention
  //.user-panel-content{
  //  width: 100%;
  //}
  .user-side-bar {
    @media screen and (max-width: 1023px) {
     display: none;
    }
  }
}
</style>
