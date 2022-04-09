<template>
    <Router :exclude="['MultipleChoiceQ', 'MBTIQ']" />
</template>
<script>
import Router from 'src/router/Router'
export default {
  components: { Router }
}
</script>
