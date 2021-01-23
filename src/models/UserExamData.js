import {Collection, Model} from 'js-abstract-model'
import {QuestCategoryList} from "@/models/QuestCategory";
import {QuestSubcategoryList} from "@/models/QuestSubcategory";

class UserExamData extends Model {
    constructor(data) {
        super(data, [
            {key: 'exam_id'},
            {
                key: 'questions',
                default: {}
            },
            {
                key: 'categories',
                relatedModel: QuestCategoryList
            },
            {
                key: 'sub_categories',
                relatedModel: QuestSubcategoryList
            }
        ])
    }

    loadSubcategoriesOfCategories() {
        const subcategoryList = this.sub_categories
        this.categories.list.map((item) => {
            item.getSubcategories(subcategoryList)
        })
    }
}

class UserExamDataList extends Collection {
    model() {
        return UserExamData
    }
}

export {UserExamData, UserExamDataList}
