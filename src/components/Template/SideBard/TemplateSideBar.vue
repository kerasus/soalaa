<template>
  <map-of-questions v-if="type === 'quiz'" />
  <user-side-bar v-else-if="type === 'default'" />
  <side-menu-dashboard v-else-if="type === 'panel'" />
  <div v-else />
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'TemplateSideBar',
  components: {
    UserSideBar: defineAsyncComponent(() => import('src/components/Template/SideBard/UserSideBar.vue')),
    MapOfQuestions: defineAsyncComponent(() => import('src/components/Template/SideBard/MapOfQuestions.vue')),
    SideMenuDashboard: defineAsyncComponent(() => import('src/components/Template/SideBard/SideMenuDashboard.vue'))
  },
  props: {
    type: [String, Boolean, null],
    default: () => 'main'
  }
}
</script>
