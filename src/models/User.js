import {Model} from 'js-abstract-model'


class User extends Model {
    constructor(data) {
        super(data, [
            {
                key: 'first_name',
            },
            {
                key: 'last_name',
            },
            {
                key: 'province',
            },
            {
                key: 'city',
            },
            {
                key: 'school',
            },
            {
                key: 'gender',
                default:{ id: null}
            },
            {
                key: 'major',
                default:{ id: null}
            },
            {
                key: 'grade',
                default:{ id: null}
            },
            {
                key: 'photo'
            }

        ])

    }
}

export {User}
