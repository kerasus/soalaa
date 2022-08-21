<template>
    <Router :include="keepAliveComponents" />
</template>

<script>
import KeepAliveComponents from 'assets/js/KeepAliveComponents'
import Router from 'src/router/Router'

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
