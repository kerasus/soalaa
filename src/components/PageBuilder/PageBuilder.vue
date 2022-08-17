<template>
  <div class="page-builder" :class="className" :style="style">
    <page-builder-section
      v-for="(section, sectionIndex) in sections"
      :key="sectionIndex"
      :data="section.data"
      :options="section.options"
      :containerFullHeight="containerFullHeight"
      :get-data="getData"
    />
  </div>
</template>

<script>
import PageBuilderSection from 'src/components/PageBuilder/PageBuilderSection.vue'
import mixinWidget from './Widgets'
import GetWidgetsData from 'assets/js/GetWidgetsData'

export default {
  name: 'PageBuilder',
  mixins: [mixinWidget],
  components: {
    PageBuilderSection
  },
  props: {
    sections: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  created() {
    this.defaultOptions = Object.assign(this.defaultOptions, this.options)
  },

  methods: {
    getData(url) {
      return GetWidgetsData.getData(url)
    }
  }
}
</script>

<style scoped></style>
