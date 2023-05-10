<template>
  <div class="createQ-text-container">
    <navbar />
    <router :include="keepAliveComponents" />
  </div>
</template>

<script>
import Router from 'src/router/Router.vue'
import KeepAliveComponents from 'src/assets/js/KeepAliveComponents.js'
import Navbar from 'src/components/Question/QuestionPage/Create/textMode/Navbar.vue'

export default {
  name: 'CreateLayout',
  components: {
    Router,
    Navbar
  },
  data () {
    return {
      keepAliveComponents: KeepAliveComponents
    }
  }
}
</script>

<style scoped lang="scss">
.createQ-text-container {
  padding: 40px 100px 40px 71px;
  display: flex;
  flex-direction: column;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
