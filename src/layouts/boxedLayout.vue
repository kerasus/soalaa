<template>
  <div class="user-panel-no-navigation-container">
    <breadcrumbs />
    <router :include="keepAliveComponents" />
  </div>
</template>

<script>
import Router from 'src/router/Router.vue'
import { Breadcrumbs } from 'quasar-template-builder'
import KeepAliveComponents from 'src/assets/js/KeepAliveComponents.js'

export default {
  name: 'userPanelNoNavigationLayout',
  components: {
    Router,
    Breadcrumbs
  },
  data: () => ({
    keepAliveComponents: KeepAliveComponents
  })
}
</script>

<style scoped lang="scss">
.user-panel-no-navigation-container{
  display: grid;
  justify-content: center;
  grid-template-columns: 1362px;
  @media screen and (max-width: 1439px){
    grid-template-columns: 966px;
  }
  @media screen and (max-width: 1023px){
    grid-template-columns: 100%;
  }
}
</style>
