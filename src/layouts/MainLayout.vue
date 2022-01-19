<template>
  <template-builder :value="properties">
    <template #header>
      <div class="layout-header">
        <q-btn-dropdown
          class="toolbar-button"
          content-class="profile-menu"
          icon="notifications_active"
          dropdown-icon="false"
          color="white"
          text-color="black"
          dir="ltr"
          dense
          unelevated
        >
          <DashboardTopMenu/>
        </q-btn-dropdown>
        <q-btn-dropdown
          class="toolbar-button"
          content-class="profile-menu"
          icon="person"
          dropdown-icon="false"
          color="white"
          text-color="black"
          dir="ltr"
          dense
          unelevated
        >
          <DashboardTopMenu/>
        </q-btn-dropdown>
      </div>
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
import SideMenuDashboard from 'components/Menu/SideMenu/SideMenu-dashboard'
import { User } from 'src/models/User'
import DashboardTopMenu from 'components/Menu/topMenu/DashboardTopMenu'
import templateBuilder from 'components/Template/TemplateBuilder'

export default {
  components: { DashboardTopMenu, SideMenuDashboard, templateBuilder },
  data () {
    return {
      user: new User(),
      tab: 'home',
      leftDrawerOpen: false,
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
        leftDrawerWidth: '350',
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
    changeView () {
      this.$router.push({
        name: 'konkoorView',
        params: {
          quizId: this.$route.params.quizId
        }
      })
    },
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
