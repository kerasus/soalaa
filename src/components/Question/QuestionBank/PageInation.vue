<template>
  <div class="question-bank-pagination q-pa-lg flex flex-center">
    <q-pagination
      active-color="primary"
      outline
      direction-links
      v-model="choiceClickedStyle"
      color="black"
      :max="10"
      :max-pages="6"
      boundary-numbers
    />
  </div>
</template>

<script>
export default {
  name: 'PageInation',
  data () {
    return {
      choiceClickedStyle: 0
    }
  }
}
</script>

<style lang="scss">
.question-bank-pagination{
.q-btn--actionable{
  width: 35px;
  height: 35px;
  background: #FFFFFF;
  border-radius: 12px;
  margin-right: 3px;
}
}
</style>
