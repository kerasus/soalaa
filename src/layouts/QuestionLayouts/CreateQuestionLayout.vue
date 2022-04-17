<template>
  <div class="createQ-text-container">
    <navbar />
    <Router :include="keepAliveComponents" />
  </div>
</template>

<script>
import Navbar from 'components/Question/QuestionPage/Create/textMode/Navbar'
import Router from 'src/router/Router'
import KeepAliveComponents from 'assets/js/KeepAliveComponents'

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
  padding: 40px 100px;
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
