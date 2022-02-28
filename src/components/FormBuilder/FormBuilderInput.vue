<template>
  <q-input v-model="inputData" :label="label" :disable="disable" @update:model-value="change($event)" />
</template>

<script>
import inputMixin from 'components/FormBuilder/inputMixin'
export default {
  name: 'FormBuilderInput',
  mixins: [inputMixin],
  props: {
    value: {
      default: '',
      type: [String, Number, Boolean]
    }
  }
}
</script>

<style scoped>

</style>
