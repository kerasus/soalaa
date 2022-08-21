<template>
  <div class="admin-layout">
    <Router :include="keepAliveComponents" />
  </div>
</template>

<script>
import Router from 'src/router/Router'
import KeepAliveComponents from 'assets/js/KeepAliveComponents'
export default {
  components: { Router },
  data () {
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
