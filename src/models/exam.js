import {Model, Collection} from 'js-abstract-model'
import {QuestionList} from "@/models/Question";
import {QuestCategoryList} from "@/models/QuestCategory";
import {QuestSubcategoryList} from "@/models/QuestSubcategory";
import $ from 'jquery'
import {CheckingTimeList} from "@/models/CheckingTime";

class Exam extends Model {
    constructor(data) {
        super(data, [
            {
                key: 'baseRoute',
                default: '/3a/api/exam'
            },
            { key: 'id' },
            { key: 'title' },
            { key: 'photo' },
            { key: 'price' },
            { key: 'order' },
            { key: 'delay_time' },
            { key: 'holding_status' },
            { key: 'user_exam_id' },
            { key: 'user_exam_status' },
            { key: 'questions_file_url' },
            { key: 'total_question_number' },

            {
                key: 'questions',
                relatedModel: QuestionList
            },
            {
                key: 'categories',
                relatedModel: QuestCategoryList
            },
            {
                key: 'sub_categories',
                relatedModel: QuestSubcategoryList
            },

            { key: 'start_at' },
            { key: 'finish_at' },
            { key: 'accept_at' },
            { key: 'finished_at' },
            { key: 'is_registered' }
        ])

        this.questions.sortByOrder()
        this.categories.sortByKey('end_at', 'asc')
        this.setQuestionsLtr()
    }

    loadQuestionsFromFile () {
        let that = this
        return new Promise(function(resolve, reject) {
            $.ajax({
                    type: 'GET',
                    url: that.questions_file_url,
                    accept: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        console.log('response.data', data)
                        that.questions = new QuestionList(data)
                        resolve(data)
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        reject({jqXHR, textStatus, errorThrown})
                    }
                }
            );
        })
        // https://cdn.alaatv.com/upload/3a_ensani_202101131630.json
    }

    setQuestionsLtr () {
        // const englishRegex = /^[A-Za-z0-9 :"'ʹ.<>%$&@!+()\-/\n,…?ᵒ*~]*$/
        const englishRegex = /^[A-Za-z0-9 :"'ʹ.<>%$&@!+()\-/\n,…?ᵒ*~]*$/
        this.questions.list.forEach((question) => {
            question.ltr = !!question.statement.match(englishRegex);
        })
    }

    loadSubcategoriesOfCategories() {
        const subcategoryList = this.sub_categories
        this.categories.list.map((item) => {
            item.getSubcategories(subcategoryList)
        })
    }

    getQuestionsHasData () {
        return this.questions.list.filter(
            (item) => {
                const selected = item.choices.getSelected()
                const bookmarked = item.bookmarked
                const state = item.state
                const checkingTimesLength = item.checking_times.list.length

                return (selected || bookmarked || state || checkingTimesLength)
            }
        )
    }

    setUserQuizData (userData) {
        if (!userData) {
            return
        }
        this.questions.list.map((question)=> {
            let userQuestionData = userData.find((questionData)=> questionData.questionId === question.id)
            if (userQuestionData) {
                // load choice
                question.uncheckChoices()
                question.selectChoice(userQuestionData.choicesId)

                question.checking_times = new CheckingTimeList(userQuestionData.checking_times.list)
                question.bookmarked = userQuestionData.bookmarked
                question.state = userQuestionData.state
            }
        })
    }

    mergeUserQuizData (userQuizData) {
        let questionsHasData = this.getQuestionsHasData()
        questionsHasData.forEach((question) => {
            if (!userQuizData.examData) {
                userQuizData.examData = []
                this.addUserQuestionData(question, userQuizData.examData)
            } else {
                let userQuestionData = userQuizData.examData.find((questionData)=> questionData.questionId === question.id)
                if (!userQuestionData) {
                    this.addUserQuestionData(question, userQuizData.examData)
                } else {
                    this.loadUserQuestionData(question, userQuestionData)
                }
            }
        });
        return userQuizData
    }

    addUserQuestionDataCheckingTimes (question, checkingTimes) {
        if (!checkingTimes) {
            return
        }

        question.checking_times.list.forEach((checkingTime)=> {
            const oldCheckingTimeIndex = checkingTimes.findIndex((item) => item.start === checkingTime.start && item.end === null && checkingTime.end !== null)
            if (oldCheckingTimeIndex !== -1) {
                checkingTimes.splice(oldCheckingTimeIndex, 1)
            }
            checkingTimes.push({
                start: checkingTime.start,
                end: checkingTime.end
            })
        })
    }

    loadCheckingTimesFromUserData (question, userQuizData) {
        const userQuestionData = userQuizData.find((questionData) => questionData.questionId === question.id)
        if (userQuestionData) {
            question.checking_times = new CheckingTimeList(userQuestionData.checking_times)
        }
    }

    loadUserQuestionData (question, userQuestionData) {
        let answeredChoice = question.getAnsweredChoice()
        userQuestionData.choicesId = null
        if (answeredChoice) {
            userQuestionData.choicesId = answeredChoice.id
        }

        this.addUserQuestionDataCheckingTimes (question, userQuestionData.checking_times)

        userQuestionData.bookmarked = question.bookmarked
        userQuestionData.state = question.state
    }

    addUserQuestionData (question, userQuizData) {
        let answeredChoice = question.getAnsweredChoice()
        let answeredChoiceId = null
        let answered_at = null
        if (answeredChoice) {
            answeredChoiceId = answeredChoice.id
            answered_at = answeredChoice.answered_at
        }
        let checkingTimes = []
        this.addUserQuestionDataCheckingTimes (question, checkingTimes)

        userQuizData.push({
            questionId: question.id,
            checking_times: checkingTimes,
            bookmarked: question.bookmarked,
            state: question.state,
            choicesId: answeredChoiceId,
            answered_at
        })
    }

}

class ExamList extends Collection {
    model() {
        return Exam
    }
}

export {Exam, ExamList}
