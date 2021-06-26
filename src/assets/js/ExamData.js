import axios from "axios";
import API_ADDRESS from "@/api/Addresses";
import Assistant from "@/plugins/assistant";
import {Exam} from "@/models/Exam";
import {QuestionList} from "@/models/Question";

class ExamData {
    constructor() {
        this.commands = []
        this.questionsFileUrl = null
        this.exam = null
        this.studentReport = null
        this.userExamData = null
    }

    run() {
        let result = Promise.resolve();
        this.commands.forEach(function (promiseLike) {
            result = result.then(promiseLike);
        });
        return result;
    }

    loadQuestionsFromFile() {
        let that = this
        this.commands.push(() => new Promise((resolve, reject) => {
                if (!that.questionsFileUrl) {
                    Assistant.handleAxiosError('exam file url is not set')
                    return
                }
                axios.get(that.questionsFileUrl, {
                    transformRequest: (data, headers) => {
                        delete headers.common['Authorization'];
                        return data;
                    }
                })
                    .then(response => {
                        that.exam.questions = new QuestionList(response.data)
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            }),
        )
        return this
        // https://node3.alaatv.com/aaa/questionFiles/3a_1400_ensani_final_202104150852_withAnswer.json
    }

    getExamDataWithAnswers(user_exam_id, exam_id) {
        let that = this
        this.commands.push(() => new Promise((resolve, reject) => {
                axios.get(API_ADDRESS.exam.getAnswerOfUserWithCorrect(user_exam_id))
                    .then(response => {
                        that.exam = new Exam()
                        if (exam_id) {
                            that.exam.id = exam_id
                        }
                        that.exam.user_exam_id = Assistant.getId(user_exam_id)
                        that.exam.title = response.data.data.exam.title
                        that.exam.questions_file_url = response.data.data.exam.questions_file_url
                        that.questionsFileUrl = response.data.data.exam.questions_file_url
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            }),
        )
        return this
    }

    getExamReportForStudent(user_exam_id) {
        let that = this
        this.commands.push(() => new Promise((resolve, reject) => {
                axios.get(API_ADDRESS.exam.report.getReport(user_exam_id))
                    .then(response => {
                        that.studentReport = response.data.data
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            }),
        )
        return this
    }

    getUserExamData(user_exam_id) {
        let that = this
        this.commands.push(() => new Promise((resolve, reject) => {
                axios.get(API_ADDRESS.exam.getAllAnswerOfUser(user_exam_id))
                    .then(response => {
                        that.userExamData = response.data
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            }),
        )
        return this
    }
}

export default ExamData
