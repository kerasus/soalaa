import { Model, Collection } from 'js-abstract-model'
import API_ADDRESS from "@/api/Addresses";
import {CommentList} from "@/models/Comment";

class Log extends Model {
    constructor (data) {
        super(data, [
            {
                key: 'baseRoute',
                default: API_ADDRESS.log.base
            },
            { key: 'id' },
            { key: 'title' },
            { key: 'description' },
            // {
            //     key: 'causer',
            //     relatedModel: User
            // },
            {
                key: 'causer',
                default: {
                    id: null,
                    full_name: null
                }
            },
            {
                key: 'subject',
                default: {
                    id: null,
                    type: null
                }
            },
            {
                key: 'comments',
                relatedModel: CommentList
            },
            { key: 'properties' },
            { key: 'created_at' },
            { key: 'updated_at' }
        ])
    }
}

class LogList extends Collection {
    model () {
        return Log
    }
}

export { Log, LogList }
