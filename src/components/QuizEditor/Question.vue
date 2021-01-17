<template>
    <div :class="{ 'current-question': this.currentQuestion.id === source.id, question: true, ltr: source.ltr  }">
        <div class="buttons-group">
            <v-select :items="quizList.list" item-text="title" chips multiple attach outlined dense full-width v-if="false"/>
            <v-btn icon @click="removeQuestion()">
                <v-icon :size="24">mdi-close</v-icon>
            </v-btn>
            <v-btn icon :to="{ name: 'quest.edit', params: { id: source.id } }" >
                <v-icon :size="24">mdi-pencil</v-icon>
            </v-btn>
            <input :id="'question-id' + source.id" :value="source.id" type="text" class="not-visible" />
            <v-btn icon @click="copyIdToClipboard()">
                <v-icon>mdi-content-copy</v-icon>
            </v-btn>
        </div>
        <span class="question-body renderedPanel" :id="'question' + source.id" v-html="(getQuestionNumberFromId(source.id)) + '(' + getSubCategoryName + ')' + ' (' + source.order + ') - ' + source.rendered_statement" v-intersect="{
            handler: onIntersect,
            options: {
              threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0]
            }
          }" />
        <v-row class="choices">
            <v-col
                    v-for="(choice, index) in source.choices.list"
                    :key="choice.id"
                    v-html="(choiceNumber[index]) + choice.rendered_title"
                    :md="choiceClass(source)"
                    :class="{ choice: true, renderedPanel: true, active: choice.answer }"
            />
        </v-row>
    </div>
</template>

