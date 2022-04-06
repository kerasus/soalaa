<template>
  <router-view v-slot="{ Component }">
    <keep-alive :exclude="['Edit' , 'editExamReport']">
      <component :is="Component" :key="$route.fullPath" />
    </keep-alive>
  </router-view>
</template>

<script>
// export default {
//   created () {
//     console.log('AdminLayout created')
//   },
//   mounted () {
//     console.log('AdminLayout mounted')
//   }
// }
</script>
