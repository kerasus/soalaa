<template>
  <component
    :is="comp"
    v-bind="allProps"
  ></component>
</template>
<script>
/* eslint-disable no-var */
import { defineAsyncComponent } from 'vue'
export default {
  name: 'DynamicComponent',
  props: {
    component: {
      type: Object
    },
    allProps: {
      type: Object
    }
  },
  data () {
    return {
      allPropsNeeded: {}
    }
  },
  mounted () {},
  computed: {
    comp () {
      return defineAsyncComponent(() => import(`components/Question/QuestionPage/Create/textMode/questionTypes/${this.component.componentName}/${this.component.componentName}.vue`))
    }
  },
  methods: {}
}
</script>
