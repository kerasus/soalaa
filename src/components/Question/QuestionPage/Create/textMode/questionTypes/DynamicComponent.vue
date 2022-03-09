<template>
  <component
    :is="comp"
    v-bind="allPropsNeeded"
  ></component>
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
    return {
      allPropsNeeded: {}
    }
  },
  computed: {
    comp () {
      return defineAsyncComponent(() => import(`components/Question/QuestionPage/Create/textMode/questionTypes/${this.component.componentName}/${this.component.componentName}.vue`))
    }
  }
}
</script>
