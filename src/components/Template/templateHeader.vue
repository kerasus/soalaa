<template>
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
    <template
      v-for="(breadcrumb, index) in headerTitle.path"
      :key="index"
    >
      <span v-if="!getRoute(breadcrumb.route)"
            class="address-bar"
      >
        {{ breadcrumb.title }}
      </span>
      <router-link
        v-else
        :to="getRoute(breadcrumb.route)"
        class="address-bar"
      >
        {{ breadcrumb.title }}
      </router-link>
    </template>
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
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'templateHeader',
  data () {
    return {
      windowSize: document.documentElement.clientWidth,
      addresses: []
    }
  },
  mounted () {
    window.addEventListener('resize', this.getDimensions)
  },
  unmounted () {
    window.removeEventListener('resize', this.getDimensions)
  },
  computed: {
    ...mapGetters('AppLayout', [
      'headerTitle',
      'headerShowTitle',
      'layoutLeftDrawerVisible'
    ])
  },
  methods: {
    ...mapMutations('AppLayout', [
      'updateHeaderShowTitle',
      'updateHeaderTitleCentered',
      'updateLayoutLeftDrawerVisible'
    ]),
    getDimensions () {
      this.windowSize = document.documentElement.clientWidth
    },
    toggleLeftDrawer () {
      this.updateLayoutLeftDrawerVisible(true)
    },
    getRoute (route) {
      if (!route) {
        return false
      }

      if (route.name) {
        return { name: route.name }
      } else if (route.path) {
        return { path: route.path }
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
  justify-content: flex-end;
  @media screen and (max-width: 1023px){
    position: absolute;
    right: 30px;
  }
  @media screen and (max-width: 349px){
    right: 16px;
    margin-bottom: 10px;
  }
}
</style>
<style lang="scss">
.drawer-btn{
  .q-btn{
    flex-direction: row !important;
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
</style>
