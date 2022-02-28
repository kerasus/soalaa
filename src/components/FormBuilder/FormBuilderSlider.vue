<template>
  <div>
    <q-badge color="secondary">
      {{ label }}: {{ inputData }} ({{ min }} تا {{ max }})
    </q-badge>
    <q-slider
      v-model="inputData"
      :min="min"
      :max="max"
      :disable="disable"
      @input="change($event)"
    />
  </div>
</template>

<script>
import inputMixin from 'components/FormBuilder/inputMixin'
export default {
  name: 'FormBuilderSlider',
  mixins: [inputMixin],
  props: {
    value: {
      default: 0,
      type: Number
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
