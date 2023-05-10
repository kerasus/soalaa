<template>
  <router :include="keepAliveComponents" />
</template>

<script>
import Router from 'src/router/Router.vue'
import KeepAliveComponents from 'src/assets/js/KeepAliveComponents.js'

export default {
  name: 'LandingLayout',
  components: { Router },

  data () {
    return {
      keepAliveComponents: KeepAliveComponents
    }
  }
}
</script>

<style scoped>

</style>
