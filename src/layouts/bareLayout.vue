<template>
  <Router :include="keepAliveComponents" />
</template>

<script>
import KeepAliveComponents from 'assets/js/KeepAliveComponents'
import Router from 'src/router/Router'
export default {
  components: { Router },
  created () {
    // console.log('bareLayout created')
  },
  mounted () {
    // console.log('bareLayout mounted')
  },
  data () {
    return {
      keepAliveComponents: KeepAliveComponents
    }
  }
}
</script>
