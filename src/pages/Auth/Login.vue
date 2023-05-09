<template>
  <div class="login-page row items-center justify-center">
    <div class="col-12">
      <auth />
    </div>
  </div>
</template>

<script>
import Auth from 'src/components/Auth'
export default {
  name: 'Login',
  components: { Auth },
  created () {
    this.closeSidBarAndAppbar()
  },
  methods: {
    closeSidBarAndAppbar () {
      this.$store.commit('AppLayout/updateLayoutLeftDrawerVisible', false)
      this.$store.commit('AppLayout/updateLayoutHeaderVisible', false)
    }
  }
}
</script>

<style scoped>
.login-page{
  height: 100vh;
}
</style>
