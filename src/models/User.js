import {Model} from 'js-abstract-model'
import {Exam, ExamList} from "@/models/Exam";
import Time from "@/plugins/time";
import Assistant from "@/plugins/assistant";
import {QuestCategoryList} from "@/models/QuestCategory";
import {QuestSubcategoryList} from "@/models/QuestSubcategory";
import axios from "axios";
import API_ADDRESS from "@/api/Addresses";

class User extends Model {
    constructor(data) {
        super(data, [
            {
                key: 'baseRoute',
                default: API_ADDRESS.user.base
            },
            { key: 'id' },
            { key: 'first_name' },
            { key: 'last_name' },
            { key: 'mobile' },
            { key: 'ostan_id' },
            { key: 'shahr_id' },
            { key: 'address' },
            { key: 'postal_code' },
            { key: 'email' },
            { key: 'school' },
            { key: 'user_exam_status' },
            { key: 'photo' },
            { key: 'token' },
            { key: 'has_admin_permission' },

            { key: 'mobile_verified_at' },
            { key: 'wallet_balance' },
            { key: 'profile_completion' },

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
                key: 'updateType',
                default: 'profile'
            }

        ])
    }

    getCompletionInfoKeys () {
        return [
            'first_name',
            'last_name',
            'major',
            'province',
            'city',
            'school',
            'mobile_verified_at',
            'grade'
        ]
    }

    checkInformationCompletionKey (key) {
        return (
            (this[key] !== null && typeof this[key] === 'object' && typeof this[key].id !== 'undefined' && this[key].id !== null) ||
            (this[key]  && typeof this[key].id === 'undefined')
        )
    }

    percentageOfInformationCompletion () {
        let percentage = 0,
            completionInfoKeys = this.getCompletionInfoKeys(),
            percentageStep = (100 / completionInfoKeys.length)

        completionInfoKeys.forEach(item => {
            if (this.checkInformationCompletionKey(item)) {
                percentage += percentageStep
            }
        })

        return percentage
    }

    needToCompleteInfo () {
        return false
        // let completionInfoKeys = this.getCompletionInfoKeys()
        // let status = false
        // try {
        //     completionInfoKeys.forEach(item => {
        //         if (!this.checkInformationCompletionKey(item)) {
        //             throw 'needToCompleteInfo'
        //         }
        //     })
        // } catch (e) {
        //     status = true
        // }
        //
        // return status
        // if (!this.first_name) {
        //     status = true
        // } else if (!this.last_name) {
        //     status = true
        // } else if (!this.major || !this.major.id) {
        //     status = true
        // } else if (!this.province) {
        //     status = true
        // } else if (!this.city) {
        //     status = true
        // } else if (!this.school) {
        //     status = true
        // } else if (!this.mobile_verified_at) {
        //     status = true
        // } else if (!this.grade) {
        //     status = true
        // }
        //
        // return status
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
            that.show(null, API_ADDRESS.user.show_user)
                .then( (response) => {
                    that = new User(response.data.data)
                    resolve(that)
                })
                .catch( (error) => {
                    Assistant.reportErrors({location: 'models/User.js -> getUserData()'})
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
            that.exams.fetch(null, API_ADDRESS.exam.userExamsList)
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
                    Assistant.reportErrors({location: 'models/User.js -> getUserExams()'})
                    reject(error)
                })
        })
    }

    registerExam (exam_id) {
        let that = this
        return new Promise(function(resolve, reject) {
            that.create({
                exam_id
            }, API_ADDRESS.exam.registerExam)
                .then((response) => {
                    resolve(response)
                })
                .catch( (error) => {
                    Assistant.reportErrors({location: 'models/User.js -> registerExam()'})
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
    }

    loadExamForShowResult (response, user_exam_id, userExamForParticipate) {

        const questions_file_url = response.data.data.exam.questions_file_url
        const examTitle = response.data.data.exam.title

        // let exam_id = Assistant.getId(response.data.data.exam_id)
        // let categories = response.data.data.categories
        // let sub_categories = response.data.data.sub_categories
        // let created_at = response.data.data.created_at

        // userExamForParticipate.id = exam_id
        // userExamForParticipate.created_at = created_at
        // userExamForParticipate.categories = new QuestCategoryList(categories)
        // userExamForParticipate.sub_categories = new QuestSubcategoryList(sub_categories)

        userExamForParticipate.user_exam_id = Assistant.getId(user_exam_id)
        userExamForParticipate.title = examTitle
        userExamForParticipate.questions_file_url = questions_file_url
    }

    loadExamDataFroParticipate (exam_id) {
        let that = this
        return new Promise(function(resolve, reject) {
            that.create({
                exam_id
            }, API_ADDRESS.exam.examUser)
                .then((response) => {
                    let userExamForParticipate = new Exam()
                    that.loadExamForParticipate(response, userExamForParticipate)
                    userExamForParticipate.loadQuestionsFromFile()
                        .then( (data) => {
                            resolve({response, userExamForParticipate, data})
                        })
                        .catch( (error) => {
                            Assistant.reportErrors({location: 'models/User.js -> participateExam() -> exam-user.create.catch'})
                            reject(error)
                        })
                })
                .catch( (error) => {
                    Assistant.reportErrors({location: 'models/User.js -> participateExam() -> exam-user.create.catch'})
                    reject(error)
                })
        })
    }

    loadExamDataForShowResult (user_exam_id) {
        let that = this
        return new Promise(function(resolve, reject) {
            axios.get(API_ADDRESS.exam.getAnswerOfUserWithCorrect(user_exam_id))
                .then((response) => {
                    let userExamForParticipate = new Exam()
                    that.loadExamForShowResult(response, user_exam_id, userExamForParticipate)
                    userExamForParticipate.loadQuestionsFromFile()
                        .then( (data) => {
                            resolve({response, userExamForParticipate, data})
                        })
                        .catch( (error) => {
                            Assistant.reportErrors({location: 'models/User.js -> participateExam() -> exam-user.create.catch'})
                            reject(error)
                        })
                })
                .catch( (error) => {
                    Assistant.reportErrors({location: 'models/User.js -> participateExam() -> exam-user.create.catch'})
                    reject(error)
                })
        })
    }
}

export {User}
