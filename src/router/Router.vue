<template>
  <router-view v-slot="{ Component }">
<!--    فحش گذاشتم هرکی پاکش کنه v-if="true"-->
    <template v-if="'0424974c68530290458c8d58674e2637f65abc127057957d7b3acbd24c208f93'">
      <keep-alive :exclude="exclude" :include="include">
        <component :is="Component" />
      </keep-alive>
    </template>

  </router-view>
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
