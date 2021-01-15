import {Model} from 'js-abstract-model'
import {ExamList} from "@/models/exam";


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
                key: 'exams',
                relatedModel: ExamList
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

    setUserExamStatus (exam) {
        if (!exam.is_registered) {
            return 'not registered'
        } else if (exam.is_registered && !exam.accept_at) {
            return 'not registered'
        }
    }

    loadUserExams (exams, userExams) {
        exams.forEach( (examItem) => {
            let userExam = userExams.find( (userExamItem) => {
                return (userExamItem.exam_id === examItem.id)
            })

            examItem.is_registered = !!(userExam)
            examItem.finished_at = (userExam) ? userExam.finished_at : null
            examItem.accept_at = (userExam) ? userExam.accept_at : null

            return examItem
        })

        this.exams = new ExamList(exams)
    }

    getUserExams () {
        let that = this
        return new Promise(function(resolve, reject) {
            that.exams.fetch(null, '/3a/api/examAndUser')
                .then((response) => {
                    let exams = response.data.data.exams
                    let userExams = response.data.data.user_exams
                    that.loadUserExams(exams, userExams)
                })
                .then((response) => {
                    resolve(response)
                })
                .catch( (error) => {
                    reject(error)
                })
        })
    }

    registerExam (exam_id) {
        let that = this
        return new Promise(function(resolve, reject) {
            that.create({
                exam_id
            }, '/3a/api/user/registerExam')
                .then((response) => {
                    resolve(response)
                })
                .catch( (error) => {
                    reject(error)
                })
        })
    }
}

export {User}
