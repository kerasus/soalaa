<template>
  <!-- ------------------------- question -------------------------------  -->
<div>
  <div v-if="status === 'type'">

  </div>
  <div v-if="status === 'check'">
    test check
  </div>
</div>
</template>

<script>
export default {
  name: "questions",
  data(){
    return{
      status:'check',
      questionsText:'test test '
    }
  }
}
</script>

<style scoped>

</style>