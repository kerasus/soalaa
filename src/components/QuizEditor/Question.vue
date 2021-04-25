<template>
    <div :class="{ 'current-question': this.currentQuestion.id === source.id, question: true, ltr: isLtr  }">
        <div class="buttons-group">
            <v-select :items="quizList.list" item-text="title" chips multiple attach outlined dense full-width
                      v-if="false"/>
            <v-btn icon color="red" @click="deleteQuestion()">
                <v-icon :size="24">mdi-close</v-icon>
            </v-btn>
            <v-btn icon @click="detachQuestion()">
                <v-icon :size="24">mdi-close</v-icon>
            </v-btn>
            <v-btn icon :to="{ name: 'quest.edit', params: { id: source.id } }">
                <v-icon :size="24">mdi-pencil</v-icon>
            </v-btn>
            <input :id="'question-id' + source.id" :ref="'question-id-' + source.id" :value="source.id" type="text"
                   class="not-visible"/>
            <v-btn icon @click="copyIdToClipboard(source.id)">
                <v-icon>mdi-content-copy</v-icon>
            </v-btn>
            <v-switch
                    @change="confirmQuestion"
                    v-model="source.confirmed"
                    color="success"
                    hide-details
            ></v-switch>
        </div>
        <span class="question-body renderedPanel"
              :class="{ ltr: isLtr }"
              :id="'question' + source.id"
              v-html="(getQuestionNumberFromId(source.id)) + '(' + getSubCategoryName + ')' + ' (' + source.order + ') - ' + source.rendered_statement"
              v-intersect="{
                handler: onIntersect,
                options: {
                  threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0]
                }
              }"
        />
        <v-row class="choices">
            <v-col
                    v-for="(choice, index) in source.choices.list"
                    :key="choice.id"
                    v-html="(choiceNumber[index]) + choice.rendered_title"
                    :cols="choiceClass"
                    :class="{ choice: true, renderedPanel: true, active: choice.answer, ltr: isLtr }"
            />
        </v-row>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {mixinQuiz, mixinWindowSize, mixinMarkdownAndKatex} from '@/mixin/Mixins'
    import $ from "jquery";
    import API_ADDRESS from "@/api/Addresses"
    import VueConfirmDialog from 'vue-confirm-dialog'
    import axios from 'axios'
    import {QuestSubcategoryList} from "@/models/QuestSubcategory";

    Vue.use(VueConfirmDialog)
    Vue.component('vue-confirm-dialog', VueConfirmDialog.default)

    export default {
        name: 'item',
        mixins: [mixinQuiz, mixinWindowSize, mixinMarkdownAndKatex],
        data() {
            return {
                isLtr: false,
                confirm: false,
                choiceNumber: {
                    0: '1) ',
                    1: '2) ',
                    2: '3) ',
                    3: '4) '
                }
            }
        },
        props: {
            subCategory: {
                default() {
                    return new QuestSubcategoryList()
                }
            },
            index: { // index of current source
                type: Number
            },
            examId: {
                default() {
                    return null
                }
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
            confirmQuestion() {
                axios.get(API_ADDRESS.question.confirm(this.source.id))
                    .then((response) => {
                        this.source.confirmed = response.data.data.confirmed
                    })
                    .catch(() => {
                        this.source.confirmed = !this.source.confirmed
                    })
            },
            copyIdToClipboard(sourceId) {
                this.$refs['question-id-' + sourceId].select()
                document.execCommand('copy')
            },
            onIntersect(entries) {
                if (typeof this.source.onIntersect === 'function') {
                    this.source.onIntersect(entries)
                }
            },
            choiceClicked(questionId, choiceId) {
                // console.log('loadFirstActiveQuestionIfNeed->choiceClicked')
                this.changeQuestion(questionId)
                this.answerClicked({questionId, choiceId})
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
            detachQuestion() {
                this.$store.commit('AppLayout/showConfirmDialog', {
                    message: 'از حذف سوال از آزمون اطمینان دارید؟',
                    button: {
                        no: 'خیر',
                        yes: 'بله'
                    },
                    callback: (confirm) => {
                        if (!confirm) {
                            return
                        }
                        axios.post(API_ADDRESS.question.detach(this.source.id), {
                            exams: [this.examId]
                        })
                        .then(() => {
                            window.location.reload()
                        })
                    }
                })
            },
            deleteQuestion() {
                this.$store.commit('AppLayout/showConfirmDialog', {
                    message: 'از حذف کامل سوال از پایگاه داده و حذف از تمامی آزمون ها اطمینان دارید؟',
                    button: {
                        no: 'خیر',
                        yes: 'بله'
                    },
                    callback: (confirm) => {
                        if (!confirm) {
                            return
                        }
                        axios.delete(API_ADDRESS.question.delete(this.source.id), {
                            exams: [this.examId]
                        })
                        .then(() => {
                            window.location.reload()
                        })
                    }
                })
            },
            edit() {
                // console.log(questionId)
            }
        },
        created() {
            this.isLtr = this.isLtrString(this.source.rendered_statement)
            // setTimeout(() => {console.log(this.quiz)}, 2000)
        },
        computed: {
            choiceClass() {
                // let QuestionWidthRatio = 0.4
                // let largestChoiceWidth = this.windowSize.x * QuestionWidthRatio / largestChoice
                let largestChoice = this.getLargestChoice(this.source.choices)
                let largestChoiceWidth = $('.questions').width() / largestChoice
                // console.log('order', this.source.order)
                if (largestChoiceWidth > 48) {
                    // console.log('col-3')
                    return 3
                }
                if (largestChoiceWidth > 24) {
                    // console.log('col-6')
                    return 6
                }
                if (largestChoiceWidth > 12) {
                    // console.log('col-12')
                    return 12
                }
                // console.log('col-12')
                return 12
            },
            // lesson() {
            //     console.log(this.source.sub_categories)
            //     if (!this.source.sub_categories) {
            //         return {title: 'صبر کنید'}
            //     }
            //     const subCategoryId = Assistant.getId(this.source.sub_category.id)
            //     console.log(this.quiz.sub_categories)
            //     return this.quiz.sub_categories.list.find((item) => item.id === subCategoryId)
            // }
            getSubCategoryName() {
                const target = this.subCategory.list.find(
                    (item) =>
                        // item.id === this.source.sub_category.id
                    {
                        if (item && item.id && this.source.sub_category) {
                            if (item.id === this.source.sub_category.id) {
                                return true
                            }
                            return false
                        }
                        return false
                    }
                )
                if (target) {
                    return target.display_title
                } else {
                    return ''
                }
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
