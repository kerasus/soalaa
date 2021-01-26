import {Collection, Model} from 'js-abstract-model'

class AlaaContent extends Model {
    constructor(data) {
        super(data, [
            {
                key: 'baseRoute',
                default: '/alaa/api/v2/content'
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
