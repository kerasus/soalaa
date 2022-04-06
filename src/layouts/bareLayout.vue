<template>
  <router-view v-slot="{ Component }">
      <component :is="Component" :key="$route.fullPath" />
  </router-view>
</template>

<script>
export default {
  created () {
    // console.log('bareLayout created')
  },
  mounted () {
    // console.log('bareLayout mounted')
  }
}
</script>
