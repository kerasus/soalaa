import {Collection, Model} from 'js-abstract-model'
import API_ADDRESS from "@/api/Addresses";

class AlaaContent extends Model {
    constructor(data) {
        super(data, [
            {
                key: 'baseRoute',
                default: API_ADDRESS.content.base
            },
            {key: 'id'},
            {key: 'type'},
            {key: 'title'},
            {key: 'duration'},
            {key: 'photo'},
            {key: 'order'},
            {key: 'url'}
        ])
    }
}

class AlaaContentList extends Collection {
    model () {
        return AlaaContent
    }

    getVideos () {
        return this.list.filter( (item) => parseInt(item.type) === 8)
    }
}

export {AlaaContent, AlaaContentList}
