<template>
  <component
    :is="widget.name"
    :data="widget.data"
    :options="widget.options"
    :containerFullHeight="containerFullHeight"
    :get-data="getData"
  />
</template>

<script>
import { defineAsyncComponent } from 'vue'
import mixinWidget from './Widgets'
const requireContext = require.context(
  'components/Widgets/',
  true,
  /\.vue$/i,
  'lazy'
)
const componentsData = requireContext
  .keys()
  .map((file) => {
    let path = file
    const crush = file.split('/')
    // first element is always a dot so remove it.
    crush.shift()
    // removing the dot and name of component, so remain will be the path of component.
    // used for registering dynamically.
    path = path.replace('.', '')
    path = path.replace(crush[crush.length - 1], '')
    // removing vue from the name of component.
    crush[crush.length - 1] = crush[crush.length - 1].replace(
      /(^.\/)|(\.vue$)/g,
      ''
    )
    return {
      name: crush[crush.length - 1],
      path,
      depth: crush.length - 1,
      lastFolderName: crush[crush.length - 2]
    }
  })
  // eslint-disable-next-line array-callback-return
  .filter((c) => {
    // due to standard of making widgets, only files with same name to folder will rendered.
    // others assume to dependencies which main file will handle.
    if (c.name === c.lastFolderName) {
      return c
    }
  })

// generating define async imports
const components = {}
componentsData.forEach((component) => {
  components[component.name] = defineAsyncComponent(() => {
    return import(
      'components/Widgets' + component.path + component.name + '.vue'
    )
  })
})

components.PageBuilderSection = defineAsyncComponent(() =>
  import('./PageBuilderSection.vue')
)
export default {
  name: 'PageBuilderWidget',

  components,

  props: {
    widget: {
      type: Object,
      default: () => {
        return {}
      }
    },
    getData: {
      type: Function,
      default: () => {}
    }
  },
  mixins: [mixinWidget],
  created() {},
  data() {
    return {}
  }
}
</script>

<style scoped></style>
