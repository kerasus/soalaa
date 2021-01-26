import {Model} from 'js-abstract-model'
import {AlaaContentList} from "@/models/AlaaContent";

class AlaaSet extends Model {
    constructor(data) {
        super(data, [
            {
                key: 'baseRoute',
                default: '/alaa/api/v2/set'
            },
            {key: 'id'},
            {key: 'title'},
            {key: 'short_title'},
            {key: 'photo'},
            {key: 'author'},
            {key: 'contents_count'},
            {
                key: 'contents',
                relatedModel: AlaaContentList
            }
        ])
    }
}

export {AlaaSet}
