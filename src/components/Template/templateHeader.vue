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
    <q-breadcrumbs
      class="breadcrumbs"
      separator-color="dark"
      gutter="sm"
    >
      <template v-slot:separator>
        <q-icon name="isax:arrow-right-3 " />
      </template>
        <q-breadcrumbs-el
          v-for="(breadcrumb, index) in headerTitle.path"
          :key="index"
          :icon=breadcrumb.icon
          :label=breadcrumb.title
          :to="getRoute(breadcrumb.route)"
          class="q-breadcrumbs-el"
        />
    </q-breadcrumbs>
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
      'layoutLeftDrawerVisible'
    ])
  },
  methods: {
    ...mapMutations('AppLayout', [
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

<style lang="scss" scoped >
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
  .breadcrumbs{
    &:deep(> *) {
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 31px;
      text-align: right;
      color: #23263B;
      div:first-child  {
        font-size: 18px;
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
.breadcrumbs{
  .q-breadcrumbs__separator{
    .q-icon{
      font-size: 22px;
    }
  }}
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
