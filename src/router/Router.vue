<template>
  <router-view>
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
