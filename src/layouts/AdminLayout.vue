<template>
  <div class="admin-layout">
    <q-scroll-observer @scroll="onscroll" />
    <Router :include="keepAliveComponents" />
  </div>
</template>

<script>
import Router from 'src/router/Router'
import KeepAliveComponents from 'assets/js/KeepAliveComponents'
import { computed } from 'vue'

export default {
  components: { Router },
  data() {
    return {
      keepAliveComponents: KeepAliveComponents,
      scrollInfo: {}
    }
  },
  provide() {
    return {
      scrollInfo: computed(() => this.scrollInfo)
    }
  },
  methods: {
    onscroll(info) {
      this.scrollInfo = info
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
