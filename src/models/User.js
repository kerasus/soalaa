import {Model} from 'js-abstract-model'
import {ExamList} from "@/models/exam";
import Time from "@/plugins/time";


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
        console.log(exam.title, ' passed time since start: ', Time.getPassedTime(exam.start_at))
        console.log(exam.title, ' start at: ', exam.start_at)
        console.log('now: ', Time.now())
        // console.log(Time.addTime(exam.delay_time, 'minutes', true, exam.start_at), false) > 0 && Time.getPassedTime(Time.now())
        // console.log(Time.addTime(exam.delay_time, 'minutes', true, exam.start_at), false) > 0 && Time.getPassedTime(Time.now())
        let status = null
        if (!exam.is_registered && !exam.accept_at && Time.getPassedTime(Time.addTime(exam.delay_time, 'minutes', true, exam.start_at), false) > 0) {
            status = 'not registered and registration time passed'
        }
        else if (!exam.is_registered) {
            status = 'not registered'
        } else if (exam.is_registered && !exam.accept_at && Time.getRemainTime(Time.addTime(exam.delay_time, 'minutes', true, exam.start_at), false) > 0 && Time.getPassedTime(exam.start_at, false) > 0) {
            status = 'registered but did not participate'
        } else if (exam.is_registered && !exam.accept_at && Time.getRemainTime(exam.start_at, false) > 0) {
            status = 'registered but not reached participation time'
        }  else if (exam.is_registered && !exam.accept_at) {
            status = 'registered but participation time passed'
        } else if (exam.is_registered && exam.accept_at && Time.getRemainTime(exam.accept_at, false) > 0) {
            status = 'has participated but not finished'
        } else if (exam.is_registered && exam.accept_at && Time.getPassedTime(exam.accept_at, false) > 0) {
            status = 'has participated and finished'
        }

        exam.user_exam_status = status
    }

    loadUserExams (exams, userExams) {
        exams.forEach( (examItem) => {
            let userExam = userExams.find( (userExamItem) => {
                return (userExamItem.exam_id === examItem.id)
            })
            examItem.is_registered = !!(userExam)
            examItem.finished_at = (userExam) ? userExam.finished_at : null
            examItem.accept_at = (userExam) ? userExam.accept_at : null

            this.setUserExamStatus(examItem)

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
