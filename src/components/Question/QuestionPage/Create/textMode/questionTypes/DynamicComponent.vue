<template>
  <component :is="comp"></component>
</template>
<script>
import { defineAsyncComponent } from 'vue'
export default {
  name: 'DynamicComponent',
  props: {
    component1: {
      type: Object
    }
  },
  data () {
    return {}
  },
  computed: {
    comp () {
      console.log('comp')
      return defineAsyncComponent(() => import(`components/Question/QuestionPage/Create/textMode/questionTypes/${this.component1.componentName}.vue`))
    }
  },
  watch: {
    component1 (newVal, oldVal) {
      // console.log('Prop changed')
    }
  }
}
</script>
