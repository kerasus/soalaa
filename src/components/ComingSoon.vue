<template>
  <v-overlay
    v-if="false"
    :absolute="true"
    :opacity="0"
  >
    <v-btn
      color="orange lighten-2"
      @click="overlay = false"
    >
      به زودی
    </v-btn>
  </v-overlay>
</template>

<script>
    export default {
        name: 'ComingSoon'
    }
</script>

<style scoped>

</style>
