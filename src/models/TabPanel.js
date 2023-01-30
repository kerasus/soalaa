import { Model, Collection } from 'js-abstract-model'

class TabPanel extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' },
      { key: 'value' },
      { key: 'image' },
      { key: 'editor' },
      { key: 'button' },
      { key: 'icon' },
      { key: 'icon2' }
    ])
  }
}
class TabPanelList extends Collection {
  model () {
    return TabPanel
  }
}
export { TabPanel, TabPanelList }
