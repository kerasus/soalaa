<template>
  <router :include="keepAliveComponents" />
</template>

<script>
import Router from 'src/router/Router.vue'
import KeepAliveComponents from 'src/assets/js/KeepAliveComponents.js'

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
