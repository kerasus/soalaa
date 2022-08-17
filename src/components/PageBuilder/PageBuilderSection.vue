<template>
  <div
    class="page-builder-section"
    :class="className"
    :id="defaultOptions.id"
    :style="style"
  >
    <page-builder-row
      v-for="(row, rowIndex) in data.rows"
      :key="rowIndex"
      :cols="row.cols"
      :options="row.options"
      :containerFullHeight="containerFullHeight"
      :get-data="getData"
    />
  </div>
</template>

<script>
import PageBuilderRow from './PageBuilderRow.vue'
import mixinWidget from './Widgets'

export default {
  name: 'PageBuilderSection',
  mixins: [mixinWidget],
  components: {
    PageBuilderRow
  },
  props: {
    data: {
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
  data() {
    return {
      defaultBackground: null,
      defaultOptions: {
        background: [],
        style: {}
      }
    }
  },
  created() {
    this.setFullHeight()
  },
  computed: {
    windowSize() {
      return this.$store.getters['AppLayout/windowSize']
    },
    windowWidth() {
      return this.windowSize.x
    },
    windowHeight() {
      return this.windowSize.y
    }
  },
  watch: {
    windowWidth() {
      this.setFullHeight()
    },
    windowHeight() {
      this.setFullHeight()
    }
  },
  methods: {
    setFullHeight() {
      if (!this.defaultOptions.fullHeight) return
      this.defaultOptions.style.minHeight += this.containerFullHeight
    }
  }
}
</script>

<style scoped lang="scss">
.page-builder-section {
  &.full-height-section {
    //min-height: calc(100vh - 86px);
  }
  &.vertical-align-center {
    display: flex;
    flex-flow: column;
    justify-content: center;
  }
  //.row {
  //  width: 100%;
  //}
  //display: flex;
  //flex-flow: column;
  /*justify-content: center;*/
  //align-items: center;
}
</style>
