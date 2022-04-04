<template>
  <div class="createQ-text-container">
    <navbar/>
    <router-view v-slot="{ Component }">
<!--      <transition name="fade" mode="out-in">-->
          <component :is="Component" :key="$route.fullPath" />
<!--      </transition>-->
    </router-view>
  </div>
</template>

<script>
import Navbar from 'components/Question/QuestionPage/Create/textMode/Navbar'
export default {
  name: 'CreateTextLayout',
  components: {
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
