<template>
  <router-view v-slot="{ Component }">
    <keep-alive :exclude="['Edit' , 'editExamReport']">
      <component :is="Component" :key="$route.fullPath" />
    </keep-alive>
  </router-view>
</template>
