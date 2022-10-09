<template>
  <div class="row user-panel-layout">
    <div
      v-if="hasNavigationBar"
      class="user-side-bar col-xl-3 col-lg-3 col-md-3"
    >
      <user-side-bar />
    </div>

    <div class=" user-panel-content"
         :class="hasNavigationBar ? 'col-xl-9 col-lg-9 col-md-9 col-12 ' : 'col-12'"
    >
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
  computed: {
    getTemplateLeftSideBarType() {
      return this.$store.getters['AppLayout/templateLeftSideBarType']
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
  .user-side-bar {
    @media screen and (max-width: 1023px) {
     display: none;
    }
  }
}
</style>
