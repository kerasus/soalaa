<template>
  <div class="admin-layout">
    <!--    <q-scroll-observer @scroll="onscroll" />-->
    <router :include="keepAliveComponents" />
  </div>
</template>

<script>
// import { computed } from 'vue'
import Router from 'src/router/Router.vue'
import KeepAliveComponents from 'src/assets/js/KeepAliveComponents.js'

export default {
  components: { Router },
  // provide() {
  //   return {
  //     scrollInfo: computed(() => this.scrollInfo)
  //   }
  // },
  data() {
    return {
      keepAliveComponents: KeepAliveComponents
      // scrollInfo: {}
    }
  }
  // methods: {
  //   onscroll(info) {
  //     this.scrollInfo = info
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.admin-layout {
  padding-right: 50px;
  padding-left: 50px;
}
</style>
