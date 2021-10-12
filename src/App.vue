<template>
  <router-view />
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  created () {
    console.log('this.$axios', this.$axios)
  }
})
</script>