<script>
    import 'github-markdown-css/github-markdown.css'
    import '@/assets/scss/markdownKatex.scss'
    import { mixinQuiz, mixinWindowSize } from '@/mixin/Mixins'
    import $ from "jquery";

    var md = require('markdown-it')(),
        mk = require('markdown-it-katex')
    md.use(mk);

    export default {
        name: 'item',
        mixins: [mixinQuiz, mixinWindowSize],
        data() {
            return {
                choiceNumber: {
                    0: '1) ',
                    1: '2) ',
                    2: '3) ',
                    3: '4) '
                },
                sub__category: [
                    {id: 1, category_id: 1, title: "ادبیات", display_title: "ادبیات عمومی"},
                    {id: 2, category_id: 1, title: "عربی", display_title: "عربی عمومی"},
                    {id: 3, category_id: 1, title: "دین و زندگی", display_title: "دین و زندگی"},
                    {id: 4, category_id: 1, title: "زبان انگلیسی", display_title: "زبان انگلیسی"},
                    {id: 5, category_id: 2, title: "زمین شناسی", display_title: "زمین شناسی"},
                    {id: 6, category_id: 2, title: "زیست", display_title: "زیست"},
                    {id: 7, category_id: 2, title: "ریاضی", display_title: "ریاضی"},
                    {id: 8, category_id: 2, title: "فیزیک", display_title: "فیزیک"},
                    {id: 9, category_id: 2, title: "شیمی", display_title: "شیمی"},
                    {id: 10, category_id: 2, title: "حسابان", display_title: "حسابان"},
                    {id: 11, category_id: 2, title: "هندسه", display_title: "هندسه"},
                    {id: 12, category_id: 2, title: "گسسته", display_title: "گسسته"},
                    {id: 13, category_id: 2, title: "زبان و ادبیات فارسی", display_title: "زبان و ادبیات فارسی انسانی"},
                    {id: 14, category_id: 2, title: "عربی", display_title: "عربی انسانی"},
                    {id: 15, category_id: 2, title: "تاریخ", display_title: "تاریخ"},
                    {id: 16, category_id: 2, title: "جغرافیا", display_title: "جغرافیا"},
                    {id: 17, category_id: 2, title: "علوم اجتماعی", display_title: "علوم اجتماعی"},
                    {id: 18, category_id: 2, title: "فلسفه", display_title: "فلسفه"}
                ]
            }
        },
        props: {
            index: { // index of current source
                type: Number
            },
            source: { // here is: {uid: 'unique_1', text: 'abc'}
                default() {
                    return {}
                }
            },
            quizList: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        methods: {
            copyIdToClipboard() {
                const questionIdElement = document.querySelector('#question-id' + this.source.id)
                questionIdElement.select()
            },
            onIntersect(entries) {
                this.source.onIntersect(entries)
            },
            choiceClicked(questionId, choiceId) {
                this.changeQuestion(questionId)
                this.answerClicked({questionId, choiceId})
            },
            choiceClass(question) {
                // let QuestionWidthRatio = 0.4
                // let largestChoiceWidth = this.windowSize.x * QuestionWidthRatio / largestChoice
                let largestChoice = this.getLargestChoice(question.choices)
                let largestChoiceWidth = $('.questions').width() / largestChoice
                if (largestChoiceWidth > 48) {
                    return 3
                }
                if (largestChoiceWidth > 24) {
                    return 6
                }
                if (largestChoiceWidth > 12) {
                    return 12
                }
                return 12
            },
            removeErab(string) {
                if (!string || string.length === 0) {
                    return ''
                }

                let temp = string
                temp = temp.split('َ').join('')
                temp = temp.split('ُ').join('')
                temp = temp.split('ِ').join('')
                temp = temp.split('ّ').join('')
                temp = temp.split('ً').join('')
                temp = temp.split('ٌ').join('')
                temp = temp.split('ٍ').join('')
                return temp
            },
            getLargestChoice(choices) {
                let largestChoice = 0
                choices.list.forEach((source) => {
                    if (source.title.length > largestChoice) {
                        largestChoice = this.removeErab(source.title).length
                    }
                })
                return largestChoice
            },
            removeQuestion() {
                this.source.show(null, '/3a/api/exam-question/detach/' + this.source.id).then(() => {

                })
            },
            edit() {
                // console.log(questionId)
            }
        },
        created() {
            // setTimeout(() => {console.log(this.quiz)}, 2000)
        },
        computed: {
            // lesson() {
            //     console.log(this.source.sub_categories)
            //     if (!this.source.sub_categories) {
            //         return {title: 'صبر کنید'}
            //     }
            //     const subCategoryId = Assistant.getId(this.source.sub_category.id)
            //     console.log(this.quiz.sub_categories)
            //     return this.quiz.sub_categories.list.find((item) => item.id === subCategoryId)
            // }
            getSubCategoryName () {
                return this.sub__category.find((item) => item.id === this.source.sub_category.id).display_title
            },
        }
    }
</script>

<style scoped>
    .ltr.question {
        padding: 10px 20px 10px 20px;
    }

    .ltr {
        direction: ltr;
    }

    .ltr .choice {
        direction: ltr;
        text-align: left;
    }

    .ltr .buttons-group {
        float: right;
    }

    .not-visible {
        max-width: 1px;
        max-height: 1px;
    }

    .current-question {
        background-color: #fffaee;
    }

    .choices {
        display: flex;
        flex-direction: row;
    }

    .choice {
        cursor: pointer;
        transition: all ease-in-out 0.3s;
    }

    .buttons-group {
        float: left;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    .choice.active::before {
        content: "\F012C";
        display: inline-block;
        font: normal normal normal 24px/1 "Material Design Icons";
        text-rendering: auto;
        line-height: inherit;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin-left: 10px;
        color: #4caf50;
        font-size: 20px;
    }

    .choice:hover {
        background: #e1e1e1;
    }


    .question-body {
        margin-bottom: 20px;
        line-height: 40px;
    }

    .questions {
        background: #fff;
        overflow-y: auto;
        position: relative;
        /*padding-right: 25px;*/
        padding: 0;
    }

    .question {
        padding: 10px 30px 10px 0;
    }
</style>

<style>
    .quiz-editor .v-select__slot .v-select__selections input {
        display: none;
    }

    .quiz-editor .v-text-field__details {
        display: none;
    }

    .quiz-editor .v-select.v-select--chips.v-select--is-multi {
        min-width: 200px;
    }

    .ltr .choice p {
        margin-left: 5px;
        margin-right: 0;
    }
</style>
