import { defineAsyncComponent } from 'vue'

export default {
  ActionButtonOptionPanel: defineAsyncComponent(() => import('src/components/Widgets/ActionButton/OptionPanel.vue')),
  ComparisonTableOptionPanel: defineAsyncComponent(() => import('src/components/Widgets/ComparisonTable/OptionPanel.vue')),
  ExpansionPanelOptionPanel: defineAsyncComponent(() => import('src/components/Widgets/ExpansionPanel/OptionPanel.vue')),
  FeatureBoxOptionPanel: defineAsyncComponent(() => import('src/components/Widgets/FeatureBox/OptionPanel.vue')),
  GoLoginOptionPanel: defineAsyncComponent(() => import('src/components/Widgets/GoLogin/OptionPanel.vue')),
  HeaderMenuOptionPanel: defineAsyncComponent(() => import('src/components/Widgets/HeaderMenu/OptionPanel.vue')),
  ImageWidgetOptionPanel: defineAsyncComponent(() => import('src/components/Widgets/ImageWidget/OptionPanel.vue')),
  PersonSliderOptionPanel: defineAsyncComponent(() => import('src/components/Widgets/PersonSlider/OptionPanel.vue')),
  ProductItemOptionPanel: defineAsyncComponent(() => import('src/components/Widgets/Product/ProductItem/OptionPanel.vue')),
  ProductsTabPanelOptionPanel: defineAsyncComponent(() => import('src/components/Widgets/Product/ProductsTabPanel/OptionPanel.vue')),
  SliderOptionPanel: defineAsyncComponent(() => import('src/components/Widgets/Slider/OptionPanel.vue')),
  TabPanelOptionPanel: defineAsyncComponent(() => import('src/components/Widgets/TabPanel/OptionPanel.vue')),
  TextWidgetOptionPanel: defineAsyncComponent(() => import('src/components/Widgets/TextWidget/OptionPanel.vue')),
  VideoPlayerWidgetOptionPanel: defineAsyncComponent(() => import('src/components/Widgets/VideoPlayerWidget/OptionPanel.vue'))
}
