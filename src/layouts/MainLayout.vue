<template>
  <quasar-template-builder v-model:value="properties">
    <template #header>
      <template-header/>
    </template>
    <template #left-drawer>
      <side-menu-dashboard />
    </template>
    <template #content>
      <router-view :key="$route.name" />
    </template>
  </quasar-template-builder>
</template>

<script>

import SideMenuDashboard from 'components/Menu/SideMenu/SideMenu-dashboard'
import { User } from 'src/models/User'
import { QuasarTemplateBuilder } from 'quasar-template-builder'
import templateHeader from 'components/Template/templateHeader'

export default {
  components: { SideMenuDashboard, QuasarTemplateBuilder, templateHeader },
  data () {
    return {
      leftDrawerOpen: false,
      user: new User(),
      windowSize: document.documentElement.clientWidth,
      showBtn: false,
      tab: 'home',
      properties: {
        layoutView: 'lHh Lpr lFf',
        layoutHeader: true,
        layoutHeaderVisible: true,
        layoutHeaderReveal: false,
        layoutHeaderElevated: false,
        layoutHeaderBordered: false,
        layoutLeftDrawer: true,
        layoutLeftDrawerBehavior: '',
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
  mounted () {
    window.addEventListener('resize', this.getDimensions)
  },
  unmounted () {
    window.removeEventListener('resize', this.getDimensions)
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    drawerSize () {
      if (this.windowSize > 1023) {
        return 325
      } else if (this.windowSize < 1024 && this.windowSize > 349) {
        return 280 && this.$store.commit('AppLayout/updateLayoutLeftDrawerBehavior', 'mobile')
      } else if (this.windowSize < 350) {
        return 242
      }
    },
    drawerBehavior () {
      if (this.windowSize > 1023) {
        return this.$store.commit('AppLayout/updateLayoutLeftDrawerBehavior', 'desktop')
      } else {
        return this.$store.commit('AppLayout/updateLayoutLeftDrawerBehavior', 'mobile')
      }
    }
  },
  created () {
    // const AppLayout = JSON.parse(localStorage.getItem('AppLayout'))
    // if (AppLayout) {
    //   console.log(this.properties)
    //   console.log('if')
    //   this.properties = AppLayout
    //   console.log(this.properties)
    // } else {
    //   // localStorage.setItem('AppLayout', JSON.stringify(this.properties))
    // }
    this.properties.layoutLeftDrawerBehavior = this.drawerBehavior
    this.$store.commit('AppLayout/updateLayoutLeftDrawerWidth', this.drawerSize)
  },
  watch: {
    windowSize () {
      console.log(this.drawerSize)
      if (this.windowSize > 1023) {
        this.layoutLeftDrawerWidth = 325
      } else if (this.windowSize < 1024 && this.windowSize > 349) {
        this.layoutLeftDrawerWidth = 280
      } else if (this.windowSize < 350) {
        this.layoutLeftDrawerWidth = 242
      }
    }
  },
  methods: {
    // getDimensions () {
    //   this.windowSize = document.documentElement.clientWidth
    // },
    getUser () {
      this.user = this.$store.getters['Auth/user']
      return this.user
    },
    logOut () {
      return this.$store.dispatch('Auth/logOut')
    }
  }
}
</script>

<style lang="scss" scoped>
.main-layout-header{

}
.main-layout-container {
}
.main-layout-left-drawer {
}
</style>

<style lang="scss">
.main-layout-header{
  background-color: #f1f1f1;
  display: flex;
  flex-direction: row;
  padding: 60px 100px 24px 76px;
  @media screen and (max-width: 1439px){
    padding: 30px 30px 24px 0;
  }
  @media screen and (max-width: 1023px){
    padding: 20px 30px 18px 30px !important;
  }
  @media screen and (max-width: 599px){
    padding: 20px 30px 20px 20px;
  }
  @media screen and (max-width: 349px){
    padding: 24px 16px 14px 16px !important;
    :nth-child(1) { order: 1; }
    :nth-child(2) { order: 3; }
    :nth-child(3) { order: 2; }
  }
  .right-side{
    @media screen and (max-width: 1023px){
    }
  }
}
.main-layout-container {
  background-color: #f1f1f1;
}
.main-layout-left-drawer {
  background-color: #f1f1f1;
}
</style>
