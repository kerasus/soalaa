<template>
  <router :include="keepAliveComponents" />
</template>

<script>
import KeepAliveComponents from 'assets/js/KeepAliveComponents'
import Router from 'src/router/Router'
export default {
  components: { Router },
  data () {
    return {
      keepAliveComponents: KeepAliveComponents
    }
  },
  created () {
    // console.log('bareLayout created')
  },
  mounted () {
    // console.log('bareLayout mounted')
  }
}
</script>
