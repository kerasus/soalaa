<template>
  <div
    :class="{
      boxed: defaultOptions.boxed,
      boxedInFullWidthStatus: boxedInFullWidthStatus
    }"
    :style="style"
  >
    <div class="page-builder-row row" :id="defaultOptions.id">
      <page-builder-col
        v-for="(col, colIndex) in cols"
        :key="colIndex"
        :widgets="col.widgets"
        :options="col.options"
        :containerFullHeight="containerFullHeight"
        :get-data="getData"
      />
    </div>
  </div>
</template>

<script>
import PageBuilderCol from './PageBuilderCol.vue'
import mixinWidget from './Widgets'

export default {
  name: 'PageBuilderRow',
  mixins: [mixinWidget],
  components: {
    PageBuilderCol
  },
  props: {
    cols: {
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
      deviceWidth: 1920,
      boxedInFullWidthStatus: false,
      defaultOptions: {
        height: 'auto',
        boxedWidth: 1200
      }
    }
  },
  created() {
    this.updateBoxedStyle()
    window.addEventListener('resize', () => {
      this.updateBoxedStyle()
    })
  },
  methods: {
    updateBoxedStyle() {
      this.deviceWidth = window.innerWidth
      if (!this.defaultOptions.boxed) {
        return
      }

      this.defaultOptions.style.maxWidth = this.defaultOptions.boxedWidth + 'px'
      this.defaultOptions.style.width = this.defaultOptions.boxedWidth + 'px'
      this.boxedInFullWidthStatus =
        this.deviceWidth <= this.defaultOptions.boxedWidth
    },
    onResize() {
      this.updateBoxedStyle()
    }
  }
}
</script>

<style lang="scss" scoped>
.boxed {
  max-width: 1200px;
  margin-right: auto;
  margin-left: auto;
  width: 1200px;
  &.boxedInFullWidthStatus {
    padding-right: 15px;
    padding-left: 15px;
    max-width: 100% !important;
    width: 100% !important;
  }
}
</style>
