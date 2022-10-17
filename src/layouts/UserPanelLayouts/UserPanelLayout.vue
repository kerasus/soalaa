<template>
  <div class="user-panel-layout"
       :class="{'full-content-size' : !hasNavigationBar}"
  >
    <div
      v-if="hasNavigationBar"
      class="side-bar-box"
    >
      <sticky-both-sides>
        <user-side-bar />
      </sticky-both-sides>
    </div>
    <div class="user-panel-content"
    >
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
  display: grid;
  grid-template-columns: 277px auto;
  column-gap:35px;
  &.full-content-size{
    grid-template-columns: 100%;
  }
  @media screen and (max-width: 1439px){
    grid-template-columns: 220px auto;
    column-gap: 32px;
  }
  @media screen and (max-width: 1023px){
    grid-template-columns: 100%;
  }
  .side-bar-box{
    @media screen and (max-width: 1023px){
      display: none;
    }
  }
}
</style>
