import { boot } from 'quasar/wrappers'
// import VuePlugin from 'quasar-ui-q-page-builder'
import QPageBuilder from 'quasar-ui-q-page-builder/src/components/QPageBuilder.vue'
import widgetList from '../components/Widgets/widget.json'

const widgets = []
function extractWidgets(json) {
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
  // app.use(VuePlugin)
  app.config.globalProperties.$q.$QPageBuilderWidgetList = widgetExpanded
  // app.component('q-page-builder', VuePlugin.QPageBuilder)
  app.component('q-page-builder', QPageBuilder)
})
