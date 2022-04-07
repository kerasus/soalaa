<template>
  <div class="createQ-text-container">
    <navbar />
    <Router :exclude="['MultipleChoiceQ', 'MBTIQ']" />
  </div>
</template>

<script>
import Navbar from 'components/Question/QuestionPage/Create/textMode/Navbar'
import Router from 'src/router/Router'
export default {
  name: 'CreateTextLayout',
  components: {
    Router,
    Navbar
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
