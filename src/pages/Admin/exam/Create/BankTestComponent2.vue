<template>
  this will DEFINITELY be replaced !!!!!
  <div class="btn-box flex justify-end items-center">
    <q-btn
      unelevated
      class="q-mr-xl btn-md"
      :icon="'isax:arrow-right-3'"
      style="margin-right: 18px;"
      @click="goBackToLastStep"
    >
      بازگشت
    </q-btn>
    <q-btn
      unelevated
      color="primary"
      class="q-mr-xl btn-md"
      style="margin-right: 18px;"
      :icon-right="'isax:arrow-left-2'"
      @click="finalQuestionsConfirmed"
    >
      مرحله بعد
    </q-btn>
  </div>
</template>

<script>
export default {
  name: 'BankTestComponent2',
  emits: [
    'btnClicked'
  ],
  methods: {
    finalQuestionsConfirmed () {
      this.$emit('btnClicked', 'Create')
    },
    goBackToLastStep () {
      this.$emit('btnClicked', 'BankTestComponent1')
    }
  }
}
</script>

<style scoped>
.btn-box {
  margin-bottom: 30px;
}
</style>
