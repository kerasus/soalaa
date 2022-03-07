<template>
  <component :is="comp"></component>
</template>
<script>
import { defineAsyncComponent } from 'vue'
export default {
  name: 'DynamicComponent',
  props: {
    component: {
      type: Object
    }
  },
  data () {
    return {}
  },
  computed: {
    comp () {
      return defineAsyncComponent(() => import(`components/Question/QuestionPage/Create/textMode/questionTypes/${this.component.componentName}.vue`))
    }
  }
}
</script>
