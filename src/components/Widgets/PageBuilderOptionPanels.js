import { defineAsyncComponent } from 'vue'

export default {
  FeatureBoxOptionPanel: defineAsyncComponent(() => import('src/components/Widgets/FeatureBox/OptionPanel.vue')),
  GoLoginOptionPanel: defineAsyncComponent(() => import('src/components/Widgets/GoLogin/OptionPanel.vue')),
  SliderOptionPanel: defineAsyncComponent(() => import('src/components/Widgets/Slider/OptionPanel.vue')),
  TabPanelOptionPanel: defineAsyncComponent(() => import('src/components/Widgets/TabPanel/OptionPanel.vue')),
  TextWidgetOptionPanel: defineAsyncComponent(() => import('src/components/Widgets/TextWidget/OptionPanel.vue'))
}
