<template>
  <div class="page-builder-col col"
       :class="className"
       :style="style">
    <template v-for="(widget, widgetIndex) in widgets"
              :key="widgetIndex">
      <q-intersection
        v-if="widget.options && widget.options.intersection"
        :transition="
          widget.options.intersection.transition
            ? widget.options.intersection.transition
            : 'flip-right'
        "
      >
        <page-builder-widget
          :widget="widget"
          :containerFullHeight="containerFullHeight"
          :get-data="getData"
        >
        </page-builder-widget>
      </q-intersection>
      <page-builder-widget
        v-else
        :widget="widget"
        :containerFullHeight="containerFullHeight"
        :get-data="getData"
      >
      </page-builder-widget>
    </template>
  </div>
</template>

<script>
import PageBuilderWidget from './PageBuilderWidget.vue'
import mixinWidget from './Widgets'

export default {
  name: 'PageBuilderCol',
  // components,
  mixins: [mixinWidget],
  components: {
    PageBuilderWidget
  },
  props: {
    widgets: {
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
    return {}
  },
  computed: {
    // colClasses() {
    //   return [
    //     (this.options.col) ? this.options.col : 'col',
    //     (this.options.alignmentSelf) ? this.options.alignmentSelf : '',
    //   ]
    // }
  }
}
</script>

<style scoped></style>
