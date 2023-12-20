<template>
  <div class="admin-layout">
    <router :include="keepAliveComponents" />
  </div>
</template>

<script>
import Router from 'src/router/Router.vue'
import KeepAliveComponents from 'src/assets/js/KeepAliveComponents.js'

export default {
  components: { Router },
  data() {
    return {
      keepAliveComponents: KeepAliveComponents
    }
  }
}
</script>

<style lang="scss" scoped>
.admin-layout {
  padding-right: 50px;
  padding-left: 50px;
}
</style>
