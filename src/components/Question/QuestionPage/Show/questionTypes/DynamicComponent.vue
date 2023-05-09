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
      // ToDo: must check this
      const gg = 'components/Question/QuestionPage/Create/textMode/questionTypes/' + this.component.componentName + '/' + this.component.componentName + '.vue'
      return defineAsyncComponent(() => import(gg))
    }
  },
  methods: {}
}
</script>
