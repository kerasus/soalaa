<template>
  <template-builder v-model:value="properties" @drawerClosed="drawerMode">
    <template #header>
      <div
        class="drawer-btn"
        :class="{'col-6': windowSize < 350}"
      >
        <q-btn
          class="toolbar-button"
          icon="isax:menu-1"
          color="white"
          text-color="accent"
          dense
          unelevated
          @click="toggleLeftDrawer"
        />
      </div>
      <div
        class="right-side"
        :class="{'col-6': windowSize > 1023, 'col-12': windowSize < 350}"
      >
        <span
        v-for="(address, index) in addresses"
        :key="index"
        class="address-bar"
      >
        {{ address }}
      </span>
      </div>
      <div
        class="left-side"
        :class="{'col-6': windowSize < 350, 'col-6': windowSize > 1023}">
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
          </q-btn-dropdown>
        </div>
    </template>
    <template #left-drawer>
      <side-menu-dashboard @selected-item="selectedItem" @selected-child-item="selectedChildItem"/>
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
      addresses: [],
      properties: {
        layoutView: 'lHh Lpr lFf',
        layoutHeader: true,
        layoutHeaderVisible: true,
        layoutHeaderReveal: false,
        layoutHeaderElevated: false,
        layoutHeaderBordered: false,
        layoutLeftDrawer: true,
        layoutLeftDrawerVisible: true,
        layoutLeftDrawerOverlay: false,
        layoutLeftDrawerElevated: false,
        layoutLeftDrawerBordered: false,
        leftDrawerWidth: 325,
        layoutPageContainer: true,
        layoutRightDrawer: false,
        layoutFooter: false,
        layoutHeaderCustomClass: 'main-layout-header row',
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
    drawerSize () {
      if (this.windowSize > 1023) {
        return 325
      } else if (this.windowSize < 1024 && this.windowSize > 349) {
        return 280
      } else if (this.windowSize < 350) {
        return 242
      }
    }
  },
  created () {
    this.properties.leftDrawerWidth = this.drawerSize
  },
  watch: {
    windowSize () {
      if (this.windowSize > 1023) {
        this.properties.leftDrawerWidth = 325
        this.properties.layoutLeftDrawerVisible = true
        this.properties.layoutLeftDrawerBehavior = 'desktop'
      } else if (this.windowSize < 1024 && this.windowSize > 349) {
        this.properties.leftDrawerWidth = 280
        this.properties.layoutLeftDrawerBehavior = 'mobile'
      } else if (this.windowSize < 350) {
        this.properties.leftDrawerWidth = 242
      }
    }
  },
  methods: {
    selectedItem (value) {
      this.addresses = []
      this.addresses.push(value)
    },
    selectedChildItem (value) {
      this.addresses = []
      this.addresses.push(value.item)
      this.addresses.push(value.child)
    },
    drawerMode (value) {
      this.properties.layoutLeftDrawerVisible = false
    },
    toggleLeftDrawer () {
      this.properties.layoutLeftDrawerVisible = !this.properties.layoutLeftDrawerVisible
    },
    getDimensions () {
      this.windowSize = document.documentElement.clientWidth
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
  .drawer-btn{
    display: none;
    @media screen and (max-width: 1023px){
      display: block;
    }
    @media screen and (max-width: 349px){
      margin-bottom: 10px;
    }
  }
  .right-side {
    display: flex;
    align-items: center;
    @media screen and (max-width: 1023px){
      margin-left: 78px;
    }
    @media screen and (max-width: 599px){
      margin-left: 42px;
    }
    @media screen and (max-width: 349px){
      margin-left: 0;
    }
    .address-bar {
      font-size: 18px;
      font-weight: 500;
      color: #23263B;
      &:nth-child(2) {
        font-size: 16px;
      }
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
    display: flex;
    justify-content: end;
    @media screen and (max-width: 1023px){
      position: absolute;
      right: 30px;
    }
    @media screen and (max-width: 349px){
      right: 16px;
      margin-bottom: 10px;
    }
  }
  .q-btn {
    &.toolbar-button {
      margin-left: 12px;
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
  .drawer-btn{
    .q-btn{
      flex-direction: row !important;
    }
  }
  .right-side{
    @media screen and (max-width: 1023px){
    }
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
