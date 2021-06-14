import axios from "axios";
import API_ADDRESS from "@/api/Addresses";
import Assistant from "@/plugins/assistant";
import {Exam} from "@/models/Exam";
import {QuestionList} from "@/models/Question";
import {QuestCategoryList} from "@/models/QuestCategory";
import {QuestSubcategoryList} from "@/models/QuestSubcategory";

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
		// let reject = Promise.reject(new Error('fail'))
		this.commands.forEach(function (promiseLike) {
			result = result.then(promiseLike);
			result = result.catch(promiseLike);
		});
		return new Promise((resolve, reject) => {
			result.then(resolve)
			result.catch(reject)
		});
	}

	loadQuestionsFromFile() {
		let that = this
		this.commands.push(() => new Promise((resolve, reject) => {
				if (!that.questionsFileUrl && !that.exam)
				{
					Assistant.handleAxiosError('questionsFileUrl in loadQuestionsFromFile() is not set')
					reject('questionsFileUrl in loadQuestionsFromFile() is not set')
				}
				if (!that.questionsFileUrl)
				{
					that.questionsFileUrl = that.exam.questions_file_url
				}
				axios.get(that.questionsFileUrl, {
					transformRequest: (data, headers) => {
						delete headers.common['Authorization'];
						return data;
					}
				})
						 .then(response => {
							 console.log('loadQuestionsFromFile is done')
							 that.exam.questions = new QuestionList(response.data)
							 resolve(response.data)
						 })
						 .catch(error => {
							 console.log('loadQuestionsFromFile is catch')
							 reject(error)
						 })
			}),
		)
		return this
		// https://node3.alaatv.com/aaa/questionFiles/3a_1400_ensani_final_202104150852_withAnswer.json
	}

	getUserExamWithCorrectAnswers(user_exam_id, exam_id) {
		let that = this
		this.commands.push(() => new Promise((resolve, reject) => {
				if (!user_exam_id && !that.exam)
				{
					Assistant.handleAxiosError('user_exam_id in getUserExamWithCorrectAnswers() is not set')
					reject('user_exam_id in getUserExamWithCorrectAnswers() is not set')
				}
				if (!user_exam_id)
				{
					user_exam_id = that.exam.user_exam_id
				}
				axios.get(API_ADDRESS.exam.getAnswerOfUserWithCorrect(user_exam_id))
						 .then(response => {
							 that.exam = new Exam()
							 if (exam_id)
							 {
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

	getUserExamDataReport(user_exam_id) {
		let that = this
		this.commands.push(() => new Promise((resolve, reject) => {
				if (!user_exam_id && !that.exam)
				{
					Assistant.handleAxiosError('user_exam_id in getUserExamDataReport() is not set')
					reject('user_exam_id in getUserExamDataReport() is not set')
				}
				if (!user_exam_id)
				{
					user_exam_id = that.exam.user_exam_id
				}
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
				if (!user_exam_id && !that.exam)
				{
					Assistant.handleAxiosError('user_exam_id in getUserExamData() is not set')
					reject('user_exam_id in getUserExamData() is not set')
				}
				if (!user_exam_id)
				{
					user_exam_id = that.exam.user_exam_id
				}
				axios.get(API_ADDRESS.exam.getAllAnswerOfUser(user_exam_id))
						 .then(response => {
							 console.log('getUserExamData is done')
							 that.userExamData = response.data
							 resolve(response)
						 })
						 .catch(error => {
							 console.log('getUserExamData is catch')
							 reject(error)
						 })
			}),
		)
		return this
	}

	getExamDataAndParticipate(exam_id) {
		let that = this
		this.commands.push(() => new Promise((resolve, reject) => {
				if (!exam_id && !that.exam)
				{
					Assistant.handleAxiosError('exam_id in getExamDataAndParticipate() is not set')
					reject('exam_id in getExamDataAndParticipate() is not set')
				}
				if (!exam_id)
				{
					exam_id = that.exam.id
				}
				axios.post(API_ADDRESS.exam.examUser, {exam_id})
						 .then(response => {
							 console.log('getExamDataAndParticipate is done')
							 that.exam = new Exam()
							 // ToDo: attention on user_exam_id and exam_id
							 that.exam.id = Assistant.getId(response.data.data.exam_id)
							 that.exam.user_exam_id = Assistant.getId(response.data.data.id)
							 that.exam.created_at = response.data.data.created_at
							 that.exam.questions_file_url = response.data.data.questions_file_url
							 that.exam.categories = new QuestCategoryList(response.data.data.categories)
							 that.exam.sub_categories = new QuestSubcategoryList(response.data.data.sub_categories)
							 that.userExamData = response.data
							 resolve(response)
						 })
						 .catch(error => {
							 console.log('getExamDataAndParticipate is catch')
							 reject(error)
						 })
			}),
		)
		return this
	}
}

export default ExamData
