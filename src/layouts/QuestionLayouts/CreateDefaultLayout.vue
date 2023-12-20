<template>
  <router :exclude="['MultipleChoiceQ', 'MBTIQ']" />
</template>
<script>
import Router from 'src/router/Router.vue'
export default {
  components: { Router }
}
</script>
