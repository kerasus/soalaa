import { Model, Collection } from 'js-abstract-model'
import {QuestionList} from '@/models/Question'
import API_ADDRESS from "@/api/Addresses";

class QuestSubcategory extends Model {
    constructor (data) {
        super(data, [
            {
                key: 'baseRoute',
                default: API_ADDRESS.questionSubcategory.base
            },
            { key: 'id' },
            { key: 'title' },
            { key: 'display_title' }, // for admin
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
