<template>
  <Router :include="keepAliveComponents" />
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
