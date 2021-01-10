import { Model, Collection } from 'js-abstract-model'
import {QuestionList} from './Question';
import {QuestCategoryList} from "@/models/QuestCategory";
import {QuestSubcategoryList} from '@/models/QuestSubcategory';
import { CheckingTimeList } from "@/models/CheckingTime";

class Quiz extends Model {
    constructor (data) {
        super(data, [
            { key: 'id' },
            { key: 'title' },
            { key: 'order' },
            { key: 'start_at' },
            { key: 'finish_at' },
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
        ])

        this.questions.sortByOrder()
    }

    loadSubcategoriesOfCategories() {
        const subcategoryList = this.sub_categories
        this.categories.list.map((item) => {
            item.getSubcategories(subcategoryList)
        })
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

    getUserQuizData () {
        let questionsHasDataFiltered = this.questions.list.filter(
            (item) => {
                const selected = item.choices.getSelected()
                const bookmarked = item.bookmarked
                const state = item.state
                const checkingTimesLength = item.checking_times.list.length

                return (selected || bookmarked || state || checkingTimesLength)
            }
        )

        let questionsHasData = [];

        questionsHasDataFiltered.forEach((question) => {
            let answeredChoice = question.getAnsweredChoice()
            let answeredChoiceId = null
            if (answeredChoice) {
                answeredChoiceId = answeredChoice.id
            }
            let checkingTimes = []
            question.checking_times.list.forEach((checkingTime)=> {
                checkingTimes.push({
                    start: checkingTime.start,
                    end: checkingTime.end
                })
            })

            questionsHasData.push({
                questionId: question.id,
                checking_times: checkingTimes,
                bookmarked: question.bookmarked,
                state: question.state,
                choicesId: answeredChoiceId
            })
        });

        return questionsHasData
    }

    // getCategoryFromSubCategory (subCategoryId) {
    //     const categoryId = this.sub_categories.list.find((item) => { item.id })
    // }
}

class QuizList extends Collection {
    model () {
        return Quiz
    }
}

export { Quiz, QuizList }
