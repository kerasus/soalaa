import { Model, Collection } from 'js-abstract-model'
import API_ADDRESS from "@/api/Addresses";

class QuestionStatus extends Model {
    constructor (data) {
        super(data, [
            {
                key: 'baseRoute',
                default: API_ADDRESS.questionSubcategory.base
            },
            { key: 'id' },
            { key: 'title' },
            { key: 'display_title' }
        ])
    }
}

class QuestionStatusList extends Collection {
    model () {
        return QuestionStatus
    }
}

export { QuestionStatus, QuestionStatusList }
