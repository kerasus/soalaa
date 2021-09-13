<template>
  <div :class="{ 'current-question': this.currentQuestion.id === source.id, question: true, ltr: isLtr }">
    <v-row>
      <v-col>
        <div
          v-if="source.confirmers.length"
          class="d-inline"
        >
          تایید شده توسط:
        </div>
        <v-chip
          v-for="(item, index) in source.confirmers"
          :key="index"
          color="#C8E6C9"
          class="ml-3"
          pill
        >
          <v-avatar left>
            <v-img :src="item.photo" />
          </v-avatar>
          {{ item.first_name + ' ' + item.last_name }}
        </v-chip>
      </v-col>
    </v-row>
    <div class="buttons-group">
      <v-select
        v-if="false"
        :items="quizList.list"
        item-text="title"
        chips
        multiple
        attach
        outlined
        dense
        full-width
      />
      <v-btn
        icon
        color="red"
        @click="deleteQuestion()"
      >
        <v-icon :size="24">
          mdi-close
        </v-icon>
      </v-btn>
      <v-btn
        icon
        @click="detachQuestion()"
      >
        <v-icon :size="24">
          mdi-close
        </v-icon>
      </v-btn>
      <v-btn
        icon
        :to="{ name: 'question.edit', params: { question_id: source.id } }"
      >
        <v-icon :size="24">
          mdi-pencil
        </v-icon>
      </v-btn>
      <input
        :id="'question-id' + source.id"
        :ref="'question-id-' + source.id"
        :value="source.id"
        type="text"
        class="not-visible"
      >
      <v-btn
        icon
        @click="copyIdToClipboard(source.id)"
      >
        <v-icon>mdi-content-copy</v-icon>
      </v-btn>
      <v-switch
        v-model="source.confirmed"
        color="success"
        :loading="confirmLoading"
        hide-details
        @change="confirmQuestion"
      />
    </div>
    <!--ToDo: remove span-->
    <span
      :id="'question' + source.id"
      v-intersect="{
        handler: onIntersect,
        options: {
          threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0]
        }
      }"
      class="question-body renderedPanel"
      :class="{ ltr: isLtr }"
    >
      <vue-katex :input="(getQuestionNumberFromId(source.id)) + '(' + getSubCategoryName + ')' + ' (' + source.order + ') - ' + source.statement" />
    </span>
    <v-row class="choices">
      <v-col
        v-for="(choice, index) in source.choices.list"
        :key="choice.id"
        :cols="choiceClass"
        :class="{ choice: true, renderedPanel: true, active: choice.answer, ltr: isLtr }"
      >
        <vue-katex :input="(choiceNumber[index]) + choice.title" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
    import Vue from 'vue'
    import {mixinQuiz, mixinWindowSize} from '@/mixin/Mixins'
    import $ from "jquery";
    import API_ADDRESS from "@/api/Addresses"
    import VueConfirmDialog from 'vue-confirm-dialog'
    import axios from 'axios'
    import {QuestSubcategoryList} from "@/models/QuestSubcategory";
    import VueKatex from '@/components/VueKatex'

    Vue.use(VueConfirmDialog)
    Vue.component('vue-confirm-dialog', VueConfirmDialog.default)

    export default {
        name: 'Item',
      components: {
        VueKatex
      },
        mixins: [mixinQuiz, mixinWindowSize],
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
        data() {
            return {
                confirmLoading: false,
                isLtr: false,
                confirm: false,
                choiceNumber: {
                    0: ' 1) ',
                    1: ' 2) ',
                    2: ' 3) ',
                    3: ' 4) '
                }
            }
        },
        computed: {
            choiceClass() {
                // let QuestionWidthRatio = 0.4
                // let largestChoiceWidth = this.windowSize.x * QuestionWidthRatio / largestChoice
                let largestChoice = this.getLargestChoice(this.source.choices)
                let largestChoiceWidth = $('.questions').width() / largestChoice
                // console.Log('order', this.source.order)
                if (largestChoiceWidth > 48) {
                    // console.Log('col-3')
                    return 3
                }
                if (largestChoiceWidth > 24) {
                    // console.Log('col-6')
                    return 6
                }
                if (largestChoiceWidth > 12) {
                    // console.Log('col-12')
                    return 12
                }
                // console.Log('col-12')
                return 12
            },
            // lesson() {
            //     console.Log(this.source.sub_categories)
            //     if (!this.source.sub_categories) {
            //         return {title: 'صبر کنید'}
            //     }
            //     const subCategoryId = Assistant.getId(this.source.sub_category.id)
            //     console.Log(this.quiz.sub_categories)
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
                    return target.title
                } else {
                    return ''
                }
            },
        },
        created() {
            // this.isLtr = this.isLtrString(this.source.statement)
            // setTimeout(() => {console.Log(this.quiz)}, 2000)
        },
        methods: {
            confirmQuestion() {
                this.confirmLoading = true
                axios.get(API_ADDRESS.question.confirm(this.source.id))
                    .then((response) => {
                        this.source.confirmed = response.data.data.confirmed
                        this.source.confirmers = response.data.data.confirmers
                        this.confirmLoading = false
                    })
                    .catch(() => {
                        this.source.confirmed = !this.source.confirmed
                        this.confirmLoading = false
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
                // console.Log('loadFirstActiveQuestionIfNeed->choiceClicked')
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
                // console.Log(questionId)
            }
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
