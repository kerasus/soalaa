<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'Router',
  props: {
    exclude: {
      default: [],
      required: false
    },
    include: {
      default: [],
      required: false
    }
  }
}
</script>

<style scoped>

</style>
