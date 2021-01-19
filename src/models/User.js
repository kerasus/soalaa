import {Model} from 'js-abstract-model'
import {Exam, ExamList} from "@/models/exam";
import Time from "@/plugins/time";
import Assistant from "@/plugins/assistant";
import {QuestCategoryList} from "@/models/QuestCategory";
import {QuestSubcategoryList} from "@/models/QuestSubcategory";
// import axios from "axios";

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
                key: 'mobile',
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
                key: 'user_exam_status',
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
        let status = null
        if (!exam.is_registered && !exam.accept_at && Time.getPassedTime(Time.addTime(exam.delay_time, 'minutes', true, exam.start_at), false) > 0) {
            status = 'not registered and registration time passed'
        }
        else if (exam.finished_at) {
            status = 'results recorded'
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

    getUserData () {
        let that = this
        return new Promise(function(resolve, reject) {
            that.show(null, '/alaa/api/v2/getUserFor3a')
                .then( (response) => {
                    that = new User(response.data.data)
                    resolve()
                })
                .catch( (error) => {
                    reject(error)
                })
        })
    }

    loadUserExams (exams, userExams) {
        exams.forEach( (examItem) => {
            let userExam = userExams.find( (userExamItem) => {
                return (userExamItem.exam_id === examItem.id)
            })
            examItem.is_registered = !!(userExam)
            examItem.finished_at = (userExam) ? userExam.finished_at : null
            examItem.accept_at = (userExam) ? userExam.accept_at : null
            examItem.user_exam_id = (userExam) ? userExam.id : null

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
                    that.exams.loading = false
                })
                .then(() => {
                    resolve(that.exams)
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

    getUsrExamByExamId (userExamId) {
        return this.exams.list.find( (item) => Assistant.getId(item.user_exam_id) === userExamId)
    }

    loadExamForParticipate (response, userExamForParticipate) {
        let user_exam_id = Assistant.getId(response.data.data.id)
        let exam_id = Assistant.getId(response.data.data.exam_id)
        let questions_file_url = response.data.data.questions_file_url
        let categories = response.data.data.categories
        let sub_categories = response.data.data.sub_categories
        let created_at = response.data.data.created_at


        userExamForParticipate.id = exam_id
        userExamForParticipate.user_exam_id = user_exam_id
        userExamForParticipate.created_at = created_at
        userExamForParticipate.questions_file_url = questions_file_url
        userExamForParticipate.categories = new QuestCategoryList(categories)
        userExamForParticipate.sub_categories = new QuestSubcategoryList(sub_categories)

        // this.exams.list.map( (item) => {
        //     if(Assistant.getId(item.id) === exam_id) {
        //         item.user_exam_id = user_exam_id
        //         item.questions_file_url = questions_file_url
        //         item.categories = new QuestCategoryList(categories)
        //         item.sub_categories = new QuestSubcategoryList(sub_categories)
        //     }
        //     return item
        // })
    }

    participateExam (exam_id) {
        let that = this
        return new Promise(function(resolve, reject) {
            that.create({
                exam_id
            }, '/3a/api/exam-user')
                .then((response) => {
                    let userExamForParticipate = new Exam()
                    // let userExamId = Assistant.getId(response.data.data.id)
                    that.loadExamForParticipate(response, userExamForParticipate)
                    // let userExam = that.getUsrExamByExamId(userExamId)
                    // if (!userExam) {
                    //     userExam = new Exam()
                    // }

                    userExamForParticipate.loadQuestionsFromFile()
                        .then( (data) => {
                            resolve({response, userExamForParticipate, data})
                        })
                        .catch( (error) => {
                            reject(error)
                        })
                })
                .catch( (error) => {
                    reject(error)
                })
        })
    }
}

export {User}
