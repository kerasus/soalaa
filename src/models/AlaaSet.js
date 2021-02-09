import {Model} from 'js-abstract-model'
import {AlaaContentList} from "@/models/AlaaContent";
import API_ADDRESS from "@/api/Addresses";

class AlaaSet extends Model {
    constructor(data) {
        super(data, [
            {
                key: 'baseRoute',
                default: API_ADDRESS.set.base
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
