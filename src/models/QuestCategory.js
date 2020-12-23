import { Model, Collection } from 'js-abstract-model'

class QuestCategory extends Model {
    constructor (data) {
        super(data, [
            { key: 'id' },
            { key: 'title' },
            { key: 'order' }
        ])
    }
}

class QuestCategoryList extends Collection {
    model () {
        return QuestCategory
    }
}

export { QuestCategory, QuestCategoryList }
