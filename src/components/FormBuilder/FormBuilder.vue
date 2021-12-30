<template>
  <div class="row">
    <div v-for="(input, inputIndex) in inputData" :key="inputIndex" class="q-pa-md" :class="(input.col) ? input.col : 'col'">
      <component
        :is="getComponent(input)"
        v-model:value="input.value"
        :label="input.label"
        :disable="disable || input.disable"
        :options="input.options"
        :option-label="input.optionLabel"
        :option-value="input.optionValue"
        :multiple="isMultiple(input)"
        :use-chips="input.useChips"
        :create-new-value="input.createNewValue"
        :type="getOptionGroupType(input)"
        :min="input.min"
        :max="input.max"
        :range="isRange(input)"
        :time="isTime(input)"
        :src="input.value"
        :size="input.size"
        :font-size="input.fontSize"
        :color="input.color"
        :text-color="input.textColor"
        :icon="input.icon"
        :class="{ 'hidden': input.hidden }"
        @input="change($event, inputIndex)"
        @change="change($event, inputIndex)"
      />
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/named
import { defineAsyncComponent } from 'vue'
import inputMixin from 'components/FormBuilder/inputMixin'

export default {
  name: 'FormBuilder',
  components: {
    FormBuilderFile: defineAsyncComponent(() => import('components/FormBuilder/FormBuilderFile')),
    FormBuilderInput: defineAsyncComponent(() => import('components/FormBuilder/FormBuilderInput')),
    FormBuilderInputEditor: defineAsyncComponent(() => import('components/FormBuilder/FormBuilderInputEditor')),
    FormBuilderAvatar: defineAsyncComponent(() => import('components/FormBuilder/FormBuilderAvatar')),
    FormBuilderSelect: defineAsyncComponent(() => import('components/FormBuilder/FormBuilderSelect')),
    FormBuilderOptionGroup: defineAsyncComponent(() => import('components/FormBuilder/FormBuilderOptionGroup')),
    FormBuilderCheckbox: defineAsyncComponent(() => import('components/FormBuilder/FormBuilderCheckbox')),
    FormBuilderSlider: defineAsyncComponent(() => import('components/FormBuilder/FormBuilderSlider')),
    FormBuilderRangeSlider: defineAsyncComponent(() => import('components/FormBuilder/FormBuilderRangeSlider')),
    FormBuilderSpace: defineAsyncComponent(() => import('components/FormBuilder/FormBuilderSpace')),
    FormBuilderDateTime: defineAsyncComponent(() => import('components/FormBuilder/FormBuilderDateTime'))
  },
  mixins: [inputMixin],
  props: {
    value: {
      default: () => [],
      type: Array
    },
    disable: {
      default: false,
      type: Boolean
    }
  },
  emits: ['input'],
  data () {
    return {
      currentInput: null,
      optionGroupType: null,
      dateTime_Range: null,
      dateTime_Multiple: null,
      dateTime_Time: null
    }
  },
  methods: {
    getComponent (input) {
      if (
        input.type === 'optionGroupRadio' ||
        input.type === 'optionGroupCheckbox' ||
        input.type === 'optionGroupToggle'
      ) {
        return 'form-builder-option-group'
      }
      if (
        input.type === 'dateMultipleRange' ||
        input.type === 'dateRange' ||
        input.type === 'date' ||
        input.type === 'dateTime' ||
        input.type === 'time'
      ) {
        return 'form-builder-date-time'
      }
      return 'form-builder-' + input.type
    },
    getOptionGroupType (input) {
      if (input.type === 'optionGroupRadio') {
        return 'radio'
      } else if (input.type === 'optionGroupCheckbox') {
        return 'checkbox'
      } else if (input.type === 'optionGroupToggle') {
        return 'toggle'
      }

      return null
    },
    isMultiple (input) {
      return input.multiple || input.type === 'dateMultipleRange'
    },
    isRange (input) {
      return input.type === 'dateMultipleRange' || input.type === 'dateRange'
    },
    isTime (input) {
      return input.type === 'time'
    },
    change (event, inputIndex) {
      if (typeof event.target !== 'undefined' && typeof event.target.files !== 'undefined' && event.target.files[0]) {
        this.inputData[inputIndex].value = event.target.files[0]
      } else {
        this.inputData[inputIndex].value = event
      }

      // this.inputData.value = inputValue
      this.$emit('input', this.inputData)
    }
  }
}
</script>

<style scoped>

</style>
