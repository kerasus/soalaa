<template>
  <template-builder :value="properties">
    <template #header>
      <main-header/>
    </template>
    <template #left-drawer>
      <side-menu-dashboard/>
    </template>
    <template #content>
      <router-view :key="$route.name" />
    </template>
  </template-builder>
</template>

<script>
import mainHeader from 'components/Layout/mainHeader'
import SideMenuDashboard from 'components/Menu/SideMenu/SideMenu-dashboard'
import { User } from 'src/models/User'
import templateBuilder from 'components/Template/TemplateBuilder'

export default {
  components: { mainHeader, SideMenuDashboard, templateBuilder },
  data () {
    return {
      user: new User(),
      tab: 'home',
      properties: {
        layoutView: 'lHh lpR lFf',
        layoutHeader: true,
        layoutHeaderReveal: false,
        layoutHeaderElevated: false,
        layoutHeaderBordered: false,
        layoutLeftDrawer: true,
        layoutLeftDrawerOverlay: false,
        layoutLeftDrawerVisible: true,
        layoutLeftDrawerElevated: false,
        layoutLeftDrawerBordered: false,
        leftDrawerWidth: '325',
        layoutPageContainer: true,
        layoutRightDrawer: false,
        layoutRightDrawerOverlay: false,
        layoutRightDrawerElevated: false,
        layoutRightDrawerBordered: false,
        layoutFooter: false,
        layoutFooterReveal: false,
        layoutFooterElevated: false,
        layoutFooterBordered: false,
        layoutHeaderCustomClass: 'main-layout-header',
        layoutLeftDrawerCustomClass: 'main-layout-left-drawer',
        layoutPageContainerCustomClass: 'main-layout-container',
        menuIcon: 'menu'
      }
    }
  },
  created () {
    this.getUser()
  },
  methods: {
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
  .layout-header {
    .q-btn {
      &.toolbar-button {
        margin-right: 12px;
        height: 48px;
        width: 48px;
        box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
        border-radius: 16px;
      }
    }
  }
}
.main-layout-container {
}
.main-layout-left-drawer {
}
</style>

<style lang="scss">
.main-layout-header{
  background-color: #f1f1f1;
  .layout-header {
    .q-btn{
      &.toolbar-button{
        .q-btn__content{
          .q-btn-dropdown__arrow{
            display: none !important;
          }
        }
      }
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
