import {Model} from 'js-abstract-model'


class User extends Model {
    constructor(data) {
        super(data, [
            {
                key: 'baseRoute',
                default: '/api/v2/user'
            },
            {
                key: 'id',
            },
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
            },
            {
                key: 'token'
            },
            {
                key: 'has_admin_permission'
            }

        ])

    }
}

export {User}
