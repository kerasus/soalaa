import { Model, Collection } from 'js-abstract-model'
import {QuestionList} from './Question';
import {QuestCategoryList} from "@/models/QuestCategory";
import {QuestSubcategoryList} from '@/models/QuestSubcategory';

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

    setUserAnswers (userAnswers) {
        this.questions.list.map((question)=> {
            let userAnswer = userAnswers.find((answer)=> answer.questionId === question.id)
            if (userAnswer) {
                question.uncheckChoices()
                question.choiceClicked(userAnswer.choicesId)
            }
        })
    }

    getUserAnswers () {
        let selectedQuestions = this.questions.list.filter((item) => item.choices.getSelected())
        selectedQuestions.map((question, index, questionsList) => {
            let answeredChoice = question.getAnsweredChoice()
            let answeredChoiceId = null
            if (answeredChoice) {
                answeredChoiceId = answeredChoice.id
            }

            questionsList[index] = {
                questionId: question.id,
                choicesId: answeredChoiceId
            }
        });

        return selectedQuestions
    }
}

class QuizList extends Collection {
    model () {
        return Quiz
    }
}

export { Quiz, QuizList }
