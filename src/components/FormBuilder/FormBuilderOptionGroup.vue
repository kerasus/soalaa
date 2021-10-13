<template>
  <div>
    <q-option-group
      v-model="inputData"
      :options="options"
      :color="color"
      :inline="inline"
      :dense="dense"
      :type="type"
      :disable="disable"
      @update:model-value="change($event)"
    />
  </div>
</template>

<script>
import inputMixin from 'components/FormBuilder/inputMixin'
export default {
  name: 'FormBuilderOptionGroup',
  mixins: [inputMixin],
  props: {
    value: {
      default: '',
      type: [Object, String, Array, Number, Boolean]
    },
    options: {
      default: () => [], // { label: 'Option 1', value: 'op1' }
      type: Array
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
