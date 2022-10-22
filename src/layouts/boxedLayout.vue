<template>
  <div class="user-panel-no-navigation-container">
    <breadcrumbs />
    <Router :include="keepAliveComponents" />
  </div>
</template>

<script>
import Router from 'src/router/Router'
import KeepAliveComponents from 'assets/js/KeepAliveComponents'
import { Breadcrumbs } from 'quasar-template-builder'
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
