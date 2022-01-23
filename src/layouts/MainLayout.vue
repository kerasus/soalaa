<template>
  <template-builder v-model:value="properties">
    <template #header>
      <q-btn
          class="toolbar-button"
          :class="drawer"
          icon="isax:menu-1"
          color="white"
          text-color="accent"
          dense
          unelevated
          @click="toggleLeftDrawer"
        />
      <div class="right-side">
        <span
        v-for="(address, index) in addresses"
        :key="index"
        class="address-bar"
      >
        {{ address }}
      </span>
      </div>
      <div class="left-side">
          <q-btn-dropdown
            class="toolbar-button"
            content-class="profile-menu"
            icon="isax:notification"
            dropdown-icon="false"
            color="white"
            text-color="accent"
            dir="ltr"
            dense
            unelevated
          >
            <q-badge color="red" rounded floating>3</q-badge>
          </q-btn-dropdown>
          <q-btn-dropdown
            class="toolbar-button"
            content-class="profile-menu"
            icon="isax:user"
            dropdown-icon="false"
            color="white"
            text-color="accent"
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
import templateBuilder from 'components/Template/TemplateBuilder'

export default {
  components: { SideMenuDashboard, templateBuilder },
  data () {
    return {
      leftDrawerOpen: false,
      user: new User(),
      windowSize: document.documentElement.clientWidth,
      showBtn: false,
      tab: 'home',
      addresses: ['سوال', 'لیست آزمون ها', 'یکی از آزمونا'],
      properties: {
        layoutView: 'lHh lpR lFf',
        layoutHeader: true,
        layoutHeaderReveal: false,
        layoutHeaderElevated: false,
        layoutHeaderBordered: false,
        layoutLeftDrawer: true,
        leftDrawerOpen: true,
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
  mounted () {
    window.addEventListener('resize', this.getDimensions)
  },
  unmounted () {
    window.removeEventListener('resize', this.getDimensions)
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    drawer () {
      if (this.windowSize < 1024) {
        return 'be-available'
      } else if (this.windowSize >= 1024) {
        return 'drawer-closer'
      }
    }
  },
  methods: {
    getDimensions () {
      this.windowSize = document.documentElement.clientWidth
    },
    toggleLeftDrawer () {
      console.log('properties', this.properties.leftDrawerOpen)
      if (this.properties.leftDrawerOpen) {
        this.properties.leftDrawerOpen = false
      } else {
        this.properties.leftDrawerOpen = true
      }
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
  .right-side {
    display: flex;
    align-items: center;

    .address-bar {
      font-size: 18px;
      font-weight: 500;
      color: #23263B;

      &::after {
        content: ">";
        margin: 0 10px;
      }

      &:last-child {
        &::after {
          content: none;
        }
      }
    }
  }
  .left-side {
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
  .drawer-closer{
    display: none;
    .be-available{
      display: block;
    }
  }
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
  justify-content: space-between;
  margin: 30px;
  @media screen and (max-width: 1023px){
    //:nth-child(1) { order: 1; }
    //:nth-child(2) { order: 3; }
    //:nth-child(3) { order: 2; }
  }
  .left-side {
    .q-btn {
      &.toolbar-button {
        .q-btn__content {
          .q-btn-dropdown__arrow {
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
