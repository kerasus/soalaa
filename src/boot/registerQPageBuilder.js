import { boot } from 'quasar/wrappers'
// import VuePlugin from 'quasar-ui-q-page-builder'
import widgetList from '../components/Widgets/widget.json'
import QPageBuilder from 'quasar-ui-q-page-builder/src/components/QPageBuilder.vue'
import PageBuilderComponents from '../components/Widgets/PageBuilderComponents.js'
import PageBuilderOptionPanels from '../components/Widgets/PageBuilderOptionPanels.js'

const widgets = []
function extractWidgets (json) {
  json.children.forEach(element => {
    if (element.type === 'widget') {
      widgets.push(element)
    } else {
      // eslint-disable-next-line no-prototype-builtins
      if (element.hasOwnProperty('children')) {
        extractWidgets(element)
      }
    }
  })
}
extractWidgets(widgetList)
export const widgetExpanded = widgets
export default boot(({ app }) => {
  app.config.globalProperties.$q.$QPageBuilderWidgetList = widgetExpanded

  app.config.globalProperties.$q.$pageBuilderWidgetComponents = PageBuilderComponents
  app.config.globalProperties.$q.$pageBuilderWidgetOptionPanels = PageBuilderOptionPanels
  // app.component('q-page-builder', VuePlugin.QPageBuilder)
  app.component('q-page-builder', QPageBuilder)
})
