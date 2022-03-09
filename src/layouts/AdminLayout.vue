<template>
  <router-view v-slot="{ Component }">
    <keep-alive :exclude="'edit.vue'">
      <component :is="Component" :key="$route.fullPath" />
    </keep-alive>
  </router-view>
</template>
