<template>
  <router-view v-slot="{ Component }">
    <keep-alive include="Admin.Exam.Index">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script>
// ToDo use include
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
