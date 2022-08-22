<template>
  <user-side-bar />
</template>

<script>
import UserSideBar from 'pages/User/MyOrders/UserSideBar'
export default {
  name: 'MyOrders',
  components: { UserSideBar },
  data () {
    return {
      properties: {
        layoutView: 'lHh Lpr lFf',
        layoutHeader: true,
        layoutHeaderVisible: true,
        layoutHeaderReveal: false,
        layoutHeaderElevated: false,
        layoutHeaderBordered: false,
        layoutLeftDrawer: true,
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
  created () {
    this.updateLayout()
  },
  methods: {
    updateLayout () {
      this.$store.dispatch('AppLayout/updateStore', this.properties)
    }
  }
}
</script>

<style scoped>

</style>
