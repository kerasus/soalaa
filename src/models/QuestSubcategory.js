import { Model, Collection } from 'js-abstract-model'
import {QuestionList} from "@/models/Question";

class QuestSubcategory extends Model {
    constructor (data) {
        super(data, [
            { key: 'id' },
            { key: 'title' },
            { key: 'order' },
            { key: 'category_id' },
            {
                key: 'questions',
                relatedModel: QuestionList
            },
        ])
    }
}

class QuestSubcategoryList extends Collection {
    model () {
        return QuestSubcategory
    }
}

export { QuestSubcategory, QuestSubcategoryList }
